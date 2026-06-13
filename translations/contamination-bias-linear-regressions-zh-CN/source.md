# Source: Contamination Bias in Linear Regressions

- PDF: `inputs/paper/contamination-bias/Contamination Bias in Linear Regressions.pdf`
- Pages: 70



<!-- page 1 -->

Contamination Bias in Linear Regressions ∗
Paul Goldsmith-Pinkham
Yale University
Peter Hull
Brown University
Michal Kolesár
Princeton University
June 21, 2024
Abstract
We study regressions with multiple treatments and a set of controls that is flexible
enough to purge omitted variable bias. We show that these regressions generally fail
to estimate convex averages of heterogeneous treatment effects—instead, estimates of
each treatment’s effect are contaminated by non-convex averages of the effects of other
treatments. We discuss three estimation approaches that avoid such contamination bias,
including the targeting of easiest-to-estimate weighted average effects. A re-analysis of
nine empirical applications finds economically and statistically meaningful contamina-
tion bias in observational studies; contamination bias in experimental studies is more
limited due to smaller variability in propensity scores.
∗Contact: paul.goldsmith-pinkham@yale.edu, peter_hull@brown.edu, and mkolesar@princeton.edu. We
thank Alberto Abadie, Jason Abaluck, Isaiah Andrews, Josh Angrist, Tim Armstrong, Kirill Borusyak, Kyle
Butts, Clément de Chaisemartin, Peng Ding, Len Goff, Jin Hahn, Xavier D’Haultfœuille, Simon Lee, Bernard
Salanié, Pedro Sant’Anna, Tymon Słoczyński, Isaac Sorkin, Jonathan Roth, Jacob Wallace, Stefan Wager,
and numerous seminar participants for helpful comments. Hull acknowledges support from National Science
Foundation Grant SES-2049250. Kolesár acknowledges support by the Sloan Research Fellowship and by the
National Science Foundation Grant SES-22049356. Mauricio Cáceres Bravo, Jerray Chang, William Cox, and
Dwaipayan Saha provided expert research assistance. An earlier draft of this paper circulated under the title
“On Estimating Multiple Treatment Effects with Regression.”


<!-- page 2 -->

1 Introduction
Consider a linear regression of an outcomeYi on a vector of treatmentsXi and a vector of flex-
ible controlsWi. The treatments are assumed to be as good as randomly assigned conditional
on the controls. For example, Xi may indicate the assignment of individualsi to different
interventions in a stratified randomized control trial (RCT), with the randomization protocol
varying across some experimental strata indicators inWi. Or, in an education value-added
model (VAM), Xi might indicate the matching of studentsi to different teachers or schools
with Wi including measures of student demographics and lagged achievement which yield a
credible selection-on-observables assumption. The regression might also be the first stage of an
instrumental variables (IV) regression leveraging the assignment of multiple decision-makers
(e.g. bail judges) indicated inXi, which is as-good-as-random conditional on some controls
Wi. These sorts of regressions are widely used across many fields in economics.1
Thispapershowsthatsuchmultiple-treatmentregressionsgenerallyfailtoestimateconvex
weighted averages of heterogeneous causal effects, and discusses solutions to this problem.
The problem may be surprising given an influential result in Angrist (1998), showing that
regressions on a single binary treatmentDi and flexible controlsWi estimate a convex average
of treatment effects wheneverDi is conditionally as good as randomly assigned. We show that
this result does not generalize to multiple treatments: regression estimates of each treatment’s
effect are generally contaminated by a non-convex average of the effects of other treatments.
Thus, the regression coefficient for a given treatment arm incorporates the effects ofall arms.
We first derive a general characterization of suchcontamination biasin multiple-treatment
regressions.2 We show the core problem by focusing on the special case of a set of mutually
exclusive treatment indicators, though our characterization applies even when the treatments
are not restricted to be binary or mutually exclusive. To separate the problem from the
typical challenge of omitted variables bias (OVB), we assume a best-case scenario where
the covariate parametrization is flexible enough to include the treatment propensity scores
(e.g., with a linear covariate adjustment, we assume that the propensity scores are linear
in the covariates). This condition holds trivially if the only covariates are strata indicators.
Under these conditions, we show that the regression coefficient on each treatment identifies a
1Prominent RCTs where randomization probabilities vary across strata include Project STAR (Krueger,
1999) and the RAND Health Insurance Experiment (Manning et al., 1987). Prominent VAM examples include
studies of teachers (Kane & Staiger, 2008; Chetty et al., 2014), schools (Angrist et al., 2017; Angrist et al.,
2024; Mountjoy & Hickman, 2021), and healthcare institutions (Abaluck et al., 2021; Geruso et al., 2020).
Prominent “judge IV” examples include Kling (2006), Maestas et al. (2013), and Dobbie and Song (2015).
2Our use of the term “contamination” follows Sun and Abraham (2021), and differs from its use in some
analyses of clinical trials (e.g. Keogh-Brown et al., 2007) to describe settings where members of one treatment
group receive the treatment of another group—what economists typically call “non-compliance”. Our “bias”
terminology refers to an implication of our result: if a given treatment has constant effects, but the other
treatment effects are heterogeneous, the regression estimand is inconsistent for the given treatment effect.
1


<!-- page 3 -->

convex weighted average of its causal effects plus a contamination bias term given by a linear
combination of the causal effects of other treatments, with weights that sum to zero. Thus,
each treatment effect estimate will generally incorporate the effects of other treatments, unless
the effects are uncorrelated with the contamination weights. Since these weights sum to zero
some are necessarily negative—further complicating the interpretation of the coefficients.
Contamination bias arises because regression adjustment for the confounders in Wi is
generally insufficient for making the other treatments ignorable when estimating a given
treatment’s effect, even when this adjustment is flexible enough to avoid OVB. To see this
intuition clearly, suppose the only controls are strata indicators. OVB is avoided when the
treatments are as good as randomly assigned within strata. But because the treatments enter
the regression linearly, the Angrist (1998) result implies that the causal interpretation of a
given treatment’s coefficient is only guaranteed when its assignment depends linearly on both
the strata indicatorsand the other treatment indicators. With mutually exclusive treatments,
this condition fails because the dependence is inherently nonlinear—the probability of assign-
ment to a given treatment is zero if an individual is assigned to one of the other treatments,
regardless of their stratum, but strata indicators affect the treatment probability otherwise.
Such dependence generates contamination bias.
Contamination bias also arises under an alternative “model-based” identifying assumption
that—rather than making assumptions on the treatment’s “design” (i.e. propensity scores)—
posits that the covariate specification spans the conditional mean of the potential outcome
under no treatment, Yi(0). In a linear model with unit and time fixed effects, this reduces
to the parallel trends restriction often used in difference-in-differences (DiD) and event study
regressions. It is common forXi to include multiple indicators in such settings—for example,
the leads and lags relative to a treatment adoption date used to support the parallel trends
assumption or estimate treatment effect dynamics.3 We show that replacing the restriction
on propensity scores in our characterization with an assumption onYi(0) generates an addi-
tional issue: the own-treatment weights are negative whenever the implicit propensity score
model used by the regression to partial out the covariates and the other treatments fits prob-
abilities greater than one. This result shows that the negative weighting and contamination
bias issues documented previously in the context of two-way fixed effects regressions (e.g.,
Goodman-Bacon, 2021; Sun & Abraham, 2021; de Chaisemartin & D’Haultfœuille, 2020; De
Chaisemartin & D’Haultfœuille, 2023; Callaway & Sant’Anna, 2021; Borusyak et al., 2024;
Wooldridge, 2021; Hull, 2018b) are more general—and conceptually distinct—problems.4 Neg-
ative weighting arises because regressions leveraging model-based restrictions onYi(0) may fit
3Alternatively Xi may indicate multiple contemporaneous treatments, as in certain “mover” regressions.
4Our analysis also relates to issues with interpreting multiple-treatment IV estimates (Behaghel et al., 2013;
Kirkeboen et al., 2016; Kline & Walters, 2016; Hull, 2018a; Lee & Salanié, 2018; Bhuller & Sigstad, 2024).
2


<!-- page 4 -->

treatment probabilities exceeding one. Contamination bias arises because additive covariate
adjustments don’t account for the non-linear dependence of a given treatment on the other
treatments and covariates. This generates a different form of propensity score misspecification:
a non-zero fitted probability of a given treatment, even when one of the other treatments is
known to be non-zero.5
We then discuss three solutions to the contamination bias problem, and their trade-offs.
These solutions apply when the propensity scores are non-degenerate, such as in an RCT or
other “design-based” regression specification.6 First, a conceptually principled solution is to
adaptapproachestoestimatingtheaveragetreatmenteffect(ATE)ofaconditionallyignorable
binary treatment to the multiple treatment case (e.g. Cattaneo, 2010; Chernozhukov et al.,
2018; Chernozhukov, Newey, & Singh, 2022; de los Angeles Resa & Zubizarreta, 2020; Graham
& Pinto, 2022). For example, one could run a regression that includes interactions between the
treatments and demeaned controls, or combine such regression with inverse propensity score
weighting for doubly-robust estimation. Such ATE estimators work well under strong overlap
of the covariate distribution for units in each treatment arm. But they may be imprecise
under limited overlap or be outright infeasible with overlap failures—common scenarios in
observational studies (Crump et al., 2009).
This practical consideration motivates an alternative approach: estimating a weighted
average of treatment effects, as regression does in the binary treatment case, while avoiding
the contamination bias with multiple-treatments. We derive the weights that are easiest to
estimate, inthesenseofminimizingasemiparametricefficiencyboundunderhomoskedasticity.
This easiest-to-estimate weighting (EW) scheme is always convex; it corresponds to weighting
schemes previously proposed in Crump et al. (2006), Li et al. (2018), and Li and Li (2019).
The weights also coincide with the implicit linear regression weights when the treatment is
binary (i.e. the Angrist (1998) case). In the multiple treatment case, the EW scheme that
allows the weights to be treatment specific can be implemented by a simple second solution:
a linear regression which restricts estimation to the individuals who are either in the control
group or the treatment group of interest. Since the weights are treatment-specific, these one-
treatment-at-a-time regressions preclude direct comparisons across treatment arms. The third
solution is to impose common weights across treatments in the EW scheme; these weights can
5While our results are framed in the context of a causal model, we show how analogous results apply
to descriptive regressions which seek to estimate averages of conditional group contrasts without assuming
a causal framework—as in studies of outcome disparities across multiple racial or ethnic groups, studies of
regional variation in healthcare utilization or outcomes, or studies of industry wage gaps.
6Solving the contamination bias problem under model-based identification approaches requires either tar-
geting subpopulations of the treated or applying substantive restrictions on the conditional means of potential
outcomes under treatment. We do not explore this case as it has already been studied extensively in the DiD
context (e.g. De Chaisemartin & D’Haultfœuille, 2023; Sun & Abraham, 2021; Callaway & Sant’Anna, 2021;
Borusyak et al., 2024; Wooldridge, 2021).
3


<!-- page 5 -->

be implemented using a weighted regression approach. We show how researchers can gauge
the extent of contamination bias in practice and implement these tools with a new R and
Stata package,multe.7
We study the empirical relevance of contamination bias in nine applications: six RCTs
with stratified randomization and three observational studies of racial disparities. We find
economically and statistically significant bias in two of the three observational studies with no
evidence for bias in any of the experimental studies. In a detailed analysis of one experiment—
the Project STAR trial—we show that the lack of contamination bias is driven by small vari-
ation in the contamination weights, rather than limited effect heterogeneity. This analysis
highlights the importance of conducting contamination bias diagnostics, particularly in ob-
servational studies where covariates are expected to generate high variability in propensity
scores, and thus likely in contamination weights.
We structure the rest of the paper as follows. Section 2 illustrates contamination bias in a
simple stylized setting. Section 3 characterizes the general problem, and discusses connections
to previous analyses. Section 4 provides three solutions, and gives guidance for measuring and
avoiding contamination bias in practice. Section 5 illustrates these tools in nine applications.
Section 6 concludes. Appendix A collects all proofs and extensions. Appendix B discusses the
connection between our contamination bias characterization and that in the DiD literature.
Details on the applications and additional exhibits are given in Appendices C and D.
2 Motivating Example
We build intuition for the contamination bias problem in two simple examples. We first
review how regressions on a single randomized binary treatment and binary controls identify
a convex average of heterogeneous treatment effects. We then show how this result fails to
generalize when we introduce an additional treatment arm. We base these examples on a
stylized version of the Project STAR experiment, which we return to as an application in
Section 5.1. The simple structure of these examples helps isolate the core mechanisms of
contamination bias. Later sections consider non-experimental settings with richer control
specifications, both theoretically and empirically.
7The package is available at CRAN (R) and https://github.com/gphk-metrics/stata-multe (Stata).
4


<!-- page 6 -->

2.1 Convex Weights with One Randomized Treatment
Consider the regression of an outcomeYi on a single treatment indicatorDi ∈ {0, 1}, a single
binary control Wi ∈ {0, 1}, and an intercept:
Yi = α + βDi + γWi + Ui. (1)
By definition, Ui is a mean-zero regression residual that is uncorrelated with Di and Wi.
For example, analysing the Project STAR trial, Krueger (1999) primarily studied the effect
of small class size Di on the test scores Yi of kindergartners indexed by i. Project STAR
randomized students to classes within schools, with the fraction of students assigned to small
classes varying by school due to the varying number of total students in each school. To
account for this, Krueger (1999) included school fixed effects as controls. Such specifications
are often found in stratified RCTs with varying treatment assignment rates across a set of
pre-treatment strata. If we imagine two such strata, demarcated by a binary indicatorWi,
then eq. (1) corresponds to a stylized two-school version of a Project STAR regression.
We wish to interpret the coefficientβ in terms of the causal effects ofDi on Yi. For this we
use potential outcome notation, lettingYi(d) denote the test score of studenti when Di = d.
Individual i’s treatment effect is then given byτ1i = Yi(1) − Yi(0), and we can write realized
achievement asYi = Yi(0) + τ1iDi. Since treatment assignment is random within schools,Di
is conditionally independent of potential outcomes givenWi: (Yi(0), Yi(1)) ⊥ Di | Wi.
Angrist (1998) showed that regression coefficients likeβ identify a convexly-weighted av-
erage of within-strata ATEs. In our Project STAR example, this result shows that:
β = ϕτ1(0) + (1 − ϕ)τ1(1), where ϕ = var(Di | Wi = 0) Pr(Wi = 0)P1
w=0 var(Di | Wi = w) Pr(Wi = w)
∈ [0, 1] (2)
gives a convex weighting scheme, andτ1(w) = E[Yi(1) − Yi(0) | Wi = w] is the ATE in
school w ∈ { 0, 1}. Thus, in our example the coefficient β identifies a weighted average of
school-specific small classroom effectsτ1(w) across the two schools.
Equation (2) can be derived by applying the Frisch-Waugh-Lovell (FWL) Theorem. The
multivariate regression coefficientβ can be written as a univariate regression coefficient from
regressing Yi onto the population residual˜Di from regressing Di onto Wi and a constant:
β = E[ ˜DiYi]
E[ ˜D2
i ]
= E[ ˜DiYi(0)]
E[ ˜D2
i ]
+ E[ ˜DiDiτ1i]
E[ ˜D2
i ]
, (3)
where we substitute the potential outcome model forYi in the second equality. SinceWi is
binary, the propensity scoreE[Di | Wi] is linear and the residual˜Di is mean independent of
5


<!-- page 7 -->

Wi (not just uncorrelated with it):E[ ˜Di | Wi] = 0. Therefore,
E[ ˜DiYi(0)] = E[E[ ˜DiYi(0) | Wi]] = E[E[ ˜Di | Wi]E[Yi(0) | Wi]] = 0. (4)
The first equality in eq. (4) follows from the law of iterated expectations, the second equality
follows by the conditional random assignment ofDi and the third equality usesE[ ˜Di | Wi] = 0.
Hence, the first summand in eq. (3) is zero. Analogous arguments show that
E[ ˜DiDiτ1i] = E[E[ ˜DiDiτ1i | Wi]] = E[E[ ˜DiDi | Wi]E[τ1i | Wi]] = E[var(Di | Wi)τ1(Wi)],
where var(Di | Wi) = E[ ˜D2
i | Wi] gives the conditional variance of the small-class treatment
within schools. Since E[var(Di | Wi)] = E[E[ ˜D2
i | Wi]] = E[ ˜D2
i ], it follows that we can write
the second summand in eq. (3) as
β = E[var(Di | Wi)τ1(Wi)]
E[var(Di | Wi)] = ϕτ1(0) + (1 − ϕ)τ1(1),
proving the representation ofβ in eq. (2).
The key fact underlying this derivation is that the residual˜Di from the auxiliary regression
of the treatment Di on the other regressors Wi is mean-independent of Wi. By the FWL
theorem, treatment coefficients likeβ can always be represented as in eq. (3) even without
this property. We next show, however, that the remaining steps in the derivation of eq. (2) fail
when an additional treatment arm is included. This failure can be attributed to the fact that
the auxiliary FWL regression delivers a treatment residual that is uncorrelated with—but
not mean-independent of—the other regressors. The lack of mean independence leads to an
additional term in the expression for the regression coefficient.
2.2 Contamination Bias with Two Randomized Treatments
In reality, Project STAR randomized students to three mutually exclusive conditions within
schools: a control group with a regular class (Di = 0), a treatment that reduced class size
(Di = 1), and a treatment that introduced full-time teaching aides (Di = 2). We incorporate
this extension of our stylized example by considering a regression of student achievementYi
on a vector of two treatment indicators,Xi = (Xi1, Xi2)′, where Xik = 1 {Di = k} indicates
assignment to treatmentk = 1, 2. We continue to include a constant and the school indicator
Wi as controls, yielding the regression
Yi = α + β1Xi1 + β2Xi2 + γWi + Ui. (5)
6


<!-- page 8 -->

The observed outcome is now given byYi = Yi(0) + τi1Xi1 + τi2Xi2, with τi1 = Yi(1) − Yi(0)
and τi2 = Yi(2) − Yi(0) denoting the potentially heterogeneous effects of a class size reduction
and introduction of a teaching aide, respectively. As before, we analyze this regression by
assuming Xi is conditionally independent of the potential achievement outcomesYi(d) given
the school indicatorWi: (Yi(0), Yi(1), Yi(2)) ⊥ Xi | Wi.
To analyze the coefficient onXi1, we again use the FWL theorem to write
β1 = E[
≈
Xi1Yi]
E[
≈
X2
i1]
= E[
≈
Xi1Yi(0)]
E[
≈
X2
i1]
+ E[
≈
Xi1Xi1τi1]
E[
≈
X2
i1]
+ E[
≈
Xi1Xi2τi2]
E[
≈
X2
i1]
, (6)
where
≈
Xi1 again denotes a population residual, but now from regressingXi1 on Wi, a constant,
and Xi2. Unlike before, this residual is uncorrelated with butnot mean-independent of the
remaining regressors (Wi, Xi2) because the dependence between Xi1 and Xi2 is non-linear.
When Xi2 = 1, Xi1 must be zero regardless of the value ofWi (because they are mutually
exclusive)whileif Xi2 = 0themeanof Xi1 doesdependon Wi unlessthetreatmentassignment
is completely random. Thus, in general,
≈
Xi1 ̸= Xi1 − E[Xi1 | Wi, Xi2].
Because
≈
Xi1 does not coincide with a conditionally de-meanedXi1, we can not generally
reduceeq.(6)toanexpressioninvolvingonlytheeffectsofthefirsttreatmentarm, τi1. Itturns
out that we nevertheless still haveE[
≈
Xi1Yi(0)] = 0, as in eq. (4), since the auxilliary regression
residuals are still uncorrelated with any individual characteristic likeYi(0).8 The regression
thus does not suffer from OVB. However, we do not generally haveE[
≈
Xi1Xi2τi2] = 0. Instead,
simplifying eq. (6) by the same steps as before leads to the expression
β1 = E[λ11(Wi)τ1(Wi)] + E[λ12(Wi)τ2(Wi)] (7)
as a generalization of eq. (2). Here λ11(Wi) = E[
≈
Xi1Xi1 | Wi]/E[
≈
X2
i1] can be shown to
be non-negative and to average to one, similar to theϕ weight in eq. (2). Thus, if not for
the second term in eq. (7),β1 would similarly identify a convex average of the conditional
ATEs τ1(Wi) = E[Yi(1) − Yi(0) | Wi]. But precisely because
≈
Xi1 ̸= Xi1 − E[Xi1 | Wi, Xi2],
this second term is generally present: λ12(Wi) = E[
≈
Xi1Xi2 | Wi]/E[
≈
X2
i1] is generally non-
zero, complicating the interpretation ofβ1 by including the conditional effects of the other
treatment τ2(Wi) = E[Yi(2) − Yi(0) | Wi].
The secondcontamination biasterm in eq. (7) arises because the residualized small class
treatment
≈
Xi1 is not conditionally independent of the second full-time aide treatmentXi2
within schools, despite being uncorrelated with Xi2 by construction. This can be seen by
8To see this, note that in the auxiliary regressionXi1 = µ0 + µ1Xi2 + µ2Wi +
≈
Xi1 we can partial outWi and
the constant from both sides to write˜Xi1 = µ1 ˜Xi2 +
≈
Xi1. Thus,
≈
Xi1 = ˜Xi1 − µ1 ˜Xi2 is a linear combination
of residuals which, per eq. (4), are both uncorrelated withYi(0). It follows thatE[
≈
Xi1Yi(0)] = 0.
7


<!-- page 9 -->

