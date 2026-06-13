function plot1 = plotwithaxis(series,xlabels,numticks,linelabels)

% function plotwithaxis(series,xlabels,numticks,linelabels)
%
% series        = series to be plotted
% axislabels    = vector (same length as series) with, e.g., dates
% numticks      = number of ticks on axis (default=10 if equals [])
% linelabels    = cell array with cell string name of each series

set(0, 'defaultFigurePaperType', 'A4')
set(0, 'defaultFigurePaperUnits', 'centimeters')
set(0, 'defaultFigurePaperPositionMode', 'auto')

if nargin==2 || isempty(numticks),
    numticks = 10;
end

T     = length(series);
space = floor(T/numticks);
ticks = [1,space:space:T];


plot1 = plot(series);
set(gca,'XTick',ticks,'XTickLabel',xlabels(ticks))
xlim([0 T+1]);

if nargin==4,
    for i=1:size(series,2)
        set(plot1(i),'DisplayName',char(linelabels(i)));
    end
    legend('show');
end