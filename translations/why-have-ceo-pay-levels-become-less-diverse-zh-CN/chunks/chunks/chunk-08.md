## Source Page 40

Appendix A: Variable appendix (cont’d)
Variable Definition Source
II. Compensation peer / peer group variables
Dispersion in relative Standard deviation of the relative book values in a focal firm’s compensation Compustat
book values peer group. Relative book value is the ratio of a peer’s total book value of
assets to the total book value of assets of the focal firm. The measure is
winsorized at the 1st and 99th percentiles.
Dispersion in relative Standard deviation of the relative market values in a focal firm’s compensation Compustat
market values peer group. Relative market value is the ratio of peer’s market value of assets
(defined as total book value of assets minus book value of equity plus market
value of equity at fiscal year end) to the market value of assets of the focal
firm. The measure is winsorized at the 1st and 99th percentiles.
Deviation from Fraction of compensation peers that are from outside the GICS1 industry or Compustat
industry-size that are much larger (>200%) or much smaller (<50%) than the focal firm in
benchmarking book or market value of assets. The measure is winsorized at the 1st and 99th
percentiles.
ISS conformity Fraction of firm’s actual compensation peers that are included in a synthetic AuditAnalytics; ISS
compensation peer group for the firm based on ISS’s peer selection method- IncentiveLab;
ology (see Appendix B for details). The measure is winsorized at the 1st and Equilar; Compustat,
99th percentiles. CRSP
Fraction of reciprocal Fraction of compensation peers that reference back the focal firm, winsorized AuditAnalytics; ISS
peers at the 1st and 99th percentiles. IncentiveLab; Equilar
Peer group reciprocity The fraction of the existing network linkages that are bilateral (i.e., point in AuditAnalytics; ISS
both directions). At the firm-level, the network for a given firm is created IncentiveLab; Equilar
by first adding the focal firm and all its compensation peers as nodes, and
then by adding all the references between the focal firm and all its peers and
the refences among the peers as defined in their respective compensation peer
groups. The measure is winsorized at the 1st and 99th percentiles.
Peer group Thenumberoftrianglesdividedbythenumberoftriadsthatexistinanetwork. AuditAnalytics; ISS
transitivity Triads are groups of three nodes that are connected in some way; triangles are IncentiveLab; Equilar
triads that are completely connected. A higher number indicates a greater
connectivity among the members of the network. The measure is winsorized
at the 1st and 99th percentiles.
Peer group cluster The number of triangles divided by the number of possible triads. A higher AuditAnalytics; ISS
coefficient number indicates a more complete graph. The measure is winsorized at the IncentiveLab; Equilar
1st and 99th percentiles.
Low initial An indicator variable that is one for firms with below-median conformity Compustat;
conformity with the industry-size peer benchmark in 2007, else 0. Conformity with the CRSP;
industry-size benchmark is measured as the fraction of compensation peers AuditAnalytics;
that are from the same GICS2 industry and that are within 50-200% of a ISS
firm’s relative market value of assets. IncentiveLab;
Equilar
ISS rank Rank that ISS assigns to all potential same-GICS2 industry peers based on its Compustat; CRSP
peer selection methodology (see Appendix B for details).
Included in peer group Indicator variable that is one if a firm is part of the actual compensation peer Compustat;
group of a given firm. AuditAnlystics; ISS
IncentiveLab; Equilar
Relative market value Market value of assets of peer scaled by focal firm’s market value of assets, Compustat
winsorized at the 1st and 99th percentiles.
Relative Tobin’s Q Tobin’s Q of peer scaled by focal firm’s Tobin’s Q, winsorized at the 1st and Compustat
99th percentiles.
Relative sales Total sales of peer scaled by focal firm’s total sales, winsorized at the 1st and Compustat
99th percentiles.
38

<!-- page:41 -->

## Source Page 41

