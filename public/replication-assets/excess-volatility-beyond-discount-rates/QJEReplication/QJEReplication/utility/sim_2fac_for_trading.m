function prices = sim_2fac_for_trading(a1,a2,maxmat,T,burnin)

% Create a term structure dataset based on simulated pricing in lstar model
% x(t+1) = a1*x(t) + a2*x(t)/(1+exp(-g*(x(t)-c))) + shock(t+1)

% Create a term structure dataset based on simulated pricing in estar model
% x(t+1) = a1*x(t) + a2*x(t)*(1-exp(-g*(x(t)-c)^2)) + shock(t+1)

%**************************************************************************
% Choices
%**************************************************************************

% Other parameters
c           = zeros(1,2);
A           = diag([a1 a2]);

% Shocks
shocks      = randn(T,2);
%**************************************************************************
% Simulation
%**************************************************************************
    
x       = nan(T,2);
p       = nan(T,maxmat);
for t=1:T
    if t==1,
        x(1,:)    = c;
    else
        x(t,:)    = A*x(t-1,:)' + shocks(t,:)';            
    end

    for m=1:maxmat
        xs = (A.^m)*x(t,:)';
        p(t,m) = sum(xs);            
    end
end
p       = p + 1.5*abs(min(vec(p)));
% Setup data for test
prices  = cumsum(p,2);
prices  = prices(burnin+1:end,:);
