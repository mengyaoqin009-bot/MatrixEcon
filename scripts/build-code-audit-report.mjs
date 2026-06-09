import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const sourceRoot = process.argv[2] ?? 'D:/paper-replication-codex/tmp/replication-code-audit'
const publicRoot = process.argv[3] ?? 'D:/paper-replication-codex/public/reports/code-guide'
const reportRoot = process.argv[4] ?? 'D:/paper-replication-codex/reports/code-guide'

const files = [
  ['analysis.do', 'Stata', '生成正文与互联网附录中的全部图表和回归表'],
  ['prepare-data.do', 'Stata', '清洗、链接并构建全部分析数据集'],
  ['prepare-simulations.do', 'Stata', '按照 ISS 行业与规模规则模拟 CEO 薪酬路径'],
  ['prepare-iss-peergroups.do', 'Stata', '按照 ISS 公开方法构建合成薪酬同行群体'],
  ['issInfluence.do', 'Stata', '构造机构投资者追随 ISS 建议的指标'],
  ['networkAnalysis-EconomyLevel.py', 'Python', '计算总体经济网络指标'],
  ['networkAnalysis-IndustryLevel.py', 'Python', '计算行业年度网络指标'],
  ['networkAnalysis-PeergroupLevel.py', 'Python', '计算公司薪酬同行群体网络指标'],
  ['Stock return and volatility.sas', 'SAS', '计算股票收益率、总波动率和特质波动率'],
]

const matrix = [
  ['Table I', '描述性统计', 'analysis.do L1491-1547', 'sample1.dta；sample2.dta', 'tabstat、nvals、winsor2'],
  ['Figure 1', '总体、行业-规模、同行群体薪酬离散度', 'analysis.do L12-136', 'sample1.dta；sample2.dta', 'egen sd()；年度均值；twoway line'],
  ['Figure 2', '薪酬分布不同分位点的变化', 'analysis.do L140-187', 'figure2.dta', '年度中位数缩放；pctile；reshape long'],
  ['Table II', 'CEO 薪酬离散度趋势回归', 'analysis.do L1550-1657', 'sample1.dta；table2a-part2.dta；sample2.dta', 'reghdfe；行业×规模/公司固定效应；公司层面聚类标准误'],
  ['Figure 3', '国际、私营公司与非前五高管安慰剂组', 'analysis.do L193-279', 'figure3a.dta；figure3b.dta', '替代样本离散度趋势'],
  ['Figure 4', 'ISS 方法模拟', 'prepare-simulations.do；analysis.do L283-334', 'simulation*.dta', '目标百分位数抽样；模拟与实际离散度对照'],
  ['Figure 5 / Table III', '同行选择与网络聚类', 'analysis.do L338-521；L1661-1730', 'sample2.dta；网络 CSV', '相对规模、行业偏离、互惠性、传递性、聚类系数'],
  ['Table IV', '薪酬离散度与同行群体构成', 'analysis.do L1736-1762', 'sample2.dta', '行业×年份与公司固定效应'],
  ['Table V', 'SEC 披露规则', 'analysis.do L1766-1888', 'sample1.dta；sample2.dta', '规则前后趋势；初始低合规度交互项'],
  ['Figure 6 / Table VI', 'ISS 排名与阈值', 'analysis.do L526-594；L1892-1985', 'figure6.dta；table6.dta', '相对排名阈值；公司×年份和同行×年份固定效应'],
  ['Table VII', 'ISS 与同行新增/删除', 'analysis.do L1989-2115', 'table7a.dta；table7b.dta', 'dropped_by_ISS；added_by_ISS；动态同行变化'],
  ['Table VIII', '被动投资', 'analysis.do L2120-2150', 'table8.dta', '被动持股、准指数投资者、与 ISS 同向投票'],
  ['Table IX', '较低 SOP 支持率', 'analysis.do L2155-2176', 'table9.dta', '事件时间交互项；行业×年份和公司固定效应'],
  ['Table X / Figure 7', '接近临界的 SOP 频率表决', 'analysis.do L600-680；L2186-2206', 'table10.dta', 'has1yr × post；公司层面聚类标准误'],
]

