# Source: Yield Curve Momentum

- PDF: `inputs/paper/yield-curve-momentum/Sihvonen - 2024 - Yield curve momentum.pdf`
- Pages: 26



<!-- page 1 -->

Yield curve momentum
Markus Sihvonen
1 ,
�
1
Bank of Finland, Research Unit, Snellmaninaukio, Helsinki, Finland
�
Corresponding author: Bank of Finland, Research Unit, Snellmaninaukio, P.O. Box 160, Helsinki, Finland.  
Email: markus.sihvonen@bof.fi
Abstract 
I analyze time series momentum along the Treasury term structure. Yield curve momentum is primar -
ily due to changes in the level factor of yields. Because yield changes are partly induced by changes in 
the federal funds rate, yield curve momentum is related to post-FOMC (Federal Open Market 
Committee) announcement drift. The momentum factor is unspanned by the information in the term 
structure today and is hence inconsistent with standard term structure, macrofinance, and behavioral 
models. I argue that the results are consistent with a model with unpriced longer term dependencies.
Keywords: Bond risk premia, term structure models, time series momentum, spanning . 
JEL classifications: G12, E43, E47. 
1. Introduction
Past returns can predict future returns ( Fama 1965 ). Moskowitz, Ooi, and Pedersen (2012)
find evidence of medium horizon return autocorrelation among a large set of asset classes. 
They dub this phenomenon “time series momentum.”
1
Possibly due to the focus on a broad set of asset classes, the time series momentum litera -
ture has evolved largely separately from the vast literature on term-structure modeling and 
bond risk premia (e.g., Fama and Bliss 1987 ; Ang and Piazzesi 2003 ; Cochrane and 
Piazzesi 2005 ). Because of this disconnect, it is, for example, not clear whether the 
observed return autocorrelation of government bonds is consistent with standard term- 
structure models.
2 
This article is an attempt to study the finer dynamics of time series mo -
mentum of government bonds, or yield curve momentum, and close the gap between the 
two literatures.
The term structure literature features a dichotomy between variables that are spanned by 
current yields and unspanned variables that contain additional information useful for pre -
dicting returns ( Duffee 2011 ; Joslin et al. 2014 ). The key empirical contribution of this arti -
cle is to argue that past returns are spanned neither by current yields nor previously studied 
possibly unspanned variables.
1 
This is a growing literature, see for example, Pitk €aj €arvi, Suominen, and Vaittinen (2020) and Zhang (2022) .
2 
Durham (2013) analyzes the performance of a duration neutral cross-sectional momentum strategy with 
government bonds. He argues that some its profitability can be explained by a specific affine term structure 
model. However, he does not address time series momentum. Asness, Moskowitz, and Pedersen (2013) study a 
cross-country momentum strategy with government bonds, finding that such a strategy yields positive yet fairly 
small returns. Brooks and Moskowitz (2017) explain bond returns using value, momentum and carry factors. 
However, they do not study the sources of momentum or relate the findings to the term structure modelling liter -
ature. Osterrieder and Schotman (2017) connect bond return autocorrelations with model risk parameters but 
do not explicitly address momentum.
Editor: Ian Dew-Becker 
Received: February 13, 2023. Accepted: January 23, 2024 
# The Author(s) 2024. Published by Oxford University Press on behalf of the European Finance Association. 
All rights reserved. For permissions, please email: journals.permissions@oup.com  
Review of Finance, 2024, 28, 805–829 
https://doi.org/10.1093/rof/rfae003 
Advance Access Publication Date: 10 February 2024 
Article 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 2 -->

While no-arbitrage term structure models can in principle allow for unspanned variables, 
theoretically motivated models imply full spanning. Therefore, my results are problematic 
for nearly all models attempting to explain yield curve momentum.
My investigation starts by establishing basic properties of yield curve momentum. First, 
momentum is significant only for the fairly short one month lookback horizon but not for 
longer horizons. I therefore focus on the positive association between the current month bond 
return and that in the previous month. Second, I find that the term structure of momentum 
coefficients is downward sloping. Slope coefficients from regressing monthly bond returns on 
the past month return of the same maturity bond decline with the bond’s maturity.
Third, I argue that yield curve momentum occurs primarily due to changes in the first 
principal component of yields, also known as the level factor. This is even though the level 
of the level factor cannot explain momentum. The associated strong factor structure in 
bond returns implies that most of momentum can be captured using a single return factor 
defined as the average past return of different maturity bonds.
Fourth, I assess the relationship between monetary policy and yield curve momentum. 
Because changes in the Treasury yield curve are related to changes in the federal funds tar -
get rate, yield curve momentum is partly induced by monetary policy. That is, yield curve 
momentum is in part driven by a drift pattern following a recent rate change by the Fed. 
However, because especially long maturity yields display movements unrelated to target 
rate changes, yield curve momentum is not identical to post-FOMC (Federal Open Market 
Committee) announcement drift discussed in Brooks, Katz, and Lustig (2019) .
Cieslak (2018) finds strong evidence for positive rate forecast errors in months in which 
the Fed eases policy but insignificant results for tightening months. This might also suggest 
asymmetries for the momentum results. Indeed, for short maturities, momentum appears 
stronger following rate cuts than hikes or positive rather than negative returns. However, 
such differences are mainly statistically insignificant and the patterns reverse for longer 
maturities. Given the sampling variation in the data, it is challenging to identify differences 
in momentum coefficients in subsamples.
Fifth, I analyze whether past returns are spanned by current yields. Standard term struc -
ture models imply that yields are affine in a set of factors, which also determine expected 
bond returns. But since the yields are a simple function of the factors, controlling for suffi -
ciently many yields is equivalent to controlling for the factors. These models can in princi -
ple generate return autocorrelation through autocorrelation in model factors. However, 
they imply that past returns cannot predict future returns after controlling for yields.
I find that past bond returns predict future returns also conditional on the information in 
the yield curve today. In fact past returns appear largely orthogonal to current yield curve 
factors. Hence, the spanning condition is clearly violated in the data.
Several papers (e.g., Duffee 2011 ; Joslin et al. 2014 ) have pointed that macro variables re -
lated to real activity and inflation also appear unspanned by yields. I therefore show that my 
results hold when controlling for macro variables, including a large panel of such variables as 
in Ludvigson and Ng (2009) . Hence, past returns are also unspanned by macro variables.
As mentioned, while reduced form no-arbitrage models can be parametrized to include 
unspanned variables, theoretically motivated models imply full spanning. This includes 
macrofinance models characterized through investor preferences. While some of these 
models imply non-linear relationship between bond returns and past yields, they still imply 
full spanning after controlling for these non-linear relationships.
The majority of explanations offered for momentum feature deviations from full infor -
mation rational expectations. Can such behavioral theories explain my findings? Not nec -
essarily. The reason is that the current behavioral models tend to imply the same affine 
form for yields though the coefficients might be different from those in rational models.
The key modeling contribution of this article is to (1) construct a term structure model 
consistent with my empirical findings and (2) offer a theoretical interpretation for the 
806                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 3 -->

model. Here agents do not understand that factors possess longer term dependencies and 
bond prices reflect this misunderstanding. The misspecification of true factor dynamics 
leads to a momentum pattern similar to that observed in the data. Moreover, it leads to a 
violation of the standard spanning condition so that past bond returns predict future 
returns conditional on standard yield curve factors. Finally, this misinterpretion also 
explains the forecast errors documented in interest rate surveys.
I explain that my term structure models are consistent with the form of bounded ratio -
nality discussed by Molavi (2019) and Molavi, Tahbaz-Salehi, and Vedolin (2021) . Here 
an agent can only entertain models with at most a fixed number of factors and chooses a 
misspecified model that gives a best representation of the data. This constraint on model 
complexity leads agents to ignore longer dependencies in factors.
2. Data and definitions
I start by describing the data sources and variable definitions.
2.1 Bond yields and returns
I use the dataset on zero coupon US Treasury yields constructed by Liu and Wu (2021) . 
These yields are built using a novel non-parametric method, which implies lower pricing 
errors compared to previous interpolation procedures. I apply a sample of end of month 
data between August 1971 and December 2019. Data are available for bonds with matur -
ities up to 10 years. In the Supplementary Appendix, I show that the key results are robust 
to using the alternative dataset constructed by G €urkaynak, Sack, and Wright (2007) (Table 
13), Bloomberg zero coupon curves (Table 13), German zero coupon data (Table 14), US 
and international bond indices (Section OA. 9 and Table 15) as well as Treasury bond 
futures data (Tables 11 and 12).
I denote the monthly continuously compounded yield of a bond (or bill) with n months 
until maturity by y
n
t
. The logarithmic excess monthly return of maturity n bond is then 
given by 
rx
n
tþ1
¼ − n − 1
ð Þ
y
n − 1
tþ1
þ ny
n
t
− y
1
t
(1) 
Here the excess return is calculated as the monthly bond return deducted by the one 
month bill rate. The return between month t and any month t þ h, rx
n
t;t þh
, is given by the 
sum over the one period excess returns.
To save space, in most of the tables and figures, I show results for bonds with integer an -
nual maturities rather than all the 120 different maturities. That is, these focus on bonds 
with maturities 12; 24; . . . ; 120 months, that is, 1; 2; . . . ; 10 years. Table 1 shows key de -
scriptive statistics for these yields and excess returns.
2.2 Macro variables and other data
I construct a large panel of 135 other macroeconomic and financial variables. This contains 
all the variables in the FRED-MD database of McCracken and Ng (2016) . Following 
Moench and Siavash (2022) , I further add eight variables. This includes the weekly hours 
of production and non-supervisory employees, the Philadelphia Fed leading indicator for 
the US economy, the VXO index, and the measure of realized stock market volatility of 
Berger, Dew-Becker, and Giglio (2020) . Moreover, the data contain the Bank of America 
Merrill Lynch MOVE bond volatility index, a measure of financial uncertainty from 
Ludvigson, Ma, and Ng (2021) , the excess bond premium from Gilchrist and Zakraj �sek 
(2012) , and the 3-Month Treasury bill forecast from the Consensus Economics. The meas -
ures based on academic papers are extended to cover my sample period accordingly.
Yield curve momentum                                                                                                                                  807 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 4 -->

