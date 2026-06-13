function results = predvariance21_iv(usedata,usemats,numfac)

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

usedata.instr=usedata.instr(f,:);

% Analyse factor scores
[~,~,latentall] = pca(zscore(usedata.prices));
cumlatentall=cumsum(latentall/sum(latentall));

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

Z=[ones(size(ybar,1),1) usedata.instr];
coeff     =(Z'*X)\(Z'*Y);

% Two-stages estimates
instr_short=(Z'*Z)\(Z'*Y);
instr_short=instr_short(:,1:numfac);
instr_yfit=Z*instr_short;
X2=[ones(size(instr_yfit,1),1) instr_yfit];
coeff2=(X2'*X2)\(X2'*Y);

[pcoeff,rho_vec,delta0,pconst,C]=predvar(usedata.mats,shortmat,longmat,F,coeff(:,longix));
pvar=diag(pcoeff*nancov(ybar)*pcoeff');
avar=diag(coeff(2:end,:)'*nancov(ybar)*coeff(2:end,:));

predY=X2*[pconst';pcoeff'];

err=Y-predY;

% Remove mean in errors
err=err-repmat(mean(err),size(Y,1),1);

% Estimate AR(1) coeff
u=zeros(size(usedata.prices));
for j=1:size(err,2)
    % Check if there is effectively no errors, e.g. if some of the yields
    % are observed perfectly
    if max(abs(err(:,j)))<0.00000001
        u(2:end,j)=0;
        rho(1,j)=0;
    else
        stats=regstats(err(2:end,j),err(1:end-1,j),'linear',{'beta','r'});
        u(2:end,j)=stats.r;
        rho(1,j)=stats.beta(2);
    end
end

% Bootstrap
B=1000;
T=length(long);
pos=(1:T)';
esam=zeros(size(usedata.prices));

for b=1:B
    
    usam=randsample(pos,T,true);
    
    uall=u(usam,:);
    
    esam(1,:)=zeros(1,size(usam,2))+uall(1,:);
    for t=2:T
        esam(t,:)=esam(t-1,:).*rho+uall(t,:);
    end
    
    ysam=predY+esam;
    
    F_sam=eye(numfac);
    
    ybar_sam=ysam(:,shortix);
    
    % Estimate regressions on the factors
    YY=ysam;
    XX=[ones(size(ybar_sam,1),1) ybar_sam];
    coeff_sam=(Z'*XX)\(Z'*YY);
    
    % Estimates
    % Predicted coefficients
    [pcoeff_b,r_vec,delta0_sam,pconst_sam,C_sam]=predvar(usedata.mats,shortmat,longmat,F_sam,coeff_sam(:,longix));
    
    pvar_b=diag(pcoeff_b*nancov(ybar_sam)*pcoeff_b');
    
    acoeff_b=coeff_sam(2:end,:)';
    
    avar_b=diag(acoeff_b*nancov(ybar_sam)*acoeff_b');
    
    avar_boot(:,b)=avar_b;
    pvar_boot(:,b)=pvar_b;
    relvar_boot(:,b)=avar_b./pvar_b;
    
end

% p-values for the test that what we see in the data can be generated under
% the null. Also 95th percentile of avar/pvar at all maturities under the
% null
for j=1:length(avar)
    results.pvalue(1,j)=length(find(relvar_boot(j,:)>=avar(j)/pvar(j)))/B;
    results.relvar_perc95(1,j)=prctile(relvar_boot(j,:),97.5);
    results.relvar_perc5(1,j)=prctile(relvar_boot(j,:),2.5);
    results.avar_perc95(1,j)=prctile(avar_boot(j,:),97.5);
    results.avar_perc5(1,j)=prctile(avar_boot(j,:),2.5);
end
    
results.Y=Y;
results.predY=predY;
results.pvar=pvar;
results.avar=avar;
results.pcoeff=pcoeff;
results.acoeff=coeff(2:end,:)';
results.rho_vec=rho_vec;
results.cumlatentall=cumlatentall;
results.numfac=numfac;
results.totvar=diag(nancov(usedata.prices));
results.mats=usedata.mats;
results.prices=usedata.prices;
results.dates=usedata.dates;
results.frequency=usedata.frequency;
results.short=short;
results.shortmat=shortmat;
results.period=usedata.period;
results.cov=nancov(ybar);
results.C=C; 
results.label=usedata.label;
results.pconst=pconst;
results.ybar=ybar;

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
 