viewing
≈
Xi1 as the result of an equivalent two-step residualization. First, both Xi1 and
Xi2 are de-meaned within schools: ˜Xi1 = Xi1 − E[Xi1 | Wi] = Xi1 − p1(Wi) and ˜Xi2 =
Xi2 − E[Xi2 | Wi] = Xi2 − p2(Wi) where pj(Wi) = E[Xij | Wi] gives the propensity score for
treatment j. Second, a bivariate regression of ˜Xi1 on ˜Xi2 is used to generate the residuals
≈
Xi1. When the propensity scores vary across the schools (i.e.pj(0) ̸= pj(1)), the relationship
between these residuals varies by school, and the line of best fit between˜Xi1 and ˜Xi2 averages
across this relationship. As a result, the line of best fit does not isolate the conditional (i.e.
within-school) variation inXi1: the remaining variation in
≈
Xi1 will tend to predictXi2 within
schools, making thecontamination weight λ12(Wi) non-zero.
2.3 Illustration and Intuition
A simple numerical example helps make the contamination bias problem concrete. Suppose
in the previous setting that school0 (indicated by Wi = 0) assigned only 5 percent of the
students to the small classroom treatment, with 45 percent of the students assigned to the
full-time aide treatment and the rest assigned to the control group. In school1 (indicated
by Wi = 1), there was a substantially larger push for students to be placed into treatment
groups with 45 percent of students assigned to a small classroom, 45 percent assigned to a
classroom with a full-time aide, and only 10 percent assigned to the control group. Therefore,
p1(0) = 0.05 and p2(0) = 0.45 while p1(1) = p2(1) = 0.45. Suppose that the schools have the
same number of students, so thatPr(Wi = 1) = 0.5. It then follows from the above formulas
that λ12(0) = 99/106 and λ12(1) = −99/106.
As reasoned above, the contamination weights are non-zero here because the within-school
correlation between the residualized treatments,˜Xi1 and ˜Xi12, is heterogeneous: in school0 it
is about−0.2, so that the value of the demeaned class aide treatment is only weakly predictive
of the small classroom treatment, while in school1 it is highly predictive with correlation
−0.8. Figure D.1 in Appendix D illustrates this graphically, showing that because the overall
regression of ˜Xi1 on ˜Xi2 averages over these two correlations, the regression residuals are
predictive of the value of the class aide treatment.
To illustrate the potential magnitude of bias in this example, suppose that classroom
reductions have no effect on student achievement (soτ1(0) = τ1(1) = 0), but that the effect of
a teaching aide varies across schools. In school1 the aide is highly effective,τ2(1) = 1, (which
may be the reason for the higher push in this school to place students into treatment groups)
but in school0, the aide has no effect,τ2(0) = 0. By eq. (7), the regression coefficient on the
first treatment identifies
β1 = E[λ11(Wi) · 0] + E[λ12(Wi)τ2(Wi)] = 0 + (−99/106 × 1 + 99/106 × 0)/2 ≈ −0.47.
8


<!-- page 10 -->

Thus, in this example, a researcher would conclude that small classrooms have a sizable
negativeeffectonstudentachievement—equalinmagnitudetoaroundhalfofthetrueteaching
aide effect in school1—despite the true small-classroom effect being zero for all students. This
treatment effect coefficient can be engineered to match an arbitrary magnitude and sign by
varying the heterogeneity of the teaching aide effects across schools.
To build further intuition for eq. (7), it is useful to consider two cases where the con-
tamination bias term is zero. First, note that since regression residuals are by construc-
tion uncorrelated with the included regressors,E[λ12(Wi)] = E[
≈
Xi1Xi2]/E[
≈
X2
i1] = 0. There-
fore, E[λ12(Wi)τ2(Wi)] = E[λ12(Wi)τ2(Wi)] − E[λ12(Wi)]E[τ2(Wi)] = cov( λ12(Wi), τ2(Wi)).
If the average effects of the teaching aide treatment are constant across the two schools,
τ2(1) = τ2(0), then τ2(Wi) is constant, and this covariance is zero such that contamination
bias disappears. More generally, when the average teaching aide treatment effects across
schools τ2(Wi) exhibit idiosyncratic variation, in the sense that they have a weak covariance
with the contamination weights across schools, the contamination bias term will be small.
Second, consider the case whereXi1 and Xi2 are independent conditional on Wi—such
as when the small classroom and teacher aid interventions are independently assigned within
schools, in contrast to the previously assumed mutual exclusivity of these treatments. In this
case the conditional expectationE[Xi1 | Wi, Xi2] = E[Xi1 | Wi] will be linear, sinceXi1 and
Xi2 are unrelated givenWi, and will thus be identified by the auxiliary regression ofXi1 on
Wi, Xi2, and a constant. Consequently, the
≈
Xi1 residuals will coincide withXi1 − E[Xi1 | Wi].
The coefficient on Xi1 in eq. (5) can therefore be shown to be equivalent to the previous
eq. (2), identifying the same convex average ofτ1(w). This case highlights that dependence
across treatments is necessary for the contamination bias to arise.
3 General Problem
We now derive a general characterization of the contamination bias problem, in regressions
of an outcomeYi on a K-dimensional treatment vectorXi and flexible transformations of a
control vectorWi. We focus on the case of mutually exclusive indicatorsXik = 1 {Di = k} for
values of an underlying treatmentDi ∈ { 0, . . . , K} (with the 1 {Di = 0} indicator omitted).
We extend the characterization to a general (i.e. potentially non-binary)Xi in Appendix A.1.
We suppose the effects ofXi on Yi are estimated by a partially linear model:
Yi = X ′
iβ + g(Wi) + Ui, (8)
9


<!-- page 11 -->

where β and g are defined as the minimizers of expected squared residualsE[U 2
i ]:
(β, g) = argmin
˜β∈RK ,˜g∈G
E[(Yi − X ′
i ˜β − ˜g(Wi))2] (9)
for some linear space of functionsG. This setup nests linear covariate adjustment by setting
G = {α + w′γ : [α, γ′]′ ∈ R1+dim(Wi)}, in which case eq. (8) gives a linear regression ofYi on
Xi, Wi, and a constant. The setup also allows for more flexible covariate adjustments—such
as by specifyingG to be a large class of “nonparametric” functions (e.g. Robinson, 1988).
Two examples highlight the generality of this setup:
Example 1 (Multi-Armed RCT). Wi is a vector of mutually-exclusive indicators for experi-
mental strata, within whichXi is randomly assigned to individualsi. g is linear.
Example 2 (Two-Way Fixed Effects). i = (j, t) indexes panel data, with a fixed set of units
j = 1 , . . . , n observed over periods t = 1 , . . . , T. Wi = ( Ji, Ti) where Ji = j and Ti = t
denote the underlying unit and period, andg(Wi) = α + (1 {Ji = 2}, . . . ,1 {Ji = n}, 1 {Ti =
2}, . . . ,1 {Ti = T })′γ includes unit and period indicators.Xi contains indicators for leads and
lags relative to a deterministic treatment adoption date,A(j) ∈ {1, . . . , T,∞} (with at least
one lead excluded to prevent collinearity).
Example 1 nests the motivating RCT example in Section 2, allowing for an arbitrary number
of experimental strata inWi and multiple treatment arms inXi. Example 2 shows that our
setup can also nest the kind of regressions considered in a recent literature on DiD and related
regression specifications (e.g. Goodman-Bacon, 2021; Hull, 2018b; Sun & Abraham, 2021; de
Chaisemartin & D’Haultfœuille, 2020; De Chaisemartin & D’Haultfœuille, 2023; Callaway
& Sant’Anna, 2021; Borusyak et al., 2024; Wooldridge, 2021). We elaborate on the connec-
tions to this literature in Appendix B by considering general two-way fixed effects (TWFE)
specifications with non-random treatments. These include specifications with multiple static
treatment indicators, as in “mover regressions” that leverage over-time transitions, as well as
dynamic event study specifications.9
As a first step towards characterizing the treatment coefficient vectorβ, we solve the
minimization problem in eq. (9). Let ˜Xi denote the residuals from projecting Xi onto the
control specification, with elements˜Xik = Xik −argmin˜g∈G E[(Xik − ˜g(Wi))2]. It follows from
the projection theorem (e.g. van der Vaart, 1998, Theorem 11.1) that
β = E[ ˜Xi ˜X ′
i]−1E[ ˜XiYi]. (10)
9Some papers in this DiD literature study issues we do not consider, such as when researchers fail to include
indicators for all relevant treatment states, which will generally add bias terms to our decomposition ofβ,
below. Similarly, we do not consider multicollinearity issues like in Borusyak et al. (2024) by assuming a unique
solution to eq. (9). For event studies this means we assume some units are never treated, withA(j) = ∞.
10


<!-- page 12 -->

Applying the FWL theorem, each treatment coefficient can be writtenβk = E[
≈
XikYi]/E[
≈
X2
ik]
where
≈
Xik is the residual from regressing˜Xik on ˜Xi,−k = ( ˜Xi1, . . . , ˜Xi,k−1, ˜Xi,k+1, . . . , ˜XiK)′.
Letting E∗[Xik | Xi,−k, Wi] denote the projection ofXik onto the space{X ′
i,−k˜δ + ˜g(Wi): ˜δ ∈
RK−1, ˜g ∈ G}, we may write these residuals as
≈
Xik = Xik − E∗[Xik | Xi,−k, Wi].
3.1 Causal Interpretation
We now consider the interpretation of each treatment coefficientβk in terms of causal effects.
Let Yi(k) denote the potential outcome of unit i when Di = k. Observed outcomes are
given by Yi = Yi(Di) = Yi(0) + X ′
iτi where τi is a vector of treatment effects with elements
τik = Yi(k) − Yi(0). We denote the conditional expectation of the vector of treatment effects
given the controls by τ(Wi) = E[τi | Wi], so that τk(Wi) is the conditional ATE for the
kth treatment. We let p(Wi) = E[Xi | Wi] denote the vector of propensity scores, so that
pk(Wi) = Pr( Di = k | Wi). Our characterization of contamination bias doesn’t require the
propensity scores to be bounded away from0 and 1 and in fact allows them to be degenerate,
i.e. pk(w) ∈ {0, 1} for allw. This is the case in Example 2, sinceXi is a non-random function
of Wi. We return to practical questions of propensity score support in Section 4.
We make two assumptions to interpretβk in terms of the effects τi. First, we assume
mean-independence of the potential outcomes and treatment, conditional on the controls:
Assumption 1. E[Yi(k) | Di, Wi] = E[Yi(k) | Wi] for all k.
A sufficient condition for this assumption is that the treatment is randomly assigned condi-
tional on the controls, making it conditionally independent of the potential outcomes:
(Yi(0), . . . , Yi(K)) ⊥ Di | Wi. (11)
Such conditional random assignment appears in Example 1. In Example 2, where treatment
is a non-random function of the unit and time indices inWi, Assumption 1 holds trivially.
Second, we assumeG is specified such that that one of two conditions holds:
Assumption 2. Let µ0(w) = E[Yi(0) | Wi = w] and recall pk(w) = E[Xik | Wi = w]. Either
pk ∈ G (12)
for all k, or
µ0 ∈ G . (13)
The first condition requires the covariate adjustment to be flexible enough to capture each
treatment’s propensity score. For example, with a linear specification forg, eq. (12) requires
11


<!-- page 13 -->

the propensity scores to be linear in Wi (cf. eq. (30) in Angrist & Krueger, 1999). This
condition holds trivially in Example 1, sinceWi is a vector of indicators for groups within
which Xi is randomly assigned. When this condition holds, the projection of the treatment
onto the covariates coincides with the vector of propensity scores, and the projection residuals
coincide with the conditionally demeaned treatment vector˜Xi = Xi − p(Wi).
In Example 2, withXi being a deterministic function of unit and time indices andg(Wi)
including unit and time fixed effects, eq. (12) fails because the propensity scores are binary—
they cannot be captured by a linear combination of the TWFEs. However, eq. (13) is satisfied
byaparalleltrendsassumption: thattheaverageuntreatedpotentialoutcomes Yi(0)arelinear
in the unit and time effects. We elaborate on this setup in Appendix B.10
Under either condition in Assumption 2, the specification of controls is flexible enough to
avoid OVB. To see this formally, suppose all treatment effects are constant:τik = τk for all
k. This restriction lets us writeYi = Yi(0) + X ′
iτ, where τ is a vector collecting the constant
effects. The only source of bias when regressingYi on Xi and controls is then the unobserved
variation in the untreated potential outcomesYi(0). But it follows from the expression forβ
in eq. (10) that there is no such OVB when Assumption 2 holds:
β = E[ ˜Xi ˜X ′
i]−1(E[ ˜XiYi(0)] + E[ ˜Xi ˜X ′
i]τ) = E[ ˜Xi ˜X ′
i]−1 E[ ˜XiE[Yi(0) | Wi]]| {z }
=0
+τ = τ.
Here the first equality uses the fact thatE[ ˜XiX ′
i] = E[ ˜Xi ˜X ′
i] because ˜Xi is a vector of projec-
tion residuals, and the second equality uses the law of iterated expectations and Assumption 1.
Under eq. (12), E[ ˜Xi | Wi] = 0 , so that the term in braces is zero by another application
of the law of iterated expectations: E[ ˜XiE[Yi(0) | Wi]] = E[E[ ˜Xi | Wi]E[Yi(0) | Wi]] = 0 .
It is likewise zero under eq. (13) since ˜Xi is by definition of projection orthogonal to any
function in G such that E[ ˜XiE[Yi(0) | Wi]] = E[ ˜Xiµ0(Wi)] = 0. Hence, OVB is avoided in
the constant-effects case so long as either the propensity scores or the untreated potential out-
comes are spanned by the control specification. Versions of this double robustness property
have been previously observed in, for instance, Robins et al. (1992).
When treatment effects are heterogeneous butXi contains asingle treatment indicator,
β identifies a weighted average of the conditional effectsτ(Wi). Specifically, since by the
previous argument we still haveE[ ˜XiYi(0)] = 0, it follows from eq. (10) that
β = E[ ˜XiXiτi]
E[ ˜X2
i ]
= E[λ11(Wi)τ(Wi)], with λ11(Wi) = E[ ˜XiXi | Wi]
E[ ˜XiXi]
, (14)
10Identification based on eq. (12) can be seen as “design-based” in that it only restricts the treatment assign-
ment process. Identification based on eq. (13) can be seen as “model-based” in that it makes no assumptions
on the treatment assignment process but specifies a model for the unobserved untreated potential outcomes.
12


<!-- page 14 -->

where the second equality uses iterated expectations and the identity E[ ˜X2
i ] = E[ ˜XiXi].
Under eq. (12), E[ ˜XiXi | Wi] = E[ ˜X2
i | Wi] = var(Xi | Wi), so the weights further simplify
to λ11(Wi) = var(Xi|Wi)
E[var(Xi|Wi)] ≥ 0. This extends the Angrist (1998) result to a general control
specification; versions of this extension appear in, for instance, Angrist and Krueger (1999),
Angrist and Pischke (2009, Chapter 3.3), and Aronow and Samii (2016).
This result provides a robustness rationale for estimating the effect of a single as-good-as-
randomly assigned treatment with a partially linear model (8): so long as the specification
of G is rich enough to make eq. (12) hold,β will identify a convex average of heterogeneous
treatment effects. In Section 4 we will derive another rationale for targetingβ in this model,
showing that the weightsλ11(Wi) minimize the semiparametric efficiency bound (conditional
on the controls) for estimating some weighted-average treatment effect.
Our first proposition shows that with multiple treatments, the interpretation ofβ becomes
more complicated because of contamination bias:
Proposition 1. Under Assumptions 1 and 2, the treatment coefficients in(8) identify
βk = E[λkk(Wi)τk(Wi)] +
X
ℓ̸=k
E[λkℓ(Wi)τℓ(Wi)], (15)
where, recalling thatE∗[Xik | Xi,−k, Wi] gives the projection ofXik onto the space{X ′
i,−k˜δ +
˜g(Wi): ˜δ ∈ RK−1, ˜g ∈ G},
λkk(Wi) = E[
≈
XikXik | Wi]
E[
≈
X2
ik]
= pk(Wi)(1 − E∗[Xik | Xi,−k = 0, Wi])
E[
≈
X2
ik]
, and
λkℓ(Wi) = E[
≈
XikXiℓ | Wi]
E[
≈
X2
ik]
= − pℓ(Wi)E∗[Xik | Xiℓ = 1, Wi]
E[
≈
X2
ik]
with E[λkk(Wi)] = 1 and E[λkℓ(Wi)] = 0. Furthermore, if eq.(12) holds, λkk(Wi) ≥ 0.
Proposition 1 shows that the coefficient onXik in eq. (8) is a sum of two terms. The first
term is a weighted average of conditional ATEsτk(Wi), withown treatment weightsλkk(Wi)
that average to one—generalizing the characterization of the single-treatment case, eq. (14).
The expression forλkk implies that these weights are convex if the implicit linear probability
model used to compute
≈
Xik fits probabilities that lie below one,E∗[Xik | Xi,−k = 0, Wi] ≤ 1.
The second term is a weighted average of treatment effects forother treatments τℓ(Wi), with
contamination weights λkℓ(Wi) that average to zero. Because the contamination weights
are zero on average, they must be negative for some values of the controls unless they are
all identically zero.11 This is the case when the implicit linear probability model correctly
11Proposition 1 complements an algebraic result in Chattopadhyay and Zubizarreta (2021, Section 7.1),
13


<!-- page 15 -->

predicts that Xik = 0 if Xiℓ = 1.
Hence, if the linear probability model is correctly specified, i.e. E[Xik | Xi,−k, Wi] =
X ′
i,−kα + gk(Wi) for some vectorα and gk ∈ G, the contamination weightsλkℓ(Wi) are zero
and the own treatment weightsλkk(Wi) are positive. This is the analog of condition (12)
if we interpretXik as a binary treatment of interest andX ′
i,−kα + gk(Wi) as a specification
for the controls. In other words, the assignment of treatmentk must be additively separable
between Xi,−k and Wi. However, with mutually exclusive treatments, this won’t be the case
unless treatment assignment is unconditionally random. In particular, sinceXik must equal
zero if the unit is assigned to one of the other treatments regardless of the value ofWi, under
correct specification it must be the case thatαℓ = −gk(Wi) for all elementsαℓ of α. This in
turn implies that the assignment of treatmentk doesn’t depend onWi, which is impossible
unless the propensity scorepk(Wi) is constant.
Thus, misspecification in the linear probability model will generally yield nonsensical fitted
probabilities E∗[Xik | Xiℓ = 1, Wi] ̸= 0 that generate non-zero contamination weightsλkℓ(Wi).
Furthermore, ifthemisspecificationalsoyieldsfittedprobabilities E∗[Xik | Xi,−k = 0, Wi] > 1,
we will have negative own treatment weights. The last part of Proposition 1 shows that such
nonsensible predictions are ruled out if eq. (12) holds.
We make four further remarks on our general characterization of contamination bias:
Remark 1. Since the contamination weights are mean zero, we may write the contamina-
tion bias term asE[λkℓ(Wi)τℓ(Wi)] = cov( λkℓ(Wi), τℓ(Wi)). Thus, the treatment coefficient
βk does not suffer from contamination bias if the contamination weights λkℓ(Wi) are un-
correlated with the conditional ATEsτℓ(Wi). This is trivially true if the other treatments
are homogeneous, i.e. when τℓ(Wi) = τℓ. More generally, contamination bias will be small
if the contamination weight exhibits weak covariance with the conditional ATEs. Since
cov(λkℓ(Wi), τℓ(Wi)) = cor( λkℓ(Wi), τℓ(Wi)) sd(λkℓ(Wi)) sd(τℓ(Wi)), this is the case when (i)
the factors influencing treatment effect heterogeneity are largely unrelated to the factors in-
fluencing the treatment assignment process in the sense thatcor(λkℓ(Wi), τℓ(Wi)) is close to
zero, (ii) the contamination weights display limited variability, and/or (iii) treatment effect
heterogeneity in the other treatmentsℓ ̸= k is limited.
Remark 2. Since the weights in eq. (15) are functions of the variancesE[
≈
X2
ik] and covariances
E[
≈
XikXiℓ] and E[
≈
XikXik], they are identified and can be used to further characterize each
βk coefficient. For example, the contamination bias term can be bounded by the identified
which shows that the regression estimator of βk can be written in terms of weighted sample averages of
outcomes among units in different treatment arms (regardless of whether Assumptions 1 and 2 hold). In
contrast, our analysis interprets regressionestimands in terms of weighted averages of conditional ATEs under
a broad class of identifying assumptions. In a finite-population setting, Abadie et al. (2020) show thatβ
identifies matrix-weighted averages of individual treatment effect vectorsτi; however, they do not discuss the
interpretation of the estimand.
14


<!-- page 16 -->

contamination weightsλkℓ(Wi) and bounds on the heterogeneity in conditional ATEsτℓ(Wi).
Remark 3. The results in Proposition 1 are stated for the case whenXi are mutually exclusive
treatment indicators. In Appendix A.1 we relax this assumption to allow for combinations
of non-mutually exclusive treatments (either discrete or continuous). In this case, the own-
treatment weightsλkk(Wi) may be negative even if eq. (12) holds.
Remark 4. While we derived Proposition 1 in the context of a causal model, an analogous
result follows for descriptive regressions that do not assume potential outcomes or impose
Assumption 1. Consider, specifically, the goal of estimating an average of conditional group
contrasts E[Yi | Di = k, Wi = w]−E[Yi | Di = 0, Wi = w] with a partially linear model eq. (8)
and replace condition (13) with an assumption thatE[Yi | Di = 0, Wi = w] ∈ G. The steps
that lead to Proposition 1 then show that such regressions also generally suffer from con-
tamination bias: the coefficient on a given group indicator averages the conditional contrasts
across all other groups, with non-convex weights. Furthermore, the weights on own-group con-
ditional contrasts are not necessarily positive. These sorts of conditional contrast comparisons
are therefore not generally robust to misspecification of the conditional mean,E[Yi | Di, Wi].
3.2 Implications
Proposition 1 shows that treatment effect heterogeneity can induce two conceptually distinct
issues in flexible regression estimates of treatment effects. First, with either single or mul-
tiple treatments, there is a negative weighting of a treatment’sown effects when projecting
the treatment indicator onto other treatment indicators and covariates yields fitted values
exceeding one, i.e. whenE∗[Xik | Xi,−k = 0, Wi] > 1. This issue is relevant in various DiD re-
gressions and related approaches which rely on a model of untreated potential outcomes that
ensures eq. (13) holds (e.g. parallel trends assumptions) but which potentially misspecify the
assignment model in eq. (12). Although the recent DiD literature focuses on TWFE regres-
sions, Proposition 1 shows such negative weighing can arise more generally—such as when re-
searchers allow for linear trends, interacted fixed effects, or other extensions of the basic paral-
lel trends model. None of these alternative specifications forg are in general flexible enough to
capture the degenerate propensity scores and hence ensure thatE∗[Xik | Xi,−k = 0, Wi] ≤ 1.
Second, in the multiple treatment case, there is a potential for contamination bias from
other treatment effects—regardless of which condition in Assumption 2 holds. This form of
bias is relevant whenever one uses an additive covariate adjustment, no matter how flexibly
the covariates are specified. Versions of this problem have been noted in, for example, the
Sun and Abraham (2021) analysis of DiD regressions with treatment leads and lags or the
Hull (2018b) analysis of mover regressions (see Appendix B).12 Proposition 1 shows such
12The negative weights issue raised in de Chaisemartin and D’Haultfœuille (2020) (whenK = 1), and the
15


