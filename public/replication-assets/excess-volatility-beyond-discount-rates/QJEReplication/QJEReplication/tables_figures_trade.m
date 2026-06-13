%%% REQUIRES PROPRIETARY VARIANCE SWAP DATA %%%

clear
clc

addpath utility
addpath utility/export_fig

%**************************************************************************
% Choices (trading)
%**************************************************************************

estwin      = 250;

%**************************************************************************
% Choices (data)
%**************************************************************************

load(['tradedata/vs_short_interp_ISresults'],'FUND')
FUNDIS=FUND;

load(['tradedata/vs_short_interp_OOSresults_estwin_' num2str(estwin)],'FUND')

%**************************************************************************
% Existing Table
%**************************************************************************

% Columns are holding period, rows are maturity traded
minhist     = 12;

thrlist     = [50 75 90];
%ptclist     = [.0 .01 .02];
ptclist     = 0;
N1list      = [15 18 21 24];
hplist      = [1 3 6];
SRtbl       = nan(length(N1list),length(hplist));
freqtbl     = nan(length(N1list),length(hplist));
SRfinal     = [];
freqfinal   = [];
for w = 1:length(thrlist);
    thresh      = thrlist(w);
    bigSRtbl    = [];
    bigfreqtbl  = [];
    for m = 1:length(ptclist);
        ptc = ptclist(m);
        for i=1:length(N1list)
            for j=1:length(hplist); 
                N1          = N1list(i);
                N2          = N1-hplist(j); if N2<=0, continue, end
                out         = analyze_trade(FUND,N1,N2,thresh,ptc,minhist);
                % Sharpe Ratio table
                SRtbl(i,j)  = out.annsr;
                % Frequency of trading given strategy choices
                freqtbl(i,j)= sum(~isnan(out.rettrd))/(length(out.rettrd)-(minhist-1)-(N1-N2));
            end
        end
        bigSRtbl    = [bigSRtbl ; SRtbl; nan(1,size(SRtbl,2))];
        bigfreqtbl  = [bigfreqtbl; freqtbl; nan(1,size(freqtbl,2))];
    end
    SRfinal     = [SRfinal [nan(size(bigSRtbl,1),1) bigSRtbl]];
    freqfinal   = [freqfinal nan(size(bigfreqtbl,1),1) bigfreqtbl];
end
SRfinal
freqfinal

%**************************
% Analyze Time Series
%**************************

load(['tradedata/vs_short_interp_OOSresults_estwin_' num2str(estwin)])
N1      = 18;
N2      = 17;
n       = N1-N2;
thresh  = 50;
ptc     = 0;
minhist = 12;
out     = analyze_trade(FUND,N1,N2,thresh,ptc,minhist);

fundret         = out.retall;
units           = FUND(1,1,1).units;
islong          = out.islong;
fundrettrunc    = out.rettrd;

dates   = usedata.dates;
ym      = floor(dates/100);
eomdays = find(ym(2:end)~=ym(1:end-1));
dates   = floor(dates(eomdays+1)/100);

% Full sample Sharpe ratio
annsr           = out.annsr

% Pre-crisis Sharpe ratio
loc             = find(dates<200708);
sr              = nanmean(fundrettrunc(loc))/nanstd(fundrettrunc(loc));
annsr_pre       = sr*sqrt(units/n)

% Crisis Sharpe ratio
loc             = find(dates>=200708 & dates<=200906);
sr              = nanmean(fundrettrunc(loc))/nanstd(fundrettrunc(loc));
annsr_cri       = sr*sqrt(units/n)

% Rolling Sharpe ratio
win             = 60;
rollSR          = nan(size(fundret));
for t=minhist+win-1:length(fundret)
loc             = t-win+1:t;
sr              = nanmean(fundrettrunc(loc))/nanstd(fundrettrunc(loc));
rollSR(t,1)     = sr*sqrt(units/n);
end

ff      = load('Data/other/F-F_Research_Data_Factors.txt');
ffdates = ff(:,1);
loc     = find(ismember(ffdates,dates));
fffac   = ff(loc,2:4)/100;

load('Data/other/vix_cboe_monthly.mat')
loc     = find(ismember(vixdates,dates));
vix     = vix(loc,:);
stats   = regstats(vix,lag(vix,1,nan),'linear','r');
vixch   = stats.r;

