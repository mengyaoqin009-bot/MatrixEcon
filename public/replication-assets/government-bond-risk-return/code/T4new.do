*US F1
*ZLB
*******************	
*T4 Column 1 and 2*
*******************

clear all
cls
*cd "path_to_your_directory"
*sample path is provided
cd "/Users/appley/Desktop/0.Replication Code new and concise"
import excel "First regression data.xlsx", sheet("US postVo") firstrow clear
merge 1:1 Date using "tyVIX.dta",nogen
merge 1:1 Date using "VIXrevised.dta",nogen
merge 1:1 Date using "MOVE.dta",nogen
gen kkk=Date
destring kkk, replace
gen aaa=[_n]
tsset aaa
rename FReturns F1Returns
gen F1Returnsquare=F1Returns^2
gen F1Returnabs=abs(F1Returns)
gen lagF1Returnabs=F1Returnabs[_n-1]
gen slope=Maturity10yrs-Maturity2yrs
gen curvature=Maturity6yrs-(Maturity2yrs+Maturity10yrs)/2
drop if kkk<199000
drop if kkk>202300

gen Y2=Maturity2yrs/10
gen vixpower=VIXClose/100
gen vixsquarepower=vixpower^2
gen slopepower=slope/10
gen Y2square=Y2^2
gen Y2slope=Y2*slopepower
gen Y2vix=Y2*vixpower
gen slopesquare=slopepower^2
gen slopevix=slopepower*vixpower

gen curvaturepower=curvature/10
gen movepower=MLMOVE1MBONDVOLATILITYINDEX/100
gen lagpower=lagF1Returnabs/100
gen curvesquare=curvaturepower^2
gen movesquare=movepower^2
gen lagsquare=lagpower^2
gen curvemove=curvaturepower*movepower
gen curvelag=curvaturepower*lagpower
gen movelag=movepower*lagpower

gen Y2curve=Y2*curvaturepower
gen Y2move=Y2*movepower
gen Y2lag=Y2*lagpower
gen vixcurvature=vixpower*curvaturepower
gen vixmove=movepower*vixpower
gen vixlag=lagpower*vixpower
gen slopecurve=curvaturepower*slopepower
gen slopemove=movepower*slopepower
gen slopelag=lagpower*slopepower


set more off
gen lagvolnow=sqrt(3.1415926/2)*abs(F1Returns)
gen lagvol=lagvolnow[_n-1]
gen lagvolY2=Y2*lagvol
gen lagvolslope=slopepower*lagvol
gen lagvolcurvature=curvaturepower*lagvol
gen lagsquarereal=lagvol^2
gen lagvix=vixpower*lagvol

gen ZLBY2=ZLB*Y2
gen ZLBslope=ZLB*slopepower
gen ZLBcurvature=ZLB*curvaturepower
gen ZLBvix=ZLB*vixpower

drop if missing(lagvol)

set more off