<!-- page 17 -->

contamination bias arises much more broadly, however.
The characterization in Proposition 1 also relates to concerns in interpreting multiple-
treatment IV estimates with heterogeneous effects (Behaghel et al., 2013; Kirkeboen et al.,
2016; Kline & Walters, 2016; Hull, 2018a; Lee & Salanié, 2018; Bhuller & Sigstad, 2024). This
connection comes from viewing eq. (8) as the second stage of an IV model estimated by a con-
trol function approach; in the linear IV case, for example,g(Wi) can be interpreted as giving
the residuals from a first-stage regression ofXi on a vector of valid instrumentsZi. In the
single-treatment case, the resultingβ coefficient has an interpretation of a weighted average
of conditional local average treatment effects under the appropriate first-stage monotonicity
condition (Imbens & Angrist, 1994). But as in Proposition 1 this interpretation fails to gen-
eralize when Xi includes multiple mutually-exclusive treatment indicators: eachβk combines
the local effects of treatmentk with a non-convex average of the effects of other treatments.
Finally, Proposition 1 has implications for single-treatment IV estimation with multiple
instruments and flexible controls if the first stage has the form of eq. (8), where nowYi is
interpreted as the treatment andXi gives the vector of instruments. Proposition 1 shows that
the first-stage coefficients on the instrumentsβk will not generally be convex weighted average
of the true first-stage effectsτik. Because of this non-convexity, the regression specification
may fail to satisfy the effective monotonicity condition even whenτik is always positive: the
cross-instrumentcontaminationofcausaleffectsmaycausemonotonicityviolations, evenwhen
specifications with individual instruments do not. This issue is distinct from previous concerns
over monotonicity failures in multiple-instrument designs (Mueller-Smith, 2015; Frandsen et
al., 2019; Norris, 2019; Mogstad et al., 2021), which are generally also present in such just-
identified specifications. It is also distinct from concerns about insufficient flexibility in the
control specification when monotonicity holds unconditionally (Blandhol et al., 2022).
This new monotonicity concern may be especially important in “examiner” IV designs,
which exploit the conditional random assignment to multiple decision-makers. Many studies
leverage such variation by computing average examiner decision rates, often with a leave-one-
out correction, and use this “leniency” measure as a single instrument with linear controls.
These IV estimators can be thought of as implementing versions of a jackknife IV estimator
(Angrist et al., 1999), based on a first stage that uses examiner indicators as instruments,
similar to eq. (8). Proposition 1 thus raises a new concern with these IV analyses when
controls (such as time fixed effects) are needed to ensure ignorable treatment assignment.
related issue that own-treatment weights may be negative in Sun and Abraham (2021) and De Chaisemartin
and D’Haultfœuille (2023) (whenK > 1), arise because the treatment probability is not linear in the unit and
time effects. If eq. (12) holds withK = 1, Proposition 1 showsβ estimates a convex combination of treatment
effects. This covers the setting considered in Theorem 1(iv) in Athey and Imbens (2022). In their Comment
2, Athey and Imbens (2022) say that “the sum of the weights [used in Theorem 1(iv)] is one, although some
of the weights may be negative”. Proposition 1 shows these weights are, in fact, non-negative.
16


<!-- page 18 -->

4 Solutions
We now discuss three solutions to the contamination bias problem raised by Proposition 1,
each targeting a distinct causal parameter. First, in Section 4.1, we discuss estimation of
unweighted ATEs. The other two solutions target weighted averages of individual treatment
effects using an easiest-to-estimate weighting (EW) scheme in that the weights minimize the
semiparametric efficiency bound for estimating weighted ATEs under homoskedasticity. In
the second solution, the weights are allowed to vary across treatments, while in the third,
they are constrained to be common across treatments. In Section 4.2 we characterize these
estimation targets, while in Section 4.3 we discuss how to estimate them; we also outline our
proposed guidance to researchers in measuring contamination bias.
Implementing the first solution requires strong overlap (i.e. that treatment propensity
scores are bounded away from zero and one) while the other two solutions require nonempty
overlap, ruling out fully degenerate propensity scores. Solutions allowing for degenerate
propensity scores require either targeting subpopulations of the treated or adding substan-
tive restrictions on conditional means of treated potential outcomes (beyond eq. (13), which
only restricts untreated potential outcomes). We refer readers to De Chaisemartin and
D’Haultfœuille (2023), Sun and Abraham (2021), Callaway and Sant’Anna (2021), Borusyak
et al. (2024), and Wooldridge (2021) for such solutions in the context of DiD regressions.
4.1 Estimating Average Treatment Effects
Many estimators exist for the ATE of binary treatments—see Imbens and Wooldridge (2009)
and Abadie and Cattaneo (2018) for reviews. Several of these approaches extend naturally to
multiple treatments: including matching on covariates or the propensity score, inverse propen-
sity score weighting, balancing weights, interacted regression, or doubly-robust methods (see,
among others, Cattaneo (2010), de los Angeles Resa and Zubizarreta (2020), Chernozhukov,
Newey, and Singh (2022), and Graham and Pinto (2022)). Here we summarize the last two
approaches.
For the interacted regression solution, we adapt the implementation for the binary treat-
ment case discussed in Imbens and Wooldridge (2009, Section 5.3) to multiple treatments.
Specifically, consider the specification:
Yi = X ′
iβ + q0(Wi) +
KX
k=1
Xik (qk(Wi) − E[qk(Wi)]) + ˙Ui, (16)
where qk ∈ G, k = 0, . . . , Kand we continue to defineβ and the functionsqk as minimizers of
E[ ˙U 2
i ]. When G consists of linear functions, eq. (16) specifies a linear regression ofYi on Xi,
17


<!-- page 19 -->

Wi, a constant, and the interactions between each treatment indicatorXik and the demeaned
control vector Wi − E[Wi]. Define µk(w) = E[Yi(k) | Wi = w] for k = 0 , . . . , K, so that
τk(w) = µk(w) − µ0(w). If Assumption 1 holds andG is furthermore rich enough to ensure
µk ∈ G for k = 0, . . . , K then β = τ. Moreover, qk(w) = τk(w) for k = 1, . . . , K, such that
the regression identifies both the unconditional and conditional ATEs.
The added interactions in eq. (16) ensure that each treatment coefficientβk is determined
only by the outcomes in treatment arms withDi = 0 and Di = k, avoiding the contamination
bias in Proposition 1. Demeaning theqk(Wi)in the interactions ensures they are appropriately
centered to interpret the coefficients on the uninteractedXik as ATEs.
Estimation of eq. (16) is conceptually straightforward for parametricqk. In particular, if
G consists of linear functions, one simply estimates
Yi = α0 +
KX
k=1
Xikτk + W ′
i αW,0 +
KX
k=1
Xik(Wi − W )′γW,k + ˙Ui. (17)
by ordinary least squares (OLS), whereW = 1
N
P
i Wi is the sample average of the covariate
vector. More generally, to increase the plausibility of the key assumption thatµk ∈ G, one
may constrain G only by nonparametric smoothness assumptions. Given a sequence of basis
functions {bj(Wi)}∞
j=1, such as polynomials or splines, one then approximatesqk with a linear
combination of the firstJ terms, with J increasing with the sample size, thus tailoring the
model complexity to data availability. Given a choice of J, estimation and inference can
proceed as in the parametric case; the only difference is that the baseline covariatesWi in
eq. (17) are replaced by the basis vector(b1(Wi), . . . , bJ(Wi))′ and W is replaced by the sample
average of this expansion. This estimator has been studied in the binary treatment case by
Chen et al. (2008) and Imbens et al. (2007), with the latter providing a detailed analysis of
how to chooseJ and the former showing that this sieve estimator achieves the semiparametric
efficiency bound under strong overlap: it is impossible to construct another regular estimator
of the ATE with smaller asymptotic variance.
An attractive alternative approach combines the interacted regression with inverse propen-
sity score weighting. Instead of using OLS to estimate eq. (16) one uses weighted least squares,
weighting observations by the inverse of some estimateˆpDi(Wi) of the propensity score (see,
e.g., Robins et al. (1994), Wooldridge (2007), and Słoczyński and Wooldridge (2018)). An
advantage of this approach is that it is doubly-robust: the estimator is consistent so long
as either the propensity score estimator is consistent or the outcome model is correct (i.e.
µk ∈ G). A recent literature shows how the double robustness property, when combined with
cross-fitting, reduces the sensitivity of the ATE estimate to overfitting or regularization bias
in estimating the nuisance functionspk and µk. Cross-fitting also allows for using more flexi-
18


<!-- page 20 -->

ble methods to approximatepk and µk, including modern machine learning methods (see, e.g.
Chernozhukov et al., 2018; Chernozhukov, Escanciano, et al., 2022; Chernozhukov, Newey, &
Singh, 2022).
Either approach should work reliably in stratified RCTs and other settings with strong
overlap. But under weak overlap, when propensity scores are not bounded away from zero
and one, all of these ATE estimators may be imprecise and have poor finite-sample behavior.
This is not a shortcoming of the specific estimator; indeed, Khan and Tamer (2010) show
that under weak overlap,
√
N-estimation of the ATE is not possible. Furthermore, if some
propensity scores attain values of zero or one, the ATE is not even point-identified. These
results formalize the intuition that it is difficult or impossible to estimate the counterfactual
outcomes for units with extreme propensity scores.13 Such extreme propensity scores are
common in observational settings. The solutions we discuss next downweight these difficult-
to-estimate counterfactuals to address this practical challenge.
4.2 Easiest-to-Estimate Averages of Treatment Effects
Suppose in a sample of observationsi = 1 , . . . , N we wish to estimate a weighted average
of conditional potential outcome contrastsPN
i=1 λ(Wi)PK
k=0 ckµk(Wi)/PN
i=1 λ(Wi), where
µk(Wi) = E[Yi(k) | Wi], c is a (K + 1)-dimensional contrast vector with elementsck, and
λ(Wi) is some weighting scheme.14 We focus on two specifications for the contrast vector,
leading to two alternatives the ATE target. First, for separately estimating the effect of each
treatment k, we set ck = 1, c0 = −1 and set the remaining entries ofc to 0. The contrast
of interest then becomesPN
i=1 λ(Wi)τk(Wi)/PN
i=1 λ(Wi), the weighted ATE of treatment
k. Second, we specify c so as to allow us to simultaneously contrast the effects of allK
treatments—we discuss this further below. For each contract vector c, we characterize in
this section the easiest-to-estimate weighting (EW) schemeλ(Wi) that leads to the smallest
possible standard errors under homoskedasticity. We discuss estimation of the corresponding
estimands in Section 4.3.
This optimization problem has four motivations. First, there is a robustness motivation:
a researcher would like to estimate a given contrast as precisely as possible, at least under the
benchmark of constant treatment effects, while being robust to the possibility that the effects
are heterogeneous. While the optimization problem does not impose convexity, it turns out
that the EW scheme is convex. Hence, the resulting estimand identifies a convex average of
13One approach to limited overlap is trimming: i.e., dropping observations with extreme propensity scores
(Crump et al., 2006, 2009; Yang et al., 2016). As with the estimators we derive next, trimming estimators
shift the estimand from ATE to easier-to-estimate weighted averages of conditional ATEs.
14In a slight abuse of notation relative to Section 3, the weightsλ here are not required to average to one.
Instead, we scale the estimand by the sum of the weights,PN
i=1 λ(Wi).
19


<!-- page 21 -->

conditional contrasts under heterogeneous treatment effects, and avoids any contamination
bias. Such a robustness property presumably underlies the popularity of regression as a
tool for estimating the effect of a binary treatment: the regression estimator is efficient under
homoskedasticity and constant treatment effects while, by the Angrist (1998) result, retaining
a causal interpretation under heterogeneous effects.15
Second, the EW scheme gives a bound on the information available in the data: if the
scheme yields overly large standard errors, inference on other treatment effects (such as the
unweighted ATE) must be at least as uninformative. Computing the EW standard errors thus
reveals whether informative conclusions forany treatment effect estimand are only possible
under additional assumptions or with the aid of additional data. In fact, we show below that
in the binary treatment case the EW scheme is exactly the same as that used by regression.
Recall that in the binary treatment case, the regression treatment weights are proportional
to the conditional variance of treatment,var(Di | Wi) = p1(Wi)(1 − p1(Wi)). Because these
weights tend to zero as p1(Wi) tends to zero or one, regression downweights observations
with extreme propensity scores where the estimation of counterfactual outcomes is difficult,
avoiding the poor finite-sample behavior of ATE estimators under weak overlap and allowing
for informative inference even when one cannot precisely estimate the unweighted ATE.
Third, the EW scheme can be viewed as offering an intermediate point along a particular
robustness-precision “possibility frontier.” The ATE estimator based on the interacted speci-
fication in eq. (16) lies on one end of this frontier, being the most robust to treatment effect
heterogeneity (i.e. retaining a clear interpretation regardless of the form ofτ(w) or how it
relates to the propensity scores). But this robustness comes at the cost of imprecision and
non-standard inference under weak overlap. The regression estimator based on eq. (8) lies
on the other end of the frontier: it is likely to be precise even when overlap is weak (and
is efficient under homoskedasticity if the partly linear model in eq. (8) is correct, such that
treatment effects are constant). But this precision comes at the cost of contamination bias un-
der heterogeneous treatment effects. The EW scheme lies in between these extremes, purging
contamination bias and retaining good performance under weak overlap by giving up explicit
control over the treatment effect weighting, letting it be data-determined.16
Finally, while the derivation of the EW scheme is motivated by statistical precision con-
15There are several motivations for the interest in convex weights. First,λ(Wi) ≥ 0 ensures the estimand
captures average effects forsome well-defined (and characterizable) subpopulation. Second, it prevents what
Small et al. (2017) call a sign-reversal: ifτk(w) has the same sign for allw (+, 0 or −), then the estimand will
also have this sign. Blandhol et al. (2022) call such estimands “weakly causal.” Finally, the estimand satisfies
a population version of what Robins et al. (2007) call boundedness: the estimand lies in the support ofτk(w).
16There are other approaches to resolving the robustness-precision tradeoff, such as seeking precise estimates
subjecttotheweights λremaining“close” toone, orplacingsomerestrictionsontheformofeffectheterogeneity,
in contrast to leaving it completely unrestricted as we do here (see Mogstad et al. (2018) for an example of
this approach in an IV setting). We leave these alternatives to future research.
20


<!-- page 22 -->

cerns, the resulting estimand can be seen as identifying the impact of a policy that manip-
ulates the treatment via a particular incremental propensity score intervention. We discuss
this interpretation in Remark 6 below.
We derive the EW scheme in two steps. First, we establish a precision benchmark—a
semiparametric efficiency bound—for estimation of a given weighted average of treatment
effects under the idealized scenario that the propensity score is known. Second, we determine
which weightsλ minimize the bound.
The following proposition establishes the first step of our derivation:
Proposition 2. Suppose eq. (11) holds in an i.i.d. sample of size N, with known non-
degenerate propensity scorespk(Wi). Let σ2
k(Wi) = var( Yi(k) | Wi). Consider the problem
of estimating the weighted average of contrasts
θλ,c = 1PN
i=1 λ(Wi)
NX
i=1
λ(Wi)
KX
k=0
ckµk(Wi),
where the weighting functionλ and contrast vectorc are both known. Suppose the weighting
function satisfiesE[λ(Wi)] ̸= 0, and that the second moments ofλ(Wi) and µ(Wi) are bounded.
Then, conditional on the controlsW1, . . . , WN, the semiparametric efficiency bound is almost-
surely given by
Vλ,c = 1
E[λ(Wi)]2 E
" KX
k=0
λ(Wi)2c2
kσ2
k(Wi)
pk(Wi)
#
. (18)
As formalized in the Appendix A.2 proof,Vλ,c establishes the lower bound on the asymptotic
variance of any regular estimator ofθλ,c under the idealized case of known propensity scores.17
To establish the second step, we minimize eq. (18) overλ. Simple algebra shows that the
EW scheme is (up to an arbitrary constant) given by
λ∗
c(Wi) =
 KX
k=0
c2
kσ2
k(Wi)
pk(Wi)
!−1
. (19)
Observe that this scheme delivers convex weights,λ∗
c ≥ 0, even though convexity was not
imposed in the optimization. Hence, there is no cost in precision if we restrict attention to
convex weighted averages of conditional ATEs.
When the contrast vector is selected to estimate the weighted average effect of a particular
treatment k, a corollary to Proposition 2 is that regression weights are the easiest-to-estimate:
17The efficiency bound for the population analogθ∗
λ,c = E[λ(Wi) PK
k=0 ckµk(Wi)]/E[λ(Wi)] has an addi-
tional term,E[λ(Wi)2(PK
k=0 ckµk(Wi)−θ∗
λ,c)2]/E[λ(Wi)]2, reflecting the variability of the conditional average
contrast. The variance-minimizing weights forθ∗
λ,c thus depend on the nature of treatment effect heterogene-
ity. By focusing onθλ,c, we avoid this term, which allows us give the characterization in eq. (19) without any
assumptions about heterogeneity in treatment effects.
21


<!-- page 23 -->

Corollary 1. For some k ≥ 1, let ck be a vector with elementsck
j = 1 if j = k, ck
j = −1
if j = 0, and ck
j = 0 otherwise. Suppose that the conditional variance of relevant potential
outcomes is homoskedastic:σ2
k(Wi) = σ2
0(Wi) = σ2. Then the variance-minimizing weighting
scheme is given byλ∗
ck = λk, where
λk(Wi) = p0(Wi)pk(Wi)
p0(Wi) + pk(Wi) . (20)
Per eq. (14), the weighting λk coincides with the weighting of conditional ATEs from the
partially linear model (8) when it is fit only on observations with Di ∈ { 0, k}, provided
pk/(pk + p0) ∈ G.18 Corollary 1 thus gives a precision justification for estimating the effect
of any given treatmentk by a partially linear regression in the subsample withDi ∈ { 0, k}
under a homoskedasticity benchmark, complementing the robustness motivation discussed
earlier.19 To estimate the effects of all treatments one can runK such one-treatment-at-a-
time regressions, one for each treatment arm. Plugging eq. (20) into eq. (18) reveals that the
asymptotic variance is bounded so long as the overlap between the covariate distribution in
each treatment arm is nonempty, i.e.P (pk(Wi) > ε ∩ p0(Wi) > ε) > ε for some ε.
For binary treatments, Crump et al. (2006, Corollary 5.2) and Li et al. (2018, Corollary 1)
show that the weightingp1(Wi)(1 − p1(Wi)) minimizes the asymptotic variance of a particular
class of inverse propensity score weighted estimators. Our Corollary 1 extends the property
to all regular estimators, and to multiple treatments.
Remark 5. The one-treatment-at-a-time regression can also be motivated as a direct solution
to contamination bias in the partially linear regression in eq. (8). In particular, as discussed in
Section 3.1, contamination bias arises because the implicit linear probability modelE∗[Xik |
Xi,−k, Wi] incorrectly imposes additive separability betweenXi,−k and Wi. To solve this issue,
one can include interactions between the controls andXi,−k. This is similar to the interacted
regression in eq. (16), except we exclude the interactionXik(qk(Wi) − E[qk(Wi)]). Simple
algebra shows that this regression is equivalent to the one-treatment-at-a-time regression.
Remark 6. The population analog of the estimand implied by the weighting in Corollary 1,
E[λk(Wi)τk(Wi)]/E[λk(Wi)], also identifies the effect of a particular marginal policy inter-
vention. Consider the effects of a class of policies indexed by a scalarδ that restrict treat-
ments to {0, k} by increasing the propensity score of treatment k to pδ
k(Wi) and setting
pδ
0(Wi) = 1 − pδ
k(Wi).20 Then the marginal effect of the increasing the policy intensityδ per
18This follows since the propensity score in the subsample is given byPr(Di = k | Wi, Di ∈ { 0, k}) =
pk(Wi)
p0(Wi)+pk(Wi), so thatλk(Wi) in eq. (20) equals the conditional variance of the treatment indicator times the
probability of being in the subsample.
19As usual, homoskedasticity is a tractable baseline: the arguments in favor of OLS following Corollary 1
can be extended to favor a (feasible) weighted least squares regression whenσ2(Wi) is consistently estimable.
20With multiple treatments, policy relevance of any contrast only involving two treatments will generally
22


<!-- page 24 -->

unit treated atδ = 0 is given byE[∂pδ
k(Wi)/∂δ · τ(Wi)]/E[∂pδ
k(Wi)/∂δ] (see Zhou & Opacic,
2022, for derivation and discussion). Thus, the weightsλk(Wi) = p0(Wi)pk(Wi)
p0(Wi)+pk(Wi) identify the
marginal policy effect when they correspond to the derivative∂pδ
k(Wi)/∂δ. For example, Zhou
and Opacic (2022) show this holds for policies that increase the log odds of a single binary
treatment by a constantδ—such as by increasing the intercept in a logit model for treatment.
A shortcoming of the EW scheme in Corollary 1 is that it is treatment-specific, precluding
comparisonsoftheweighted-averageeffectsacrosstreatments. 21 Thisissueisespeciallysalient
when the control group is arbitrarily chosen, such as in teacher VAM regressions which omit
an arbitrary teacher from estimation and seek causal comparisons across all teachers.
We thus turn to the question of how Proposition 2 can be used to select a weighting
scheme which allows for simultaneous comparisons across all treatment arms. Suppose that
the contrast of interest is drawn at random from a given marginal treatment distribution
Pr(Di = k) = πk, so that cj = 1 with probability πj(1 − πj)/(1 −PK
k=0 π2
k) and cj = −1
with the same probability.22 Let Fπ denote this distribution over the (now random) contrasts.
If the researcher wishes to report an accurate contrast estimate but needs to commit to
a weighting scheme before knowing the contrast of interest, it is optimal to minimize the
expected variance
Z
Vλ,cdFπ(c) = 1
E[λ(Wi)]2(1 −PK
k=0 π2
k)
KX
k=0
E
 λ(Wi)22πk(1 − πk)σ2
k(Wi)
pk(Wi)

