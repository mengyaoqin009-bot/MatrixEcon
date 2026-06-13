import { isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Mail,
  Menu,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { methods, papers, type Method, type Paper } from './data'

type Page = 'home' | 'papers' | 'methods' | 'code' | 'paper'

const assetPath = (path: string) => new URL(path.replace(/^\/+/, ''), document.baseURI).toString()

const navItems: Array<{ page: Page; zh: string; en: string }> = [
  { page: 'home', zh: '首页', en: 'Home' },
  { page: 'papers', zh: 'Paper Matrix', en: 'Paper Matrix' },
  { page: 'methods', zh: 'Estimator Core', en: 'Estimator Core' },
  { page: 'code', zh: 'Vector Space', en: 'Vector Space' },
]

function App() {
  const [page, setPage] = useState<Page>('home')
  const [english, setEnglish] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<Paper>(papers[0])
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (next: Page, paper?: Paper) => {
    if (paper) setSelectedPaper(paper)
    setPage(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <Header
        page={page}
        english={english}
        menuOpen={menuOpen}
        onToggleLanguage={() => setEnglish((value) => !value)}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onNavigate={navigate}
      />
      <main>
        {page === 'home' && <HomePage english={english} onNavigate={navigate} />}
        {page === 'papers' && (
          <PapersPage english={english} onOpen={(paper) => navigate('paper', paper)} />
        )}
        {page === 'methods' && <MethodsPage english={english} />}
        {page === 'code' && <CodePage english={english} />}
        {page === 'paper' && <PaperPage paper={selectedPaper} english={english} />}
      </main>
      <Footer english={english} />
    </div>
  )
}

function Header({
  page,
  english,
  menuOpen,
  onToggleLanguage,
  onToggleMenu,
  onNavigate,
}: {
  page: Page
  english: boolean
  menuOpen: boolean
  onToggleLanguage: () => void
  onToggleMenu: () => void
  onNavigate: (page: Page) => void
}) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => onNavigate('home')} aria-label="MatrixEcon 首页">
        Matrix<span>Econ</span>
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="主导航">
        {navItems.map((item) => (
          <button
            key={item.page}
            className={page === item.page || (page === 'paper' && item.page === 'papers') ? 'active' : ''}
            onClick={() => onNavigate(item.page)}
          >
            {english ? item.en : item.zh}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="language-button" onClick={onToggleLanguage}>
          {english ? 'EN / 中文' : '中文 / EN'}
        </button>
        <a className="icon-link" href="https://github.com/mengyaoqin009-bot/MatrixEcon" target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={18} />
        </a>
        <button className="menu-button" onClick={onToggleMenu} aria-label="切换菜单">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function HomePage({ english, onNavigate }: { english: boolean; onNavigate: (page: Page) => void }) {
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-copy">
          <p className="identity">M. Qin · DUFE</p>
          <h1>MatrixEcon</h1>
          <h2>{english ? 'Demystifying the economic matrix.' : '解构经济矩阵，开源实证代码。'}</h2>
          <p className="hero-subtitle">
            {english
              ? 'An open research hub connecting frontier papers, econometric identification, and reproducible empirical code.'
              : '连接顶刊前沿、计量识别与可复现实证代码的开放研究知识库。'}
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onNavigate('papers')}>
              {english ? 'Enter Paper Matrix' : '进入文献矩阵'} <ArrowRight size={16} />
            </button>
            <button className="text-button" onClick={() => onNavigate('methods')}>
              {english ? 'Explore estimators' : '探索估计器'} <ArrowRight size={16} />
            </button>
          </div>
          <div className="hero-meta">
            <span><strong>{papers.length}</strong>{english ? 'papers indexed' : '篇核心文献'}</span>
            <span><strong>11</strong>{english ? 'estimators' : '类估计方法'}</span>
            <span><strong>3</strong>{english ? 'code languages' : '种代码语言'}</span>
          </div>
        </div>
        <CoefficientPlot />
      </section>

      <section className="editorial-grid section-pad">
        <HomeColumn number="01" title={english ? 'Research Themes' : '精选研究主题'}>
          {['资产定价与风险因子', '预期收益与市场异象', '宏观金融与期限结构', '机器学习与高维推断'].map((item, index) => (
            <div className="index-row" key={item}><span>{item}</span><small>0{8 - index}</small></div>
          ))}
        </HomeColumn>
        <HomeColumn number="02" title={english ? 'Latest Interpretations' : '最新文献解读'}>
          {papers.slice(0, 3).map((paper) => (
            <button className="paper-teaser" key={paper.id} onClick={() => onNavigate('papers')}>
              <span>{english ? paper.title : paper.titleZh}</span>
              <small>{paper.journal} · {paper.year}</small>
            </button>
          ))}
        </HomeColumn>
        <HomeColumn number="03" title={english ? 'Selected Replications' : '精选复现项目'}>
          {papers.filter((paper) => paper.code).slice(0, 3).map((paper) => (
            <div className="replication-teaser" key={paper.id}>
              <span>{paper.title}</span>
              <StatusLabel status={paper.status} />
            </div>
          ))}
        </HomeColumn>
      </section>

      <section className="methods-overview section-pad">
        <SectionHeading
          number="04"
          title={english ? 'Methods Navigation Map' : '方法导航图'}
          action={english ? 'Explore all methods' : '查看全部方法'}
          onClick={() => onNavigate('methods')}
        />
        <MethodMap compact />
      </section>

      <section className="matrix-preview section-pad">
        <SectionHeading
          number="05"
          title="Paper Matrix"
          action={english ? 'Browse library' : '浏览文献库'}
          onClick={() => onNavigate('papers')}
        />
        <div className="matrix-table" role="table" aria-label="文献方法矩阵">
          <div className="matrix-row matrix-head"><span>Theme \ Method</span><span>Factor</span><span>DID</span><span>IV</span><span>DML</span><span>Panel FE</span></div>
          {['Asset Pricing', 'Macro Finance', 'Corporate Finance', 'Labor & Public'].map((theme, rowIndex) => (
            <div className="matrix-row" key={theme}>
              <strong>{theme}</strong>
              {[0, 1, 2, 3, 4].map((colIndex) => {
                const level = (rowIndex * 3 + colIndex * 2) % 4
                return <span className={`matrix-cell level-${level}`} key={colIndex}>{level ? level + 1 : '—'}</span>
              })}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function CoefficientPlot() {
  const rows = [
    ['Mkt-RF', 74, '0.412'], ['SMB', 36, '-0.165'], ['HML', 61, '0.236'],
    ['RMW', 56, '0.152'], ['CMA', 43, '-0.097'], ['Quality', 65, '0.274'],
  ]
  return (
    <div className="coefficient-panel" aria-label="因子载荷系数图">
      <div className="plot-heading">
        <span>Factor Loadings (β) with 95% CI</span>
        <small>Model: 5-Factor · T = 240</small>
      </div>
      <div className="plot-axis"><span>−0.6</span><span>−0.3</span><span>0</span><span>0.3</span><span>0.6</span></div>
      {rows.map(([label, position, value]) => (
        <div className="plot-row" key={label}>
          <span className="plot-label">{label}</span>
          <div className="plot-track">
            <i className="zero-line" />
            <i className={Number(position) < 50 ? 'interval negative' : 'interval'} style={{ left: `${Number(position) - 8}%` }} />
            <i className={Number(position) < 50 ? 'dot negative' : 'dot'} style={{ left: `${position}%` }} />
          </div>
          <span className="plot-value">{value}</span>
        </div>
      ))}
      <p className="plot-note">Clustered standard errors · Two-sided tests</p>
    </div>
  )
}

function HomeColumn({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <article className="home-column">
      <h3><span>{number}</span>{title}</h3>
      <div>{children}</div>
    </article>
  )
}

function SectionHeading({ number, title, action, onClick }: { number: string; title: string; action: string; onClick: () => void }) {
  return (
    <div className="section-heading">
      <h2><span>{number}</span>{title}</h2>
      <button className="text-button" onClick={onClick}>{action}<ArrowRight size={15} /></button>
    </div>
  )
}

function PapersPage({ english, onOpen }: { english: boolean; onOpen: (paper: Paper) => void }) {
  const [query, setQuery] = useState('')
  const [journal, setJournal] = useState('全部期刊')
  const [method, setMethod] = useState('全部方法')
  const [status, setStatus] = useState('全部状态')

  const filtered = useMemo(() => papers
    .filter((paper) => {
      const text = `${paper.title} ${paper.titleZh} ${paper.authors}`.toLowerCase()
      return text.includes(query.toLowerCase())
        && (journal === '全部期刊' || paper.journal === journal)
        && (method === '全部方法' || paper.method === method)
        && (status === '全部状态' || paper.status === status)
    })
    .sort((left, right) => right.year - left.year), [query, journal, method, status])

  const reset = () => {
    setQuery('')
    setJournal('全部期刊')
    setMethod('全部方法')
    setStatus('全部状态')
  }

  return (
    <section className="library-page">
      <div className="page-title-row section-pad">
        <div><h1>Paper Matrix</h1><p>{english ? 'Top-journal literature library' : '顶刊文献库'}</p></div>
        <label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={english ? 'Search title, author, keyword...' : '搜索题目、作者或关键词…'} /></label>
      </div>
      <div className="library-layout">
        <aside className="filter-rail">
          <div className="filter-title"><span>FILTERS</span><button onClick={reset}>{english ? 'Reset' : '重置'}</button></div>
          <FilterSelect label={english ? 'Journal' : '期刊'} value={journal} onChange={setJournal} options={['全部期刊', ...new Set(papers.map((paper) => paper.journal))]} />
          <FilterSelect label={english ? 'Method' : '方法'} value={method} onChange={setMethod} options={['全部方法', ...new Set(papers.map((paper) => paper.method))]} />
          <FilterSelect label={english ? 'Replication' : '复现状态'} value={status} onChange={setStatus} options={['全部状态', '已复现', '复现中', '待复现']} />
          <div className="filter-note">
            <strong>{english ? 'Coverage' : '覆盖范围'}</strong>
            <p>AER · QJE · JPE · Econometrica · ReStud · JF · JFE · RFS · AEJ: Applied · JHR · JPubE · JDE</p>
          </div>
        </aside>
        <div className="paper-results">
          <div className="results-meta">
            <strong>{filtered.length} {english ? 'results' : '条结果'}</strong>
            <span>{english ? 'Sorted by newest' : '按年份降序'}</span>
          </div>
          <div className="paper-table">
            <div className="paper-row paper-head"><span>#</span><span>{english ? 'Title' : '论文'}</span><span>{english ? 'Journal / Year' : '期刊 / 年份'}</span><span>{english ? 'Method' : '方法'}</span><span>{english ? 'Data' : '数据'}</span><span>{english ? 'Replication' : '复现'}</span></div>
            {filtered.map((paper, index) => (
              <button className="paper-row" key={paper.id} onClick={() => onOpen(paper)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="paper-title-cell"><strong>{english ? paper.title : paper.titleZh}</strong><small>{paper.authors}</small></span>
                <span>{paper.journal} / {paper.year}</span>
                <span>{paper.method}</span>
                <span>{paper.data}</span>
                <StatusLabel status={paper.status} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Iterable<string> }) {
  return (
    <label className="filter-control">
      <span>{label}</span>
      <div><select value={value} onChange={(event) => onChange(event.target.value)}>{[...options].map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={15} /></div>
    </label>
  )
}

function StatusLabel({ status }: { status: Paper['status'] }) {
  return <span className={`status status-${status}`}>{status === '已复现' && <Check size={13} />}{status}</span>
}

function MethodsPage({ english }: { english: boolean }) {
  const [selected, setSelected] = useState<Method>(methods[2])
  const [language, setLanguage] = useState<'Stata' | 'R' | 'Python'>('Stata')
  const [detailTab, setDetailTab] = useState<'intuition' | 'assumptions' | 'diagnostics'>('intuition')
  const detailCopy = {
    intuition: {
      heading: english ? 'INTUITION' : '直觉解释',
      body: selected.intuition,
    },
    assumptions: {
      heading: english ? 'KEY ASSUMPTION' : '关键假设',
      body: selected.assumption,
    },
    diagnostics: {
      heading: english ? 'DIAGNOSTIC' : '诊断检验',
      body: english
        ? 'Inspect pre-trends, overlap, placebo estimates, influential observations, and sensitivity to alternative specifications.'
        : '检查处理前趋势、重叠性、安慰剂估计、影响点以及对替代设定的敏感性。',
    },
  }
  return (
    <section className="methods-page">
      <div className="page-title-row section-pad">
        <div><h1>Estimator Core</h1><p>{english ? 'Methods for credible causal and predictive inference' : '可信因果识别与预测推断的方法库'}</p></div>
      </div>
      <div className="methods-layout">
        <aside className="method-index">
          <h2>{english ? 'Method Index' : '方法索引'}</h2>
          {methods.map((method) => (
            <button className={selected.code === method.code ? 'active' : ''} key={method.code} onClick={() => setSelected(method)}>
              <strong>{method.code}</strong><span>{english ? method.name : method.zh}</span>
            </button>
          ))}
        </aside>
        <div className="method-map-wrap">
          <h2>{english ? 'Methods Navigation Map' : '方法导航图'}</h2>
          <p>{english ? 'Explore estimators by research design family.' : '按研究设计家族与识别关系探索估计器。'}</p>
          <MethodMap selected={selected.code} onSelect={(code) => setSelected(methods.find((method) => method.code === code) ?? selected)} />
        </div>
        <article className="method-detail">
          <div className="method-detail-title"><span>{selected.code}</span><h2>{english ? selected.name : selected.zh}</h2></div>
          <div className="detail-tabs">
            <button className={detailTab === 'intuition' ? 'active' : ''} onClick={() => setDetailTab('intuition')}>{english ? 'Intuition' : '直觉'}</button>
            <button className={detailTab === 'assumptions' ? 'active' : ''} onClick={() => setDetailTab('assumptions')}>{english ? 'Assumptions' : '假设'}</button>
            <button className={detailTab === 'diagnostics' ? 'active' : ''} onClick={() => setDetailTab('diagnostics')}>{english ? 'Diagnostics' : '诊断'}</button>
          </div>
          <h3>{detailCopy[detailTab].heading}</h3><p>{detailCopy[detailTab].body}</p>
          <h3>{english ? 'MODEL' : '模型'}</h3><div className="formula">{selected.formula}</div>
          <MiniEventChart />
          <div className="code-tabs">
            {(['Stata', 'R', 'Python'] as const).map((item) => <button className={language === item ? 'active' : ''} key={item} onClick={() => setLanguage(item)}>{item}</button>)}
          </div>
          <pre><code>{codeExamples[language]}</code></pre>
        </article>
      </div>
    </section>
  )
}

function MethodMap({ compact = false, selected, onSelect }: { compact?: boolean; selected?: string; onSelect?: (code: string) => void }) {
  const groups = [
    ['Randomization', ['RCT']],
    ['Quasi-experimental', ['IV', 'DID', 'RDD', 'SC']],
    ['Panel / Time', ['ES', 'FE', 'SS']],
    ['Machine Learning', ['DML', 'CF']],
    ['Asset Pricing', ['FM']],
  ] as const
  return (
    <div className={compact ? 'method-map compact' : 'method-map'}>
      {groups.map(([family, codes]) => (
        <div className="method-family" key={family}>
          <span>{family}</span>
          <div>{codes.map((code) => (
            <button className={selected === code ? 'active' : ''} key={code} onClick={() => onSelect?.(code)}>
              <strong>{code}</strong><small>{methods.find((method) => method.code === code)?.zh}</small>
            </button>
          ))}</div>
        </div>
      ))}
    </div>
  )
}

const codeExamples = {
  Stata: `* Two-way fixed effects DID\nreghdfe y i.treat##i.post, absorb(id time) vce(cluster id)\n\n* Event-study leads and lags\neventstudyinteract y event_time, cohort(treat_time)`,
  R: `model <- feols(y ~ treat * post | id + time,\n  data = panel, cluster = ~id)\niplot(model, ref.line = 0)`,
  Python: `model = PanelOLS.from_formula(\n  'y ~ 1 + treat:post + EntityEffects + TimeEffects',\n  data=panel\n)\nresult = model.fit(cov_type='clustered')`,
}

function MiniEventChart() {
  return (
    <div className="event-chart" aria-label="事件研究诊断图">
      <span className="chart-label">Coefficient</span>
      <i className="chart-zero" />
      {[-3, -2, -1, 0, 1, 2, 3, 4].map((period, index) => (
        <div className={index >= 3 ? 'event-point treated' : 'event-point'} style={{ left: `${10 + index * 11}%`, bottom: `${42 + [2, -4, -8, 4, 14, 18, 12, 7][index]}%` }} key={period}>
          <i /><span>{period}</span>
        </div>
      ))}
    </div>
  )
}

function CodePage({ english }: { english: boolean }) {
  const [language, setLanguage] = useState<'Stata' | 'R' | 'Python'>('Stata')
  const [copied, setCopied] = useState(false)
  const copyCode = async () => {
    await navigator.clipboard?.writeText(replicationCode[language])
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }
  return (
    <section className="code-page">
      <div className="page-title-row section-pad">
        <div><h1>Vector Space</h1><p>{english ? 'Clean, inspectable and reproducible empirical code' : '干净、可审查、可复现的实证代码空间'}</p></div>
      </div>
      <div className="code-layout section-pad">
        <aside className="project-index">
          <h2>{english ? 'Replication Projects' : '复现项目'}</h2>
          <button className="active"><span>2026 · JF</span><strong>Why Have CEO Pay Levels Become Less Diverse?</strong></button>
          <button disabled><span>2020 · RFS · {english ? 'Coming soon' : '待接入'}</span><strong>Empirical Asset Pricing via Machine Learning</strong></button>
          <button disabled><span>2015 · JFE · {english ? 'Coming soon' : '待接入'}</span><strong>A Five-Factor Asset Pricing Model</strong></button>
        </aside>
        <div className="code-workbench">
          <div className="code-workbench-title">
            <div><small>Replication Code · 20210355</small><h2>analysis.do</h2></div>
            <button onClick={copyCode}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? (english ? 'Copied' : '已复制') : (english ? 'Copy' : '复制')}</button>
          </div>
          <div className="code-tabs">
            {(['Stata', 'R', 'Python'] as const).map((item) => <button className={language === item ? 'active' : ''} key={item} onClick={() => setLanguage(item)}>{item}</button>)}
          </div>
          <pre className="large-code"><code>{replicationCode[language]}</code></pre>
          <div className="comparison-block">
            <h3>{english ? 'Original vs. reproduced estimates' : '原始结果与复现结果对照'}</h3>
            <div className="comparison-bars">
              {['CEO pay level', 'Within-firm variance', 'Peer convergence'].map((label, index) => (
                <div key={label}><span>{label}</span><i style={{ width: `${70 - index * 12}%` }} /><i className="pending" /><small>{english ? 'Pending' : '待核对'}</small></div>
              ))}
            </div>
          </div>
        </div>
        <aside className="manifest">
          <h2>{english ? 'Reproducibility Manifest' : '可复现性清单'}</h2>
          <ManifestRow label={english ? 'Data public' : '数据公开'} value="Pseudo-data" ok />
          <ManifestRow label={english ? 'Code public' : '代码公开'} value="Yes" ok />
          <ManifestRow label={english ? 'Run status' : '运行状态'} value={english ? 'Pending local run' : '待本地运行'} />
          <ManifestRow label="Stata" value="17.0 MP" />
          <ManifestRow label={english ? 'Runtime' : '运行时间'} value="04m 32s" />
          <ManifestRow label={english ? 'Seed' : '随机种子'} value="20210355" />
          <div className="manifest-links">
            <a href="https://github.com/mengyaoqin009-bot/MatrixEcon" target="_blank" rel="noreferrer"><Github size={16} />GitHub repository<ExternalLink size={13} /></a>
            <a href="mailto:qin_mengyao@126.com"><Mail size={16} />qin_mengyao@126.com</a>
          </div>
        </aside>
      </div>
    </section>
  )
}

const replicationCode = {
  Stata: `version 17.0\nclear all\nset more off\nset seed 20210355\n\n* Load pseudo-data and construct analysis sample\nuse "pseudo-data/anncomp.dta", clear\nmerge 1:1 gvkey year using "pseudo-data/compustat.dta"\nkeep if _merge == 3\n\n* Baseline firm and year fixed-effects model\nreghdfe log_ceo_pay dispersion controls, ///\n  absorb(gvkey year) vce(cluster gvkey)\n\n* Export reproducible table\nesttab using "output/table2.tex", replace se star(* .10 ** .05 *** .01)`,
  R: `library(fixest)\nlibrary(modelsummary)\n\nset.seed(20210355)\npanel <- readRDS("pseudo-data/analysis.rds")\n\nmodel <- feols(\n  log_ceo_pay ~ dispersion + controls | gvkey + year,\n  data = panel,\n  cluster = ~gvkey\n)\n\nmodelsummary(model, output = "output/table2.tex")`,
  Python: `import numpy as np\nimport pandas as pd\nfrom linearmodels.panel import PanelOLS\n\nnp.random.seed(20210355)\npanel = pd.read_parquet("pseudo-data/analysis.parquet")\npanel = panel.set_index(["gvkey", "year"])\n\nmodel = PanelOLS.from_formula(\n    "log_ceo_pay ~ dispersion + controls + EntityEffects + TimeEffects",\n    data=panel,\n)\nresult = model.fit(cov_type="clustered", cluster_entity=True)`,
}

function ManifestRow({ label, value, ok = false }: { label: string; value: string; ok?: boolean }) {
  return <div className="manifest-row"><span>{label}</span><strong>{ok && <CircleCheck size={15} />}{value}</strong></div>
}

const mechanismSteps = [
  ['主体与制度环境', '董事会在信息不完全下制定 CEO 薪酬，并同时面对股东监督、代理投票顾问评价和声誉约束。'],
  ['同业组选择', '公司逐渐使用行业相同、规模接近的公司作为披露的薪酬同行群体。'],
  ['中位数锚定', '薪酬委员会通常将同业组薪酬中位数作为目标，降低公司特定薪酬政策的自由裁量空间。'],
  ['互惠参照网络', '相似公司反复互选为同业公司，互惠性、传递性和网络聚类程度随之提高。'],
  ['薪酬集群', '集群内公司围绕相近基准调整薪酬，组内薪酬水平逐步收敛。'],
  ['离散度下降', '当组内收敛效应超过组间差异扩张时，整体经济中的 CEO 薪酬离散度下降。'],
]

const institutionDrivers = [
  ['SEC 强制披露', '2007 年起披露薪酬同业公司，提高薪酬制定过程的透明度，使偏离标准同业组更容易被识别。'],
  ['代理投票顾问', 'ISS 使用行业和规模规则构建推荐同业组，并将其用于薪酬绩效评价和投票建议。'],
  ['被动投资增长', '监督成本较高的分散化投资者更依赖代理投票顾问，从而放大标准化准则的影响。'],
  ['薪酬方案表决权', '较低 SOP 支持率及更高投票频率提高董事会采用可解释、标准化薪酬实践的压力。'],
]

const mechanismPredictions = [
  ['P1', '若行业-规模基准化能够产生薪酬集群，模拟薪酬离散度应随时间下降。', 'Figure 4'],
  ['P2', '披露的同行群体应在行业、规模和网络结构上变得更加相似、更加聚类。', 'Figure 5 / Table III–IV'],
  ['P3', 'ISS 排名越靠前的潜在同业公司越可能被纳入，且在 ISS 规模阈值处出现不连续变化。', 'Figure 6 / Table VI–VII'],
  ['P4', '被动投资者持股及跟随 ISS 投票的倾向越高，公司越遵循行业-规模基准化。', 'Table VIII'],
  ['P5', '较低 SOP 支持率和更高 SOP 投票频率应推动公司提高行业-规模基准化程度。', 'Figure 7 / Table IX–X'],
]

const sampleCards = [
  {
    title: '总体经济样本',
    period: '1996–2023',
    scale: '3,976 家不同公司；平均每年 1,975 家',
    scope: 'Execucomp 覆盖的美国上市公司',
    use: 'Figure 1–4、Table I–II、SEC 规则前后趋势与安慰剂检验',
  },
  {
    title: '公司—薪酬同业组样本',
    period: '2007–2023',
    scale: '2,175 家不同核心公司；平均每年 1,240 家',
    scope: 'S&P 1500 核心公司及其披露的薪酬同行群体',
    use: '平均每年覆盖 2,982 家薪酬非缺失同业公司；用于 Figure 5–7、Table III–X',
  },
]

const metricConstruction = [
  {
    title: 'Pay 与 Pay dispersion',
    formula: 'Payᵢₜ = TDC1ᵢₜ / Medianₜ(TDC1)',
    steps: ['Execucomp CEO 总薪酬 TDC1', '按财年计算样本中位数', '用年度中位数缩放为无量纲 Pay', '在经济体、行业-规模组或披露同业组内计算标准差', '衡量可跨期比较的薪酬离散度'],
  },
  {
    title: 'Pay dispersion (ex-options)',
    formula: 'PayNoOptᵢₜ = (TDC1ᵢₜ − OptionAwardsᵢₜ) / AnnualMedianₜ',
    steps: ['读取总薪酬和授予股票期权价值', '从 TDC1 中剔除期权授予价值', '按财年进行中位数缩放', '在相同聚合层级计算标准差', '检验期权使用变化能否解释薪酬离散度下降'],
  },
  {
    title: 'Abnormal pay',
    formula: 'AbnormalPayᵢₜ = Residualᵢₜ / Medianₜ(TDC1)',
    steps: ['以未缩放 CEO 薪酬为因变量', '逐年控制规模、Tobin’s Q、销售增长、ROA、股票收益率和特质波动率', '吸收相应行业-规模结构并取得回归残差', '残差经年度中位数缩放和尾部处理', '残差标准差衡量无法由公司基本面解释的异常薪酬离散度'],
  },
  {
    title: '相对规模离散度',
    formula: 'SD(PeerSizeⱼₜ / FocalSizeᵢₜ)',
    steps: ['分别读取核心公司与同业公司的 BVA、MVA', '计算同业公司规模相对核心公司的比值', '在每个公司—年度同业组内计算标准差', '分别形成相对账面价值和相对市场价值离散度', '数值越低表示同业组在规模上越同质'],
  },
  {
    title: '偏离行业-规模基准化',
    formula: 'Deviationᵢₜ = N(行业不同或规模超界的同业公司) / N(全部同业公司)',
    steps: ['匹配核心公司与同业公司的 GICS1 行业', '计算 BVA 与 MVA 相对规模', '标记行业不同或规模低于 50% / 高于 200% 的同业公司', '在公司—年度层面计算其占比', '数值越高表示越偏离行业-规模基准化'],
  },
  {
    title: 'ISS conformity',
    formula: 'ISSConformityᵢₜ = N(披露同业 ∩ ISS 合成同业) / N(披露同业)',
    steps: ['依据 ISS 公开规则确定行业候选集', '按照相对规模与行业匹配程度进行排名', '按 ISS 建议规模构建公司特定合成同业组', '计算披露同业公司落入合成名单的比例', '衡量公司实际选择与 ISS 方法的一致程度'],
  },
  {
    title: '同行群体网络指标',
    formula: 'Reciprocity · Transitivity · Clustering · Reciprocal references',
    steps: ['以公司为节点、同业参照关系为有向边', '构造经济体、行业或公司同业组网络', '计算双向连接比例与互惠参照比例', '计算闭合三元组、传递性和聚类系数', '衡量薪酬参照网络是否形成更封闭的相互基准集群'],
  },
]

const evidenceLadder = [
  ['1', '趋势与固定效应回归', '经济体 / 行业-规模-年度 / 公司-年度', '年度趋势', '三类薪酬离散度', '行业-规模、公司等固定效应', '行业-规模或公司聚类', '描述性事实'],
  ['2', 'SEC 规则前后与安慰剂', '行业-规模-年度及公司-年度', '2003–2006 vs. 2007–2010；初始低一致度', '薪酬离散度与同业组一致性', '行业-规模或公司固定效应', '行业-规模或公司聚类', '中等：时点与暴露差异'],
  ['3', 'ISS 排名和规模阈值', '公司—潜在同业—年度', 'ISS rank、相对阈值位置', '是否纳入披露同业组', '公司×年份、同业×年份', '公司层面', '较强：阈值不连续'],
  ['4', 'ISS 同业新增与排除', '公司—同业—年度', 'Dropped / Added by ISS', '下一年新增或排除同业', '公司×年份、同业×年份', '公司层面', '较强：动态响应'],
  ['5', '被动投资横截面', '公司—年度', '被动持股及与 ISS 同向投票倾向', '规模离散度、偏离度、ISS 一致性', '行业×年份', '公司层面', '描述性关联'],
  ['6', '较低 SOP 支持率', '匹配后的公司—年度', 'Weak SOP support × 事件年份', '同业组构成指标', '行业×年份、公司', '公司层面', '中等：匹配事件研究'],
  ['7', 'SOP 频率接近投票', 'Russell 3000 接近投票公司', 'Annual SOP frequency × Post', '同业组构成指标', '行业×年份', '公司层面', '最强：准随机投票结果'],
]

const resultRows = [
  ['事实发现', 'Figure 1 / Table II', 'CEO 薪酬离散度是否长期下降？', '中位数缩放后的离散度趋势与固定效应回归', '2007–2023 年整体薪酬离散度下降约 38%', 'analysis.do L12–136；L1550–1657'],
  ['事实发现', 'Figure 2', '收敛来自薪酬分布的哪一端？', '比较 SEC 规则前后各薪酬分位点变化', '2007–2023 年第 25 分位上升约 16%，第 75 分位下降约 20%', 'analysis.do L140–187'],
  ['证伪检验', 'Figure 3', '其他不受相同制度约束的群体是否同步下降？', '国际、私营公司及非前五高管安慰剂样本', '美国上市公司 CEO 的显著下降并未普遍出现在安慰剂组', 'analysis.do L193–279'],
  ['机制证据', 'Figure 4', '行业-规模基准化能否在模拟中产生类似下降？', '按 ISS 方法重建同业组并模拟目标薪酬百分位', '模拟离散度下降约 45%，与实际下降 38% 接近', 'prepare-simulations.do；analysis.do L283–334'],
  ['机制证据', 'Figure 5 / Table III–IV', '同业组是否变得更同质、更具网络聚类性？', '同业规模、行业偏离及 NetworkX 网络指标', '五项偏离指标下降，互惠性、传递性与聚类指标上升', 'analysis.do L338–521；L1661–1762'],
  ['制度证据', 'Figure 6 / Table VI–VIII', 'ISS 与被动投资是否影响同业选择？', 'ISS 排名、任意阈值、动态新增删除和被动持股', '阈值处入选概率由 22.9% 降至 14.9%；ISS 影响随时间增强', 'analysis.do L526–594；L1892–2150'],
  ['准实验结果', 'Figure 7 / Table IX–X', 'SOP 压力是否推动标准化？', '较低支持率事件研究和接近的投票频率结果', '更频繁 SOP 投票的公司在投票后更符合行业-规模标准，事前趋势相近', 'analysis.do L600–680；L2155–2206'],
]

const limitationCards = [
  ['作者直接识别的边界', '同业组选择与治理变化可能共同决定。SEC 时点、ISS 阈值和 SOP 接近投票缓解了内生性，但无法把所有制度力量压缩成单一随机实验。'],
  ['测量误差', '研究依据 ISS 公开方法构建合成同业组，而不是观察 ISS 的完整内部推荐过程；ISS conformity 因此可能存在非经典测量误差。'],
  ['样本与数据覆盖', 'Execucomp 主要覆盖较大型上市公司，AuditAnalytics、Equilar、ISS、Capital IQ 和 GMI 的历史覆盖及回填规则也可能影响样本组成。'],
  ['外部有效性', '美国强制披露、代理投票顾问集中度和 SOP 制度具有特殊性，结论不能机械外推至私营公司、非美国市场或非 CEO 高管。'],
  ['合理推断', '证据支持标准化与薪酬离散度下降相关，并支持若干制度渠道；但无法证明行业-规模基准化是全部下降的唯一原因。'],
  ['尚未验证的后果', '“一刀切”是否降低契约效率、人才配置和激励质量仍是开放问题。论文讨论了这些可能性，但没有直接估计福利损失。'],
]

const interpretationCards: Array<[string, string]> = [
  ['论文真正证明了什么', 'CEO 薪酬分布在 2007 年后明显收窄；行业-规模基准化与这一变化同步，并受到披露、ISS 和 SOP 等制度力量推动。'],
  ['论文没有证明什么', '它没有证明所有公司都采用同一薪酬函数，也没有直接证明薪酬趋同必然损害公司价值或经理人匹配效率。'],
  ['公司金融研究启示', '治理规则不仅影响均值，还会改变公司决策的横截面分布。制度标准化应被视为塑造公司异质性的经济力量。'],
  ['可扩展研究方向', '可进一步检验薪酬趋同是否削弱外部锦标赛激励，并影响风险承担、创新、经理人流动、公司绩效和行业收益同步性。'],
]

const replicationMap = [
  ['Figure 1 / Table II', 'analysis.do L12–136；L1550–1657', 'sample1.dta；sample2.dta', '年度中位数缩放、薪酬离散度、异常薪酬'],
  ['Figure 2', 'analysis.do L140–187', 'figure2.dta', '年度中位数、薪酬分位点、长表转换'],
  ['Figure 3', 'analysis.do L193–279', 'figure3a.dta；figure3b.dta', '国际、私营公司、非前五高管安慰剂指标'],
  ['Figure 4', 'prepare-simulations.do；analysis.do L283–334', 'simulation*.dta', 'ISS 合成同业组、随机目标百分位数'],
  ['Figure 5 / Table III–IV', 'analysis.do L338–521；L1661–1762', 'sample2.dta；网络 CSV', '相对规模、行业偏离、互惠性、传递性、聚类系数'],
  ['Figure 6 / Table VI–VIII', 'analysis.do L526–594；L1892–2150', 'figure6.dta；table6–8.dta', 'ISS rank、相对阈值、动态同业变化、被动持股'],
  ['Figure 7 / Table IX–X', 'analysis.do L600–680；L2155–2206', 'table9.dta；table10.dta', 'Weak SOP support、Annual SOP frequency、事件时间'],
]

function MechanismSection() {
  return (
    <div className="academic-section-content">
      <p className="section-lead">原文没有设定正式结构模型。以下内容将作者的理论叙述整理为概念机制，用于说明行业-规模基准化如何通过薪酬参照网络改变横截面薪酬分布。</p>
      <div className="mechanism-flow">
        {mechanismSteps.map(([title, description], index) => (
          <div className="mechanism-step" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <p>{description}</p>
            {index < mechanismSteps.length - 1 && <ArrowRight size={17} />}
          </div>
        ))}
      </div>
      <h3 className="analysis-heading">概念简式</h3>
      <div className="concept-formulas">
        <article>
          <small>中位数锚定</small>
          <div className="formula">Payᵢₜ = (1 − ωᵢₜ) · Fundamentalsᵢₜ + ωᵢₜ · Median(PeerPayᵢₜ)</div>
          <p>当制度监督提高同业基准权重 ωᵢₜ 时，公司薪酬更靠近同行群体中位数。该式是对原文机制的概念表达，不是作者估计的结构方程。</p>
        </article>
        <article>
          <small>组内与组间方差分解</small>
          <div className="formula">Var(Payₜ) = E₍g₎[Var(Payᵢₜ | g)] + Var₍g₎(E[Payᵢₜ | g])</div>
          <p>行业-规模基准化会压低组内方差，但总体离散度是否下降还取决于组间均值差异。因此作者使用模拟检验其净效应。</p>
        </article>
      </div>
      <h3 className="analysis-heading">制度压力如何提高偏离成本</h3>
      <div className="driver-grid">
        {institutionDrivers.map(([title, description]) => <article key={title}><strong>{title}</strong><p>{description}</p></article>)}
      </div>
      <h3 className="analysis-heading">可检验预测</h3>
      <div className="prediction-list">
        {mechanismPredictions.map(([id, prediction, output]) => (
          <div key={id}><strong>{id}</strong><p>{prediction}</p><span>{output}</span></div>
        ))}
      </div>
    </div>
  )
}

function DataAndSampleSection() {
  return (
    <div className="academic-section-content">
      <div className="sample-grid">
        {sampleCards.map((sample) => (
          <article key={sample.title}>
            <small>{sample.period}</small><h3>{sample.title}</h3>
            <dl><div><dt>样本规模</dt><dd>{sample.scale}</dd></div><div><dt>样本范围</dt><dd>{sample.scope}</dd></div><div><dt>主要用途</dt><dd>{sample.use}</dd></div></dl>
          </article>
        ))}
      </div>
      <div className="sample-rules">
        <strong>样本筛选与数据来源</strong>
        <p>披露同业组限定为 5–76 家公司；若超过 25% 的同业公司缺少薪酬数据则剔除该观测。薪酬和同业身份来自 Execucomp、AuditAnalytics、Equilar、ISS ECA、Capital IQ 与 GMI；会计数据来自 Compustat，股票数据来自 CRSP，机构持股来自 Refinitiv，投票结果来自 ISS Voting Analytics。</p>
      </div>
      <h3 className="analysis-heading">指标构建步骤</h3>
      <div className="metric-stack">
        {metricConstruction.map((metric) => (
          <article className="metric-card" key={metric.title}>
            <div><h3>{metric.title}</h3><code>{metric.formula}</code></div>
            <ol>{metric.steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol>
          </article>
        ))}
      </div>
    </div>
  )
}

function IdentificationSection() {
  return (
    <div className="academic-section-content">
      <p className="section-lead">论文并非依赖单一设计，而是把描述性事实、固定效应回归、制度时点、阈值不连续和接近投票结果组织成逐级增强的证据链。</p>
      <div className="evidence-table">
        <div className="evidence-row evidence-head"><span>级</span><span>设计</span><span>层级 / 处理</span><span>结果变量</span><span>固定效应 / 聚类</span><span>解释强度</span></div>
        {evidenceLadder.map(([level, design, unit, treatment, outcome, fixedEffects, cluster, strength]) => (
          <div className="evidence-row" key={level}>
            <strong>{level}</strong>
            <div><b>{design}</b><small>{unit}</small></div>
            <div><small>处理或变异</small><span>{treatment}</span></div>
            <div><span>{outcome}</span></div>
            <div><small>固定效应</small><span>{fixedEffects}</span><small>聚类：{cluster}</small></div>
            <em>{strength}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResultsSection() {
  return (
    <div className="academic-section-content">
      <div className="results-matrix">
        <div className="result-row result-head"><span>证据类型</span><span>输出</span><span>研究问题与方法</span><span>关键发现</span><span>代码</span></div>
        {resultRows.map(([type, output, question, method, finding, code]) => (
          <div className="result-row" key={output}>
            <strong>{type}</strong><b>{output}</b><div><span>{question}</span><small>{method}</small></div><p>{finding}</p>
            <a href={assetPath('reports/code-guide/index.md')} target="_blank" rel="noreferrer">{code}<ExternalLink size={11} /></a>
          </div>
        ))}
      </div>
      <h3 className="analysis-heading">Figure 1–7 原始输出</h3>
      <MainFigureGallery />
    </div>
  )
}

function LimitationsSection() {
  return <div className="argument-grid">{limitationCards.map(([title, body]) => <article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div>
}

type PersonalThought = {
  id: string
  title: string
  body: string
}

function InterpretationSection({
  paperId,
  initialCards = interpretationCards,
}: {
  paperId: string
  initialCards?: Array<[string, string]>
}) {
  const storageKey = `matrixecon:paper-thoughts:${paperId}`
  const defaultStorageKey = `matrixecon:paper-interpretation-defaults:${paperId}`
  const seededCards = useMemo(() => initialCards.map(([cardTitle, cardBody], index) => ({
    id: `default-${index}`,
    title: cardTitle,
    body: cardBody,
  })), [initialCards])
  const [defaultCards, setDefaultCards] = useState<PersonalThought[]>(seededCards)
  const [thoughts, setThoughts] = useState<PersonalThought[]>([])
  const [loaded, setLoaded] = useState(false)
  const [defaultCardsLoaded, setDefaultCardsLoaded] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingBody, setEditingBody] = useState('')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(defaultStorageKey)
      const parsedValue = stored ? JSON.parse(stored) : []
      const parsed = Array.isArray(parsedValue) ? parsedValue as Array<Partial<PersonalThought>> : []
      const isLegacyCeoDefault = paperId !== 'ceo-pay-dispersion'
        && parsed.length === interpretationCards.length
        && parsed.every((card, index) => (
          card.title === interpretationCards[index][0] && card.body === interpretationCards[index][1]
        ))
      const restored = seededCards.map((fallback, index) => {
        const storedCard = isLegacyCeoDefault ? undefined : parsed[index]
        return {
          id: fallback.id,
          title: typeof storedCard?.title === 'string' && storedCard.title.trim() ? storedCard.title : fallback.title,
          body: typeof storedCard?.body === 'string' && storedCard.body.trim() ? storedCard.body : fallback.body,
        }
      })
      setDefaultCards(restored)
    } catch {
      setDefaultCards(seededCards)
    } finally {
      setDefaultCardsLoaded(true)
    }
  }, [defaultStorageKey, paperId, seededCards])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      const parsedValue = stored ? JSON.parse(stored) : []
      const parsed = Array.isArray(parsedValue) ? parsedValue as Array<Partial<PersonalThought>> : []
      const normalized = parsed
        .filter((thought) => typeof thought.title === 'string' && typeof thought.body === 'string')
        .map((thought, index) => ({
          id: thought.id || `legacy-${index}`,
          title: thought.title || '我的思考',
          body: thought.body || '',
        }))
      setThoughts(normalized)
      window.localStorage.removeItem(`${storageKey}:next-number`)
    } catch {
      setThoughts([])
    } finally {
      setLoaded(true)
    }
  }, [storageKey])

  useEffect(() => {
    if (!defaultCardsLoaded) return
    try {
      window.localStorage.setItem(defaultStorageKey, JSON.stringify(defaultCards))
    } catch {
      // 本地存储不可用时，仍允许用户在当前会话中编辑。
    }
  }, [defaultCards, defaultCardsLoaded, defaultStorageKey])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(thoughts))
    } catch {
      // 本地存储不可用时，仍允许用户在当前会话中编辑。
    }
  }, [loaded, storageKey, thoughts])

  const addThought = () => {
    const content = body.trim()
    if (!content) return
    setThoughts((current) => [
      ...current,
      {
        id: window.crypto?.randomUUID?.() || `${Date.now()}-${current.length}`,
        title: title.trim() || '我的思考',
        body: content,
      },
    ])
    setTitle('')
    setBody('')
  }

  const startEditing = (thought: PersonalThought) => {
    setEditingId(thought.id)
    setEditingTitle(thought.title)
    setEditingBody(thought.body)
  }

  const saveEditing = () => {
    const content = editingBody.trim()
    if (!editingId || !content) return
    if (editingId.startsWith('default-')) {
      setDefaultCards((current) => current.map((card) => (
        card.id === editingId
          ? { ...card, title: editingTitle.trim() || card.title || '个人解读', body: content }
          : card
      )))
    } else {
      setThoughts((current) => current.map((thought) => (
        thought.id === editingId
          ? { ...thought, title: editingTitle.trim() || '我的思考', body: content }
          : thought
      )))
    }
    setEditingId(null)
  }

  return (
    <div className="interpretation-grid">
      {defaultCards.map((card, index) => (
        <article className="editable-interpretation-card personal-thought-card" key={card.id}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          {editingId === card.id ? (
            <div className="thought-edit-form">
              <input
                aria-label={`编辑第 ${index + 1} 条个人解读标题`}
                value={editingTitle}
                onChange={(event) => setEditingTitle(event.target.value)}
              />
              <textarea
                aria-label={`编辑第 ${index + 1} 条个人解读正文`}
                value={editingBody}
                onChange={(event) => setEditingBody(event.target.value)}
              />
              <div>
                <button type="button" onClick={saveEditing} disabled={!editingBody.trim()}>保存</button>
                <button type="button" className="secondary" onClick={() => setEditingId(null)}>取消</button>
              </div>
            </div>
          ) : (
            <>
              <div className="thought-card-actions">
                <button type="button" onClick={() => startEditing(card)} aria-label={`编辑第 ${index + 1} 条个人解读`}><Pencil size={13} /></button>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </>
          )}
        </article>
      ))}
      {thoughts.map((thought, thoughtIndex) => {
        const thoughtNumber = defaultCards.length + thoughtIndex + 1
        return (
        <article className="personal-thought-card" key={thought.id}>
          <span>{String(thoughtNumber).padStart(2, '0')}</span>
          {editingId === thought.id ? (
            <div className="thought-edit-form">
              <input
                aria-label={`编辑第 ${thoughtNumber} 条思考标题`}
                value={editingTitle}
                onChange={(event) => setEditingTitle(event.target.value)}
              />
              <textarea
                aria-label={`编辑第 ${thoughtNumber} 条思考正文`}
                value={editingBody}
                onChange={(event) => setEditingBody(event.target.value)}
              />
              <div>
                <button type="button" onClick={saveEditing} disabled={!editingBody.trim()}>保存</button>
                <button type="button" className="secondary" onClick={() => setEditingId(null)}>取消</button>
              </div>
            </div>
          ) : (
            <>
              <div className="thought-card-actions">
                <button type="button" onClick={() => startEditing(thought)} aria-label={`编辑第 ${thoughtNumber} 条思考`}><Pencil size={13} /></button>
                <button type="button" onClick={() => setThoughts((current) => current.filter((item) => item.id !== thought.id))} aria-label={`删除第 ${thoughtNumber} 条思考`}><Trash2 size={13} /></button>
              </div>
              <h3>{thought.title}</h3>
              <p>{thought.body}</p>
            </>
          )}
        </article>
        )
      })}
      <article className="thought-composer">
        <span>{String(defaultCards.length + thoughts.length + 1).padStart(2, '0')}</span>
        <h3>添加我的思考</h3>
        <input
          aria-label="思考标题"
          placeholder="标题（可选）"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          aria-label="思考正文"
          placeholder="随时记录你对这篇论文的新想法、质疑或研究延伸…"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <button type="button" onClick={addThought} disabled={!body.trim()}>
          <Plus size={14} />
          添加为第 {String(defaultCards.length + thoughts.length + 1).padStart(2, '0')} 条
        </button>
        <small>仅保存在当前浏览器中；刷新后保留，删除后自动连续重编号。</small>
      </article>
    </div>
  )
}

function PaperPage({ paper, english }: { paper: Paper; english: boolean }) {
  if (paper.id === 'excess-volatility-beyond-discount-rates') {
    return <ExcessVolatilityPaperPage paper={paper} english={english} />
  }

  if (paper.id === 'yield-curve-momentum') {
    return <YieldCurveMomentumPaperPage paper={paper} english={english} />
  }

  if (paper.id === 'contamination-bias-linear-regressions') {
    return <ContaminationBiasPaperPage paper={paper} english={english} />
  }

  if (paper.id === 'government-bond-risk-return') {
    return <GovernmentBondPaperPage paper={paper} english={english} />
  }

  if (paper.id === 'yield-curve-reconstruction') {
    return <YieldCurvePaperPage paper={paper} english={english} />
  }

  return <CeoPayPaperPage paper={paper} english={english} />
}

const excessVolatilityInterpretationCards: Array<[string, string]> = [
  ['论文真正证明了什么', '同一现金流的长期限价格在多个资产类别中系统性地比仿射 Q 模型允许的幅度更易波动；这种异常不是简单换一个贴现率过程就能消化的问题。'],
  ['论文没有证明什么', '论文没有证明所有仿射模型都无用，也没有证明市场一定非理性。它证明的是，在作者的期限结构内部一致性检验下，标准仿射 Q 限制被强烈拒绝。'],
  ['对资产定价研究的启示', '研究贴现率时不能只看单一期限或单一资产，还应检查同一现金流在期限结构上的跨方程限制是否同时成立。'],
  ['可扩展研究方向', '可以把类似方差比检验用于中国国债、利率互换、信用债期限结构和商品期货曲线，检验长期限价格是否存在同类超额波动。'],
]

function ExcessVolatilityPaperPage({ paper, english }: { paper: Paper; english: boolean }) {
  const sections = ['中文全文翻译', '研究问题', '核心贡献', '理论机制', '数据与样本', '识别策略', '主要结果图', '局限与争议', '个人解读', '复现报告']
  const reportPath = assetPath('reports/excess-volatility-beyond-discount-rates-replication-report.md')
  const pdfPath = assetPath('resources/giglio-kelly-2018-excess-volatility-beyond-discount-rates.pdf')
  const zipPath = assetPath('replication-assets/excess-volatility-beyond-discount-rates/QJEReplication.zip')
  const readmePath = assetPath('replication-assets/excess-volatility-beyond-discount-rates/QJEReplication/QJEReplication/readme.txt')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [reportOpen, setReportOpen] = useState(true)
  const [report, setReport] = useState('')
  const [reportError, setReportError] = useState('')

  useEffect(() => {
    if (!reportOpen || report || reportError) return

    fetch(reportPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setReport)
      .catch(() => setReportError(english ? 'Failed to load the replication report.' : '复现报告加载失败，请使用单独打开入口。'))
  }, [english, report, reportError, reportOpen, reportPath])

  return (
    <section className={`paper-detail-page${leftSidebarOpen ? '' : ' left-sidebar-collapsed'}${rightSidebarOpen ? '' : ' right-sidebar-collapsed'}`}>
      <aside className={`toc paper-sidebar${leftSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-left"
          type="button"
          onClick={() => setLeftSidebarOpen((value) => !value)}
          aria-label={leftSidebarOpen ? '收起左侧目录' : '展开左侧目录'}
          title={leftSidebarOpen ? '收起目录' : '展开目录'}
        >
          {leftSidebarOpen ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Contents' : '目录'}</h2>
          {sections.map((section, index) => <a href={`#section-${index}`} key={section}>{index + 1}. {section}</a>)}
        </div>
      </aside>

      <article className="paper-body">
        <div className="paper-kicker">{paper.field} / {paper.journal} {paper.year}</div>
        <h1>{english ? paper.title : paper.titleZh}</h1>
        <p className="paper-original-title">{paper.title}</p>
        <p className="paper-authors">{paper.authors}</p>
        <div className="paper-keywords">关键词：超额波动 · 仿射 Q 模型 · 方差比 · 期限结构 · 贴现率</div>

        <PaperSection id={0} title="中文全文翻译">
          <div className="status-callout">
            <CircleCheck size={18} />
            <div>
              <strong>本轮交付重点是复现报告</strong>
              <span>已完成 PDF 提取和复现包审计；全文中文逐句翻译尚未在本轮生成。后续翻译应按脚注锚点、LaTeX 公式和正文图表插入规范处理。</span>
            </div>
          </div>
        </PaperSection>

        <PaperSection id={1} title="研究问题">
          <div className="argument-grid">
            <article><strong>同一现金流的期限结构是否内部一致？</strong><p>若短端价格已经张成状态变量，长端价格是否仍表现出过度波动？</p></article>
            <article><strong>贴现率变化能否解释长期限价格波动？</strong><p>作者将折现率变化吸收到 Q 测度下的价格动态中，检验超额波动是否仍然存在。</p></article>
            <article><strong>异常是否跨资产类别存在？</strong><p>论文覆盖方差互换、期权、CDS、商品期货、通胀互换和美国国债期限结构。</p></article>
            <article><strong>可能机制是什么？</strong><p>论文逐一考察遗漏因子、长记忆、非线性、测量误差、误定价和自然预期模型。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={2} title="核心贡献">
          <div className="argument-grid">
            <article><strong>提出严格跨期限检验</strong><p>利用同一现金流不同期限价格的无套利内部一致性，而不是只解释单个资产收益。</p></article>
            <article><strong>把贴现率问题纳入 Q 测度</strong><p>在风险中性动态下检验价格限制，使“贴现率可变”本身不能成为逃避限制的万能解释。</p></article>
            <article><strong>给出多市场证据</strong><p>多个期限结构市场中长端价格波动超过短端隐含限制，说明现象不是单一市场微观结构噪声。</p></article>
            <article><strong>连接行为预期机制</strong><p>自然预期模型通过混合不同持久性的预测，打破迭代期望律并生成长期限超额波动。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={3} title="理论机制">
          <p className="section-lead">本文有正式资产定价限制。核心不是估计一个新贴现率，而是检验仿射 Q 测度下的期限结构载荷是否满足内部一致性。</p>
          <div className="concept-formulas">
            <article>
              <small>一因子现金流动态</small>
              <MathBlock latex={String.raw`x_t=\rho^Q x_{t-1}+\varepsilon_t^Q`} />
              <p>若现金流状态在 Q 测度下服从线性递推，不同期限远期价格的载荷必须呈几何结构。</p>
            </article>
            <article>
              <small>方差比统计量</small>
              <MathBlock latex={String.raw`VR_j=\frac{V_j^U}{V_j^R}`} />
              <p><MathInline latex={String.raw`V_j^U`} /> 是非限制解释方差，<MathInline latex={String.raw`V_j^R`} /> 是仿射限制下由短端价格推出的解释方差。</p>
            </article>
          </div>
          <div className="replication-pipeline">
            {[
              ['01', '短端张成状态变量', '用短期限价格估计潜在状态变量，并由模型推出长端载荷。'],
              ['02', '长端受限预测', '若仿射 Q 模型正确，长端价格可解释方差应等于短端隐含的受限方差。'],
              ['03', '比较受限与非限制方差', '计算方差比统计量，检验长期限价格是否出现过度波动。'],
              ['04', '稳健性与机制排查', '加入因素、长记忆、非线性、测量误差和交易检验，排除若干机械解释。'],
              ['05', '自然预期解释', '混合真实与外推预期会破坏迭代期望律，从而生成期限结构内部不一致。'],
            ].map(([step, title, body]) => <article key={step}><span>{step}</span><div><strong>{title}</strong><p>{body}</p></div></article>)}
          </div>
        </PaperSection>

        <PaperSection id={4} title="数据与样本">
          <div className="sample-grid">
            <article><small>核心数据</small><h3>多资产期限结构</h3><dl><div><dt>覆盖</dt><dd>期权、互换、CDS、期货、国债</dd></div><div><dt>文件</dt><dd><code>Data/alldata.mat</code></dd></div><div><dt>状态</dt><dd>本机可读取</dd></div></dl></article>
            <article><small>预生成结果</small><h3>回归与 Kalman 结果</h3><dl><div><dt>回归</dt><dd><code>results_regression_2.mat</code> 等</dd></div><div><dt>Kalman</dt><dd><code>kalmanresults.mat</code></dd></div><div><dt>状态</dt><dd>汇总脚本已跑通</dd></div></dl></article>
            <article><small>公开限制</small><h3>方差互换专有数据</h3><dl><div><dt>证据</dt><dd>源码注释标明 omitted</dd></div><div><dt>影响</dt><dd>Figure I / Table II 无法完整真实重跑</dd></div><div><dt>处理</dt><dd>标注为预生成结果核对</dd></div></dl></article>
            <article><small>辅助数据</small><h3>Fama-French 与 VIX</h3><dl><div><dt>文件</dt><dd><code>Data/other</code></dd></div><div><dt>用途</dt><dd>风险调整和交易策略分析</dd></div><div><dt>状态</dt><dd>材料已归档</dd></div></dl></article>
          </div>
        </PaperSection>

        <PaperSection id={5} title="识别策略">
          <div className="evidence-table">
            <div className="evidence-row evidence-head"><span>级</span><span>检验</span><span>处理对象</span><span>输出</span><span>识别含义</span><span>强度</span></div>
            {[
              ['1', '基准方差比', '短端价格张成的状态变量', 'Figure I / Table II', '长端价格波动是否超过仿射限制', '核心检验'],
              ['2', 'Kalman / MLE', '含测量误差状态空间模型', 'Table II', '确认噪声价格下方差比是否仍大于 1', '稳健性'],
              ['3', '遗漏因子检验', '加入第三个因子', 'Figure IV', '检验遗漏状态变量是否驱动结论', '机制排查'],
              ['4', 'ARFIMA 与 STAR', '长记忆和非线性过程', 'Figure V-VI / Table III-IV', '检验非标准现金流动态能否机械生成结果', '机制排查'],
              ['5', 'IV 测量误差检验', '实现方差与 VIX 工具变量', 'Figure VII', '检验短端测量误差是否解释过度波动', '稳健性'],
              ['6', '交易策略', '长端错定价与短端对冲组合', 'Table VI-VII / Figure VIII', '度量偏离的经济量级', '经济显著性'],
            ].map(([level, design, variable, output, inference, strength]) => (
              <div className="evidence-row" key={level}>
                <strong>{level}</strong><div><b>{design}</b><small>{variable}</small></div><div><span>{output}</span></div>
                <div><span>{inference}</span></div><div><small>聚焦</small><span>期限结构内部一致性</span></div><em>{strength}</em>
              </div>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={6} title="主要结果图">
          <div className="results-matrix">
            <div className="result-row result-head"><span>输出</span><span>问题</span><span>方法</span><span>关键发现</span><span>代码映射</span></div>
            {[
              ['Figure I / Table II', '长端是否过度波动？', '回归方差比 + KF-MLE', '多资产期限结构中方差比大于 1 的证据广泛存在。', 'Run_Regression / Run_Kalman / Summarize_Results'],
              ['Figure II', '仿射与非限制载荷差异？', '载荷比较', '长端载荷偏离短端隐含的几何递推。', 'figure2.m'],
              ['Figure III', '持久性滚动变化是否解释？', '滚动 Q 持久性', '滚动持久性调整不能消除长期限超额波动。', 'figure3.m'],
              ['Figure V / Table III', '长记忆是否解释？', 'ARFIMA 模拟', '极端设定可产生高方差比，但加入额外因子后限制显著减弱。', 'figure5_table3.m'],
              ['Figure VI / Table IV', '非线性是否解释？', 'STAR 模拟', '非线性通常不足以生成论文中观察到的量级。', 'figure6_table4.m'],
              ['Figure VII', '测量误差是否解释？', 'IV 调整', 'IV 方差比与 OLS 接近，削弱测量误差解释。', 'figure7.m'],
              ['Figure VIII / Table VI-VII', '偏离是否有经济量级？', '交易策略', '方差互换市场策略呈现较高样本外 Sharpe。', 'run_trade_vs / tables_figures_trade'],
              ['Figure IX', '自然预期能否匹配？', '行为预期校准', '混合预测可生成长期限超额波动。', 'figure9.m'],
            ].map(([output, question, method, finding, code]) => (
              <div className="result-row" key={output}>
                <strong>{output}</strong><b>{question}</b><div><span>{method}</span><small>QJE 2018</small></div><p>{finding}</p><code>{code}</code>
              </div>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={7} title="局限与争议">
          <div className="argument-grid">
            <article><strong>专有数据限制</strong><p>方差互换核心数据未完整公开，复制包明确剔除相关原始结果，限制第三方完整重跑。</p></article>
            <article><strong>路径与平台依赖</strong><p>作者脚本含 Mac/Dropbox 路径和 Mac MEX，Windows 下需要改路径并可能重新编译。</p></article>
            <article><strong>误定价解释不封闭</strong><p>高 Sharpe 可理解为误定价证据，也可能代表未捕捉风险补偿，作者对此保持谨慎。</p></article>
            <article><strong>行为模型不是唯一机制</strong><p>自然预期提供可行解释，但论文没有排除所有可能的非仿射理性模型。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={8} title="个人解读">
          <InterpretationSection key={paper.id} paperId={paper.id} initialCards={excessVolatilityInterpretationCards} />
        </PaperSection>

        <PaperSection id={9} title="复现报告">
          <div className="replication-verdict">
            <div><small>当前可支持的最强结论</small><strong>作者预生成结果已核对</strong><p>MATLAB R2024b 可读取核心 `.mat` 文件，并成功运行 `Summarize_Results.m`；由于专有数据、路径和 MEX 限制，不能标为完整真实复现。</p></div>
            <span>MATLAB</span>
          </div>
          <div className="replication-summary">
            <div><span>源码</span><strong>67 个 MATLAB 脚本</strong></div>
            <div><span>数据</span><strong>22 个 `.mat` 文件</strong></div>
            <div><span>本机验证</span><strong>汇总脚本通过</strong></div>
            <div><span>阻塞</span><strong className="pending-text">专有数据 / MEX</strong></div>
          </div>
          <div className="replication-map">
            <div className="replication-map-row replication-map-head"><span>论文输出</span><span>生成代码</span><span>主要输入</span><span>当前证据</span></div>
            {[
              ['Figure I / Table II', 'Run_Regression.m; Run_Kalman.m; Summarize_Results.m', 'alldata.mat; Regression Results; Kalman Results', '作者预生成结果可加载，汇总脚本通过'],
              ['Figure II-III', 'figure2.m; figure3.m', 'Data/alldata.mat', '源码与预生成 PDF 均存在'],
              ['Figure V-VII / Table III-IV', 'figure5_table3.m; figure6_table4.m; figure7.m', '模拟与方差互换输入', '源码存在，未完整重跑'],
              ['Table VI-VII / Figure VIII', 'run_trade_vs.m; tables_figures_trade.m', '交易策略输入和 Fama-French 因子', '源码存在，交易输出待重跑'],
              ['Figure IX', 'figure9.m', '自然预期模型参数与方差互换校准', '源码与预生成 PDF 存在'],
            ].map(([output, code, input, evidence]) => (
              <div className="replication-map-row" key={output}>
                <strong>{output}</strong><code>{code}</code><span>{input}</span><span>{evidence}</span>
              </div>
            ))}
          </div>
          <div className="report-actions">
            <button type="button" onClick={() => setReportOpen((value) => !value)}>
              <FileText size={16} />{reportOpen ? '收起完整报告' : '展开完整报告'}<ChevronDown className={reportOpen ? 'is-open' : ''} size={15} />
            </button>
            <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />单独打开报告<ExternalLink size={13} /></a>
            <a href={zipPath} target="_blank" rel="noreferrer"><Code2 size={16} />下载复制包<ExternalLink size={13} /></a>
          </div>
          {reportOpen && (
            <div className="translation-reader replication-report-reader">
              {!report && !reportError && <p className="translation-loading">正在加载复现报告...</p>}
              {reportError && <p className="translation-error">{reportError}</p>}
              {report && <TranslationMarkdown markdown={report} />}
            </div>
          )}
        </PaperSection>
      </article>

      <aside className={`paper-rail paper-sidebar${rightSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-right"
          type="button"
          onClick={() => setRightSidebarOpen((value) => !value)}
          aria-label={rightSidebarOpen ? '收起右侧复现状态' : '展开右侧复现状态'}
          title={rightSidebarOpen ? '收起复现状态' : '展开复现状态'}
        >
          {rightSidebarOpen ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Replication Status' : '复现状态'}</h2>
          <div className="verified-mark"><CircleCheck /><strong>结构审计完成</strong></div>
          <ManifestRow label="PDF" value="已归档" ok />
          <ManifestRow label={english ? 'Code' : '代码'} value={english ? 'Public' : '公开'} ok />
          <ManifestRow label={english ? 'Data' : '数据'} value={english ? 'Partly public' : '部分公开'} />
          <ManifestRow label="MATLAB" value="R2024b" ok />
          <ManifestRow label={english ? 'Run' : '运行'} value={english ? 'Summary OK' : '汇总通过'} ok />
          <h3>{english ? 'Resources' : '资源链接'}</h3>
          <a href={pdfPath} target="_blank" rel="noreferrer"><FileText size={16} />站内论文 PDF<ExternalLink size={13} /></a>
          <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />复现报告<ExternalLink size={13} /></a>
          <a href={readmePath} target="_blank" rel="noreferrer"><FileText size={16} />作者 readme<ExternalLink size={13} /></a>
          <a href={zipPath} target="_blank" rel="noreferrer"><Code2 size={16} />Dataverse 复制包<ExternalLink size={13} /></a>
          <a href="https://doi.org/10.1093/qje/qjx034" target="_blank" rel="noreferrer"><ExternalLink size={16} />期刊 DOI<ExternalLink size={13} /></a>
          <a href="https://doi.org/10.7910/DVN/JA8CFG" target="_blank" rel="noreferrer"><ExternalLink size={16} />Harvard Dataverse<ExternalLink size={13} /></a>
        </div>
      </aside>
    </section>
  )
}

const yieldCurveMomentumInterpretationCards: Array<[string, string]> = [
  ['论文真正证明了什么', '美国国债收益率曲线上存在一个月期限的时间序列动量；该动量主要由收益率水平因子变化驱动，并且不能被当期期限结构信息完全张成。'],
  ['论文没有证明什么', '论文没有证明所有期限结构模型都不可修正，也没有证明动量一定来自非理性；它证明的是标准设定很难自然生成这种未张成的过去收益预测力。'],
  ['对收益率曲线研究的启示', '重构收益率曲线之后，应进一步检验曲线是否张成未来债券收益、货币政策冲击和预期误差，而不是只评价定价误差。'],
  ['可扩展研究方向', '可将同样框架用于中国国债：检验国债收益率曲线动量、MLF/OMO/LPR 冲击后的漂移，以及中国收益率曲线是否存在未张成宏观状态。'],
]

function YieldCurveMomentumPaperPage({ paper, english }: { paper: Paper; english: boolean }) {
  const sections = ['中文全文翻译', '研究问题', '核心贡献', '理论机制', '数据与样本', '识别策略', '主要结果图', '局限与争议', '个人解读', '复现报告']
  const translationPath = assetPath('translations/yield-curve-momentum.md')
  const reportPath = assetPath('reports/yield-curve-momentum-replication-report.md')
  const pdfPath = assetPath('resources/sihvonen-2024-yield-curve-momentum.pdf')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [translationOpen, setTranslationOpen] = useState(true)
  const [reportOpen, setReportOpen] = useState(true)
  const [translation, setTranslation] = useState('')
  const [translationError, setTranslationError] = useState('')
  const [report, setReport] = useState('')
  const [reportError, setReportError] = useState('')

  useEffect(() => {
    if (!translationOpen || translation || translationError) return

    fetch(translationPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setTranslation)
      .catch(() => setTranslationError(english ? 'Failed to load the translation.' : '中文译稿加载失败，请使用单独打开入口。'))
  }, [english, translation, translationError, translationOpen, translationPath])

  useEffect(() => {
    if (!reportOpen || report || reportError) return

    fetch(reportPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setReport)
      .catch(() => setReportError(english ? 'Failed to load the replication report.' : '复现报告加载失败，请使用单独打开入口。'))
  }, [english, report, reportError, reportOpen, reportPath])

  return (
    <section className={`paper-detail-page${leftSidebarOpen ? '' : ' left-sidebar-collapsed'}${rightSidebarOpen ? '' : ' right-sidebar-collapsed'}`}>
      <aside className={`toc paper-sidebar${leftSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-left"
          type="button"
          onClick={() => setLeftSidebarOpen((value) => !value)}
          aria-label={leftSidebarOpen ? '收起左侧目录' : '展开左侧目录'}
          title={leftSidebarOpen ? '收起目录' : '展开目录'}
        >
          {leftSidebarOpen ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Contents' : '目录'}</h2>
          {sections.map((section, index) => <a href={`#section-${index}`} key={section}>{index + 1}. {section}</a>)}
        </div>
      </aside>

      <article className="paper-body">
        <div className="paper-kicker">{paper.field} / {paper.journal} {paper.year}</div>
        <h1>{english ? paper.title : paper.titleZh}</h1>
        <p className="paper-original-title">{paper.title}</p>
        <p className="paper-authors">{paper.authors}</p>
        <div className="paper-keywords">关键词：收益率曲线 · 时间序列动量 · 债券风险溢价 · FOMC 漂移 · 张成条件</div>

        <PaperSection id={0} title="中文全文翻译">
          <div className="translation-note translation-ready">
            <CircleCheck size={17} />
            <div>
              <strong>{english ? 'Chinese academic draft connected' : '中文学术译稿已接入'}</strong>
              <span>{english ? 'The translation preserves equations, figure/table numbers, and the main empirical structure.' : '译稿保留公式、图表编号与主要实证结构；表格数值完整复算需原始数据。'}</span>
            </div>
          </div>
          <div className="report-actions">
            <a href={pdfPath} target="_blank" rel="noreferrer"><FileText size={16} />打开论文 PDF<ExternalLink size={13} /></a>
            <a href={translationPath} target="_blank" rel="noreferrer"><FileText size={16} />单独打开译稿<ExternalLink size={13} /></a>
            <button type="button" onClick={() => setTranslationOpen((value) => !value)}>
              <FileText size={16} />{translationOpen ? '收起中文译稿' : '在线阅读中文译稿'}<ChevronDown className={translationOpen ? 'is-open' : ''} size={15} />
            </button>
          </div>
          {translationOpen && (
            <div className="translation-reader">
              {!translation && !translationError && <p className="translation-loading">正在加载中文译稿...</p>}
              {translationError && <p className="translation-error">{translationError}</p>}
              {translation && <TranslationMarkdown markdown={translation} />}
            </div>
          )}
        </PaperSection>

        <PaperSection id={1} title="研究问题">
          <div className="driver-grid">
            <article><strong>动量是否存在？</strong><p>美国国债不同期限债券的过去超额收益是否能预测未来超额收益？这种预测力集中在哪个回看期限？</p></article>
            <article><strong>期限结构形态如何？</strong><p>动量系数是否随债券期限变化，是否与一因子利率模型的含义一致？</p></article>
            <article><strong>是否被收益率曲线张成？</strong><p>控制当期收益率主成分后，过去收益是否仍能预测未来收益？</p></article>
            <article><strong>货币政策能否解释？</strong><p>收益率曲线动量是否只是 FOMC 公告后漂移或联邦基金目标利率变化的反映？</p></article>
          </div>
        </PaperSection>

        <PaperSection id={2} title="核心贡献">
          <div className="argument-grid">
            <article><strong>记录收益率曲线动量</strong><p>论文显示美国国债期限结构上存在一个月时间序列动量，且动量系数期限结构向下倾斜。</p></article>
            <article><strong>识别水平因子来源</strong><p>收益自协方差的主体部分由收益率第一主成分，也就是水平因子变化解释。</p></article>
            <article><strong>提出张成挑战</strong><p>过去收益在控制当期收益率主成分和宏观变量后仍有预测力，挑战标准期限结构模型。</p></article>
            <article><strong>连接 FOMC 与有限理性</strong><p>论文将动量与政策利率漂移、调查预期误差和忽略长期依赖的有限理性模型联系起来。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={3} title="理论机制">
          <p className="section-lead">论文的理论核心不是构造交易策略，而是指出标准期限结构模型中的张成条件无法解释过去收益的额外预测力。</p>
          <div className="concept-formulas">
            <article>
              <small>基准动量回归</small>
              <MathBlock latex={String.raw`rx_{t+1}^n = a + b\,rx_{t-h,t}^n + \varepsilon_{t+1}`} />
              <p>若 b &gt; 0，表示同期限债券过去收益可以预测未来收益。</p>
            </article>
            <article>
              <small>平均收益因子</small>
              <MathBlock latex={String.raw`\bar{rx}_t=\frac{1}{10}\sum_{n\in\{12,\ldots,120\}}rx_t^n`} />
              <p>强共同因子结构使单一平均收益因子可以概括大部分动量。</p>
            </article>
          </div>
          <div className="replication-pipeline">
            {[
              ['01', '过去收益显著', '一个月回看期的债券超额收益预测下月超额收益。'],
              ['02', '水平因子变化', '动量主要来自收益率水平因子的月度变化。'],
              ['03', '当期曲线无法张成', '控制收益率前五个主成分后，过去收益仍有预测力。'],
              ['04', '货币政策只解释一部分', 'FOMC 后漂移与动量相关，但不能完整解释长期限结果。'],
              ['05', '主体忽略长期依赖', '有限理性模型中主体低估因子较长滞后依赖，价格未完全反映过去状态。'],
              ['06', '预期误差支持机制', '调查短端利率预期误差与模型错设方向一致。'],
            ].map(([step, title, body]) => <article key={step}><span>{step}</span><div><strong>{title}</strong><p>{body}</p></div></article>)}
          </div>
        </PaperSection>

        <PaperSection id={4} title="数据与样本">
          <div className="sample-grid">
            <article><small>1971/08-2019/12</small><h3>Liu-Wu 零息收益率</h3><dl><div><dt>频率</dt><dd>月末</dd></div><div><dt>期限</dt><dd>1 个月至 10 年</dd></div><div><dt>用途</dt><dd>基准动量、PCA、水平因子分解</dd></div></dl></article>
            <article><small>1982 起</small><h3>FRED 政策利率</h3><dl><div><dt>变量</dt><dd>联邦基金目标利率及目标区间</dd></div><div><dt>用途</dt><dd>FOMC 漂移和目标利率分解</dd></div><div><dt>状态</dt><dd>公开可下载</dd></div></dl></article>
            <article><small>1989/10 起</small><h3>Consensus Economics</h3><dl><div><dt>变量</dt><dd>三个月国库券利率调查预测</dd></div><div><dt>用途</dt><dd>短端利率预期误差</dd></div><div><dt>状态</dt><dd>订阅或购买</dd></div></dl></article>
            <article><small>补充附录</small><h3>替代数据</h3><dl><div><dt>来源</dt><dd>GSW、Bloomberg、德国零息、债券指数和期货</dd></div><div><dt>用途</dt><dd>稳健性检验</dd></div><div><dt>状态</dt><dd>部分需终端权限</dd></div></dl></article>
          </div>
        </PaperSection>

        <PaperSection id={5} title="识别策略">
          <div className="evidence-table">
            <div className="evidence-row evidence-head"><span>级</span><span>检验</span><span>核心变量</span><span>输出</span><span>解释</span><span>强度</span></div>
            {[
              ['1', '基准动量回归', '同期限上月超额收益', 'Figure 1', '检验收益自相关是否显著', '描述性资产定价事实'],
              ['2', '平均收益因子', '不同期限上月收益均值', 'Table 2', '检验共同因子是否概括动量', '机制证据'],
              ['3', '水平因子分解', '收益率第一主成分变化', 'Table 3', '度量水平变化解释的自协方差份额', '机制证据'],
              ['4', '张成检验', '收益率前五个 PC', 'Figure 3', '检验过去收益是否被当期曲线张成', '核心反模型证据'],
              ['5', '宏观控制', '宏观因子、活动指数、趋势通胀', 'Figure 4-5', '排除宏观变量代理解释', '稳健性证据'],
              ['6', 'FOMC 分解', '目标利率变化', 'Figure 6 / Table 5-6', '区分收益率曲线动量与政策漂移', '机制分解'],
            ].map(([level, design, variable, output, inference, strength]) => (
              <div className="evidence-row" key={level}>
                <strong>{level}</strong><div><b>{design}</b><small>{variable}</small></div><div><span>{output}</span></div>
                <div><span>{inference}</span></div><div><small>估计</small><span>Newey-West 标准误，5 阶滞后</span></div><em>{strength}</em>
              </div>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={6} title="主要结果图">
          <div className="results-matrix">
            <div className="result-row result-head"><span>输出</span><span>问题</span><span>方法</span><span>关键发现</span><span>复现状态</span></div>
            {[
              ['Figure 1', '是否存在动量？', '不同回看期收益预测', '仅一个月回看期稳定显著。', '待数据复算'],
              ['Table 2', '能否用一个收益因子概括？', '平均过去收益因子预测', '预测力损失很小，长期限 R2 略升。', '待数据复算'],
              ['Table 3', '动量来自哪里？', '水平因子变化分解', '水平因子变化解释约 94% 自协方差。', '待数据复算'],
              ['Figure 3', '是否被当期曲线张成？', '控制收益率 PC', '过去收益仍显著。', '待数据复算'],
              ['Figure 6 / Table 5', 'FOMC 是否解释动量？', '目标利率变化分解', '短端解释更强，长端仍有残差动量。', '待数据复算'],
              ['Figure 7-8', '标准期限结构模型能否解释？', '仿射模型模拟', '标准 ACM 难以生成观测动量。', '无源码'],
            ].map(([output, question, method, finding, status]) => (
              <div className="result-row" key={output}>
                <strong>{output}</strong><b>{question}</b><div><span>{method}</span><small>收益率曲线动量</small></div><p>{finding}</p><span className="status-chip">{status}</span>
              </div>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={7} title="局限与争议">
          <div className="argument-grid">
            <article><strong>源码未公开</strong><p>当前无法核验宏观因子筛选、仿射模型估计和模拟细节，只能做文献级复现审计。</p></article>
            <article><strong>数据权限差异</strong><p>Liu-Wu 和 FRED 较易取得，但 Consensus Economics 与 Bloomberg 数据需要订阅或终端权限。</p></article>
            <article><strong>测量误差争议</strong><p>收益率曲线定价误差可能影响张成检验，作者通过多数据源稳健性回应，但仍值得用现金债逐笔数据检验。</p></article>
            <article><strong>有限理性并非唯一解释</strong><p>论文提出有限理性机制，但也承认原则上可能存在理性预期解释，只是需要更强参数限制和微观基础。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={8} title="个人解读">
          <InterpretationSection key={paper.id} paperId={paper.id} initialCards={yieldCurveMomentumInterpretationCards} />
        </PaperSection>

        <PaperSection id={9} title="复现报告">
          <div className="replication-verdict">
            <div><small>当前可支持的最强结论</small><strong>文献级复现审计完成</strong><p>没有源码和订阅数据，不能声称真实数据完整复现；已完成数据、变量、公式与图表映射。</p></div>
            <span>NO CODE</span>
          </div>
          <div className="report-actions">
            <button type="button" onClick={() => setReportOpen((value) => !value)}>
              <FileText size={16} />{reportOpen ? '收起完整报告' : '展开完整报告'}<ChevronDown className={reportOpen ? 'is-open' : ''} size={15} />
            </button>
            <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />单独打开报告<ExternalLink size={13} /></a>
          </div>
          {reportOpen && (
            <div className="translation-reader replication-report-reader">
              {!report && !reportError && <p className="translation-loading">正在加载复现报告...</p>}
              {reportError && <p className="translation-error">{reportError}</p>}
              {report && <TranslationMarkdown markdown={report} />}
            </div>
          )}
        </PaperSection>
      </article>

      <aside className={`paper-rail paper-sidebar${rightSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-right"
          type="button"
          onClick={() => setRightSidebarOpen((value) => !value)}
          aria-label={rightSidebarOpen ? '收起右侧复现状态' : '展开右侧复现状态'}
          title={rightSidebarOpen ? '收起复现状态' : '展开复现状态'}
        >
          {rightSidebarOpen ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Replication Status' : '复现状态'}</h2>
          <div className="verified-mark"><CircleCheck /><strong>文献级审计</strong></div>
          <ManifestRow label="PDF" value="已归档" ok />
          <ManifestRow label={english ? 'Code' : '代码'} value={english ? 'Not provided' : '未提供'} />
          <ManifestRow label={english ? 'Data' : '数据'} value={english ? 'Mixed access' : '公开/订阅'} />
          <ManifestRow label={english ? 'Run' : '运行'} value={english ? 'Not run' : '未运行'} />
          <h3>{english ? 'Resources' : '资源链接'}</h3>
          <a href={pdfPath} target="_blank" rel="noreferrer"><FileText size={16} />站内论文 PDF<ExternalLink size={13} /></a>
          <a href={translationPath} target="_blank" rel="noreferrer"><FileText size={16} />中文译稿<ExternalLink size={13} /></a>
          <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />复现报告<ExternalLink size={13} /></a>
          <a href="https://doi.org/10.1093/rof/rfae003" target="_blank" rel="noreferrer"><ExternalLink size={16} />期刊 DOI<ExternalLink size={13} /></a>
        </div>
      </aside>
    </section>
  )
}

const contaminationBiasApplications = [
  ['Project STAR', '实验', '5,868', '5,868', '小班与助教处理；学校固定效应'],
  ['Benhassine et al. (2015)', '实验', '11,074', '6,996', '有条件与标签现金转移'],
  ['Cole et al. (2013)', '实验', '132', '73', '保险营销处理组合'],
  ['de Mel et al. (2013)', '实验', '520', '520', '企业正规化处理'],
  ['Drexler et al. (2014)', '实验', '796', '796', '财务培训处理'],
  ['Duflo et al. (2015)', '实验', '9,116', '8,664', '教育与 HIV 信息处理'],
  ['Fryer and Levitt (2013)', '观察性', '8,806', '6,623', '儿童 IQ 的种族差异'],
  ['Rim et al. (2020)', '观察性', '4,037', '620', '多种族结果差异'],
  ['Weisburst (2019)', '观察性', '7,488', '7,488', '教育结果的种族差异'],
]

const contaminationBiasInterpretationCards: Array<[string, string]> = [
  ['论文真正证明了什么', '多个互斥处理与灵活控制变量共同进入线性回归时，目标处理系数一般会混入其他处理的异质性效应；清除遗漏变量偏误并不足以保证系数具有清晰的自身处理效应解释。'],
  ['论文没有证明什么', '论文没有声称所有多处理回归都存在严重偏误。污染偏误的经济量级取决于交叉处理权重的变异，以及这些权重与其他处理条件效应的协方差。'],
  ['对 DID 研究的启示', '多期、多组 DID 中的处理时点或动态效应可被视作多个处理状态，因此 TWFE 权重分解和污染偏误具有共同结构；研究者应明确每个系数实际比较了哪些状态。'],
  ['可扩展研究方向', '可把污染诊断扩展到多类别政策、剂量处理、行业冲击与机器学习异质性效应模型，并比较 ATE、EW 与 CW 在弱重叠样本中的稳健性和政策含义。'],
]

function ContaminationBiasPaperPage({ paper, english }: { paper: Paper; english: boolean }) {
  const sections = ['中文全文翻译', '研究问题', '核心贡献', '理论机制', '数据与样本', '识别策略', '主要结果图', '局限与争议', '个人解读', '复现报告']
  const translationPath = assetPath('translations/contamination-bias-linear-regressions.md')
  const reportPath = assetPath('reports/contamination-bias-replication-report.md')
  const pdfPath = assetPath('resources/goldsmith-pinkham-hull-kolesar-2024-contamination-bias.pdf')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [reportOpen, setReportOpen] = useState(true)
  const [translation, setTranslation] = useState('')
  const [translationError, setTranslationError] = useState('')
  const [report, setReport] = useState('')
  const [reportError, setReportError] = useState('')

  useEffect(() => {
    if (translation || translationError) return

    fetch(translationPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setTranslation)
      .catch(() => setTranslationError(english ? 'Failed to load the Chinese translation draft.' : '中文译稿加载失败，请使用单独打开入口。'))
  }, [english, translation, translationError, translationPath])

  useEffect(() => {
    if (!reportOpen || report || reportError) return

    fetch(reportPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setReport)
      .catch(() => setReportError(english ? 'Failed to load the replication report.' : '复现报告加载失败，请使用单独打开入口。'))
  }, [english, report, reportError, reportOpen, reportPath])

  return (
    <section className={`paper-detail-page${leftSidebarOpen ? '' : ' left-sidebar-collapsed'}${rightSidebarOpen ? '' : ' right-sidebar-collapsed'}`}>
      <aside className={`toc paper-sidebar${leftSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-left"
          type="button"
          onClick={() => setLeftSidebarOpen((value) => !value)}
          aria-label={leftSidebarOpen ? '收起左侧目录' : '展开左侧目录'}
          title={leftSidebarOpen ? '收起目录' : '展开目录'}
        >
          {leftSidebarOpen ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Contents' : '目录'}</h2>
          {sections.map((section, index) => <a href={`#section-${index}`} key={section}>{index + 1}. {section}</a>)}
        </div>
      </aside>

      <article className="paper-body">
        <div className="paper-kicker">{paper.field} / {paper.journal} {paper.year}</div>
        <h1>{english ? paper.title : paper.titleZh}</h1>
        <p className="paper-original-title">{paper.title}</p>
        <p className="paper-authors">{paper.authors}</p>
        <div className="paper-keywords">关键词：多处理回归 · 污染偏误 · 异质性处理效应 · 倾向得分 · 重叠权重 · DID</div>

        <PaperSection id={0} title="中文全文翻译">
          <div className="translation-note">
            <FileText size={17} />
            <div>
              <strong>{english ? 'Chinese translation in progress' : '中文全文翻译进行中'}</strong>
              <span>{english ? 'The first batch has been translated and will be appended as the remaining sections are completed.' : '已完成封面、摘要、引言和第 2 节；剩余正文、附录、表格与图注将继续追加。'}</span>
            </div>
          </div>
          <div className="translation-caveat">译稿不会展示英文原句或原文页码；脚注已放在对应正文段落之后，公式使用站内数学渲染。</div>
          <div className="report-actions">
            <a href={pdfPath} target="_blank" rel="noreferrer"><FileText size={16} />打开论文 PDF<ExternalLink size={13} /></a>
            <a href={translationPath} target="_blank" rel="noreferrer"><FileText size={16} />单独打开译稿<ExternalLink size={13} /></a>
            <a href="https://arxiv.org/abs/2106.05024" target="_blank" rel="noreferrer"><FileText size={16} />arXiv 页面<ExternalLink size={13} /></a>
          </div>
          {translationError && <div className="translation-caveat">{translationError}</div>}
          {translation ? <div className="translation-reader"><TranslationMarkdown markdown={translation} /></div> : <div className="translation-caveat">正在加载中文译稿...</div>}
        </PaperSection>

        <PaperSection id={1} title="研究问题">
          <div className="driver-grid">
            <article><strong>OLS 系数在平均什么？</strong><p>当多个互斥处理与灵活控制变量同时进入回归时，每个处理系数能否继续解释为该处理自身异质性效应的凸加权平均？</p></article>
            <article><strong>污染偏误从何而来？</strong><p>即使控制变量足以清除遗漏变量偏误，其他处理的效应为何仍会通过残差化权重进入目标处理系数？</p></article>
            <article><strong>如何诊断量级？</strong><p>污染权重的变异、其他处理效应的异质性，以及二者的协方差如何共同决定偏误大小？</p></article>
            <article><strong>如何重新选择估计目标？</strong><p>在强重叠或弱重叠环境下，ATE、逐处理 EW 与共同权重 CW 应如何取舍？</p></article>
          </div>
        </PaperSection>

        <PaperSection id={2} title="核心贡献">
          <div className="argument-grid">
            <article><strong>一般分解</strong><p>将每个多处理回归系数分解为自身处理效应加权项与其他处理效应造成的污染项。</p></article>
            <article><strong>区别于 OVB</strong><p>证明污染偏误可在遗漏变量偏误已经被正确控制后继续存在，二者属于不同识别问题。</p></article>
            <article><strong>效率导向方案</strong><p>提出最易估计权重 EW 与共同权重 CW，在避免污染的同时处理弱重叠和精度问题。</p></article>
            <article><strong>九项应用验证</strong><p>六项实验与三项观察性应用显示，污染偏误在倾向得分变异较大的观察性研究中更具实质性。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={3} title="理论机制">
          <p className="section-lead">以下是论文 Proposition 1 的核心分解，不是网站另行构造的结构模型。</p>
          <div className="concept-formulas">
            <article>
              <small>多处理回归系数</small>
              <MathBlock latex={String.raw`\beta_k = \mathbb{E}[\lambda_{kk}(W_i)\tau_k(W_i)] + \sum_{\ell\neq k}\mathbb{E}[\lambda_{k\ell}(W_i)\tau_\ell(W_i)]`} />
              <p>第一项是自身处理效应；第二项是其他处理效应进入目标系数形成的污染偏误。</p>
            </article>
            <article>
              <small>污染偏误的协方差表达</small>
              <MathBlock latex={String.raw`\mathbb{E}[\lambda_{k\ell}(W_i)\tau_\ell(W_i)] = \operatorname{Cov}(\lambda_{k\ell}(W_i),\tau_\ell(W_i))`} />
              <p>交叉处理权重均值为零，因此污染大小由权重与条件处理效应的协方差决定。</p>
            </article>
          </div>
          <div className="replication-pipeline">
            {[
              ['01', '多个互斥处理', '目标处理与其他处理共同进入同一线性回归。'],
              ['02', '控制变量残差化', '处理指标相互残差化，生成随控制变量变化的隐含权重。'],
              ['03', '其他处理效应异质', '若其他处理的条件效应随控制变量变化，污染具备来源。'],
              ['04', '权重与效应相关', '交叉处理权重与其他处理效应的协方差不为零。'],
              ['05', '目标系数被污染', '目标系数不再只代表目标处理自身的加权平均效应。'],
              ['06', '重新选择估计量', '根据重叠与比较目标选择 ATE、EW 或 CW。'],
            ].map(([step, title, body]) => (
              <article key={step}><span>{step}</span><div><strong>{title}</strong><p>{body}</p></div></article>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={4} title="数据与样本">
          <p className="section-lead">论文以 Project STAR 为详细案例，并从 AEA Data and Code Repository 的 2013–2022 年论文中选取八项多处理应用。</p>
          <div className="replication-audit-table">
            <div className="replication-audit-row replication-audit-head"><span>应用</span><span>类型</span><span>原样本</span><span>重叠样本与处理</span><span>状态</span></div>
            {contaminationBiasApplications.map(([study, type, original, overlap, treatment]) => (
              <div className="replication-audit-row" key={study}>
                <strong>{study}</strong><span>{type}</span><code>{original}</code><span>{overlap}；{treatment}</span><b data-grade={study === 'Project STAR' ? 'A' : 'C'}>{study === 'Project STAR' ? 'A' : 'C'}</b>
              </div>
            ))}
          </div>
          <div className="sample-rules">
            <strong>重叠样本规则</strong>
            <p>作者先检查每项研究是否满足处理重叠；若原样本失败，则删除缺乏充分处理比较的控制层级，再在最大可用重叠子样本中执行污染分解与替代估计。</p>
          </div>
        </PaperSection>

        <PaperSection id={5} title="识别策略">
          <div className="evidence-table">
            <div className="evidence-row evidence-head"><span>级</span><span>设计</span><span>分析对象</span><span>结果变量</span><span>推断与诊断</span><span>解释强度</span></div>
            {[
              ['1', 'PL 基准回归', '多个互斥处理与灵活控制', '原始处理系数', '异方差稳健或研究设定聚类标准误', '基准描述'],
              ['2', 'Proposition 1 分解', '处理系数隐含权重', 'OWN 与污染偏误', '污染偏误差异的影响函数标准误', '偏误诊断'],
              ['3', '倾向得分变异检验', '多项 Logit 处理概率', '各处理倾向得分标准差', 'Wald 与 LM 检验', '污染风险诊断'],
              ['4', '替代估计', 'ATE / EW / CW', '不同目标总体的处理效应', '全样本与重叠样本比较', '无污染估计'],
            ].map(([level, design, unit, outcome, inference, strength]) => (
              <div className="evidence-row" key={level}>
                <strong>{level}</strong><div><b>{design}</b><small>{unit}</small></div><div><span>{outcome}</span></div>
                <div><span>{inference}</span></div><div><small>关键假设</small><span>条件独立、控制模型张成与相应重叠条件</span></div><em>{strength}</em>
              </div>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={6} title="主要结果图">
          <div className="embedded-figure-grid">
            <figure className="translation-figure-card">
              <img src={assetPath('figures/contamination-bias/figure-1-contamination-bias.png')} alt="九项应用中的污染偏误" loading="lazy" />
              <figcaption><strong>Figure 1：九项应用中的污染偏误</strong><p>两项观察性研究出现经济和统计上显著的污染偏误，六项实验研究未发现显著证据。</p></figcaption>
            </figure>
            <figure className="translation-figure-card">
              <img src={assetPath('figures/contamination-bias/figure-2-estimator-comparison.png')} alt="不同无污染估计量比较" loading="lazy" />
              <figcaption><strong>Figure 2：PL、OWN、ATE、EW 与 CW 比较</strong><p>观察性应用中估计量差异更大，说明弱重叠下目标总体与权重方案具有实质影响。</p></figcaption>
            </figure>
          </div>
          <div className="results-matrix">
            <div className="result-row result-head"><span>证据类型</span><span>输出</span><span>研究问题与方法</span><span>关键发现</span><span>复现状态</span></div>
            {[
              ['详细案例', 'Table 1', 'Project STAR：PL、OWN、ATE、EW、CW', 'PL 第（1）列已用真实数据精确复核；实际污染偏误较小。', '真实数据部分复现'],
              ['样本诊断', 'Table 2', '九项应用的重叠样本与倾向得分变异', '观察性研究的倾向得分变异总体更大。', '作者结果已核对'],
              ['跨应用污染', 'Figure 1', '污染偏误 t 值与系数标准化分解', '显著污染集中在两项观察性应用。', '作者结果已核对'],
              ['估计目标比较', 'Figure 2', '五类估计量的标准化点估计', '观察性应用对权重方案更敏感。', '作者结果已核对'],
            ].map(([type, output, method, finding, status]) => (
              <div className="result-row" key={output}>
                <strong>{type}</strong><b>{output}</b><div><span>{method}</span><small>多处理回归污染诊断</small></div><p>{finding}</p><span className="status-chip">{status}</span>
              </div>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={7} title="局限与争议">
          <div className="argument-grid">
            <article><strong>完整复现包未统一发布</strong><p>官方 `multe` 仓库是估计方法软件，不是一键生成论文全部表图的主复现工程。</p></article>
            <article><strong>应用材料分散</strong><p>八项扩展应用的原始材料位于不同 AEA 复现档案，需逐项恢复样本筛选和变量定义。</p></article>
            <article><strong>无污染不等于同一 estimand</strong><p>EW 对不同处理使用不同权重，虽消除污染，却不允许直接解释处理间点估计差异。</p></article>
            <article><strong>模型依赖仍存在</strong><p>ATE、EW 与 CW 的实现仍依赖倾向得分、结果条件均值、重叠和标准误估计的相应设定。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={8} title="个人解读">
          <InterpretationSection key={paper.id} paperId={paper.id} initialCards={contaminationBiasInterpretationCards} />
        </PaperSection>

        <PaperSection id={9} title="复现报告">
          <div className="replication-verdict">
            <div><small>当前可支持的最强结论</small><strong>真实数据部分复现</strong><p>Project STAR Table 1 第（1）列已本机真实运行并匹配；其余结果完成结构审计或作者预生成结果核对。</p></div>
            <span>PARTIAL</span>
          </div>
          <div className="replication-summary">
            <div><span>论文</span><strong>70 页 · 正文与附录可提取</strong></div>
            <div><span>官方实现</span><strong>R + Stata `multe`</strong></div>
            <div><span>Project STAR</span><strong>5,868 条真实观测</strong></div>
            <div><span>PL 数值</span><strong>系数与 HC0 标准误匹配</strong></div>
            <div><span>扩展应用</span><strong className="pending-text">原始材料待逐项恢复</strong></div>
            <div><span>总体状态</span><strong className="pending-text">非完整数值复现</strong></div>
          </div>
          <div className="report-actions">
            <button type="button" onClick={() => setReportOpen((value) => !value)}>
              <FileText size={16} />{reportOpen ? '收起完整报告' : '展开完整报告'}<ChevronDown className={reportOpen ? 'is-open' : ''} size={15} />
            </button>
            <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />单独打开报告<ExternalLink size={13} /></a>
            <a href="https://github.com/kolesarm/multe" target="_blank" rel="noreferrer"><Code2 size={16} />R 官方源码<ExternalLink size={13} /></a>
            <a href="https://github.com/gphk-metrics/stata-multe" target="_blank" rel="noreferrer"><Code2 size={16} />Stata 官方源码<ExternalLink size={13} /></a>
          </div>
          {reportOpen && (
            <div className="translation-reader replication-report-reader">
              {!report && !reportError && <p className="translation-loading">正在加载完整复现报告…</p>}
              {reportError && <p className="translation-error">{reportError}</p>}
              {report && <TranslationMarkdown markdown={report} />}
            </div>
          )}
        </PaperSection>
      </article>

      <aside className={`paper-rail paper-sidebar${rightSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-right"
          type="button"
          onClick={() => setRightSidebarOpen((value) => !value)}
          aria-label={rightSidebarOpen ? '收起右侧复现状态' : '展开右侧复现状态'}
          title={rightSidebarOpen ? '收起复现状态' : '展开复现状态'}
        >
          {rightSidebarOpen ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Replication Status' : '复现状态'}</h2>
          <div className="verified-mark"><CircleCheck /><strong>部分真实复现</strong></div>
          <ManifestRow label="PDF" value="已归档" ok />
          <ManifestRow label="R / Stata" value="官方公开" ok />
          <ManifestRow label="STAR PL" value="已匹配" ok />
          <ManifestRow label="九项应用" value="部分材料" />
          <h3>{english ? 'Resources' : '资源链接'}</h3>
          <a href={pdfPath} target="_blank" rel="noreferrer"><FileText size={16} />站内论文 PDF<ExternalLink size={13} /></a>
          <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />完整复现报告<ExternalLink size={13} /></a>
          <a href="https://cran.r-project.org/package=multe" target="_blank" rel="noreferrer"><Code2 size={16} />CRAN `multe`<ExternalLink size={13} /></a>
          <a href="https://github.com/gphk-metrics/stata-multe" target="_blank" rel="noreferrer"><Code2 size={16} />Stata `multe`<ExternalLink size={13} /></a>
        </div>
      </aside>
    </section>
  )
}

const governmentBondPipeline = [
  ['01', '收益率与 ETF 数据', '美国 H15、中国国债收益率、Treasury ETF 和无风险利率。'],
  ['02', '持有期超额收益', '构造 1–10 年零息债券或不同期限 ETF 的月度超额收益。'],
  ['03', '标准化与 PCA', '对收益相关矩阵执行主成分分析，得到 Factor 1、Factor 2 及期限载荷。'],
  ['04', '风险量价分解', '把条件期望收益分解为条件波动率与夏普比率的乘积。'],
  ['05', '联立 GMM', '使用期限结构、VIX、滞后实现波动率及 ZLB 交互项估计两条方程。'],
  ['06', '债券层面映射', '将因子波动率和风险价格重新映射到各期限债券的波动率、夏普比率和风险溢价。'],
]

const governmentBondOutputRows = [
  ['Table 1', '美中零息债券因子结构与绩效', 'pca_revised.py', '四组真实运行；与参考结果最大差异 1.96×10⁻¹¹', 'A'],
  ['Table 2', '美国 Treasury ETF 因子结构与绩效', 'pca_revised.py', '真实运行；与参考结果最大差异 4.26×10⁻¹⁴', 'A'],
  ['Table 3', '美国因子波动率与夏普比率 GMM', 'T3new.do', '缺少 VIXrevised.dta，且本机无 Stata', 'C'],
  ['Table 4', '美国因子 GMM 的 ZLB 差异', 'T4new.do', '缺少 VIXrevised.dta，且本机无 Stata', 'C'],
  ['Table 5', '长周期收益可预测性稳健性', 'T5new.do', '作者说明提及，但复现包未包含脚本', 'D'],
  ['Table 6', '中国因子波动率与夏普比率 GMM', 'T6new.do', '作者说明提及，但复现包未包含脚本', 'D'],
  ['Figure 1–2', '市场规模与 MOVE 指数', 'Figures.xlsx', '作者预生成 Excel 图表已核对', 'B'],
  ['Figure 3–8', '美中因子与债券动态', 'Figures.xlsx', '21 个 Excel 图表可查看；完整生成链未提供', 'B-/C'],
]

const governmentBondFindings = [
  ['因子结构', 'Table 1–2', '美中政府债券超额收益都具有显著的第二定价因子，不能只用单一利率风险因子概括。'],
  ['美国风险量价', 'Table 3 / Figure 3–5', '美国因子波动率和风险价格都随时间变化；因子层面的分解揭示风险溢价变化并非只来自波动率。'],
  ['ZLB 时期', 'Table 4 / Figure 6', '零利率下限时期的风险量价关系具有不同特征，紧约束的稳定关系可能掩盖货币政策环境差异。'],
  ['中国市场', 'Table 6 / Figure 7–8', '中国的风险价格与风险数量呈更明显的负相关，说明美国样本中的关系不是无风险债券市场的普遍规律。'],
]

const governmentBondGaps = [
  ['G-01', '缺少 VIXrevised.dta', '直接阻断 Table 3–4 的 Stata 数据合并。'],
  ['G-02', '缺少 T5new.do', '无法审计和运行 Table 5 的五步回归。'],
  ['G-03', '缺少 T6new.do', '无法审计 Table 6，也使 Figure 7–8 的上游链不完整。'],
  ['G-04', '未提供作图脚本', 'Figures.xlsx 可核对作者结果，但不能证明图形由本机重新生成。'],
  ['G-05', 'Stata 环境缺失', '本机不能验证 GMM 优化、稳健协方差和用户扩展命令。'],
]

const governmentBondInterpretationCards: Array<[string, string]> = [
  ['论文真正证明了什么', '债券风险溢价的变化不能只归因于条件波动率。美国和中国样本都支持风险数量与风险价格分别随状态变化。'],
  ['论文没有证明什么', 'ZLB 与政策干预时期的差异不是随机处理效应，不能直接解释为货币政策对风险价格的因果影响。'],
  ['资产定价研究启示', '先在因子层面分解风险数量和风险价格，再映射回期限资产，有助于避免把高风险溢价机械解释为高波动率。'],
  ['可扩展研究方向', '可以加入流动性、投资者结构、央行资产负债表和跨境持仓，检验第二因子及风险量价关系的经济来源。'],
]

function GovernmentBondPaperPage({ paper, english }: { paper: Paper; english: boolean }) {
  const sections = ['中文全文翻译', '研究问题', '核心贡献', '理论机制', '数据与样本', '识别策略', '主要结果图', '局限与争议', '个人解读', '复现报告']
  const translationPath = assetPath('translations/government-bond-risk-return.md')
  const reportPath = assetPath('reports/government-bond-risk-return-replication-report.md')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [translationOpen, setTranslationOpen] = useState(true)
  const [translation, setTranslation] = useState('')
  const [translationError, setTranslationError] = useState('')
  const [reportOpen, setReportOpen] = useState(true)
  const [report, setReport] = useState('')
  const [reportError, setReportError] = useState('')

  useEffect(() => {
    if (!translationOpen || translation || translationError) return

    fetch(translationPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setTranslation)
      .catch(() => setTranslationError(english ? 'Failed to load the Chinese translation.' : '中文全文加载失败，请使用下载入口。'))
  }, [english, translation, translationError, translationOpen, translationPath])

  useEffect(() => {
    if (!reportOpen || report || reportError) return

    fetch(reportPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setReport)
      .catch(() => setReportError(english ? 'Failed to load the replication report.' : '复现报告加载失败，请使用下载入口。'))
  }, [english, report, reportError, reportOpen, reportPath])

  return (
    <section className={`paper-detail-page${leftSidebarOpen ? '' : ' left-sidebar-collapsed'}${rightSidebarOpen ? '' : ' right-sidebar-collapsed'}`}>
      <aside className={`toc paper-sidebar${leftSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-left"
          type="button"
          onClick={() => setLeftSidebarOpen((value) => !value)}
          aria-label={leftSidebarOpen ? '收起左侧目录' : '展开左侧目录'}
          title={leftSidebarOpen ? '收起目录' : '展开目录'}
        >
          {leftSidebarOpen ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Contents' : '目录'}</h2>
          {sections.map((section, index) => <a href={`#section-${index}`} key={section}>{index + 1}. {section}</a>)}
        </div>
      </aside>

      <article className="paper-body">
        <div className="paper-kicker">{paper.field} / {paper.journal} {paper.year}</div>
        <h1>{english ? paper.title : paper.titleZh}</h1>
        <p className="paper-original-title">{paper.title}</p>
        <p className="paper-authors">{paper.authors}</p>
        <div className="paper-keywords">关键词：政府债券 · 风险溢价 · 主成分分析 · 条件波动率 · 夏普比率 · GMM</div>

        <PaperSection id={0} title="中文全文翻译">
          <div className="translation-note translation-ready">
            <CircleCheck size={17} />
            <div>
              <strong>{english ? 'Full Chinese academic translation connected' : '全文中文学术译稿已接入'}</strong>
              <span>{english ? 'The full article, 26 footnotes, 8 figures, 6 tables, declarations, and references are included.' : '正文、26 条脚注、8 幅图、6 张表、作者声明与参考文献均已完整接入。'}</span>
            </div>
          </div>
          <div className="translation-actions">
            <button onClick={() => setTranslationOpen((value) => !value)}>
              <FileText size={16} />
              {translationOpen
                ? (english ? 'Collapse full text' : '收起全文')
                : (english ? 'Read full Chinese translation' : '在线阅读中文全文翻译')}
              <ChevronDown className={translationOpen ? 'is-open' : ''} size={15} />
            </button>
          </div>
          {translationOpen && (
            <div className="translation-reader">
              {!translation && !translationError && <p className="translation-loading">{english ? 'Loading full text...' : '正在加载全文…'}</p>}
              {translationError && <p className="translation-error">{translationError}</p>}
              {translation && <TranslationMarkdown markdown={translation} />}
            </div>
          )}
          <div className="translation-caveat">
            {english
              ? 'Figures and structured tables are placed next to their first substantive discussion. Footnotes follow the complete anchor paragraph, and all equations are rendered as mathematics.'
              : '图表均放置在正文首次实质性讨论附近；脚注位于锚点所在完整段落之后；全部公式以数学形式渲染。原图内部的英文坐标轴和变量名为保持原始结果而保留。'}
          </div>
          <div className="report-actions">
            <a href={assetPath('resources/carpenter-lu-whitelaw-2026-government-bond-risk-return.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />打开论文 PDF<ExternalLink size={13} /></a>
            <a href={translationPath} download><FileText size={16} />下载中文译稿</a>
          </div>
        </PaperSection>

        <PaperSection id={1} title="研究问题">
          <div className="driver-grid">
            <article><strong>风险因子有几个？</strong><p>美国和中国政府债券超额收益是否可以由单一利率风险因子解释，还是存在经济上重要的第二定价因子？</p></article>
            <article><strong>风险溢价为何变化？</strong><p>债券风险溢价的时间变化究竟来自风险数量，即条件波动率，还是来自风险价格，即条件夏普比率？</p></article>
            <article><strong>制度环境是否改变关系？</strong><p>美国零利率下限时期和中国政策干预时期，风险价格与风险数量的关系是否发生变化？</p></article>
            <article><strong>结论能否跨市场成立？</strong><p>美国政府债券市场的经验规律是否也是中国无违约政府债券市场的共同特征？</p></article>
          </div>
        </PaperSection>

        <PaperSection id={2} title="核心贡献">
          <div className="argument-grid">
            <article><strong>双因子事实</strong><p>用标准化期限收益的 PCA 识别两个具有不同期限载荷和绩效特征的定价因子。</p></article>
            <article><strong>风险量价分解</strong><p>把条件预期收益写成条件波动率与夏普比率的乘积，并允许两者由同一组状态变量分别驱动。</p></article>
            <article><strong>跨市场比较</strong><p>在美国和中国使用一致框架，识别风险价格与风险数量关系的市场差异。</p></article>
            <article><strong>货币政策状态</strong><p>通过 ZLB 交互项说明激进货币政策时期可能具有不同的风险补偿机制。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={3} title="理论机制">
          <p className="section-lead">论文从无套利定价出发，但核心贡献是灵活的实证分解，不是完整结构模型。下图展示从收益数据到风险价格与风险数量的计算链。</p>
          <div className="replication-pipeline">
            {governmentBondPipeline.map(([step, title, body]) => (
              <article key={step}>
                <span>{step}</span>
                <div><strong>{title}</strong><p>{body}</p></div>
              </article>
            ))}
          </div>
          <div className="concept-formulas">
            <article><small>风险溢价分解</small><MathBlock latex={String.raw`E_t[R_{j,t+1}] = \sigma_{j,t}\theta_{j,t}`} /><p>预期超额收益等于风险数量与单位风险价格的乘积。</p></article>
            <article><small>状态变量映射</small><MathBlock latex={String.raw`\sigma_{j,t}=X_t\beta_j^\sigma,\qquad \theta_{j,t}=X_t\beta_j^\theta`} /><p>期限结构、VIX 和滞后实现波动率可以对两条过程产生不同影响。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={4} title="数据与样本">
          <div className="sample-grid">
            <article><small>1976/07–2022/12</small><h3>美国零息债券</h3><dl><div><dt>期限</dt><dd>1–10 年</dd></div><div><dt>频率</dt><dd>月度超额收益</dd></div><div><dt>用途</dt><dd>Table 1、Table 3–4、Figure 3–6</dd></div></dl></article>
            <article><small>2004/05–2022/12</small><h3>中国零息债券</h3><dl><div><dt>期限</dt><dd>1–10 年</dd></div><div><dt>频率</dt><dd>月度超额收益</dd></div><div><dt>用途</dt><dd>Table 1、Table 6、Figure 7–8</dd></div></dl></article>
            <article><small>2007/02–2022/12</small><h3>美国 Treasury ETF</h3><dl><div><dt>期限桶</dt><dd>0–1 年至 20 年以上</dd></div><div><dt>处理</dt><dd>扣除 15 bp 年费</dd></div><div><dt>用途</dt><dd>Table 2 稳健性验证</dd></div></dl></article>
          </div>
          <h3 className="analysis-heading">关键指标构建</h3>
          <div className="argument-grid">
            <article><strong>Level</strong><p>由 2 年期零息收益率缩放构造，用于刻画收益率曲线整体水平。</p></article>
            <article><strong>Slope</strong><p>定义为 10 倍的 10 年期与 2 年期收益率之差。</p></article>
            <article><strong>Curvature</strong><p>定义为 10 倍的 6 年期收益率相对 2 年和 10 年收益率均值的偏离。</p></article>
            <article><strong>Realized Vol</strong><p>由因子收益绝对值乘以正态分布绝对值校正因子和年化系数构造。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={5} title="识别策略">
          <div className="evidence-table">
            <div className="evidence-row evidence-head"><span>级</span><span>设计</span><span>分析对象</span><span>结果变量</span><span>推断方式</span><span>解释强度</span></div>
            {[
              ['1', 'PCA 因子识别', '标准化期限超额收益相关矩阵', '解释方差、载荷、因子收益', '跨市场与跨时期比较', '描述性因子结构'],
              ['2', '联立 GMM', 'Factor 1 / Factor 2 月度收益', '条件波动率、夏普比率', '矩条件、稳健 z 统计和 Hansen J', '结构化时间序列证据'],
              ['3', 'ZLB 交互', '美国零利率下限与非 ZLB 时期', '系数水平与 ZLB 差异', 'Wald 联合检验', '状态异质性，不是外生政策实验'],
              ['4', '中美对照', '美国与中国政府债券市场', '风险量价相关性和债券风险溢价', '统一模型下的样本外部比较', '跨市场验证，不是因果识别'],
            ].map(([level, design, unit, outcome, inference, strength]) => (
              <div className="evidence-row" key={level}>
                <strong>{level}</strong><div><b>{design}</b><small>{unit}</small></div><div><span>{outcome}</span></div>
                <div><span>{inference}</span></div><div><small>固定效应 / 聚类</small><span>不适用；时间序列 GMM 稳健协方差</span></div><em>{strength}</em>
              </div>
            ))}
          </div>
        </PaperSection>

        <PaperSection id={6} title="主要结果图">
          <div className="results-matrix">
            <div className="result-row result-head"><span>证据类型</span><span>输出</span><span>研究问题与方法</span><span>关键发现</span><span>复现状态</span></div>
            {governmentBondFindings.map(([type, output, finding]) => (
              <div className="result-row" key={output}>
                <strong>{type}</strong><b>{output}</b><div><span>{finding}</span><small>PCA / 联立 GMM / 跨市场比较</small></div>
                <p>{finding}</p><span className="status-chip">{output.includes('Table 1') ? '已部分真实复现' : '作者结果已核对'}</span>
              </div>
            ))}
          </div>
          <div className="report-actions">
            <a href={assetPath('replication-assets/government-bond-risk-return/Figures.xlsx')} target="_blank" rel="noreferrer"><FileText size={16} />打开 Figure 1–8 工作簿<ExternalLink size={13} /></a>
          </div>
        </PaperSection>

        <PaperSection id={7} title="局限与争议">
          <div className="argument-grid">
            <article><strong>因子旋转与符号</strong><p>PCA 载荷符号本身可整体翻转，跨样本解释应关注经济方向和组合定义，而不是机械比较符号。</p></article>
            <article><strong>状态变量设定</strong><p>期限结构变量、VIX 和滞后波动率的线性形式可能遗漏非线性或制度变化。</p></article>
            <article><strong>ZLB 不是随机处理</strong><p>ZLB 交互揭示状态差异，但不能独立识别货币政策对风险价格的因果效应。</p></article>
            <article><strong>中国样本较短</strong><p>中国样本从 2004 年开始，制度、流动性和投资者结构差异限制与美国样本的直接等同比较。</p></article>
          </div>
        </PaperSection>

        <PaperSection id={8} title="个人解读"><InterpretationSection key={paper.id} paperId={paper.id} initialCards={governmentBondInterpretationCards} /></PaperSection>

        <PaperSection id={9} title="复现报告">
          <div className="replication-verdict">
            <div><small>当前可支持的最强结论</small><strong>真实数据部分复现</strong><p>Table 1–2 已真实运行并与作者参考结果匹配；Table 3–6 和 Figure 1–8 不具备完整执行证据。</p></div>
            <span>PARTIAL</span>
          </div>

          <div className="replication-summary">
            <div><span>复现包</span><strong>21 个文件 · 约 3.6 MB</strong></div>
            <div><span>源码</span><strong>3 个文件 · 2,248 行</strong></div>
            <div><span>PCA 运行</span><strong>4 / 4 组通过</strong></div>
            <div><span>参考结果</span><strong>浮点精度内一致</strong></div>
            <div><span>Stata GMM</span><strong className="pending-text">缺文件与运行环境</strong></div>
            <div><span>总体状态</span><strong className="pending-text">非完整数值复现</strong></div>
          </div>

          <h3 className="analysis-heading">证据等级</h3>
          <div className="replication-confidence">
            <article><span>A</span><div><strong>真实运行且数值匹配</strong><p>Table 1–2 的四份工作簿已生成，并与作者参考工作簿逐单元格比较。</p></div></article>
            <article><span>B</span><div><strong>作者预生成结果已核对</strong><p>Figures.xlsx 含 8 个工作表、21 个 Excel 图表，但未提供完整作图代码。</p></div></article>
            <article><span>C</span><div><strong>结构审计完成但被阻塞</strong><p>Table 3–4 的 GMM 方程、变量和输出已映射，缺少 VIXrevised.dta 和 Stata。</p></div></article>
            <article><span>D</span><div><strong>关键源码缺失</strong><p>Table 5–6 所需的 T5new.do、T6new.do 未包含在提供的复现包中。</p></div></article>
          </div>

          <h3 className="analysis-heading">输出级执行清单</h3>
          <div className="replication-audit-table">
            <div className="replication-audit-row replication-audit-head"><span>论文输出</span><span>内容</span><span>执行入口</span><span>证据 / 阻塞</span><span>级</span></div>
            {governmentBondOutputRows.map(([output, content, code, evidence, grade]) => (
              <div className="replication-audit-row" key={output}>
                <strong>{output}</strong><span>{content}</span><code>{code}</code><span>{evidence}</span><b data-grade={grade.charAt(0)}>{grade}</b>
              </div>
            ))}
          </div>

          <h3 className="analysis-heading">差异与缺口登记</h3>
          <div className="gap-register">
            {governmentBondGaps.map(([id, title, body]) => (
              <article key={id}><span>{id}</span><div><strong>{title}</strong><p>{body}</p></div></article>
            ))}
          </div>

          <div className="report-actions">
            <button type="button" onClick={() => setReportOpen((value) => !value)}>
              <FileText size={16} />{reportOpen ? '收起完整报告' : '展开完整报告'}<ChevronDown className={reportOpen ? 'is-open' : ''} size={15} />
            </button>
            <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />单独打开报告<ExternalLink size={13} /></a>
            <a href={assetPath('resources/government-bond-risk-return-readme.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />作者复现说明<ExternalLink size={13} /></a>
            <a href={assetPath('replication-assets/government-bond-risk-return/code/pca_revised.py')} target="_blank" rel="noreferrer"><Code2 size={16} />PCA 源码<ExternalLink size={13} /></a>
            <a href={assetPath('replication-assets/government-bond-risk-return/code/T3new.do')} target="_blank" rel="noreferrer"><Code2 size={16} />Table 3 源码<ExternalLink size={13} /></a>
            <a href={assetPath('replication-assets/government-bond-risk-return/code/T4new.do')} target="_blank" rel="noreferrer"><Code2 size={16} />Table 4 源码<ExternalLink size={13} /></a>
            <a href={assetPath('replication-assets/government-bond-risk-return/outputs/PCA_USA_197606_to_199001.xls')} target="_blank" rel="noreferrer"><FileText size={16} />美国早期 PCA 输出<ExternalLink size={13} /></a>
            <a href={assetPath('replication-assets/government-bond-risk-return/outputs/PCA_USA_198912_to_202301.xls')} target="_blank" rel="noreferrer"><FileText size={16} />美国后期 PCA 输出<ExternalLink size={13} /></a>
            <a href={assetPath('replication-assets/government-bond-risk-return/outputs/PCA_CHN_200404_to_202301.xls')} target="_blank" rel="noreferrer"><FileText size={16} />中国 PCA 输出<ExternalLink size={13} /></a>
            <a href={assetPath('replication-assets/government-bond-risk-return/outputs/PCA-UST-ETF.xls')} target="_blank" rel="noreferrer"><FileText size={16} />Treasury ETF PCA 输出<ExternalLink size={13} /></a>
          </div>

          {reportOpen && (
            <div className="translation-reader replication-report-reader">
              {!report && !reportError && <p className="translation-loading">正在加载完整复现报告…</p>}
              {reportError && <p className="translation-error">{reportError}</p>}
              {report && <TranslationMarkdown markdown={report} />}
            </div>
          )}
        </PaperSection>
      </article>

      <aside className={`paper-rail paper-sidebar${rightSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-right"
          type="button"
          onClick={() => setRightSidebarOpen((value) => !value)}
          aria-label={rightSidebarOpen ? '收起右侧复现状态' : '展开右侧复现状态'}
          title={rightSidebarOpen ? '收起复现状态' : '展开复现状态'}
        >
          {rightSidebarOpen ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Replication Status' : '复现状态'}</h2>
          <div className="verified-mark"><CircleCheck /><strong>部分真实复现</strong></div>
          <ManifestRow label="Table 1–2" value="已匹配" ok />
          <ManifestRow label="Table 3–4" value="受阻" />
          <ManifestRow label="Table 5–6" value="脚本缺失" />
          <ManifestRow label="Figures" value="预生成" ok />
          <h3>{english ? 'Resources' : '资源链接'}</h3>
          <a href="https://doi.org/10.1016/j.jfineco.2025.104224" target="_blank" rel="noreferrer"><FileText size={16} />期刊 DOI<ExternalLink size={13} /></a>
          <a href={reportPath} target="_blank" rel="noreferrer"><FileText size={16} />完整复现报告<ExternalLink size={13} /></a>
          <a href={assetPath('replication-assets/government-bond-risk-return/Figures.xlsx')} target="_blank" rel="noreferrer"><FileText size={16} />作者图形工作簿<ExternalLink size={13} /></a>
        </div>
      </aside>
    </section>
  )
}

const yieldCurveMechanismSteps = [
  ['CUSIP 级附息国债价格', '从 CRSP Treasuries 获取每只国债的价格、票息、到期日、现金流时点和证券特征，原始数据是不平衡的债券横截面。'],
  ['异常值顺序筛查', '论文使用透明的顺序算法识别并删除原始价格异常值，避免用临时规则处理短端和长端的噪声观测。'],
  ['现金流贴现方程', '每只附息债券价格由未来现金流折现得到，因此估计对象不是单只债券收益率，而是整条零息收益率函数。'],
  ['自适应核平滑带宽', '给定期限附近可观察证券越多，带宽越窄；附近证券越少，带宽越宽。带宽同时成为期限点信息含量的诊断指标。'],
  ['平衡零息曲线', '最终输出 1-360 个月恒定期限零息收益率，既保留短端 Treasury bills 信息，也在长端维持必要平滑。'],
  ['经济结论再评估', '用新曲线重做 CP 收益预测和 GK 过度波动检验，说明收益率曲线构造会改变资产定价结论。'],
]

const yieldCurveContributions = [
  ['数据贡献', '构造并公开维护日频和月频 Liu-Wu 零息收益率曲线，覆盖 1-360 个月期限点，使研究者可以直接使用平衡期限结构数据。'],
  ['方法贡献', '将非参数核平滑用于美国国债曲线重构，并提出面向 Treasury 到期结构的自适应带宽选择。'],
  ['诊断贡献', '公开带宽文件，把“某一期限附近有多少原始证券信息”显式化，帮助判断短端、10 年以上和 30 年端估计精度。'],
  ['经济贡献', '证明曲线构造不是中性预处理：CP 收益预测回归、spanning hypothesis 和 GK 过度波动检验会随曲线数据改变。'],
]

const yieldCurveSampleCards = [
  {
    title: '原始 Treasury 证券样本',
    period: '1961-2019 · 日频',
    scale: 'CRSP Treasuries CUSIP 级价格与现金流',
    scope: 'Treasury bills、notes、bonds；排除异常或不可用于估计的证券观测',
    use: '从附息证券价格反推恒定期限零息收益率曲线',
  },
  {
    title: 'Liu-Wu 零息收益率曲线',
    period: '1-360 个月 · 日频 / 月频',
    scale: '平衡期限点收益率、带宽与辅助诊断文件',
    scope: '论文样本到 2019 年；作者公开维护版本会继续更新',
    use: '替代 GSW 或 Fama-Bliss 数据，用于期限结构、债券风险溢价和长债价格研究',
  },
  {
    title: '经济应用样本',
    period: 'CP / GK 复现与扩展样本',
    scale: '远期利率、超额收益、主成分和长期债券价格',
    scope: '重做 Cochrane-Piazzesi 收益预测回归与 Giglio-Kelly 过度波动统计量',
    use: '检验新曲线是否改变经典资产定价结论',
  },
]

const yieldCurveMetricConstruction = [
  {
    title: '零息收益率 y(n)',
    formula: String.raw`\hat P_i = \sum_j CF_{ij}\exp\{-y(\nu_{ij})\nu_{ij}\}`,
    steps: ['读取每只国债的价格、票息和现金流日程', '把现金流映射到剩余期限 ν', '使用核权重在目标期限 n 附近拟合收益率函数', '输出 1-360 个月平衡期限点', '经济含义是从不平衡附息证券价格中提取无票息期限结构。'],
  },
  {
    title: '自适应带宽 h(n)',
    formula: String.raw`h(\nu)=\min\{\max\{3,h_l(\nu),h_r(\nu)\},120\}`,
    steps: ['在目标期限左右搜索可用现金流与证券信息', '当附近观测充足时使用较小带宽', '当长期端证券稀疏时扩大带宽以保证可估计', '论文设置最小和最大带宽边界，并用样本外表现选择关键参数', '经济含义是衡量该期限点估计依赖局部信息还是远端借用信息。'],
  },
  {
    title: '远期利率与 CP 预测因子',
    formula: String.raw`rx_{t+1}(n)=a_n+b_n'f_t+\varepsilon_{t+1}(n)`,
    steps: ['由零息收益率曲线计算一年至五年远期利率', '构造不同期限债券的一年期超额收益', '将超额收益回归到远期利率或其主成分上', '比较 LW、GSW 与 Fama-Bliss 的载荷形状和稳定性', '经济含义是检验债券风险溢价能否由稳定的收益预测因子刻画。'],
  },
  {
    title: 'Spanning hypothesis 主成分检验',
    formula: String.raw`rx_{t+1}=\alpha+\beta_1 PC1_t+\cdots+\beta_5 PC5_t+\varepsilon_{t+1}`,
    steps: ['从远期利率或收益率中提取主成分', '检验前三个因子之外 PC4、PC5 是否仍有预测力', '同时报告常规推断和 Bauer-Hamilton bootstrap', '比较不同曲线数据下高阶因子的显著性', '经济含义是判断传统 level-slope-curvature 是否足以张成债券风险溢价。'],
  },
  {
    title: 'GK 长债过度波动统计量',
    formula: String.raw`\text{Variance Ratio}=\frac{\operatorname{Var}(p_t^{u})}{\operatorname{Var}(p_t^{r})}`,
    steps: ['用长期零息收益率构造长债对数价格', '估计不施加无套利约束的价格波动', '再用仿射期限结构模型得到受约束价格波动', '比较 20、25、30 年期限的方差比', '经济含义是检验长期国债价格是否比标准无套利模型允许的波动更大。'],
  },
  {
    title: '定价误差指标',
    formula: 'RMSPE / WRMSPE / MAPE / WMAPE / MAYE / Hit Rate',
    steps: ['用估计曲线回定价原始附息国债', '按期限桶统计价格误差、收益率误差和命中率', '分别报告样本内、leave-one-out 和时间序列样本外表现', '与 GSW 曲线及其替代设定比较', '经济含义是衡量曲线是否真正保留了原始证券价格信息。'],
  },
]

const yieldCurveEvidenceRows = [
  ['1', '数据构造对比', 'CUSIP 证券价格 → 零息曲线', 'LW vs. GSW / Fama-Bliss', '定价误差与带宽', '描述性与统计性能证据'],
  ['2', '带宽诊断', '目标期限附近原始证券密度', '横截面日期与全样本时间序列', '不同期限点 h(n)', '解释哪些期限依赖局部信息、哪些期限需要远端池化'],
  ['3', 'CP 收益预测回归', '远期利率预测超额收益', 'LW vs. GSW；原样本 vs. 扩展样本', '回归载荷和 R²', '资产定价含义强，但不是政策因果识别'],
  ['4', 'Spanning hypothesis', 'PC1-PC5 预测债券收益', '常规 t 统计与 Bauer-Hamilton bootstrap', 'PC4 / PC5 额外预测力', '检验三因子期限结构是否充分'],
  ['5', 'GK 过度波动', '长期零息债券价格', '非约束方差 vs. 无套利约束方差', '20/25/30 年方差比', '说明长端曲线构造影响过度波动结论'],
  ['6', '定价误差验证', '样本内、leave-one-out、时间序列样本外', 'LW vs. GSW 及在线附录稳健性设定', '价格误差、收益率误差、命中率', '最接近数据质量检验，但依赖 CRSP 原始数据权限'],
]

const yieldCurveResultRows = [
  ['方法证据', 'Figure 1-3', '原始国债到期结构是否支持恒定期限曲线？', '到期结构、特定日期带宽、全样本带宽时间序列', '短端信息密集，10 年以上尤其 30 年端经常需要更宽带宽；带宽文件本身可作为数据质量诊断。', 'fig-1-outstanding-treasuries.png；fig-2-bandwidth-selected-dates.png；fig-3-bandwidth-time-series.png'],
  ['收益预测', 'Figure 4-5 / Table 1', '收益率曲线构造是否影响 CP 结论？', '远期利率预测不同期限债券超额收益', 'LW 给出更稳定的 tent-shaped 载荷，并支持高阶主成分仍含预测信息；GSW 载荷跨样本更不稳定。', 'fig-4-cp-loadings-individual-excess-returns.png；fig-5-cp-loadings-average-excess-returns.png；table-1-cp-regression-results.png'],
  ['过度波动', 'Figure 6 / Table 2', '美国长期国债是否存在更强的 excess volatility？', 'GK 方差比与仿射期限结构模型对照', 'LW 下 20/25/30 年方差比高于 GSW，强化长期国债过度波动证据。', 'fig-6-excess-volatility.png；table-2-testing-excess-volatility.png'],
  ['曲线形态', 'Figure 7-10', 'LW 与 GSW 在收益率曲线形态和特定日期上哪里不同？', '无条件曲线、模型定价表现、短端误差和具体日期曲线对照', '差异集中在短端和长端；短端外推会影响更长期限现金流折现。', 'fig-7-8-yield-curve-pricing-errors.png；fig-9-10-short-end-and-selected-dates.png'],
  ['统计表现', 'Table 3-5 / Figure 11', '新曲线是否更好地保留原始价格信息？', '样本内误差、leave-one-out 和时间序列样本外预测', '论文报告 LW 在多数期限桶和误差指标上低于 GSW，短端改善尤其明显。', 'table-3-in-sample-performance.png；table-4-fig-11-leave-one-out.png；table-5-time-series-prediction.png'],
  ['稳健性', 'Appendix C / Online Appendix D-E', '结论是否依赖 CP 数据口径或 GSW 短端排除？', '正式附录稳健性和在线附录替代数据设定', 'Fama-Bliss 与加入短端证券的 GSW 结果帮助定位差异来源，但不替代完整源码复现。', 'table-c1-c2-lw-alternative-specifications.png；fig-d1-fama-bliss-cp-loadings.png'],
]

const yieldCurveLimitations = [
  ['作者源码缺失', '站内已接入论文、在线附录、译稿和图表截图，但本次材料未包含作者完整估计代码，因此不能逐行审计核平滑实现。'],
  ['CRSP 许可边界', '从 CUSIP 级原始价格完整重建曲线需要 CRSP Treasuries 许可。公开 Liu-Wu 数据支持下游复算，但不等同于原始数据复现。'],
  ['非参数选择仍含研究者判断', '带宽边界、关键参数、异常值处理和核函数选择都会影响曲线。论文提供系统规则，但这些规则仍可能影响长端估计。'],
  ['经济应用不是因果识别', 'CP 和 GK 应用说明数据构造会改变资产定价结论，但不是政策冲击或随机实验意义上的因果设计。'],
  ['长端信息稀疏', '长期国债发行和存量不连续，30 年端收益率有时需要从相距较远的证券借用信息，使用时应结合带宽诊断。'],
  ['外部适用性', '方法针对美国 Treasury 市场设计；直接移植到流动性较差、违约风险更高或现金流结构不同的债券市场需要重新验证。'],
]

const yieldCurveReplicationMap = [
  ['Figure 1-3', '论文 PDF 截图与译稿已接入；源码未公开', 'CRSP Treasuries CUSIP 价格、票息、到期结构', '到期结构、带宽 h(n)、异常值筛查'],
  ['Figure 4-5 / Table 1', '可用公开 LW/GSW/Fama-Bliss 数据复算；站内暂未接入作者代码', '零息收益率、远期利率、债券超额收益', 'CP 预测因子、主成分、Newey-West 与 Bauer-Hamilton bootstrap'],
  ['Figure 6 / Table 2', '需复刻 GK 长债价格与仿射期限结构模型', '长期零息收益率、长债价格、ATSM 状态变量', '方差比、无套利约束价格、长端价格误差'],
  ['Table 3-5 / Figure 11', '完整复现依赖 CRSP 原始债券价格；公开成品曲线不足以核对所有误差', '原始附息国债价格与现金流', 'RMSPE、WRMSPE、MAPE、WMAPE、MAYE、Hit Rate'],
  ['Appendix C / Online Appendix D-E', '正式附录和在线附录已接入站内；替代设定需后续代码化', '替代带宽、异常值规则、Fama-Bliss 与短端 GSW 设定', '稳健性表、CP 替代表、GSW 短端实验'],
]

const yieldCurveFigures = [
  { label: 'Figure 1：到期结构', file: 'liu-wu-yield-curve/crops/fig-1-outstanding-treasuries.png' },
  { label: 'Figure 2：带宽横截面', file: 'liu-wu-yield-curve/crops/fig-2-bandwidth-selected-dates.png' },
  { label: 'Figure 3：带宽时间序列', file: 'liu-wu-yield-curve/crops/fig-3-bandwidth-time-series.png' },
  { label: 'Figure 4：CP individual excess returns', file: 'liu-wu-yield-curve/crops/fig-4-cp-loadings-individual-excess-returns.png' },
  { label: 'Figure 5：CP average excess returns', file: 'liu-wu-yield-curve/crops/fig-5-cp-loadings-average-excess-returns.png' },
  { label: 'Table 1：CP regression results', file: 'liu-wu-yield-curve/crops/table-1-cp-regression-results.png' },
  { label: 'Figure 6：GK excess volatility statistic', file: 'liu-wu-yield-curve/crops/fig-6-excess-volatility.png' },
  { label: 'Table 2：excess volatility tests', file: 'liu-wu-yield-curve/crops/table-2-testing-excess-volatility.png' },
  { label: 'Figure 7-8：曲线形态与定价误差', file: 'liu-wu-yield-curve/crops/fig-7-8-yield-curve-pricing-errors.png' },
  { label: 'Figure 9-10：短端误差与特定日期', file: 'liu-wu-yield-curve/crops/fig-9-10-short-end-and-selected-dates.png' },
  { label: 'Table 3-5 / Figure 11：统计表现', file: 'liu-wu-yield-curve/crops/table-4-fig-11-leave-one-out.png' },
]

function YieldCurveResearchQuestionSection() {
  return (
    <div className="academic-section-content">
      <p className="section-lead">论文的核心问题不是“怎样预测利率”，而是一个更基础的数据问题：如何从非平衡的美国国债附息证券价格中，构造能同时保留短端、长端和局部期限结构信息的平衡零息收益率曲线？</p>
      <div className="driver-grid">
        <article><strong>数据构造问题</strong><p>现有 Fama-Bliss 期限短且月频，GSW 排除短端证券并依赖参数化形式。论文追问这些处理是否会丢失原始债券价格中的经济信息。</p></article>
        <article><strong>资产定价问题</strong><p>如果换一条更贴近原始价格的收益率曲线，CP 债券风险溢价预测和 GK 长债过度波动结论是否会改变？</p></article>
      </div>
    </div>
  )
}

function YieldCurveContributionSection() {
  return <div className="driver-grid">{yieldCurveContributions.map(([title, body]) => <article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div>
}

function YieldCurveMechanismSection() {
  return (
    <div className="academic-section-content">
      <p className="section-lead">本文没有提出新的结构性期限结构理论模型。第 4 部分应理解为“数据生成机制”：原始附息债券价格如何通过核平滑和自适应带宽转化为可用于实证资产定价的零息曲线。</p>
      <div className="mechanism-flow">
        {yieldCurveMechanismSteps.map(([title, description], index) => (
          <div className="mechanism-step" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <p>{description}</p>
            {index < yieldCurveMechanismSteps.length - 1 && <ArrowRight size={17} />}
          </div>
        ))}
      </div>
      <h3 className="analysis-heading">概念简式</h3>
      <div className="concept-formulas">
        <article>
          <small>附息债券定价约束</small>
          <div className="formula">{String.raw`\hat P_i = \sum_j CF_{ij}\exp\{-y(\nu_{ij})\nu_{ij}\}`}</div>
          <p>每只附息国债价格约束多个未来现金流的折现值。估计的目标是整条 y(ν) 函数，而不是逐只债券单独拟合。</p>
        </article>
        <article>
          <small>自适应带宽诊断</small>
          <div className="formula">{String.raw`h(n)=\min\{h_l(n),h_r(n)\}`}</div>
          <p>这是对论文带宽思想的机制表达。带宽越宽，越说明该期限点需要从更远期限借用信息，估计应更谨慎解释。</p>
        </article>
      </div>
    </div>
  )
}

function YieldCurveDataSection() {
  return (
    <div className="academic-section-content">
      <div className="sample-grid">
        {yieldCurveSampleCards.map((sample) => (
          <article key={sample.title}>
            <small>{sample.period}</small><h3>{sample.title}</h3>
            <dl><div><dt>样本规模</dt><dd>{sample.scale}</dd></div><div><dt>样本范围</dt><dd>{sample.scope}</dd></div><div><dt>主要用途</dt><dd>{sample.use}</dd></div></dl>
          </article>
        ))}
      </div>
      <div className="sample-rules">
        <strong>样本边界</strong>
        <p>论文正文的原始 CRSP 样本覆盖 1961 年 6 月至 2019 年 12 月。作者公开维护的数据版本可持续更新；网站说明中需要区分“论文估计样本”和“作者后续维护数据”。</p>
      </div>
      <h3 className="analysis-heading">指标构建步骤</h3>
      <div className="metric-stack">
        {yieldCurveMetricConstruction.map((metric) => (
          <article className="metric-card" key={metric.title}>
            <div><h3>{metric.title}</h3><code>{metric.formula}</code></div>
            <ol>{metric.steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol>
          </article>
        ))}
      </div>
    </div>
  )
}

function YieldCurveIdentificationSection() {
  return (
    <div className="academic-section-content">
      <p className="section-lead">这篇论文没有政策处理意义上的因果识别。它的可信度来自一条“数据质量证据阶梯”：先说明新曲线如何构造，再检验其是否改变经典资产定价结论，最后用多种误差指标验证是否更贴近原始证券价格。</p>
      <div className="evidence-table">
        <div className="evidence-row evidence-head"><span>级</span><span>设计</span><span>分析层级 / 变异</span><span>结果变量</span><span>对照或推断</span><span>解释强度</span></div>
        {yieldCurveEvidenceRows.map(([level, design, unit, benchmark, outcome, strength]) => (
          <div className="evidence-row" key={level}>
            <strong>{level}</strong>
            <div><b>{design}</b><small>{unit}</small></div>
            <div><small>比较对象</small><span>{benchmark}</span></div>
            <div><span>{outcome}</span></div>
            <div><small>固定效应 / 聚类</small><span>不适用；以方法比较、Bootstrap 或样本外误差为主</span></div>
            <em>{strength}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

function YieldCurveResultsSection() {
  return (
    <div className="academic-section-content">
      <div className="results-matrix">
        <div className="result-row result-head"><span>证据类型</span><span>输出</span><span>研究问题与方法</span><span>关键发现</span><span>站内材料</span></div>
        {yieldCurveResultRows.map(([type, output, question, method, finding, file]) => (
          <div className="result-row" key={output}>
            <strong>{type}</strong><b>{output}</b><div><span>{question}</span><small>{method}</small></div><p>{finding}</p>
            <a href={assetPath(`replication-assets/liu-wu-yield-curve/${file.split('；')[0]}`)} target="_blank" rel="noreferrer">{file}<ExternalLink size={11} /></a>
          </div>
        ))}
      </div>
      <h3 className="analysis-heading">核心图表截图</h3>
      <div className="embedded-figure-grid main-figure-gallery">
        {yieldCurveFigures.map((asset) => <EmbeddedOutputCard asset={{ ...asset, kind: 'figure' }} key={asset.file} />)}
      </div>
    </div>
  )
}

function YieldCurveLimitationsSection() {
  return <div className="argument-grid">{yieldCurveLimitations.map(([title, body]) => <article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div>
}

function YieldCurvePaperPage({ paper, english }: { paper: Paper; english: boolean }) {
  const sections = ['中文全文翻译', '研究问题', '核心贡献', '理论机制', '数据与样本', '识别策略', '主要结果图', '局限与争议', '个人解读', '复现报告']
  const translationPath = assetPath('translations/reconstructing-the-yield-curve.md')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [translationOpen, setTranslationOpen] = useState(true)
  const [translation, setTranslation] = useState('')
  const [translationError, setTranslationError] = useState('')

  useEffect(() => {
    if (!translationOpen || translation || translationError) return

    fetch(translationPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setTranslation)
      .catch(() => setTranslationError(english ? 'Failed to load the translation.' : '中文译稿加载失败，请使用下载入口。'))
  }, [english, translation, translationError, translationOpen, translationPath])

  return (
    <section className={`paper-detail-page${leftSidebarOpen ? '' : ' left-sidebar-collapsed'}${rightSidebarOpen ? '' : ' right-sidebar-collapsed'}`}>
      <aside className={`toc paper-sidebar${leftSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-left"
          type="button"
          onClick={() => setLeftSidebarOpen((value) => !value)}
          aria-label={leftSidebarOpen ? '收起左侧目录' : '展开左侧目录'}
          title={leftSidebarOpen ? '收起目录' : '展开目录'}
        >
          {leftSidebarOpen ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Contents' : '目录'}</h2>
          {sections.map((section, index) => <a href={`#section-${index}`} key={section}>{index + 1}. {section}</a>)}
        </div>
      </aside>

      <article className="paper-body">
        <div className="paper-kicker">{paper.field} / {paper.journal} {paper.year}</div>
        <h1>{english ? paper.title : paper.titleZh}</h1>
        <p className="paper-original-title">{paper.title}</p>
        <p className="paper-authors">{paper.authors}</p>
        <div className="paper-keywords">关键词：收益率曲线 · 利率期限结构 · 非参数核平滑 · 债券风险溢价</div>

        <PaperSection id={0} title="中文全文翻译">
          <div className="translation-note translation-ready">
            <CircleCheck size={17} />
            <div>
              <strong>{english ? 'Chinese academic draft connected' : '中文学术译稿已接入'}</strong>
              <span>{english ? 'Main article, formal appendices, online appendix, figures, tables, and replication notes are connected.' : '正文、正式附录、在线附录、图表与复现记录已接入。'}</span>
            </div>
          </div>
          <div className="translation-actions">
            <button onClick={() => setTranslationOpen((value) => !value)}>
              <FileText size={16} />
              {translationOpen
                ? (english ? 'Collapse Chinese draft' : '收起中文译稿')
                : (english ? 'Read Chinese draft' : '在线阅读中文译稿')}
              <ChevronDown className={translationOpen ? 'is-open' : ''} size={15} />
            </button>
          </div>
          {translationOpen && (
            <div className="translation-reader">
              {!translation && !translationError && <p className="translation-loading">{english ? 'Loading text...' : '正在加载正文…'}</p>}
              {translationError && <p className="translation-error">{translationError}</p>}
              {translation && <TranslationMarkdown markdown={translation} />}
            </div>
          )}
          <div className="translation-caveat">
            {english
              ? 'The current MatrixEcon entry records source files and code-search evidence. A full raw-data rebuild requires CRSP Treasuries and the missing author estimation code.'
              : '译稿按章节接入正文、正式附录 A-C 与在线附录 D-E；如需从原始债券数据完整重建曲线，仍需要 CRSP Treasuries 和未公开的作者估计代码。'}
          </div>
        </PaperSection>

        <PaperSection id={1} title="研究问题"><YieldCurveResearchQuestionSection /></PaperSection>
        <PaperSection id={2} title="核心贡献"><YieldCurveContributionSection /></PaperSection>
        <PaperSection id={3} title="理论机制"><YieldCurveMechanismSection /></PaperSection>
        <PaperSection id={4} title="数据与样本"><YieldCurveDataSection /></PaperSection>
        <PaperSection id={5} title="识别策略"><YieldCurveIdentificationSection /></PaperSection>
        <PaperSection id={6} title="主要结果图"><YieldCurveResultsSection /></PaperSection>
        <PaperSection id={7} title="局限与争议"><YieldCurveLimitationsSection /></PaperSection>
        <PaperSection id={8} title="个人解读"><InterpretationSection key={paper.id} paperId={paper.id} /></PaperSection>
        <PaperSection id={9} title="复现报告">
          <div className="replication-summary">
            <div><span>PDF 盘点</span><strong>正文、正式附录 A-C、在线附录 D-E</strong></div>
            <div><span>公开数据</span><strong>Liu-Wu monthly / daily yield data</strong></div>
            <div><span>图表材料</span><strong>Figure 1-11 · Table 1-5 · Appendix 图表</strong></div>
            <div><span>作者代码包</span><strong className="pending-text">未发现公开链接</strong></div>
            <div><span>原始数据复现</span><strong className="pending-text">需要 CRSP Treasuries 许可</strong></div>
            <div><span>当前状态</span><strong className="pending-text">结构审计完成，非完整数值复现</strong></div>
          </div>
          <div className="replication-confidence">
            <article><span>A</span><div><strong>高可信：论文文本与图表解释</strong><p>正文、正式附录、在线附录和站内图表截图已接入，可核对论文主张、图表顺序和术语。</p></div></article>
            <article><span>B</span><div><strong>中高可信：公开成品数据的下游复算</strong><p>使用作者维护的 Liu-Wu yield data 可以复算 CP / GK 类型下游检验，但这不是从原始证券价格重建曲线。</p></div></article>
            <article><span>C</span><div><strong>待验证：核平滑估计源码</strong><p>未发现该论文专属公开代码包，异常值删除、自适应带宽和曲线估计实现仍需复刻或获取源码。</p></div></article>
            <article><span>D</span><div><strong>不可宣称：真实数据完整复现</strong><p>缺少 CRSP Treasuries CUSIP 级原始数据权限和作者完整估计流程，不能写成“复现成功”。</p></div></article>
          </div>
          <h3 className="analysis-heading">论文输出—材料—数据—变量映射</h3>
          <div className="replication-map">
            <div className="replication-map-row replication-map-head"><span>论文输出</span><span>当前站内证据</span><span>主要输入</span><span>关键变量构造</span></div>
            {yieldCurveReplicationMap.map(([output, evidence, input, variables]) => (
              <div className="replication-map-row" key={output}>
                <strong>{output}</strong>
                <span>{evidence}</span>
                <code>{input}</code>
                <span>{variables}</span>
              </div>
            ))}
          </div>
          <div className="report-actions">
            <a href={assetPath('resources/liu-wu-2021-reconstructing-the-yield-curve.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />打开论文 PDF<ExternalLink size={13} /></a>
            <a href={assetPath('resources/liu-wu-2021-online-appendix.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />打开在线附录<ExternalLink size={13} /></a>
            <a href={translationPath} target="_blank" rel="noreferrer"><FileText size={16} />打开中文译稿<ExternalLink size={13} /></a>
            <a href="https://sites.google.com/view/jingcynthiawu/yield-data" target="_blank" rel="noreferrer"><ExternalLink size={16} />作者数据页<ExternalLink size={13} /></a>
          </div>
        </PaperSection>
      </article>

      <aside className={`paper-rail paper-sidebar${rightSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-right"
          type="button"
          onClick={() => setRightSidebarOpen((value) => !value)}
          aria-label={rightSidebarOpen ? '收起右侧复现状态' : '展开右侧复现状态'}
          title={rightSidebarOpen ? '收起复现状态' : '展开复现状态'}
        >
          {rightSidebarOpen ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Replication Status' : '复现状态'}</h2>
          <div className="verified-mark"><CircleCheck /><strong>{paper.status}</strong></div>
          <ManifestRow label={english ? 'Data' : '数据'} value={english ? 'Public' : '公开'} ok />
          <ManifestRow label={english ? 'Code' : '代码'} value={english ? 'Not found' : '未发现'} ok={false} />
          <ManifestRow label={english ? 'Run' : '运行'} value={english ? 'Not run' : '未运行'} />
          <ManifestRow label="CRSP" value={english ? 'Required' : '需要许可'} />
          <h3>{english ? 'Resources' : '资源链接'}</h3>
          <a href="https://doi.org/10.1016/j.jfineco.2021.05.059" target="_blank" rel="noreferrer"><FileText size={16} />期刊 DOI<ExternalLink size={13} /></a>
          <a href={assetPath('resources/liu-wu-2021-reconstructing-the-yield-curve.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />站内 PDF<ExternalLink size={13} /></a>
          <a href={assetPath('resources/liu-wu-2021-online-appendix.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />在线附录<ExternalLink size={13} /></a>
          <a href="https://sites.google.com/view/jingcynthiawu/yield-data" target="_blank" rel="noreferrer"><ExternalLink size={16} />Liu-Wu Yield Data<ExternalLink size={13} /></a>
        </div>
      </aside>
    </section>
  )
}

function CeoPayPaperPage({ paper, english }: { paper: Paper; english: boolean }) {
  const sections = ['中文全文翻译', '研究问题', '核心贡献', '理论机制', '数据与样本', '识别策略', '主要结果图', '局限与争议', '个人解读', '复现报告']
  const translationPath = assetPath('translations/why-have-ceo-pay-levels-become-less-diverse.md')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [translationOpen, setTranslationOpen] = useState(true)
  const [translation, setTranslation] = useState('')
  const [translationError, setTranslationError] = useState('')

  useEffect(() => {
    if (!translationOpen || translation || translationError) return

    fetch(translationPath)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then(setTranslation)
      .catch(() => setTranslationError(english ? 'Failed to load the translation.' : '全文译稿加载失败，请使用下载入口。'))
  }, [english, translation, translationError, translationOpen, translationPath])

  return (
    <section className={`paper-detail-page${leftSidebarOpen ? '' : ' left-sidebar-collapsed'}${rightSidebarOpen ? '' : ' right-sidebar-collapsed'}`}>
      <aside className={`toc paper-sidebar${leftSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-left"
          type="button"
          onClick={() => setLeftSidebarOpen((value) => !value)}
          aria-label={leftSidebarOpen ? '收起左侧目录' : '展开左侧目录'}
          title={leftSidebarOpen ? '收起目录' : '展开目录'}
        >
          {leftSidebarOpen ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Contents' : '目录'}</h2>
          {sections.map((section, index) => <a href={`#section-${index}`} key={section}>{index + 1}. {section}</a>)}
        </div>
      </aside>
      <article className="paper-body">
        <div className="paper-kicker">{paper.field} / {paper.journal} {paper.year}</div>
        <h1>{english ? paper.title : paper.titleZh}</h1>
        <p className="paper-original-title">{paper.title}</p>
        <p className="paper-authors">{paper.authors}</p>
        <div className="paper-keywords">关键词：CEO 薪酬 · 同质化 · 公司治理 · 劳动力市场</div>
        <PaperSection id={0} title="中文全文翻译">
          <div className="translation-note translation-ready">
            <CircleCheck size={17} />
            <div>
              <strong>{english ? 'Full sentence-by-sentence Chinese translation completed' : '全文中文逐句翻译已完成'}</strong>
              <span>{english ? '78 source pages, including the formal and Internet appendices. Chinese translation only.' : '共 78 个原稿页，包含正式附录与互联网附录，仅展示中文译文。'}</span>
            </div>
          </div>
          <div className="translation-actions">
            <button onClick={() => setTranslationOpen((value) => !value)}>
              <FileText size={16} />
              {translationOpen
                ? (english ? 'Collapse full text' : '收起全文')
                : (english ? 'Read full Chinese translation' : '在线阅读中文全文翻译')}
              <ChevronDown className={translationOpen ? 'is-open' : ''} size={15} />
            </button>
          </div>
          {translationOpen && (
            <div className="translation-reader">
              {!translation && !translationError && <p className="translation-loading">{english ? 'Loading full text...' : '正在加载全文…'}</p>}
              {translationError && <p className="translation-error">{translationError}</p>}
              {translation && <TranslationMarkdown markdown={translation} />}
            </div>
          )}
          <div className="translation-caveat">
            {english
              ? 'Figures and tables are embedded directly after their corresponding translated titles. Complex regression tables marked for layout review should be checked against the original PDF.'
              : '图形与表格已直接插入对应的中文图题或表题之后。复杂回归表中标注“版面提取顺序待核对”的位置，建议结合原始 PDF 版面复核。'}
          </div>
        </PaperSection>
        <PaperSection id={1} title="研究问题"><p>为什么不同公司之间的 CEO 薪酬水平逐渐趋同？这种变化来自公司特征、经理人特征，还是薪酬制定过程中的同业参照机制？</p></PaperSection>
        <PaperSection id={2} title="核心贡献"><ul><li>系统记录 CEO 薪酬横截面离散度的长期下降。</li><li>区分公司构成变化与薪酬制定机制变化。</li><li>提供同业比较和治理实践趋同的经验证据。</li></ul></PaperSection>
        <PaperSection id={3} title="理论机制"><MechanismSection /></PaperSection>
        <PaperSection id={4} title="数据与样本"><DataAndSampleSection /></PaperSection>
        <PaperSection id={5} title="识别策略"><IdentificationSection /></PaperSection>
        <PaperSection id={6} title="主要结果图"><ResultsSection /></PaperSection>
        <PaperSection id={7} title="局限与争议"><LimitationsSection /></PaperSection>
        <PaperSection id={8} title="个人解读"><InterpretationSection key={paper.id} paperId={paper.id} /></PaperSection>
        <PaperSection id={9} title="复现报告">
          <div className="replication-summary">
            <div><span>源码盘点</span><strong>9 个文件 · 8,114 行</strong></div>
            <div><span>图表映射</span><strong>Figure 1–7 · Table I–X</strong></div>
            <div><span>作者预生成输出</span><strong>结构与文件可验证</strong></div>
            <div><span>本机重新运行</span><strong className="pending-text">未执行：缺少 Stata 17 MP</strong></div>
            <div><span>真实数据</span><strong className="pending-text">受商业数据库许可限制</strong></div>
            <div><span>数值复现结论</span><strong className="pending-text">尚不能宣称完全复现</strong></div>
          </div>
          <div className="replication-confidence">
            <article><span>A</span><div><strong>高可信：源码与依赖关系</strong><p>真实源码已逐行读取，可确认文件职责、变量处理、回归命令及图表输出路径。</p></div></article>
            <article><span>B</span><div><strong>中高可信：作者预生成结果</strong><p>PDF、表格文本和工作簿能够与生成命令对应，但尚未在本机从原始数据重新生成。</p></div></article>
            <article><span>C</span><div><strong>待验证：真实数值复现</strong><p>AuditAnalytics、Equilar、ISS、Capital IQ、GMI、Refinitiv 等商业数据及 Stata 环境不可用。</p></div></article>
            <article><span>D</span><div><strong>解释边界：因果结论</strong><p>网站解释基于作者设计、论文结果与源码逻辑，不替代对原始数据的独立重估。</p></div></article>
          </div>
          <h3 className="analysis-heading">主要输出—代码—数据—变量映射</h3>
          <div className="replication-map">
            <div className="replication-map-row replication-map-head"><span>论文输出</span><span>生成代码</span><span>主要输入</span><span>关键变量构建</span></div>
            {replicationMap.map(([output, code, input, variables]) => (
              <div className="replication-map-row" key={output}>
                <strong>{output}</strong>
                <a href={assetPath('reports/code-guide/index.md')} target="_blank" rel="noreferrer">{code}<ExternalLink size={11} /></a>
                <code>{input}</code><span>{variables}</span>
              </div>
            ))}
          </div>
          <SourceCodeGuide />
          <div className="report-actions">
            <a href={assetPath('reports/ceo-pay-replication-report.md')} target="_blank" rel="noreferrer"><FileText size={16} />查看完整复现报告<ExternalLink size={13} /></a>
            <a href={assetPath('reports/code-guide/index.md')} target="_blank" rel="noreferrer"><Code2 size={16} />图表—代码映射总览<ExternalLink size={13} /></a>
            <a href={assetPath('resources/replication-instructions.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />作者复现说明<ExternalLink size={13} /></a>
          </div>
          <h3 className="asset-heading">伪数据执行演示</h3>
          <InlineOutputGallery compact />
        </PaperSection>
      </article>
      <aside className={`paper-rail paper-sidebar${rightSidebarOpen ? '' : ' is-collapsed'}`}>
        <button
          className="sidebar-toggle sidebar-toggle-right"
          type="button"
          onClick={() => setRightSidebarOpen((value) => !value)}
          aria-label={rightSidebarOpen ? '收起右侧复现状态' : '展开右侧复现状态'}
          title={rightSidebarOpen ? '收起复现状态' : '展开复现状态'}
        >
          {rightSidebarOpen ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="sidebar-content">
          <h2>{english ? 'Replication Status' : '复现状态'}</h2>
          <div className="verified-mark"><CircleCheck /><strong>{paper.status}</strong></div>
          <ManifestRow label={english ? 'Data' : '数据'} value={english ? 'Public' : '公开'} ok />
          <ManifestRow label={english ? 'Code' : '代码'} value={paper.code ? (english ? 'Public' : '公开') : (english ? 'Unavailable' : '未公开')} ok={paper.code} />
          <ManifestRow label={english ? 'Run' : '运行'} value={english ? 'Pending local run' : '待本地运行'} />
          <ManifestRow label="Stata" value="17.0 MP" />
          <h3>{english ? 'Resources' : '资源链接'}</h3>
          <a href="https://doi.org/10.1111/jofi.70050" target="_blank" rel="noreferrer"><FileText size={16} />期刊原文<ExternalLink size={13} /></a>
          <a href={assetPath('resources/replication-instructions.pdf')} target="_blank" rel="noreferrer"><FileText size={16} />复现说明<ExternalLink size={13} /></a>
          <a href="https://github.com/mengyaoqin009-bot/MatrixEcon" target="_blank" rel="noreferrer"><Code2 size={16} />复现代码<ExternalLink size={13} /></a>
        </div>
      </aside>
    </section>
  )
}

const replicationAssets = [
  { label: '正文图 1：薪酬离散度', file: 'figure-1-PanelA.pdf' },
  { label: '正文图 2：薪酬倍数分布变化', file: 'figure-2.pdf' },
  { label: '正文图 3：国际与非上市比较', file: 'figure-3-PanelA.pdf' },
  { label: '正文图 4：模拟结果', file: 'figure-4.pdf' },
  { label: '正文图 5：薪酬同业选择', file: 'figure-5-PanelA.pdf' },
  { label: '正文图 6：网络结构', file: 'figure-6.pdf' },
  { label: '正文图 7：Say-on-Pay', file: 'figure-7.pdf' },
  { label: '互联网附录图 IA.1', file: 'figure-A1.pdf' },
  { label: '互联网附录图 IA.2', file: 'figure-A2-PanelA.pdf' },
  { label: '互联网附录图 IA.3', file: 'figure-A3.pdf' },
  { label: '互联网附录图 IA.4', file: 'figure-A4-1.pdf' },
  { label: '互联网附录图 IA.5', file: 'figure-A5.pdf' },
  { label: '互联网附录图 IA.6', file: 'figure-A6.pdf' },
  { label: '互联网附录图 IA.7', file: 'figure-A7.pdf' },
  { label: '互联网附录图 IA.8', file: 'figure-A8.pdf' },
  { label: '互联网附录图 IA.9', file: 'figure-A9.pdf' },
]

const embeddedTables = [
  { label: '表 2A-1：行业-规模组薪酬离散度趋势', file: 'Table2a-1.txt' },
  { label: '表 2A-2：匹配行业同业薪酬离散度趋势', file: 'Table2a-2.txt' },
  { label: '表 2B：公司层面薪酬离散度趋势', file: 'Table2b.txt' },
  { label: '表 3A：同业公司特征趋势', file: 'Table3A.txt' },
  { label: '表 3B：同业组网络聚类趋势', file: 'Table3B.txt' },
  { label: '表 4：薪酬离散度与同业组构成', file: 'Table4.txt' },
  { label: '表 5A：SEC 披露规则与行业-规模组', file: 'Table5a.txt' },
  { label: '表 5B：SEC 披露规则与公司同业组', file: 'Table5b.txt' },
  { label: '表 6A：ISS 排名的重要性', file: 'Table6a.txt' },
  { label: '表 6B：ISS 阈值附近分析', file: 'Table6b.txt' },
  { label: '表 7A：ISS 与同业删除', file: 'Table7a.txt' },
  { label: '表 7B：ISS 与同业新增', file: 'Table7b.txt' },
  { label: '表 8：被动投资', file: 'Table8.txt' },
  { label: '表 9：薪酬方案表决权', file: 'Table9.txt' },
  { label: '表 10：接近临界结果的 SOP 频率投票', file: 'Table10.txt' },
  { label: '表 IA.1A：薪酬顾问的影响', file: 'TableA1-PanelA.txt' },
  { label: '表 IA.1B：薪酬顾问的影响', file: 'Table-A1-PanelB.txt' },
  { label: '表 IA.3A：行业规模与薪酬离散度', file: 'TableA3-1.txt' },
  { label: '表 IA.3B：行业规模与薪酬离散度', file: 'TableA3-2.txt' },
  { label: '表 IA.5：SOP 与薪酬离散度', file: 'TableA5.txt' },
]

type EmbeddedAsset = {
  label: string
  file: string
  kind: 'figure' | 'table'
  titles: string[]
}

const translationAssets: EmbeddedAsset[] = [
  ...replicationAssets.map((asset, index) => ({
    ...asset,
    kind: 'figure' as const,
    titles: index < 7
      ? [`图 ${index + 1}`]
      : [`图 IA.${index - 6}`],
  })),
  {
    ...embeddedTables[0],
    kind: 'table',
    titles: ['面板 A：行业-规模组内的薪酬离散度'],
  },
  {
    ...embeddedTables[2],
    kind: 'table',
    titles: ['面板 B：公司薪酬同业组内的薪酬离散度'],
  },
  {
    ...embeddedTables[3],
    kind: 'table',
    titles: ['面板 A：同业公司特征'],
  },
  {
    ...embeddedTables[4],
    kind: 'table',
    titles: ['面板 B：同业组的聚类化'],
  },
  { ...embeddedTables[5], kind: 'table', titles: ['表 4'] },
  { ...embeddedTables[6], kind: 'table', titles: ['面板 A：行业-规模组内的薪酬离散度'] },
  { ...embeddedTables[7], kind: 'table', titles: ['面板 B：公司层面的薪酬同业公司选择与薪酬离散度'] },
]

function textFromNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textFromNode).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children)
  return ''
}

function findTranslationAsset(title: string, insertedAssets = new Set<string>()) {
  const normalized = title.replace(/\s+/g, ' ').replace(/^#+\s*/, '').trim()
  return translationAssets.find((asset) => !insertedAssets.has(asset.file) && asset.titles.some((candidate) => {
    const pattern = new RegExp(`^${candidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[：:]|$)`)
    return pattern.test(normalized)
  }))
}

function isPaperPartTitle(title: string) {
  const normalized = title.trim()
  return normalized.length < 100 && (
    normalized === '摘要'
    || normalized === '披露声明'
    || /^(?:\d+(?:\.\d+)*[．.\s]|（[ivx]+）)/i.test(normalized)
    || /^(?:附录|网络附录|互联网附录|图\s*(?:IA\.)?\d+|表\s*(?:IA\.)?\d+|面板\s*[A-Z])/.test(normalized)
  )
}

function TranslationBlock({
  as: Tag,
  children,
}: {
  as: 'p' | 'h1' | 'h2' | 'h3' | 'h4'
  children: ReactNode
}) {
  const title = textFromNode(children).trim()
  const emphasize = isPaperPartTitle(title)

  return (
    <Tag className={emphasize ? 'translation-part-title' : undefined}>
      {emphasize && Tag === 'p' ? <strong>{children}</strong> : children}
    </Tag>
  )
}

const translationAssetMarker = '[[MATRIXECON_ASSET:'

const mainFigureBodyAnchors = [
  { file: 'figure-1-PanelA.pdf', pattern: /^图 1 绘制了/ },
  { file: 'figure-2.pdf', pattern: /^在图 2 中/ },
  { file: 'figure-3-PanelA.pdf', pattern: /^图 3A 将/ },
  { file: 'figure-4.pdf', pattern: /^图 4 同时绘制了/ },
  { file: 'figure-5-PanelA.pdf', pattern: /图 5A 绘制了/ },
  { file: 'figure-6.pdf', pattern: /^图 6 报告了/ },
  { file: 'figure-7.pdf', pattern: /如 (?:Figure|图) 7 所示/ },
]

const mainTableBlockDefinitions = [
  { id: 'table-2', start: /^\*\*表 2：/, anchor: /在表 2B 中/ },
  { id: 'table-3', start: /^\*\*表 3：/, anchor: /结果列于表 3/ },
  { id: 'table-4', start: /^\*\*表 4：/, anchor: /如表 4 所示/ },
  { id: 'table-5', start: /^\*\*表 5：/, anchor: /表 5B 的结果表明/ },
  { id: 'table-6', start: /^### 表 6：/, anchor: /表 6B 表明/ },
  { id: 'table-7', start: /^### 表 7：/, anchor: /表 7 报告了这两组分析的结果/ },
  { id: 'table-8', start: /^### 表 8：/, anchor: /(?:Table|表) 8 报告了检验结果/ },
  { id: 'table-9', start: /^### 表 9：/, anchor: /(?:Table|表) 9 报告了检验结果/ },
  { id: 'table-10', start: /^# 表 10：/, anchor: /(?:Table|表) 10 所报告的结果/ },
]

function isMainTableBlockStart(line: string) {
  const trimmed = line.trim()
  return mainTableBlockDefinitions.some((definition) => definition.start.test(trimmed))
}

function relocateMainTranslationTables(markdown: string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const ranges: Array<{ id: string; start: number; end: number }> = []
  const blocks = new Map<string, string[]>()

  for (let index = 0; index < lines.length; index += 1) {
    const definition = mainTableBlockDefinitions.find((candidate) => candidate.start.test(lines[index].trim()))
    if (!definition) continue

    let end = index + 1
    while (
      end < lines.length
      && !isMainTableBlockStart(lines[end])
      && !/^# 《为什么 CEO 薪酬水平的差异缩小了/.test(lines[end].trim())
    ) {
      end += 1
    }

    ranges.push({ id: definition.id, start: index, end })
    blocks.set(definition.id, lines.slice(index, end))
    index = end - 1
  }

  if (ranges.length === 0) return markdown

  const removedLineIndexes = new Set<number>()
  ranges.forEach((range) => {
    for (let index = range.start; index < range.end; index += 1) removedLineIndexes.add(index)
  })

  const insertedBlocks = new Set<string>()
  const relocatedLines = lines.flatMap((line, index) => {
    if (removedLineIndexes.has(index)) return []

    const out = [line]
    const trimmed = line.trim()
    mainTableBlockDefinitions.forEach((definition) => {
      const block = blocks.get(definition.id)
      if (!block || insertedBlocks.has(definition.id) || !definition.anchor.test(trimmed)) return
      out.push('', ...block, '')
      insertedBlocks.add(definition.id)
    })
    return out
  })

  const missingBlocks = [...blocks.entries()].filter(([id]) => !insertedBlocks.has(id))
  if (missingBlocks.length > 0) relocatedLines.push('', ...missingBlocks.flatMap(([, block]) => [...block, '']))

  return relocatedLines.join('\n')
}

function parseLooseTableRow(line: string, valueCount: number) {
  const matches = [...line.matchAll(/(?:<\s*)?-?\d+(?:\.\d+)?(?:\*{1,3})?/g)]
  if (matches.length < valueCount) return null

  const values = matches.slice(-valueCount).map((match) => match[0].replace(/\s+/g, ''))
  const firstValueIndex = matches[matches.length - valueCount].index ?? -1
  const label = line.slice(0, firstValueIndex).trim()
  if (!label) return null

  return [label, ...values]
}

function convertLooseBalanceTable(
  lines: string[],
  headingPattern: RegExp,
  nextHeadingPattern: RegExp,
  headers: string[],
) {
  const headingIndex = lines.findIndex((line) => headingPattern.test(line.trim()))
  if (headingIndex < 0) return lines

  const nextHeadingIndex = lines.findIndex((line, index) => index > headingIndex && nextHeadingPattern.test(line.trim()))
  const sectionEnd = nextHeadingIndex >= 0 ? nextHeadingIndex : lines.length
  const headerIndex = lines.findIndex((line, index) =>
    index > headingIndex
    && index < sectionEnd
    && line.includes('均值差异')
    && line.includes('中位数差异'),
  )
  if (headerIndex < 0) return lines

  const subHeaderIndex = lines.findIndex((line, index) =>
    index > headerIndex
    && index < sectionEnd
    && line.includes('差异值')
    && line.includes('p 值'),
  )
  if (subHeaderIndex < 0) return lines

  const dataStart = subHeaderIndex + 1
  let dataEnd = dataStart
  const rows: string[][] = []

  for (let index = dataStart; index < sectionEnd; index += 1) {
    const trimmed = lines[index].trim()
    if (!trimmed) {
      dataEnd = index + 1
      continue
    }

    const parsed = parseLooseTableRow(trimmed, headers.length - 1)
    if (!parsed) {
      dataEnd = index
      break
    }

    rows.push(parsed)
    dataEnd = index + 1
  }

  if (rows.length === 0) return lines

  const tableLines = [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map((_, index) => (index === 0 ? '---' : '---:')).join(' | ')} |`,
    ...rows.map((row) => `| ${row.join(' | ')} |`),
  ]

  return [
    ...lines.slice(0, headerIndex),
    '',
    ...tableLines,
    '',
    ...lines.slice(dataEnd),
  ]
}

function normalizeLooseTranslationTables(markdown: string) {
  let lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const balanceHeaders = [
    '变量',
    '相对排名 0：均值',
    '相对排名 0：中位数',
    '相对排名 1：均值',
    '相对排名 1：中位数',
    '均值差异',
    '均值差异 p 值',
    '中位数差异',
    '中位数差异 p 值',
  ]
  const sopFrequencyHeaders = [
    '变量',
    '1 年 SOP：均值',
    '1 年 SOP：中位数',
    '3 年 SOP：均值',
    '3 年 SOP：中位数',
    '均值差异',
    '均值差异 p 值',
    '中位数差异',
    '中位数差异 p 值',
  ]

  lines = convertLooseBalanceTable(lines, /^表 IA\.4：/, /^表 IA\.5：/, balanceHeaders)
  lines = convertLooseBalanceTable(lines, /^表 IA\.6：/, /^参考文献|^# /, sopFrequencyHeaders)

  return lines.join('\n')
}

function reflowTranslationFootnotes(markdown: string) {
  const paragraphs = markdown.replace(/\r\n/g, '\n').split(/\n{2,}/)
  const referencesIndex = paragraphs.findIndex((paragraph) => paragraph.trim() === '参考文献')
  const contentEnd = referencesIndex >= 0 ? referencesIndex : paragraphs.length
  const footnotes = new Map<number, string>()
  const footnoteIndexes = new Set<number>()

  for (let index = 0; index < contentEnd; index += 1) {
    const paragraph = paragraphs[index].trim()
    const match = paragraph.match(/^(\d{1,2})\s*(?=[\u3400-\u9fffA-Za-z])/)
    if (!match) continue

    const number = Number(match[1])
    if (number < 1 || number > 99 || footnotes.has(number)) continue
    footnotes.set(number, paragraph.replace(/^\d{1,2}\s*/, '').trim())
    footnoteIndexes.add(index)
  }

  if (footnotes.size === 0) return markdown

  const bodyParagraphs: string[] = []
  let removedFootnoteSinceLastBody = false
  const endsCompleteSentence = /(?:[。！？.!?；;：:”’"'）)\]〕]|[。！？；：）]\d{1,2}(?:[,，]\d{1,2})?)$/

  paragraphs.forEach((paragraph, index) => {
    if (footnoteIndexes.has(index)) {
      removedFootnoteSinceLastBody = true
      return
    }

    const trimmed = paragraph.trim()
    const previous = bodyParagraphs.at(-1)
    const canJoinPrevious = removedFootnoteSinceLastBody
      && previous
      && !endsCompleteSentence.test(previous)
      && !trimmed.startsWith('#')
      && !trimmed.startsWith('|')

    if (canJoinPrevious) {
      const continuation = previous.endsWith('如前所述，') && trimmed.startsWith('如前所述，')
        ? trimmed.slice('如前所述，'.length)
        : trimmed
      bodyParagraphs[bodyParagraphs.length - 1] = `${previous}${continuation}`
    } else {
      bodyParagraphs.push(paragraph)
    }
    removedFootnoteSinceLastBody = false
  })

  const footnotesAfterParagraph = new Map<number, number[]>()
  const assignedFootnotes = new Set<number>()
  const pairedMarkerPattern = /([。；）])\s*(\d{1,2})\s*[,，]\s*(\d{1,2})(?=\s|$)/

  bodyParagraphs.forEach((paragraph, index) => {
    const match = paragraph.match(pairedMarkerPattern)
    if (!match) return

    const firstNumber = Number(match[2])
    const secondNumber = Number(match[3])
    if (!footnotes.has(firstNumber) || !footnotes.has(secondNumber)) return

    bodyParagraphs[index] = paragraph.replace(
      pairedMarkerPattern,
      `$1〔脚注 ${firstNumber}、${secondNumber}〕`,
    )
    footnotesAfterParagraph.set(index, [firstNumber, secondNumber])
    assignedFootnotes.add(firstNumber)
    assignedFootnotes.add(secondNumber)
  })

  for (const number of [...footnotes.keys()].sort((left, right) => left - right)) {
    if (assignedFootnotes.has(number)) continue
    const markerPattern = new RegExp(`([。；）])\\s*${number}(?=\\s|$)`)
    const paragraphIndex = bodyParagraphs.findIndex((paragraph) => markerPattern.test(paragraph))
    if (paragraphIndex < 0) continue

    bodyParagraphs[paragraphIndex] = bodyParagraphs[paragraphIndex].replace(
      markerPattern,
      `$1〔脚注 ${number}〕`,
    )
    const existing = footnotesAfterParagraph.get(paragraphIndex) ?? []
    footnotesAfterParagraph.set(paragraphIndex, [...existing, number])
  }

  return bodyParagraphs.flatMap((paragraph, index) => {
    const noteNumbers = footnotesAfterParagraph.get(index)
    if (!noteNumbers) return [paragraph]

    return [
      paragraph,
      ...noteNumbers.map((number) => `> **脚注 ${number}：** ${footnotes.get(number)}`),
    ]
  }).join('\n\n')
}

function normalizeInlineTranslationMath(markdown: string) {
  let inCodeFence = false

  return markdown
    .split(/\r?\n/)
    .map((line) => {
      if (line.trimStart().startsWith('```')) {
        inCodeFence = !inCodeFence
        return line
      }
      if (inCodeFence) return line

      return line.replace(/\\\((.+?)\\\)/g, (_match, latex: string) => `\`${latex}\``)
    })
    .join('\n')
}

function normalizeDisplayTranslationMath(markdown: string) {
  let inCodeFence = false
  let displayMathLines: string[] | null = null
  const normalizedLines: string[] = []

  markdown.split(/\r?\n/).forEach((line) => {
    if (line.trimStart().startsWith('```')) {
      inCodeFence = !inCodeFence
      normalizedLines.push(line)
      return
    }
    if (inCodeFence) {
      normalizedLines.push(line)
      return
    }

    if (displayMathLines) {
      if (line.trim() === '$$') {
        normalizedLines.push(`$$${displayMathLines.join(' ').trim()}$$`)
        displayMathLines = null
      } else {
        displayMathLines.push(line.trim())
      }
      return
    }

    if (line.trim() === '$$') {
      displayMathLines = []
      return
    }

    normalizedLines.push(line)
  })

  const trailingDisplayMathLines = displayMathLines as string[] | null
  if (trailingDisplayMathLines) {
    normalizedLines.push('$$', ...trailingDisplayMathLines)
  }

  return normalizedLines.join('\n')
}

function prepareTranslationMarkdown(markdown: string) {
  const insertedAssets = new Set<string>()

  return normalizeInlineTranslationMath(
    normalizeDisplayTranslationMath(
      normalizeLooseTranslationTables(relocateMainTranslationTables(reflowTranslationFootnotes(markdown))),
    ),
  )
    .split(/\r?\n/)
    .flatMap((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('- ')) return [line]

      const bodyAsset = mainFigureBodyAnchors.find(({ file, pattern }) =>
        !insertedAssets.has(file) && pattern.test(trimmed),
      )
      if (bodyAsset) {
        insertedAssets.add(bodyAsset.file)
        return [line, '', `${translationAssetMarker}${bodyAsset.file}]]`, '']
      }

      const title = trimmed
        .replace(/^#{1,6}\s*/, '')
        .replace(/^\*\*(.*)\*\*$/, '$1')
        .trim()
      const asset = findTranslationAsset(title, insertedAssets)

      if (!asset) return [line]

      insertedAssets.add(asset.file)
      return [line, '', `${translationAssetMarker}${asset.file}]]`, '']
    })
    .join('\n')
}

function TranslationMarkdown({ markdown }: { markdown: string }) {
  const preparedMarkdown = useMemo(() => prepareTranslationMarkdown(markdown), [markdown])

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
      table: ({ children }) => (
        <div className="translation-table-scroll" role="region" aria-label="论文表格" tabIndex={0}>
          <table>{children}</table>
        </div>
      ),
      p: ({ children }) => {
        const text = textFromNode(children).trim()
        if (text.startsWith(translationAssetMarker) && text.endsWith(']]')) {
          const file = text.slice(translationAssetMarker.length, -2)
          const asset = translationAssets.find((candidate) => candidate.file === file)
          return asset ? <EmbeddedOutputCard asset={asset} inTranslation /> : null
        }
        if (text.startsWith('$$') && text.endsWith('$$')) {
          return <MathBlock latex={text.slice(2, -2).trim()} />
        }
        return <TranslationBlock as="p">{children}</TranslationBlock>
      },
      code: ({ children, className }) => {
        const text = textFromNode(children).trim()
        if (!className && isMathLikeText(text)) {
          return <MathInline latex={text} />
        }
        return <code className={className}>{children}</code>
      },
      h1: ({ children }) => <TranslationBlock as="h1">{children}</TranslationBlock>,
      h2: ({ children }) => <TranslationBlock as="h2">{children}</TranslationBlock>,
      h3: ({ children }) => <TranslationBlock as="h3">{children}</TranslationBlock>,
      h4: ({ children }) => <TranslationBlock as="h4">{children}</TranslationBlock>,
      img: ({ src, alt }) => {
        const normalizedSrc = typeof src === 'string' && src.startsWith('/')
          ? assetPath(src.slice(1))
          : src
        return <img src={normalizedSrc} alt={alt ?? '论文图表'} loading="lazy" />
      },
    }}>
      {preparedMarkdown}
    </ReactMarkdown>
  )
}

const latexCommandMap: Record<string, string> = {
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  Delta: 'Δ',
  epsilon: 'ε',
  varepsilon: 'ε',
  lambda: 'λ',
  mu: 'μ',
  nu: 'ν',
  rho: 'ρ',
  sigma: 'σ',
  Sigma: 'Σ',
  sum: '∑',
  prod: '∏',
  int: '∫',
  tau: 'τ',
  theta: 'θ',
  omega: 'ω',
  Omega: 'Ω',
  pi: 'π',
  in: '∈',
  notin: '∉',
  infty: '∞',
  approx: '≈',
  sim: '∼',
  times: '×',
  cdot: '·',
  le: '≤',
  leq: '≤',
  ge: '≥',
  geq: '≥',
  neq: '≠',
  rightarrow: '→',
  leftarrow: '←',
  to: '→',
  min: 'min',
  max: 'max',
  exp: 'exp',
  log: 'log',
  Var: 'Var',
  cdots: '⋯',
  ldots: '…',
  lvert: '|',
  rvert: '|',
  vert: '|',
  lVert: '‖',
  rVert: '‖',
  Vert: '‖',
  prime: '′',
  quad: '\u2003',
  qquad: '\u2003\u2003',
  operatorname: '',
  left: '',
  right: '',
}

function isMathLikeText(text: string) {
  if (!text) return false
  if (/\\[A-Za-z]+|[_^{}=+\-*/∈∞νμρσλβθΩΣ≈]|[A-Za-z]\([^)]+\)/.test(text)) return true
  return /^[A-Za-z](?:_[A-Za-z0-9]+)?$/.test(text)
}

function readLatexGroup(source: string, start: number) {
  if (source[start] !== '{') {
    return { content: source[start] ?? '', next: start + 1 }
  }
  let depth = 0
  for (let index = start; index < source.length; index += 1) {
    const char = source[index]
    if (char === '\\') {
      index += 1
      continue
    }
    if (char === '{') depth += 1
    if (char === '}') {
      depth -= 1
      if (depth === 0) {
        return { content: source.slice(start + 1, index), next: index + 1 }
      }
    }
  }
  return { content: source.slice(start + 1), next: source.length }
}

function readLatexArgument(source: string, start: number) {
  let index = start
  while (source[index] === ' ') index += 1

  if (source[index] === '{') return readLatexGroup(source, index)

  if (source[index] === '\\') {
    const commandMatch = source.slice(index + 1).match(/^[A-Za-z]+/)
    if (commandMatch) {
      return {
        content: source.slice(index, index + commandMatch[0].length + 1),
        next: index + commandMatch[0].length + 1,
      }
    }
  }

  return { content: source[index] ?? '', next: index + 1 }
}

function parseLatexNodes(source: string, keyPrefix = 'math'): ReactNode[] {
  const nodes: ReactNode[] = []
  let index = 0
  let textBuffer = ''

  const flushText = () => {
    if (!textBuffer) return
    nodes.push(textBuffer)
    textBuffer = ''
  }

  while (index < source.length) {
    const char = source[index]

    if (char === '\\') {
      flushText()
      const commandMatch = source.slice(index + 1).match(/^[A-Za-z]+/)
      if (!commandMatch) {
        const escaped = source[index + 1]
        const escapedSpacing: Record<string, string> = {
          ',': '\u2009',
          ':': '\u2005',
          ';': '\u2004',
          '!': '',
          ' ': '\u00a0',
        }
        nodes.push(escapedSpacing[escaped] ?? (escaped === '{' || escaped === '}' ? escaped : escaped ?? ''))
        index += 2
        continue
      }
      const command = commandMatch[0]
      index += command.length + 1

      if (command === 'frac') {
        const numerator = readLatexGroup(source, index)
        const denominator = readLatexGroup(source, numerator.next)
        nodes.push(
          <span className="math-frac" key={`${keyPrefix}-frac-${index}`}>
            <span>{parseLatexNodes(numerator.content, `${keyPrefix}-num-${index}`)}</span>
            <span>{parseLatexNodes(denominator.content, `${keyPrefix}-den-${index}`)}</span>
          </span>,
        )
        index = denominator.next
        continue
      }

      if (command === 'hat' || command === 'widehat' || command === 'bar' || command === 'overline' || command === 'tilde') {
        while (source[index] === ' ') index += 1
        const group = readLatexArgument(source, index)
        const accent = command === 'bar' || command === 'overline' ? '\u0304' : command === 'tilde' ? '\u0303' : '\u0302'
        nodes.push(
          <span className="math-accent" key={`${keyPrefix}-${command}-${index}`}>
            {parseLatexNodes(group.content, `${keyPrefix}-${command}-${index}`)}
            {accent}
          </span>,
        )
        index = group.next
        continue
      }

      if (command === 'sqrt') {
        const group = readLatexArgument(source, index)
        nodes.push(
          <span className="math-sqrt" key={`${keyPrefix}-sqrt-${index}`}>
            <span aria-hidden="true">√</span>
            <span>{parseLatexNodes(group.content, `${keyPrefix}-sqrt-body-${index}`)}</span>
          </span>,
        )
        index = group.next
        continue
      }

      if (command === 'mathbb' || command === 'mathbf' || command === 'mathcal') {
        const group = readLatexArgument(source, index)
        nodes.push(<span key={`${keyPrefix}-${command}-${index}`}>{parseLatexNodes(group.content, `${keyPrefix}-${command}-${index}`)}</span>)
        index = group.next
        continue
      }

      if (command === 'operatorname' || command === 'text') {
        const group = readLatexGroup(source, index)
        nodes.push(<span key={`${keyPrefix}-${command}-${index}`}>{group.content}</span>)
        index = group.next
        continue
      }

      if (command === 'tag') {
        const group = readLatexGroup(source, index)
        nodes.push(<span className="math-equation-tag" key={`${keyPrefix}-${command}-${index}`}>({group.content})</span>)
        index = group.next
        continue
      }

      if (command === 'begin' || command === 'end') {
        const group = readLatexGroup(source, index)
        index = group.next
        continue
      }

      nodes.push(latexCommandMap[command] ?? command)
      continue
    }

    if (char === '_' || char === '^') {
      flushText()
      const group = readLatexArgument(source, index + 1)
      const Tag = char === '_' ? 'sub' : 'sup'
      nodes.push(
        <Tag key={`${keyPrefix}-${char}-${index}`}>
          {parseLatexNodes(group.content, `${keyPrefix}-${char}-${index}`)}
        </Tag>,
      )
      index = group.next
      continue
    }

    if (char === '{') {
      flushText()
      const group = readLatexGroup(source, index)
      nodes.push(...parseLatexNodes(group.content, `${keyPrefix}-group-${index}`))
      index = group.next
      continue
    }

    if (char === '}') {
      index += 1
      continue
    }

    textBuffer += char
    index += 1
  }

  flushText()
  return nodes
}

function MathInline({ latex }: { latex: string }) {
  return (
    <span className="math-inline" role="math" aria-label={latex}>
      {parseLatexNodes(latex)}
    </span>
  )
}

function MathBlock({ latex }: { latex: string }) {
  return (
    <div className="math-block" role="math" aria-label={latex}>
      {parseLatexNodes(latex, 'display-math')}
    </div>
  )
}

function EmbeddedOutputCard({
  asset,
  inTranslation = false,
}: {
  asset: Pick<EmbeddedAsset, 'label' | 'file' | 'kind'>
  inTranslation?: boolean
}) {
  return (
    <article className={inTranslation ? 'embedded-output-card translation-embedded-asset' : 'embedded-output-card'}>
      <div className="embedded-output-title">{asset.label}</div>
      {asset.kind === 'table' ? (
        <EmbeddedTableAsset file={asset.file} label={asset.label} />
      ) : (
        <iframe
          src={assetPath(`replication-assets/${asset.file}`)}
          title={asset.label}
          loading="lazy"
        />
      )}
    </article>
  )
}

function parseDelimitedTable(text: string) {
  const rows = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const cells = line.includes('\t')
        ? line.split('\t')
        : line.trim().split(/\s{2,}/)
      return cells.map((cell) => cell.trim())
    })

  const maxColumns = Math.max(0, ...rows.map((row) => row.length))
  return rows.map((row) => [...row, ...Array.from({ length: maxColumns - row.length }, () => '')])
}

function EmbeddedTableAsset({ file, label }: { file: string; label: string }) {
  const [rows, setRows] = useState<string[][]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    fetch(assetPath(`replication-assets/${file}`))
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then((text) => {
        if (!cancelled) setRows(parseDelimitedTable(text))
      })
      .catch(() => {
        if (!cancelled) setError('表格加载失败')
      })

    return () => {
      cancelled = true
    }
  }, [file])

  if (error) return <p className="embedded-table-error">{error}</p>
  if (rows.length === 0) return <p className="embedded-table-loading">正在加载表格…</p>

  const [header, ...body] = rows

  return (
    <div className="embedded-table-scroll" role="region" aria-label={label} tabIndex={0}>
      <table className="embedded-data-table">
        <thead>
          <tr>{header.map((cell, index) => <th key={`${cell}-${index}`}>{cell}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={`${rowIndex}-${row.join('|')}`}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type CodeGuideRecord = {
  line: number
  code: string
  section: string
  explanation: string
}

type CodeGuidePayload = {
  file: string
  language: string
  purpose: string
  lineCount: number
  records: CodeGuideRecord[]
}

const codeGuideFiles = [
  { file: 'analysis.do', path: 'analysis-do.json' },
  { file: 'prepare-data.do', path: 'prepare-data-do.json' },
  { file: 'prepare-simulations.do', path: 'prepare-simulations-do.json' },
  { file: 'prepare-iss-peergroups.do', path: 'prepare-iss-peergroups-do.json' },
  { file: 'issInfluence.do', path: 'issinfluence-do.json' },
  { file: 'networkAnalysis-EconomyLevel.py', path: 'networkanalysis-economylevel-py.json' },
  { file: 'networkAnalysis-IndustryLevel.py', path: 'networkanalysis-industrylevel-py.json' },
  { file: 'networkAnalysis-PeergroupLevel.py', path: 'networkanalysis-peergrouplevel-py.json' },
  { file: 'Stock return and volatility.sas', path: 'stock-return-and-volatility-sas.json' },
]

const codeMappingRows = [
  ['Figure 1', 'analysis.do L12–136', '中位数缩放后的薪酬标准差'],
  ['Figure 2', 'analysis.do L140–187', '分位点变化与长表转换'],
  ['Table II', 'analysis.do L1550–1657', '高维固定效应趋势回归'],
  ['Figure 4', 'prepare-simulations.do', 'ISS 行业-规模基准化模拟'],
  ['Figure 5 / Table III', 'analysis.do L338–521 / L1661–1730', '同行选择与网络聚类'],
  ['Figure 6 / Table VI', 'analysis.do L526–594 / L1892–1985', 'ISS 排名阈值'],
  ['Table VII', 'analysis.do L1989–2115', 'ISS 建议的同行新增与删除'],
  ['Table IX–X / Figure 7', 'analysis.do L600–680 / L2155–2206', '薪酬方案表决权（SOP）'],
]

function codeComment(language: string, content: string) {
  const normalizedLanguage = language.toLowerCase()
  if (normalizedLanguage.includes('python')) return `# ${content}`
  if (normalizedLanguage.includes('sas')) return `/* ${content.replaceAll('*/', '* /')} */`
  return `// ${content}`
}

function annotatedCodeLine(record: CodeGuideRecord, language: string) {
  const annotation = codeComment(
    language,
    `[${record.section} · 原第 ${record.line} 行] ${record.explanation}`,
  )
  const source = record.code || ''

  if (!source.trim()) return annotation
  return `${source}  ${annotation}`
}

function SourceCodeGuide() {
  const [selectedPath, setSelectedPath] = useState(codeGuideFiles[0].path)
  const [payload, setPayload] = useState<CodeGuidePayload | null>(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [copiedScope, setCopiedScope] = useState<'page' | 'all' | null>(null)
  const pageSize = 60

  useEffect(() => {
    setPayload(null)
    setError('')
    setPage(1)
    fetch(assetPath(`reports/code-guide/${selectedPath}`))
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then(setPayload)
      .catch(() => setError('源码解析数据加载失败。'))
  }, [selectedPath])

  const filteredRecords = useMemo(() => {
    if (!payload) return []
    const keyword = query.trim().toLowerCase()
    if (!keyword) return payload.records
    return payload.records.filter((record) =>
      `${record.line} ${record.code} ${record.section} ${record.explanation}`.toLowerCase().includes(keyword),
    )
  }, [payload, query])

  useEffect(() => setPage(1), [query])

  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize))
  const visibleRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize)

  const copyAnnotatedCode = async (scope: 'page' | 'all') => {
    if (!payload) return
    const records = scope === 'page' ? visibleRecords : filteredRecords
    const code = records.map((record) => annotatedCodeLine(record, payload.language)).join('\n')
    await navigator.clipboard.writeText(code)
    setCopiedScope(scope)
    window.setTimeout(() => setCopiedScope(null), 1600)
  }

  return (
    <section className="source-code-guide">
      <div className="source-guide-heading">
        <div>
          <small>SOURCE-LEVEL AUDIT</small>
          <h3>图表—代码映射与 8,114 行源码解析</h3>
        </div>
        <span>原始代码未修改</span>
      </div>

      <div className="code-mapping-table">
        {codeMappingRows.map(([output, location, method]) => (
          <div key={output}><strong>{output}</strong><code>{location}</code><span>{method}</span></div>
        ))}
      </div>

      <div className="source-guide-controls">
        <label>
          <span>代码文件</span>
          <select value={selectedPath} onChange={(event) => setSelectedPath(event.target.value)}>
            {codeGuideFiles.map((item) => <option value={item.path} key={item.path}>{item.file}</option>)}
          </select>
        </label>
        <label>
          <span>搜索代码、变量或解释</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：winsor2、reghdfe、cluster、Figure 6"
          />
        </label>
      </div>

      {error && <p className="source-guide-error">{error}</p>}
      {!payload && !error && <p className="source-guide-loading">正在加载源码解析…</p>}
      {payload && (
        <>
          <div className="source-guide-meta">
            <div><strong>{payload.file}</strong><span>{payload.language} · {payload.lineCount.toLocaleString()} 行</span></div>
            <p>{payload.purpose}</p>
          </div>
          <div className="annotated-code-shell">
            <div className="annotated-code-toolbar">
              <div>
                <span className="language-dot" />
                <strong>{payload.language} 注释代码</strong>
                <small>原始代码 + 中文逐行注释</small>
              </div>
              <div className="annotated-copy-actions">
                <button type="button" onClick={() => copyAnnotatedCode('page')}>
                  {copiedScope === 'page' ? <Check size={14} /> : <Copy size={14} />}
                  {copiedScope === 'page' ? '当前页已复制' : '复制当前代码块'}
                </button>
                <button type="button" onClick={() => copyAnnotatedCode('all')}>
                  {copiedScope === 'all' ? <Check size={14} /> : <Copy size={14} />}
                  {copiedScope === 'all' ? '全部已复制' : `复制全部${query ? '搜索结果' : '源码'}`}
                </button>
              </div>
            </div>
            <div className="annotated-code-block" role="region" aria-label={`${payload.file} 中文逐行注释代码`}>
              {visibleRecords.map((record) => (
                <div className="annotated-code-line" key={`${payload.file}-${record.line}`}>
                  <span className="annotated-line-number">{record.line}</span>
                  <code>
                    {record.code && <span className="annotated-source">{record.code}</span>}
                    <span className="annotated-comment">
                      {record.code ? '  ' : ''}
                      {codeComment(
                        payload.language,
                        `[${record.section}] ${record.explanation}`,
                      )}
                    </span>
                  </code>
                </div>
              ))}
            </div>
          </div>
          <div className="source-guide-pagination">
            <span>共 {filteredRecords.length.toLocaleString()} 行 · 第 {page} / {pageCount} 页</span>
            <div>
              <button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>上一页</button>
              <button disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>下一页</button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

function InlineOutputGallery({ compact = false }: { compact?: boolean }) {
  const figures = compact ? replicationAssets.slice(0, 7) : replicationAssets
  const tables = compact ? embeddedTables.slice(0, 3) : embeddedTables

  return (
    <div className={compact ? 'embedded-output-section compact' : 'embedded-output-section'}>
      <h3>{compact ? '关键图形内嵌预览' : '论文图表内嵌展示'}</h3>
      <div className="embedded-figure-grid">
        {figures.map((asset) => (
          <EmbeddedOutputCard asset={{ ...asset, kind: 'figure' }} key={asset.file} />
        ))}
      </div>
      <h3>{compact ? '关键表格内嵌预览' : '回归表格内嵌展示'}</h3>
      <div className="embedded-table-grid">
        {tables.map((asset) => (
          <EmbeddedOutputCard asset={{ ...asset, kind: 'table' }} key={asset.file} />
        ))}
      </div>
    </div>
  )
}

function MainFigureGallery() {
  return (
    <div className="embedded-figure-grid main-figure-gallery">
      {replicationAssets.slice(0, 7).map((asset) => (
        <EmbeddedOutputCard asset={{ ...asset, kind: 'figure' }} key={asset.file} />
      ))}
    </div>
  )
}

function PaperSection({ id, title, children }: { id: number; title: string; children: React.ReactNode }) {
  return <section className="paper-section" id={`section-${id}`}><h2><span>{id + 1}.</span>{title}</h2>{children}</section>
}

function Footer({ english }: { english: boolean }) {
  return (
    <footer className="site-footer">
      <div><strong>MatrixEcon</strong><span>{english ? 'Open empirical research infrastructure.' : '开放的实证研究基础设施。'}</span></div>
      <div className="footer-links">
        <a href="mailto:qin_mengyao@126.com"><Mail size={15} />qin_mengyao@126.com</a>
        <a href="https://github.com/mengyaoqin009-bot/MatrixEcon" target="_blank" rel="noreferrer"><Github size={15} />GitHub</a>
      </div>
    </footer>
  )
}

export default App
