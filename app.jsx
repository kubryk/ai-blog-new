// ============================================================
// TERMINAL // AI TOOLING BLOG — React Components
// ============================================================

const { useState, useEffect, useMemo, useRef } = React;

// ---------- HUD ----------
function HUD({ screen, setScreen, onTweaksToggle }) {
  return (
    <header className="hud">
      <div className="hud-left">
        <div className="hud-brand">
          <div className="mark"></div>
          <span>TERMINAL // AITL</span>
        </div>
        <span className="dim">v2.6.1</span>
      </div>
      <nav>
        {[
          ["home", "INDEX"],
          ["article", "CURRENT"],
          ["archive", "ARCHIVE"],
          ["about", "CREW"],
        ].map(([k, label]) => (
          <button
            key={k}
            className={screen === k ? "active" : ""}
            onClick={() => setScreen(k)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="hud-right">
        <button className="hud-tweaks-btn" onClick={onTweaksToggle}>◈ TWEAKS</button>
      </div>
    </header>
  );
}

// ---------- HOME ----------
function HomeScreen({ data, onOpen, gridMode }) {
  return (
    <>
      <section className="hero">
        <div className="radar"><div className="sweep"></div></div>
        <div className="section-label">
          <span className="tag">◉ LIVE BROADCAST</span>
          <span>INCOMING TRANSMISSION // CYCLE 247</span>
        </div>
        <div className="hero-grid">
          <div>
            <h1>
              Field notes from building with <span className="acc">language models</span>.
            </h1>
            <p className="hero-sub">
              A technical log for engineers shipping AI-powered tools. Post-mortems, patterns, cost models, and the honest failure modes that vendor documentation leaves out.
            </p>
            <div className="cmd-line" style={{ marginTop: 28 }}>
              <span className="prompt">{'>'}</span>
              AWAITING INPUT
              <span className="caret"></span>
            </div>
          </div>
          <div className="hero-meta">
            <div className="row"><span>STATUS</span><b className="acc">ACTIVE</b></div>
            <div className="row"><span>ENTRIES</span><b>{data.articles.length.toString().padStart(3,'0')} INDEXED</b></div>
            <div className="row"><span>CONTRIBUTORS</span><b>07 CREW</b></div>
            <div className="row"><span>LAST PUSH</span><b>04.18.26 // 14:22</b></div>
            <div className="row"><span>CHANNEL</span><b>SECURE</b></div>
            <div className="row"><span>INTEGRITY</span><b className="acc">0x4F.A2.91</b></div>
          </div>
        </div>
      </section>

      <section className="feed">
        <div className="section-label">
          <span className="tag">§ FEED</span>
          <span>RECENT ENTRIES</span>
        </div>
        <Grid articles={data.articles} onOpen={onOpen} includeFeature gridMode={gridMode} />
      </section>
    </>
  );
}

function Grid({ articles, onOpen, gridMode = "default", includeFeature = false }) {
  return (
    <div className="articles" data-grid={gridMode}>
      {articles.map((a, i) => (
        <ArticleCard
          key={a.id}
          article={a}
          featured={includeFeature && i === 0 && gridMode !== "list"}
          onOpen={() => onOpen(a)}
        />
      ))}
    </div>
  );
}

function ArticleCard({ article, featured, onOpen }) {
  return (
    <article className={`article-card ${featured ? "feature" : ""}`} onClick={onOpen}>
      <div className="card-head">
        <span className="id">{article.id}</span>
        <span>{article.category}</span>
      </div>
      <div className="card-thumb">
        [ IMG // {article.slug.toUpperCase().replace(/-/g, "_").slice(0, 22)} ]
      </div>
      <h3>{article.title}</h3>
      <p>{article.dek}</p>
      <div className="card-foot">
        <span>{article.date} · {article.author}</span>
        <span className="read-cta">READ ▸</span>
      </div>
    </article>
  );
}

// ---------- ARTICLE DETAIL ----------
function ArticleScreen({ article, onBack, onOpen, data }) {
  const a = article || data.articles[0];
  const progressRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, (scrolled / height) * 100));
      if (progressRef.current) progressRef.current.style.width = pct + "%";
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [a.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [a.id]);

  const related = data.articles.filter(x => x.id !== a.id).slice(0, 3);

  return (
    <>
      <div className="progress-rail" ref={progressRef}></div>
      <section className="article-detail">
        <div className="section-label">
          <span className="tag">◂ {a.id}</span>
          <span onClick={onBack} style={{cursor:'pointer'}}>RETURN TO INDEX</span>
        </div>

        <header className="detail-head">
          <div className="detail-meta">
            <span className="tag">{a.category}</span>
            <span>{a.date}</span>
            <span>·</span>
            <span>{a.readTime} READ</span>
            <span>·</span>
            <span>ENTRY {a.id}</span>
          </div>
          <h1>{a.title}</h1>
          <p className="lede">{a.dek}</p>
          <div className="detail-author">
            <div className="avatar">{a.author.split(" ").map(x=>x[0]).join("")}</div>
            <div>
              <b>{a.author}</b>
              <span className="dim">{a.authorRole} DIV</span>
            </div>
          </div>
        </header>

        <div className="detail-hero-thumb">
          [ IMAGE // LEAD_FIGURE — 1100 × 360 ]
        </div>

        <div className="detail-body">
          <p>
            In the last eighteen months, our team has shipped language-model
            integrations into four production surfaces — a code review tool, a
            customer-support triage layer, an internal search agent, and a
            regression-triage assistant used by the platform team. Across all
            four, the same pattern emerged: the eval suite we trusted at launch
            turned out to be almost useless within two months of production
            traffic.
          </p>

          <p>
            This essay is an attempt to document what actually works. Not a
            framework. Not a library. A set of practices, most of them boring,
            that keep regressions out of <code>main</code> when the thing you
            are testing is a statistical sampler attached to a tool-calling
            loop.
          </p>

          <h2>The problem with benchmark suites</h2>
          <p>
            Most teams start with a static set of labelled examples — a few
            hundred cases with known-good outputs — and track accuracy across
            model versions. This works for about six weeks. Then the failure
            modes of your users diverge from the failure modes in your eval
            set, and every metric you track is green while support tickets
            pile up.
          </p>

          <blockquote>
            The unit of evaluation is not a prompt. It is a session.
          </blockquote>

          <p>
            Once you accept that, a lot of things simplify. You stop measuring
            <code>answer_correctness</code> at the turn level. You start
            measuring whether the session terminated in a state the user would
            call "done." The two are not the same metric, and confusing them
            is why most dashboards lie.
          </p>

          <h2>Replay, not regression</h2>
          <p>
            We maintain a replay corpus of approximately 8,000 anonymised user
            sessions. Every PR that touches the agent loop, the system prompt,
            the tool schemas, or the model config must replay a random 500 and
            produce a disagreement report.
          </p>

          <pre data-label="REPLAY HARNESS">
{`$ aitl replay --target main --baseline prod --n 500
  → running 500 sessions on two branches in parallel
  → comparing tool-call sequences, final states, token counts

  DISAGREEMENTS      47  ( 9.4% )
  ├─ tool-call diff  31
  ├─ termination     11
  └─ final-state      5

  REGRESSIONS         3  ( see disagreement-log-0247.json )
  NEUTRAL            38
  IMPROVEMENTS        6`}
          </pre>

          <p>
            Three fields matter: the tool-call sequence, the termination
            state, and the user-facing final string. If none of those changed
            meaningfully, the session is neutral. If any of them changed, a
            human looks at it. This is tedious. It is also the only thing
            that has ever caught a real regression before our users did.
          </p>

          <h2>Canary tasks</h2>
          <ul>
            <li>Keep a small set (20–40) of hand-crafted tasks that exercise your most fragile tool integrations.</li>
            <li>Run them on every PR. Fail the build on any regression.</li>
            <li>Add a new canary every time a user reports a real-world failure.</li>
            <li>Delete canaries that have never caught anything in six months.</li>
          </ul>

          <p>
            Canaries are not a substitute for replay. They are the pager. They
            catch the twenty failure modes you care most about, fast, on every
            commit. Replay catches the long tail, slowly, before a release.
          </p>

          <h2>The part that isn't automated</h2>
          <p>
            Once a week, two engineers sit down and read twenty random
            disagreement reports from the replay corpus. No scoring. No
            metrics. Just reading. This is the single most valuable ritual
            we have found for keeping a production agent honest, and it is
            not something you can buy.
          </p>

          <p className="dim" style={{ marginTop: 32, fontSize: 14 }}>
            → Filed under <span className="acc">{a.category}</span>. Entry {a.id}. Transmission complete.
          </p>
        </div>
      </section>

      <section className="feed" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="section-label">
          <span className="tag">↪ RELATED</span>
          <span>ADJACENT TRANSMISSIONS</span>
        </div>
        <Grid articles={related} onOpen={onOpen} />
      </section>
    </>
  );
}

// ---------- ARCHIVE ----------
function ArchiveScreen({ data, onOpen }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const categories = useMemo(() => {
    const set = new Set(data.articles.map(a => a.category));
    return ["ALL", ...Array.from(set)];
  }, [data]);

  const filtered = useMemo(() => {
    return data.articles.filter(a => {
      if (filter !== "ALL" && a.category !== filter) return false;
      if (query && !(
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.dek.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )) return false;
      return true;
    });
  }, [data, query, filter]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(a => {
      const [mm, , yy] = a.date.split(".");
      const key = `${mm}.${yy}`;
      (g[key] ||= []).push(a);
    });
    return g;
  }, [filtered]);

  return (
    <section className="archive">
      <div className="section-label">
        <span className="tag">§ ARCHIVE</span>
        <span>COMPLETE TRANSMISSION LOG</span>
      </div>
      <header className="archive-head">
        <h1>Archive <span className="acc">// 2024–26</span></h1>
        <div className="meta">
          <b>{data.articles.length.toString().padStart(3,"0")}</b>
          <span>ENTRIES INDEXED</span>
        </div>
      </header>

      <div className="filter-bar">
        <div className="search">
          <span className="prompt mono">{'>'}</span>
          <input
            placeholder="SEARCH TRANSMISSIONS // TITLE, TAG, OR BODY"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          {categories.map(c => (
            <button
              key={c}
              className={filter === c ? "active" : ""}
              onClick={() => setFilter(c)}
            >{c}</button>
          ))}
        </div>
        <div className="count">
          <b>{filtered.length.toString().padStart(2,"0")}</b>/{data.articles.length.toString().padStart(2,"0")}
        </div>
      </div>

      {Object.entries(grouped).length === 0 && (
        <div className="cmd-line" style={{padding:40, textAlign:'center', fontSize:13}}>
          <span className="prompt">{'>'}</span>
          NO MATCHES // REFINE QUERY PARAMETERS<span className="caret"></span>
        </div>
      )}

      {Object.entries(grouped).map(([month, items]) => (
        <div className="archive-group" key={month}>
          <div className="archive-group-label">
            <span>◈ CYCLE {month}</span>
            <span className="count">{items.length.toString().padStart(2,"0")} ENTRIES</span>
          </div>
          {items.map(a => (
            <div className="archive-row" key={a.id} onClick={() => onOpen(a)}>
              <span className="id">{a.id}</span>
              <span>{a.category}</span>
              <span className="archive-title">{a.title}</span>
              <span>{a.author} / {a.authorRole}</span>
              <span>{a.readTime} ▸</span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

// ---------- ABOUT ----------
function AboutScreen() {
  const crew = [
    { initials: "MO", name: "M. Osei", role: "TOOLING DIV" },
    { initials: "RH", name: "R. Halden", role: "INFRA DIV" },
    { initials: "KV", name: "K. Vasquez", role: "APPLIED DIV" },
    { initials: "JL", name: "J. Liang", role: "TOOLING DIV" },
    { initials: "AB", name: "A. Bello", role: "APPLIED DIV" },
    { initials: "SO", name: "S. Okafor", role: "OBSERVABILITY" },
    { initials: "NP", name: "N. Petrov", role: "APPLIED DIV" },
    { initials: "?? ", name: "[REDACTED]", role: "SECURITY" },
  ];
  return (
    <section className="about">
      <div className="section-label">
        <span className="tag">§ CREW</span>
        <span>ABOUT THE TRANSMISSION</span>
      </div>

      <div className="about-hero">
        <h1>We ship AI tools. We write about <span className="acc">what breaks</span>.</h1>
        <div className="right">
          <p>
            TERMINAL is a working log maintained by a small group of applied
            engineers building language-model features into production systems.
            We publish the failure modes, cost models, and architectural
            patterns that we wish we had found six months earlier.
          </p>
          <p>
            No framework hot-takes. No vendor benchmarks. No promises about
            AGI. The things that ran in production. The things that didn't.
            The patches in between.
          </p>
        </div>
      </div>

      <div className="manifest">
        <div className="manifest-item">
          <div className="num">DIRECTIVE 01</div>
          <h3>Ship, measure, report.</h3>
          <p>We only write about systems we have run against real traffic. If it has not survived a weekend of production, it does not get an entry number.</p>
        </div>
        <div className="manifest-item">
          <div className="num">DIRECTIVE 02</div>
          <h3>Show the failure first.</h3>
          <p>Every post opens with what broke. Solutions that do not name the failure they address are advice, and we do not traffic in advice.</p>
        </div>
        <div className="manifest-item">
          <div className="num">DIRECTIVE 03</div>
          <h3>No vendor endorsements.</h3>
          <p>We name models and tools where necessary. We do not recommend them. The half-life of a model benchmark is shorter than our review cycle.</p>
        </div>
      </div>

      <div className="section-label">
        <span className="tag">◈ CREW ROSTER</span>
        <span>CONTRIBUTORS // 08 ACTIVE</span>
      </div>
      <div className="crew">
        {crew.map((c, i) => (
          <div className="crew-member" key={i}>
            <div className="crew-avatar">[ {c.initials} ]</div>
            <div className="role">{c.role}</div>
            <h4>{c.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="footer">
      <div className="brand">
        <div className="hud-brand">
          <div className="mark"></div>
          <span>TERMINAL // AITL</span>
        </div>
        <p>
          A field log for engineers shipping AI-powered tools.
          Maintained from orbit. Transmitted in plaintext.
        </p>
      </div>
      <div>
        <h5>CHANNELS</h5>
        <ul>
          <li>◈ RSS FEED</li>
          <li>◈ NEWSLETTER</li>
          <li>◈ ATOM</li>
          <li>◈ JSON API</li>
        </ul>
      </div>
      <div>
        <h5>DIVISIONS</h5>
        <ul>
          <li>TOOLING</li>
          <li>INFRA</li>
          <li>APPLIED</li>
          <li>OBSERVABILITY</li>
        </ul>
      </div>
    </footer>
  );
}

// ---------- TWEAKS PANEL ----------
function Tweaks({ open, onClose, accent, setAccent, gridMode, setGridMode }) {
  const accents = [
    { name: "AMBER",    hex: "#ffb020", txt: "#0a0a0b" },
    { name: "ORANGE",   hex: "#ff6a1a", txt: "#0a0a0b" },
    { name: "RED",      hex: "#ff3a3a", txt: "#0a0a0b" },
    { name: "ACID",     hex: "#c7ff3a", txt: "#0a0a0b" },
    { name: "CYAN",     hex: "#5ce6ff", txt: "#0a0a0b" },
    { name: "MAGENTA",  hex: "#ff4da6", txt: "#0a0a0b" },
  ];
  return (
    <div className={`tweaks ${open ? "open" : ""}`}>
      <div className="tweaks-head">
        <span>◈ TWEAKS // OPERATOR PANEL</span>
        <button className="close" onClick={onClose}>[×]</button>
      </div>
      <div className="tweaks-body">
        <div className="group">
          <div className="group-label">ACCENT // CHANNEL</div>
          <div className="tweaks-swatches">
            {accents.map(a => (
              <div
                key={a.name}
                className={`tweak-swatch ${accent.hex === a.hex ? "active" : ""}`}
                style={{ background: a.hex }}
                onClick={() => setAccent(a)}
                title={a.name}
              />
            ))}
          </div>
          <div className="group-label" style={{fontSize:9, marginTop:4}}>
            CURRENT: {accents.find(a=>a.hex===accent.hex)?.name || "CUSTOM"}
          </div>
        </div>
        <div className="group">
          <div className="group-label">GRID // LAYOUT</div>
          <div className="tweak-grid-opts">
            {["default", "mosaic", "list"].map(g => (
              <button
                key={g}
                className={gridMode === g ? "active" : ""}
                onClick={() => setGridMode(g)}
              >{g}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- APP ----------
function App() {
  const [screen, _setScreen] = useState(() => {
    try { return localStorage.getItem("terminal.screen") || "home"; } catch { return "home"; }
  });
  const [currentArticle, setCurrentArticle] = useState(() => {
    try {
      const slug = localStorage.getItem("terminal.article");
      return window.BLOG_DATA.articles.find(a => a.slug === slug) || null;
    } catch { return null; }
  });
  const [accent, setAccentState] = useState({ hex: "#ffb020", txt: "#0a0a0b" });
  const [gridMode, setGridModeState] = useState("default");
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const setScreen = (s) => {
    _setScreen(s);
    try { localStorage.setItem("terminal.screen", s); } catch {}
  };

  function openArticle(a) {
    setCurrentArticle(a);
    try { localStorage.setItem("terminal.article", a.slug); } catch {}
    setScreen("article");
  }

  function setAccent(a) {
    setAccentState(a);
  }

  function setGridMode(g) {
    setGridModeState(g);
  }

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", accent.hex);
    r.style.setProperty("--accent-txt", accent.txt);
    r.style.setProperty("--accent-dim", accent.hex + "22");
  }, [accent]);

  return (
    <div className="frame">
      <HUD screen={screen} setScreen={setScreen} onTweaksToggle={() => setTweaksOpen(o => !o)} />

      {screen === "home" && (
        <HomeScreen data={window.BLOG_DATA} onOpen={openArticle} gridMode={gridMode} />
      )}
      {screen === "article" && (
        <ArticleScreen
          article={currentArticle}
          data={window.BLOG_DATA}
          onOpen={openArticle}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "archive" && (
        <ArchiveScreen data={window.BLOG_DATA} onOpen={openArticle} />
      )}
      {screen === "about" && <AboutScreen />}

      <Footer />

      <Tweaks
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        accent={accent}
        setAccent={setAccent}
        gridMode={gridMode}
        setGridMode={setGridMode}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