.
Minimizing this expression overλ is equivalent to minimizing eq. (18) withc2
k = 2πk(1 − πk),
which yields eq. (19) with this contrast specification as the optimal weighting. Thus, the opti-
mal weights are proportional to
PK
k=0
πk(1−πk)σ2
k(Wi)
pk(Wi)
−1
. Specializing to the homoskedastic
case leads to the following result:
Corollary 2. Let Fπ denote the distribution over possible contrast vectors such thatPFπ(ck =
1) = PFπ(ck = −1) = πj(1 − πj)/(1 −PK
k=0 π2
k). Suppose that σ2
k(Wi) = σ2 for all k. Then
require the policy to restrict the number of treatments to preclude flows in and out of multiple treatment
states. For instance, the ATE gives the effect of comparing two policies: one makes only treatmentk available,
while the other makes only treatment0 available.
21Formally, for treatments1 and 2, we estimate the weighted averagesP
i λ1(Wi)τ1(Wi)/ P
i λ1(Wi) andP
i λ2(Wi)τ2(Wi)/ P
i λ2(Wi). Because the weightsλ1 and λ2 differ, the difference between these estimands
cannot generally be written as a convex combination of conditional treatment effectsτ1(Wi) − τ2(Wi). This
critique also applies to the own-treatment weights in Proposition 1. Thus even without contamination bias
one may find the implicit multiple-treatment regression weighting deficient.
22Formally, we draw two treatments at random from the given marginal distribution, discarding the draw
if the two treatments are equal.
23


<!-- page 25 -->

the weighting scheme minimizing the average variance bound
R
Vλ,cdFπ(c) is given by:
λCW(Wi) =
 KX
k=0
πk(1 − πk)
pk(Wi)
!−1
.
The easiest-to-estimate common weighting (CW) schemeλCW generalizes the intuition behind
the single binary treatment (Corollary 1), placing lower weight on strata with extreme propen-
sity scores. When the treatment is binary,K = 1, theπk’s do not matter and the CW scheme
reduces to that in Corollary 1:λCW(Wi) = λ1(Wi) = λ0(Wi) = p1(Wi)p0(Wi). With multiple
treatments, however, the weights λCW remain the same for every treatment—allowing for
simultaneous comparisons across all treatment pairs(k, ℓ).
There are two natural choices for the marginal treatment probabilitiesπ. First, when
equally interested in all contrasts, one can setπk = 1/(K + 1). This weighting scheme was
previously proposed by Li and Li (2019); our characterization of it in terms of optimizing
a semiparametric efficiency bound is, to our knowledge, novel. Second, if more common
treatments are of greater interest, we may setπk to the empirical treatment probabilities
N −1P
i Xik. This weighting targets precise estimation of contrasts involving more common
treatmentsattheexpenseofcontrastsinvolvinglesscommontreatments. Weusethischoicein
our empirical applications in Section 5. For either choice of weights, the resulting asymptotic
variance in eq. (18) remains bounded so long as the overlap between covariate distributions
in each treatment arm is not empty:P (∩K
k=0pk(Wi) > ε) > ε for some ε. Non-empty overlap
is a substantially weaker assumption than strong overlap, needed for
√
N-estimation of the
unweighted ATE, which requires this probability to equal one. For instance, in the nine
empirical applications below, non-empty overlap always holds, but strong overlap fails in six.
4.3 Practical Guidance in Measuring and Avoiding Contamination Bias
A researcher interested in estimating the effects of multiple mutually exclusive treatments
with regression can use Proposition 1 to measure the extent of contamination bias in their
estimates. When the propensity score is not fully degenerate, they can further estimate one
of the alternative estimation targets discussed in the previous subsections. Here we provide
practical guidance on both procedures, which we illustrate empirically in the next section.
For simplicity, we focus on the case whereg is linear and eq. (8) is estimated by OLS. We
suppose Assumption 1 and both conditions in Assumption 2 hold, such that all propensity
scores pk and potential outcome conditional expectation functionsµk are linearly spanned
by the controlsWi. These conditions hold, for example, whenWi contains a set of mutually
exclusive group indicators. WhenG is unrestricted, the recommendations in this section would
24


<!-- page 26 -->

require non-parametric approximations forg analogous to those discussed in Section 4.1.
Under this setup, we can decompose the OLS estimatorˆβ from the uninteracted regression
Yi = α +
KX
k=1
Xikβk + W ′
i γ + Ui, (21)
to obtain a sample analog of the decomposition in Proposition 1. To this end, note that the
own-treatment and contamination bias weights in Proposition 1 are identified by the linear
regression of Xi on the residuals ˜Xi. Specifically, λkℓ(Wi) is given by the(k, ℓ)th element of
the K × K matrix Λ(Wi) = E[ ˜Xi ˜X ′
i]−1E[ ˜XiX ′
i | Wi], which can be estimated by its sample
analog ˆΛi = ( ˙X ′ ˙X)−1 ˙XiX ′
i, where ˙Xi is the sample residual from an OLS regression ofXi
on Wi and a constant and ˙X is a matrix collecting these sample residuals. The (k, ℓ)th
element of ˆΛi estimates the weight that observation i puts on the ℓth treatment effect in
the kth treatment coefficient. Fork = ℓ this is an estimate of the own-treatment weight in
Proposition 1; fork ̸= ℓ this is an estimate of a contamination weight.
Under linearity, thekth conditional ATE may be written asτk(Wi) = γ0,k+W ′
i γW,k, where
γ0,k and γW,k are coefficients in the interacted regression specification
Yi = α0 +
KX
k=1
Xikγ0,k + W ′
i αW,0 +
KX
k=1
XikW ′
i γW,k + ˙Ui. (22)
Estimating eq. (22) by OLS yields estimatesˆτk(Wi) = ˆγ0,k + W ′
i ˆγW,k. For each observationi,
we stack the set of conditional ATE estimates in aK × 1 vector ˆτ(Wi).
Using the OLS normal equations, we then obtain a sample analog of the population
decomposition in Proposition 1:
ˆβ =
NX
i=1
diag(ˆΛi)ˆτ(Wi) +
NX
i=1
[ˆΛi − diag(ˆΛi)]ˆτ(Wi). (23)
The first term estimates the own-treatment effect components,E[λkk(Wi)τk(Wi)], while the
second term estimates the contamination bias components,P
ℓ̸=k E[λkℓ(Wi)τℓ(Wi)]. If the
contamination bias term is large for someˆβk, it suggests the estimate of thekth treatment
effect is substantially impacted by the effects of other treatments. Researchers can also com-
pare the first term of eq. (23) to other weighted averages of own-treatment effects, including
the ones discussed next, to gauge the impact of the regression weightingdiag(ˆΛi).23
23When the covariates are not saturated, it is possible that the estimated weighting function ˆΛ(w) =
1
N
PN
i=1 1 {Wi = w}ˆΛi is not positive-definite for some or allw. In particular, the diagonal elements ofˆΛ(w)
need not all be positive. However, it is guaranteed that the diagonal ofˆΛ(w) sums to one and the non-diagonal
weights sum to zero, sincePN
i=1
ˆΛi = Ik.
25


<!-- page 27 -->

Further analysis of the estimated weightsˆλkℓ(w) =
PN
i=1 1 {Wi=w}ˆΛi,kℓPN
i=1 1 {Wi=w} can shed more light
on the regression estimates in ˆβ. For example, the contamination weights for ℓ ̸= k can
be plotted against the treatment effect estimates ˆτℓ(Wi) to visually assess the sources of
contamination bias. Low bias may arise from limited treatment effect heterogeneity, small
contamination weights, or a low correlation between the two.
Estimation of the unweighted ATE and the EW and CW schemes is also straightforward
under the linearity assumptions. First, estimating eq. (17) by OLS yields estimates of the
unweighted ATEs τk = E[τk(Wi)]. The estimates are numerically equivalent toˆτk = ˆγ0,k +
W ′ˆγW,k, where ˆγ0,k and ˆγW,k are OLS estimates of eq. (22).
Second, the EW scheme from Corollary 1 can be estimated using the uninteracted one-
treatment-at-a-time regression
Yi = ¨αk + Xik ¨βk + W ′
i ¨γk + ¨Uik, (24)
where we only use observations assigned either to treatmentk or the control group.
The third solution is to estimate the CW schemeλCW from Corollary 2. We use inverse
propensity score weighting in our applications below: we regressYi onto Xi and a constant,
weighting each observation byˆλCW(Wi)/ˆpDi(Wi) where ˆpk(Wi) denotes estimated propensity
scores from a multinomial logit model and
ˆλCW(Wi) =
 KX
k=0
πk(1 − πk)
ˆpk(Wi)
!−1
(25)
isanestimateof λCW. Whentheweights π areuniform, thisestimatorreducestotheestimator
studied in Li and Li (2019). The resulting estimator can be written as
ˆβˆλCW,k = 1
PN
i=1
ˆλCW(Wi)
ˆpk(Wi) Xik
NX
i=1
ˆλCW(Wi)
ˆpk(Wi) XikYi − 1
PN
i=1
ˆλCW(Wi)
ˆp0(Wi) Xi0
NX
i=1
ˆλCW(Wi)
ˆp0(Wi) Xi0Yi.
(26)
When the treatment is binary andˆpk is obtained via a linear regression, this weighted re-
gression estimator coincides with the usual (unweighted) regression estimator that regresses
Yi onto Di and Wi.24 Proposition 3 in Appendix A shows that the estimator ˆβˆλCW is
efficient in the sense that it achieves the semiparametric efficiency bound for estimating
βλCW =P
i λCW(Wi)τ(Wi)/P
i λCW(Wi).
24To see this, note that in this case ˆλ(Wi) = ˆp1(Wi)ˆp0(Wi), so that ˆβˆλCW,1 =
PN
i=1(1− ˆp1(Wi))DiYiPN
i=1(1− ˆp1(Wi))Di
−
PN
i=1 ˆp1(Wi)(1−Di)YiPN
i=1 ˆp1(Wi)(1−Di) =
PN
i=1(Di− ˆp1(Wi))YiPN
i=1(Di− ˆp1(Wi))2 , where the second equality uses the least-squares normal equations
PN
i=1 Xi1 = PN
i=1 ˆp1(Wi) and P
i Xi1ˆp1(Wi) = PN
i=1 ˆp1(Wi)2.
26


<!-- page 28 -->

Remark 7. The estimator ˆβˆλCW is justified by a parametric model for the propensity score.
In order to guard against misspecification of the propensity score, mirroring the discussion
in Section 4.1, it may be attractive to instead use a doubly robust version of this estimator
that combines propensity score weighting with a regression adjustment using an estimate of
µk. Another approach is a weighted version of the approach of de los Angeles Resa and
Zubizarreta (2020), in which the observations are weighted byˆλCW multiplied by balancing
weights (instead of the inverse estimated propensity score).25 We leave detailed study of these
approaches to future research.
Remark 8. Under homoskedasticity, the second and third solutions yield estimates with
smaller asymptotic variance than the estimator of the unweighted ATE. These gains in pre-
cision are achieved by changing the estimand to a different convex average of conditional
treatment effects. In particular, covariate values w where the propensity score pk(w) is
close to zero for some k will be effectively discarded. In practice, explicitly plotting the
treatment weights λCW and λk may help to identify the types of individuals who are down-
weighted by these solutions, and to assess the variation in these weights. Plotting them
against treatment effect estimates ˆτk can help visually assess the extent to which differ-
ences in weighting schemes drive differences in between estimates. In particular, the dif-
ference between the ATE and any weighted ATE estimand of the effect of treatmentk with
weights λ(Wi), normalized such thatE[λ(Wi)] = 1 is given byE[λ(Wi)τk(Wi)] − E[τk(Wi)] =
E[λ(Wi)τk(Wi)] − E[λ(Wi)]E[τk(Wi)] = cov( λ(Wi), τk(Wi)). Thus, if the own treatment
weights λ display only a weak covariance withown treatment effect, the weighting will have
little effect on the estimand. This is analogous to the observation in Remark 1 that contam-
ination bias reflects the covariance between the contamination weights and treatment effects
of theother treatments.
5 Applications
5.1 Project STAR Application
We first illustrate our framework for analyzing and addressing contamination bias with data
from Project STAR, as studied in Krueger (1999). The Project STAR RCT randomized
11,600 students in 79 public Tennessee elementary schools to one of three types of classes:
regular-sized (20–25 students), small (target size 13–17 students), or regular-sized with a
teaching aide. The proportion of students randomized to the small class size and teaching
25Under propensity score misspecification,ˆλCW would generally converge to a probability limit˜λCW that
may be different fromλCW. Both of these alternative approaches would estimate a weighted average of ATEs
weighted by˜λCW in this case.
27


<!-- page 29 -->

aide treatment varied over schools, due to school size and other constraints on classroom
organization. Students entering kindergarten in the 1985–1986 school year participated in
the experiment through the third grade. Other students entering a participating school in
grades 1–3 during these years were similarly randomized between the three class types. We
focus on kindergarten effects, where differential attrition and other complications with the
experimental analysis are minimal.26
Column 1 of Panel A in Table 1 reports estimates of kindergarten treatment effects in
a sample of 5,868 students initially randomized to the small class size and teaching aide
treatments. Specifically, we estimate the partially linear regression (eq. (21)) where Yi is
student i’s test score achievement at the end of kindergarten,Xi = (Xi1, Xi2) are indicators
for the initial experimental assignment to a small kindergarten class and a regular-sized class
with a teaching aide, respectively, and Wi is a vector of school fixed effects. We follow
Krueger (1999) in computingYi as the average percentile of studenti’s math, reading, and
word recognition score on the Stanford Achievement Test in the experimental sample. As in
the original analysis (Krueger, 1999, column 6 of Table V, panel A), we obtain a small class
size effect of 5.36 with a heteroskedasticity-robust standard error of 0.78 and a teaching aide
effect of 0.18 (standard error: 0.72).27
As discussed in Section 2, treatment assignment probabilities vary across the schools
indicated by the fixed effects inWi. If treatment effects also vary across schools in a way
that covaries with the contamination weightsλkℓ(Wi), we expect the estimated effect of small
class sizes to be partly contaminated by the effect of teaching aides (and vice versa). Panel B
reports the contamination bias part of the decomposition in eq. (23), which appears minimal
for both treatment arms.
It is useful to decompose the contamination bias further into the standard deviation of the
school-specific treatment effectτℓ(Wi), standard deviation of the contamination weights, and
their correlation, as discussed in Remark 1. Figure D.2 in Appendix D does this graphically,
plotting estimates of the school-specific treatment effectsτℓ(Wi) against the contamination
weights λkℓ(Wi) for ℓ ̸= k. As can be seen from Figure D.2, the variability of school-specific
treatment effects is substantial: Adjusting for estimation error, we estimate the standard
deviation ofτk(Wi) to be 11.0 for the small class treatment and of 9.1 for the aide treatment.28
26Studentsinregular-sizedclasseswererandomlyreassignedbetweenclassroomswithandwithoutateaching
aide after kindergarten, complicating the interpretation of the aide effect in later grades. The randomization
of students entering the sample after kindergarten was also complicated by the uneven availability of slots in
small and regular-sized classes (Krueger, 1999).
27Our sample and estimates are very similar to—but not exactly the same as—those in Krueger (1999). We
useheteroskedasticity-robust(non-clustered)standarderrorsthroughoutthisanalysis, sincetherandomization
of students to classrooms is at the individual level.
28We adjust for estimation error by subtracting the average squared standard error from the empirical
variance of the treatment effect estimates and taking the square root.
28


<!-- page 30 -->

A. Treatment effect estimates
ˆβ Own ATE EW CW
(1) (2) (3) (4) (5)
Small 5.357 5 .202 5 .561 5 .295 5 .577
(0.778) (0 .778) (0 .763) (0 .775) (0 .764)
[0.744] [0 .743] [0 .742]
Aide 0.177 0 .360 0 .070 0 .263 0 .011
(0.720) (0 .714) (0 .708) (0 .715) (0 .712)
[0.694] [0 .691] [0 .695]
Number of controls 77
Sample size 5,868
B. Contamination bias estimates
Worst-Case Bias
Bias Negative Positive
(1) (2) (3)
Small class size 0.155 −1.654 1 .670
(0.160) (0 .185) (0 .187)
Teaching aide −0.183 −1.529 1 .530
(0.149) (0 .176) (0 .177)
Notes: Panel A gives estimates of small class and teaching aide treatment effects for the
Project STAR kindergarten analysis. Col. 1 reports estimates from a partially linear model
in eq. (21), col. 2 reports the own-treatment component of the decomposition in eq. (23),
col. 3 reports the interacted regression estimates based on eq. (17), col. 4 reports estimates
based on the EW scheme using one-treatment-at-a-time regressions in eq. (24), and col 5 uses
the CW scheme based on eq. (25). Panel B gives the contamination bias component of the
decomposition in eq. (23) in col. 1, while cols. 2 and 3 reports the smallest (largest) possible
contamination bias from reordering the conditional ATEs to be as negatively (positively)
correlated with the cross-treatment weights as possible. Robust standard errors are reported
in parentheses. Robust standard errors that assume the propensity scores are known are
reported in square brackets.
Table 1: Project STAR contamination bias and treatment effect estimates
29


<!-- page 31 -->

Both standard deviations are an order of magnitude larger than the standard errors in Table 1.
On the other hand, the standard deviations for the contamination weights for the small class
and aide treatment are only moderate:0.14 and 0.11, respectively. Moreover, the correlation
between the conditional treatment effects and the contamination weights is weak:0.10 for
the small class effect estimate and−0.13 for the aide effect estimate. The moderate variation
in the contamination weights coupled with weak correlation between the weights and the
treatment effects explains why the contamination bias is small, even though the treatment
effects vary substantially across schools.
Had the experimental design been such that the contamination weights strongly correlate
with the treatment effects, sizable contamination bias could have resulted. To illustrate this,
wecomputeworst-case(positiveandnegative)weightedaveragesoftheestimated τℓ(Wi)byre-
ordering them across the computed cross-treatment weightsλkℓ(Wi). This exercise highlights
potential scenarios in which the randomization strata happened to have been highly correlated
with the effect heterogeneity. Columns 2 and 3 in panel B of Table 1 show that both bounds on
possible contamination bias are an order of magnitude larger than the actual contamination
bias: [−1.65, 1.67] for the small class size treatment and[−1.53, 1.53] for the teaching aide
treatment.29 Overall, for both treatments, the underlying heterogeneity in this setting makes
substantial contamination bias possible even though actual contamination bias turns out to
be relatively small.
Columns 2–5 of panel A report four treatment effect estimates that are free of contam-
ination bias. Column 2 gives the own-treatment effect component of the decomposition in
eq. (23), netting out the contamination bias estimate from column 1. This doubles the teach-
ing aide effect estimate, from 0.18 to 0.36, but the estimate remains statistically insignificant
with standard errors of around 0.71; the small classroom estimate moves very little. The
remaining columns report the three solutions to contamination bias discussed in Section 4.
Column 3 estimates the unweighted ATEs of the small class size and teaching aide treatment,
by estimating the interacted regression specification in eq. (17). Column 4 estimates the one-
treatment-at-a-time regressions in eq. (24) fork = 1 , 2. Finally, column 5 runs a weighted
regression of Yi onto Xi using the CW scheme in eq. (25).
There turns out to be little difference between these alternative estimates. The small class
size effect varies between 5.2 and 5.6, which is close to the original estimate. The teaching
aide effect varies between 0.01 and 0.26. To understand this lack of variation, recall from
Remark 8 that the difference between the unweighted ATE and an estimand that uses weights
λ(Wi) is given by the covariance betweenλ(Wi) and the conditional ATEsτk(Wi). Given the
29The point estimates and standard errors in columns 4 and 5 in Table 1 do not account for the fact that the
re-ordering is based on estimates ofτk(Wi) rather than the true treatment effects. This biases the reported
estimates away from zero, so that they give an upper bound for the worst-case contamination bias.
30


<!-- page 32 -->

sizable variability in the treatment effect estimates, the covariance will be small only if the
correlation between the weights and the treatment effects is small and if the weights display
limited variability. This turns out to be the case here, as depicted graphically in Figure D.3
in Appendix D. The figure shows that the correlations fall below0.25 in absolute value for all
weighting schemes, and that the weights only vary between 0.7 and 1.2.
As a consequence of strong overlap, the standard errors are similar across the columns.
Indeed, the efficiency gain of the EW scheme relative to the ATE based on an efficiency bound
comparison using eq. (18) withλ = λk vs λ = 1 is less than1.6% for both treatments under
homoskedasticity; the gain is even smaller under the CW scheme. The reported standard
errors, which allow for heteroskedasticity and don’t assume known propensity scores, align
with this prediction.30 As discussed in Remark 9 in Appendix A.3, these standard errors are
affected by the assumption of known propensity scores, used to derive the weighting schemes
underlying the estimates in columns 2 and 3. To gauge the impact of this assumption, we
also report a version of the standard errors computed under the assumption that the sample
treatment probabilities in each school match the true propensity scores. This changes the
standard errors little, showing that there is minimal cost to estimating the weights.
5.2 Further Applications
We next study the broader relevance of contamination bias using data from eight additional
studies with multiple-treatment regressions. These studies were identified by a systematic
search of papers in the AEA Data and Code Repository from 2013–2022 (see Appendix C.1
for details). Five studies are experiments like Project STAR; the remaining three use ob-
servational regressions to estimate racial disparities across multiple race groups (which we
interpret as descriptive, following Remark 4).31 We replicate a single representative specifi-
cation for each paper, corresponding to the first relevant regression discussed in the paper’s
introduction.32 Table 2 lists the papers and specifications.
We conduct two preliminary analyses of each study before assessing contamination bias
and comparing alternative estimators. First, we ensure that the estimation sample satisfies
overlap, since otherwise the decomposition in Proposition 1 is typically not identified. If
30The standard errors reported in parentheses in Panel B are valid for the population analogs βk and
βλCW, i.e. E[λk(Wi)τk(Wi)]/E[λk(Wi)] and E[λCW(Wi)τk(Wi)]/E[λCW(Wi)]. Since these standard errors are
potentially conservative when viewed as standard errors forβk and βλCW, the standard error comparison gives
an upper bound on the cost to estimating the weights.
31We focus on observational studies of racial disparities as they often include regressions on multiple minority
race “treatments,” use publicly available data, and are easily identifiable by a keyword search.
32“Relevant” here means a multiple-treatment regression specification with controls, where at least one
treatment coefficient was statistically significant. The introduction in Cole et al. (2013) did not discuss any
relevant specifications; we instead pick the first specification with variation in treatment probabilities across
strata where our results would be most relevant.
31


<!-- page 33 -->

