function data=interpolateprices(usedata)

data=usedata;

for t=1:size(usedata.prices,1)
    pr=usedata.prices(t,:)./usedata.mats;
    
    if sum(~isnan(pr))>1
    
        pr_interp=interp1(usedata.mats,pr,1:usedata.mats(end),'spline');
        
        % Do not extrapolate
        temp=interp1(usedata.mats,pr,1:usedata.mats(end),'linear');
        pr_interp(isnan(temp))=NaN;
        
        pr_interp=pr_interp.*(1:usedata.mats(end));
        prices(t,:)=pr_interp;
        
    else
        
        prices(t,:)=NaN;
        
    end
end

data.prices=prices;
data.mats=1:usedata.mats(end);