%**************************************************************************
% Summarize Results
%**************************************************************************

%%% OMITS RESULTS BASED ON PROPRIETARY VARIANCE SWAP DATA %%%

clear
freq        = 'daily';

load('Regression Results/results_regression_2.mat')
load('Regression Results/results_futures_regression_2.mat')
regression_results=results;
regression_results.f_GC=results_futures.f_GC;
regression_results.f_CL=results_futures.f_CL;

load('Kalman Results/kalmanresults.mat');

%datalist    = {'vs_short';'iv_interp_apple';'iv_interp_citi';'iv_interp_stoxx';'iv_interp_dax';'iv_interp_euro';'iv_interp_yen';'usyc';'inflswap_us';'inflswap_eu';'f_CL';'f_GC';'cds_BRAZIL';'cds_RUSSIA';'cds_GE';'cds_BOFA';};
datalist    = {'iv_interp_apple';'iv_interp_citi';'iv_interp_stoxx';'iv_interp_dax';'iv_interp_euro';'iv_interp_yen';'usyc';'inflswap_us';'inflswap_eu';'f_CL';'f_GC';'cds_BRAZIL';'cds_RUSSIA';'cds_GE';'cds_BOFA';};

TABLE=cell(0);
TABLEERR=cell(0);
for d = 1:length(datalist);
    datalist{d}
    
    % Choose which maturities to display
    
    if strcmp(datalist{d},'vs_short')
        displaymats=[4:6];
    elseif sum(strncmp(datalist{d},{'inflswap_us';'inflswap_eu'},20))    
        displaymats=[7:9];
    elseif sum(strncmp(datalist{d},{'iv_interp_apple';'iv_interp_citi';'iv_interp_euro';'iv_interp_yen';'iv_interp_stoxx';'iv_interp_dax'},20))
        displaymats=[4:6];
    elseif sum(strncmp(datalist{d},{'cds_BOFA';'cds_GE'},20))
        displaymats=[4:6];
    elseif sum(strncmp(datalist{d},{'cds_BRAZIL';'cds_RUSSIA'},20))
        displaymats=[4:6];
    elseif strcmp(datalist{d},'usyc')
        displaymats=[9 11 13];
    elseif sum(strncmp(datalist{d},{'f_GC','f_CL'},20))
        displaymats=[5:7];
    end 
    
    % Elements of the table
    assetclass=datalist{d};
    mat=regression_results.(datalist{d}).mats(displaymats);
    period=regression_results.(datalist{d}).period;
    if strcmp(period,'month')
        suffix='mo';
    elseif strcmp(period,'year')
        suffix='yr';
    end
    VR_reg=regression_results.(datalist{d}).vr(displaymats)';
    pva_reg=regression_results.(datalist{d}).pva(displaymats)';
    VR_k=real(kalman.(datalist{d}).VR(displaymats));
    std_k=real(kalman.(datalist{d}).VR_std(displaymats));
    pva_k=1-normcdf((VR_k-1)./std_k);
    nfac=regression_results.(datalist{d}).numfac;
    R2=regression_results.(datalist{d}).cumlatentall(nfac);
    
    % Model error variance (D)
    price=regression_results.(datalist{d}).Y;
    eqcorr  = exp(kalman.(datalist{d}).prm(end))/(1+exp(kalman.(datalist{d}).prm(end)));
    ervol   = diag(std(price))*exp(kalman.(datalist{d}).prm(end-1));
    ercorr  = (1-eqcorr)*eye(length(ervol)) + eqcorr*ones(length(ervol));
    DD      = ervol*ercorr*ervol';
    % This is a standard deviation matrix:
    D       = chol(DD,'lower');
    vec_ervol=diag(ervol);
    
    % Estimated error variance
    deflatedYields = bsxfun(@minus,price,mean(price));
    deflatedStates = smooth(kalman.(datalist{d}).details.est,deflatedYields);
    fittedP=deflatedStates*kalman.(datalist{d}).details.est.C';
    errr=fittedP-deflatedYields;
    vec_estvol=std(errr)';
    
    TBLERR=cell(1);
    
    TBLERR{1,1}=exp(kalman.(datalist{d}).prm(end-1));
    TBLERR{1,2}=ercorr(1,2);
    
    % as a fraction of price
    vec_ervol_price=vec_ervol'./mean(price);
    vec_estvol_price=vec_estvol'./mean(price);
    
    % as a fraction of std of price
    vec_ervol_std=vec_ervol'./std(price);
    vec_estvol_std=vec_estvol'./std(price);
    
    % Autocorrelation of errors
    aco=nan(1,size(errr,2));
    for j=1:size(errr,2)
        aco(j)=corr(errr(2:end,j),errr(1:end-1,j));
    end
    
    nfac=regression_results.(datalist{d}).numfac;
    
    TBLERR{1,3}=mean(aco(1:nfac+1));
    TBLERR{1,4}=mean(aco(nfac+2:end));
    
    TBLERR{1,5}=mean(1-vec_estvol_std(1:nfac+1).^2);
    TBLERR{1,6}=mean(1-vec_estvol_std(nfac+2:end).^2);
    
    evol.(datalist{d})=vec_estvol;
    es.(datalist{d})=errr;
    
    TABLEERR=[TABLEERR;TBLERR];
    
    TBL=cell(3,11);
    TBL{2,1}=['$' assetclass '$'];
    for jj=1:3
        TBL{1,1+jj}=[num2str(mat(jj)) suffix];
        temp=pva_reg(jj);
        if temp<=0.01
            st='^{**}$';
        elseif temp<=0.05
            st='^{*}$';
        else
            st='$';
        end
        TBL{2,1+jj}=['$' num2str(VR_reg(jj),'%10.2f') st];
        
        temp=pva_k(jj);
        if temp<=0.01
            st='^{**}$';
        elseif temp<=0.05
            st='^{*}$';
        else
            st='$';
        end
        TBL{1,5+jj}=[num2str(mat(jj)) suffix];
        TBL{2,5+jj}=['$' num2str(VR_k(jj),'%10.2f') st];
        
    end
    if d==1
        TBL{1,10}='# Factors';
        TBL{1,11}='Panel R2';
        
    end
    TBL{2,10}=num2str(nfac);
    TBL{2,11}=num2str(R2*100,'%10.2f');
    
    TABLE=[TABLE;TBL];
    
end