Sample size
Journal Type Spec. Original Overlap sd(ˆp(W ))
Paper (1) (2) (3) (4) (5) (6)
Benhassine et al. (2015) AEJ:AE Exp. 5(1) 11,074 6,996 0.14†
Cole et al. (2013) AEJ:AE Exp. 7(6) 132 73 0.10†
de Mel et al. (2013) AEJ:AE Exp. 2(2) 520 520 0.02
Drexler et al. (2014) AEJ:AE Exp. 2(2) 796 796 0.05
Duflo et al. (2015) AER Exp. 2A(1) 9,116 8,664 0.11
Fryer and Levitt (2013) AER Obs. 3(4) 8,806 6,623 0.31†
Rim et al. (2020) AER:P&P Obs. 2(3) 4,037 620 0.24†
Weisburst (2019) AER:P&P Obs. 2A 7,488 7,488 0.31†
Notes: This table summarizes the five experimental studies and three observational studies of racial
disparities collected from a search of the AEA Data and Code Repository from 2013–2022 (See Ap-
pendix C.1 for details of this search). Column 3 reports the table and panel of the replicated specifica-
tion with the column or row of the specification in parentheses. Column 6 gives the standard deviation
of the estimated propensity scoreˆpk(Wi) for the treatment armk displaying the greatest propensity
score variation; estimates are computed using a multinomial logit model. The symbol† indicates that
a corresponding hypothesis test for non-zero variation was significant. See Appendix C.2 for details
on the overlap sample and tests for propensity score variation.
Table 2: Further Applications
strong overlap fails, we identify a large subset of each analysis sample where it is satisfied.
Columns 4 and 5 of Table 2 list the number of observations in the full and overlap samples
(the sample sizes are equal if the original estimation sample satisfies overlap). Second, we
check for propensity score variation in each of the studies. In principle, protocol descriptions
can reveal whether some regression controls are necessary (and hence generate propensity
score variation) or whether the controls are just added to improve precision. In practice,
however, this is not always clear from paper descriptions.33 Column 6 of Table 2 gives
a quantitative sense of the variability in the propensity scores by reporting the standard
deviation of the estimated propensity score, showing that its variability in the observational
studies is substantially higher; the dagger symbol indicates that a hypothesis test for non-
zero variation in the population propensity scores was statistically significant. Appendix C.2
details the overlap sample construction and these tests. We replicate the analyses from Table 1
for each of the eight papers in Appendix C.3; we summarize the takeaways here.
Figure 1 summarizes the statistical and practical significance of contamination bias in
the estimated effect of each treatment for each specification (as estimated in the overlap
33Moreover, some regression specifications are run on a non-random subsample of the full experimental
population (due to, e.g., attrition, or in a susample analysis). This could generate propensity score variation
even in simple experimental protocols.
32


<!-- page 34 -->

A: Cont. biast-statistic,|ˆβcb|
se(ˆβcb) B: Decomposition:ˆβ
se(ˆβ) = ˆβown
se(ˆβ) + ˆβcb
se(ˆβ)
Fryer & Levitt
Weisburst
Cole et al
Drexler et al
STAR
Benhassine et al
Duflo et al
Rim et al
de Mel et al
0.0 0.5 1.0 1.5 2.0 2.5 0.0 2.5 5.0
Asian
Hispanic
Other
Black
Other
Black
Hispanic
Hindu & Group
Group only
Muslim only
Muslim & Group
Hindu only
Standard Accounting
Rule-of-Thumb
Small
Aide
LCT to mothers
CCTs to mothers
CCTs to fathers
LCT to fathers
Both
HIV education
Educ. subsity
Asian
Black
Hispanic
Rs 20,000
Rs 10,000
Info and Reimburse
Rs 40,000
Figure 1: Contamination bias across all applications
Notes: This figure summarizes the analysis of contamination bias in the STAR application and the additional
applications in Table 2. The six experimental studies are shown in blue; the three observational studies of
racial disparities are shown in orange. Column A shows the absolute value of contamination biast-statistics for
each regression coefficient, given by eq. (23). Column B shows a normalized version of this decomposition that
divides each term by the standard error of the regression coefficient. The darker bar shows the own-treatment
effect component, while the lighter bar shows the contamination bias component.
33


<!-- page 35 -->

sample). Column A shows the absolute value of the contamination biast-statistics for each
regression coefficient, obtained from the decomposition in eq. (23). In both columns, we sort
treatments within papers by this absolutet-statistic and sort papers by the maximum absolute
t-statistic across treatments. Column B shows a normalized version of the decomposition that
divides each term by the standard error of the regression coefficient. The darker bar shows
the own-treatment effect component of the decomposition, while the lighter bar denotes the
contamination bias component (which can be of the same or opposite sign).
The figure shows economically and statistically meaningful contamination bias in two of
the three observational studies while showing no evidence for bias in any of the experimental
studies. This aligns with the intuition that the large propensity score variability in observa-
tional studies generates much larger variability in the contamination weights. Specifications
from both the de Mel et al. (2013) and Drexler et al. (2014) experiments have some of the
smallest contamination bias and also smallest propensity score variation, consistent with the
theoretical results that contamination bias requires variation in the contamination weights
which in turn requires variation in the propensity scores. On the other hand, the two stud-
ies with statistically significant contamination bias (Fryer and Levitt (2013) and Weisburst
(2019)) also display the greatest variation in propensity scores. Broadly, these results highlight
the importance of testing for contamination bias—especially in observational settings where
the included covariates are likely to drive sizable variation in propensity scores and hence
contamination weights.
Figure 2 plots estimates of the treatment effects for each estimator from Table 1, again
normalizing by the standard error of the regression coefficient. We include a line between the
estimates from OLS regression and from the common-weights (CW) estimator we propose.
Among observational studies, we see substantial variation across the different estimates and a
much larger difference between the OLS estimator and the CW estimator. In the experimental
papers, the difference is much smaller.34 This is consistent with the larger propensity score
variability in observational studies magnifying the impact of the choice of weighting scheme.
6 Conclusion
Regressions with multiple treatments and flexible controls are common across a wide range
of empirical settings in economics. We show that such regressions generally fail to estimate
a convex weighted average of treatment effects: coefficients on each treatment are generally
contaminated by the effects of other treatments. We provide intuition for why the influential
result of Angrist (1998) fails to generalize to multiple treatments, and show how the contami-
34The same pattern arises when comparing the estimates in the full sample; see Appendix C.3.
34


<!-- page 36 -->

Fryer & Levitt
Weisburst
Cole et al
Drexler et al
STAR
Benhassine et al
Duflo et al
Rim et al
de Mel et al
-2 0 2 4 6 8
Asian
Hispanic
Other
Black
Other
Black
Hispanic
Hindu & Group
Group only
Muslim only
Muslim & Group
Hindu only
Standard Accounting
Rule-of-Thumb
Small
Aide
LCT to mothers
CCTs to mothers
CCTs to fathers
LCT to fathers
Both
HIV education
Educ. subsity
Asian
Black
Hispanic
Rs 20,000
Rs 10,000
Info and Reimburse
Rs 40,000
Estimator ATE CW EW Own Regression
Figure 2: Treatment effect estimates with using different estimators
Notes: This figure plots estimates of treatment effects for each estimator from of Table 1, applied to the STAR
application and additional applications in Table 2. We normalize each estimate by dividing by the standard
error of the regression coefficient. The six experimental studies are shown in blue; the three observational
studies of racial disparities are shown in orange. Each specification includes a line connecting the estimate
from the regression coefficient and the common-weights (CW) estimator. EW stands for the easiest-to-estimate
weighting. For the Rim et al. application the ATE estimate for the “Asian” coefficient equals−8.4, and it is
not displayed as it falls outside the axis limits.
35


<!-- page 37 -->

nation bias problem connects to a recent literature studying DiD regressions. We then discuss
three alternative estimators that are free of this bias.
Our analysis of nine empirical applications finds economically and statistically meaningful
contamination bias in observational studies. Contamination bias in experimental studies is
more limited, even in papers that display statistically significant variation in the propensity
scores. We also find that the choice among alternative estimators that are free of contam-
ination bias matters more in the observational studies. Overall, our analysis highlights the
importance of testing the empirical relevance of theoretical concerns with how regression
combines heterogeneous effects—particularly in observational studies.
References
Abadie, A., & Cattaneo, M. D. (2018). Econometric methods for program evaluation.Annual
Review of Economics, 10(1), 465–503.
Abadie, A., Athey, S., Imbens, G. W., & Wooldridge, J. M. (2020). Sampling-based versus
design-based uncertainty in regression analysis.Econometrica, 88(1), 265–296.
Abaluck, J., Bravo, M. C., Hull, P. D., & Starc, A. (2021). Mortality effects and choice across
private health insurance plans.The Quarterly Journal of Economics, 136(3), 1557–
1610.
Angrist, J., Hull, P., Pathak, P. A., & Walters, C. (2024). Credible school value-added with
undersubscribed school lotteries.Review of Economics and Statistics, 106(1), 1–19.
Angrist, J. D. (1998). Estimating the labor market impact of voluntary military service using
social security data on military applicants.Econometrica, 66(2), 249–288.
Angrist, J. D., Imbens, G. W., & Krueger, A. B. (1999). Jackknife instrumental variables
estimation. Journal of Applied Econometrics, 14(1), 57–67.
Angrist, J. D., & Krueger, A. B. (1999). Empirical strategies in labor economics. In O. C.
Ashenfelter & D. Card (Eds.),Handbook of labor economics(pp. 1277–1366, Vol. 3A).
Elsevier.
Angrist, J. D., & Pischke, J.-S. (2009).Mostly harmless econometrics: An empiricist’s com-
panion. Princeton University Press.
Angrist, J. D., Hull, P. D., Pathak, P. A., & Walters, C. R. (2017). Leveraging lotteries
for school value-added: Testing and estimation.The Quarterly Journal of Economics,
132(2), 871–919.
Aronow, P. M., & Samii, C. (2016). Does regression produce representative estimates of causal
effects? American Journal of Political Science, 60(1), 250–267.
Athey, S., & Imbens, G. W. (2022). Design-based analysis in difference-in-differences settings
with staggered adoption.Journal of Econometrics, 226(1), 62–79.
Behaghel, L., Crépon, B., & Gurgand, M. (2013).Robustness of the encouragement design
in a two-treatment randomized control trial(Discussion Paper No. 7447). Institute for
the Study of Labor (IZA). Bonn, Germany.
36


<!-- page 38 -->

Benhassine, N., Devoto, F., Duflo, E., Dupas, P., & Pouliquen, V. (2015). Turning a shove
into a nudge? a “labeled cash transfer” for education.American Economic Journal:
Economic Policy, 7(3), 86–125.
Berman, A., & Plemmons, R. J. (1994).Nonnegative matrices in the mathematical sciences.
Society for Industrial and Applied Mathematics.
Bhuller, M., & Sigstad, H. (2024). 2SLS with multiple treatments.Journal of Econometrics,
242(1), 105785.
Blandhol, C., Bonney, J., Mogstad, M., & Torgovitsky, A. (2022).When is TSLS actually
LATE? (Working Paper). SSRN.
Borusyak, K., Jaravel, X., & Spiess, J. (2024). Revisiting event-study designs: Robust and
efficient estimation.Review of Economic Studies.
Callaway, B., & Sant’Anna, P. H. (2021). Difference-in-differences with multiple time periods.
Journal of Econometrics, 225(2), 200–230.
Cattaneo, M. D. (2010). Efficient semiparametric estimation of multi-valued treatment effects
under ignorability.Journal of Econometrics, 155(2), 138–154.
Chattopadhyay, A., & Zubizarreta, J. R. (2021).On the implied weights of linear regression
for causal inference. arXiv: 2104.06581v2.
Chen, X., Hong, H., & Tarozzi, A. (2008). Semiparametric efficiency in gmm models with
auxiliary data.The Annals of Statistics, 36(2), 808–843.
Chernozhukov, V., Escanciano, J. C., Ichimura, H., Newey, W. K., & Robins, J. M. (2022).
Locally robust semiparametric estimation.Econometrica, 90(4), 1501–1535.
Chernozhukov, V., Newey, W. K., & Singh, R. (2022). Automatic debiased machine learning
of causal and structural effects.Econometrica, 90(3), 967–1027.
Chernozhukov, V., Chetverikov, D., Demirer, M., Duflo, E., Hansen, C., Newey, W., & Robins,
J. M. (2018). Double/debiased machine learning for treatment and structural param-
eters. The Econometrics Journal, 21(1), C1–C68.
Chetty, R., Friedman, J. N., & Rockoff, J. E. (2014). Measuring the impacts of teachers I:
Evaluating bias in teacher value-added estimates.American Economic Review, 104(9),
2593–2632.
Cole, S., Giné, X., Tobacman, J., Topalova, P., Townsend, R., & Vickery, J. (2013). Barriers
to household risk management: Evidence from india.American Economic Journal:
Applied Economics, 5(1), 104–135.
Crump, R. K., Hotz, V. J., Imbens, G. W., & Mitnik, O. A. (2006).Moving the goalposts:
Addressing limited overlap in the estimation of average treatment effects by chang-
ing the estimand (Working Paper No. 330). National Bureau of Economic Research.
Cambridge, MA.
Crump, R. K., Hotz, V. J., Imbens, G. W., & Mitnik, O. A. (2009). Dealing with limited
overlap in estimation of average treatment effects.Biometrika, 96(1), 187–199.
De Chaisemartin, C., & D’Haultfœuille, X. (2023). Two-way fixed effects and differences-
in-differences estimators with several treatments.Journal of Econometrics, 236(2),
105480.
37


<!-- page 39 -->

de Chaisemartin, C., & D’Haultfœuille, X. (2020). Two-way fixed effects estimators with
heterogeneous treatment effects.American Economic Review, 110(9), 2964–2996.
de los Angeles Resa, M., & Zubizarreta, J. R. (2020). Direct and stable weight adjustment
in non-experimental studies with multivalued treatments: Analysis of the effect of an
earthquake on post-traumatic stress.Journal of the Royal Statistical Society Series A:
Statistics in Society, 183(4), 1387–1410.
de Mel, S., McKenzie, D., & Woodruff, C. (2013). The demand for, and consequences of,
formalizationamonginformalfirmsinSriLanka. American Economic Journal: Applied
Economics, 5(2), 122–150.
Dobbie, W., & Song, J. (2015). Debt relief and debtor outcomes: Measuring the effects of
consumer bankruptcy protection.American Economic Review, 105(3), 1272–1311.
Drexler, A., Fischer, G., & Schoar, A. (2014). Keeping it simple: Financial literacy and rules
of thumb.American Economic Journal: Applied Economics, 6(2), 1–31.
Duflo, E., Dupas, P., & Kremer, M. (2015). Education, hiv, and early fertility: Experimental
evidence from kenya.American Economic Review, 105(9), 2757–2797.
Frandsen, B., Lefgren, L., & Leslie, E. (2019).Judging judge fixed effects(Working Paper
No. 25528). National Bureau of Economic Research. Cambridge, MA.
Fryer, R. G., & Levitt, S. D. (2013). Testing for racial differences in the mental ability of
young children.American Economic Review, 103(2), 981–1005.
Geruso, M., Layton, T., & Wallace, J. (2020).Are all managed care plans created equal? evi-
dence from random plan assignment in Medicaid(Working Paper No. 27762). National
Bureau of Economic Research. Cambridge, MA.
Goodman-Bacon,A.(2021).Difference-in-differenceswithvariationintreatmenttiming. Jour-
nal of Econometrics, 225(2), 254–277.
Graham, B. S., & Pinto, C. C. d. X. (2022). Semiparametrically efficient estimation of the
average linear regression function.Journal of Econometrics, 226(1), 115–138.
Hahn, J. (1998). On the role of the propensity score in efficient semiparametric estimation of
average treatment effects.Econometrica, 66(2), 315–331.
Hirano, K., Imbens, G. W., & Ridder, G. (2003). Efficient estimation of average treatment
effects using the estimated propensity score.Econometrica, 71(4), 1161–1189.
Hull, P. D. (2018a). IsoLATEing: Identifying counterfactual-specific treatment effects with
cross-stratum comparisons(Working Paper). SSRN.
Hull, P. D. (2018b).Estimating treatment effects in mover designs. arXiv: 1804.06721.
Imbens, G. W., & Angrist, J. D. (1994). Identification and estimation of local average treat-
ment effects.Econometrica, 62(2), 467–475.
Imbens, G. W., Newey, W. K., & Ridder, G. (2007).Mean-squared-error calculations for
average treatment effects[Unpublished manuscript, MIT].
Imbens, G. W., & Wooldridge, J. (2009). Recent developments in the econometrics of program
evaluation. Journal of Economic Literature, 47(1), 5–86.
38


<!-- page 40 -->

Kane, T. J., & Staiger, D. O. (2008).Estimating teacher impacts on student achievement: An
experimental evaluation (Working Paper No. 14607). National Bureau of Economic
Research. Cambridge, MA.
Keogh-Brown, M. R., Bachmann, M. O., Shepstone, L., Hewitt, C., Howe, A., Ramsay, C. R.,
Song, F., Miles, J. N. V., Torgerson, D. J., Miles, S., Elbourne, D., Harvey, I., &
Campbell, M. J. (2007). Contamination in trials of educational interventions.Health
Technology Assessment, 11(43).
Khan, S., & Tamer, E. (2010). Irregular identification, support conditions, and inverse weight
estimation. Econometrica, 78(6), 2021–2042.
Kirkeboen, L. J., Leuven, E., & Mogstad, M. (2016). Fieldof study, earnings, andself-selection.
The Quarterly Journal of Economics, 131(3), 1057–1111.
Kline, P., & Walters, C. R. (2016). Evaluating public programs with close substitutes: The
case of head start.Quarterly Journal of Economics, 131(4), 1795–1848.
Kling, J. R. (2006). Incarceration length, employment, and earnings.American Economic
Review, 96(3), 863–876.
Krueger, A. B. (1999). Experimental estimates of education production functions.The Quar-
terly Journal of Economics, 114(2), 497–532.
Lee, S., & Salanié, B. (2018). Identifying effects of multivalued treatments.Econometrica,
86(6), 1939–1963.
Li, F., & Li, F. (2019). Propensity score weighting for causal inference with multiple treat-
ments. The Annals of Applied Statistics, 13(4), 2389–2415.
Li, F., Morgan, K. L., & Zaslavsky, A. M. (2018). Balancing covariates via propenstiy score
weighting. Journal of the American Statistical Association, 113(521), 390–400.
Maestas, N., Mullen, K. J., & Strand, A. (2013). Does disability insurance receipt discourage
work? using examiner assignment to estimate causal effects of SSDI receipt.American
Economic Review, 103(5), 1797–1829.
Manning, W. G., Newhouse, J. P., Duan, N., Keeler, E. B., Leibowitz, A., & Marquis, M. S.
(1987). Health insurance and the demand for medical care: Evidence from a random-
ized experiment.American Economic Review, 77(3), 251–277.
McNeney, B., & Wellner, J. A. (2000). Application of convolution theorems in semiparametric
models with non-i.i.d. data.Journal of Statistical Planning and Inference, 91(2), 441–
480.
Mogstad, M., Santos, A., & Torgovitsky, A. (2018). Using instrumental variables for inference
about policy relevant treatment parameters.Econometrica, 86(5), 1589–1619.
Mogstad, M., Torgovitsky, A., & Walters, C. R. (2021). The causal interpretation of two-
stage least squares with multiple instrumental variables.American Economic Review,
111(11), 3663–3698.
Mountjoy, J., & Hickman, B. (2021).The returns to college(s): Estimating value-added and
match effects in higher education (Working Paper No. 29276). National Bureau of
Economic Research. Cambridge, MA.
39


<!-- page 41 -->

Mueller-Smith, M. (2015). The criminal and labor market impacts of incarceration[Unpu-
bished manuscript, University of Michigan].
Newey, W. K. (1994). The asymptotic variance of semiparametric estimators.Econometrica,
62(6), 1349–1382.
Norris, S. (2019). Examiner inconsistency: Evidence from refugee appeals(Working Paper
No. 2018-75). University of Chicago, Becker Friedman Institute for Economics.
Rim, N., Ba, B., & Rivera, R. (2020). Disparities in police award nominations: Evidence from
chicago. AEA Papers and Proceedings, 110, 447–451.
Robins, J., Sued, M., Lei-Gomez, Q., & Rotnitzky, A. (2007). Comment: Performance of
double-robust estimators when “inverse probability” weights are highly variable.Sta-
tistical Science, 22(4), 544–559.
Robins, J. M., Mark, S. D., & Newey, W. K. (1992). Estimating exposure effects by modelling
the expectation of exposure conditional on confounders.Biometrics, 48(2), 479.
Robins, J. M., Rotnitzky, A., & Zhao, L. P. (1994). Estimation of regression coefficients
when some regressors are not always observed.Journal of the American Statistical
Association, 89(427), 846–866.
Robinson, P. M. (1988). Root-N-consistent semiparametric regression.Econometrica, 56(4),
931.
Słoczyński, T., & Wooldridge, J. M. (2018). A general double robustness result for estimating
average treatment effects.Econometric Theory, 34(1), 112–133.
Small, D. S., Tan, Z., Ramsahai, R. R., Lorch, S. A., & Brookhart, M. A. (2017). Instrumental
variable estimation with a stochastic monotonicity assumption. Statistical Science,
32(4), 561–579.
Sun, L., & Abraham, S. (2021). Estimating dynamic treatment effects in event studies with
heterogeneous treatment effects.Journal of Econometrics, 225(2), 175–199.
van der Vaart, A. (1998).Asymptotic statistics. Cambridge University Press.
van der Vaart, A., & Wellner, J. A. (1989).Prohorov and continuous mapping theorems in the
Hoffmann-Jørgensen weak convergence theory, with applications to convolution and
asymptotic minimax theorems[Unpublished manuscript, Unversity of Seattle].
vanderVaart,A.,&Wellner,J.A.(1996). Weak convergence and empirical processes.Springer.
Weisburst, E. K. (2019). Police use of force as an extension of arrests: Examining disparities
across civilian and officer race.AEA Papers and Proceedings, 109, 152–156.
Wooldridge, J. M. (2007). Inverse probability weighted estimation for general missing data
problems. Journal of econometrics, 141(2), 1281–1301.
Wooldridge, J. M. (2021).Two-way fixed effects, the two-way Mundlak regression, and differ-
ence-in-differences estimators(Working Paper). SSRN.
Yang, S., Imbens, G. W., Cui, Z., Faries, D. E., & Kadziola, Z. (2016). Propensity score
matching and subclassification in observational studies with multi-level treatments.
Biometrics, 72(4), 1055–1065.
Zhou, X., & Opacic, A. (2022).Marginal interventional effects. arXiv: 2206.10717.
40


