function [a,b,phi,lambda] = acoeff_to_ne_phi(acoeff,mat)

fun=@(x)ne_to_acoeff_phi(x(1),x(2),x(3),x(4),mat)-acoeff;
startx1=[1.1;-0.5;0.2;0.99];

llist=[-1:.1:1];
for j=1:length(llist)

    startx1(end)=llist(j);
    [param1,f1(j,1)]=fmincon(@(x)sum(sum(fun(x).^2)),startx1,[],[],[],[],[-1;-1;-1;0],[1.5;1;1;1]);
    a(j,1)=param1(1);
    b(j,1)=param1(2);
    phi(j,1)=param1(3);
    lambda(j,1)=param1(4);
end
f=find(f1==min(f1));f=f(1);
a=a(f);
b=b(f);
phi=phi(f);
lambda=lambda(f);
    