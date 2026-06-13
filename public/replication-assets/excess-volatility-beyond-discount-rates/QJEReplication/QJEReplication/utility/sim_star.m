function [prices,x,xdet] = sim_star(type,a1,a2,g,maxmat,T,burnin,simshocks,shocks)

% Create a term structure dataset based on simulated pricing in lstar model
% x(t+1) = a1*x(t) + a2*x(t)/(1+exp(-g*(x(t)-c))) + shock(t+1)

% Create a term structure dataset based on simulated pricing in estar model
% x(t+1) = a1*x(t) + a2*x(t)*(1-exp(-g*(x(t)-c)^2)) + shock(t+1)

%**************************************************************************
% Choices
%**************************************************************************

% Shock distribution size
S           = size(simshocks,1);

% Other parameters
c           = 0;

%**************************************************************************
% Simulation
%**************************************************************************
    
x       = nan(T,1);
xdet    = nan(T,1);
p       = nan(T,maxmat);
for t=1:T
    if t==1,
        x(1)    = c;
        xdet(1) = c;
    else
        if strcmp(type,'lstar')
            x(t)    = a1*x(t-1)*(1-1/(1+exp(-g*(x(t-1)-c)))) + a2*x(t-1)/(1+exp(-g*(x(t-1)-c))) + shocks(t);
            xdet(t) = a1*x(t-1)*(1-1/(1+exp(-g*(x(t-1)-c)))) + a2*x(t-1)/(1+exp(-g*(x(t-1)-c)));
        elseif strcmp(type,'estar')
            x(t)    = a1*x(t-1)*exp(-g*(x(t-1)-c)^2) + a2*x(t-1)*(1-exp(-g*(x(t-1)-c)^2)) + shocks(t);
            xdet(t) = a1*x(t-1)*exp(-g*(x(t-1)-c)^2) + a2*x(t-1)*(1-exp(-g*(x(t-1)-c)^2));
        elseif strcmp(type,'ar1sim') || strcmp(type,'ar1analytic') || strcmp(type,'arbit')
            x(t)    = a1*x(t-1) + shocks(t);            
        end
    end

    xs = x(t)*ones(S,1);
    for m=1:maxmat
        if strcmp(type,'lstar')
            xs = a1*xs.*(1-1./(1+exp(-g*(xs-c)))) + a2*xs./(1+exp(-g*(xs-c))) + simshocks(:,m);
        elseif strcmp(type,'estar')
            xs = a1*xs.*exp(-g*(xs-c).^2) + a2*xs.*(1-exp(-g*(xs-c).^2)) + simshocks(:,m);
        elseif strcmp(type,'ar1sim')
            xs = a1*xs + simshocks(:,m);
        elseif strcmp(type,'ar1analytic')
            xs = (a1^m)*x(t);
        elseif strcmp(type,'arbit')
            if m<maxmat/2,
                xs = (a1^m)*x(t);
            else
                xs = ((a1+.01)^m)*x(t);
            end            
        end
        p(t,m) = mean(xs);            
    end
end
%p       = p + 1.5*abs(min(vec(p)));
% Setup data for test
prices  = cumsum(p,2);
prices  = prices(burnin+1:end,:);
x       = x(burnin+1:end,:);
xdet    = xdet(burnin+1:end,:);