function translateComment(text) {
  return text
    .replace(/pay dispersion/gi, '薪酬离散度')
    .replace(/compensation peer groups?/gi, '薪酬同行群体')
    .replace(/industry-size/gi, '行业-规模')
    .replace(/firm-level/gi, '公司层面')
    .replace(/summary stats?/gi, '描述性统计')
    .replace(/figure/gi, '图')
    .replace(/table/gi, '表')
    .replace(/panel/gi, '面板')
    .replace(/simulation/gi, '模拟')
    .replace(/network/gi, '网络')
    .replace(/merge/gi, '合并')
    .replace(/winsori[sz]e/gi, '缩尾处理')
}

function stataExplanation(code) {
  const line = code.trim()
  const lower = line.toLowerCase()
  if (!line) return '空行，用于分隔代码模块并提高可读性。'
  if (/^(\*|\/\/)/.test(line)) return `代码注释：${translateComment(line.replace(/^(\*+|\/\/+)\s*/, ''))}`
  if (/^\/\*/.test(line) || /\*\/$/.test(line)) return '块注释边界，用于说明后续数据处理或估计步骤。'
  if (line === '{') return '开始一个循环、条件或局部作用域代码块。'
  if (line === '}') return '结束当前循环、条件或局部作用域代码块。'
  if (lower.includes('///')) return 'Stata 命令续行；该行与下一行共同构成一条完整命令。'
  if (/^(clear|clear all)\b/i.test(line)) return '清空内存中的数据与估计结果，防止前序状态污染本次复现。'
  if (/^version\b/i.test(line)) return '锁定 Stata 语法兼容版本，降低不同 Stata 版本默认行为变化带来的复现偏差。'
  if (/^(log using|log close)\b/i.test(line)) return '打开或关闭运行日志，记录命令、样本检查和估计输出。'
  if (/^(set more off|set rmsg)/i.test(line)) return '设置 Stata 运行与日志显示方式，保证批处理不中途暂停。'
  if (/^cd\b/i.test(line)) return '切换工作目录，使后续相对路径指向复现包的数据或输出目录。'
  if (/^(global|local)\b/i.test(line)) return '定义全局或局部宏，用于复用路径、变量列表、循环参数或输出名称。'
  if (/^use\b/i.test(line)) return '载入 Stata 数据集；`clear` 表示允许覆盖当前内存数据。'
  if (/^save\b/i.test(line)) return '保存当前内存数据，形成中间数据集或最终分析输入。'
  if (/^merge\b/i.test(line)) return '按指定键合并数据，并生成 `_merge` 以审计主表与使用表的匹配状态。'
  if (/^joinby\b/i.test(line)) return '按共同键执行多对多连接，常用于构造公司与潜在同行公司的配对集合。'
  if (/^append\b/i.test(line)) return '纵向追加数据，将多个年份、地区或来源的数据堆叠为统一样本。'
  if (/^collapse\b/i.test(line)) return '将微观观测聚合到指定层级，并计算均值、总和或首个非缺失值等统计量。'
  if (/^reshape\b/i.test(line)) return '在宽表与长表之间转换，以便分位点、事件期或指标进入绘图和回归。'
  if (/^(keep|drop)\b/i.test(line)) return '保留或删除指定观测/变量，落实样本筛选并控制数据规模。'
  if (/^(gen|generate|g)\b/i.test(line)) return '生成新变量；右侧表达式定义其经济含义、变换方式或处理组状态。'
  if (/^replace\b/i.test(line)) return '在满足条件时重写已有变量，用于补值、修正规则或构造事件状态。'
  if (/^(egen|bys|by |bysort)/i.test(line)) {
    if (/median\(/i.test(line)) return '在指定分组内计算中位数，为中位数缩放和相对薪酬指标提供分母。'
    if (/sd\(/i.test(line)) return '在指定分组内计算标准差，即论文使用的薪酬离散度或特征离散度。'
    if (/(mean|total|sum)\(/i.test(line)) return '在指定分组内计算均值或总量，用于年度聚合、持股比例或同行群体统计。'
    if (/(count|nvals|tag)\(/i.test(line)) return '在指定分组内计数或标记唯一观测，用于样本量、公司数或同行数量。'
    if (/(group|xtile)\(/i.test(line)) return '构造固定效应组或规模分位组，为行业-规模基准化与高维固定效应估计服务。'
    return '按公司、年份、行业或同行群体分组计算变量，保持统计量与论文分析层级一致。'
  }
  if (/^winsor2\b/i.test(line)) return '执行缩尾处理（Winsorization），限制极端值影响；`cuts()` 给出上下分位点，`trim` 表示删除而非替换尾部观测。'
  if (/^reghdfe\b/i.test(line)) return '估计高维固定效应回归；`a()`/`absorb()` 吸收固定效应，`cluster()` 计算聚类稳健标准误，`residuals()` 提取异常薪酬残差。'
  if (/^(reg|regress)\b/i.test(line)) return '估计线性回归；若含 `cluster()`，标准误允许同一聚类单元内任意相关。'
  if (/^qreg2\b/i.test(line)) return '估计分位数回归；`q(0.5)` 对应中位数回归，并可对重复公司或同行进行聚类推断。'
  if (/^xtreg\b/i.test(line)) return '估计面板数据模型，用个体维度处理不可观测的时间不变异质性。'
  if (/^(test|lincom|testparm)\b/i.test(line)) return '对回归系数或系数组合执行假设检验，用于阈值差异、交互效应或联合显著性判断。'
  if (/^predict\b/i.test(line)) return '根据已估计模型生成预测值、残差或标准误，供异常薪酬和图形构造使用。'
  if (/^(twoway|line |scatter |graph |grc1leg)/i.test(line)) return '定义、组合或导出论文图形，包括曲线、置信区间、图例、坐标轴和面板布局。'
  if (/^outreg2\b/i.test(line)) return '把当前回归结果追加到表格文件，并控制系数精度、显著性符号、统计量和固定效应说明。'
  if (/^(seeout|esttab|estout)\b/i.test(line)) return '把估计结果转换为可阅读的文本或排版表格，形成论文表格输出。'
  if (/^(import|insheet)\b/i.test(line)) return '导入外部 CSV、文本或其他格式数据，进入 Stata 数据处理链路。'
  if (/^(export|outsheet)\b/i.test(line)) return '导出分析数据、网络边列表或结果文件，供 Python、SAS 或论文输出使用。'
  if (/^(foreach|forvalues|while)\b/i.test(line)) return '启动循环，对年份、变量、分位点、行业层级或模型设定进行批量处理。'
  if (/^(preserve|restore)\b/i.test(line)) return '保存或恢复当前内存数据状态，使临时变换不会破坏主分析样本。'
  if (/^(sort|gsort|order)\b/i.test(line)) return '调整观测或变量顺序，为滞后、去重、连接或展示提供确定性排序。'
  if (/^(duplicates|isid)\b/i.test(line)) return '检查或处理键的唯一性，防止错误的多对多合并和重复计数。'
  if (/^(rename|label|format)\b/i.test(line)) return '统一变量名称、标签或显示格式，使变量语义和输出表头可读。'
  if (/^(tab|tabstat|summarize|sum |count|distinct|describe|codebook)\b/i.test(line)) return '执行描述性检查或样本审计，不改变数据；用于核对分布、样本量和匹配质量。'
  if (/^(scalar|matrix)\b/i.test(line)) return '保存标量或矩阵结果，供后续显著性检验、表格统计量或循环调用。'
  if (/^(cap|capture)\b/i.test(line)) return '捕获可能出现的错误，使删除旧文件或处理可选对象时脚本可以继续运行。'
  if (/^(rm|erase)\b/i.test(line)) return '删除旧输出，确保本次运行生成的文件不会与历史结果混淆。'
  if (/^(compress)\b/i.test(line)) return '压缩变量存储类型，在不改变数值的前提下降低大型数据集内存占用。'
  if (/^(do|run)\b/i.test(line)) return '调用另一个 Stata 脚本，执行复现流程中的子模块。'
  return '执行 Stata 数据管理、变量构造或结果输出语句；其具体作用由当前模块与变量名称共同确定。'
}

function pythonExplanation(code) {
  const line = code.trim()
  if (!line) return '空行，用于分隔 Python 逻辑模块。'
  if (/^"{3,}/.test(line) || /^'{3,}/.test(line)) return '模块文档字符串的边界或内容，用于说明网络指标、循环层级和输出文件。'
  if (line.startsWith('#')) return `代码注释：${translateComment(line.slice(1).trim())}`
  if (/^(import|from)\b/.test(line)) return '导入数据处理或网络分析库；核心依赖包括 pandas、NumPy 与 NetworkX。'
  if (/^def\b/.test(line)) return '定义主函数，把文件读取、网络构造、指标计算和输出封装为可执行流程。'
  if (/__name__\s*==/.test(line)) return '仅在脚本被直接运行时调用主函数，避免被其他模块导入时自动执行。'
  if (/main\(\)/.test(line)) return '调用主函数，启动完整网络指标计算。'
  if (/read_csv|read_table|read_stata/.test(line)) return '读取 Stata 导出的同行关系数据或网络边列表。'
  if (/csvFile\s*=/.test(line)) return '定义网络指标输出文件名，供 Stata 后续合并。'
  if (/\bopen\(/.test(line)) return '以写入或追加模式打开 CSV 文件，并明确 UTF-8 编码。'
  if (/\.write\(/.test(line)) return '向 CSV 写入表头或当前网络的年份、公司、行业和指标值。'
  if (/\.close\(/.test(line)) return '关闭文件句柄，确保缓冲区内容写入磁盘并释放资源。'
  if (/DiGraph|Graph\(/.test(line)) return '初始化有向或无向网络；公司是节点，薪酬同行关系是边。'
  if (/\.clear\(\)/.test(line)) return '清空上一轮循环的节点和边，避免不同年份、行业或公司网络相互污染。'
  if (/add_edges_from|add_edge/.test(line)) return '把公司—同行配对加入网络，形成后续网络统计量的邻接结构。'
  if (/add_path/.test(line)) return '把核心公司指向薪酬同行公司的有向边加入网络。'
  if (/reciprocity/.test(line)) return '计算互惠性，即已存在连接中双向连接所占比例。'
  if (/density/.test(line)) return '计算网络密度，即实际边数相对于所有可能边数的比例。'
  if (/transitivity/.test(line)) return '计算传递性，即闭合三角形相对于连通三元组的比例。'
  if (/triangles/.test(line)) return '计算网络三角形数量，用于衡量同行选择关系的局部闭合程度。'
  if (/clustering/.test(line)) return '计算平均聚类系数，衡量公司邻居之间彼此连接的倾向。'
  if (/DataFrame|Series/.test(line)) return '把网络统计结果组织为表格对象，以便按公司、行业或年份保存。'
  if (/groupby/.test(line)) return '按年份、行业或核心公司分组，确保网络指标在论文要求的层级计算。'
  if (/to_csv/.test(line)) return '把网络指标写出为 CSV，随后由 Stata 合并到回归样本。'
  if (/^for\b/.test(line)) return '启动循环，对年份、行业或核心公司的网络逐一计算指标。'
  if (/^if\b/.test(line)) return '根据样本规模、有效边数或缺失状态选择计算分支。'
  if (/^try\b/.test(line)) return '尝试计算可能在空网络或退化网络中失败的指标。'
  if (/^except\b/.test(line)) return '捕获网络指标无法定义时的异常，保留预设缺失标记并继续循环。'
  if (/^pass\b/.test(line)) return '异常分支不再执行额外操作，继续使用预设的无效值标记。'
  if (/\.isnull\(\)/.test(line)) return '识别并删除公司标识缺失的边，防止无效节点进入网络。'
  if (/\.astype\(|\.applymap\(/.test(line)) return '把公司标识转换为整数，保证节点类型一致并减少浮点标识错误。'
  if (/\.loc\[/.test(line)) return '选择构建网络所需的核心公司与同行公司标识列。'
  if (/\.unique\(\)/.test(line)) return '提取唯一公司或同行标识，确定公司层面循环和局部网络节点集合。'
  if (/\.isin\(/.test(line)) return '按核心公司同行集合筛选观测，用于构造局部同行网络。'
  if (/pd\.concat/.test(line)) return '合并核心公司的直接同行边与同行之间的关系边，形成局部网络。'
  if (/\.to_numpy\(\)/.test(line)) return '把两列边列表转换为 NumPy 数组，供 NetworkX 循环添加边。'
  if (/^df\s*=|^df[A-Za-z0-9_]*\s*=/.test(line)) return '创建或筛选 DataFrame，限定当前年份、行业或核心公司的网络样本。'
  if (/^(ciks|peers|all_ciks|ltriangles|l|i)\s*=/.test(line)) return '保存节点集合、边数组、三角形列表或循环进度计数。'
  if (/^-?1\b/.test(line) || /=\s*-1/.test(line)) return '使用 -1 标记无法定义的网络指标；合并回 Stata 后应避免把该值当作有效负值。'
  if (/print\(/.test(line)) return '输出运行进度或诊断信息，便于定位耗时年份和异常网络。'
  return '执行 Python 数据整理或网络统计语句，为 Figure 5、Table III 和附录网络分析生成输入。'
}

function sasExplanation(code) {
  const line = code.trim()
  const lower = line.toLowerCase()
  if (!line) return '空行，用于分隔 SAS 数据与回归模块。'
  if (line.startsWith('*')) return `代码注释：${translateComment(line.replace(/^\*+\s*/, '').replace(/;$/, ''))}`
  if (/^options\b/.test(lower)) return '设置 SAS 输出宽度、居中和远程通信选项。'
  if (/^%let\b/.test(lower)) return '定义宏变量，例如 WRDS 地址、样本起止年份或循环参数。'
  if (/^(signon|rsubmit|endrsubmit)/.test(lower)) return '建立、进入或结束 WRDS 远程 SAS 会话。'
  if (/^libname\b/.test(lower)) return '为 WRDS 数据库目录分配库引用，连接 Compustat、CRSP、CCM 和因子数据。'
  if (/^%macro\b|^%mend\b|^%loop\b/.test(lower)) return '定义、结束或调用年度循环宏，实现 1994–2024 年批量处理。'
  if (/^%do\b|^%end\b/.test(lower)) return '开始或结束 SAS 宏循环，对每个财年重复收益率与波动率计算。'
  if (/^proc sql/.test(lower)) return '启动 SQL 过程，用于链接 CRSP、Compustat/CCM 并按公司年度聚合。'
  if (/^(create table|select|from|left join|inner join|where|group by|order by)/.test(lower)) return 'SQL 查询语句：选择字段、连接数据库表、限制样本并定义公司年度聚合层级。'
  if (/^proc sort/.test(lower)) return '按公司、证券和财年排序，为分组回归或去重选择做准备。'
  if (/^data\b/.test(lower)) return '启动 DATA step，创建、追加或转换 SAS 数据集。'
  if (/^set\b/.test(lower) || /\bset\b.*;/.test(lower)) return '读取或纵向追加 SAS 数据集，并在 DATA step 中生成派生变量。'
  if (/^drop table\b/.test(lower)) return '删除年度循环产生的临时表，控制 WRDS 工作区存储占用。'
  if (/^proc reg/.test(lower)) return '启动分组时间序列回归，估计市场与因子模型。'
  if (/^by\b/.test(lower)) return '要求回归或处理在每个公司—证券—财年组内分别执行。'
  if (/^model\b/.test(lower)) return '定义超额收益对市场、SMB、HML 和动量因子的回归模型。'
  if (/^output\b/.test(lower)) return '导出回归残差，用于计算特质收益波动率。'
  if (/std\(|mean\(|sum\(/.test(lower)) return '计算收益率或残差的均值、总量或标准差，形成年度收益和波动率指标。'
  if (/^proc download/.test(lower)) return '把 WRDS 远程会话中的结果下载到本地 SAS 环境。'
  if (/^proc export/.test(lower)) return '把最终公司年度结果导出为 Stata 数据集，供 `prepare-data.do` 合并。'
  if (/^(quit|run);?$/.test(lower)) return '结束当前 SAS 过程并提交执行。'
  if (/^[a-z_][a-z0-9_]*\s*=/.test(lower)) return '生成或转换变量，例如复合收益率、超额收益率或公司标识。'
  return '执行 SAS/WRDS 数据连接、收益率构造或波动率估计语句。'
}

function explanationFor(language, code) {
  if (language === 'Python') return pythonExplanation(code)
  if (language === 'SAS') return sasExplanation(code)
  return stataExplanation(code)
}

function detectSection(code, current) {
  const trimmed = code.trim().replace(/^(\*+|#+|\/\/+)\s*/, '')
  if (/^(FIGURE|Figure|TABLE|Table|Step|STEP)\b/.test(trimmed)) return trimmed
  return current
}

await mkdir(publicRoot, { recursive: true })
await mkdir(reportRoot, { recursive: true })

const summaryRows = []
for (const [file, language, purpose] of files) {
  const source = await readFile(path.join(sourceRoot, file), 'utf8')
  const lines = source.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n')
  let section = '文件初始化'
  const records = lines.map((code, index) => {
    section = detectSection(code, section)
    return {
      line: index + 1,
      code,
      section,
      explanation: explanationFor(language, code),
    }
  })
  const slug = file.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const payload = { file, language, purpose, lineCount: lines.length, records }
  const json = `${JSON.stringify(payload, null, 2)}\n`
  await writeFile(path.join(publicRoot, `${slug}.json`), json, 'utf8')
  await writeFile(path.join(reportRoot, `${slug}.json`), json, 'utf8')
  summaryRows.push([file, language, lines.length, purpose, `${slug}.json`])
}

const matrixMarkdown = matrix
  .map((row) => `| ${row.join(' | ')} |`)
  .join('\n')
const fileMarkdown = summaryRows
  .map(([file, language, count, purpose]) => `| \`${file}\` | ${language} | ${count} | ${purpose} |`)
  .join('\n')

const index = `# CEO 薪酬论文：图表—代码映射与逐行源码指南

## 使用说明

本指南基于作者复现包中的 9 个真实源码文件生成，共覆盖 8,114 行代码。网站中的“源码逐行解析”按文件和页码加载，每行展示原始代码、所属模块与中文解释。作者源码未被修改。

## 图表—代码映射总览

| 论文输出 | 研究内容 | 代码位置 | 主要输入 | 核心处理或估计 |
|---|---|---|---|---|
${matrixMarkdown}

## 源码文件

| 文件 | 语言 | 行数 | 职责 |
|---|---:|---:|---|
${fileMarkdown}

## 核心计量处理

### 缩尾处理

\`winsor2\` 将尾部观测替换为指定分位点，降低极端值对薪酬、相对规模、公司特征与持股比例的影响。代码根据变量性质使用 1%/99% 或 5%/95% 阈值；\`trim\` 则直接删除尾部观测。

### 中位数缩放

代码在每个财年计算 CEO 薪酬中位数，并构造 \`mom_*\` 指标。该变换使薪酬具有跨年份可比性，薪酬离散度随后定义为缩放后薪酬的标准差。

### 异常薪酬

作者逐年估计 CEO 薪酬对规模、Tobin's Q、销售增长、股票收益和特质波动率等基本面的交叉截面回归，并吸收行业—规模固定效应。回归残差经年度中位数缩放和缩尾后形成异常薪酬。

### 固定效应与聚类

\`reghdfe\` 吸收行业×规模、行业×年份、公司、公司×年份及同行×年份固定效应。多数公司层面模型使用公司层面聚类标准误；潜在同行层面的平衡性检验按同行公司聚类。

### 网络指标

三个 Python 文件使用 NetworkX 计算互惠性、密度、传递性、三角形数量和聚类系数，并按总体经济、行业年度或公司同行群体层级输出 CSV。

## 解释边界

逐行说明解释代码的程序逻辑与计量目的，不等同于作者对每行代码的官方注释。商业数据库版本、历史回填、链接表和扩展命令版本仍可能影响真实数据复现结果。
`

await writeFile(path.join(publicRoot, 'index.md'), index, 'utf8')
await writeFile(path.join(reportRoot, 'index.md'), index, 'utf8')

console.log(`Generated ${summaryRows.length} code guides with ${summaryRows.reduce((sum, row) => sum + Number(row[2]), 0)} lines.`)