Appendix A: Variable appendix (cont’d)
Variable Definition Source
Different industry Indicator variable that is one if potential peer is from a different GICS4- Compustat
industry.
At threshold Indicator variable that is equal to one for the potential peer that has the Compustat, CRSP
highest ISS rank and that is still included in ISS’s recommended peer group
for a given focal firm in a given year, else 0. (E.g., when ISS’s recommended
peer group has 24 peers, then it is coded 1 for the potential peer that is ranked
24th in ISS’s methodology, else 0.)
Above threshold Indicator variable that is equal to one for the potential peer whose ISS rank Compustat, CRSP
is just above the peer group size of ISS’s recommended peer group for a given
focal firm in a given year, else 0. (E.g., when ISS’s recommended peer group
has 24 peers, then it is coded 1 for the potential peer that is ranked 25th in
ISS’s methodology, else 0).
Dropped peer (t+1) Indicator variable that is one if a firm is a compensation peer for a given focal AuditAnlystics;
firm in year t but is no longer a compensation peer for the focal firm in year ISS
t+1. IncentiveLab;
Equilar
Added peer (t+1) Indicator variable that is one if a firm is not a compensation peer for a given AuditAnlystics;
focal firm in year t but is added as a compensation peer for the focal firm in ISS
year t+1. IncentiveLab;
Equilar
Dropped (added) by Indicatorvariablethatisoneforapotentialpeerthatwasdroppedfrom(added Compustat;
ISS at t to) ISS’s recommended peer group for a given focal firm in year t. CRSP
Just dropped below An indicator variable that is equal to one if a firm’s potential peer was just Compustat;
ISS cutoff included in its ISS recommended peer group (i.e. relative rank between -4 and CRSP
0) in year t − 1 but was just excluded from its ISS recommended peer group
in year t (i.e., relative rank between 1 and 5).
Just rose above ISS An indicator variable that is equal to one if a firm’s potential peer was just Compustat;
cutoff excluded in its ISS recommended peer group (i.e. relative rank between 1 and CRSP
5) in year t − 1 but was just included from its ISS recommended peer group
in year t (i.e., relative rank between -4 and 0).
In ISS peer group Indicator variable that is one if a potential peer was in ISS’s recommended Compustat;
peer group for a focal firm in a given year. CRSP
Peer delisted Indicator variable that is equal to one if a potential peer was delisted from the Compustat;
stock exchange in year t as a result of merger, bankruptcy or liquidation. CRSP
Change in relative Change in the relative market value of assets for a given peer between year Compustat
market value t−1 to year t. Relative market value of assets is defined as the market value
of assets of the peer scaled by the market value of assets of the focal firm. The
measure is winsorized at the 1st and 99th percentiles.
Change in relative Change in relative sales is the change in the relative sales of the peer from Compustat
sales year t − 1 to year t. Relative sales is defined as total sales of the peer scaled
by total sales of the focal firm. The measure is winsorized at the 1st and 99th
percentiles.
Weak SOP support Indicator variable that is one for firms that receive voting support in their ISS Voting
say on pay votes in the bottom decile of the SOP vote distribution (which Analytics
corresponds to 75 percent vote support).
Annual SOP vote Indicator variable that is one if a firm has an annual say on pay voting fre- ISS Voting
frequency quency and zero if a firm has a say on pay vote frequency of every three years. Analytics
Fraction shares owned The fraction of a firm’s shares that are owned by institutional investors. The Refinitiv 13F
by institutional measure is winsorized at the 5th and 95th percentiles. holdings
investors
Fraction shares owned The fraction of a firm’s shares that are owned by mutual funds that are classi- Refinitiv 13F
by quasi indexers fied as quasi-indexers per Bushee and Noe (2000); Bushee (2001). The measure holdings; Brian
is winsorized at the 5th and 95th percentiles. Bushee’s
investor
classification
39

<!-- page:42 -->

## Source Page 42

