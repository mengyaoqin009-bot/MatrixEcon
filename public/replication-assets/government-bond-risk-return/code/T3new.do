*US F1
*1a -- all 5 variables plus the return constant
*cd "path_to_your_directory"

*************	
*T3 Column 1*
*************
*cd "path_to_your_directory"
*sample path is provided
cd "/Users/appley/Desktop/0.Replication Code new and concise"
clear all
cls
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

set more off

capture program drop my_gmm
program my_gmm, eclass
gmm (F1Returns-{a0}-({b0}+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b4}*vixpower+{b5}*lagvol)*({c0}+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c4}*vixpower+{c5}*lagvol)) ///
	(sqrt(3.1415926/2)*abs(F1Returns-{a0}-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)*({c0}+{c4}*vixpower+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c5}*lagvol))-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)), ///
	instruments(1: slopecurve vixcurvature Y2curve curvesquare vixpower vixsquarepower Y2 slopepower Y2square Y2slope Y2vix slopesquare slopevix curvaturepower lagvol lagvolY2 lagvolslope lagvolcurvature lagsquarereal lagvix)  ///
	instruments(2:Y2 slopepower vixpower curvaturepower lagvol)  ///
	winitial(identity) from(b4 2 c4 2) ///
nolog	
	
	estat overid
	ereturn scalar hansen_J_p = r(J_p) * 100
	
	test [b1]_cons=[b2]_cons=[b3]_cons=[b4]_cons=[b5]_cons=0
	ereturn scalar wald_p_1 = r(p) * 100
	
	test [c1]_cons=[c2]_cons=[c3]_cons=[c4]_cons=[c5]_cons=0
	ereturn scalar wald_p_2 = r(p) * 100
	
	capture drop predictedF1 predictedreisudal
	gen predictedF1=   e(b)[1, 1]  +( e(b)[1, 2] +e(b)[1, 3]  *Y2+ e(b)[1, 4]  *slopepower  + e(b)[1, 5] *curvaturepower+e(b)[1, 6]  *vixpower+e(b)[1, 7] *lagvol)*( e(b)[1, 8]+e(b)[1, 9]*Y2+e(b)[1, 10]  *slopepower+  e(b)[1, 11]  *curvaturepower+ e(b)[1, 12] *vixpower +e(b)[1, 13]  *lagvol)
	gen predictedreisudal=(e(b)[1, 2] +e(b)[1, 3]  *Y2+ e(b)[1, 4]  *slopepower  + e(b)[1, 5] *curvaturepower+e(b)[1, 6]  *vixpower+e(b)[1, 7]  *lagvol)

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
	local names : colfullnames e(b)
	matrix b = e(b)
	matrix V = e(V)
	matrix b[1,7] = b[1,7] * 100 / sqrt(12)
	matrix V[7,7] = V[7,7] * 10000 / 12  
	matrix b[1,13] = b[1,13] * 100 / sqrt(12)
	matrix V[13,13] = V[13,13] * 10000 / 12
	matrix colnames b = `names'
	matrix colnames V = `names'
	matrix rownames V = `names'  
	ereturn repost b = b V = V


	matrix betass = e(b)
	matrix colnames betass = Return:Constant Volatility:Constant Volatility:Level ///
								   Volatility:Slope Volatility:Curvature Volatility:VIX/100 Volatility:RealizedVol ///
								   Sharpe:Constant Sharpe:Level ///
								   Sharpe:Slope Sharpe:Curvature Sharpe:VIX/100 Sharpe:RealizedVol
								 
								   
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
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
esttab gmm_result using "T3_New_gmm_US_F1_1a.csv", replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")


	
	
*US F1
*column 2
*************	
*T3 Column 2*
*************
*cd "path_to_your_directory"
*sample path is provided
cd "/Users/appley/Desktop/0.Replication Code new and concise"
clear all
cls
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

set more off

capture program drop my_gmm
program my_gmm, eclass
gmm (F1Returns-({b0}+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b4}*vixpower+{b5}*lagvol)*({c0}+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c4}*vixpower+{c5}*lagvol)) ///
	(sqrt(3.1415926/2)*abs(F1Returns-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)*({c0}+{c4}*vixpower+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c5}*lagvol))-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)), ///
	instruments(1: slopecurve vixcurvature Y2curve curvesquare vixpower vixsquarepower Y2 slopepower Y2square Y2slope Y2vix slopesquare slopevix curvaturepower lagvol lagvolY2 lagvolslope lagvolcurvature lagsquarereal lagvix)  ///
	instruments(2:Y2 slopepower vixpower curvaturepower lagvol)  ///
	winitial(identity) from(b4 2 c4 2)	///
nolog
	
	estat overid
	ereturn scalar hansen_J_p = r(J_p) * 100
	
	test [b1]_cons=[b2]_cons=[b3]_cons=[b4]_cons=[b5]_cons=0
	ereturn scalar wald_p_1 = r(p) * 100
	
	test [c1]_cons=[c2]_cons=[c3]_cons=[c4]_cons=[c5]_cons=0
	ereturn scalar wald_p_2 = r(p) * 100
	
	capture drop predictedF1 predictedreisudal
		gen predictedF1=  (e(b)[1, 1] +e(b)[1, 2]*Y2+ e(b)[1, 3]*slopepower+ e(b)[1, 4]*curvaturepower+e(b)[1, 5]*vixpower+e(b)[1, 6] *lagvol)*(e(b)[1, 7]+e(b)[1, 8]*Y2+e(b)[1, 9]*slopepower+e(b)[1, 10]*curvaturepower+e(b)[1, 11] *vixpower+e(b)[1, 12] *lagvol)
	gen predictedreisudal=(e(b)[1, 1] +e(b)[1, 2] *Y2+ e(b)[1, 3] *slopepower  + e(b)[1, 4] *curvaturepower+e(b)[1, 5]  *vixpower+e(b)[1, 6] *lagvol)
	

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
	

	local names : colfullnames e(b)


	matrix b = e(b)
	matrix V = e(V)


	matrix b[1,6] = b[1,6] * 100 / sqrt(12)
	matrix V[6,6] = V[6,6] * 10000 / 12  


	matrix b[1,12] = b[1,12] * 100 / sqrt(12)
	matrix V[12,12] = V[12,12] * 10000 / 12


	matrix colnames b = `names'
	matrix colnames V = `names'
	matrix rownames V = `names'  


	ereturn repost b = b V = V
	
	matrix betass = e(b)
	matrix colnames betass = Volatility:Constant Volatility:Level ///
								   Volatility:Slope Volatility:Curvature Volatility:VIX/100 Volatility:RealizedVol ///
								   Sharpe:Constant Sharpe:Level ///
								   Sharpe:Slope Sharpe:Curvature Sharpe:VIX/100 Sharpe:RealizedVol
								 
								   
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
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
esttab gmm_result using "T3_New_gmm_US_F1_1b.csv", replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")


	
*US F1
*1c
*column 3
*************	
*T3 Column 3*
*************
*cd "path_to_your_directory"
*sample path is provided
cd "/Users/appley/Desktop/0.Replication Code new and concise"
clear all
cls
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

