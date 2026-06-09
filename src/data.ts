export type Paper = {
  id: string
  title: string
  titleZh: string
  authors: string
  journal: string
  year: number
  field: string
  method: string
  data: string
  code: boolean
  status: '已复现' | '复现中' | '待复现'
}

export const papers: Paper[] = [
  {
    id: 'ceo-pay-dispersion',
    title: 'Why Have CEO Pay Levels Become Less Diverse?',
    titleZh: '为什么 CEO 薪酬水平变得不再多样化？',
    authors: 'Torsten Jochem, Gaizka Ormazabal, Anjana Rajamani',
    journal: 'JF',
    year: 2026,
    field: '公司金融',
    method: 'Panel FE',
    data: 'ExecuComp / Compustat',
    code: true,
    status: '复现中',
  },
  {
    id: 'factor-investing',
    title: 'A Five-Factor Asset Pricing Model',
    titleZh: '五因子资产定价模型',
    authors: 'Eugene F. Fama, Kenneth R. French',
    journal: 'JFE',
    year: 2015,
    field: '资产定价',
    method: 'Factor Models',
    data: 'CRSP / Compustat',
    code: true,
    status: '已复现',
  },
  {
    id: 'anomalies',
    title: 'Digesting Anomalies: An Investment Approach',
    titleZh: '消化异象：一种投资视角',
    authors: 'Kewei Hou, Chen Xue, Lu Zhang',
    journal: 'RFS',
    year: 2015,
    field: '资产定价',
    method: 'Factor Models',
    data: 'CRSP / Compustat',
    code: true,
    status: '已复现',
  },
  {
    id: 'monetary-risk-premia',
    title: 'Monetary Policy News and the Term Structure of Equity Risk Premia',
    titleZh: '货币政策新闻与股票风险溢价期限结构',
    authors: 'J. D. Ang, D. Bekaert',
    journal: 'JFE',
    year: 2023,
    field: '宏观金融',
    method: 'Time Series',
    data: 'CRSP / FRED',
    code: true,
    status: '待复现',
  },
  {
    id: 'climate-risk',
    title: 'Climate Risks and the Cross-Section of Stock Returns',
    titleZh: '气候风险与股票收益横截面',
    authors: 'M. Bolton, M. Kacperczyk',
    journal: 'JFE',
    year: 2023,
    field: '资产定价',
    method: 'Cross-sectional',
    data: 'CRSP / Trucost',
    code: false,
    status: '待复现',
  },
  {
    id: 'intermediary',
    title: 'Intermediary Leverage and Asset Prices',
    titleZh: '金融中介杠杆与资产价格',
    authors: 'T. Adrian, N. Boyarchenko',
    journal: 'JPE',
    year: 2022,
    field: '宏观金融',
    method: 'IV',
    data: 'Form PF / TRACE',
    code: true,
    status: '复现中',
  },
  {
    id: 'ml-asset-pricing',
    title: 'Empirical Asset Pricing via Machine Learning',
    titleZh: '机器学习实证资产定价',
    authors: 'Shihao Gu, Bryan Kelly, Dacheng Xiu',
    journal: 'RFS',
    year: 2020,
    field: '资产定价',
    method: 'Machine Learning',
    data: 'CRSP / Compustat',
    code: true,
    status: '已复现',
  },
  {
    id: 'did',
    title: 'Difference-in-Differences with Variation in Treatment Timing',
    titleZh: '处理时点异质下的双重差分',
    authors: 'Andrew Goodman-Bacon',
    journal: 'JoE',
    year: 2021,
    field: '计量经济学',
    method: 'DID',
    data: 'Panel Data',
    code: true,
    status: '已复现',
  },
]

export type Method = {
  code: string
  name: string
  zh: string
  family: string
  intuition: string
  assumption: string
  formula: string
}

export const methods: Method[] = [
  { code: 'RCT', name: 'Randomized Controlled Trial', zh: '随机对照试验', family: '随机化', intuition: '用随机分配构造可比反事实。', assumption: '处理分配独立于潜在结果。', formula: 'ATE = E[Y(1) - Y(0)]' },
  { code: 'IV', name: 'Instrumental Variables', zh: '工具变量', family: '准实验', intuition: '借助只影响处理变量的外生变化识别因果效应。', assumption: '相关性、排除性与单调性。', formula: 'β_IV = Cov(Z,Y) / Cov(Z,D)' },
  { code: 'DID', name: 'Difference-in-Differences', zh: '双重差分', family: '准实验', intuition: '比较处理组与对照组在政策前后的变化差。', assumption: '若无处理，两组结果应保持平行趋势。', formula: 'Y_it = α + β(D_i × Post_t) + γ_i + δ_t + ε_it' },
  { code: 'RDD', name: 'Regression Discontinuity', zh: '断点回归', family: '准实验', intuition: '比较阈值两侧非常相似的观测。', assumption: '潜在结果在阈值处连续且无精确操纵。', formula: 'τ = lim E[Y|X=x]₊ - lim E[Y|X=x]₋' },
  { code: 'SC', name: 'Synthetic Control', zh: '合成控制', family: '准实验', intuition: '用多个未处理单位加权构造反事实。', assumption: '处理前拟合可捕捉共同因子结构。', formula: 'Y₁tᴺ = Σⱼ wⱼYⱼt' },
  { code: 'ES', name: 'Event Study', zh: '事件研究', family: '面板与时间', intuition: '沿相对处理时间描绘动态效应。', assumption: '处理前无系统性预趋势。', formula: 'Y_it = Σₖ βₖ1[t-Tᵢ=k] + γ_i + δ_t + ε_it' },
  { code: 'FE', name: 'Panel Fixed Effects', zh: '面板固定效应', family: '面板与时间', intuition: '剔除不随时间变化的个体异质性。', assumption: '严格外生性。', formula: 'Y_it = βX_it + α_i + δ_t + ε_it' },
  { code: 'SS', name: 'Shift-share', zh: '份额偏移法', family: '面板与时间', intuition: '用预定份额和外部冲击构造暴露。', assumption: '份额或冲击满足相应外生条件。', formula: 'Z_i = Σₖ s_ik g_k' },
  { code: 'DML', name: 'Double Machine Learning', zh: '双重机器学习', family: '机器学习', intuition: '用正交矩与交叉拟合降低高维偏误。', assumption: '干扰函数可被足够准确地学习。', formula: 'E[ψ(W;θ,η)] = 0' },
  { code: 'CF', name: 'Causal Forest', zh: '因果森林', family: '机器学习', intuition: '非参数估计异质性处理效应。', assumption: '非混淆性与重叠性。', formula: 'τ(x) = E[Y(1)-Y(0)|X=x]' },
  { code: 'FM', name: 'Factor Models', zh: '因子模型', family: '资产定价', intuition: '用共同风险暴露解释资产收益。', assumption: '因子可交易或张成定价核。', formula: 'Rᵢt - Rft = αᵢ + βᵢ′F_t + εᵢt' },
]