<!-- page 42 -->

Appendix A Proofs and Additional Results
A.1 Proof of Proposition 1
We prove a generalization of the Proposition 1 which allows any vector of treatmentsXi
(which may not be binary or mutually exclusive). We continue to consider the partially linear
model in eq. (8), and maintain Assumption 2, as well as conditional mean-independence of
the potential outcomesE[Yi(x) | Xi, Wi] = E[Yi(x) | Wi], which extends Assumption 1. We
also assume that the potential outcomesYi(x) are linear inx, conditional onWi:
E[Yi(x) | Wi = w] = E[Yi(0) | Wi = w] + x′τ(w),
for some functionτ. This condition holds trivially in the main-text discussion of mutually ex-
clusive binary treatments. More generally,τk(w) corresponds to the conditional average effect
of increasing Xik by one unit among observations withWi = w. Although this assumption is
not essential, it considerably simplifies the derivations. We continue to defineτ = E[τ(Wi)]
as the average vector of per-unit effects.
We now prove that under these assumptionsβk is given by the expression in eq. (15). We
further prove thatE[λkk(Wi)] = 1 and E[λkℓ(Wi)] = 0 for ℓ ̸= k in general, and give a more
detailed characterization of the weights in the case of mutually exclusive treatment indicators.
First note that by iterated expectations and conditional mean-independence,E[
≈
XikYi] =
E[E[
≈
XikYi | Xi, Wi]] = E[
≈
XikE[Yi(0) | Wi]] + E[
≈
XikX ′
iτ(Wi)]. By definition of projection,
E[ ˜Xig(Wi)] = 0 for all g ∈ G (van der Vaart, 1998, Theorem 11.1); thus if eq. (13) holds
E[
≈
XikE[Yi(0) | Wi]] = 0. Similarly, under eq. (12),E[
≈
Xik | Wi] = 0, so by iterated expecta-
tions, E[
≈
XikE[Yi(0) | Wi]] = E[E[
≈
Xik | Wi]E[Yi(0) | Wi]] = 0. Thus,
βk = E[
≈
XikX ′
iτ(Wi)]
E[
≈
X2
ik]
= E[
≈
XikXikτk(Wi)]
E[
≈
X2
ik]
+
P
ℓ̸=k E[
≈
XikXiℓτℓ(Wi)]
E[
≈
X2
ik]
.
This proves eq. (15).
To show thatE[λkk(Wi)] = 1 and E[λkℓ(Wi)] = 0 for ℓ ̸= k in general, note that
E[λkk(Wi)] = E[
≈
XikXik]
E[
≈
X2
ik]
= 1,
since
≈
Xi,k is a residual from projectingXik onto the space spanned by functions of the form
˜g(Wi) + X ′
i,−k ˜β−k, so thatE[
≈
XikXik] = E[
≈
X2
ik]. Furthermore,
≈
Xi,k must also be orthogonal
to Xi,−k by definition of projection, so thatE[λkℓ(Wi)] = E[
≈
XikXiℓ]/E[
≈
X2
ik] = 0.
Finally, if Xi are mutually exclusive treatment indicators, writeE∗[Xik | Xi,−k, Wi] =
41


<!-- page 43 -->

X ′
i,−k˜δk + ˜gk(Wi). Since XikXi,−k = 0, we may write
λkk(Wi) = pk(Wi)(1 − ˜gk(Wi))
E[
≈
X2
ik]
= pk(Wi)(1 − E∗[Xik | Xi,−k = 0, Wi])
E[
≈
X2
ik]
,
and, by similar arguments,λkℓ(Wi) = −pℓ(Wi)E∗[Xik | Xiℓ = 1, Wi]/E[
≈
X2
ik], which yields the
second expression for the weights. It remains to show thatλkk(Wi) ≥ 0 if eq. (12) holds and
Xi consists of mutually exclusive indicators. To that end, observe thatλkℓ(Wi) is given by
the (k, ℓ) element of
Λ(Wi) = E[ ˜Xi ˜X ′
i]−1E[ ˜XiX ′
i | Wi]
If eq. (12) holds, then wecan write this asΛ(Wi) = E[v(Wi)]−1v(Wi)where v(Wi) = E[ ˜Xi ˜X ′
i |
Wi]. If X isavectorofmutuallyexclusiveindicators, then v(Wi) = diag(p(Wi))−p(Wi)p(Wi)′.
Let v−k(Wi) denote the submatrix with thekth row and column removed, and letp−k(Wi)
denote subvector with thekth row removed. Then by the block matrix inverse formula,
λkk(Wi) = pk(Wi)(1 − pk(Wi)) − E[pk(Wi)p−k(Wi)′]E[v−k(Wi)]−1p−k(Wi)pk(Wi)
E[pk(Wi)(1 − pk(Wi))] − E[pk(Wi)p−k(Wi)′]E[v−k(Wi)]−1E[pk(Wi)p−k(Wi)]
Note p0(Wi) = 1 −PK
k=1 pk(Wi) and pk(Wi)p−k(Wi) = v−k(Wi)ι − p0(Wi)p−k(Wi), where ι
denotes a (K − 1)-vector of ones. Thus, the numerator can be written as
pk(Wi)(1 − pk(Wi)) − ι′p−k(Wi)pk(Wi)
+ E[p0(Wi)p−k(Wi)′]E[v−k(Wi)]−1p−k(Wi)pk(Wi)
= pk(Wi)p0(Wi) + E[p0(Wi)p−k(Wi)′]E[v−k(Wi)]−1p−k(Wi)pk(Wi).
The eigenvalues of E[v−k(Wi)] are positive because it is a covariance matrix. Furthermore,
the off-diagonal elements of E[v(Wi)] are negative, and hence the off-diagonal elements of
E[v−k(Wi)] are also negative. It therefore follows thatE[v−k(Wi)] is an M-matrix (Berman
& Plemmons, 1994, propertyD16, p. 135). Hence, all elements ofE[v−k(Wi)]−1 are positive
(Berman & Plemmons, 1994, property N38, p. 137). Thus, both summands in the above
expression are positive, so thatλkk(Wi) ≥ 0.
A.2 Proof of Proposition 2
The parameter of interestθλ,c depends on the realizations of the controls. We therefore derive
the semiparametric efficiency bound conditional on the controls; i.e. we show that eq. (18) is
almost-surely the variance bound for estimators that are regular conditional on the controls.
Relative to the earlier results in Hahn (1998) and Hirano et al. (2003), we need to account
42


<!-- page 44 -->

for the fact that the data are no longer i.i.d. once we condition on the controls.
To that end, we use the notion of semiparametric efficiency based on the convolution
theorem of van der Vaart and Wellner (1989, Theorem 2.1) (see also van der Vaart & Wellner,
1996, Chapter 3.11). We first review the result for convenience. Consider a model{Pn,θ : θ ∈
Θ} parametrized by (a possibly infinite-dimensional) parameterθ. Let ˙P denote a tangent
space, a linear subspace of some Hilbert space with an inner product⟨·, ·⟩. Suppose that
the model is locally asymptotically normal (LAN) atθ relative to a tangent space ˙P: for
each g ∈ ˙P, there exists a sequenceθn(g) such that the likelihood ratios are asymptotically
quadratic, dPn,θn(g)/dPn,θ = ∆ n,g − ⟨ g, g⟩/2 + oPn,θ(1), where (∆n,g)g∈ ˙P converges under
Pn,θ to a Gaussian process with covariance kernel⟨g1, g2⟩. Suppose also that the parameter
βn(Pn,θ) is differentiable: for each g, √n(βn(Pn,θn(g)) − βn(Pn,θ)) → ⟨ ψ, g⟩ for some ψ that
lies in the completion of ˙P. Then the semiparametric efficiency bound is given by ⟨ψ, ψ⟩:
the asymptotic distribution of any regular estimator of this parameter, based on a sample
Sn ∼ Pn,θ, is given by the convolution of a random variableZ ∼ N (0, ⟨ψ, ψ⟩) and some other
random variable U that is independent ofZ.
To apply this result in our setting, we proceed in three steps. First, we define the tangent
space and the probability-one set over which we will prove the efficiency bound. Next, we
verify that the model is LAN. Finally, we verify differentiability and derive the efficient
influence function ψ.
Step 1 By the conditional independence assumption in eq. (11), we can write the density
of the vector (Yi(0), . . . , Yi(K), Di) (with respect to some σ-finite measure) conditional on
Wi = w as f(y0, . . . , yK | w) ·QK
k=0 pk(w)1 {d=k}, where f denotes the conditional density of
the potential outcomes, conditional on the controls. The density of the observed dataSN =
{(Yi, Di)}N
i=1 conditional on (W1, . . . , WN) = ( w1, . . . , wN) is given byQN
i=1
QK
k=0(fk(yi |
wi)pk(wi))1 {di=k}, where fk(y | w) =
R
f(yk, y−k | w)dy−k.
Since the propensity scores are known, the model is parametrized byθ = f. Consider
one-dimensional submodels of the form fk(y | w; t) = fk(y | w)(1 + t × sk(y | w)), where
the function sk is bounded and satisfies
R
sk(y | w)fk(y | w)dy = 0 for all w ∈ W with W
denoting the support of Wi. For small enough t, we have fk(y | w; t) ≥ 0 by boundedness
of sk; hence fk(y | w; t) is a well-defined density fort small enough. The joint log-likelihood,
conditional on the controls, is given by
NX
i=1
KX
k=0
1 {Di = k}(log fk(Yi | wi; t) + logpk(wi)).
The score att = 0 isPN
i=1 s(Yi, Di | wi), with s(Yi, Di | wi) =PK
k=0 1 {Di = k}sk(Yi | wi).
43


<!-- page 45 -->

This result suggests defining the tangent space to consist of functions s(y, d | w) =
PK
k=0 1 {d = k}sk(y | Wi = w), such that sk is bounded and satisfies
R
sk(y | w)fk(y |
w)dy = 0 for all w ∈ W. Define the inner product on this space by⟨s1, s2⟩ = E[s1(Yi, Di |
Wi)s2(Yi, Di | Wi)]. Note this is a marginal (rather than a conditional) expectation, over the
unconditional distribution (Yi, Di, Wi) of the observed data.
We will prove the efficiency bound on the eventE that (i) 1
N
PN
i=1 E[s(Yi, Di | Wi)2 |
Wi] → E[s(Y, Di | Wi)2], (ii) 1
N
PN
i=1 λ(Wi) → E[λ(Wi)], and (iii) 1
N
PN
i=1 λ(Wi)PK
k=0 ck ·
E[Yi(k)sk(Yi(k) | Wi) | Wi] →PK
k=0 ckE[λ(Wi)Yi(k)sk(Yi(k) | Wi)]. By assumptions of the
proposition, these are all averages of functions ofWi with finite absolute moments. Hence, by
the law of large numbers,E is a probability one set.
Step 2 We verify that the conditions (3.7–12) of Theorem 3.1 in McNeney and Wellner
(2000) hold on the set E conditional on the controls, with θN(s) = f(· | · ; 1/
√
N). Let
αN i = QK
k=0(fk(Yi | wi; 1/
√
N)/fk(Yi | wi))1 {Di=k} = QK
k=0(1 + sk(Yi | w)/
√
N)1 {Di=k}
denote the likelihood ratio associated with theith observation. Since this is bounded by the
boundedness of sk, condition (3.7) holds. Also since(1 +tsk)1/2 is continuously differentiable
for t small enough, with derivative sk/2√1 + tsk, it follows from Lemma 7.6 in van der
Vaart (1998) that N −1PN
i=1 E[
√
N(α1/2
N i − 1) − s(Yi, Di | wi)/2 | Wi = wi]2 → 0 such
that the quadratic mean differentiability condition (3.8) holds. Since sk is bounded, the
Lindeberg condition (3.9) also holds. Next, 1
N
PN
i=1 E[s(Yi, Di | Wi)2 | Wi] converges to
E[s(Y, Di | Wi)2] = ⟨s, s⟩ on E by assumption. Hence, conditions (3.10) and (3.11) also hold.
Since the scores∆N,s = 1√
N
PN
i=1 s(Yi, Di | wi) are exactly linear ins, condition (3.12) also
holds. It follows that the model is LAN onE.
Step 3 Write the parameter of interest θλ,c as βN(f) = PN
i=1 λ(wi)
R
yPK
k=0 ckfk(y |
wi)dy/PN
i=1 λ(wi). It follows that
√
N(βN(f(· | · ; 1/
√
N)) − βN(f))
= 1
N −1PN
i=1 λ(wi)
1√
N
NX
i=1
λ(wi)
Z
y
KX
k=0
ck(fk(y | wi; 1/
√
N) − fk(y | wi))dy
= 1
N −1PN
i=1 λ(wi)
1
N
NX
i=1
λ(wi)
KX
k=0
ck
Z
ysk(y | wi)fk(y | wi)dy,
44


<!-- page 46 -->

which converges toPK
k=0 ckE[λ(Wi)Yi(k)sk(Yi(k) | Wi)]/E[λ(Wi)] on E by assumption. We
can write this as⟨ψ, s⟩, where
ψ(Yi, Di, Wi) =
KX
k=0
1 {Di = k}λ(Wi)ck
(Yi − µk(Wi)).
pk(Wi)E[λ(Wi)] .
Observe thatψ is in the model tangent space, with the summands playing the role ofsk(y | w)
(more precisely, sinceψ is unbounded, it lies in the completion of the tangent space). Hence,
the semiparametric efficiency bound is given byE[ψ2].
A.3 Efficiency of the CW estimator
The next result shows that the estimator in eq. (26) is efficient. We defer its proof to Ap-
pendix A.4.
Proposition 3. Suppose eq. (11) holds in an i.i.d. sample of size N, with known non-
degenerate propensity scores pk(Wi). Let β∗
λCW,k = E[λCW(Wi)τk(Wi)]/E[λCW(Wi)], and
α∗
k = β∗
λCW,k+E[λCW(Wi)µ0(Wi)]/E[λCW(Wi)]. Suppose that the fourth moments ofλCW(Wi)
and µ(Wi) are bounded, and that pk ∈ G , (µk(Wi) − α∗
k) λCW(Wi)2
pk′(Wi)2 ∈ G , and (µk(Wi) −
α∗
k) λCW(Wi)
pk(Wi) ∈ G for all k, k′. Then, provided it is asymptotically linear and regular,ˆβˆλCW
achieves the semiparametric efficiency bound for estimatingβλCW, with diagonal elements of
its asymptotic variance of:
1
E[λCW(Wi)]2 E
 λCW(Wi)2σ2
0(Wi)
p0(Wi) + λCW(Wi)2σ2
k(Wi)
pk(Wi)
+λCW(Wi)2(τk(Wi) − β∗
λCW,k)2
 KX
k′=0
λCW(Wi)2
pk(Wi)3 − 1
!#
.
This efficiency result doesn’t rely on homoskedasticity: under heteroskedasticity, the estimator
ˆβˆλCW is still efficient forβλCW (although the weightingλCW(Wi) need not be optimal under
heteroskedasticity). It is stated under the high-level condition thatˆβˆλCW is regular; the proof
uses calculations from Newey (1994) to verify the estimator achieves the efficiency bound.
Primitive regularity conditions will depend on the form ofG and are omitted for brevity.
Remark 9. The asymptotic variance of the estimator ˆβλCW is larger than the asymptotic
variance of the infeasible estimator that replaces the estimated weightsˆλCW(Wi)/ˆpDi(Wi) in
eq. (26) with the infeasible weightsλCW(Wi)/pDi(Wi). The latter achieves the asymptotic
45


<!-- page 47 -->

variance implied by Corollary 2,
1
E[λCW(Wi)]2 E
 λCW(Wi)2σ2
0(Wi)
p0(Wi) + λCW(Wi)2σ2
k(Wi)
pk(Wi)

. (27)
The extra term of the asymptotic variance in Proposition 3 relative to eq. (27) reflects the
cost of having to estimate the weights.35 Analogous term is present in the expression for the
asymptotic variance of the one-treatment-at-a-time estimator implementing the weights from
Corollary 1.
A.4 Proof of Proposition 3
We first derive the semiparametric efficiency bound for estimatingβλCW when the propensity
scoresarenotknown, usingthesamesteps, notation, andsetupasintheproofofProposition1.
We then verify that the estimatorˆβˆλCW achieves this bound.
Step 1 Since the propensity scores are not known, the model is now parametrized byθ =
(f, p). Consider one-dimensional submodels of the formfk(y | w; t) = fk(y | w)(1 + tsy,k(y |
w)), and pk(w; t) = pk(w)(1 +tsp,k(x)), where the functionssy,k, sp,k are bounded and satisfyR
sy,k(y | w)fk(y | w)dy = 0 andPK
k=0 pk(w)sp,k(w) = 0 for all w ∈ W . These conditions
ensure that fk(y | w; t) and pk(w; t) are positive fort small enough and thatPK
k=0 pk(w; t) =
PK
k=0 pk(w) = 1, so that the submodel is well-defined. The joint log-likelihood, conditional
on the controls, is given by
NX
i=1
KX
k=0
1 {Di = k}(log fk(Yi | wi; t) + logpk(wi; t)).
The score at t = 0 is given byPN
i=1 s(Yi, Di | wi), with s(Yi, Di | wi) = PK
k=0 1 {Di =
k}(sy,k(Yi | wi) + sp,k(wi)).
In line with this result, we define the tangent space to consist of all functionss(y, d |
w) = PK
k=0 1 {d = k}(sy,k(y | w) + sp,k(w)) such that sy,k and sp,k satisfy the above re-
strictions. Define the inner product on this space by the marginal expectation ⟨s1, s2⟩ =
E[s1(Yi, Di | Wi)s2(Yi, Di | Wi)]. We will prove the efficiency bound on the eventE that (i)
1
N
PN
i=1 E[s(Yi, Di | Wi)2 | Wi] → E[s(Y, Di | Wi)2]; (ii) N −1P
i λCW(Wi) → E[λCW(Wi)];
(iii) N −1P
i λCW(Wi)PK
k=0 ckE[Yi(k) · sy,k(Yi | Wi) | Wi] → PK
k=0 ckE[λCW(Wi)Yi(k) ·
35The extra term shows this cost is zero if either there is no treatment effect heterogeneity, so thatτk(Wi) =
β∗
λCW,k, or if the treatment assignment is completely randomized so thatpk(Wi) = 1 /(K + 1). In the latter
case λ∗(Wi) = 1 /(K + 1)2 so PK
k=0 λCW(Wi)2/p(Wi)3 = 1. The extra term can be avoided altogether if we
interpret ˆβˆλCW as an estimator ofβˆλCW. This follows from arguments in Crump et al. (2006, Lemma B.6).
46


<!-- page 48 -->

sy,k(Yi(k) | Wi)]; (iv)N −1PN
i=1 λCW(Wi)2P
k,k′ ck′µk′(Wi) sp,k(Wi)
pk(Wi) → E[λCW(Wi)2·P
k,k′ ck′ ·
µk′(Wi) sp,k(Wi)
pk(Wi) ]; (v) N −1PN
i=1 λCW(Wi)2PK
k=0
sp,k(Wi)
pk(Wi) → E[λCW(Wi)2PK
k=0
sp,k(Wi)
pk(Wi) ]; and
(vi) βλCW → β∗
λCW. Under the proposition assumptions and the law of large numbers,E is a
probability-one set.
Step 2 We verify that the conditions (3.7–3.12) of Theorem 3.1 in McNeney and Wellner
(2000) hold on the setE conditional on the controls, withθN(s) = (f(· | · ; 1/
√
N), p(·; 1/
√
N)).
Let αN i = QK
k=0(fk(Yi | wi; 1/
√
N)pk(wi; 1/
√
N)/fk(Yi | wi)pk(wi))1 {Di=k} = QK
k=0((1 +
N −1/2sy,k(Yi | Wi; N −1/2))(1 + N −1/2sp,k(wi; 1/
√
N)))1 {Di=k} denote the likelihood ratio
associated with the ith observation. Since this is bounded by the boundedness ofsy,k, sp,k,
condition (3.7) holds. Also, since(1+ tsp,k)1/2 and (1+ tsy,k)1/2 are continuously differentiable
for t small enough, it follows from Lemma 7.6 in van der Vaart (1998) that the quadratic mean
differentiability condition (3.8) holds. Sincesk is bounded, the Lindeberg condition (3.9) also
holds. Next, 1
N
PN
i=1 E[s(Yi, Di | Wi)2 | Wi] converges to E[s(Y, Di | Wi)2] = ⟨s, s⟩ on
E by assumption. Hence, conditions (3.10) and (3.11) also hold. Since the scores∆N,s =
1√
N
PN
i=1 s(Yi, Di | wi) are exactly linear ins, condition (3.12) also holds. It follows that the
model is LAN onE.
Step 3 Write the parameter of interest,βλCW, as βN(θ) =PN
i=1 λCW(wi)
R
yPK
k=0 ckfk(y |
wi)dy/PN
i=1 λCW(wi), whereλCW(wi) = 1/PK
k=0 pk(wi)−1. Letting ˙βN(θ) denote the deriva-
tive of βN(θ(· | · ; t)) at t = 0, we have
√
N(βN(θ(· | · ; 1/
√
N)) − βN(θ)) = ˙βN(θ) + o(1).
Let h(w) = λCW(w)PK
k=0 ck
R
ysy,k(y | w)fk(y | w)dy, and˜h(Wi) =PK
k′=0 ck′µk′(Wi)−β∗
λCW.
The derivative may then be written as
˙βN(θ) = 1PN
i=1 λCW(wi)
NX
i=1
 
h(wi) + λCW(wi)2
KX
k=0
sp,k(wi)
pk(wi)
 KX
k′=0
ck′µk′(wi) − βN(θ)
!!
→ 1
E[λCW
i ] E
"
h(Wi) + (λCW
i )2
KX
k=0
sp,k(Wi)
pk(Wi)
 KX
k′=0
ck′µk′(Wi) − β∗
λCW
!#
= 1
E[λCW
i ] E
"
λCW
i
KX
k=0
Xki
 
