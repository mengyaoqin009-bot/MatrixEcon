function out = Kalman_Alternative_New_Guess(price,mat,facmat,param_guess)

warning('off','all')
%#ok<*PFBNS>

% Define model
nfac    = length(facmat);
Mdl     = ssm(@(params)Restrictions(params,price,mat,facmat));
   
% Demean price
price   = bsxfun(@minus, price, nanmean(price));

%**************************************************************************
% Estimation
%**************************************************************************

options             = optimoptions('fminunc','MaxFunEvals',20000,'TolFun',1e-8,'TolX',1e-8,'MaxIter',3000,'Disp','off');

% Space
details             = struct;

covF=cov(price(:,1:nfac));

warning('off','all')
[est,prm,prmcov,loglik,summary] = estimate(Mdl,price,param_guess','Univariate',true,'options',options,'Disp','off');
param_est      = prm;
param_std      = sqrt(diag(prmcov));
param_cov      = vec(prmcov);
LL               = loglik;
details.est    = est;
details.summary= summary;

Bunr                = details.est.C;
H                   = Bunr(1:nfac,1:nfac);
Bunr                = Bunr/H;
Bunr                = Bunr';
rho_vec=B_to_rho_simple(Bunr(:,nfac+1),mat(nfac+1),mat(1:nfac));
Bpred               = nan(size(price,2),nfac);
for i=1:length(mat)
    for k=1:nfac
        Bpred(i,k)  = sum(rho_vec(k).^(1:mat(i)));
    end
end
Bpred               = (Bpred/Bpred(1:nfac,1:nfac))';

pvar                = diag(Bpred'*covF*Bpred);
avar                = diag(Bunr'*covF*Bunr);
vrtmp               = avar./pvar;
VR             = vrtmp;

out.LL        = LL;
out.details   = details;
out.prm       = param_est;
out.prmstd    = param_std;
out.VR        = VR;
out.prmcov    = reshape(param_cov,length(out.prm),length(out.prm));

J                       = jacobianest_fast(@(x)param_to_VR(x,facmat,mat,covF),out.prm);
out.VR_std    = sqrt(diag(J*out.prmcov*J'));

end

%**************************************************************************
% Auxiliary Functions
%**************************************************************************
function VR=param_to_VR(param,facmat,mat,covF)

M=length(mat);
nfac    = length(facmat);
facix   = find(ismember(mat,facmat));
notfacix= setdiff(1:M,facix);

% Reconstruct needed parameters: C,A,B
ixC     = 1:nfac*(M-nfac);
C       = nan(M,nfac);
Cnotfac = reshape(param(ixC),M-nfac,nfac);
for i=1:M
    if ismember(i,facix)
        C(i,:) = facix==i;
    else
        C(i,:) = Cnotfac(notfacix==i,:);
    end
end

ixA     = (ixC(end)+1):(ixC(end)+nfac^2);
A       = zeros(nfac);     
A(:)    = param(ixA);      

ixB     = (ixA(end)+1):(ixA(end)+nfac*(nfac+1)/2);
mask    = tril(true(nfac));
B       = zeros(nfac); 
B(mask) = param(ixB);

        
% Compute unrestricted and predicted coefficients                
Bunr=C;
H=Bunr(1:nfac,1:nfac);
Bunr=Bunr*inv(H);
Bunr=Bunr';

rho_vec          = B_to_rho_simple(Bunr(:,nfac+1),mat(nfac+1),mat(1:nfac));

Bpred               = nan(M,nfac);
for i=1:length(mat)
    for k=1:nfac
        Bpred(i,k)  = sum(rho_vec(k).^(1:mat(i)));
    end
end
Bpred               = (Bpred/Bpred(1:nfac,1:nfac))';

pvar                = diag(Bpred'*covF*Bpred);
avar                = diag(Bunr'*covF*Bunr);
VR                  = avar./pvar;
end 



%**************************************************************************
% Model Parameter Restrictions
%**************************************************************************
function [A,B,C,D,mean0,cov0,stateType,pricedm] = Restrictions(param, price, mat, facmat)

% Dimensions         
M       = size(price,2);
nfac    = length(facmat);
facix   = find(ismember(mat,facmat));
notfacix= setdiff(1:M,facix);

% Loadings in observation equation under affine restriction
ixC     = 1:nfac*(M-nfac);
C       = nan(M,nfac);
Cnotfac = reshape(param(ixC),M-nfac,nfac);
for i=1:M
    if ismember(i,facix)
        C(i,:) = facix==i;
    else
        C(i,:) = Cnotfac(notfacix==i,:);
    end
end

% State/factor transition equation
ixA     = (ixC(end)+1):(ixC(end)+nfac^2);
A       = zeros(nfac);     
A(:)    = param(ixA);      

% Square root of factor error covariance
ixB     = (ixA(end)+1):(ixA(end)+nfac*(nfac+1)/2);
mask    = tril(true(nfac));
B       = zeros(nfac); 
B(mask) = param(ixB);

% Square root of observation error
ixD     = ixB(end)+1:ixB(end)+2;
eqcorr  = exp(param(ixD(2)))/(1+exp(param(ixD(2))));
ervol   = diag(std(price))*exp(param(ixD(1)));
ercorr  = (1-eqcorr)*eye(M) + eqcorr*ones(M);
DD      = ervol*ercorr*ervol';
D       = chol(DD,'lower');

pricedm = bsxfun(@minus, price, nanmean(price));

% Initialize placeholders not used in this example, but needed for program
mean0     = [];
cov0      = [];
stateType = [];
end

