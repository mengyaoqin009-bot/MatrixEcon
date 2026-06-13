% Simulate ARFIMA models

clear
clc
close all

addpath utility

modelp      = arima('Constant',0,'AR',{0},'Variance',1);
modelq_ar   = 1;
modelq_ma   = 0;

T           = 1000;
mats        = 1:24;

[F,E]       = simulate(modelp,T);

arlist      = [.25 .5 .75];
dlist       = [.1:.1:.4 .49];

jj          = 1;
for dd=1:length(dlist)
    
    for dar=1:length(arlist)
        
        modelq_d=dlist(dd);
        modelq_ar=arlist(dar);
       
        % Construct Q-forecast in each period
        
        prices=nan(T-10,mats(end));
        
        for t=10:T
            temp=arfima_forecast(F(1:t),mats(end),modelq_d,modelq_ar,modelq_ma,0,1);
            prices(t-9,:)=temp';
        end
        
        prices=cumsum(prices,2);
        
        sim.dates=(1:length(prices))';
        sim.prices=prices(:,mats);
        sim.mats=mats;
        sim.levelorlog='level';
        sim.format='total';
        sim.period='month';
        sim.frequency='daily';
        sim.payment='postponed';
        sim.hasfull=false;
        sim.label='Sim';
        
        % Prepare our analysis
        usemats='all';
        
        minR2       = 1;
        results     = predvariance21(sim,usemats,minR2);
        ttt         = results.avar./results.pvar;
        out(jj,:)   = [modelq_d modelq_ar minR2 100*results.cumlatentall(minR2) ttt']; jj = jj+1;
        
        minR2       = 2;
        results     = predvariance21(sim,usemats,minR2);
        ttt         = results.avar./results.pvar;
        out(jj,:)   = [modelq_d  modelq_ar minR2 100*results.cumlatentall(minR2) ttt']; jj = jj+1;
        
        minR2       = 3;
        results     = predvariance21(sim,usemats,minR2);
        ttt         = results.avar./results.pvar;
        out(jj,:)   = [modelq_d modelq_ar minR2 100*results.cumlatentall(minR2) ttt']; jj = jj+1;
        
    end
    dd
end

tabmats = [12 24];
tmpout  = out(:,[1:4 tabmats+3]);

bigout  = [];
for i=1:length(arlist)
    bigout = [bigout , tabout(tmpout(:,2)==arlist(i),:)];
end
bigout

