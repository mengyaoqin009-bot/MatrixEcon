function d=jacobianest_fast(fun,x0)
    base=fun(x0);
    d=zeros(length(base),length(x0));
    for i=1:length(x0)
        x1 = x0;
        x1(i)=1.00001*x1(i)+.000001;
        d(:,i)=(fun(x1)-base)/(.00001*x1(i)+.000001);
    end
end