function FUND = trade_insample(usedata,mats,minR2)

%**************************************************************************
% Convert daily prices frequency that matches maturity units
%**************************************************************************

dates       = usedata.dates;
prices      = usedata.prices(:,mats);

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
% Estimate model
%**************************************************************************

results = predvariance21_trade(usedata,mats,minR2);
numfac          = results.numfac;
pcoeff          = results.acoeff;
pconst          = results.aconst;


T       = length(dates);
FUND    = repmat(struct('units',units),T,size(prices,2),size(prices,2));
for tau = 1:T
    
    
    %**************************************************************************
    % Implement trade
    %**************************************************************************

    for N1 = (numfac+2):size(prices,2);
        for N2 = (numfac+1):(N1-1);

            % n is the number of period the position will be held, from N1 to N2
            n = N1-N2;
            if tau+n>T, continue, end

            S1      = nan(T,1);
            L1      = nan(T,1);
            S2      = nan(T,1);
            L2      = nan(T,1);
            for t=1:tau
                if t+n>T, continue, end

                % Long Maturity Trade:
                % L1 is the value of the portfolio at time t
                % L2 is the final value at t+n, when it has N2 remaining

                L1(t)   = prices(t,N1);
                L2(t)   = prices(t+n,N2);

                % Short Maturity Trade:    
                % The hedging position consists of a constant
                % plus an investment in bonds that will reduce to the short-term
                % factors plus a security that expires n period from now that hedges the
                % remaining part of the cash flows
                % Make sure to hedge all interim cash flows
                % weights chooses the weights so that the position is perfectly hedged
                % comes time N2
                S1(t)       = pconst(N2) + pcoeff(N2,:)*prices(t,(1:numfac)+n)' + (1-sum(pcoeff(N2,:)))*prices(t,n);
                S2(t)       = pconst(N2) + pcoeff(N2,:)*prices(t+n,1:numfac)';
            end
            FUND(tau,N1,N2).S1      = S1;
            FUND(tau,N1,N2).L1      = L1;
            FUND(tau,N1,N2).S2      = S2;
            FUND(tau,N1,N2).L2      = L2;
            FUND(tau,N1,N2).const   = pconst(N2);
            clear const L1 L2 S1 S2 weights
        end
    end
    
end