set more off

drop if missing(lagvol)

capture program drop my_gmm
program my_gmm, eclass
gmm (F1Returns-({bo}+{b1}*Y2+{b2}*slopepower+{b4}*vixpower)*({co}+{c1}*Y2+{c2}*slopepower+{c4}*vixpower)) ///
(sqrt(3.1415926/2)*abs(F1Returns-({bo}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower)*({co}+{c4}*vixpower+{c1}*Y2+{c2}*slopepower))-({bo}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower)), ///
instruments(1: vixpower vixsquarepower Y2 slopepower Y2square Y2slope Y2vix slopesquare slopevix )  ///
instruments(2:Y2 slopepower vixpower)  ///
winitial(identity) from(b4 2 c4 2) ///
nolog

	
	estat overid
	ereturn scalar hansen_J_p = r(J_p) * 100
	
	test [b1]_cons=[b2]_cons=[b4]_cons=0
	ereturn scalar wald_p_1 = r(p) * 100
	
	test [c1]_cons=[c2]_cons=[c4]_cons=0
	ereturn scalar wald_p_2 = r(p) * 100
	
	capture drop predictedF1 predictedreisudal
	gen predictedF1=  ( e(b)[1, 1] +e(b)[1, 2]  *Y2+ e(b)[1, 3]  *slopepower +e(b)[1, 4]  *vixpower)*( e(b)[1, 5]+e(b)[1, 6]*Y2+e(b)[1, 7]  *slopepower+ e(b)[1, 8] *vixpower)
	gen predictedreisudal=(e(b)[1, 1] +e(b)[1, 2]  *Y2+ e(b)[1, 3]  *slopepower  +e(b)[1, 4]  *vixpower)

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
								   Volatility:Slope  Volatility:VIX/100 ///
								   Sharpe:Constant Sharpe:Level Sharpe:Slope ///
								   Sharpe:VIX/100
								   
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
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
esttab gmm_result using "T3_New_gmm_US_F1_1c.csv", replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
	*US F2
