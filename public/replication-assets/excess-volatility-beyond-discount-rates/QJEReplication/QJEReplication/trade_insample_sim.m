function annsr = trade_insample_sim(usedata,results,N1,N2,thresh,ptc)

capital     = 1;
margin      = 1;

numfac      = results.numfac;
pcoeff      = results.acoeff;
pconst      = results.aconst;
dates       = results.dates;
prices      = results.Y;

%**************************************************************************
% Convert daily prices frequency that matches maturity units
%**************************************************************************

if strcmp(usedata.period,'month') && strcmp(usedata.frequency,'daily')
    ym      = floor(dates/100);
    eomdays = find(ym(2:end)~=ym(1:end-1));
    prices  = prices(eomdays+1,:);
    dates   = dates(eomdays+1);
end

if strcmp(usedata.period,'year') && strcmp(usedata.frequency,'daily')
    ym      = floor(dates/10000);
    eomdays = find(ym(2:end)~=ym(1:end-1));
    prices  = prices(eomdays+1,:);
    dates   = dates(eomdays+1);
end
   
if strcmp(usedata.period,'month')
    units   = 12;
elseif strcmp(usedata.period,'year')
    units   = 1;
end

%**************************************************************************
% Implement trade
%**************************************************************************

SR  = nan(size(prices,2));
% n is the number of period the position will be held, from N1 to N2
n = N1-N2;

% Only track holding period returns, not interim returns
prof        = nan(length(dates),2);
fundprof    = nan(length(dates),1);
fundret     = nan(length(dates),1);
fundshrs    = nan(length(dates),1);

for t=1:length(dates)-n

    % Long Maturity Trade:
    % L1 is the value of the portfolio at time t
    % L2 is the final value at t+n, when it has N2 remaining
    L1      = prices(t,N1);
    L2      = prices(t+n,N2);

    L1c=ptc*L1;
    L2c=ptc*L2;

    % Short Maturity Trade:    
    % The hedging position consists of a constant
    % plus an investment in bonds that will reduce to the short-term
    % factors plus a security that expires n period from now that hedges the
    % remaining part of the cash flows
    % Make sure to hedge all interim cash flows
    % weights chooses the weights so that the position is perfectly hedged
    % comes time N2
    weights = pcoeff(N2,:);    
    S1      = pconst(N2) + weights*prices(t,(1:numfac)+n)' + (1-sum(weights))*prices(t,n);
    S2      = pconst(N2) + weights*prices(t+n,1:numfac)';

    S1c=ptc*(weights*prices(t,(1:numfac)+n)' + (1-sum(weights))*prices(t,n));
    S2c=ptc*(weights*prices(t+n,1:numfac)');

    % Buy L1, sell S1
    if S1-S1c>L1+L1c
        prof(t,:)   = [(S1-S1c-L1-L1c),(L2-L2c-S2-S2c)];
        shortleg    = S1-S1c;
    % Buy S1, sell L1    
    elseif S1<L1
        prof(t,:)   = [(L1-L1c-S1-S1c),(S2-S2c-L2-L2c)];
        shortleg    = L1-L1c;
    else
        prof(t,:)   = nan;
        continue
    end
    
    maxshares       = capital/(margin*(2*shortleg-prof(t,1)));

    fundprof(t,:)   = maxshares.*(prof(t,1)+prof(t,2));

    % Return is fundprof/C
    fundret(t,:)    = fundprof(t,:)/capital;
    % Track weights
    fundshrs(t,:)   = maxshares;
end
fundret(prof(:,1)<prctile(prof(:,1),thresh)) = nan;
sr                  = nanmean(fundret)/nanstd(fundret);
annsr               = sr*sqrt(units/n);
