function rho_vec = B_to_rho_simple(Bvec,longmat,shortmat)

% Bvec is the coefficient of the regression of longmat onto the maturities
% in shortmat (factor loadings)

nfac=size(Bvec,1);

poll=pol(Bvec,shortmat,longmat);

lambda      = roots(poll);
rho_vec=selectroots(lambda,nfac);

end




%**************************************************************************
% Auxiliary functions
%**************************************************************************

function rho_vec=selectroots(lambda,nroots)

% Select nfac roots

rho_vec=lambda(abs(lambda)<1 & lambda>0);

if length(rho_vec)>=nroots
    
    [~,i]=sort(abs(rho_vec),'descend');
    rho_vec=rho_vec(i);
    rho_vec=rho_vec(1:nroots);
    
else
    
    rho_vec=lambda(abs(lambda)<1);
    
    if length(rho_vec)>=nroots
        
        [~,i]=sort(abs(rho_vec),'descend');
        rho_vec=rho_vec(i);
        rho_vec=rho_vec(1:nroots);
        
    else
        
        [~,i]=sort(abs(lambda),'descend');
        lambda=lambda(i);
        f=find(abs(lambda)<1);
        if ~isempty(f)
            rho_vec=lambda(f(1)-(nroots-(length(lambda)-f(1)+1)):end);
        else
            rho_vec=lambda(0-(nroots-(length(lambda)-0+1)):end);
        end
        
    end
end

end



function pol=pol(c,shortmat,longmat)

% From the vector of regression coefficients, c, and the maturities of the
% regression, construct the polynomial coefficients

degree      = shortmat-1;
maxdegree   = longmat-1;
deglist     = maxdegree:-1:0;
pol         = ones(1,maxdegree+1);
for k=1:length(degree)
    loc     = find(deglist<=degree(k));
    pol(loc)= pol(loc)-c(k);
end

end

