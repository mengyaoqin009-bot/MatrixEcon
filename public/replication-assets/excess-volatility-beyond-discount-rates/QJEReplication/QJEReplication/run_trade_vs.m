%%% REQUIRES PROPRIETARY VARIANCE SWAP DATA %%%

clear
clc

estwin      = 250;

load Data/alldata.mat

minR2           =0.99;

usedata=data.vs_short_interp;

usemats=1:24;
displaymats=[6 12 18 24];

FUND        = trade_outsample(usedata,usemats,minR2,estwin);
clear S N* burnin *shocks i datatmp d
save(['tradedata/vs_short_interp_OOSresults_estwin_' num2str(estwin)],'-v7.3')

FUND        = trade_insample(usedata,usemats,minR2);
clear S N* burnin *shocks i datatmp d
save(['tradedata/vs_short_interp_ISresults'],'-v7.3');

