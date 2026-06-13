function Y=stdize(X)

Y=nan(size(X));
for j=1:size(X,2)
    
    Y(:,j)=(X(:,j)-nanmean(X(:,j)))/nanstd(X(:,j));
    
end