I also show results when controlling only for the Chicago Fed National Activity Index, 
used, for example, by Joslin et al. (2014) , and the trend inflation measure used in Cieslak 
and Povala (2015) . Here I apply a smoothing parameter of 0.987 in monthly updating 
terms to annual core inflation.
3
Finally, I obtain the federal funds target rate and the relevant target ranges from FRED.
3. Simple regression evidence
I first consider a univariate regression of the form 
rx
n
tþ1
¼ a þ brx
n
t − h;t
þ �
tþ1
(2) 
That is, I regress the excess return of an n maturity bond in month t þ 1 on the excess re -
turn of an n maturity bond between months t − h and t. When calculating excess returns, I 
hold maturity constant by rolling over the bond each month. I focus on lookback horizons 
(h) of 1, 3, 6, and 12 months. I apply Newey and West (1987) standard errors and the lag 
selection procedure of Newey and West (1994) , which gives five lags.
4 
Figure 1 illustrates 
the results for the slope coefficients; the full results are given in Supplementary 
Appendix Table 1.
The results are statistically significant for the return over the past month. However, the 
results for longer horizon past returns are mainly not significant. Therefore, for the rest of 
this article, I focus on the one month horizon. This is in contrast to Moskowitz, Ooi, and 
Pedersen (2012) who focus on 1 year past returns.
5 
I also ignore the volatility scaling 
Table 1. Descriptive statistics for bond yields and excess returns.
Yields (%)
Maturity 1 2 3 4 5 6 7 8 9 10
Mean 5.06 5.31 5.50 5.69 5.82 5.96 6.06 6.14 6.22 6.27
Volatility 3.54 3.49 3.40 3.32 3.23 3.18 3.11 3.06 3.00 2.93
Skewness 0.48 0.40 0.38 0.39 0.39 0.42 0.44 0.45 0.46 0.45
Ex. kurtosis −0.15 −0.32 −0.36 −0.37 −0.38 −0.37 −0.32 −0.31 −0.28 −0.26
Obs# 580 580 580 580 580 580 580 580 580 580
Excess returns (%)
Maturity 1 2 3 4 5 6 7 8 9 10
Mean 0.07 0.10 0.15 0.17 0.20 0.22 0.22 0.25 0.24 0.26
Volatility 0.44 0.83 1.18 1.51 1.80 2.08 2.33 2.61 2.86 3.13
Skewness 1.20 0.54 0.14 −0.12 −0.02 0.09 0.11 0.13 0.11 0.10
Ex. Kurtosis 17.39 13.87 8.21 5.04 4.11 4.11 3.06 2.51 2.25 2.18
Obs# 579 579 579 579 579 579 579 579 579 579
The data are monthly but the bond yields are expressed in annual form. Maturities are in years. The sample is 
from August 1971 to December 2019.
3
The trend inflation s
CPI
t 
is calculated using s
CPI
t
¼ ð1 − vÞ
P
t − 1
i¼0
v
i
p
t − i
, where v is smoothing/learning pa -
rameter. Cieslak and Povala (2015) compute v using survey data.
4 
However, there are a couple of exceptions. For the annual lookback horizon, I apply 11 lags, which is the 
number of overlapping observations induced by regressing monthly returns on annual returns. Note that my 
main specifications have no overlapping observations. For the 2000–2019 subsample regressions, shown in the 
Supplementary Appendix, the procedure gives four lags. Moreover, it gives three lags for the 2020–2023 post- 
sample regressions.
5 
Note that here the significance of 1-year past returns is somewhat better than that for 3- and 6-month past 
returns. However, still here only the slope coefficients for 3- and 4-year bonds are significant at the 5 per -
cent level.
808                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 5 -->

applied by Moskowitz, Ooi, and Pedersen (2012) as it can induce return predictability 
unrelated to raw momentum in returns as discussed in Kim, Tse, and Wald (2016) and 
Huang et al. (2020) . Moreover, in contrast to Moskowitz, Ooi, and Pedersen (2012) , 
I avert pooled regressions due to potentially biased slope estimates and issues with calculat -
ing standard errors ( Hjalmarsson 2010 ; Huang et al. 2020 ).
The regression betas decline in bond maturity. Hence, the term structure of 
momentum coefficients is downward sloping. This is inconsistent with one-factor interest 
rate models.
6
The results for the 1-month horizon have strong economic significance as illustrated in  
Figure 2. It shows the mean excess returns for different maturity bonds both for the full 
sample and in two subsamples with positive and negative past month excess returns for the 
same maturity bond. The mean returns are substantially higher following positive rather 
than negative past month returns and the mean returns are increasing in bond maturity. 
The Supplementary Appendix contains additional results concerning the investment perfor -
mance of simple momentum strategies.
3.1 Factor momentum
Yields and bond returns are often found to exhibit strong factor structures (e.g., Litterman 
and Scheinkman 1991 ). Hence, yield curve momentum might also be captured well using a 
simple factor. I next demonstrate that most of this momentum can indeed be represented 
by a single factor.
2 4 6 8 10
Maturity
0
0.2
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
1 Month Lookback
2 4 6 8 10
Maturity
-0.05
0
0.05
0.1
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
3 Month Lookback
2 4 6 8 10
 Maturity
0
0.05
0.1
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
6 Month Lookback
2 4 6 8 10
 Maturity
0
0.02
0.04
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
12 Month Lookback
Figure 1. The figure shows the slope coefficients and the relevant 95 percent confidence bounds from 
regressing the monthly excess returns of different maturity bonds (years) on the past excess return for the 
same maturity bond for lookback horizons of 1, 3, 6, and 12 months. The sample is from August 1971 to 
December 2019.
6 
I show this in a working paper version of the article, available on my webpage.
Yield curve momentum                                                                                                                                  809 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 6 -->

Let us create a simple average of the different maturity bond returns as 
�rx
t
¼
1
10
X
n2N
rx
n
t
; (3) 
where N ¼ f12; 24; 36; 48; 60; 72; 84; 96; 108; 120g, that is, I apply the integer annual 
maturities between 1 and 10 years. I then run a regression 
rx
n
tþ1
¼ a þ b �rx
t
þ �
tþ1
(4) 
The results are given in Table 2. Using the average of excess returns across different ma -
turity bonds leads to only a minor loss in predictive power relative to using the past return 
of a bond with the corresponding maturity. For longest maturity bonds, the R
2 
actually 
increases but this improvement is small. I confirm this overall result in the next section by 
showing that yield curve momentum is driven by a change in the first principal component 
of yields. Note that the loadings for the momentum factor are still different for returns 
based on different maturity bonds.
4. Sources of momentum
What is driving the results obtained in the previous section? This section derives three key 
results. First, yield curve momentum is due to a change in the level factor of yields. Second, 
these level factor changes are not spanned by current yields. Third, results are similar when 
controlling for macroeconomic variables.
1 2 3 4 5 6 7 8 9
10
 Maturity (years)
-0.2
0
0.2
0.4
0.6
A
v
e
r
a
g
e
 
R
e
t
u
r
n
 
(
%
/
m
o
n
t
h
)
All month
s
Positive 
Past Retu
rn
Negative 
Past Retu
rn
Figure 2. The figure shows the mean excess returns for different maturity bonds both for the full sample and 
in subsamples following positive and negative past month returns. The sample is from August 1971 to 
December 2019.
810                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 7 -->

