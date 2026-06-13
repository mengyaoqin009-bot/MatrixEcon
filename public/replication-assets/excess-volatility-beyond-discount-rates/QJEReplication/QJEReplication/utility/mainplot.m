function [] = mainplot(results,filename,closefig)

scl=1;
mm = results.mats;
tv = scl*results.totvar;
av = scl*results.avar;
pv = scl*results.pvar;
vr = av./pv;
            
% Variance decomposition
orthogonal_frac=(tv-av)./tv;
explained_frac=pv./tv;
other=(av-pv)./tv;
[explained_frac(end) other(end) orthogonal_frac(end)]

up = scl*results.avar_perc95';
dn = scl*results.avar_perc5';
av = sqrt(av);pv = sqrt(pv);tv = sqrt(tv);up = sqrt(up);dn = sqrt(dn);
        
warning('off') %#ok<WNOFF>
set(0,'defaulttextinterpreter','latex')

period=results.period;

% CIs
figure
boundednoline(mm,pv,[pv-dn up-pv]);
plot(mm,pv,'k--','Linewidth',3)
hold on

AX = plot(mm,av);

% Styles
AX(1).Color = 'k';AX(1).LineWidth = 3;AX(1).Marker = 'o';AX(1).MarkerSize = 10;
yt  = max(tv)/5:max(tv)/5:max(tv);
sp  = floor(max(mm)/4);
xt  = [1 sp 2*sp 3*sp max(mm)];
set(gca,'ytick',yt,'ycolor','k','ylim',[0 max(max(pv),max(av))],'xlim',[1 max(mm)],'xtick',xt,'FontName','TimesNewRoman','FontSize',18)
set(gca,'yticklabel',num2str(yt','%0.2f'),'ycolor','k','ylim',[0 max(tv)],'xlim',[1 max(mm)])

% Axis labels
ylabel(['Price Volatility'])
xlabel(['Maturity (' period 's)'])

% Rearrange legend labels
labchar = [{'Unrestricted'},{'Restricted'},{'95% Test'}];
h = get(gca,'children');
legend(h([1 2 3]),labchar,'Location','Northwest','FontSize',14)

% Variance ratios
bx = get(AX(1),'XData');
by = get(AX(1),'YData');
xgap = max(mm)/60;
ygap = abs(av(2)-av(1))/7;
labels = cellstr(num2str((av./pv).^2,'%0.2f')); 
if length(labels)>10
    nlab    = length(labels);
    sp      = floor(nlab/10);
    nonemp  = nlab:-sp:1;
    emp     = setdiff(1:nlab,nonemp);
    labels(emp) = {''};
end     
for i = results.numfac+2:length(bx)
    xpos = bx(i) - xgap;
    ypos = by(i) + ygap;
    htext = text(xpos,ypos,labels{i});
    set(htext,'VerticalAlignment','bottom','HorizontalAlignment','center','color','k','fontsize',18,'FontName','TimesNewRoman')
end

f=filename;

% Title
[~,~,latent] = pca(zscore(results.prices));
R2 = sum(latent(1:results.numfac))/sum(latent);
title([sprintf('Factors=%d',results.numfac) sprintf(', $R^2$=%0.1f',100*R2) '\%'],'FontName','TimesNewRoman','FontSize',18,'FontWeight','normal');

set(gcf, 'PaperUnits', 'inches');
set(gcf, 'PaperSize', [9 6]);
set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperPosition', [0 0 9 6]);

set(gcf, 'renderer', 'painters');
print(gcf, '-dpdf', f);
