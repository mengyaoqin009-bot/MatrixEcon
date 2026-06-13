%%% REQUIRES PROPRIETARY VARIANCE SWAP DATA %%%

clear
clc

addpath utility

%--------------------------------------------------------------------------
% Load data & choose variant (robustness)
%--------------------------------------------------------------------------

load Data/alldata.mat

datalist=fieldnames(data);
labels=datalist;

nfbase=2;

datalist    = {'vs_short'};

%--------------------------------------------------------------------------
% Run analysis on the chosen term structures
%--------------------------------------------------------------------------

TABLE=cell(0);
for d=1:length(datalist)
    
    datalist{d}
    
    % Select data and set global parameters
    %--------------------------------------------------------------------------
    
    usedata=data.(datalist{d});
    nf=nfbase;
    
    f=find(usedata.dates<=20141231);
    f=f(end);
    usedata.prices  = usedata.prices(1:f,:);
    usedata.dates   = usedata.dates(1:f);
    
    if strcmp(datalist{d},'vs_short')  
        usemats     =[1 2 3 6 12 24];
        displaymats = [3 6 12 24];
        [~,usemats] = intersect(usedata.mats,usemats);
       
    end
    
    results.(datalist{d}) = predvariance21_coeff(usedata,usemats,nf);
    
    figure
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).acoeff(nfbase+1:end,1),'k','linewidth',3);
    hold on
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).pcoeff(nfbase+1:end,1),'k','linewidth',1);
    legend('Unrestricted loadings','Restricted loadings','location','northeast','autoupdate','off')
    axis tight
    aa=axis;
    aa=aa(1):0.5:aa(2);
    bb=zeros(1,length(aa));
    plot(aa,bb,'.','linewidth',0.1)
    xlabel('Maturity')
    ylabel('Loadings')
    title('First factor');
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).acoeff_perchigh(nfbase+1:end,1),'k--','linewidth',3);
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).acoeff_perclow(nfbase+1:end,1),'k--','linewidth',3);
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).pcoeff_perchigh(nfbase+1:end,1),'k--','linewidth',1);
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).pcoeff_perclow(nfbase+1:end,1),'k--','linewidth',1);
    
    set(gcf, 'PaperUnits', 'inches');
    set(gcf, 'PaperSize', [9 6]);
    set(gcf, 'PaperPositionMode', 'manual');
    set(gcf, 'PaperPosition', [0 0 9 6]);
    
    set(gca,'FontName','TimesNewRoman','FontSize',12,'FontWeight','normal')
    set(gcf, 'renderer', 'painters');
    print(gcf, '-dpdf', ['Figures/loadings1.pdf']);
    
    
    figure
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).acoeff(nfbase+1:end,2),'k','linewidth',3);
    hold on
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).pcoeff(nfbase+1:end,2),'k','linewidth',1);
    legend('Unrestricted loadings','Restricted loadings','location','northwest','autoupdate','off')
    axis tight
    aa=axis;
    aa=aa(1):0.5:aa(2);
    bb=zeros(1,length(aa));
    plot(aa,bb,'.','linewidth',0.1)
    xlabel('Maturity')
    ylabel('Loadings')
    title('Second factor');
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).acoeff_perchigh(nfbase+1:end,2),'k--','linewidth',3);
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).acoeff_perclow(nfbase+1:end,2),'k--','linewidth',3);
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).pcoeff_perchigh(nfbase+1:end,2),'k--','linewidth',1);
    plot(results.(datalist{d}).mats(nfbase+1:end),results.(datalist{d}).pcoeff_perclow(nfbase+1:end,2),'k--','linewidth',1);
    
    set(gcf, 'PaperUnits', 'inches');
    set(gcf, 'PaperSize', [9 6]);
    set(gcf, 'PaperPositionMode', 'manual');
    set(gcf, 'PaperPosition', [0 0 9 6]);
    
    set(gca,'FontName','TimesNewRoman','FontSize',12,'FontWeight','normal')
    set(gcf, 'renderer', 'painters');
    print(gcf, '-dpdf', ['Figures/loadings2.pdf']);
    

end