4.1 The effect of level changes
I first revisit the question of whether yield curve momentum can be captured using a single 
factor. I extract the first principal component of yields using all the 120 maturities between 
1 month and 10 years and consider the following regression:
7 
rx
n
tþ1
¼ a þ bDpc
1
t
þ �
tþ1
(5) 
I also decompose return autocovariance to a level change effect and a residual compo -
nent. In particular, consider the contemporaneous projection: 
rx
n
t
¼ a þ bDpc
1
t
þ e
t
(6) 
Now we have 
Covðrx
n
tþ1
; rx
n
t
Þ ¼
CovðbDpc
1
t
þ �
tþ1
; bDpc
1
t
þ e
t
Þ ¼
CovðbDpc
1
t
þ �
tþ1
; bDpc
1
t
Þ þ CovðbDpc
1
t
þ �
tþ1
; e
t
Þ ¼
bVarðDpc
1
t
Þb
|fflfflfflfflfflfflfflfflfflffl{zfflfflfflfflfflfflfflfflfflffl}
Level change effect
þCovðbDpc
1
t
þ �
tþ1
; e
t
Þ
|fflfflfflfflfflfflfflfflfflfflfflfflfflfflfflfflfflffl{zfflfflfflfflfflfflfflfflfflfflfflfflfflfflfflfflfflffl}
Residual effect 
Here the third line uses the fact that �
tþ1 
must be orthogonal to Dpc
1
t
. In a standard one- 
factor model, the first component would account for 100 percent of return autocovariance.
The first principal component explains roughly 98.5 percent of the variation in yields. 
This component is often called a level factor since it loads fairly evenly on all maturities. 
The average contemporaneous correlation between the change in this factor and excess 
bond returns is −0.95. That is, an increase in this factor is related to an upward shift in the 
yield curve but also to negative excess bond returns. This high correlation between bond 
excess returns and changes in the level factor indicates that these level factor changes will 
also explain a large fraction of yield curve momentum.
Table 2. The results from regressing the monthly excess returns of different maturity (years) bonds on the 
previous month average excess return of different maturity bonds.
Mat. a t-value b t-value R
2 
(%)
1 0.06 3.58 0.04 2.37 3.16
2 0.09 2.68 0.08 2.75 2.73
3 0.13 2.84 0.09 2.57 2.04
4 0.15 2.56 0.09 2.43 1.31
5 0.17 2.43 0.11 2.45 1.22
6 0.19 2.37 0.14 2.65 1.46
7 0.19 2.14 0.15 2.59 1.42
8 0.21 2.08 0.17 2.55 1.33
9 0.21 1.85 0.17 2.45 1.17
10 0.23 1.85 0.18 2.27 1.05
The t-values are based on Newey and West (1987) standard errors with five lags. The sample is from August 
1971 to December 2019.
7 
The Supplementary Appendix further performs a carry-yield change decomposition. Excess returns depend 
on yield changes and a carry component. I find that autocorrelation in excess bond returns is due to autocorrela -
tion in yield changes.
Yield curve momentum                                                                                                                                  811 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 8 -->

Results from the predictability regression and decomposition are given in Table 3. The 
share of return autocovariance explained by level factor changes is on average 94 percent 
and ranges between 81 percent and 110 percent. A share of more than 100 percent implies 
that the residual component from a contemporaneous projection of returns on the change 
in the level factor is negatively associated with next month returns. The R
2 
statistics in the 
regressions are of similar magnitude than in the plain momentum regressions, where 
returns are explained by past returns. Overall, I conclude that the bulk of yield curve mo -
mentum is explained by changes in the level factor.
8
4.2 Spanning decomposition
Past bond returns can predict future bond returns either because (1) past bond returns con -
tain information about current yield curve factors that predict future bond returns or (2) 
past returns contain additional information relevant for future returns. Formally, the first 
explanation implies that past returns are spanned by current yields whereas the second 
implies that they are not. As explained later, standard term structure models imply that the 
spanning condition holds so that yield curve momentum should be explained by the 
first channel.
To test the relative importance of the two channels, first, consider a contemporaneous re -
gression of this month’s excess bond returns on this month’s principal components of 
yields. To save space, I make use of the finding that most of momentum can be captured us -
ing a single factor and look at the average return of different maturity bonds �rx
t
. I apply 
the first five principal components of yields; including further components has minor 
effects on the results.
The results are given in Table 4. The regression R
2 
statistic is only roughly 3 percent, 
while full spanning would imply a value of 100 percent. Hence, past returns are largely 
unspanned by yields. Most of the coefficients are also statistically insignificant, except 
those corresponding to the second principal component of yields.
The above results suggest that unspanned variation in returns is important to explaining 
yield curve momentum. I now test this result more formally by including the first five 
Table 3. The results from regressing the excess monthly returns of different maturity (years) bonds on the 
past month change in the first principal components of yields.
Regression Decomposition
Mat. a t-value b t-value R
2 
(%) Dpc
1
t 
change Other
1 0.07 4.00 −0.02 −2.47 3.41 86.32 % 13.68 %
2 0.10 3.05 −0.03 −2.86 2.59 86.37 % 13.63 %
3 0.14 3.14 −0.04 −2.57 1.85 88.24 % 11.76 %
4 0.17 2.79 −0.04 −2.29 1.07 82.38 % 17.62 %
5 0.19 2.65 −0.05 −2.22 0.94 80.78 % 19.22 %
6 0.21 2.60 −0.06 −2.39 1.17 109.91 % −9.91 %
7 0.22 2.37 −0.07 −2.37 1.22 110.25 % −10.25 %
8 0.24 2.30 −0.07 −2.36 1.21 103.88 % −3.88 %
9 0.23 2.06 −0.07 −2.23 1.02 96.38 % 3.62 %
10 0.25 2.05 −0.08 −2.09 0.92 96.09 % 3.91 %
The table shows a decomposition of return autocovariance into an effect due to a change in this principal 
component and a residual component. The t-values are based on Newey and West (1987) standard errors with 
five lags. The sample is from August 1971 to December 2019.
8 
In the working paper version available on my webpage, I further consider the predictive power of changes 
in higher order principal components, finding weak results for most principal components. Also note that while 
level changes are important predictors of bond returns, the level of the level factor contains only minor predic -
tive information for returns.
812                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 9 -->

principal components into the predictive regression shown in Figure 1. Figure 3 plots the 
slope coefficients on past returns; the full results are given in Supplementary Appendix 
Table 4. We can see that the past return is still significant, with corresponding slope coeffi -
cients of similar magnitude to those obtained before. These results further confirm that 
past returns are largely unspanned by current yields.
9
4.3 Controlling for macro variables
Macroeconomic variables are often found to forecast bond returns on top of yields ( Duffee 
2011 ; Joslin et al. 2014 ; Cieslak and Povala 2015 ; Coroneo, Giannone, and Modugno 
2016 ; Moench and Siavash 2022 ). As discussed later, this suggests these variables are 
unspanned by current yields. In theory, past returns might be correlated with such 
unspanned macro variables, which could explain why past returns themselves are 
unspanned. I next argue that my results are valid also when controlling for information in 
macroeconomic data.
To control for a large set of macro variables, I first follow an approach similar to that in 
Ludvigson and Ng (2009) . Consider predicting bond returns using a factor model of 
the form: 
m
it
¼ k
0
f
t
þ e
it
rx
n
tþ1
¼ a
0
M
t
þ b
0
Z
t
þ �
tþ1
;
where M
t
� f
t
. Here I posit that each macroeconomic variable m
it 
is driven by a smaller set 
of common factors f
t
. These common macroeconomic factors then predict bond returns 
along with other variables Z
t
.
The factors are extracted using principal component analysis.
10 
The number of macro 
factors is determined using the IC2 criterion of Bai and Ng (2002) . The criterion suggests 
that the macro data are well described by seven common factors, which explain about 
44 percent of the variation in the data.
Table 4. The results from a contemporaneous regression of the average excess monthly return of different 
maturity bonds on the first five principal components of yields.
a −0.11
t-value −0.41
b
1
, pc
1
−0.005
t-value −1.64
b
2
, pc
2
−0.05
t-value −2.09
b
3
, pc
3
0.12
t-value 1.34
b
4
, pc
4
0.03
t-value 0.10
b
5
, pc
5
0.33
t-value 0.90
R
2
(%) 2.82
The t-values are based on Newey and West (1987) standard errors with five lags. The sample is from August 
1971 to December 2019.
9
The working paper version available on my webpage provides additional support that this holds when in -
cluding more yields to the predictability regression as well as controlling for potential non-linearities.
10 
Missing observations are handled using the expectation maximization algorithm suggested by Stock and 
Watson (2002) .
Yield curve momentum                                                                                                                                  813 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 10 -->

The optimal combination of estimated factors 
^
M
t 
is determined using the BIC criterion. 
Following Ludvigson and Ng (2009) , I also consider squares and cubes of the factors. Note 
that the optimal factors are generally different for different maturity bonds. I control for 
past bond returns and the first five principal components of yields, that is 
Z
t
¼ ½rx
n
t
; pc
1
t
; pc
2
t
; pc
3
t
; pc
4
t
; pc
5
t
�. This is in contrast to Ludvigson and Ng (2009) who only 
control for the Cochrane–Piazzesi factor. Note that, as in Moench and Siavash (2022) , my 
macro panel also includes additional macroeconomic and financial variables.
The results for coefficients on past returns are given in Figure 4. The full results are 
shown in Supplementary Appendix Table 5. The set of selected factors includes the first, 
third and seventh principal components of the macro data. It also contains the squares of 
the first and seventh principal components as well as the cube of the fourth principal com -
ponent. The chosen factors vary somewhat among the different maturities. The past returns 
remain significant for maturities between 1 and 5 years though less so for the longer matu -
rity bonds. Interestingly, for short maturities, the momentum slope coefficients are also 
larger than before.
I also examined a version of the algorithm where the set of possible macro factors 
includes the lags of the first seven principal components of the macro variables. For 1 year 
bonds, the algorithm includes the lags of the first and second principal components but the 
coefficient and t-value on the past return are similar to before. The lags are not selected for 
the longer maturities; so, the results are exactly as before.
Principal components of macroeconomic variables lack an obvious economic interpreta -
tion. Therefore, I now also show results when instead controlling for trend inflation and 
the activity index. I also include lags of these macro variables, as well as the five principal 
components of yields.
The results for the coefficients on past returns are given in Figure 5; the full results are 
given in Supplementary Appendix Table 6. The slope coefficients for past returns are 
1 2 3 4 5 6 7 8 9
10
 Maturity
