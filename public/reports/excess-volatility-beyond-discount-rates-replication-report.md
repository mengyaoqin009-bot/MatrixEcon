# 《Excess Volatility: Beyond Discount Rates》复现报告

> Stefano Giglio and Bryan Kelly. 2018. *Excess Volatility: Beyond Discount Rates*. *The Quarterly Journal of Economics*, 133(1), 71-127. DOI: `10.1093/qje/qjx034`.

## 1. 当前结论

本轮已完成材料盘点、复制包下载、MATLAB 源码结构审计、作者图表映射整理，以及作者预生成结果的本机加载与汇总验证。当前复现状态应表述为：**结构审计完成 + 作者预生成结果已核对**。

不能写成“真实数据完整复现”。原因有三点：第一，作者在多个脚本中明确标注 `OMITS RESULTS BASED ON PROPRIETARY VARIANCE SWAP DATA`，复制包剔除了专有方差互换数据；第二，`Run_Kalman.m` 使用作者本机 `~/Dropbox/...` 绝对路径，直接重跑前需要改为相对路径；第三，包内包含 Mac 专用 `durlevML.mexmaci64`，Windows 下完整重估长记忆或最大似然相关模块时可能需要重新编译 MEX。

## 2. 材料状态

| 材料 | 状态 | 位置或说明 |
|---|---:|---|
| 论文 PDF | 已归档 | `inputs/paper/excess-volatility-beyond-discount-rates/Giglio和Kelly - 2018 - Excess Volatility Beyond Discount Rates.pdf` |
| 站内 PDF | 已接入 | `public/resources/giglio-kelly-2018-excess-volatility-beyond-discount-rates.pdf` |
| 论文文本提取 | 已完成 | `translations/excess-volatility-beyond-discount-rates-zh-CN/source.md`，共 58 页 |
| Dataverse 复制包 | 已下载 | `public/replication-assets/excess-volatility-beyond-discount-rates/QJEReplication.zip` |
| 解压后源码 | 已盘点 | `public/replication-assets/excess-volatility-beyond-discount-rates/QJEReplication/QJEReplication/` |
| Dataverse 文件清单 | 已保存 | `reports/excess-volatility-beyond-discount-rates/dataverse-files.json` |
| 源码文件清单 | 已保存 | `reports/excess-volatility-beyond-discount-rates/file-list.txt` |

Dataverse 记录显示复制包只有一个文件：`QJEReplication.zip`，文件 ID 为 `3044329`，大小约 38.2 MB。

## 3. 复制包结构

| 类型 | 数量 | 说明 |
|---|---:|---|
| MATLAB 脚本 `.m` | 67 | 主入口、回归、Kalman、模拟、交易策略、作图和工具函数 |
| MATLAB 数据 `.mat` | 22 | 原始整合数据、Kalman 结果、回归结果和辅助数据 |
| 预生成 PDF 图 | 13 | 作者已生成的 Figure 输出 |
| 文本文件 `.txt` | 5 | readme、Fama-French 因子等 |
| Java / jar | 4 | `MatlabExcelMac` 相关 Excel 输出辅助 |
| C / MEX | 2 | `durlevML.c` 与 Mac 专用 `durlevML.mexmaci64` |

核心数据文件为 `Data/alldata.mat`。本机 MATLAB R2024b 可以读取该文件，变量结构为 `data`，大小约 20.0 MB。作者预生成回归结果 `Regression Results/results_regression_2.mat` 可以读取，变量为 `results`；Kalman 结果 `Kalman Results/kalmanresults.mat` 可以读取，变量为 `kalman`。

`results_regression_2.mat` 包含 13 个非专有资产类别字段：

| 字段 | 资产类别 |
|---|---|
| `iv_interp_apple` | Apple 股票期权隐含方差曲线 |
| `iv_interp_citi` | Citi 股票期权隐含方差曲线 |
| `iv_interp_stoxx` | Euro Stoxx 相关期权曲线 |
| `iv_interp_dax` | DAX 相关期权曲线 |
| `iv_interp_euro` | 欧元汇率期权曲线 |
| `iv_interp_yen` | 日元汇率期权曲线 |
| `usyc` | 美国国债收益率曲线 |
| `inflswap_us` | 美国通胀互换 |
| `inflswap_eu` | 欧元区通胀互换 |
| `cds_BRAZIL` | 巴西主权 CDS |
| `cds_RUSSIA` | 俄罗斯主权 CDS |
| `cds_GE` | GE 公司 CDS |
| `cds_BOFA` | Bank of America 公司 CDS |

