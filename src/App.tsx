import { isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
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
            <span><strong>28</strong>{english ? 'papers indexed' : '篇核心文献'}</span>
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

  const filtered = useMemo(() => papers.filter((paper) => {
    const text = `${paper.title} ${paper.titleZh} ${paper.authors}`.toLowerCase()
    return text.includes(query.toLowerCase())
      && (journal === '全部期刊' || paper.journal === journal)
      && (method === '全部方法' || paper.method === method)
      && (status === '全部状态' || paper.status === status)
  }), [query, journal, method, status])

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

const interpretationCards = [
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

function InterpretationSection({ paperId }: { paperId: string }) {
  const storageKey = `matrixecon:paper-thoughts:${paperId}`
  const [thoughts, setThoughts] = useState<PersonalThought[]>([])
  const [loaded, setLoaded] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingBody, setEditingBody] = useState('')

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
    setThoughts((current) => current.map((thought) => (
      thought.id === editingId
        ? { ...thought, title: editingTitle.trim() || '我的思考', body: content }
        : thought
    )))
    setEditingId(null)
  }

  return (
    <div className="interpretation-grid">
      {interpretationCards.map(([cardTitle, cardBody], index) => (
        <article key={cardTitle}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{cardTitle}</h3>
          <p>{cardBody}</p>
        </article>
      ))}
      {thoughts.map((thought, thoughtIndex) => {
        const thoughtNumber = interpretationCards.length + thoughtIndex + 1
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
        <span>{String(interpretationCards.length + thoughts.length + 1).padStart(2, '0')}</span>
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
          添加为第 {String(interpretationCards.length + thoughts.length + 1).padStart(2, '0')} 条
        </button>
        <small>仅保存在当前浏览器中；刷新后保留，删除后自动连续重编号。</small>
      </article>
    </div>
  )
}

function PaperPage({ paper, english }: { paper: Paper; english: boolean }) {
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
  { label: '表 2B：公司层面薪酬离散度趋势', file: 'Table2b.txt' },
  { label: '表 3B：同业组网络聚类趋势', file: 'Table3B.txt' },
  { label: '表 6A：ISS 排名的重要性', file: 'Table6a.txt' },
  { label: '表 7A：ISS 与同业删除', file: 'Table7a.txt' },
  { label: '表 8：被动投资', file: 'Table8.txt' },
  { label: '表 10：接近临界结果的 SOP 频率投票', file: 'Table10.txt' },
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
    titles: ['面板 B：公司薪酬同业组内的薪酬离散度'],
  },
  {
    ...embeddedTables[1],
    kind: 'table',
    titles: ['面板 B：同业组的聚类化'],
  },
  { ...embeddedTables[2], kind: 'table', titles: ['面板 A：ISS 排名的重要性'] },
  { ...embeddedTables[3], kind: 'table', titles: ['表 7'] },
  { ...embeddedTables[4], kind: 'table', titles: ['表 8'] },
  { ...embeddedTables[5], kind: 'table', titles: ['表 10'] },
]

function textFromNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textFromNode).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children)
  return ''
}

function findTranslationAsset(title: string) {
  const normalized = title.replace(/\s+/g, ' ').replace(/^#+\s*/, '').trim()
  return translationAssets.find((asset) => asset.titles.some((candidate) => {
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

function prepareTranslationMarkdown(markdown: string) {
  const insertedAssets = new Set<string>()

  return reflowTranslationFootnotes(markdown)
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
      const asset = findTranslationAsset(title)

      if (!asset || insertedAssets.has(asset.file)) return [line]

      insertedAssets.add(asset.file)
      return [line, '', `${translationAssetMarker}${asset.file}]]`, '']
    })
    .join('\n')
}

function TranslationMarkdown({ markdown }: { markdown: string }) {
  const preparedMarkdown = useMemo(() => prepareTranslationMarkdown(markdown), [markdown])

  return (
    <ReactMarkdown components={{
      p: ({ children }) => {
        const text = textFromNode(children).trim()
        if (text.startsWith(translationAssetMarker) && text.endsWith(']]')) {
          const file = text.slice(translationAssetMarker.length, -2)
          const asset = translationAssets.find((candidate) => candidate.file === file)
          return asset ? <EmbeddedOutputCard asset={asset} inTranslation /> : null
        }
        return <TranslationBlock as="p">{children}</TranslationBlock>
      },
      h1: ({ children }) => <TranslationBlock as="h1">{children}</TranslationBlock>,
      h2: ({ children }) => <TranslationBlock as="h2">{children}</TranslationBlock>,
      h3: ({ children }) => <TranslationBlock as="h3">{children}</TranslationBlock>,
      h4: ({ children }) => <TranslationBlock as="h4">{children}</TranslationBlock>,
    }}>
      {preparedMarkdown}
    </ReactMarkdown>
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
      <iframe
        className={asset.kind === 'table' ? 'embedded-table-frame' : undefined}
        src={assetPath(`replication-assets/${asset.file}`)}
        title={asset.label}
        loading="lazy"
      />
    </article>
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