0
0.1
0.2
0.3
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
Figure 3. The figure shows the slope coefficients on the past month return for different maturity bonds when 
regressing monthly excess returns on their past month value and the past month’s first five principal 
components of yields. It also plots the relevant 95% confidence bounds, based on Newey and West (1987)
standard errors with five lags, for these slope coefficients. The sample is from August 1971 to 
December 2019.
814                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 11 -->

1 2 3 4 5 6 7 8 9
10
 Maturity
0
0.2
0.4
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
Figure 4. The figure shows the slope coefficients on the past month return for different maturity bonds when 
regressing monthly excess returns on their past month value, the past month’s first five principal 
components of yields and the past month optimal set of macroeconomic predictors. The optimal macro 
predictors are found similarly to Ludvigson and Ng (2009) . It also plots the 95% confidence bounds for these 
slope coefficients. These confidence bounds are based on asymptotic standard errors ( Bai and Ng 2006 ) with 
the Newey and West (1987) correction with five lags. The sample is from August 1971 to December 2019.
1 2 3 4 5 6 7 8 9
10
 Maturity
0
0.1
0.2
0.3
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
Figure 5. The figure shows the slope coefficients on the past month return for different maturity bonds when 
regressing monthly excess returns on their past month value, trend inflation, the national activity index, as 
well as the past month values of these two macroeconomic variables. It also shows the 95% confidence 
bounds, based on Newey and West (1987) standard errors with five lags, for these slope coefficients. The 
sample is from August 1971 to December 2019.
Yield curve momentum                                                                                                                                  815 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 12 -->

clearly significant and of similar magnitude than before. Trend inflation and its lag are also 
significant. Moreover, the activity index is also significant though its lag only weakly so.
I conclude that accounting for macro variables does not alter the main results of this arti -
cle though these variables possibly represent additional unspanned information useful for 
predicting returns. However, in some specifications, the predictive content of past returns 
of bonds with maturities greater than 5 years appears weaker than before, while the predic -
tive content of past returns of short maturity bonds can be higher.
5. Momentum and post-FOMC announcement drift
Because especially the short end of the yield curve tends to be tightly controlled by the Fed, 
yield curve momentum might be induced by policy rate changes. This is also due to recent 
findings related to post-FOMC announcement drift. Brooks, Katz, and Lustig (2019) find 
that longer term bond yields respond sluggishly to changes in the federal funds tar -
get rate.
11
I now study this relationship using data on the federal funds target rate.
12 
Figure 6 first 
shows the correlation between changes in yields and changes in the federal funds target 
rate. It does so in two samples: the full sample starting in 1982 and a subsample of months 
with a non-zero change in this policy rate.
Excluding months with no rate changes, this correlation is close to 0.8 at the short end 
of the yield curve but only around 0.3 at the long end. The decline in correlation for longer 
maturity bonds is natural since the federal funds rate is an overnight rate. All of these corre -
lations are somewhat smaller in the full sample; roughly 30 percent of months included 
changes in the policy rate. Overall, these results suggest important dependencies between 
target rate and bond yield changes. However, they also indicate that not all of the yield 
changes can be attributed to target rate changes.
I then analyze the contribution of target rate changes to yield curve momentum using a 
decomposition. I project bond returns on contemporaneous changes in the target rate 
as follows: 
rx
n
t
¼ a þ bDFFT R
t
þ e
t
(7) 
Using this projection, I can then decompose bond return autocovariance into an effect 
caused by changes in the target rate and a residual component: 
Covðrx
n
tþ1
; rx
n
t
Þ ¼ bVarðDFFT R
t
Þb
|fflfflfflfflfflfflfflfflfflfflfflfflffl{zfflfflfflfflfflfflfflfflfflfflfflfflffl}
FFR effect
þCovðrx
n
tþ1
; e
t
Þ
|fflfflfflfflfflfflfflfflfflffl{zfflfflfflfflfflfflfflfflfflffl}
Other
; (8) 
where b is the slope coefficient from a regression of bond returns on the past month change 
in the target rate. The results are given in Table 5. This simple decomposition suggests that 
target rate changes are an important contributor to momentum for shorter maturities but 
less so for longer maturities. However, even for shorter maturities the contribution of tar -
get rate changes is less than 50%.
Overall, yield curve momentum is therefore connected with, but not identical to, post- 
FOMC announcement drift. Past month yield hikes predict low returns in the following 
month. These yield changes can be partly but not fully explained with same month move -
ments in the policy rate.
11 
There is a similar drift pattern in equity markets after rate changes, see Neuhierl and Weber (2018) .
12 
In a working paper version available on my webpage, I also consider unexpected shocks in the rate. Here 
the data begin later in February 1990.
816                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 13 -->

I then more formally test the hypothesis that past returns, on top of target rate changes, 
contain additional information that is useful for predicting future returns. In particular, 
I regress the maturity-specific excess return on the corresponding past month excess return 
as well as the past month change in the target rate. The results are given in Table 6. The 
coefficients associated with the target rate change are insignificant. On the other hand, the 
coefficients for past returns remain significant for bonds with maturities between 1 and 
5 years. While these coefficients are also insignificant for longer maturity bonds, note that 
here the sample is shorter than in our main specifications.
These results further support the idea that, while the two are related, yield curve momen -
tum is not well captured by the change in the target rate. Again the logic is that past month 
0 20 40 60 80
100 120
 Maturity (months)
0.2
0.4
0.6
0.8
C
o
r
r
e
l
a
t
i
o
n
Full Samp
le
With FFTR
 Changes
Figure 6. The figure shows the correlation between the monthly change in the federal funds target rate 
(FFTR) and the change in the yield of different maturity (in months) bonds in the full sample as well as in the 
subsample of months with non-zero FFTR changes. The sample is from October 1982 to December 2019.
Table 5. The decomposition of monthly autocovariance in excess returns of different maturity (years) bonds 
into a part explained by change in the federal funds target rate and a residual component.
Maturity FFTR effect Other
1 47.3% 52.7%
2 31.0% 69.0%
3 20.3% 79.8%
4 21.3% 78.8%
5 17.1% 82.9%
6 13.6% 86.4%
7 5.3% 94.7%
8 7.4% 92.6%
9 4.8% 95.2%
10 4.8% 95.2%
The sample is from October 1982 to December 2019.
Yield curve momentum                                                                                                                                  817 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 14 -->

returns can be only partly attributed to target rate changes. The Supplementary Appendix 
contains additional results concerning the post-FOMC announcement drift.
Cieslak (2018) finds evidence for asymmetries in forecast errors for Fed easings and 
tightenings. She argues that forecast errors for the FFR are large and negative when Fed 
cuts the rate but insignificant for rate hikes. This finding is further corroborated by 
Schmeling, Schrimpf, and Steffensen (2022) . I next study whether there are also some 
asymmetries in the momentum results for easings and tightenings.
In particular, I consider the following specification 
rx
n
tþ1
¼ a þ b
1
IðDFFTR < 0Þrx
n
t
þ b
2
IðDFFTR > 0Þrx
n
t
þ b
3
IðDFFTR ¼ 0Þrx
n
t
þ �
tþ1
(9) 
That is, I interact past returns with three dummies, IðDFFTR < 0Þ, IðDFFTR > 0Þ, and 
IðDFFTR ¼ 0Þ, and study whether the effect of past returns is different. Rates remain 
unchanged in about 69% of the months, the share rate hikes and cuts is roughly equal.
13 
The sample starts from 1982 when the FFTR becomes available.
The results are given in Table 7. For short maturities, the momentum slope coefficients 
are larger for rate cuts than for rate hikes or no rate changes. However, a Wald test cannot 
reject the null that the slope for rate cut months is equal to that in rate hike or no rate 
change months. For longer maturities, the pattern is reversed in that the slope coefficients 
are lower for rate cut months. For the 9-year maturity, a Wald test can actually reject the 
null that the slopes for rate cuts and no rate hike months are equal at the 5 percent level.
Overall, there is then some weak evidence for asymmetries for rate cut, hike, and no 
change months. However, overall, the results are inconclusive. In the Supplementary 
Appendix, I further study asymmetries in months with positive and negative returns. While 
slope coefficients tend to be higher in months with positive returns, the differences are 
mostly statistically insignificant and there are again some reversals. I also show that auto -
correlated bond returns over FOMC announcement days do not explain my results.
6. Momentum and affine term structure models
How to account for the above empirical findings in a term structure model? I start by intro -
ducing a baseline term structure model before moving to the quantitative exercise.
14
Table 6. The results from regressing the monthly excess returns of different maturity bonds (years) on the 
past month excess return for the same maturity bond as well as the past month change in the federal funds 
target rate.
Mat 1 2 3 4 5 6 7 8 9 10
a 0.07 0.11 0.17 0.21 0.25 0.29 0.32 0.36 0.38 0.41
t-value 5.82 4.34 4.09 3.82 3.58 3.48 3.30 3.24 3.03 3.02
b
1
, rx 0.16 0.16 0.13 0.10 0.10 0.07 0.06 0.04 0.04 0.03
t-value 2.45 3.03 2.81 2.23 2.18 1.56 1.32 0.95 0.94 0.70
b
2
, DFFTR −0.11 −0.17 −0.20 −0.26 −0.25 −0.18 0.01 −0.05 −0.01 −0.03
t-value −1.56 −1.21 −0.94 −0.90 −0.71 −0.44 0.02 −0.08 −0.01 −0.04
R
2 
(%) 5.75 3.88 2.57 1.58 1.27 0.65 0.36 0.20 0.19 0.11
The t-values are based on Newey and West (1987) standard errors with five lags. The sample is from October 
1982 to December 2019.
13 
Still, rates declined overall during the period as the rate cuts were larger than the corresponding hikes.
14 
The working paper version available on my webpage further discusses minimal theoretical requirements 
implied by the data and explains why standard models fail to explain especially the violation of the span -
ning condition.
818                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 15 -->