## 4. 论文核心检验

论文检验的是同一现金流在不同期限上的价格是否满足仿射 \(Q\) 测度模型给出的跨期限内部一致性。若短端期限结构已经刻画了状态变量，长端价格的可解释方差不应系统性超过仿射模型隐含值。

一因子直觉为：

$$
x_t=\rho^Q x_{t-1}+\varepsilon_t^Q,
$$

$$
f_{t,n}=E_t^Q[x_{t+n}].
$$

在该结构下，不同期限的载荷必须呈几何递推。论文据此构造方差比统计量：

$$
VR_j=\frac{V_j^U}{V_j^R}.
$$

其中 \(V_j^U\) 是不受仿射限制的长端价格解释方差，\(V_j^R\) 是由短端价格和仿射限制推出的受限解释方差。若 \(VR_j>1\)，说明长端资产价格波动超过标准仿射 \(Q\) 模型能够由贴现率变化解释的范围。

## 5. 运行入口与依赖

| 文件 | 职责 | 关键依赖或注意事项 |
|---|---|---|
| `Run_Regression.m` | 主回归方差比检验；`nfbase=2` 对应 Figure 1 / Table 2，`nfbase=3` 对应 Figure 4 | 当前文件默认 `nfbase=3`；脚本剔除专有 `vs_short` 数据 |
| `Run_Regression_Futures.m` | 商品期货曲线回归检验 | 生成 `results_futures_regression_2.mat` 或 `results_futures_regression_3.mat` |
| `Run_Kalman.m` | 用 Kalman / MLE 估计含测量误差的状态空间版本 | 写死 `~/Dropbox/...` 作者本机路径，Windows 直接运行需改相对路径 |
| `Summarize_Results.m` | 汇总回归与 Kalman 预生成结果，生成论文 Table 2 相关矩阵 | 本机 MATLAB R2024b 已跑通；出现近奇异矩阵警告 |
| `figure2.m` | 生成载荷比较图 | 输出 `Figures/loadings1.pdf`、`Figures/loadings2.pdf` |
| `figure3.m` | 滚动持久性参数下的方差比 | 输出 `Figures/roll_vs_short_1.pdf`、`Figures/roll_vs_short_2.pdf` |
| `figure5_table3.m` | ARFIMA 长记忆模拟 | 关联 Figure 5 和 Table 3 |
| `figure6_table4.m` | STAR 非线性模拟 | 关联 Figure 6 和 Table 4 |
| `figure7.m` | IV 调整测量误差检验 | 输出 `Figures/meas2.pdf` |
| `figure9.m` | 自然预期模型校准 | 输出 `Figures/ne.pdf`、`Figures/calib.pdf` |
| `run_trade_vs.m`、`tables_figures_trade.m`、`run_trade_sims_table6.m` | 交易策略、交易表格和模拟 | readme 写作 `run_trade`，包内实际入口是 `run_trade_vs.m` |

## 6. 作者 readme 的图表映射

| 论文图表 | 作者指定代码 | 当前核对状态 |
|---|---|---|
| Table I | 无代码，来自引用资料整理 | 不能由复制包直接生成 |
| Figure I / Table II | `Run_Regression.m` 设置 `nf=2`，`Run_Regression_Futures.m` 设置 `nf=2`，`Run_Kalman.m`，`Summarize_Results.m` | 预生成结果可加载；完整重跑需修路径与专有数据缺口 |
| Figure II | `figure2.m` | 代码存在，输出文件存在 |
| Figure III | `figure3.m` | 代码存在，输出文件存在 |
| Figure IV | `Run_Regression.m` 设置 `nf=3` | 代码存在；当前脚本默认 `nfbase=3` |
| Figure V / Table III | `figure5_table3.m` | 代码存在 |
| Figure VI / Table IV | `figure6_table4.m` | 代码存在 |
| Figure VII | `figure7.m` | 代码存在，输出 `meas2.pdf` 存在 |
| Table V | 描述性统计，无代码 | 不能由复制包直接生成 |
| Table VI / Table VII / Figure VIII | `run_trade_vs.m`、`tables_figures_trade.m`、`run_trade_sims_table6.m` | 代码存在；交易数据目录需运行后生成 |
| Figure IX | `figure9.m` | 代码存在，输出 `ne.pdf`、`calib.pdf` 存在 |