capture program drop my_gmm
program my_gmm, eclass
gmm (F1Returns-({bo}+{b1}*Y2+{b2}*slopepower+{b4}*vixpower+{d0}*ZLB+{d1}*Y2*ZLB+{d2}*slopepower*ZLB+{d4}*vixpower*ZLB)*({co}+{c1}*Y2+{c2}*slopepower+{c4}*vixpower+{e0}*ZLB+{e1}*Y2*ZLB+{e2}*slopepower*ZLB+{e4}*vixpower*ZLB)) ///
(sqrt(3.1415926/2)*abs(F1Returns-({bo}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{d0}*ZLB+{d1}*Y2*ZLB+{d2}*slopepower*ZLB+{d4}*vixpower*ZLB)*({co}+{c4}*vixpower+{c1}*Y2+{c2}*slopepower+{e0}*ZLB+{e1}*Y2*ZLB+{e2}*slopepower*ZLB+{e4}*vixpower*ZLB))-({bo}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower)-({d0}*ZLB+{d4}*vixpower*ZLB+{d1}*Y2*ZLB+{d2}*slopepower*ZLB)), ///
instruments(1:vixpower vixsquarepower Y2 slopepower Y2square Y2slope Y2vix slopesquare slopevix ZLB ZLBY2 ZLBslope ZLBvix)  ///
instruments(2:Y2 slopepower vixpower ZLB ZLBY2 ZLBslope ZLBvix)  ///
winitial(identity) from(b4 5 c4 5) ///
nolog
	
	estat overid
	ereturn scalar hansen_J_p = r(J_p) * 100
	
	test [b1]_cons=[b2]_cons=[b4]_cons=0
	ereturn scalar wald_p_1 = r(p) * 100
	
	test [c1]_cons=[c2]_cons=[c4]_cons=0
	ereturn scalar wald_p_2 = r(p) * 100
	
	test [d1]_cons=[d2]_cons=[d4]_cons=0
	ereturn scalar wald_p_3 = r(p) * 100
	
	test [e1]_cons=[e2]_cons=[e4]_cons=0
	ereturn scalar wald_p_4 = r(p) * 100
	
	capture drop predictedF1 predictedreisudal
	gen predictedF1=  (e(b)[1, 1] +e(b)[1, 2]  *Y2+ e(b)[1, 3]  *slopepower +e(b)[1, 4]  *vixpower+ e(b)[1, 5]*ZLB +e(b)[1, 6]  *Y2*ZLB+ e(b)[1, 7]  *slopepower*ZLB +e(b)[1, 8]  *vixpower*ZLB)*(e(b)[1, 9] +e(b)[1, 10]  *Y2+ e(b)[1, 11]  *slopepower +e(b)[1, 12]  *vixpower+ e(b)[1, 13]*ZLB +e(b)[1, 14]  *Y2*ZLB+ e(b)[1, 15]  *slopepower*ZLB +e(b)[1, 16]  *vixpower*ZLB)
	gen predictedreisudal=(e(b)[1, 1] +e(b)[1, 2]  *Y2+ e(b)[1, 3]  *slopepower +e(b)[1, 4]  *vixpower+ e(b)[1, 5]*ZLB +e(b)[1, 6]  *Y2*ZLB+ e(b)[1, 7]  *slopepower*ZLB +e(b)[1, 8]  *vixpower*ZLB)

	capture drop usquare averageF1 onedenominator
	gen usquare=(F1Returns-predictedF1)^2
	egen averageF1=mean(F1Returns)
	gen onedenominator=(F1Returns-averageF1)^2

	capture drop vsquare averageresidual twodenominator
	gen vsquare=(sqrt(3.1415926/2)*abs(F1Returns-predictedF1)-predictedreisudal)^2
	egen averageresidual=mean(abs(F1Returns-predictedF1))
	gen twodenominator=((abs(F1Returns-predictedF1) - averageresidual)^2)*((3.1415926/2))
	
	quietly summarize usquare
	scalar usquare_sum = r(sum)
	quietly summarize onedenominator
	scalar onedenominator_sum = r(sum)
	quietly summarize vsquare
	scalar vsquare_sum = r(sum)
	quietly summarize twodenominator
	scalar twodenominator_sum = r(sum)
	
	ereturn scalar two_goodnessoffit = (1 - usquare_sum / onedenominator_sum) * 100
	ereturn scalar one_goodnessoffit = (1 - vsquare_sum / twodenominator_sum) * 100
	
	matrix betass = e(b)
	matrix colnames betass = Volatility:Constant Volatility:Level ///
								   Volatility:Slope Volatility:VIX/100 ///
							  Volatility:ZLBConstant Volatility:ZLBLevel ///
								   Volatility:ZLBSlope Volatility:ZLBVIX/100 ///
								   Sharpe:Constant Sharpe:Level ///
								   Sharpe:Slope Sharpe:VIX/100 ///
								   	   Sharpe:ZLBConstant Sharpe:ZLBLevel ///
								   Sharpe:ZLBSlope Sharpe:ZLBVIX/100 
								 
								   
	ereturn repost b = betass, rename
	
end

my_gmm
est store gmm_result

local names : colfullnames e(b)
di "`names'"


esttab gmm_result, replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "wald_p_3 Wald test (3) p-value (in %)" "wald_p_4 Wald test (4) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
esttab gmm_result using "T4_New_gmm_US_F1_ZLB.csv", replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "wald_p_3 Wald test (3) p-value (in %)" "wald_p_4 Wald test (4) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")


	
*US F2
*ZLB
*******************	
*T4 Column 3 and 4*
*******************
clear all
cls
*cd "path_to_your_directory"
*sample path is provided
cd "/Users/appley/Desktop/0.Replication Code new and concise"
import excel "First regression data.xlsx", sheet("US postVo") firstrow clear
merge 1:1 Date using "tyVIX.dta",nogen
merge 1:1 Date using "VIXrevised.dta",nogen
merge 1:1 Date using "MOVE.dta",nogen
gen kkk=Date
destring kkk, replace
gen aaa=[_n]
tsset aaa
rename FReturns F1Returns
gen F1Returnsquare=F1Returns^2
gen F1Returnabs=abs(F1Returns)
gen lagF1Returnabs=F1Returnabs[_n-1]
gen slope=Maturity10yrs-Maturity2yrs
gen curvature=Maturity6yrs-(Maturity2yrs+Maturity10yrs)/2
drop if kkk<199000
drop if kkk>202300

