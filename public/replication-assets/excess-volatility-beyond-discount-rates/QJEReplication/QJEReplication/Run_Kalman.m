%%% OMITS RESULTS BASED ON PROPRIETARY VARIANCE SWAP DATA %%%

clear
usedir = ['~/Dropbox/Lavori/ExcessVolatilityFinal/QJEReplication_distribute/'];
datadir    = [usedir 'Kalman Results/'];

addpath([usedir 'utility']);

%datalist    = {'vs_short';'iv_interp_apple';'iv_interp_citi';'iv_interp_stoxx';'iv_interp_dax';'iv_interp_euro';'iv_interp_yen';'usyc';'inflswap_us';'inflswap_eu';'f_CL';'f_GC';'cds_BRAZIL';'cds_RUSSIA';'cds_GE';'cds_BOFA';};
datalist    = {'iv_interp_apple';'iv_interp_citi';'iv_interp_stoxx';'iv_interp_dax';'iv_interp_euro';'iv_interp_yen';'usyc';'inflswap_us';'inflswap_eu';'f_CL';'f_GC';'cds_BRAZIL';'cds_RUSSIA';'cds_GE';'cds_BOFA';};
for d = 1:length(datalist)
    datalist{d}
    
    dirtmp      = [usedir 'Kalman Results/'];
    listing     = dir(dirtmp);
    filelist    = {listing(:).name}';
    flstrt      = [char(datalist{d})  '_final'];
    indexC      = strfind(filelist,flstrt);
    index       = find(not(cellfun('isempty', indexC)));
    filelist    = filelist(index);
   
    filename    = [dirtmp char(filelist)];
    load(filename,'out','mat','facmat','price')        
    
    if sum(strncmp(datalist{d},{'f_GC','f_CL'},20))
        out2 = Kalman_Futures_Guess(price,mat,facmat,out.prm);
    else
        out2 = Kalman_Alternative_New_Guess(price,mat,facmat,out.prm);
    end
    
    deflatedYields = bsxfun(@minus,price,mean(price));
    deflatedStates = smooth(out2.details.est,deflatedYields);
    fittedP=deflatedStates*out2.details.est.C';
    disp('Error std as % of price')
    std(fittedP-deflatedYields)./std(deflatedYields)
    disp(' ')
    disp('VR')
    real(out2.VR)
    
    kalman.(datalist{d})=out2;
    
end

save([datadir 'kalmanresults.mat'],'kalman'); 
