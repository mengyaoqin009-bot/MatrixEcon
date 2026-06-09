## Source Page 19

explained, the outcome of the simulation is difficult to predict because, while industry-size
benchmarking mechanically decreases variation within compensation peer groups, it could
also result in more variation across such groups.
Figure 4 plots the simulated pay dispersion across all firms over the sample period along-
side actual pay dispersion. Similar to Figure 1, simulated pay dispersion declines significantly
from the start to the end of the period. The magnitude of the decrease is similar in both
data series (45 percent in the simulated data versus 38 percent in the actual data). The
simulation hence suggests that an increase in industry-size benchmarking has the potential
to explain the observed decline in pay dispersion since 2007.
4.2. Graphical analysis
We next explore whether industry-size benchmarking leads to a decrease in pay dispersion
in our sample. To do so, we examine whether industry-size benchmarking has increased over
time, in parallel to the decline in pay dispersion documented in the previous section. Figure
5A plots five measures of the extent to which a firm’s compensation peers are selected based
on industry and size: (i) the standard deviation of peers’ relative book value of assets, (ii)
the standard deviation of peers’ relative market value of assets, (iii) the number of GICS6
industries from which a firm draws compensation peers, (iv) the fraction of compensation
peers that are significantly different in size (i.e., a peer is much larger (>200%) or much
smaller (<50%) than the focal firm in terms of book value of assets and market value of as-
sets), and (v) the fraction of compensation peers from a different GICS1-industry and with a
significantly different size (defined as before). For clarity, we rescale the data relative to the
start of the sample period. As shown in Figure 5A, we find a decline in all five metrics over
time, supporting the notion that firms increasingly include compensation peers of similar
industry and size.
Table IA.2 confirms that compensation peer groups have not increased in size over time;
hence, less similar peers are replaced with firms more similar in industry and size. Further-
to escalating pay (also known as the “pay ratcheting effect” in the literature; see e.g., Elson and Ferrere,
2013) but does not matter for pay dispersion that we are concerned with in this study.
17

<!-- page:20 -->

## Source Page 20

more, since firms typically experience greater shareholder scrutiny when benchmarking their
CEO pay against that of larger firms, we also examine the relative size of replaced peers.
Figure IA.8 in the internet appendix shows that the decline in size dispersion is entirely due
to the replacement of larger peers, which suggests a deliberate choice by boards, potentially
due to heightened shareholder scrutiny.
We next explore whether, along with the increase in industry-size benchmarking, there is
a parallel increase in the formation of clusters of firms that benchmark pay against one an-
other. Such a finding would support the idea that an increase in industry-size benchmarking
decreases pay dispersion via reciprocal benchmarking (see section 2.1).
Figure 5B plots the values of several network measures based on compensation peer data
over the sample period. Based on the literature on networks (Newman, 2010, Ch. 7), we
construct three such measures at the firm-year level.18 Reciprocity is the fraction of existing
network linkages that are bilateral (i.e., point in both directions). Transitivity is the num-
ber of triangles divided by the number of triads that exist in a graph (triads are groups of
three nodes that are connected in some way while triangles are triads that are completely
connected). Cluster coefficient is the number of triangles divided by the number of possible
triads (intuitively, it measures how close a network is to a complete graph). To address po-
tential limitations of the network measures, we also include Fraction of reciprocal references,
defined as the fraction of a firm’s compensation peers that reference back the focal firm.19
As in previous analyses, we rescale the data relative to the start of the sample period. The
results, shown in Figure 5B, suggest that compensation peer groups have become signifi-
cantly more clustered over time. This supports the notion that industry-size benchmarking
induces less pay dispersion through an increase in reciprocal benchmarking.20
18As the goal is to measure how inter-connected a group of firms is, each measure is computed for a firm’s
network of its compensation peers that includes not only the base firm’s peer connections but also the
connections among the peers (established via their respective peer groups).
19On average, firms select 18 compensation peers while industry-size groups are typically larger than 18.
Hence, all potential linkages among a firm’s peers cannot be realized. This creates practical upper limits
for some of the clustering measures.
20In Figure IA.9 in the internet appendix, we repeat the analysis in Figure 5B for alternative aggregation
levels: the economy-level and several industry levels (GICS2, GICS4, GICS6). That is, for each year, we
create a network of all firms in the economy (all firms in a given industry) along with all their peer group
18

<!-- page:21 -->

## Source Page 21

4.3. Regression analysis
In parallel to our previous tests, we next conduct a regression analysis of the time variation
of the industry-size similarity measures in Figure 5A and the network measures in Figure
5B. The analysis is conducted at the firm-year level. As before, we include controls for the
focal firm, industry-size, and firm fixed effects.
We include four metrics of the conformity of the peer group with industry-size bench-
marking. Dispersion in relative book values and Dispersion in relative market values are the
standard deviations of peers’ relative book value of assets (BVA) or market value of assets
(MVA). Deviation from industry-size benchmarking refers to the fraction of peers with a
different GICS1 code or that are much larger (>200%) or much smaller (<50%) than the
focal firm (in terms of BVA or MVA). ISS conformity refers to the fraction of a firm’s com-
pensation peers that are included in the list of the firm-specific synthetic compensation peers
generated by ISS’s peer selection methodology, which is based on size and industry affiliation
(see Appendix B for details).21
The results are presented in Table 3. Table 3A analyzes the conformity of peer groups to
industry-size benchmarking. The results in models 1 to 4 corroborate that there is a signif-
icant decrease in the dispersion of firm size within compensation peer groups.22 The results
in models 5 and 6 show a significant decrease in the fraction of peers that clearly deviate
from industry-size benchmarking. Consistently, models 7 and 8 show that the likelihood of
including peers that conform with ISS’s peer selection methodology increases significantly
over time. Table 3B analyzes network clustering measures. In parallel to Figure 5B, the
results reveal a statistically significant trend in all four metrics.
references among them and then compute the clustering measures. Figure IA.9 shows an increase in the
clustering of compensation networks at all aggregation levels, supporting the emergence of increasingly
closed pay benchmarking clusters among public firms.
21We construct synthetic peer groups because we do not have data on ISS’s peer groups. While this
approach introduces some measurement error, it has the advantage of approximating the focal firm’s
expectation about the composition of ISS’s recommended peer group, which conceivably is what drives
its compensation peer group choices (ISS voting recommendations containing the peer groups are released
only after firms decide on executive pay contracts).
22Since industry-size groups are reconstituted each year, the firm fixed effects do not absorb the industry-size
fixed effects.
19