gen Y2=Maturity2yrs/10
gen vixpower=VIXClose/100
gen vixsquarepower=vixpower^2
gen slopepower=slope/10
gen Y2square=Y2^2
gen Y2slope=Y2*slopepower
gen Y2vix=Y2*vixpower
gen slopesquare=slopepower^2
gen slopevix=slopepower*vixpower

gen curvaturepower=curvature/10
gen movepower=MLMOVE1MBONDVOLATILITYINDEX/100
gen lagpower=lagF1Returnabs/100
gen curvesquare=curvaturepower^2
gen movesquare=movepower^2
gen lagsquare=lagpower^2
gen curvemove=curvaturepower*movepower
gen curvelag=curvaturepower*lagpower
gen movelag=movepower*lagpower

gen Y2curve=Y2*curvaturepower
gen Y2move=Y2*movepower
gen Y2lag=Y2*lagpower
gen vixcurvature=vixpower*curvaturepower
gen vixmove=movepower*vixpower
gen vixlag=lagpower*vixpower
gen slopecurve=curvaturepower*slopepower
gen slopemove=movepower*slopepower
gen slopelag=lagpower*slopepower


set more off
gen lagvolnow=sqrt(3.1415926/2)*abs(F2Returns)
gen lagvol=lagvolnow[_n-1]
gen lagvolY2=Y2*lagvol
gen lagvolslope=slopepower*lagvol
gen lagvolcurvature=curvaturepower*lagvol
gen lagsquarereal=lagvol^2
gen lagvix=vixpower*lagvol

gen ZLBY2=ZLB*Y2
gen ZLBslope=ZLB*slopepower
gen ZLBcurvature=ZLB*curvaturepower
gen ZLBvix=ZLB*vixpower
gen lagZLB=ZLB*lagvol
drop if missing(lagvol)

set more off

