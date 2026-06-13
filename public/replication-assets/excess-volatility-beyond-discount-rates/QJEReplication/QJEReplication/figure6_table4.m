clear, clc
addpath utility

%**************************************************************************
% Choices
%**************************************************************************

% Number of periods
T           = 10000; 
burnin      = 9000;

% Maturities
mats        = 1:24;

% Shock distribution size
S           = 10000;

% Parameters
a1list      = [.01,.1,.25]';
a2list      = .99-a1list;
glist       = [.1,.5,1,5]';
c           = 0;

% Max num factors
nfac        = 3;

% STAR type
type        = 'lstar';

%**************************************************************************
% Simulations
%************************************************************************** 

params      = [kron([a1list a2list],ones(size(glist))) kron(ones(size(a1list)),glist)];
nprm        = length(params);
maxmat      = max(mats);
shocks      = randn(T,1);
simshocks   = randn(S,maxmat);
shocks      = shocks-mean(shocks);
simshocks   = bsxfun(@minus,simshocks,mean(simshocks));
VR          = nan(nprm,maxmat,nfac);
R2          = nan(nprm,nfac);
XL          = nan(T-burnin,nprm);
XD          = nan(T-burnin,nprm);
keepdata    = repmat(struct,length(params),1);

mlpl = parpool
parfor j = 1:nprm 
    
    j
    
    a1 = params(j,1);
    a2 = params(j,2);
    g  = params(j,3);
    
    % Simulate x process and prices
    [prices,x,xdet] = sim_star(type,a1,a2,g,maxmat,T,burnin,simshocks,shocks);
    
    % Save x to later plot nonlinearity
    lagx    = lag(x,1,nan);
    [~,ix]  = sort(lagx);
    XL(:,j) = lagx(ix);
    XD(:,j) = xdet(ix);

    % Setup data for test
    sim         = struct;
    sim.dates   =(1:length(prices))';
    sim.prices  =prices(:,mats);
    sim.mats    =mats;
    sim.levelorlog='level';
    sim.format  ='total';
    sim.period  ='month';
    sim.frequency='daily';
    sim.payment ='postponed';
    sim.hasfull =false;
    sim.label   ='Sim';
    keepdata(j).data = sim;

    % Run test
    usemats='all';
    
    for k = 1:nfac
        try
            results     = predvariance21(sim,usemats,k);
        catch
            continue,
        end
        ttt         = results.avar./results.pvar;
        VR(j,:,k)   = ttt;
        R2(j,k)     = results.cumlatentall(k);
    end
    j
end
delete(mlpl)

%**************************************************************************
% Tables
%**************************************************************************

usemats = [12 24];
bigtab  = [];
gsublist= glist;
for m = 1:length(gsublist)
    medtab  = [];
    for k=1:nfac
        tab = [];
        for j=2:length(a1list)
            loc     = find(params(:,1)==a1list(j) & params(:,3)==gsublist(m));
            if j==2
                tab     = [tab [gsublist(m) k 100*R2(loc,k) VR(loc,usemats,k)]];
            else
                tab     = [tab [100*R2(loc,k) VR(loc,usemats,k)]];
            end            
        end
        medtab = [medtab;tab];
    end
    bigtab = [bigtab;medtab];
end
bigtab

%**************************************************************************
% Plot nonlinearity
%**************************************************************************

% Prepare for plots : Maximize figure
set(0, 'defaultFigurePaperType', 'A4')
set(0, 'defaultFigurePaperUnits', 'centimeters')
set(0, 'defaultFigurePaperPositionMode', 'auto')
set(0, 'defaultfigureposition',[5 -21 1616 585])
set(0,'defaulttextinterpreter','latex')
usea1 = [.01, .10, .25];
for z=1:3
    loc = find(params(:,1)==usea1(z));
    for i=1:length(loc)
        col = .8-i/(2+length(loc));
        subplot(1,3,z), hold on, plot(XL(:,loc(i)),XD(:,loc(i)),'color',col*ones(1,3),'linewidth',3*(1.1-col),'displayname',['$\gamma = $' num2str(params(loc(i),3))])
        set(gca,'xlim',[-2,2],'fontname','timesnewroman','fontsize',20)
        xlabel('$x_{t}$')
        if z==1, ylabel('$E_{t}^{Q}[x_{t+1}]$'), end
        title(['$\rho = $' num2str(params(loc(i)))],'fontname','timesnewroman','fontsize',20)
    end
    if z==1,
        leg = legend('location','northwest');
        set(leg,'interpreter','latex');
    end
end

