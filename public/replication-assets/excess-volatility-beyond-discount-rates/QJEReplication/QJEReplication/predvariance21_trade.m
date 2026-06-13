function results = predvariance21_trade(usedata,usemats,minR2)

% INPUTS
% --------------------------------------------------------------------------
% 
% usedata: dataset with prices, dates, and other information
%
% usemats: either 'all', or the vector of elements of usedata.mats to use
%
% numfac: number of factors

% Keep only usemats
if ~strcmp(usemats,'all')
    usedata.prices=usedata.prices(:,usemats);
    usedata.mats=usedata.mats(usemats);
end

% Keep only dates where we have all required maturities
f=find(sum(isnan(usedata.prices),2)==0);
usedata.prices=usedata.prices(f,:);
usedata.dates=usedata.dates(f);

% Analyse factor scores
[~,~,latentall] = pca(zscore(usedata.prices));
cumlatentall=cumsum(latentall/sum(latentall));

if minR2<1
    f=find(cumlatentall>=minR2);
    numfac=f(1);
else
    numfac=minR2;
end

shortix     = 1:length(usedata.mats);
longix=shortix(numfac+1);
shortix=shortix(1:numfac);

short       = usedata.prices(:,shortix);
shortmat    = usedata.mats(shortix);
long        = usedata.prices(:,longix);
longmat     = usedata.mats(longix);

F=eye(numfac);
    
% Construct perfectly observed factors
ybar=short;

% Estimate regressions on the factors
Y=usedata.prices;
X=[ones(size(ybar,1),1) ybar];
coeff=(X'*X)\(X'*Y);
err=Y-X*coeff;

results.aconst=coeff(1,:);

% Estimates
% Predicted coefficients
[pcoeff,rho_vec,delta0,pconst,C]=predvar(usedata.mats,shortmat,longmat,F,coeff(:,longix));

results.Y=Y;
results.pcoeff=pcoeff;
results.acoeff=coeff(2:end,:)';
results.rho_vec=rho_vec;
results.cumlatentall=cumlatentall;
results.numfac=numfac;
results.mats=usedata.mats;
results.prices=usedata.prices;
results.dates=usedata.dates;
results.frequency=usedata.frequency;
results.period=usedata.period;
results.cov=nancov(ybar);
results.label=usedata.label;
results.pconst=pconst;

end



function [pcoeff,rho_vec,delta0,pconst,C]=predvar(mats,shortmat,longmat,F,c)

% Construct coefficients for polynomial
c_pc=c(2:end)'*F;

delta0=c(1)/(longmat-c_pc*shortmat');

rho_vec=B_to_rho_simple(c_pc',longmat,shortmat);
    
% Construct implied regression coefficients of the PCs on the
% latent factors
delta1      = ones(length(rho_vec),1);
B1          = zeros(length(shortmat),length(rho_vec));
for k=1:length(shortmat)
    S = zeros(length(rho_vec));
    for j=1:shortmat(k)
        S = S+diag(rho_vec.^j);
    end
    B1(k,:) = delta1'*S;
end

C=F*B1;

% Find all regression coefficients onto the PCs
for jj=1:length(mats)
    S = zeros(length(rho_vec));
    for j=1:mats(jj)
        
        S = S+diag(rho_vec.^j);
        
    end
    B2          = delta1'*S;
    phi21star   = B2/C;
    
    pcoeff(jj,:)=phi21star;
    
end

% This is to remove tiny imaginary parts that remain for numerical reasons
% Note that this number must be real even when rho_vec is complex.
pcoeff=real(pcoeff);

% This is implied the constant in the regression
pconst=(mats'-pcoeff*F*shortmat')*delta0;
   
end


function rho_vec = B_to_rho_simple(Bvec,longmat,shortmat)

 % Bvec is the coefficient of the regression of longmat onto the maturities
 % in shortmat (factor loadings)
  
nfac=size(Bvec,1);
 
% Extract rho via numerical optimization

startx=[0.8 0.95 0.9 0.7 0.85 0.6 0.5 0.4 0.3]';
startx=[startx(1:nfac)];
obj=@(x)Bvec-predcoeff(shortmat,longmat,x)';
lb=-ones(nfac,1)*0.999;
lb=lb-(1:nfac)'*0.0001; % Singularity with identical decays
ub=ones(nfac,1)*1.5;
ub=ub+(1:nfac)'*0.0001;
rho_vec=lsqnonlin(@(x)obj(x),startx,lb,ub,optimset('Display','off'));
rho_vec=sort(rho_vec,'descend');

end


function C0=predcoeff(shortmat,longmat,rho_vec)

nfac=length(rho_vec);

mats=[shortmat longmat];
    
C0   = nan(length(mats),nfac);
for i=1:length(mats)
    for k=1:nfac
        C0(i,k) = sum(rho_vec(k).^(1:mats(i)));
    end
end
H=C0(1:nfac,1:nfac);
C0=C0*inv(H);
C0=C0(end,:);    
    
end
 