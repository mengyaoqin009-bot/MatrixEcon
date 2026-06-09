# CEO 薪酬论文：图表—代码映射与逐行源码指南

## 使用说明

本指南基于作者复现包中的 9 个真实源码文件生成，共覆盖 8,114 行代码。网站中的“源码逐行解析”按文件和页码加载，每行展示原始代码、所属模块与中文解释。作者源码未被修改。

## 图表—代码映射总览

| 论文输出 | 研究内容 | 代码位置 | 主要输入 | 核心处理或估计 |
|---|---|---|---|---|
| Table I | 描述性统计 | analysis.do L1491-1547 | sample1.dta；sample2.dta | tabstat、nvals、winsor2 |
| Figure 1 | 总体、行业-规模、同行群体薪酬离散度 | analysis.do L12-136 | sample1.dta；sample2.dta | egen sd()；年度均值；twoway line |
| Figure 2 | 薪酬分布不同分位点的变化 | analysis.do L140-187 | figure2.dta | 年度中位数缩放；pctile；reshape long |
| Table II | CEO 薪酬离散度趋势回归 | analysis.do L1550-1657 | sample1.dta；table2a-part2.dta；sample2.dta | reghdfe；行业×规模/公司固定效应；公司层面聚类标准误 |
| Figure 3 | 国际、私营公司与非前五高管安慰剂组 | analysis.do L193-279 | figure3a.dta；figure3b.dta | 替代样本离散度趋势 |
| Figure 4 | ISS 方法模拟 | prepare-simulations.do；analysis.do L283-334 | simulation*.dta | 目标百分位数抽样；模拟与实际离散度对照 |
| Figure 5 / Table III | 同行选择与网络聚类 | analysis.do L338-521；L1661-1730 | sample2.dta；网络 CSV | 相对规模、行业偏离、互惠性、传递性、聚类系数 |
| Table IV | 薪酬离散度与同行群体构成 | analysis.do L1736-1762 | sample2.dta | 行业×年份与公司固定效应 |
| Table V | SEC 披露规则 | analysis.do L1766-1888 | sample1.dta；sample2.dta | 规则前后趋势；初始低合规度交互项 |
| Figure 6 / Table VI | ISS 排名与阈值 | analysis.do L526-594；L1892-1985 | figure6.dta；table6.dta | 相对排名阈值；公司×年份和同行×年份固定效应 |
| Table VII | ISS 与同行新增/删除 | analysis.do L1989-2115 | table7a.dta；table7b.dta | dropped_by_ISS；added_by_ISS；动态同行变化 |
| Table VIII | 被动投资 | analysis.do L2120-2150 | table8.dta | 被动持股、准指数投资者、与 ISS 同向投票 |
| Table IX | 较低 SOP 支持率 | analysis.do L2155-2176 | table9.dta | 事件时间交互项；行业×年份和公司固定效应 |
| Table X / Figure 7 | 接近临界的 SOP 频率表决 | analysis.do L600-680；L2186-2206 | table10.dta | has1yr × post；公司层面聚类标准误 |

## 源码文件

| 文件 | 语言 | 行数 | 职责 |
|---|---:|---:|---|
| `analysis.do` | Stata | 2536 | 生成正文与互联网附录中的全部图表和回归表 |
| `prepare-data.do` | Stata | 4197 | 清洗、链接并构建全部分析数据集 |
| `prepare-simulations.do` | Stata | 432 | 按照 ISS 行业与规模规则模拟 CEO 薪酬路径 |
| `prepare-iss-peergroups.do` | Stata | 167 | 按照 ISS 公开方法构建合成薪酬同行群体 |
| `issInfluence.do` | Stata | 313 | 构造机构投资者追随 ISS 建议的指标 |
| `networkAnalysis-EconomyLevel.py` | Python | 104 | 计算总体经济网络指标 |
| `networkAnalysis-IndustryLevel.py` | Python | 129 | 计算行业年度网络指标 |
| `networkAnalysis-PeergroupLevel.py` | Python | 126 | 计算公司薪酬同行群体网络指标 |
| `Stock return and volatility.sas` | SAS | 110 | 计算股票收益率、总波动率和特质波动率 |

## 核心计量处理

### 缩尾处理

`winsor2` 将尾部观测替换为指定分位点，降低极端值对薪酬、相对规模、公司特征与持股比例的影响。代码根据变量性质使用 1%/99% 或 5%/95% 阈值；`trim` 则直接删除尾部观测。

### 中位数缩放

代码在每个财年计算 CEO 薪酬中位数，并构造 `mom_*` 指标。该变换使薪酬具有跨年份可比性，薪酬离散度随后定义为缩放后薪酬的标准差。

### 异常薪酬

作者逐年估计 CEO 薪酬对规模、Tobin's Q、销售增长、股票收益和特质波动率等基本面的交叉截面回归，并吸收行业—规模固定效应。回归残差经年度中位数缩放和缩尾后形成异常薪酬。

### 固定效应与聚类

`reghdfe` 吸收行业×规模、行业×年份、公司、公司×年份及同行×年份固定效应。多数公司层面模型使用公司层面聚类标准误；潜在同行层面的平衡性检验按同行公司聚类。

### 网络指标

三个 Python 文件使用 NetworkX 计算互惠性、密度、传递性、三角形数量和聚类系数，并按总体经济、行业年度或公司同行群体层级输出 CSV。

## 解释边界

逐行说明解释代码的程序逻辑与计量目的，不等同于作者对每行代码的官方注释。商业数据库版本、历史回填、链接表和扩展命令版本仍可能影响真实数据复现结果。