For generality, and similarly to Piazzesi, Salomao, and Schneider (2015) , consider three 
probability measures. P represents objective probabilities as viewed by a rational econome -
trician. For simplicity, I omit this P symbol from expectations taken under rational beliefs. 
S expresses subjective beliefs of a representative agent. Finally, Q is a pricing measure de -
fined below.
Assume that the state perceived as important for determining bond prices is an m � 1 di -
mensional factor X
s
t
. This may generally be different from the m
e
� 1 true state vector in 
the economy X
t
, which can in particular include additional factors X
s
t
� X
t
, m � m
e
. 
Under the subjective measure, the factor X
s
t 
follows: 
X
s
t
¼ l
s
þ /
s
X
s
t − 1
þ v
t
; (10) 
where v
t 
is multivariate Gaussian v
t
� Nð0; V Þ. I assume that under the objective measure, 
the true state of the economy also follows a Gaussian VAR model with coefficients l 
and /.
The log nominal discount factor, expressed under the subjective measure, is a linear 
function of the subjective factors 
M
tþ1
¼ exp − d
0
− d
0
1
X
s
t
−
1
2
k
0
t
V k
t
− k
0
t
v
tþ1
� �
k
t
¼ k
0
þ k
1
X
s
t
(11) 
I can then solve bond prices recursively using 
p
n
t
¼ log E
S
t
ðM
tþ1
expðp
n − 1
tþ1
ÞÞ (12) 
with p
0
t
¼ 0. In this model, prices and yields take a standard affine form. 
p
n
t
¼ A
n
þ B
0
n
X
s
t
(13) 
Table 7. The results from regressing the monthly excess returns of different maturity bonds (years) on the 
past month excess return for the same maturity bond interacted with dummies for cases when the monthly 
change in the federal funds target rate is negative, positive, and zero.
Mat 1 2 3 4 5 6 7 8 9 10
a 0.06 0.10 0.16 0.20 0.24 0.29 0.33 0.37 0.40 0.43
t-value 4.99 3.88 3.86 3.62 3.47 3.50 3.41 3.37 3.24 3.23
b
1
, DFFTR < 0 0.37 0.29 0.22 0.18 0.11 −0.00 −0.08 −0.14 −0.21 −0.23
t-value 3.75 2.89 2.21 1.75 1.13 −0.01 −0.80 −1.17 −1.52 −1.47
b
2
, DFFTR > 0 0.08 0.12 0.10 0.06 0.04 0.01 0.00 −0.02 −0.00 −0.01
t-value 0.60 1.06 0.92 0.57 0.33 0.12 0.01 −0.18 −0.03 −0.06
b
3
, DFFTR ¼ 0 0.12 0.14 0.14 0.11 0.13 0.12 0.13 0.13 0.14 0.13
t-value 1.44 2.26 2.26 1.87 2.24 2.11 2.11 2.20 2.37 2.13
Pðb
1
¼ b
2
Þ 0.12 0.31 0.49 0.45 0.66 0.92 0.61 0.52 0.28 0.26
Pðb
1
¼ b
3
Þ 0.82 0.88 0.80 0.72 0.47 0.39 0.33 0.27 0.27 0.29
Pðb
2
¼ b
3
Þ 0.06 0.22 0.51 0.54 0.83 0.26 0.09 0.06 0.04 0.05
R
2 
(%) 6.13 3.34 1.83 0.86 0.58 0.27 0.50 0.84 1.57 1.59
The table shows the P-values from Wald tests for the equality of coefficients. The t-values and Wald tests are 
based on Newey and West (1987) standard errors with five lags. The sample is from October 1982 to 
December 2019.
Yield curve momentum                                                                                                                                  819 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 16 -->

here 
B
nþ1
¼ − d
1
þ B
0
n
/
�
; A
nþ1
¼ − d
0
þ A
n
þ B
0
n
l
�
þ
1
2
B
0
n
VB
n 
with A
0
¼ 0; B
0
¼ 0. Here the risk neutral parameters are given by 
/
�
¼ /
s
− V k
1
(14) 
l
�
¼ l
s
− V k
0
(15) 
These risk neutral parameters define the pricing measure Q under which the factor X
s
t 
follows a VAR process with modified parameters. This pricing measure is equivalent to the 
subjective measure S.
6.1 Accounting for momentum in a term structure model
I now discuss how to account for momentum in a term structure model. I initially consider 
a reduced form no-arbitrage setting but later offer a potential theoretical interpretation for 
the approach in Section 6.3.
Consider a term structure model with five principal component factors similar to that in 
Adrian, Crump, and Moench (2013) . That is, let X
s
t
¼ ½pc
1
t
; pc
2
t
; pc
3
t
; pc
4
t
; pc
5
t
�. Since the 
model features a large set of parameters, I estimate it using linear regressions as proposed 
by Adrian, Crump, and Moench (2013) .
Now consider the following twist. Assume that under P, and as suggested by the data,
15 
the first principal component of yields pc
1 
depends also on its second lag. That is, the true 
state variable is X
t
¼ ½pc
1
t
; pc
2
t
; pc
3
t
; pc
4
t
; pc
5
t
; pc
1
t − 1
�. The factor dynamics can be represented 
in a VAR(1) model in companion form and are detailed in the Supplementary Appendix.
I solve for the momentum betas and conditional momentum betas when controlling for 
the first five principal components of yields by simulating the model under the above P dy -
namics, that is when the first principal component depends also on its second lag. Figure 7 
shows the resulting momentum betas along with those measured from the data. Overall, 
one can see that the model is able to replicate yield curve momentum in the data fairly ac -
curately. The model also matches variation in yields reasonably well. Here it implies a root 
mean squared error of 1.8 bps in annual terms. As documented in the Supplementary 
Appendix, the model additionally captures the predictive ability of the levels of the yield 
curve factors.
Figure 7 also shows the momentum betas implied by the standard ACM model, where 
the true factor dynamics are simulated assuming the level factor does not depend on its sec -
ond lag. This model implies only mild autocorrelation in returns. Moreover, the condi -
tional momentum betas are exactly zero since the model satisfies full spanning. In the 
modified model, the second unspanned lag of the level factor instead explains both momen -
tum, boosting autocorrelation relative to the standard ACM model, and why past returns 
are unspanned by current yields.
Adrian, Crump, and Moench (2013) also generalize their estimation approach to cover 
unspanned variables though do not apply the method to unspanned lags. As in Joslin et al. 
(2014) , here the violation of full spanning occurs due to knife-edge restrictions on model 
parameters. Note that I instead estimate my model as if the standard ACM model is correct 
but simulate the model under different, more general, and realistic dynamics for the state 
variables. This is consistent with my bounded rationality interpretation of the model 
15
See the Supplementary Appendix for the estimation results when controlling for all the five princi -
pal components.
820                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 17 -->

P 6¼ S, discussed later, whereas in the approach of Adrian, Crump, and Moench (2013) , 
the agent effectively understands the true dynamics, P ¼ S.
Alternatively, in the standard approach to unspanned variables, the change to the risk 
neutral measure Q is done from the true dynamics P whereas I instead make the change 
from the subjective measure S 6¼ P. These two approaches lead to a different covariance 
matrix of shocks. Accounting for the lag in the level factor leads to a smaller estimate of 
level factor residual variance.
The two approaches, however, lead to the same yield loadings B
n 
and therefore have 
identical predictions for momentum betas. The constant terms of bond prices A
n 
are in -
stead generally different though in my case this difference is numerically small.
Joslin, Le, and Singleton (2013) consider an affine term structure model where the factor 
process has a higher order under the true than under the pricing measure. They argue that 
their factor dynamics are well described by a VAR(1) process under the pricing measure.
16 
However, they consider a model where the factors follow a VAR(3) process under the true 
measure. They find that imposing no-arbitrage restrictions does not have large effects for 
characterizing the joint distribution of yields and macro variables.
However, they focus on the interaction between macro variables and yields and do not 
study momentum or any other form of return predictability. Moreover, most of their speci -
fications include at most the first two principal components of yields. Like in Joslin et al. 
(2014) , and unlike in this article, the change to the risk neutral measure is done from true 
2 4 6 8 10
 Maturity
0
0.05
0.1
0.15
0.2
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
M-ACM
ACM
Data
2 4 6 8 10
 Maturity
0
0.05
0.1
0.15
0.2
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
M-ACM
ACM
Data
Figure 7. The figure shows the plain (left) and conditional (right) momentum coefficients observed in the data 
and those implied by a modified ACM model (M-ACM), where the model is simulated under a true model in 
which the level factor also depends on its second lag. The figure also shows the coefficients implied by the 
standard ACM simulated ignoring this second lag. The plain momentum slope coefficients are based on a 
regression of monthly excess return on their past values. The conditional slope coefficients further control for 
past month information in yields. Maturity is measured in years.
16
This form, which is also assumed by Joslin et al. (2014) , is convenient as it allows for rotations between la -
tent and yield based factors.
Yield curve momentum                                                                                                                                  821 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 18 -->