ck
Yi − µk(Wi)
pk(Wi) + λCW
i ˜h(Wi)
pk(Wi)2
!
s(Yi, Di | Wi)
#
,
where λCW
i = λCW(Wi), the limit on the second line holds on the eventE, and the third
line uses E[Xki(Yi − µk(Wi))s(Yi, Di | Wi) | Wi] = pk(Wi)E[Yi(k)sy,k(Yi(k) | Wi) | Wi] and
E[Xkis(Yi, Di | Wi) | Wi] = pk(Wi)sp,k(Wi). Since for any functiona(Wi), E[a(Wi)s(Yi, Di |
47


<!-- page 49 -->

Wi)] = 0 , subtracting 1
E[λCW
i ]
PK
k=0 E[(λCW
i )2 ˜h(Wi)
pk(Wi) s(Yi, Di | Wi)] = 0 from the preceding
display implies
√
N(βN(θ(· | · ; 1/
√
N)) − βN(θ)) = E[ψ(Yi, Di, Wi)s(Yi, Di | Wi)] + o(1),
where
ψ(Yi, Di, Wi) =
KX
k=0
Xki ·
 λCW
i
E[λCW
i ] ck
Yi − µk(Wi)
pk(Wi) + λCW
i
E[λCW
i ]
˜h(Wi)
 λCW
i
p2
k
− 1

.
Observe thatψ lies in the completion of the tangent space, with the expression in parentheses
playing the role ofsy,k(Yi | Wi) + sp,k(Wi). Hence, the semiparametric efficiency bound is
given by E[ψ2], which yields the expression in the statement of the Proposition.
Attainment of the bound We derive the result in two steps. First, we show that
√
N(βλCW − β∗
λCW) = 1√
N
NX
i=1
ψ∗(Wi) +op(1)where ψ∗(Wi) = λCW
i
E[λCW
i ](τ(Wi) − β∗
λCW). (28)
Second, we show that
√
N( ˆβˆλCW − β∗
λCW) = 1√
N
NX
i=1
ψ(Yi, Di, Wi) + op(1), (29)
where, letting ϵki = Yi − µk(Wi),
ψk(Yi, Di, Wi) = λCW
i
E[λCW
i ]
 
Xkiϵki
pk(Wi) − X0iϵ0i
pk(Wi) + (τk(Wi) − β∗
λCW,k)λCW
i
X
k′
Xk′i
pk′(Wi)2
!
.
Together, these results imply that the asymptotic variance ofˆβˆλCW as an estimator ofβλCW
is given byvar(ψ − ψ∗), which coincides with the semiparametric efficiency bound.
Equation (28) follows directly under the assumptions of the proposition by the law of
large numbers and the fact that the variance ofλCW
i (τ(Wi) − β∗
λCW) is bounded. To show
eq. (29), write ˆβˆλCW,k = ˆαk − ˆα0, where ˆα is a two-step method of moments estimator based
on the (K + 1) dimensional moment condition E[m(Yi, Di, Wi, α∗, p)] = 0 with elements
mk(Yi, Di, Wi, α∗, p) = λCW
i
Xki
pk(Wi)(Yi − α∗
k), and α∗ is a (K + 1) dimensional vector with
elements α∗
k = E[λCW
i µk(Wi)]/E[λCW
i ].
Consider a one-dimensional pathFt such that the distribution of the data is given byF0.
Let pk,t(Wi) = EFt[Xki | Wi] denote the propensity score along this path. The derivative of
48


<!-- page 50 -->

E[mk(Yi, Di, Wi, α∗, pt)] with respect tot evaluated at t = 0 is
E
"
λCW
i Xki
pk(Wi) (Yi − α∗
k)
 
λCW
i
KX
k′=0
˙pk′(Wi)
pk′(Wi)2 − ˙pk(Wi)
pk(Wi)
!#
=
KX
k′=0
E[δkk′(Wi)′ ˙pk′(Wi)],
where ˙pk denotes the derivative ofpk,t at t = 0, and
δk,k′(Wi) = λCW
i (µk(Wi) − α∗
k)
 λCW
i
pk′(Wi)2 − 1 {k = k′}
pk(Wi)

.
Under the assumptions of the proposition,δk,k′ ∈ G. It therefore follows by Proposition 4 in
Newey (1994) that the influence function forˆαk is given by
1
E[λCW
i ]
 
λCW
i Xki
pk(Wi) (Yi − α∗
k) +
X
k′
δkk′(Wi)(Xk′i − pk′(Wi))
!
= λCW
i
E[λCW
i ]
 
Xkiϵki
pk(Wi) + (µk(Wi) − α∗
k)λCW
i
X
k′
Xk′i
pk′(Wi)2
!
,
which yields eq. (29).
Appendix B Connections to the DiD Literature
In this appendix we elaborate on the connections between Proposition 1 and the recent liter-
ature studying potential biases from heterogeneous treatment effects in DiD regressions and
related specifications (e.g. Goodman-Bacon, 2021; Sun & Abraham, 2021; Hull, 2018b; de
Chaisemartin & D’Haultfœuille, 2020; De Chaisemartin & D’Haultfœuille, 2023; Callaway &
Sant’Anna, 2021; Borusyak et al., 2024; Wooldridge, 2021). We first show how our framework
fits a TWFE regression with a general treatment specification. We then show how Proposi-
tion 1 applies to three particular specifications: a static binary treatment, a dynamic “event
study” treatment, and a static multivalued treatment (or “movers regression”). In each case
we discuss whether there is a potential for bias—either contamination bias or own-treatment
negative weighting—and give a numerical illustration.
Consider a panel of units indexed byj = 1, . . . , nwhich are observed over time periods
t = 1 , . . . , T. For simplicity, we assume the panel is balanced such that the sample size is
N = nT. For an observationi = (j, t), let Ji = j and Ti = t denote the corresponding unit
and time period, respectively. In a TWFE specification, the controls only comprise these two
variables, Wi = (Ji, Ti), and they enter the control function as dummies,g(Wi) = α+( 1 {Ji =
2}, . . . ,1 {Ji = n}, 1 {Ti = 2}, . . . ,1 {Ti = T })′γ, with the indicators1 {Ji = 1} and 1 {Ti = 1}
49


<!-- page 51 -->

omitted to avoid perfect collinearity.
To study these specifications, we follow de Chaisemartin and D’Haultfœuille (2020) and
Borusyak et al. (2024) in considering then observed units as fixed, and we condition on their
treatment status (results when the units are sampled from a large population are analogous).
For each unitj, we observe a randomT-vector of outcomesYj = (Yj1, . . . , YjT ) and a fixed
T-vector of (K + 1)-valued treatments Dj = ( Dj1, . . . ,DjT ). These treatments are used to
construct a vector of(K + 1)-valued “treatments states”Dj = ( Dj1, . . . , DjT ), with Djt ∈
{0, . . . , K}. Setting Dj = Dj covers scenarios with static treatments; as we show below, other
choices of Dj allows us to cover scenarios with dynamic treatment effects. As in the main
text, Xjt denotes a K-vector of treatment status indicators derived fromDjt.
We make two assumptions. First, we assume that potential outcomesYjt(dt) depend on
the T-vector of treatments only through the current valuedt of the treatment state, such that
Yjt = Yjt(Djt).36 Second, we make a parallel trends assumption by writing the untreated
potential outcomes as
Yjt(0) = αj + λt + ηjt,
for fixed αj and λt, and assuming
E[ηjt] = 0. (30)
Together these expressions implyE[Yjt(0)] = αj+λt, which is how parallel trends is sometimes
formalized (c.f. Assumption 1 in Borusyak et al. (2024); weaker versions of the parallel trends
assumption yield analogous results). We do not restrict the dependence ofηjt across units
or time, nor do we make restrictions on the potentially random treatment effectsτjt,k =
Yjt(k) − Yjt(0). Collecting these effects in a vectorτjt, we have
Yjt = X ′
jtτjt + αj + λt + ηjt. (31)
This outcome model reduces to a conventional TWFE model under the assumption of constant
treatment effects: τjt = β for all (j, t).
Since the only source of randomness are the shocks ηjt and the treatment effects τjt,
this setup fits into the framework of Section 3 if we interpret the expectation in eq. (8) as
averaging over the joint distribution of{τjt, ηjt}n,T
j=1,t=1. Specifically, (β, g) are the minimizers
of N −1Pn
j=1
PT
t=1 Eτ,η[(Yjt −X ′
jt ˜β −˜g(Wjt))2], where the subscript on the expectation makes
explicit that we only integrate over the joint distribution of{τjt, ηjt}n,T
j=1,t=1. The parallel
trends assumption implies µ0(Wi) = αJi + λTi, so that eq. (13) in Assumption 2 holds. In
other words, the parallel trend assumption implies that our controlsg(Wi) correctly specify
36This assumption rules out misspecification of the treatment states, such as when there are dynamic effects
but Djt = Djt only indexes contemporaneous treatment status, as noted in footnote 9.
50


<!-- page 52 -->

the untreated potential outcome mean. Additionally, Assumption 1 holds trivially because
the treatment vector is non-random.
To make the link to Proposition 1, note that˜Xjt = Xjt − ¯Xj − ¯Xt + ¯X coincides with
the sample residual from regressingXi onto unit and time effects. Here ¯Xj = 1
T
PT
t=1 Xjt,
¯Xt = 1
n
Pn
j=1 Xjt, and ¯X = 1
n
Pn
j=1 ¯Xj. We may then write eq. (10) as
β =


nX
j=1
TX
t=1
Eτ,η[ ˜Xjt ˜X ′
jt]


−1 nX
j=1
TX
t=1
Eτ,η[ ˜XjtYjt]
=


nX
j=1
TX
t=1
˜Xjt ˜X ′
jt


−1 nX
j=1
TX
t=1
˜XjtX ′
jtE[τjt],
(32)
where the second equality uses eqs. (30) and (31), and the fact that onlyηjt and τjt are
stochastic. Proposition 1 implies that the coefficient on thekth element onXjt is given by
βk =
X
j,t
λkk(j, t)E[τjt,k] +
X
ℓ̸=k
X
j,t
λkℓ(j, t)E[τjt,ℓ] (33)
where
λkk(j, t) =
≈
Xjt,k Xjt,k
P
j,t
≈
X2
jt,k
, and λkℓ(j, t) =
≈
Xjt,k Xjt,ℓ
P
j,t
≈
X2
jt,k
,
and
≈
Xjt,k is the sample residual from regressing ˜Xjt,k onto the remaining elements of ˜Xjt.
Recall that since we do not assume that eq. (12) holds, it is not guaranteed thatλkk(j, t) ≥ 0.
To unpack this result, we now consider four special cases from the literature.
Static binary treatment Consider a DiD setting where units adopt (and potentially
drop) a binary treatment at different time periods—as studied by de Chaisemartin and
D’Haultfœuille (2020) and Goodman-Bacon (2021). For example, different statesj may
choose to roll out a policy in different years and a researcher wishes to estimate the aver-
age effect of this policy using this staggered adoption. We assume that the treatment is static,
setting Djt = Djt, with K = K = 1. Since the treatment is binary,Xjt = Djt is a scalar with
≈
Xjt,1 = ˜Xjt, and the second term in eq. (33) drops; the weights on the first term simplify to
λ11(j, t) =
˜XjtXjt
P
j′,t′ ˜X2
j′t′
= (1 − X j − X t + X)Xjt
P
j′,t′ ˜X2
j′t′
,
which coincides with the expression in Theorem 1 of de Chaisemartin and D’Haultfœuille
(2020). These treatment weights are not guaranteed to be convex since eq. (12) does not
51


<!-- page 53 -->

hold.37 In contrast, Athey and Imbens (2022) consider staggered DiD regressions where
eq. (12) holds because intervention timing is assumed to be random (in place of the parallel
trends assumption). Under this design-based assumption, Proposition 1 shows the treatment
weights (corresponding to those in Theorem 1(iv) of Athey and Imbens (2022)) are convex.
The above expression forλ11 yields a simple necessary and sufficient condition for convex
weights, which is that for unitsj that are treated in period t, 1 − X j − X t + X ≥ 0. In
staggered adoption designs, X t is increasing with t. Thus, in staggered adoption designs, it
suffices to check this condition fort = T, and for unitj that adopts the treatment first—that
is, to check whether
1 − max
j
X j − X T + X ≥ 0. (34)
Condition (34) holds in the canonical DiD case with a single intervention date, where the
first n1 < n units treated in the last T1 < T periods and untreated in the earlier periods
1, . . . , T − T1. The remaining units are never treated, so thatDjt = Djt = 1 {j ≤ n1, t ≥
T − T1}. This nests the simplest DiD specification whereT = 2 and T1 = 1. In this case,
when units in the treatment group are treated,1 − X j − X t + X = (1 − n1/n)(1 − T1/T ) so
that the weightsλ11(j, t) are non-negative, and eq. (33) simplifies to:
β1 =
X
j,t
λ11(j, t)E[τjt,1], λ 11(j, t) = (1 − n1
n )(1 − T1
T )Xjt
(1 − n1
n )(1 − T1
T ) n1T1
nT
= Xjt
n1T1/N ,
which is simply the average treatment effect for then1T1 treated observations.
However, in presence of multiple treatment adoption dates, eq. (34) may fail. To illustrate,
consider a case with three time periods (T = 3) and three groups of units:E, L, and N, with
respective sizes nE, nL, and nN. Units j ∈ E are “early adopters”, and are treated beginning
in period 2. Units j ∈ L are “late adopters”, and are treated only in period3. Units in the
last group are never treated.38 In this case, eq. (34) simplifies to1 − 2/3 − (nE + nL)/n +
(2/3nE + 1/3nL)/n = (nN − nL)/3n, which is negative if there are more late adopters than
never adopters; otherwise, ifnL < n N, all weights are positive. Indeed, some algebra shows
λ11(j, 3) = nE + 2nN
κ j ∈ L,
λ11(j, 2) = nN + 2nL
κ j ∈ E ,
λ11(j, 3) = nN − nL
κ j ∈ E ,
37Since E[Xjt | Wjt] = Xjt ∈ { 0, 1}, if eq. (12) held, then the residual˜Xjt must be zero (this is true if,
e.g., all units have the same treatment adoption date). But that would generate a multicollinearity issue,
precluding the researcher from including unit and time effects in the regression.
38This example is a special case of the example discussed in Figure 2 of Goodman-Bacon (2021).
52


<!-- page 54 -->

where κ = 2(nEnL + nEnN + nN nL) and λ11(j, t) = 0 otherwise.
Condition (34) is generally quite restrictive. Consider, for instance, a setting in which no
units are treated in the first period and a fraction1/T of observations adopts the treatment
in period t = 2, . . . , T. Then for the group adopting treatment in period2, eq. (34) becomes
(3 − T )/2T, which is negative if T ≥ 4. Similarly, condition (34) fails if there exists an
always-treated group, or if everyone is treated in the last period.
Dynamic binary treatment with staggered adoption Next, consider an “event study”
setting in which each unit j starts being treated in period A(j) ∈ { 1, 2, . . . , T} ∪ ∞ and
remains treated thereafter, with A(j) = ∞ denoting a unit that is never treated. Thus,
Djt = 1 {t > A (j)}, with K = 1. Unlike in previous cases, we allow for dynamic effects
by letting Djt = t − A(j) index the number of periods since the treatment adoption date
(breaking with our usual indexing convention ofDjt ≥ 0), assuming no anticipation effect
one period before adoption, and correspondingly normalizingDjt = −1 for the never-treated
group. Xjt then consists of indicators for all leads and lags relative to the adoption date:
Xjt = (1 {Djt = −(T − 1)}, . . . ,1 {Djt = −2}, 1 {Djt = 0}, . . . ,1 {Djt = T − 1})′, with the
indicator for the period just prior to adoption (Djt = −1) excluded. This specification avoids
perfect collinearity when all treatment adoption dates are represented in the data (including
the never-treated group). Sun and Abraham (2021) and Borusyak et al. (2024) study such
“fully-dynamic” event study specifications.
Since Xjt is now a vector withK = 2(T −1), the second contamination bias term in eq. (33)
will generally be present. As such, Sun and Abraham (2021) and Borusyak et al. (2024) study
the potential for contamination across estimates of post- and pre-treatment effects (with the
latter used in conventional pre-trend specification tests). Furthermore, like in the previous
casewithstatictreatment, theown-treatmentweightsinthefirsttermarepotentiallynegative.
While random treatment timing assumptions may solve the issue of negative own treatment
weights, contamination bias remains a concern even under such assumptions.
To illustrate the potential for contamination bias, consider again the example with early,
late, and never adopters andT = 3, except we now allow the treatment effect to be dynamic.
Let τjts = Yjt(s) − Yjt(−∞), s ∈ {−2, 1, 0, 1} denote the effect on unitj in time period t of
adopting the treatments periods ago. If s is negative, we interpret this as the anticipation
effect of adopting the treatment−s periods from now. Under our assumptionsτjt,−1 = 0, such
that there is no anticipation effect immediately before treatment adoption. To test whether
the two-period-ahead anticipation effect is zero, and whether the effect of the treatment
fades out over time, we let Xjt = ( 1 {Djt = −2}, 1 {Djt = 0 }, 1 {Djt = T − 1})′. Thus,
for instance, Xj1 = (1 , 0, 0)′ for late adopters whileXj2 = (0 , 1, 0)′ for early adopters. Let
τE,ts = n−1
E
P
j∈E E[τjts] denote the average effect among early adopters, and defineτL,ts
53


<!-- page 55 -->

similarly. Then some rather tedious algebra shows that
β =


τL,1,−2
0
τE,3,1

 + λE,0τE,2,0 + λL,0τL,3,0,
where
λE,0 = 1
ζ


3nLnE + nN nE
3nLnE + 2nN nE
−nLnN

 , λ L,0 = 1
ζ


−3nLnE − nN nE
3nEnL + 2nN nL
nN nL

 ,
and ζ = 2(3nLnE + nEnN + nLnN). In other words, the estimand for the two-period-ahead
anticipation effect β1 equals the anticipation effect for late adopters in period 1 (this is the
only group we ever observe two periods before treatment) plus a contamination bias term
coming from the effect of the treatment on impact. Similarly, the estimand for the effect of
the treatment one period since adoption,β3, equals the effect for early adopters in period 3
(this is the only group we ever observe one period after treatment) plus a contamination bias
term coming from the effect of the treatment on impact. The estimand for the effect of the
treatment upon adoption, β0, has no contamination bias, and equals a weighted average of
the effect for early and late adopters. In this example, the own treatment weights are always
positive, but the contamination weights can be large. For instance, with equal-sized groups,
λE,0 = (2/5, 1/2, −1/10)′ and λL,0 = (−2/5, 1/2, 1/10)′, so the contamination weights in the
estimand β1 are almost as large as the own treatment weights forβ2.
It is worth noting that if all treated units share a single adoption date then contamination
bias disappears and a TWFE regression recovers a vector of average dynamic treatment effects
for the treated, in analogy to the static case discussed above. To show this result, let us set
A(j) = T1 for the firstn1 units, withA(j) = ∞for the remainingn0 = n−n1 units. Excluding
the indicator just prior to the adoption date, as well as leads and lags that are always zero
for all units, the treatment vector has lengthT − 1: Xjt = (1 {Djt = −(T1 − 1)}, . . . ,1 {Djt =
−2}, 1 {Djt = 0}, . . . ,1 {Djt = T − T1}). For the control units, this vector is always zero. For
the adopters, Xjt = et (the tth unit vector) ift ≤ T1 − 2, Xj,T −1 is zero, andXjt = et−1 for
t ≥ T1. We may write this compactly asXjt = et 1 {t < T 1 − 1} + et−1 1 {t ≥ T1} for j ≤ n1.
Partialling out the unit and time effects therefore yields
˜Xjt = (1 {j ≤ n1} − n1/n)(et 1 {t < T 1 − 1} + et−1 1 {t ≥ T1} − ιT −1/T ),
where ιT −1 is a T − 1 vector of ones. Hence,Pn
j=1
Pn
t=1 ˜Xjt ˜X ′
jt = n1n0
n

IT −1 − ιT −1ι′
T −1/T

.
54


<!-- page 56 -->

By the Woodbury identity, we therefore obtain
Λ(j, t) =
 nX
j=1
nX
t=1
˜Xjt ˜X ′
jt
−1
˜XjtX ′
jt = n
n1n0
(IT −1 + ιT −1ι′
T −1) ˜XjtX ′
jt
= 1
n1
(IT −1 + ιT −1ι′
T −1)(Xjt − ιT −1/T )X ′
jt = 1
n1
XjtX ′
jt.
Hence, by eq. (32), TWFE regression identifies the average treatment for the treated,β =
1
n1
Pn1
j=1(τj1,−(T −1), . . . , τj,T1−2,−2, τjT1,1, . . . , τjT,T −T1). Intuitively, since the contamination
weights sum to zero and there is only one group of adopters, the contamination weights must
be identically zero.
Mover regressions: multiple treatments with multiple transitions. Finally, consider
a “mover regression” in a setting with a static multivalued treatmentDjt ∈ {0, . . . , K} with
multiple transitions of units between treatment states, leading to multiple treatment paths.
We focus on the static treatment case, settingDjt = Djt. This setting has been studied
by Hull (2018b) and De Chaisemartin and D’Haultfœuille (2023). Our Proposition 1 shows
that such specifications can suffer from two distinct sources of bias: own-treatment negative
weighting from multiple transitions and contamination bias from the multiple treatments. As
before the former bias disappears under random treatment timing (as in Athey and Imbens
(2022)), or other assumptions which make eq. (12) hold.
To illustrate this case, consider a setting withT = 3 periods, K = 3 treatments, and three
groups of units,E, L, andN. Units in the first group start out untreated, move to treatment2
in period1, and move to treatment3 in period3. Units in the second group start in treatment
1, move to being untreated in period2, and move to treatment2 in period 3. Units in group
N are never treated. This example is isomorphic to the previous event study example, in
that it leads to the same regression specification and the same eq. (33) characterization of
regression coefficients. Thus, there are no negative own-treatment weights in this example,
but there are potentially large contamination weights depending on the relative group sizes.
Appendix C Details on the Further Applications
This appendix details our procedure for selecting the additional empirical examples in Sec-
tion 5.2. We also discuss the implementation details and provide the full set of results.
55


<!-- page 57 -->