<!-- page:22 -->

## Source Page 22

Finally, we test whether there is a statistical association between pay dispersion and the
tendency to select compensation peers based on industry-size benchmarking. That is, we
test whether the trends documented in section 3 and in this section go hand in hand not
only in the time-series, but also in the cross-section (i.e., after including industry x year
fixed effects) and at more granular levels. For this purpose, the analysis is conducted at the
firm level and the specification includes firm controls, industry-year fixed effects, and firm
fixed effects. As shown in Table 4, pay dispersion is significantly and positively associated
with dispersion in size as well as with deviations from industry-size benchmarking. The
results also show a statistically strong significant negative association of pay dispersion with
the fraction of peers that meet proxy advisors’ selection criteria and with the fraction of
reciprocal peers that include the focal firm in their own compensation peer groups.23
5 . Institutional developments driving peer group selection
We next examine the potential drivers of the rise in industry-size benchmarking. As previ-
ously explained, we consider the following institutional developments: (i) the SEC’s mandate
to disclose compensation peer groups, (ii) the growing influence of proxy advisers, and (iii)
the introduction of “say on pay”.
5.1. The 2006 SEC rule on compensation disclosure
We first focus on the 2006 SEC rule mandating public disclosure of compensation peers.
We start by testing whether the decline in pay dispersion documented in section 3 occurs
after the implementation of the rule in 2007, not before. Table 5A presents results of the
analysis at the industry-size level. As shown in models 1-2, we find no significant evidence of
23We note the potential for interesting heterogeneity in this effect based on the number of firms in an
industry: When an industry has many firms, firms that only match on industry have many potential
peers to pick from. Hence, initially, there is a lower likelihood for reciprocal benchmarking and therefore
greater pay dispersion. However, with industry-size benchmarking, firms are required to select peers
that are also similar in size. This then shrinks the number of permissible peers within the industry and
results in larger increases in reciprocal benchmarking and hence bigger declines in pay dispersion in such
industries. We investigate this idea in Table IA.3 in the internet appendix. We indeed find that industries
and industry-size groups with a larger number of firms have initially higher levels of CEO pay dispersion.
However, as industry-size benchmarking becomes more prominent over the years, pay dispersion then
drops faster in these industries / industry-size groups.
20

<!-- page:23 -->

## Source Page 23

a decline in pay dispersion in the pre-disclosure period (i.e., 2003-2006). In contrast, in the
post-disclosure period (i.e., 2007-2010), we find significant annual decreases in pay dispersion
(models 3-4). Tests based on pooling data from both subsamples reveal that the differences
between the 2003-2006 and 2007-2010 subperiods are statistically significant (models 5-6).
This is consistent with the univariate trends around 2007 shown in Figure 1B.
As an alternative way of analyzing the effect of the 2006 SEC disclosure rule, we test
whether the post-2007 patterns documented in the previous sections are concentrated among
firms with a higher degree of deviation from industry-size benchmarking.24 We measure such
degree of deviation using the first disclosures on compensation peers published in 2007. As
explained by Faulkender and Yang (2013, 809), the regulatory process of the 2006 SEC rule
was relatively quick, leaving no time to modify compensation peer groups in anticipation
of the rule. As such, the 2007 disclosures likely reflect ex-ante (i.e., absent the disclosure
requirement) choices of compensation peers.25
Table 5B presents the results of the firm-level analysis. The dependent variables are as
in Table 3A, namely size dispersion, deviation from industry-size benchmarking, and con-
formity with ISS’s synthetic peer group. On the right-hand side, Low initial conformity is
an indicator variable for firms with below-median conformity with the industry-size peer
benchmark in 2007 (where lower conformity is defined as having fewer peers from the same
GICS2 industry and from within 50-200% of a firm’s market value of assets).The results in
Table 5B suggest that the patterns documented in the previous sections for the period im-
mediately after the introduction of the SEC rule – the decline in pay dispersion, the decline
in deviations from industry-size benchmarking, and the increase in conformity with ISS –
are concentrated among firms with lower initial conformity with the industry-size criterion
in the selection of their compensation peers. In combination with earlier results in section
3 – i.e., on the timing of the decline in the univariate (Figure 1); the timing of the changes
24A direct comparison of compensation peer groups before versus after the introduction of the rule is not
possible because there is no available data on compensation peers prior to the SEC’s disclosure mandate.
25Some firms did not disclose compensation peers in 2007 despite the mandate (see White, 2007, 2008)
and are therefore excluded from our tests. If firms without disclosures had less compliant peer groups in
2007 (and this is why they chose to not yet report peer groups in 2007), then the coefficients in Table 5B
should be interpreted as a lower bound on the true effect.
21

<!-- page:24 -->