dynamics so that the model is consistent with rational expectations models.
17 
However, 
the approach is reduced form in that the authors do not offer an explanation for why the 
factor process has a higher order under the true than under the pricing measure. I instead 
offer a microfoundation for my model, based on the theory developed by Molavi (2019) .
Finally, Feunou and Fontaine (2014) construct a model in which only the expected fu -
ture values of factors are spanned by yields but their actual values are not. On the other 
hand, my model features a factor, whose current value is spanned but its expectation 
is not.
In addition to helping to understand momentum, the above results bear broad implica -
tions for term structure modeling. Institutions like central banks tend to apply reduced 
form term structure models with VAR(1) dynamics. These models are used, for example, 
to decompose bond yields to short rate expectations and term premia. My results suggest 
that VAR(2) dynamics might instead be more appropriate, at least when working with 
monthly data.
6.2 Spanning puzzle and measurement error
Cochrane and Piazzesi (2005) find that taking lags of a factor computed from forward 
rates can help forecast returns. They suggest that this could be explained in a model where 
yields are observed with error. However, in the working paper version of the paper, avail -
able on my webpage, I show that their results are largely unrelated to mine.
Duffee (2011) , Joslin et al. (2014) , and Cieslak and Povala (2015) find evidence that 
measures of inflation and real activity can help forecast bond returns on top of yields. That 
is, some macro variables appear to be unspanned by yields. However, Cieslak and Povala 
(2015) argue that the evidence is rather consistent with measurement error in yields and in -
flation. Similarly, Bauer and Rudebusch (2017) argue that the results of Joslin et al. (2014)
are due to measurement error. Feunou and Fontaine (2014) postulate that measurement er -
ror can explain why expected inflation is not spanned by yields but not why current infla -
tion is unspanned.
I next argue that while measurement error can possibly explain why macro variables are 
unspanned by yields, it does not explain why past returns are unspanned. I estimate the 
standard 5-factor ACM model and simulate it under the assumption that the postulated dy -
namics are correct. Similarly to Duffee (2011) , Cieslak (2018) , and Bauer and Rudebusch 
(2017) , I introduce a normally distributed noise term to yields that is independent across 
maturities. I set the volatility of the error to a conservative value of 10 bps annually. This is 
higher than the value employed by Bauer and Rudebusch (2017) (5.8 bps) and also higher 
than the yield measurement error found by Liu and Wu (2021) . Note that since both time 
t þ 1 and time t returns depend on yields at period t, both of these returns are affected by 
some of the same noise.
The results are given in Figure 8, which shows the simulated 5 percent (two-sided) criti -
cal values for the conditional betas. While the model implies full spanning and hence zero 
conditional betas, measurement error can in principle explain positive observed betas. 
However, the betas measured from the data are clearly above the critical values so that the 
momentum in the data is larger than can reasonably be accounted by measurement error. 
In the Supplementary Appendix, I show further results for plain momentum betas.
18
In the Supplementary Appendix, I also find similar results for bond index and futures 
returns that are not subject to pricing error. In future work, robustness should be evaluated 
using zero coupon yields derived using the Fama and Bliss (1987) algorithm or its exten -
sions such as that applied by Le and Singleton (2013) .
19 
While this method is 
17 
But as argued above, this is not important from the perspective of momentum.
18 
In the working paper version available on my webpage, I also show that introducing noise to the term 
structure model of Cieslak and Povala (2015) does not explain my findings.
19
The baseline Fama–Bliss data are available only for integer annual maturities and cannot be used to mea -
sure monthly returns. I therefore do not apply these data in the article.
822                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 19 -->

“unsmoothed” in that the prices bonds perfectly in sample, the zero coupon yields still con -
tain pricing error. Robustness should also be evaluated using traded cash bonds. Here trad -
ing strategy evaluation is more involved than for futures as there can be many bonds with 
similar tenors outstanding so discretion needs to be applied regarding which bonds to in -
clude in the trade. However, given the overall consistency of the results across different 
data sources, I would expect to find roughly similar results.
6.3 A bounded rationality interpretation
I have argued that the empirical results of this article are problematic for standard theories 
that do not naturally generate a violation of the spanning condition. But what is the eco -
nomic reason that the spanning condition is not satisfied? Why are past returns important 
for predicting future returns but not be priced in the term structure of interest rates today? 
I next argue that my results are consistent with the form of bounded rationality discussed 
by Molavi (2019) and Molavi, Tahbaz-Salehi, and Vedolin (2021) .
20
Molavi (2019) considers a form of model misspecification in which an agent can only en -
tertain factor models with at most d factors, where d represents the agent’s sophistication. 
On the other hand, the agent can consider any cross-sectional relationship between model 
variables. Therefore, the approach captures the difficulty in dealing with time- 
series complexity.
1 2 3 4 5 6 7 8 9
10
 Maturity
0.05
0.1
0.15
0.2
S
l
o
p
e
 
C
o
e
f
f
i
c
i
e
n
t
Data
Critical value, ACM +
measurement error
Figure 8. The figure shows the 5 percent (two-sided) critical values for the conditional momentum betas 
obtained by introducing measurement error to the yields obtained by simulating a standard 5-factor ACM 
model. It also shows conditional betas measured from the data. The conditional momentum betas represent 
slope coefficients on past returns from a regression of monthly excess on their past month values and the 
past month’s first five principal components of yields. The volatility of the measurement error is 10 bps. 
Maturity is expressed in years.
20 
Molavi, Tahbaz-Salehi, and Vedolin (2021) study the asset pricing implications of this mechanism and also 
discuss an application to equity, but do not yield curve momentum.
Yield curve momentum                                                                                                                                  823 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 20 -->

More formally, the agent can only hold beliefs over the set of d-factor models: 
F
t
¼ �l þ
�
/ F
t − 1
þ �
t
X
s
t
¼ C
0
F
t 
Here �l 2 R
d;1
; C 2 R
d;m 
and 
�
/ 2 R
d;d
.
21 
The factor might represent for example a deep 
macroeconomic state that is not directly observed by the econometrician. How does the 
agent choose the parameters h ¼ ð �l ;
�
/ Þ? Define the Kullback–Leibler (KL) divergence of 
model as: 
KLðhÞ ¼ E½ − log f
h
ðX
s
tþ1
jX
s
t
; . . .Þ� − E½ − log f ðX
s
tþ1
jX
s
t
; . . .Þ� (16) 
Here f is the true density, f
h 
is the agent’s misspecified density, and the expectations are 
taken under the true measure. Molavi et al. (2021) show that, among the d-factor models 
with a positive prior probability, the agent’s posterior beliefs concentrate on the subset of 
models that have minimum KL divergence relative to the true data-generating process. This 
result is in line with the literature on learning under model misspecification ( Berk 1966 ).
Similarly to Molavi et al. (2021) , I first focus on the case where the agent can only enter -
tain single factor models, d ¼ 1. I next argue that this model gives an economic justification 
to a simplified version of our term structure model, detailed in the Supplementary 
Appendix. I then explain how the argument can be generalized to justify the multifactor 
term structure model used in the main part.
That is, consider a model with a factor that follows an AR(2) process. Because the factor 
lag enters as a state variable, this is effectively a 2-factor model. However, due to the com -
plexity constraint, the agent can only entertain single factor models. Assume the agent can 
observe the factor without error and has monitored a long history.
22 
Minimization of the 
KL-divergence amounts to a population maximum likelihood estimate of the factor dynam -
ics, which further coincides with a population OLS estimate. Effectively, our agent learns 
the factor dynamics that best represent the true dynamics under a misspecified model.
Assume the representative agent’s risk preference is represented by stochastic discount 
factor of the form 11. The bond prices are then solved using the standard price recursions. 
Here the state variable is one dimensional since the agent puts zero probability on models 
of higher dimension.
23
This framework and the assumption that the true factor dynamics are AR(2) give an ex -
act justification for this one-factor unspanned term structure model. Effectively, the agent 
cannot consider the second lag of the factor as a state variable and views the process as an 
AR(1). Estimation of the model can now proceed as before.
The argument could be generalized to higher dimensions, for example, to justify the mul -
tifactor unspanned term structure model in Section 6.1. Assume the agent is constrained to 
entertain models with at most d factors. On the other hand, assume an econometrician 
observes that yield levels must be described by at least d factors. Since the representative 
agent correctly understands all cross-sectional relationships between variables, these fac -
tors must also be taken into account in pricing. Now as the agent has exhausted its avail -
able sophistication, it cannot consider lagged values of any of these factors as a state 
variable, that is m ¼ d and these lags must be ignored in pricing.
21 
Molavi (2019) defines the model without a constant and using a scaling matrix on the error term but this 
formulation is equivalent.
22 
Without loss of generality c ¼ I.
23 
However, in a working paper version available on my webpage, I explain that the key results do not rest on 
the form of the stochastic discount and could also be derived for example in the case when the agent possesses 
mean-variance preferences.
824                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 21 -->

