# 《收益率曲线动量》复现报告

> Sihvonen, Markus. 2024. *Yield curve momentum*. Review of Finance 28(3), 805-829.

## 1. 当前结论

已完成文献级复现审计：材料盘点、研究问题、数据需求、变量构造、主要公式、图表结论和复现边界均已整理。用户未提供源码，因此本报告不写逐行代码解释，也不声称真实数据完整复现。

## 2. 材料状态

| 材料 | 状态 | 说明 |
|---|---:|---|
| 论文 PDF | 已归档 | `inputs/paper/yield-curve-momentum/Sihvonen - 2024 - Yield curve momentum.pdf` |
| 中文译稿 | 已接入 | `public/translations/yield-curve-momentum.md` |
| 作者源码 | 未提供 | 未发现随 PDF 一并提供的复现代码 |
| 核心数据 | 待下载 | Liu-Wu 零息收益率、FRED、宏观数据、Consensus Economics |

## 3. 可复现边界

可在取得公开收益率数据后复现：Figure 1、Figure 2、Table 2、Table 3、Figure 3、FOMC 相关的 Figure 6 和 Table 5-6。

需要额外权限或源码：宏观因子完整选择、Consensus Economics 调查预期误差、仿射期限结构模型模拟、补充附录中的 Bloomberg 指数与期货结果。

## 4. 变量构造

月度对数超额收益：

$$rx_{t+1}^n = p_{t+1}^{n-1} - p_t^n - y_t^1.$$

平均过去收益因子：

$$\bar{rx}_t=\frac{1}{10}\sum_{n\in\{12,24,\ldots,120\}}rx_t^n.$$

调查预期误差：

$$FE_t^3 = y_{t+3}^3 - E_t^{sur}[y_{t+3}^3].$$

## 5. 图表映射

| 图表 | 内容 | 复现条件 |
|---|---|---|
| Figure 1 | 不同回看期动量系数 | Liu-Wu 月度收益率 |
| Figure 2 | 正/负上月收益后的平均超额收益 | Liu-Wu 月度收益率 |
| Table 2 | 平均收益因子预测 | Liu-Wu 月度收益率 |
| Table 3 | 水平因子变化解释自协方差 | 收益率主成分 |
| Figure 3 | 控制收益率 PC 后动量仍显著 | 收益率主成分 |
| Figure 4-5 | 控制宏观变量 | 宏观数据与因子选择 |
| Figure 6 / Table 5-6 | FOMC 目标利率变化 | FRED 政策利率 |
| Figure 7-8 | 仿射期限结构模型模拟 | 需重写模型或取得源码 |
| Table 8-10 | 调查预期误差 | Consensus Economics |

## 6. 无源码处理

当前不提供逐行代码解释。后续若补充代码包，应追加数据导入、收益构造、PCA、Newey-West 标准误、宏观因子筛选、FOMC 分解和仿射模型模拟的逐行注释。
