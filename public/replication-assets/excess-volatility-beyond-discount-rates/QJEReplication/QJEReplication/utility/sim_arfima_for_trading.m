function prices = sim_arfima_for_trading(d,maxmat,T,burnin)

% Simulate ARFIMA models

% Choose model to simulate prices from

% Simulate factors under P
% Note that the dynamics of factors under p are irrelevant, so factors can
% have any dynamics. To simulate the time series of factors we can use any
% model p factor, it shouldn't matter.
% modelp = arima('Constant',0,'AR',{0},'Variance',1);
% F=simulate(modelp,T);

% Here is where you choose the model under Q
modelq_ma= 0;
modelq_d = d;
modelq_ar= 0.25;
mats=1:maxmat;

% Construct factors using Q-dynamics (forecast plus noise)
F = nan(T,1);
F(1,1) = 0;
for t=2:T
	F(t,1) = arfima_forecast(F(t-1,1),1,modelq_d,modelq_ar,modelq_ma,0,1)+randn;
end

% Construct prices Q-forecast in each period        
prices=nan(T,mats(end));
for t=10:T
    temp=arfima_forecast(F(1:t),mats(end),modelq_d,modelq_ar,modelq_ma,0,1);
    prices(t,:)=temp';
end
%prices  = prices + 1.5*abs(min(vec(prices)));        
prices  = cumsum(prices,2);
prices  = prices(burnin+1:end,:);