capture program drop my_gmm
program my_gmm, eclass
gmm (F2Returns-({bo}+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b4}*vixpower+{b5}*lagvol+{d0}*ZLB+{d1}*Y2*ZLB+{d2}*slopepower*ZLB+{d3}*curvaturepower*ZLB+{d4}*vixpower*ZLB+{d5}*lagvol*ZLB)*({co}+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c4}*vixpower+{c5}*lagvol+{e0}*ZLB+{e1}*Y2*ZLB+{e2}*slopepower*ZLB+{e3}*curvaturepower*ZLB+{e4}*vixpower*ZLB+{e5}*lagvol*ZLB)) ///
(sqrt(3.1415926/2)*abs(F2Returns-({bo}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol+{d0}*ZLB+{d1}*Y2*ZLB+{d2}*slopepower*ZLB+{d3}*curvaturepower*ZLB+{d4}*vixpower*ZLB+{d5}*lagvol*ZLB)*({co}+{c4}*vixpower+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c5}*lagvol+{e0}*ZLB+{e1}*Y2*ZLB+{e2}*slopepower*ZLB+{e3}*curvaturepower*ZLB+{e4}*vixpower*ZLB+{e5}*lagvol*ZLB))-({bo}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)-({d0}*ZLB+{d4}*vixpower*ZLB+{d1}*Y2*ZLB+{d2}*slopepower*ZLB+{d3}*curvaturepower*ZLB+{d5}*lagvol*ZLB)), ///
instruments(1:Y2 slopepower vixpower curvaturepower ZLB lagvol lagZLB ZLBY2 ZLBslope ZLBcurvature ZLBvix Y2square slopesquare lagsquarereal vixsquarepower curvesquare)  ///
instruments(2:Y2 slopepower vixpower curvaturepower ZLB lagvol lagZLB ZLBY2 ZLBslope ZLBcurvature ZLBvix)  ///
winitial(identity) from(b3 -6 b4 2 c4 -2) ///
nolog
	
	estat overid
	ereturn scalar hansen_J_p = r(J_p) * 100
	
	test [b1]_cons=[b2]_cons=[b3]_cons=[b4]_cons=[b5]_cons=0
	ereturn scalar wald_p_1 = r(p) * 100
	
	test [c1]_cons=[c2]_cons=[c3]_cons=[c4]_cons=[c5]_cons=0
	ereturn scalar wald_p_2 = r(p) * 100
	
	test [d1]_cons=[d2]_cons=[d3]_cons=[d4]_cons=[d5]_cons=0
	ereturn scalar wald_p_3 = r(p) * 100
	
	test [e1]_cons=[e2]_cons=[e3]_cons=[e4]_cons=[e5]_cons=0
	ereturn scalar wald_p_4 = r(p) * 100
	
	capture drop predictedF2 predictedreisudal
	gen predictedF2=  (e(b)[1, 1] +e(b)[1, 2]  *Y2+ e(b)[1, 3]  *slopepower +e(b)[1, 4]  *curvaturepower +e(b)[1, 5]  *vixpower+e(b)[1, 6]  *lagvol + e(b)[1, 7]*ZLB +e(b)[1, 8]  *Y2*ZLB+ e(b)[1, 9]  *slopepower*ZLB +e(b)[1, 10]  *curvaturepower*ZLB +e(b)[1, 11]  *vixpower*ZLB+e(b)[1, 12]  *lagvol*ZLB)*(e(b)[1, 13] +e(b)[1, 14]  *Y2+ e(b)[1, 15]  *slopepower +e(b)[1, 16]  *curvaturepower +e(b)[1, 17]  *vixpower+e(b)[1, 18]  *lagvol + e(b)[1, 19]*ZLB +e(b)[1, 20]  *Y2*ZLB+ e(b)[1, 21]  *slopepower*ZLB +e(b)[1, 22]  *curvaturepower*ZLB +e(b)[1, 23]  *vixpower*ZLB+e(b)[1, 24]  *lagvol*ZLB)
	gen predictedreisudal=(e(b)[1, 1] +e(b)[1, 2]  *Y2+ e(b)[1, 3]  *slopepower +e(b)[1, 4]  *curvaturepower +e(b)[1, 5]  *vixpower+e(b)[1, 6]  *lagvol + e(b)[1, 7]*ZLB +e(b)[1, 8]  *Y2*ZLB+ e(b)[1, 9]  *slopepower*ZLB +e(b)[1, 10]  *curvaturepower*ZLB +e(b)[1, 11]  *vixpower*ZLB+e(b)[1, 12]  *lagvol*ZLB)

	capture drop usquare averageF2 onedenominator
	gen usquare=(F2Returns-predictedF2)^2
	egen averageF2=mean(F2Returns)
	gen onedenominator=(F2Returns-averageF2)^2

	capture drop vsquare averageresidual twodenominator
	gen vsquare=(sqrt(3.1415926/2)*abs(F2Returns-predictedF2)-predictedreisudal)^2
	egen averageresidual=mean(abs(F2Returns-predictedF2))
	gen twodenominator=((abs(F2Returns-predictedF2) - averageresidual)^2)*((3.1415926/2))
	
	quietly summarize usquare
	scalar usquare_sum = r(sum)
	quietly summarize onedenominator
	scalar onedenominator_sum = r(sum)
	quietly summarize vsquare
	scalar vsquare_sum = r(sum)
	quietly summarize twodenominator
	scalar twodenominator_sum = r(sum)
	
	ereturn scalar two_goodnessoffit = (1 - usquare_sum / onedenominator_sum) * 100
	ereturn scalar one_goodnessoffit = (1 - vsquare_sum / twodenominator_sum) * 100
	
	local names : colfullnames e(b)


	matrix b = e(b)
	matrix V = e(V)


	matrix b[1,6] = b[1,6] * 100 / sqrt(12)
	matrix V[6,6] = V[6,6] * 10000 / 12  


	matrix b[1,12] = b[1,12] * 100 / sqrt(12)
	matrix V[12,12] = V[12,12] * 10000 / 12
	
	matrix b[1,18] = b[1,18] * 100 / sqrt(12)
	matrix V[18,18] = V[18,18] * 10000 / 12
	
	matrix b[1,24] = b[1,24] * 100 / sqrt(12)
	matrix V[24,24] = V[24,24] * 10000 / 12

	matrix colnames b = `names'
	matrix colnames V = `names'
	matrix rownames V = `names'  


	ereturn repost b = b V = V
	
	matrix betass = e(b)
	matrix colnames betass = Volatility:Constant Volatility:Level ///
							 Volatility:Slope Volatility:curvature Volatility:VIX/100 Volatility:RealizedVol ///
							 Volatility:ZLBConstant Volatility:ZLBLevel ///
							 Volatility:ZLBSlope Volatility:ZLBcurvature Volatility:ZLBVIX/100 Volatility:ZLBRealizedVol ///
								   Sharpe:Constant Sharpe:Level ///
								   Sharpe:Slope Sharpe:Curvature Sharpe:VIX/100 Sharpe:RealizedVol ///
								   Sharpe:ZLBConstant Sharpe:ZLBLevel ///
								   Sharpe:ZLBSlope Sharpe:ZLBCurvature Sharpe:ZLBVIX/100 Sharpe:ZLBRealizedVol 
								 
								   
	ereturn repost b = betass, rename
	
end

my_gmm
est store gmm_result

local names : colfullnames e(b)
di "`names'"


esttab gmm_result, replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "wald_p_3 Wald test (3) p-value (in %)" "wald_p_4 Wald test (4) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
esttab gmm_result using "T4_New_gmm_US_F2_ZLB.csv", replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "wald_p_3 Wald test (3) p-value (in %)" "wald_p_4 Wald test (4) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")


	