This explanation, when applied to yield dynamics, has some similarities with the narra -
tive discussed by Cieslak (2018) . She argues that full spanning might be violated because 
some variables available to the econometrician are missing from the agents’ information 
set. Here the narrative should be modified so that the agents’ information set is missing 
higher lags of variables important for determining bond yields. This distinction is impor -
tant for the results.
6.3.1 Short rate forecast errors
The model is estimated to match yield data and will therefore not match survey data ex -
actly. These expectations can also vary depending on the survey and there could be discrep -
ancies between the expectations of forecasters and those of market participants. However, 
I next use data from Consensus Economics to demonstrate that the model also does quite 
well in matching survey-based expectational errors.
I measure survey-based expectational errors using the consensus forecast for the 3 month 
Treasury bill rate a quarter ahead. The data begin in October 1989. Expectational errors 
are given by FE
3
t
¼ y
3
tþ3
− E
sur
t
½y
3
tþ3
�, where E
sur
t
½y
3
tþ3
� is the survey forecast. I construct a 
measure of the model implied ex ante expectational error E
t
½y
3
tþ3
� − E
S
t
½y
3
tþ3
�. Here the 
model implied subjective expectation, E
S
t
½y
3
tþ3
�, ignores the second lag of the level factor 
when forecasting rates, while the model implied rational expectation E
t
½y
3
tþ3
� takes this 
into account.
Table 8 shows the results from explaining the survey-based expectational errors using 
the model implied ex ante expectational errors. Model implied ex ante errors are useful for 
predicting realized survey-based errors. The slope coefficient is 1.4, which is somewhat 
above the value of 1 necessary for unbiased forecasts. However, we cannot statistically re -
ject the null that the slope coefficient is one. In our sample, there is still some bias in that 
the intercept term is statistically different from zero. This is because in this sample period, 
survey forecasters were expecting somewhat higher rates than those actually realized, while 
the model predicts no bias on average.
24
In the model, short term return predictability arises largely due to expectational errors. 
I next use the survey-based forecast errors to provide evidence on this mechanism. First,  
Table 9 shows that survey-based forecast errors contemporaneously explain realized 
monthly returns. In particular, here realized returns rx
tþ1 
are explained by realized forecast 
errors FE
3
tþ3
. There is a strong negative relationship between the two variables. Higher 
than expected short rates are associated with low excess bond returns.
Table 10 first shows that model-implied ex ante short rate expectational errors predict 
returns. I then extract the residual from the previous regression where returns are explained 
contemporaneously by survey-based expectational errors. The table then shows that ex 
ante forecast errors do not predict this residual component consistent with the idea that re -
turn predictability arises from expectational errors.
In the model, there is also a strong negative contemporaneous relationship between 
returns rx
t 
and ex ante expectational errors E
t
½y
3
tþ3
� − E
S
t
½y
3
tþ3
�. The model-implied 
correlation between the two is on average −0.8. High returns this month are associated 
with negative ex ante forecast errors, that is, agents predicting too high short term interest 
rates. These negative ex ante forecast errors predict high excess returns also the next month 
as interest rates tend to turn lower than expected. The survey data confirm that these ex 
ante forecast errors are also associated with actually realized survey-based expecta -
tional errors.
24
I have not found much evidence that these “average biases” would be contributing to momentum. For ex -
ample, most of these occurred during the last 20 years of the sample, but momentum was quite weak during this 
period, as discussed in the Supplementary Appendix.
Yield curve momentum                                                                                                                                  825 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 22 -->

Table 10. The results from regressions in which next month excess returns are predicted by current month 
ex ante model generated short rate forecast error.
Predicting returns
Mat 1 2 3 4 5 6 7 8 9 10
a 0.07 0.12 0.19 0.23 0.27 0.31 0.34 0.37 0.39 0.44
t-value 5.54 4.40 4.36 4.09 3.89 3.84 3.69 3.58 3.46 3.53
b −0.55 −1.18 −1.77 −2.20 −2.83 −3.04 −3.26 −3.40 −3.55 −3.50
t-value −3.22 −2.88 −2.61 −2.41 −2.51 −2.33 −2.14 −2.00 −1.85 −1.68
R
2
2.88 2.13 1.81 1.46 1.54 1.27 1.09 0.92 0.80 0.65
Predicting return residuals
Mat 1 2 3 4 5 6 7 8 9 10
a (�10
− 3
) 0.1 0.1 0.2 0.2 0.2 0.3 0.3 0.3 0.3 0.4
t-value −0.004 −0.003 −0.003 −0.002 −0.003 −0.002 −0.002 −0.002 −0.002 −0.002
b −0.24 −0.45 −0.69 −0.85 −1.28 −1.32 −1.43 −1.49 −1.56 −1.45
t-value −1.49 −1.22 −1.12 −1.01 −1.21 −1.08 −0.99 −0.93 −0.85 −0.73
R
2
0.77 0.42 0.35 0.26 0.37 0.28 0.23 0.20 0.17 0.12
The table shows the results from using the same variable to predict a residual component of this next month 
excess return. This residual component is obtained from a contemporaneous regression of excess monthly 
returns on realized survey-based forecast errors (see Table 9). The t-statistics are based on Newey and West 
(1987) standard errors with five lags. The sample is from October 1989 to December 2019. Maturities are 
in years.
Table 8. The results from regressing realized survey-based short rate expectational errors on the 
corresponding ex ante expectational error implied by the modified ACM model.
F E
3
t þ3
a −0.16
t-value −3.31
b (model implied ex ante error) 1.41
t-value 3.95
R
2
3.14
The survey-based expectational errors are based on forecasts for the 3-month Treasury bill, 3 months ahead, 
obtained from Consensus Economics. The t-statistics are based on Newey and West (1987) standard errors with 
five lags. The sample is from October 1989 to December 2019.
Table 9. The results from a contemporaneous regression of monthly excess returns on quarterly realized 
survey-based short rate forecast errors.
Mat 1 2 3 4 5 6 7 8 9 10
a 0.03 0.04 0.06 0.07 0.08 0.11 0.13 0.15 0.16 0.2
t-value 4.80 2.27 2.04 1.70 1.51 1.53 1.48 1.51 1.47 1.63
b (FE
3
tþ3
) −0.22 −0.51 −0.76 −0.96 −1.09 −1.22 −1.30 −1.35 −1.40 −1.45
t-value −9.76 −9.17 −8.78 −8.09 −7.57 −7.33 −6.74 −6.08 −5.73 −5.33
R
2
29.35 25.75 21.36 17.48 14.70 12.96 10.96 9.20 8.03 7.05
The survey-based expectational errors are based on forecasts for the 3-month Treasury bill, 3 months ahead, 
obtained from Consensus Economics. The t-statistics are based on Newey and West (1987) standard errors with 
five lags. The sample is from October 1989 to December 2019.
826                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 23 -->

6.4 On the possibility of rational expectations explanations
I have argued that my results are problematic for standard theoretical models that do not 
naturally generate violations of full spanning. However, I explained that the type of viola -
tion of spanning necessary to explain my results can be microfounded with the type of 
bounded rationality discussed by Molavi (2019) and Molavi et al. (2021) . Could my results 
also be explained in a rational expectations framework? I next argue that this seems possi -
ble but providing a fully microfounded rational expectations explanation is challenging.
The reduced form model applied in this article could be justified in a rational expecta -
tions framework if the agents understand the true factor dynamics but price bonds ignoring 
the second lag of a key factor driving interest rates. That is, S ¼ P but under the risk neu -
tral measure Q the factor dynamics do not feature longer lags.
25
The literature on unspanned macroeconomic variables has featured some rational 
expectations narratives though not full theoretical models. Duffee (2011) argues that viola -
tions of full spanning occur if some macroeconomic variable has opposing effects for short 
rate expectations and risk premia and these two effects happen to net out exactly. 
However, it is unclear why such netting would occur for the lag of yield levels but not for 
their contemporaneous value. A rational expectations explanation for my results should 
also take the view that the expectational errors in surveys are not real or these expectations 
do not represent those of market participants.
As mentioned before, structural models can in principle be parametrized to generate a viola -
tion of the spanning condition. A question left for future research is to study the parameter 
restrictions necessary to generate momentum in a structural rational expectations model. For 
example, a standard version of the long run risk model takes a standard affine form in three 
state variables: expected consumption growth and inflation as well as conditional variance of 
consumption growth ( Hasseltoft 2012 ). Momentum can in principle be generated by allowing 
some or all of these state variables to feature longer lags and choosing parameters so that the 
lags do not affect contemporaneous yields. However, since these models feature several param -
eters, many of which are not directly observable, evaluating whether these parameter joint 
restrictions are reasonable is challenging. Moreover, these parameter restrictions are knife-edge 
so that even small deviations from the required parameters would imply full spanning.
26
7. Conclusion
Yield curve momentum cannot be explained by yield curve factors, as predicted by stan -
dard models. Moreover, it cannot be captured by unspanned macroeconomic variables and 
therefore represents an independent source of predictability. However, I show that the data 
are consistent with a term structure model in which agents ignore longer term dependencies 
in model factors.
This article bears important implications to three strands of literatures. First, by showing 
that past returns are an economically important yet unspanned source of predictability, it 
contributes to the literature on bond return predictability and risk premia. Second, it shows 
how momentum can be incorporated to a standard no-arbitrage setting, a useful addition 
to the term structure modeling literature.
Finally, the article contributes to the literature attempting to provide a theoretical expla -
nation for momentum. When applied to government bonds, the standard theories tend to 
make predictions clearly violated in the data. However, I explain that momentum can be 
explained by the form of bounded rationality discussed by Molavi (2019) and Molavi et al. 
(2021) . Future work should further evaluate whether rational expectations models can be 
extended to generate the results in this article.
25
Strictly speaking, and as explained before, this approach has somewhat different implications for the con -
stant terms of bond yields but not for momentum slope coefficients or dynamics.
26 
In particular, here the yield loadings on all lags of the standard state variables should be exactly zero.
Yield curve momentum                                                                                                                                  827 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 24 -->