*2a -- all 5 variables plus the return constant
*************	
*T3 Column 4*
*************
*cd "path_to_your_directory"
*sample path is provided
cd "/Users/appley/Desktop/0.Replication Code new and concise"
clear all
cls
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

set more off

capture program drop my_gmm
program my_gmm, eclass
gmm (F2Returns-{a0}-({b0}+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b4}*vixpower+{b5}*lagvol)*({c0}+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c4}*vixpower+{c5}*lagvol)) ///
	(sqrt(3.1415926/2)*abs(F2Returns-{a0}-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)*({c0}+{c4}*vixpower+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c5}*lagvol))-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)), ///
	instruments(1: slopecurve vixcurvature Y2curve curvesquare vixpower vixsquarepower Y2 slopepower Y2square Y2slope Y2vix slopesquare slopevix curvaturepower lagvol lagvolY2 lagvolslope lagvolcurvature lagsquarereal lagvix)  ///
	instruments(2:Y2 slopepower vixpower curvaturepower lagvol)  ///
	 winitial(identity) from(a0 0 b4 2 b3 -8 b2 3 b1 0.5 b5 0.1 c0 0 c1 0 c2 0 c3 0 c4 0) ///
nolog
	
	estat overid
	ereturn scalar hansen_J_p = r(J_p) * 100
	
	test [b1]_cons=[b2]_cons=[b3]_cons=[b4]_cons=[b5]_cons=0
	ereturn scalar wald_p_1 = r(p) * 100
	
	test [c1]_cons=[c2]_cons=[c3]_cons=[c4]_cons=[c5]_cons=0
	ereturn scalar wald_p_2 = r(p) * 100
	
	capture drop predictedF2 predictedreisudal
	gen predictedF2=  e(b)[1, 1]+ ( e(b)[1, 2] +e(b)[1, 3]  *Y2+ e(b)[1, 4]  *slopepower  + e(b)[1, 5] *curvaturepower+e(b)[1, 6]  *vixpower+e(b)[1, 7] *lagvol)*( e(b)[1, 8]+e(b)[1, 9]*Y2+e(b)[1, 10]  *slopepower+  e(b)[1, 11]  *curvaturepower+ e(b)[1, 12] *vixpower +e(b)[1, 13]  *lagvol)
	gen predictedreisudal=(e(b)[1, 2] +e(b)[1, 3]  *Y2+ e(b)[1, 4]  *slopepower  + e(b)[1, 5] *curvaturepower+e(b)[1, 6]  *vixpower+e(b)[1, 7]  *lagvol)

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


	matrix b[1,7] = b[1,7] * 100 / sqrt(12)
	matrix V[7,7] = V[7,7] * 10000 / 12  


	matrix b[1,13] = b[1,13] * 100 / sqrt(12)
	matrix V[13,13] = V[13,13] * 10000 / 12


	matrix colnames b = `names'
	matrix colnames V = `names'
	matrix rownames V = `names'  


	ereturn repost b = b V = V
	
	matrix betass = e(b)
	matrix colnames betass = Return:Constant Volatility:Constant Volatility:Level ///
								   Volatility:Slope Volatility:Curvature Volatility:VIX/100 Volatility:RealizedVol ///
								   Sharpe:Constant Sharpe:Level ///
								   Sharpe:Slope Sharpe:Curvature Sharpe:VIX/100 Sharpe:RealizedVol
								 
								   
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
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
esttab gmm_result using "T3_New_gmm_US_F2_2a.csv", replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")


	
	*US F2
*2b -- all 5 variables without the return constant
*************	
*T3 Column 5*
*************
*cd "path_to_your_directory"
*sample path is provided
cd "/Users/appley/Desktop/0.Replication Code new and concise"
clear all
cls
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

set more off

capture program drop my_gmm
program my_gmm, eclass
gmm (F2Returns-({b0}+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b4}*vixpower+{b5}*lagvol)*({c0}+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c4}*vixpower+{c5}*lagvol)) ///
	(sqrt(3.1415926/2)*abs(F2Returns-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)*({c0}+{c4}*vixpower+{c1}*Y2+{c2}*slopepower+{c3}*curvaturepower+{c5}*lagvol))-({b0}+{b4}*vixpower+{b1}*Y2+{b2}*slopepower+{b3}*curvaturepower+{b5}*lagvol)), ///
	instruments(1: slopecurve vixcurvature Y2curve curvesquare vixpower vixsquarepower Y2 slopepower Y2square Y2slope Y2vix slopesquare slopevix curvaturepower lagvol lagvolY2 lagvolslope lagvolcurvature lagsquarereal lagvix)  ///
	instruments(2:Y2 slopepower vixpower curvaturepower lagvol)  ///
	 winitial(identity) from(b4 2 b3 -8 b2 3 b1 0.5 b5 0.1 c0 0 c1 0 c2 0 c3 0 c4 0) ///
nolog
	
	estat overid
	ereturn scalar hansen_J_p = r(J_p) * 100
	
	test [b1]_cons=[b2]_cons=[b3]_cons=[b4]_cons=[b5]_cons=0
	ereturn scalar wald_p_1 = r(p) * 100
	
	test [c1]_cons=[c2]_cons=[c3]_cons=[c4]_cons=[c5]_cons=0
	ereturn scalar wald_p_2 = r(p) * 100
	
		capture drop predictedF2 predictedreisudal
		gen predictedF2=  (e(b)[1, 1] +e(b)[1, 2]*Y2+ e(b)[1, 3]*slopepower+ e(b)[1, 4]*curvaturepower+e(b)[1, 5]*vixpower+e(b)[1, 6] *lagvol)*(e(b)[1, 7]+e(b)[1, 8]*Y2+e(b)[1, 9]*slopepower+e(b)[1, 10]*curvaturepower+e(b)[1, 11] *vixpower+e(b)[1, 12] *lagvol)
	gen predictedreisudal=(e(b)[1, 1] +e(b)[1, 2] *Y2+ e(b)[1, 3] *slopepower  + e(b)[1, 4] *curvaturepower+e(b)[1, 5]  *vixpower+e(b)[1, 6] *lagvol)
	

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


	matrix colnames b = `names'
	matrix colnames V = `names'
	matrix rownames V = `names'  


	ereturn repost b = b V = V
	
	matrix betass = e(b)
	matrix colnames betass = Volatility:Constant Volatility:Level ///
								   Volatility:Slope Volatility:Curvature Volatility:VIX/100 Volatility:RealizedVol ///
								   Sharpe:Constant Sharpe:Level ///
								   Sharpe:Slope Sharpe:Curvature Sharpe:VIX/100 Sharpe:RealizedVol
								 
								   
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
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

	
esttab gmm_result using "T3_New_gmm_US_F2_2b.csv", replace compress nogap b(%26.20f) t(%6.2f) ///
	varwidth(30) modelwidth(30) ///
	keep(Volatility:* Sharpe:* Return:*) ///
	order(Volatility:* Sharpe:* Return:*) ///
	scalars("N Observations" "n_moments No. Moment Condition" "hansen_J_p J-stat p-value (in %)" ///
			 "wald_p_1 Wald test (1) p-value (in %)" "wald_p_2 Wald test (2) p-value (in %)" ///
			 "one_goodnessoffit Goodness-of-fit (1) (in %)" "two_goodnessoffit Goodness-of-fit (2) (in %)") ///
	sfmt(%6.2f) star(* 0.1 ** 0.05 *** 0.01) title("GMM Results")

