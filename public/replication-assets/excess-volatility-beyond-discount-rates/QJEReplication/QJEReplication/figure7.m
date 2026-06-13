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

d=1;
    
% Select data and set global parameters
%--------------------------------------------------------------------------

usedata=data.(datalist{d});
usemats=[1:6];
nf=nfbase;

% Convert to monthly
ym=floor(usedata.dates/100);
f=find(ym(2:end)~=ym(1:end-1));
usedata.dates=floor(usedata.dates(f)/100);
usedata.prices=usedata.prices(f,:);
usedata.frequency='monthly';

load Data/rv;
instr=rv.prices;
instr_dates=rv.dates;
usedata.instr=nan(size(usedata.prices,1),size(instr,2));
usedata.instr_dates=nan(size(usedata.dates));
for t=1:length(usedata.dates)
    f=find(usedata.dates(t)==instr_dates);
    if ~isempty(f)
        usedata.instr_dates(t)=instr_dates(f);
        usedata.instr(t,:)=instr(f,:);
    end
end

load Data/vixdata
ym=floor(vixdata.dates/100);
f=find(ym(2:end)~=ym(1:end-1));
vixdata.dates=floor(vixdata.dates(f)/100);
vixdata.prices=vixdata.prices(f,:);
instr2=vixdata.prices;
instr2_dates=vixdata.dates;
usedata.instr2=nan(size(usedata.prices,1),size(instr2,2));
usedata.instr2_dates=nan(size(usedata.dates));
for t=1:length(usedata.dates)
    f=find(usedata.dates(t)==instr2_dates);
    if ~isempty(f)
        usedata.instr2_dates(t)=instr2_dates(f);
        usedata.instr2(t,:)=instr2(f,:);
    end
end

usedata.instr=[usedata.instr usedata.instr2];

results = predvariance21_iv(usedata,usemats,nf);
mainplot(results,'Figures/meas2');



 