Acknowledgments
I thank Michael Bauer, Ryan Chahrour, Anna Cieslak, Laura Coroneo, Ian Dew-Becker 
(editor), Mike Gallmeyer (discussant), Rubens Moura, Emanuel M €onch, George 
Pennacchi, Andrea Polo, Dimitri Vayanos, Michael Weber, three anonymous referees, and 
an associate editor as well as participants at the Econometric Society European Winter 
Meeting, Fixed Income and Financial Institutions Conference, Dynamic Econometrics 
Conference, and Bank of Finland for useful comments.
Supplementary material
Supplementary material is available at Review of Finance online.
Data availability
The key yield and macro data are publicly available and are also provided as supplemen -
tary material. The survey data are from Consensus Economics. Here many institutions 
have a subscription and access; the data can also be bought directly from the firm. The 
bond index and future data, applied in the Supplementary Appendix, can be accessed 
through a Bloomberg terminal. 
References
Adrian, T., R. Crump, and E. Moench. 2013. “Pricing the Term Structure with Linear Regressions.” 
Journal of Financial Economics 110: 110–138.
Ang, A., and M. Piazzesi. 2003. “A No-arbitrage Vector Autoregression of Term Structure Dynamics with 
Macroeconomic and Latent Variables.” Journal of Monetary Economics 50: 745–787.
Asness, C., T. Moskowitz, and L. Pedersen. 2013. “Value and Momentum Everywhere.” The Journal of 
Finance 68: 929–985.
Bai, J., and S. Ng. 2002. “Determining the Number of Factors in Approximate Factor Models,” 
Econometrica 70: 191–221.
Bai, J., and S. Ng. 2006. “Confidence Intervals for Diffusion Index Forecasts and Inference for 
Factor-augmented Regressions.” Econometrica 74: 1133–1150.
Bauer, M., and G. Rudebusch. 2017. “Resolving the Spanning Puzzle in Macro-finance Term Structure 
Models.” Review of Finance 21: 511–553.
Berger, D., I. Dew-Becker, and S. Giglio. 2020. “Uncertainty Shocks as Second-moment News Shocks.” 
The Review of Economic Studies 87: 40–76.
Berk, R. 1966. “Limiting Behavior of Posterior Distributions When the Model is Incorrect.” The Annals 
of Mathematical Statistics 37: 51–58.
Brooks, J., M. Katz, and H. Lustig. 2019. Post-FOMC Announcement Drift in U.S. Bond Markets. NBER 
Working Paper 25127, NBER, Cambridge, MA.
Brooks, J., and T. Moskowitz. 2017. Yield Curve Premia. Working paper SSRN 2956411.
Cieslak, A. 2018. “Short-rate Expectations and Unexpected Returns in Treasury Bonds.” Review of 
Financial Studies 31: 3265–3306.
Cieslak, A., and P. Povala. 2015. “Expected Returns in Treasury Bonds.” The Review of Financial Studies 
28: 2859–2901.
Cochrane, J., and M. Piazzesi. 2005. “Bond Risk Premia.” American Economic Review 95: 138–160.
Coroneo, L., D. Giannone, and M. Modugno. 2016. “Unspanned Macroeconomic Factors in the Yield 
Curve.” Journal of Business & Economic Statistics 34: 472–485.
Duffee, G. 2011. “Information in (and not in) the Term Structure.” The Review of Financial Studies 
24: 2895–2934.
Durham, J. 2013. “Momentum and the Term Structure of Interest Rates.” FRB of New York Staff Report 
657. FRB of New York, New York, NY.
Fama, E. 1965. “The Behavior of Stock-market Prices.” The Journal of Business 38: 34–105.
828                                                                                                                                                            Sihvonen 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 25 -->

Fama, E., and R. Bliss. 1987. “The Information in Long-maturity Forward Rates.” American Economic 
Review 77: 680–692.
Feunou, B., and J. S. Fontaine. 2014. “Non-markov Gaussian Term Structure Models: He Case of 
Inflation.” Review of Finance 18: 1953–2001.
Gilchrist, S., and E. Zakraj �sek. 2012. “Credit Spreads and Business Cycle Fluctuations.” American 
Economic Review 102: 1692–1720.
G €urkaynak, R., B. Sack, and J. Wright. 2007. “The US Treasury Yield Curve: 1961 to the Present.” 
Journal of Monetary Economics 54: 2291–2304.
Hasseltoft, H. 2012. “Stocks, Bonds, and Long-run Consumption Risks.” Journal of Financial and 
Quantitative Analysis 47: 309–332.
Hjalmarsson, E. 2010. “Predicting Global Stock Returns.” Journal of Financial and Quantitative Analysis 
45: 49–80.
Huang, D., J. Li, L. Wang, and G. Zhou. 2020. “Time Series Momentum: Is it There.” Journal of 
Financial Economics 135: 774–794.
Joslin, S., A. Le, and K. Singleton. 2013. “Gaussian Macro-finance Term Structure Models with Lags.” 
Journal of Financial Econometrics 11: 581–609.
Joslin, S., M. Priebsch, and K. Singleton. 2014. “Risk Premiums in Dynamic Term Structure Models with 
Unspanned Macro Risks.” The Journal of Finance 69: 1197–1233.
Kim, A., Y. Tse, and J. Wald. 2016. “Time Series Momentum and Volatility Scaling.” Journal of Financial 
Markets 30: 103–124.
Le, A., and K. Singleton. 2013. The Structure of Risks in Equilibrium Affine Models of Bond Yields. 
Working Paper, Stanford GSB, Stanford, CA.
Litterman, R., and J. Scheinkman. 1991. “Common Factors Affecting Bond Returns.” Journal of Fixed 
Income 1: 54–61.
Liu, Y., and J. Wu. 2021. “Reconstructing the Yield Curve.” Journal of Financial Economics 
142: 1395–1425.
Ludvigson, S., S. Ma, and S., S. Ng 2021. “Uncertainty and Business Cycles: Exogenous Impulse or 
Endogenous Response.” American Economic Journal: Macroeconomics 13: 369–410.
Ludvigson, S., and S. Ng. 2009. “Macro Factors in Bond Risk Premia.” The Review of Financial Studies 
22: 5027–5067.
McCracken, M., and S. Ng. 2016. “FRED-MD: A Monthly Database for Macroeconomic Research.” 
Journal of Business & Economic Statistics 34: 574–589.
Moench, E., and S. Siavash. 2022 “What Moves Treasury Yields.” Journal of Financial Economics 
146: 1016–1043.
Molavi, P. 2019. Macroeconomics with Learning and Misspecification: A General Theory and 
Applications. Working Paper, MIT, Cambridge, MA.
Molavi, P., A. Tahbaz-Salehi, and A. Vedolin. 2021. “Model Complexity, Expectations, and Asset 
Prices.” NBER Working Paper 28408, NBER, Cambridge, MA.
Moskowitz, T. J., Y., Ooi, and L., Pedersen 2012. “Time Series Momentum.” Journal of Financial 
Economics 104: 228–250.
Neuhierl, A., and M. Weber. 2018. “Monetary Momentum.” NBER Working Paper 24748, NBER, 
Cambridge, MA.
Newey, W., and K. West. 1987. “A Simple, Positive Semi-definite, Heteroskedasticity and Autocorrelation 
Consistent Covariance Matrix.” Econometrica 55: 703–708.
Newey, W., and K. West. 1994. “Automatic Lag Selection in Covariance Matrix Estimation.” The Review 
of Economic Studies 61: 631–653.
Osterrieder, D., and P. Schotman. 2017. “The Volatility of Long-term Bond Returns: Persistent Interest 
Shocks and Time-varying Risk Premiums.” Review of Economics and Statistics 99: 884–895.
Piazzesi, M., J. Salomao, and M. Schneider. 2015. Trend and Cycle in Bond Premia. Working Paper, 
Stanford University, Stanford, CA.
Pitk €aj €arvi, A., M. Suominen, and L. Vaittinen. 2020. “Cross-asset Signals and Time Series Momentum.” 
Journal of Financial Economics 136: 63–85.
Schmeling, M., A. Schrimpf, and S. Steffensen. 2022. “Monetary Policy Expectation Errors.” Journal of 
Financial Economics 146: 841–858.
Stock, J., and M. Watson. 2002. “Macroeconomic Forecasting Using Diffusion Indexes.” Journal of 
Business & Economic Statistics 20: 147–162.
Zhang, S. 2022. “Dissecting Currency Momentum.” Journal of Financial Economics 144: 154–173.
Yield curve momentum                                                                                                                                  829 
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024


<!-- page 26 -->

# The Author(s) 2024. Published by Oxford University Press on behalf of the European Finance Association. All rights 
reserved. For permissions, please email: journals.permissions@oup.com
Review of Finance, 2024, 28, 805–829
https://doi.org/10.1093/rof/rfae003
Article
Downloaded from https://academic.oup.com/rof/article/28/3/805/7606348 by OUP site access user on 02 August 2024
