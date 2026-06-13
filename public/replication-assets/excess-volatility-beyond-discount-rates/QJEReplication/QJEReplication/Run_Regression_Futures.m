clear
clc

addpath utility

load Data/alldata.mat

datalist=fieldnames(data);
labels=datalist;

nf=2;

datalist={'f_GC','f_CL'};

%--------------------------------------------------------------------------
% Run analysis on the chosen term structures
%--------------------------------------------------------------------------

for d=1:length(datalist)
    
    datalist{d}
    
    % Select data and set global parameters
    %--------------------------------------------------------------------------
    
    usedata=data.(datalist{d});
    
    usemats=[1 2 3 4 5 11 23];
    displaymats=[3 4 5 6 12 24];
    
    f               = find(usedata.dates>=19900101 & usedata.dates<=20141231);
    f               = f(1);
    usedata.prices  = usedata.prices(f:end,:);
    usedata.dates   = usedata.dates(f:end);
    
    results_futures.(datalist{d}) = predvariance21_futures(usedata,usemats,nf);
    
    vr=results_futures.(datalist{d}).avar./results_futures.(datalist{d}).pvar;
    
    [vr results_futures.(datalist{d}).mats']
    
    
    length(results_futures.(datalist{d}).Y)
    pva=results_futures.(datalist{d}).pvalue';
    
    results_futures.(datalist{d}).vr=vr;
    results_futures.(datalist{d}).pva=pva;
    
end

save(['Regression Results/results_futures_regression_' num2str(nf) '.mat'],'results_futures')















