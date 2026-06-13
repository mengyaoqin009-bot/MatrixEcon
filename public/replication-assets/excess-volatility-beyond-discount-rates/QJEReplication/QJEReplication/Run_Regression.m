%%% OMITS RESULTS BASED ON PROPRIETARY VARIANCE SWAP DATA %%%

clear
clc

addpath utility

load Data/alldata.mat

datalist=fieldnames(data);
labels=datalist;

VR=nan(length(datalist),120);
VRpval=nan(length(datalist),120);

nfbase=3; % Use 2 or 3 factors baseline

%datalist    = {'vs_short';'iv_interp_apple';'iv_interp_citi';'iv_interp_stoxx';'iv_interp_dax';'iv_interp_euro';'iv_interp_yen';'usyc';'inflswap_us';'inflswap_eu';'cds_BRAZIL';'cds_RUSSIA';'cds_GE';'cds_BOFA';};
datalist    = {'iv_interp_apple';'iv_interp_citi';'iv_interp_stoxx';'iv_interp_dax';'iv_interp_euro';'iv_interp_yen';'usyc';'inflswap_us';'inflswap_eu';'cds_BRAZIL';'cds_RUSSIA';'cds_GE';'cds_BOFA';};


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
       
    elseif sum(strncmp(datalist{d},{'inflswap_us';'inflswap_eu'},20))
        usedata=interpolateprices(usedata);
        usemats     = [1 3 5 7 10 15 20 25 30];
        displaymats=[5 10 20 30];
        [~,usemats]=intersect(usedata.mats,usemats);
        nf=nf+2;
        
    elseif sum(strncmp(datalist{d},{'iv_interp_apple';'iv_interp_citi';'iv_interp_euro';'iv_interp_yen';'iv_interp_stoxx';'iv_interp_dax'},20))
        usemats     = [1 3 6 12 18 24];
        displaymats=[6 12 18 24];
        [~,usemats]=intersect(usedata.mats,usemats);
        
    elseif sum(strncmp(datalist{d},{'cds_BOFA';'cds_GE'},20))
        f=find(usedata.dates>=20070101);
        f=f(1);
        usedata.prices  = usedata.prices(f:end,:);
        usedata.dates   = usedata.dates(f:end);
        usemats     = [1 2 3 5 7 10];
        displaymats=[3 5 7 10];
        [~,usemats]=intersect(usedata.mats,usemats);
        
    elseif sum(strncmp(datalist{d},{'cds_BRAZIL';'cds_RUSSIA'},20))
        
        f=find(usedata.dates>=20070101);
        f=f(1);
        usedata.prices  = usedata.prices(f:end,:);
        usedata.dates   = usedata.dates(f:end);
        usemats     = [1 2 3 5 7 10];
        displaymats=[3 5 7 10];
        [~,usemats]=intersect(usedata.mats,usemats);
        
    elseif strcmp(datalist{d},'usyc')
        usemats         =  [1 3 5 7 10 12 15 17 20 22 25 27 30];
        f               = find(usedata.dates>=19711115); 
        f               = f(1);
        usedata.prices  = usedata.prices(f:end,:);
        usedata.dates   = usedata.dates(f:end);
        displaymats=[15 20 25 30];
        nf=nf+1;
    end
    
    results.(datalist{d}) = predvariance21(usedata,usemats,nf);
    
    if strcmp(datalist{d},'vs_short') 
        mainplot(results.(datalist{d}),['Figures/fig_' datalist{d} '_' num2str(nf) '.pdf']);
        close
    end
    
    vr=results.(datalist{d}).avar./results.(datalist{d}).pvar;
    
    [results.(datalist{d}).dates(1) results.(datalist{d}).dates(end)]
    
    [usedata.mats(usemats)' vr]
    
    pva=results.(datalist{d}).pvalue';
    
    results.(datalist{d}).vr=vr;
    results.(datalist{d}).pva=pva;

end

save(['Regression Results/results_regression_' num2str(nf) '.mat'],'results')



 







