function B = ne_to_acoeff_phi(a,b,phi,lambda,mat)

GE=[a b;1 0];
GI=[1+phi -phi;1 0];

for j=1:mat(end)
    B(j,:)=[1 0]*(lambda*GI^j + (1-lambda)*GE^j);
    
end
B=cumsum(B);

B=B(mat,:);

B=B*inv(B(1:2,1:2));