## 7. 主要预生成图形资源

| 文件 | 对应内容 |
|---|---|
| `Figures/fig_vs_short_2.pdf` | 方差互换基准方差比图，二因子版本 |
| `Figures/fig_vs_short_3.pdf` | 方差互换三因子版本 |
| `Figures/loadings1.pdf`、`Figures/loadings2.pdf` | 模型限制与非限制载荷比较 |
| `Figures/roll_vs_short_1.pdf`、`Figures/roll_vs_short_2.pdf` | 滚动持久性参数检验 |
| `Figures/meas2.pdf` | 测量误差 IV 调整图 |
| `Figures/return.pdf`、`Figures/rolling_Sharpe.pdf`、`Figures/return_histogram.pdf` | 交易策略表现 |
| `Figures/direction_trade_longmaturity.pdf` | 长端交易方向 |
| `Figures/ne.pdf`、`Figures/calib.pdf` | 自然预期机制与校准 |

## 8. 本机验证记录

| 验证项 | 结果 | 解释 |
|---|---:|---|
| MATLAB 可用性 | 通过 | 本机检测到 MATLAB R2024b，版本 `24.2.0.2712019` |
| `Data/alldata.mat` 可读取 | 通过 | `whos -file` 显示变量 `data` |
| `results_regression_2.mat` 可读取 | 通过 | `whos -file` 显示变量 `results` |
| `kalmanresults.mat` 可读取 | 通过 | `whos -file` 显示变量 `kalman` |
| 回归结果字段 | 通过 | 共 13 个非专有资产字段 |
| `Summarize_Results.m` | 通过 | 输出 `TABLE` 为 45×11，`TABLEERR` 为 15×6 |
| Kalman 平滑警告 | 存在 | `cds_BRAZIL` 与 `cds_RUSSIA` 处出现近奇异矩阵警告，但脚本未中断 |
| 完整真实重估 | 未完成 | 需处理路径、Windows MEX、专有方差互换数据缺失 |

## 9. 复现可信度分层

| 层级 | 当前状态 | 证据 |
|---|---:|---|
| 论文材料盘点 | 已完成 | PDF、文本、复制包、文件清单均已归档 |
| 代码结构审计 | 已完成 | 67 个 MATLAB 文件、入口脚本和图表映射已整理 |
| 作者预生成结果核对 | 已完成 | MATLAB R2024b 可加载并运行汇总脚本 |
| 伪数据运行 | 未执行 | 本轮目标不是构造伪数据链路 |
| 真实数据部分重跑 | 未完成 | 可作为下一阶段在临时副本中执行 |
| 真实数据完整复现 | 不可直接完成 | 专有方差互换数据未随复制包公开 |

## 10. 后续完整重跑方案

1. 在临时目录复制 `QJEReplication`，避免覆盖作者原始输出。
2. 将 `Run_Kalman.m` 的 `usedir` 改为当前复制包的相对路径。
3. 对 Figure I / Table II，将 `Run_Regression.m` 中 `nfbase` 设为 2，并运行 `Run_Regression.m`、`Run_Regression_Futures.m`、`Run_Kalman.m`、`Summarize_Results.m`。
4. 对 Figure IV，将 `Run_Regression.m` 中 `nfbase` 设为 3，并保存三因子版本结果。
5. 若 `durlevML.mexmaci64` 在 Windows 下被调用，使用 MATLAB `mex utility/durlevML.c` 重新编译为 `.mexw64`。
6. 对 ARFIMA、STAR、测量误差、自然预期和交易策略分别运行对应脚本，并将新生成 PDF 与作者预生成 PDF 做文件存在性、图形尺寸和关键数值核对。
7. 对专有方差互换数据缺失导致无法重跑的 Figure / Table，在报告中保留为“作者预生成结果核对”，不得升级为“真实数据完整复现”。

## 11. 复现报告结论

这篇论文的复制包质量较高：作者提供了原始整合数据、预生成回归与 Kalman 结果、主图 PDF、主要脚本和 readme 图表映射。本机已确认 MATLAB 能读取数据与结果，并且 `Summarize_Results.m` 可以跑通。

当前最大限制不是代码缺失，而是**专有方差互换数据缺失、作者本机路径硬编码、以及 Mac MEX 与 Windows 环境不兼容风险**。因此，MatrixEcon 页面应将复现状态标为“作者预生成结果已核对 / 结构审计完成”，而不是“复现成功”。