mnret   = nanmean(fundrettrunc);
stdret  = nanstd(fundrettrunc);
stats   = regstats(fundrettrunc,fffac,'linear',{'tstat','rsquare'}); stats.tstat.beta, stats.rsquare
ffalpha = stats.tstat.beta(1);
ffbetas = stats.tstat.beta(2:end);

load('Data/other/vs.mat')
[~,vsscore] = pca(stdize(vs_ret));

statsvix= regstats(fundrettrunc(1:end-1),[fffac(1:end-1,:) vsscore(:,1:2)],'linear',{'tstat','rsquare'}); stats.tstat.beta, stats.rsquare
ffvix   = statsvix.tstat.beta(1);

% Scale trade to have 20% ann vol
stdretann   = sqrt(12)*stdret;
scale       = .2/stdret/sqrt(12);
ffalph20ann = 12*scale*ffalpha
vixalpha20ann= 12*scale*ffvix
mnretann    = 12*scale*mnret


%**************************************************************************
% Plots
%**************************************************************************

set(0, 'defaultFigurePaperType', 'A4')
set(0, 'defaultFigurePaperUnits', 'centimeters')
set(0, 'defaultFigurePaperPositionMode', 'auto')
set(0, 'defaultfigureposition',[5 -21 700 500])

% Sign of position in long maturity claims
y       = islong;
y(y==0) = -1;

plot1 = plotwithaxis(y(minhist:end),dates(minhist:end),5);
set(gca,'Fontsize',20,'Fontname','TimesNewRoman','ylim',[-1.3,1.3],'ytick',[-1 1],'yticklabel',[{'Sell'},{'Buy'}])
set(plot1(1),'linewidth',1,'Color','k','DisplayName','Long-maturity position')
legend('show')
export_fig(['Figures/direction_trade_longmaturity.pdf']);

% Serial correlation in position
stats = regstats(islong,lag(islong,1,nan),'linear',{'rsquare','tstat'});
stats.tstat.beta
display(['P[long(t)|short(t-1)]=' num2str(stats.tstat.beta(1))])
display(['P[long(t)|long(t-1)]=' num2str(sum(stats.tstat.beta))])

display(['P[sign switch]=' num2str(sum(islong(2:end)~=islong(1:end-1))/sum(~isnan(islong(2:end))))])

% Returns scaled to have vol of 20%
y       = fundrettrunc*(.2/12)/nanstd(fundrettrunc);
y1      = fundret*(.2/12)/nanstd(fundrettrunc);
y       = y(minhist:end);
y1      = y1(minhist:end);

dts     = dates(minhist:end);
tt      = length(y);
space   = floor(tt/5);
ticks   = [1,space:space:tt];
plot1   = plot((1:length(y))',y1,'-x',(1:length(y))',y,'o');
set(gca,'Fontsize',20,'Fontname','TimesNewRoman','ytick',[-.1:.05:.1],'ylim',[-.1 .101],'XTick',ticks,'XTickLabel',dts(ticks),'xlim',[0 tt+1])
set(plot1(1),'linewidth',1,'Color',[.5 .5 .5],'DisplayName','Not traded','markersize',8)
set(plot1(2),'linewidth',3,'Color','k','DisplayName','Traded (above 50% threshold)','marker','o','markerfacecolor','k')
set(gca,'yticklabel',num2str(get(gca,'ytick')','%.2f'))
legend('location','southwest');
export_fig(['Figures/return.pdf']);

% Returns histogram
y1(~isnan(y)) = nan;
hist([y1 y],20)
xxx = get(gca,'child');
set(xxx(1),'Facecolor',zeros(1,3))
set(xxx(2),'Facecolor',zeros(1,3)+.75)
set(gca,'Fontsize',20,'Fontname','TimesNewRoman','xlim',[-.08 .08])
legend('Not traded','Traded (above 50% threshold)','location','northwest')
export_fig(['Figures/return_histogram.pdf']);

% Rolling Sharpe Ratio
y       = rollSR(win+minhist+1:end);
dts     = dates(win+minhist+1:end)
plot1   = plotwithaxis(y,dts,5);
set(gca,'Fontsize',20,'Fontname','TimesNewRoman','ytick',[0:.2:2])
set(plot1(1),'linewidth',2,'Color','k','DisplayName','60-month Rolling Sharpe Ratio')
set(gca,'yticklabel',num2str(get(gca,'ytick')','%.1f'))
legend('show');
legend('location','southwest');
export_fig(['Figures/rolling_Sharpe.pdf']);