C.1 Article Search Protocol
We scraped the American Economic Association (AEA) website for a list of all published
articles across all AEA journals over 2013–2022. This search included all articles from the
following journals:American Economic Review, American Economic Review: Insights, Amer-
ican Economic Journal: Applied Economics, American Economic Journal: Economic Pol-
icy, American Economic Journal: Macroeconomics, American Economic Journal: Microe-
conomics, Journal of Economic Literature(excluding articles with “review” in the title and
articles labeled as Front Matter, Doctoral Dissertations, and Annotated Listings),Journal
of Economic Perspectives, and AER/AEA Papers and Proceedings(excluding articles with
“report” or “minutes” in the title). We limited this search to articles with online replication
packages which include at least one data file.39
We next filtered articles by two keyword searches of titles, abstracts, and main texts:
• Experiments (keywords: stratified, random, RCT, experiment).
• Racial disparities (keywords: racial/ethnic differences, discrimination, disparities, gaps).
We focused on racial disparities as a set of possible examples because these papers typically
have three or more categories, and they were easily identifiable based on keywords, giving us
a systematic way to identify them. These searches yielded a total of 1,848 experiments and 67
observational studies on race. To further narrow down experiments, we restricted attention to
papers where one of the keywords appears in the paper’s title, abstract, or associated tweet.
For each search, we then manually reviewed papers in reverse citation order (as measured
by Google Scholar) keeping those which include in the main text a linear regression of some
outcome on multiple treatments or race indicators and controls. We ignored specifications
whereasingletreatmentorraceindicatorisinteractedwithsomesetoffixedeffectsorcontrols,
such as event study specifications. We stopped the review when five papers were identified
with such a specification, or when we exhausted all papers in the search.
C.2 Overlap Sample and Propensity Score Variation
For each main specification, we identify a subset of the analysis sample with full treatment
overlap using the following procedure. First, we define a primary strata variable (when not
otherwise obvious from the paper) as the discrete variable with the greatest number of unique
levels. In the experimental applications this is always the randomization strata; in the obser-
vational applications this is the “finest” fixed effect. We then drop observations for the levels
39Here “data files” refers to those with any of the following extensions: Stata (‘dta’), Excel (‘xls’ or
‘xlsx’), Matlab (‘mat’), R (‘rdata’, ‘rda’, ‘rds’), HDFS (‘h5‘, ‘hdf5’), Apache (‘parquet’, ‘arrow’),
SAS (‘sas7bdat’), and delimited files (‘csv’, ‘tsv’).
56


<!-- page 58 -->

Wald LM
Statistic (d.f.) p-value Statistic (d.f.) p-value
Project STAR 308.9 (154) 0.000 302.9 (154) 0.000
Benhassine et al. 207.2 (159) 0.006 217.2 (194) 0.121
Cole et al. 22.7 (39) 0.983 70.3 (54) 0.067
de Mel et al. 0.9 (392) 1.000 1.1 (392) 1.000
Drexler et al. 12.4 (14) 0.574 12.6 (14) 0.555
Duflo et al. 109.6 (254) 1.000 94.5 (258) 1.000
Fryer and Levitt 3947.6 (630) 0.000 4164.0 (681) 0.000
Rim et al. 1403.5 (88) 0.000 233.0 (234) 0.506
Weisburst 2350.0 (69) 0.000 223.2 (48) 0.000
Notes: This table summarizes Wald and Lagrange multiplier tests of the null hypothesis
that the coefficients on the controls in a multinomial logit regression of the treatment on
the controls all equal zero. The tests allow for clustering in Benhassine et al., Duflo et
al., Rim et al., and Weisburst, and for heteroskedasticity in the remaining applications.
Table C.1: Tests of Propensity Score Variation
of this variable which do not exhibit all levels of the treatment. Finally, in the remaining
sample, we drop any additional controls which have no within-treatment variation.
We check for meaningful propensity score variation in each specification with two tests,
summarized in Table C.1. Specifically, we compute the Wald and LM tests of the null hypoth-
esis that, in a multinomial logit regression of the treatment on the controls, all coefficients on
the controls equal zero. The table gives evidence for statistically significant propensity score
variation (at 10% level) in the Project STAR application, two of the additional experimental
applications (Cole et al. and Benhassine et al.), and all three observational studies.
C.3 Full Results
In Table C.2-C.9, we report the estimated effects for each additional application. Panel A of
each table first reports theˆβ estimates from the multiple-treatment regression as reported in
the original paper and corresponding standard errors. We also report the own-treatment effect
component from the decomposition in eq. (23) along with three alternative estimators: the
ATEestimator, theeasiest-to-estimateweightedATEestimator(EW)andthecommon-weight
(CW) estimator. Panel B reports the difference betweenˆβ and these 4 alternative estimators.
The ˆβ, EW and CW estimators are consistent even without overlap. However, if overlap fails
in the full sample, the own-treatment effect component from the decomposition in eq. (23)
may not be identified for all treatments, and the ATE is not identified. If identification of the
57


<!-- page 59 -->

decomposition fails for the full treatment vector, we subset to the overlap sample, as described
in Appendix C.2 above, and report the full set of estimates from the different estimators.
58


<!-- page 60 -->

Full sample Overlap
A. Estimates ˆβ Own ATE EW CW ˆβ Own ATE EW CW
LCT to fathers 0.074 0 .089 0 .056 0 .067 0 .084 0 .078 0 .076 0 .061
(0.016) (0 .017) (0 .018) (0 .019) (0 .024) (0 .015) (0 .020) (0 .020)
[0.012] [0 .011] [0 .014] [0 .014] [0 .012]
LCT to mothers 0.078 0 .067 0 .071 0 .081 0 .075 0 .079 0 .074 0 .068
(0.014) (0 .013) (0 .017) (0 .017) (0 .017) (0 .014) (0 .015) (0 .017)
[0.009] [0 .011] [0 .012] [0 .011] [0 .012]
CCTs to fathers 0.055 0 .062 0 .041 0 .047 0 .038 0 .033 0 .039 0 .038
(0.014) (0 .013) (0 .018) (0 .016) (0 .015) (0 .014) (0 .016) (0 .017)
[0.009] [0 .012] [0 .012] [0 .012] [0 .012]
CCTs to mothers 0.053 0 .045 0 .040 0 .039 0 .033 0 .042 0 .041 0 .040
(0.013) (0 .013) (0 .018) (0 .017) (0 .016) (0 .015) (0 .017) (0 .018)
[0.011] [0 .013] [0 .014] [0 .013] [0 .013]
Number of controls 57 26
Sample size 11,074 6,996
B. Bias
LCT to fathers −0.016 0 .018 −0.018 −0.011 −0.009 0 .006
(0.010) (0 .018) (0 .015) (0 .016) (0 .010) (0 .019)
LCT to mothers 0.012 0 .007 0 .007 0 .002 0 .007 0 .014
(0.009) (0 .016) (0 .013) (0 .011) (0 .010) (0 .015)
CCTs to fathers −0.007 0 .014 0 .009 0 .013 0 .007 0 .009
(0.005) (0 .015) (0 .009) (0 .010) (0 .006) (0 .015)
CCTs to mothers 0.008 0 .013 0 .006 −0.003 −0.002 −0.001
(0.007) (0 .015) (0 .009) (0 .009) (0 .006) (0 .015)
Notes: This table reports estimates from the Benhassine et al. application, as described in Appendix C.3. The regression specification comes
from column 1 of Table 5 in Benhassine et al. (2015). Standard errors clustered by school sector are reported in parentheses. Standard errors
assuming known propensity scores are reported in square brackets.
Table C.2: Full results: Benhassine et al. (2015)
59


<!-- page 61 -->

Full sample Overlap
A. Estimates ˆβ Own ATE EW CW ˆβ Own ATE EW CW
Muslim only 0.160 0 .095 0 .033 0 .001 0 .038 −0.012 −0.036 0 .010
(0.086) (0 .086) (0 .094) (0 .111) (0 .138) (0 .109) (0 .120) (0 .093)
[0.079] [0 .098] [0 .109] [0 .121] [0 .104]
Hindu only 0.121 0 .058 0 .062 0 .006 0 .075 0 .080 0 .060 0 .076
(0.089) (0 .088) (0 .101) (0 .116) (0 .123) (0 .106) (0 .116) (0 .096)
[0.062] [0 .100] [0 .097] [0 .080] [0 .092]
Group only 0.239 0 .229 0 .103 0 .107 0 .140 0 .158 0 .093 0 .071
(0.097) (0 .098) (0 .112) (0 .115) (0 .130) (0 .086) (0 .106) (0 .108)
[0.076] [0 .097] [0 .082] [0 .099] [0 .091]
Muslim & Group 0.169 0 .092 −0.094 −0.109 −0.075 −0.096 −0.075 −0.088
(0.087) (0 .083) (0 .079) (0 .082) (0 .074) (0 .080) (0 .070) (0 .075)
[0.038] [0 .076] [0 .078] [0 .062] [0 .072]
Hindu & Group 0.018 −0.052 −0.027 −0.004 0 .000 −0.034 0 .000 −0.021
(0.080) (0 .075) (0 .096) (0 .094) (0 .093) (0 .094) (0 .087) (0 .094)
[0.056] [0 .089] [0 .090] [0 .075] [0 .086]
Number of controls 13 3
Sample size 132 73
B. Bias
Muslim only 0.065 0 .127 −0.037 0 .014 0 .038 −0.009
(0.044) (0 .073) (0 .066) (0 .060) (0 .061) (0 .061)
Hindu only 0.063 0 .059 −0.069 −0.075 −0.054 −0.071
(0.050) (0 .083) (0 .044) (0 .085) (0 .041) (0 .081)
Group only 0.010 0 .136 −0.033 −0.050 0 .014 0 .036
(0.060) (0 .103) (0 .060) (0 .081) (0 .064) (0 .102)
Muslim & Group 0.077 0 .263 −0.033 −0.013 −0.033 −0.021
(0.056) (0 .091) (0 .048) (0 .063) (0 .047) (0 .060)
Hindu & Group 0.071 0 .046 −0.004 0 .030 −0.004 0 .016
(0.048) (0 .080) (0 .028) (0 .056) (0 .036) (0 .061)
Notes: This table reports estimates from the Cole et a. application, as described in Appendix C.3. The regression specification
comes from column 6 of Table 7 in Cole et al. (2013). Robust standard errors are reported in parentheses. Standard errors
assuming known propensity scores are reported in square brackets.
Table C.3: Full results: Cole et al. (2013)
60


<!-- page 62 -->

Full sample
A. Estimates ˆβ Own ATE EW CW
Info and Reimburse −0.010 −0.010 −0.010 −0.010 −0.010
(0.023) (0 .014) (0 .007) (0 .012) (0 .007)
[0.000] [0 .000] [0 .000]
Rs 10,000 0.134 0 .134 0 .135 0 .134 0 .135
(0.034) (0 .032) (0 .017) (0 .027) (0 .017)
[0.000] [0 .000] [0 .000]
Rs 20,000 0.105 0 .105 0 .104 0 .105 0 .104
(0.035) (0 .030) (0 .017) (0 .026) (0 .017)
[0.008] [0 .009] [0 .007]
Rs 40,000 0.273 0 .273 0 .269 0 .272 0 .270
(0.041) (0 .038) (0 .020) (0 .033) (0 .020)
[0.000] [0 .000] [0 .000]
Number of controls 98
Sample size 520
B. Bias
Info and Reimburse −0.001 −0.001 −0.001 0 .000
(0.022) (0 .022) (0 .020) (0 .022)
Rs 10,000 0.000 −0.001 0 .000 −0.001
(0.019) (0 .029) (0 .020) (0 .029)
Rs 20,000 0.000 0 .000 0 .000 0 .000
(0.021) (0 .030) (0 .023) (0 .030)
Rs 40,000 0.000 0 .004 0 .001 0 .003
(0.019) (0 .035) (0 .024) (0 .035)
Notes: This table reports all results from the de Mel et al. (2013) application, as described
in Appendix C.3. The regression specification comes from column 2 of Table 2 in de Mel et al.
(2013). Robust standard errors are reported in parentheses. Standard errors assuming known
propensity scores are reported in square brackets.
Table C.4: Full results: de Mel et al. (2013)
61


<!-- page 63 -->

Full sample
A. Estimates ˆβ Own ATE EW CW
Standard Accounting 0.036 0 .038 0 .040 0 .037 0 .040
(0.041) (0 .041) (0 .040) (0 .041) (0 .040)
[0.040] [0 .040] [0 .040]
Rule-of-Thumb 0.109 0 .114 0 .113 0 .112 0 .113
(0.039) (0 .039) (0 .039) (0 .039) (0 .039)
[0.039] [0 .039] [0 .039]
Number of controls 7
Sample size 796
B. Bias
Standard Accounting −0.002 −0.004 −0.001 −0.004
(0.004) (0 .005) (0 .003) (0 .005)
Rule-of-Thumb −0.005 −0.004 −0.004 −0.004
(0.004) (0 .005) (0 .003) (0 .005)
Notes: This table reports estimates from the Drexler et al. (2014) application, as described
in Appendix C.3. The regression specification comes from row 2 of Table 2 in Drexler et al.
(2014). Robust standard errors are reported in parentheses. Standard errors assuming known
propensity scores are reported in square brackets.
Table C.5: Full results: Drexler et al. (2014)
62


<!-- page 64 -->

Full sample Overlap
A. Estimates ˆβ Own ATE EW CW ˆβ Own ATE EW CW
Educ. subsity −0.031 −0.036 −0.029 −0.024 −0.029 −0.025 −0.032 −0.027
(0.012) (0 .011) (0 .011) (0 .013) (0 .012) (0 .007) (0 .011) (0 .010)
[0.000] [0 .000] [0 .001] [0 .001] [0 .001]
HIV education 0.003 0 .009 0 .002 0 .000 0 .005 0 .003 0 .005 0 .000
(0.011) (0 .009) (0 .012) (0 .011) (0 .010) (0 .007) (0 .010) (0 .011)
[0.000] [0 .001] [0 .001] [0 .001] [0 .001]
Both −0.016 −0.019 −0.020 −0.012 −0.010 −0.007 −0.009 −0.012
(0.012) (0 .010) (0 .011) (0 .012) (0 .010) (0 .007) (0 .010) (0 .010)
[0.000] [0 .000] [0 .001] [0 .001] [0 .001]
Number of controls 86 79
Sample size 9,116 8,664
B. Bias
Educ. subsity 0.005 −0.002 0 .005 0 .001 0 .008 0 .003
(0.008) (0 .012) (0 .008) (0 .011) (0 .007) (0 .011)
HIV education −0.006 0 .001 −0.005 −0.003 −0.006 0 .000
(0.007) (0 .011) (0 .008) (0 .010) (0 .007) (0 .011)
Both 0.003 0 .004 −0.002 −0.005 −0.003 0 .000
(0.008) (0 .013) (0 .008) (0 .011) (0 .008) (0 .012)
Notes: This table reports estimates from the Duflo et al. (2015) application, as described in Appendix C.3. The regression specification comes from
column 1 of Table 2, panel A in Duflo et al. (2015). Standard errors clustered by school reported in parentheses. Standard errors assuming known
propensity scores are reported in square brackets.
Table C.6: Full results: Duflo et al. (2015)
63


<!-- page 65 -->

Full sample Overlap
A. Estimates ˆβ Own ATE EW CW ˆβ Own ATE EW CW
Black −0.213 −0.182 −0.193 −0.202 −0.191 −0.150 −0.231 −0.171 −0.195
(0.032) (0 .035) (0 .034) (0 .065) (0 .037) (0 .041) (0 .038) (0 .040) (0 .059)
[0.031] [0 .045] [0 .037] [0 .035] [0 .043]
Hispanic −0.249 −0.257 −0.171 −0.209 −0.212 −0.196 −0.220 −0.171
(0.028) (0 .030) (0 .046) (0 .032) (0 .035) (0 .033) (0 .034) (0 .045)
[0.028] [0 .039] [0 .033] [0 .031] [0 .039]
Asian −0.294 −0.324 −0.330 −0.275 −0.276 −0.150 −0.283 −0.317
(0.035) (0 .038) (0 .085) (0 .039) (0 .043) (0 .058) (0 .043) (0 .082)
[0.033] [0 .057] [0 .056] [0 .036] [0 .055]
Other −0.132 −0.116 −0.127 −0.127 −0.104 −0.084 −0.105 −0.105
(0.038) (0 .039) (0 .046) (0 .043) (0 .045) (0 .035) (0 .044) (0 .047)
[0.029] [0 .035] [0 .034] [0 .031] [0 .035]
Number of controls 176 127
Sample size 8,806 6,623
B. Bias
Black −0.031 −0.020 −0.011 −0.042 0 .040 −0.020 0 .004
(0.016) (0 .013) (0 .056) (0 .017) (0 .028) (0 .014) (0 .048)
Hispanic 0.008 −0.077 0 .003 −0.013 0 .011 −0.038
(0.009) (0 .038) (0 .013) (0 .021) (0 .011) (0 .035)
Asian 0.030 0 .036 0 .001 −0.124 0 .009 0 .043
(0.018) (0 .074) (0 .018) (0 .057) (0 .016) (0 .068)
Other −0.015 −0.005 −0.023 −0.043 −0.023 −0.022
(0.013) (0 .048) (0 .015) (0 .038) (0 .014) (0 .049)
Notes: This table reports estimates from the Fryer and Levitt (2013) application, as described in Appendix C.3. The regression
specification comes from column 4 of Table 3 in Fryer and Levitt (2013). Robust standard errors are reported in parentheses.
Standard errors assuming known propensity scores are reported in square brackets.
Table C.7: Full results: Fryer and Levitt (2013)
64


<!-- page 66 -->

Full sample Overlap
A. Estimates ˆβ Own ATE EW CW ˆβ Own ATE EW CW
Black −4.059 −3.907 −3.786 −4.441 −3.969 8 .071 −3.199 −3.266
(1.107) (1 .210) (1 .597) (1 .149) (1 .059) (11 .922) (1 .039) (1 .403)
[0.393] [0 .747] [3 .991] [0 .537] [0 .628]
Hispanic −1.119 −0.837 1 .290 −0.658 −0.908 2 .927 −0.879 −1.099
(0.731) (0 .698) (3 .949) (1 .603) (1 .461) (3 .403) (1 .446) (2 .460)
[0.142] [0 .637] [2 .150] [0 .305] [0 .620]
Asian −2.536 −2.117 −4.375 −3.383 −3.110 −8.439 −3.633 −3.685
(0.978) (1 .206) (2 .896) (1 .440) (1 .114) (3 .606) (0 .930) (1 .824)
[0.314] [0 .384] [1 .685] [0 .351] [0 .638]
Number of controls 268 35
Sample size 4,037 620
B. Bias
Black −0.152 −0.274 −0.472 −12.513 −1.243 −1.175
(0.406) (1 .902) (1 .117) (12 .089) (1 .277) (1 .210)
Hispanic −0.282 −2.409 0 .250 −3.584 0 .222 0 .442
(0.212) (3 .813) (0 .446) (3 .269) (0 .344) (1 .154)
Asian −0.418 1 .839 −0.273 5 .056 0 .249 0 .302
(0.632) (2 .804) (0 .713) (3 .259) (0 .842) (1 .445)
Notes: This table reports estimates from the Rim et al. (2020) application, as described in Appendix C.3. The regression specification comes
from column 3 of Table 2 in Rim et al. (2020). Standard errors clustered by cohort are reported in parentheses. Standard errors assuming known
propensity scores are reported in square brackets.
Table C.8: Full results: Rim et al. (2020)
65


<!-- page 67 -->

Full sample
A. Estimates ˆβ Own ATE EW CW
Black 0.172 −0.037 0 .342 0 .109 0 .246
(0.274) (0 .305) (0 .396) (0 .267) (0 .292)
[0.323] [0 .152] [0 .178]
Hispanic 0.043 −0.754 −0.330 −0.496 −0.466
(0.394) (0 .404) (0 .395) (0 .341) (0 .289)
[0.312] [0 .221] [0 .169]
Other 1.130 1 .130 0 .223 1 .244 0 .106
(0.652) (0 .654) (0 .622) (0 .679) (0 .712)
[0.394] [0 .347] [0 .566]
Number of controls 256
Sample size 7,488
B. Bias
Black 0.209 −0.169 0 .063 −0.074
(0.218) (0 .337) (0 .190) (0 .264)
Hispanic 0.797 0 .373 0 .539 0 .508
(0.356) (0 .390) (0 .310) (0 .330)
Other 0.001 0 .907 −0.113 1 .025
(0.125) (0 .340) (0 .120) (0 .578)
Notes: This table reports all results from the Weisburst (2019) application, as described in
Appendix C.3. The regression specification comes from Table 2, panel A in Weisburst (2019).
Standard errors clustered by police beat are reported in parentheses. Standard errors that
assume the propensity scores are known are reported in square brackets.
Table C.9: Full results: Weisburst (2019)
66


<!-- page 68 -->

Appendix D Additional Figures
Figure D.1: Regression of Small Classroom Treatment on Class Aide Treatment
Note: This figure plots values of the demeaned class aide treatment (˜X2i, the x-axis) against values of the
demeaned small classroom treatment (˜X1i, the y-axis) in our numerical example from Section 2.3. The size
of the points corresponds to the density of observations. The solid red and blue lines mark the within-school
regression of the two residualized treatments, while the dashed black line is the overall regression line. The
residuals from this line give
≈
Xi1.
67


<!-- page 69 -->

Correlation:0.10 Correlation:−0.13
A: Small class treatment B: Aide treatment
-40 -20 0 20 40 -40 -20 0 20 40
-0.2
-0.1
0.0
0.1
0.2
0.3
Aide treatment effect Small class treatment effect
Contamination weight
Figure D.2: Project STAR contamination weights.
Notes: This figure shows correlations between estimated school-specific treatment effects and contamination
weights. Panel A depicts the correlation between the estimated teaching aide treatment effects by school
against the estimated contamination weight for the small class estimate. Panel B gives the correlation between
the estimated small class treatment effects by school against the estimated contamination weight for the
teaching aide estimate. Correlations are reported on each panel. The size of the points is proportional to the
number of students enrolled in each school.
68


<!-- page 70 -->

Correlation:−0.19
Correlation:−0.17
Correlation:0.03
Correlation:0.24
Correlation:0.17
Correlation:−0.11
A: Small class treatment B: Aide treatment
Own regression weightEWCW
-40 -20 0 20 40 -40 -20 0 20 40
0.8
1.0
1.2
0.8
1.0
1.2
0.8
1.0
1.2
Treatment effect
Treatment weight
Figure D.3: Project STAR treatment weights
Notes: This figure shows correlations between estimated school-specific treatment effects and the weights used
by different estimators. Panel A gives the correlations for the small class treatment, and Panel B gives them
for the teaching aide treatment. The first row plots the own treatment weights from the contamination bias
decomposition in eq. (23). The second row gives plots the EW scheme from Corollary 1, and the third row
gives the CW scheme from Corollary 2. Correlations are reported on each panel. The size of the points is
proportional to the number of students enrolled in each school.
69
