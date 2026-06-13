%%% REQUIRES PROPRIETARY VARIANCE SWAP DATA %%%

function figure9()

clear
clc

addpath utility

load Data/alldata.mat


usedata=data.vs_short;

numfac=2;

mat=[1 2 3 6 12 24];
[~,usemats]=intersect(usedata.mats,mat);

results.vs_short = predvariance21(usedata,usemats,numfac);
mainplot(results.vs_short,'/tmp/temp.pdf');

% Invert and find coefficients
[a,b,phi,l]=acoeff_to_ne_phi(results.vs_short.acoeff,mat)

acoeff2=ne_to_acoeff_phi(a,b,phi,l,mat);

Bpr=predcoeff(acoeff2',mat);

covF                = cov(results.vs_short.short);
pvar                = diag(Bpr'*covF*Bpr);
avar                = diag(acoeff2*covF*acoeff2');
VR               = avar./pvar;

hold on
plot(mat,sqrt(avar),'r','linewidth',2)
plot(mat,sqrt(pvar),'r--','linewidth',2)

labchar = [{'Unrestricted'},{'Restricted'},{'95% Test'},{'Unrestricted (NE model)'},{'Restricted (NE model)'}];
h = get(gca,'children');
legend(h([6 7 8 2 1]),labchar,'Location','Northwest','FontSize',14)
h(3).String=num2str(VR(end),3);
h(4).String=num2str(VR(end-1),3);
h(3).Color=h(1).Color;
h(4).Color=h(1).Color;

set(gcf, 'PaperUnits', 'inches');
set(gcf, 'PaperSize', [9 6]);
set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperPosition', [0 0 9 6]);

set(gcf, 'renderer', 'painters');
print(gcf, '-dpdf', 'Figures/ne');

close

% Now explore for different lambda

fun=@(x)vrfun(a,b,phi,x,mat,covF);

plist=[0:0.01:1];
for j=1:length(plist)
    f(j,1)=fun(plist(j));
end

figure
plot(plist,f,'k','Linewidth',1.5)
set(gcf,'defaulttextinterpreter','latex')
ylabel('Variance Ratio','FontName','TimesNewRoman','FontSize',18);
xlabel('$\lambda$','FontName','TimesNewRoman','FontSize',18);
hold on
ylim([1 2.2]);
lis=1:0.001:2.2;
plot(l*ones(size(lis)),lis,'k--','linewidth',1);
LEG=legend('Variance Ratio','Calibrated value','NorthWest');
LEG.FontSize=14;

set(gcf, 'PaperUnits', 'inches');
set(gcf, 'PaperSize', [9 6]);
set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperPosition', [0 0 9 6]);

set(gcf, 'renderer', 'painters');
print(gcf, '-dpdf', 'Figures/calib');

end


function VR=vrfun(a,b,phi,l,mat,covF)

    acoeff2=ne_to_acoeff_phi(a , b , phi,l,mat);

    Bpr=predcoeff(acoeff2',mat);
    pvar                = diag(Bpr'*covF*Bpr);
    avar                = diag(acoeff2*covF*acoeff2');
    VR               = avar./pvar;
    VR=VR(end);

end


function Bpred=predcoeff(B,mat)

nfac=size(B,1);
M=length(mat);

rho_vec             = B_to_rho_simple(B(:,nfac+1),mat(nfac+1),mat(1:nfac));

Bpred               = nan(M,nfac);
for i=1:length(mat)
    for k=1:nfac
        Bpred(i,k)  = sum(rho_vec(k).^(1:mat(i)));
    end
end
Bpred               = (Bpred/Bpred(1:nfac,1:nfac))';

end 