
clear
clc

addpath utility

%**************************************************************************
% Choices (trading)
%**************************************************************************

estwin      = 250;

%**************************************************************************
% Choices (data)
%**************************************************************************

% simlist     = {'ar2','longmem','lstar'};
simlist     = {'ar2'};

%**************************************************************************
% Choices (sims)
%**************************************************************************

% Number of sims
Nsim        = 100;

% Number of periods
TT          = 10000; 
burnin      = 1000;

% Maturities
mats        = 1:24;

% Shock distribution size
S           = 10000;


%**************************************************************************
% Load data
%**************************************************************************

datatmp=struct;
for s = 1:Nsim
    %**************************************************************************
    % Simulate data
    %**************************************************************************

    shocks          = randn(TT,1);
    shocks          = shocks-mean(shocks);
    simshocks       = randn(S,max(mats));
    simshocks       = bsxfun(@minus,simshocks,mean(simshocks));

    if ismember('lstar',simlist)
        a1 = 0.01;
        a2 = .999-a1;
        g  = .5;
        prices              = sim_star('lstar',a1,a2,g,max(mats),TT,burnin,simshocks,shocks);
        data.lstar          = datatmp;
        data.lstar.prices   = prices;
        data.lstar.dates    = (1:length(prices))';
        data.lstar.mats     = mats;
        data.lstar.frequency = 'monthly';
        data.lstar.period   = 'month';
        data.lstar.label    = 'lstar';
    end

    if ismember('ar2',simlist)
        a1 = 0.9;
        a2 = 0.5;
        prices              = sim_2fac_for_trading(a1,a2,max(mats),TT,burnin);
        data.ar2            = datatmp;
        data.ar2.prices     = prices;
        data.ar2.dates      = (1:length(prices))';
        data.ar2.mats       = mats;
        data.ar2.frequency  = 'monthly';
        data.ar2.period     = 'month';
        data.ar2.label      = 'ar2';
    end

    if ismember('longmem',simlist)
        d = 0.3;
        prices              = sim_arfima_for_trading(d,max(mats),TT,burnin);
        data.longmem        = datatmp;
        data.longmem.prices = prices;
        data.longmem.dates  = (1:length(prices))';
        data.longmem.mats   = mats;
        data.longmem.frequency = 'monthly';
        data.longmem.period = 'month';
        data.longmem.label  = 'longmem';
    end

    %**************************************************************************
    % Estimate model
    %**************************************************************************

    names           = fieldnames(data);

    minR2           =0.99;

    d = 1;

    usedata         = data.(names{d});
    usemats         = 'all';
    displaymats     = [12 24];

    %**************************
    % Estimation
    %**************************
    
    results = predvariance21(usedata,usemats,1);

    %**************************
    % Tables
    %**************************

    % Columns are holding period, rows are maturity traded
    minhist     = 12;
    margin      = 1;
    ptc         = 0;     
    thrlist     = [50 75 90];
    N1list      = [12 15 18 21 24];
    hplist      = [1 3 6];
    SRfinal     = [];
    for w = 1:length(thrlist);
        thresh      = thrlist(w);
        bigSRtbl    = [];
        bigfreqtbl  = [];            
        SRtbl       = nan(length(N1list),length(hplist));
        for i=1:length(N1list)
            for j=1:length(hplist); 
                N1          = N1list(i);
                N2          = N1-hplist(j); if N2<=0, continue, end
                annsr       = trade_insample_sim(usedata,results,N1,N2,thresh,ptc);
                % Sharpe Ratio table
                SRtbl(i,j)  = annsr;
            end
        end
        SRfinal     = [SRfinal [nan(size(bigSRtbl,1),1) SRtbl]];
    end    
    TABLE(s,1).SRfinal   = SRfinal; 
    s
    SRfinal
end

SR = nan(size(TABLE(1).SRfinal,1),size(TABLE(1).SRfinal,2),Nsim);
for s=1:Nsim
    SR(:,:,s) = TABLE(s).SRfinal;
end
nanmean(SR,3)