Appendix A: Variable appendix (cont’d)
Variable Definition Source
Fraction shares owned Defined as in Appel, Gormley and Keim (2016), p.116: The fraction of a firm’s Refinitiv 13F
by index mutual funds shares that are owned by mutual funds that are flagged as passively managed. holdings; CRSP
A mutual fund is flagged as passively managed if its fund name includes a mutual fund
string that identifies it as an index fund. The strings used to identify index
funds are: Index, Idx, Indx, Ind (where indicates a space), Russell, S & P, S
and P, S&P, SandP, SP, DOW, Dow, DJ, MSCI, Bloomberg, KBW, NASDAQ,
NYSE, STOXX, FTSE, Wilshire, Morningstar, 100, 400, 500, 600, 900, 1000,
1500, 2000, and5000. Themeasureiswinsorizedatthe5th and95th percentiles.
Propensity to vote The fraction of times that a firm’s mutual fund investors voted alongside ISS Refinitiv 13F
with ISS in prior years when ISS and the firm management disagreed on the vote rec- holdings; ISS
ommendation, averaged across all shareholdings, with each fund weighted by voting analytics;
the fraction of shares it owns in the firm. (Data availability starts in 2003 and ISS mutual fund
ends in 2017.) The measure is winsorized at the 5th and 95th percentiles. voting
IV. Other firm characteristics
Log total assets Natural logarithm of total book value of assets (rescaled to 2023 real USD). Compustat
Tobin’s Q Total book value of assets minus book value of equity plus the market value Compustat
of equity at the end of the fiscal year scaled by the total book value of assets,
winsorized at the 1st and 99th percentiles.
Sales growth Change in total sales from year t−1 to year t divided by total sales in fiscal Compustat
year t−1, winsorized at the 1st and 99th percentiles.
Stock return Daily stock returns compounded over a firm’s fiscal year, winsorized at the 1st CRSP
and 99th percentiles.
Idiosyncratic Annualized standard deviation of the residuals of a firm’s returns from the CRSP
volatility Fama-French 4-factor model estimated using its daily returns over its fiscal
year, winsorized at the 1st and 99th percentiles.
40

<!-- page:43 -->

## Source Page 43

Appendix B: ISS’s methodology for the selection of compensation peers
On December 20, 2011, ISS published a whitepaper that included a new approach to establish peer groups
that are used for compensation analysis and pay-for-performance screens (Gibson, 2011). The whitepaper
was republished with minor revisions on February 17, 2012 (ISS, 2012a).
In that whitepaper, ISS disclosed its new methodology for the selection of a comparison peer group that
consists of the following steps:

1. Create an initial list of potential peers from the two-digit GICS universe as the subject company that
satisfies the following two criteria:
(cid:136) potential peers are between 0.45 and 2.1 times the subject company’s annual sales (assets for
financial firms).
(cid:136) potential peers have a market capitalization of between 0.2 times and 5 times the subject com-
pany’s market capitalization.
2. Narrow down the initial list of potential peers to those companies that are in the subject company’s
six-digit GICS category and rank them from 1 to N using the absolute relative distance in sales so
that the subject company stays near the median of the selected group.
3. Take the top 24 potential peers for the subject firm’s peer group. If this peer group has fewer than 14
peers, then supplement peers by repeating step (ii) for firms in the subject firm’s four-digit GICS. If
thereafter there are still fewer than 14 peers, repeat step (ii) for firms in the subject firm’s two-digit
GICS.
In some rare cases, firms do not end up with 14 peers. An example of this are companies that much larger
than others in its industry (referred to as “super-mega non-financial companies” by ISS); in such cases,
realizing the importance of firm size on CEO pay, ISS relaxes the industry criterion so to pair these firms
with peers that are similar-sized.
Over the years, ISS has made some modifications to its selection methodology. Some of the changes added
complexity while not truly affecting the industry and size match outcomes. For example, one such change
was to tighten the initial industry selection filter from GICS6 to GICS8 (if insufficient peers are identified,
this was again relaxed to GICS6, GICS4 and GICS2 as described in step (iii) above). Another change
allowed firms from the GICS8 industry of the subject firm’s own chosen compensation peers as potential
peers with some priority given to what ISS calls “first-degree peers” (those that referenced back the subject
firm) and those with numerous connections (i.e. those often chosen as a peer).
Despite such changes, repeated disclosures by ISS describing analyses of their peer group method show that
there are little effective changes to the tightness of the industry-size restrictions. For example, in 2012, ISS
reports that for the 2013 proxy season, 90 percent of peer groups maintain the subject company within
20 percent of the peer group median size and no peer groups had 2-digit GICS peers (ISS, 2012b, 15). In
2019, ISS reports a 2017 analysis that there were still no 2-digit GICS peers and 85 percent of peer groups
maintain the subject firm within 20 percent of the peer group median size (ISS, 2019a, 3). In 2023, it
reports the same statistics as in 2019 (ISS, 2023, 4-5).
41

<!-- page:44 -->