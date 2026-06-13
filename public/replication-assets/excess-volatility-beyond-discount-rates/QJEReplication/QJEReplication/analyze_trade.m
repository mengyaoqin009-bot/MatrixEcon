function out = analyze_trade(FUND,N1,N2,thresh,ptc,minhist)

% INPUTS
% FUND      previously estimated position costs
% N2        maturity of long claim at initiation
% N1        maturity of long claim at unwind
% threshold percentile of historical initial profit distribution that
%           must be exceeded to trigger an actual trade
% ptc       percentage trading cost
% minhist   minimum history of data needed before considering a trade
%
% OUTPUTS
% out       structure with sharpe ratios and other trade performance info

% Hardcodes
capital = 1;
margin  = 1;

% Find dimensions
T       = size(FUND,1);
units   = FUND(1,1,1).units;

% Build trade each t
n       = N1-N2;
retall  = nan(T,1);
rettrd  = nan(T,1);
side    = nan(T,1);
shrs    = nan(T,1);
misprc  = nan(T,1);
for tau = 1:T

    %****************************************************
    % History through tau (using most recent param ests)
    %****************************************************
    % Position costs
    S1      = FUND(tau,N1,N2).S1;
    if sum(~isnan(S1))<minhist, continue, end
    S2      = FUND(tau,N1,N2).S2;
    L1      = FUND(tau,N1,N2).L1;
    L2      = FUND(tau,N1,N2).L2;
    const   = FUND(tau,N1,N2).const;
    
    % Trading costs
    S1c     = ptc*(S1-const);
    S2c     = ptc*(S2-const);
    L1c     = ptc*L1;
    L2c     = ptc*L2;

    % Net of trading costs
    S1net   = nan(size(S1));
    S2net   = nan(size(S1));
    L1net   = nan(size(S1));
    L2net   = nan(size(S1));
    prof    = nan(length(S1),2);
    shortleg= nan(size(S1));
    
    % Buy L1, sell S1
    loc             = find(S1-S1c>L1+L1c);
    S1net(loc)      = S1(loc)-S1c(loc);
    L1net(loc)      = L1(loc)+L1c(loc);
    S2net(loc)      = S2(loc)+S2c(loc);
    L2net(loc)      = L2(loc)-L2c(loc);
    prof(loc,:)     = [(S1net(loc)-L1net(loc)),(L2net(loc)-S2net(loc))];
    shortleg(loc)   = S1net(loc);
	side(tau)       = 1;
    
    % Buy S1, sell L1
    loc             = find(S1+S1c<L1-L1c);
    S1net(loc)      = S1(loc)+S1c(loc);
    L1net(loc)      = L1(loc)-L1c(loc);
    S2net(loc)      = S2(loc)-S2c(loc);
    L2net(loc)  	= L2(loc)+L2c(loc);
    prof(loc,:)     = [(L1net(loc)-S1net(loc)),(S2net(loc)-L2net(loc))];
    shortleg(loc)   = L1net(loc);
    
    if S1(tau)+S1c(tau)<L1(tau)-L1c(tau)
        side(tau) = 0;
    elseif S1(tau)-S1c(tau)>L1(tau)+L1c(tau)
        side(tau) = 1;
    end

    % Total historical profits
    maxshares       = capital./(margin*(2*shortleg-prof(:,1)));
    totprof         = maxshares.*(prof(:,1)+prof(:,2));
    
    %****************************************************
    % Trade at tau
    %****************************************************
    shrs(tau)   = maxshares(tau);
    retall(tau) = totprof(tau)/capital;
    misprc(tau) = prof(tau,1);
    
    % Is expected profit (after t-costs) large?, based on full history 
    % assuming current parameters (without look-ahead, so stop at tau-1) 
    %if prof(tau,1) >= (thresh>0)*prctile(prof(1:tau-1,1),thresh)
    %if prof(tau,1) >= (thresh>0)*prctile(misprc(1:tau-1,1),thresh)
    if prof(tau,1)/shortleg(tau) >= (thresh>0)*prctile(misprc(1:tau-1,1)./shortleg(1:tau-1,1),thresh)
        rettrd(tau) = totprof(tau)/capital;
    end
end
out.sr      = nanmean(rettrd)/nanstd(rettrd);    
out.annsr   = out.sr*sqrt(units/n);
out.misprc  = misprc;    
out.retall  = retall;
out.rettrd  = rettrd;
out.shrs    = shrs;
out.islong  = side;
