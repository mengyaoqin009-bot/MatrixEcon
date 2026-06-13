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
    bigout = [bigout , tmpout(tmpout(:,2)==arlist(i),:)];
end
bigout


x1 = arfima_forecast(ones(25,1),25,.00000001,.75,modelq_ma,0,1);
x2 = arfima_forecast(ones(25,1),25,.1,.75,modelq_ma,0,1);
x3 = arfima_forecast(ones(25,1),25,.3,.75,modelq_ma,0,1);
x4 = arfima_forecast(ones(25,1),25,.49,.75,modelq_ma,0,1);
X = [x1 x2 x3 x4];

set(0, 'defaultFigurePaperType', 'A4')
set(0, 'defaultFigurePaperUnits', 'centimeters')
set(0, 'defaultFigurePaperPositionMode', 'auto')
set(0, 'defaultfigureposition',[5 -21 700 600])
set(0,'defaulttextinterpreter','latex')
plot1 = plot(X);
set(plot1(1),'DisplayName','$d=0$','Color',zeros(1,3)+.7,'Linewidth',3)
set(plot1(2),'DisplayName','$d=0.1$','Color',zeros(1,3)+.5,'Linewidth',3,'marker','o','markersize',10,'LineStyle','--')
set(plot1(3),'DisplayName','$d=0.3$','Color',zeros(1,3)+.3,'Linewidth',3,'marker','x','markersize',10)
set(plot1(4),'DisplayName','$d=0.49$','Color',zeros(1,3),'Linewidth',3)
xlabel('Periods')
set(gca,'Fontsize',20,'Fontname','TimesNewRoman')
h=legend('location','southwest')
set(h,'Interpreter','latex')
