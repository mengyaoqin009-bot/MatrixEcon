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
    
    rhomat=[];
    rhomatup=[];
    rhomatdown=[];
    lastmat=[];
    for jjj=1:length(usedata.mats)-nfbase
        usemats=jjj:length(usedata.mats);
        results.(datalist{d}) = predvariance21_rollingrho(usedata,usemats,nfbase);
        rhomat=[rhomat,results.(datalist{d}).rho_vec];
        rhomatup=[rhomatup,results.(datalist{d}).rho_vec_perchigh'];
        rhomatdown=[rhomatdown,results.(datalist{d}).rho_vec_perclow'];
        lastmat=[lastmat,usedata.mats(jjj+nfbase)];
    end
    
    
    for jjj=1:nfbase
        figure
        set(gcf, 'PaperUnits', 'inches');
        set(gcf, 'PaperSize', [9 6]);
        set(gcf, 'PaperPositionMode', 'manual');
        set(gcf, 'PaperPosition', [0 0 9 6]);
        
        plot(lastmat,rhomat(jjj,:),'k','LineWidth',2,'marker','o','markersize',10);
        xlabel('Maturity');
        ylabel('Persistence');
        xlim([lastmat(1) lastmat(end)]);
        
        if jjj==1
            ylim([0.85 1]);
        end
        hold on
        plot(lastmat,rhomatup(jjj,:),'b--','LineWidth',1);
        plot(lastmat,rhomatdown(jjj,:),'b--','LineWidth',1);
        
        set(gca,'Fontsize',20,'Fontname','TimesNewRoman');
        set(gcf, 'renderer', 'painters');
        print(gcf, '-dpdf', ['Figures/roll_' datalist{d} '_' num2str(jjj) '.pdf']);
        
    end

end


 







