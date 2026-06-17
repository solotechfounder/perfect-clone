import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Event = {
  name: string;
  inst: string;
  instType: "IIM" | "IIT" | "DU" | "Other";
  month: number;
  monthLabel: string;
  dates: string;
  prize?: string;
  watch: string;
  reg: string;
  tracks: string[];
  star?: boolean;
};

const EVENTS: Event[] = [
  { month: 1, monthLabel: "January", name: "Shaastra", inst: "IIT Madras", instType: "IIT", dates: "Jan 2–6, 2026", watch: "Shaastra Summit (Digital Governance), IndustriAI Conference, NeuroHack, E-Contest, Robowars, Quantified Dilemma", reg: "Mid-November", tracks: ["tech-mgmt", "entrepreneurship"] },
  { month: 1, monthLabel: "January", name: "Elan & nVision", inst: "IIT Hyderabad", instType: "IIT", dates: "Jan 9–11, 2026", watch: "Under 25 Summit (entrepreneurship), tech competitions, pro-nights. Moved from Feb to Jan for 2026.", reg: "Mid-November", tracks: ["entrepreneurship", "tech-mgmt", "cultural"] },
  { month: 1, monthLabel: "January", name: "Dhruva", inst: "IIM Tiruchirappalli", instType: "IIM", dates: "Late Jan – early Feb", watch: "Business + cultural events. Historically October, shifted to Jan–Feb in recent editions.", reg: "Mid-December", tracks: ["management", "cultural"] },
  { month: 1, monthLabel: "January", name: "IIMA Entrepreneurship Summit", inst: "IIM Ahmedabad", instType: "IIM", dates: "Mid-January", watch: "Pitch sessions, founder panels", reg: "Early December", tracks: ["entrepreneurship"] },
  { month: 1, monthLabel: "January", name: "Unmaad", inst: "IIM Bangalore", instType: "IIM", dates: "Late Jan – early Feb", watch: "IIM-B's flagship cultural fest — music, dance, drama, lit & quizzing. Strong management cross-overs.", reg: "Mid-December", tracks: ["cultural"] },

  { month: 2, monthLabel: "February", name: "GES — Global Entrepreneurship Summit", inst: "IIT Kharagpur", instType: "IIT", dates: "Feb 7–9, 2025", prize: "Empresario ₹1.2 Cr+", watch: "Empresario (B-model comp), Global Trading League, R&D Symposium, Intern Carnival, Investor-Startup Connect", reg: "Early December", tracks: ["entrepreneurship", "finance"], star: true },
  { month: 2, monthLabel: "February", name: "Manfest-Varchasva", inst: "IIM Lucknow", instType: "IIM", dates: "Feb 7–9, 2025", watch: "Young Leader's Programme, Leaders Express, ICICI Lombard / Pizza Hut / NPCI / StockGro case competitions", reg: "Mid-December", tracks: ["consulting", "finance", "management"], star: true },
  { month: 2, monthLabel: "February", name: "IRIS", inst: "IIM Indore", instType: "IIM", dates: "Feb 14–16, 2025", watch: "Vivitsa (sustainability), Qmanji (quiz), Hackwise, Drona (mentorship), Pratibimb", reg: "Mid-December", tracks: ["management"] },
  { month: 2, monthLabel: "February", name: "E-Summit IIT Kanpur", inst: "IIT Kanpur", instType: "IIT", dates: "February", watch: "Pitch Premier, Beat the Market, Strategy Sprint, Blockchain & VC events", reg: "Mid-December", tracks: ["entrepreneurship", "finance"] },
  { month: 2, monthLabel: "February", name: "Echoes", inst: "IIM Kozhikode", instType: "IIM", dates: "Feb 7–9, 2025", watch: "Cultural pro-nights + management cross-overs", reg: "Mid-December", tracks: ["cultural"] },
  { month: 2, monthLabel: "February", name: "Audacity", inst: "IIM Udaipur", instType: "IIM", dates: "Feb 8–9, 2025", watch: "Cultural + management events", reg: "Mid-December", tracks: ["cultural", "management"] },
  { month: 2, monthLabel: "February", name: "Advitiya", inst: "IIT Ropar", instType: "IIT", dates: "Feb 6–8, 2025", watch: "Tech competitions, Robowars, hackathons", reg: "Late December", tracks: ["tech-mgmt"] },
  { month: 2, monthLabel: "February", name: "Anwesha", inst: "IIT Patna", instType: "IIT", dates: "Feb 7–9, 2025", watch: "Techno-cultural events, dance/music + B-quizzes", reg: "Mid-December", tracks: ["cultural", "tech-mgmt"] },
  { month: 2, monthLabel: "February", name: "Arbitrage", inst: "Ramjas College, DU", instType: "DU", dates: "Feb 17–18, 2026", watch: "Caselympics 2.0, Vision à Valeur (B-Plan), Vertex (B&F Quiz), Business Revival", reg: "Mid-January", tracks: ["consulting", "finance", "entrepreneurship"] },
  { month: 2, monthLabel: "February", name: "L'Economiste", inst: "Hindu College, DU", instType: "DU", dates: "February", watch: "Economics-society events; case discussions", reg: "Mid-January", tracks: ["economics"] },
  { month: 2, monthLabel: "February", name: "Convergence", inst: "SRCC, DU", instType: "DU", dates: "February (varies)", watch: "SRCC Marketing Society's flagship — brand strategy, ad-making, marketing case challenges.", reg: "Mid-January", tracks: ["consulting", "management"] },

  { month: 3, monthLabel: "March", name: "Techkriti", inst: "IIT Kanpur", instType: "IIT", dates: "Mar 27–30, 2025", prize: "₹1 Cr+ pool", watch: "Pitch Premier, Beat the Market, Strategy Sprint, ML Hackathon (₹6L), Hack IITK (₹30L), Robowars, MUN, Rakshakriti", reg: "Mid-February", tracks: ["entrepreneurship", "finance", "tech-mgmt"], star: true },
  { month: 3, monthLabel: "March", name: "Cognizance", inst: "IIT Roorkee", instType: "IIT", dates: "Mar 20–23, 2025", prize: "₹50L+ (2026)", watch: "Robowars, Codecode, hackathons, aerospace contests. Asia's 2nd largest student-run tech fest.", reg: "Late January", tracks: ["tech-mgmt"] },
  { month: 3, monthLabel: "March", name: "Tryst", inst: "IIT Delhi", instType: "IIT", dates: "Feb 27 – Mar 1, 2026", watch: "75+ events spanning science / tech / management; large-scale case comps; ~60,000 participants", reg: "Mid-January", tracks: ["tech-mgmt", "management"] },
  { month: 3, monthLabel: "March", name: "Technex", inst: "IIT (BHU) Varanasi", instType: "IIT", dates: "Mar 13–15, 2026", watch: "Robowars, Drone Tech, Hack It Out, Eco Hackathon, Corporate Conclave. 87th edition.", reg: "Mid-January", tracks: ["tech-mgmt"] },
  { month: 3, monthLabel: "March", name: "Zeitgeist", inst: "IIT Ropar", instType: "IIT", dates: "Mar 13–15, 2025", watch: "Cultural pro-nights + finance / marketing sub-events", reg: "Mid-February", tracks: ["cultural", "finance"] },
  { month: 3, monthLabel: "March", name: "Tarang", inst: "Lady Shri Ram College, DU", instType: "DU", dates: "Mar 28–30, 2026", watch: "Cultural fest with departmental management events", reg: "Mid-February", tracks: ["cultural"] },
  { month: 3, monthLabel: "March", name: "Confluence", inst: "Hansraj College, DU", instType: "DU", dates: "Mar 28–30, 2025", watch: "LitFest, Rachnotsav, Allure", reg: "Mid-February", tracks: ["cultural"] },
  { month: 3, monthLabel: "March", name: "SRCC Business Conclave", inst: "SRCC, DU", instType: "DU", dates: "Mar 7–8, 2025", watch: "The Shri Ram Case Competition, The Big Sho(r)t", reg: "Mid-February", tracks: ["consulting", "finance"] },
  { month: 3, monthLabel: "March", name: "Moksha-Innovision", inst: "NSUT, Delhi", instType: "Other", dates: "March", watch: "Cultural + tech competitions, E-Summit-style verticals. 4-day fest.", reg: "Mid-February", tracks: ["cultural", "tech-mgmt"] },
  { month: 3, monthLabel: "March", name: "Business Leadership Summit", inst: "IIM Shillong", instType: "IIM", dates: "March", watch: "Leadership panels, case comps", reg: "Late February", tracks: ["consulting", "management"] },
  { month: 3, monthLabel: "March", name: "Crossroads", inst: "SRCC, DU", instType: "DU", dates: "Mar 18–20, 2026", watch: "Cultural fest with department sub-events. Date has drifted Feb → Apr → Mar.", reg: "Late January", tracks: ["cultural"] },

  { month: 4, monthLabel: "April", name: "Shri Ram Economics Summit", inst: "SRCC, DU", instType: "DU", dates: "Apr 7–8, 2025", watch: "Shri Ram Case Conundrum, National Economics Olympiad", reg: "Mid-March", tracks: ["economics", "consulting"] },
  { month: 4, monthLabel: "April", name: "Renaissance", inst: "Kirori Mal College, DU", instType: "DU", dates: "Apr 17–18, 2025", watch: "Cultural pro-nights + commerce society events", reg: "Mid-March", tracks: ["cultural"] },
  { month: 4, monthLabel: "April", name: "Exodia", inst: "IIT Mandi", instType: "IIT", dates: "Apr 18–20, 2025", watch: "Cultural + tech sub-events", reg: "Mid-March", tracks: ["cultural"] },
  { month: 4, monthLabel: "April", name: "Tempest", inst: "Miranda House, DU", instType: "DU", dates: "Mar–Apr", watch: "Cultural fest with society-level competitions", reg: "Mid-March", tracks: ["cultural"] },
  { month: 4, monthLabel: "April", name: "Ignus", inst: "IIT Jodhpur", instType: "IIT", dates: "March–April", watch: "Socio-cultural events", reg: "Mid-March", tracks: ["cultural"] },

  { month: 8, monthLabel: "August", name: "Venix", inst: "IIM Bangalore", instType: "IIM", dates: "Aug 1–3, 2025", prize: "₹12.5L+ pool", watch: "The Fifth Move, C-Suite, Data Analytics Challenge, Young Entrepreneurs Summit, Young Leaders Summit.", reg: "Mid-June", tracks: ["consulting", "entrepreneurship", "finance"], star: true },
  { month: 8, monthLabel: "August", name: "i5 Summit", inst: "IIT + IIM Indore (joint)", instType: "IIT", dates: "Late August onwards", watch: "Pitch competitions, B-plan, ideathons. Central India's largest E-summit.", reg: "Mid-July", tracks: ["entrepreneurship"] },

  { month: 9, monthLabel: "September", name: "Techniche", inst: "IIT Guwahati", instType: "IIT", dates: "Sep 20–22, 2025", watch: "Robowars, Aqua Wars, Nexus & Lecture Series, Legacy (esports), industrial conclaves", reg: "Late June", tracks: ["tech-mgmt"] },
  { month: 9, monthLabel: "September", name: "Emerge", inst: "IIM Shillong", instType: "IIM", dates: "Mid-September", watch: "Entrepreneurship Summit pitching, startup panels", reg: "Early August", tracks: ["entrepreneurship"] },
  { month: 9, monthLabel: "September", name: "Utkarsh", inst: "IIT Mandi", instType: "IIT", dates: "September", watch: "Tech competitions, hackathons (some editions in November)", reg: "Early August", tracks: ["tech-mgmt"] },
  { month: 9, monthLabel: "September", name: "Ignite 180", inst: "Kirori Mal College, DU", instType: "DU", dates: "September–October", watch: "Consulting case competition — the earliest national-scale consulting comp accessible to DU undergrads.", reg: "Mid-August", tracks: ["consulting"], star: true },

  { month: 10, monthLabel: "October", name: "The Red Brick Summit", inst: "IIM Ahmedabad", instType: "IIM", dates: "Oct 3–5, 2025", watch: "Parivartan (CSR/case), TRBS Quiz, Can You Sell This?, BCG 'Unboxing Consulting', policy & geopolitics panels.", reg: "Late August", tracks: ["consulting", "management"], star: true },
  { month: 10, monthLabel: "October", name: "Horizons", inst: "IIM Kozhikode", instType: "IIM", dates: "Oct 19–20, 2024", watch: "Management conclave, sectoral discussions", reg: "Mid-September", tracks: ["management"] },
  { month: 10, monthLabel: "October", name: "Khlurthma", inst: "IIM Shillong", instType: "IIM", dates: "Mid-October", watch: "Business case competitions", reg: "Early September", tracks: ["management", "consulting"] },
  { month: 10, monthLabel: "October", name: "Advaita", inst: "ISB Hyderabad + Mohali", instType: "Other", dates: "October", watch: "Consilium (consulting), Mercado (retail), C-Suite (best CEO), Beat the Clock (B-quiz)", reg: "Late August", tracks: ["consulting", "management"] },
  { month: 10, monthLabel: "October", name: "Econvista 2.0", inst: "LSR, DU", instType: "DU", dates: "Oct 14–15, 2025", watch: "Academic-economics conference", reg: "Mid-September", tracks: ["economics", "academic"] },
  { month: 10, monthLabel: "October", name: "Atharv Ranbhoomi", inst: "IIM Indore (IPM)", instType: "IIM", dates: "Oct 31 – Nov 2, 2025", watch: "The only UG-driven flagship across IIMs — B-plan, marketing, finance comps", reg: "Mid-September", tracks: ["entrepreneurship", "finance", "consulting"], star: true },

  { month: 11, monthLabel: "November", name: "Ensemble-Valhalla", inst: "XLRI Jamshedpur", instType: "Other", dates: "Nov 15–17, 2025", watch: "The Next Gen Leader, Circus Maximus, Strategikon, War of Wits, Helios, Tech Tack, Societas.", reg: "Late September", tracks: ["consulting", "management"], star: true },
  { month: 11, monthLabel: "November", name: "7 Lakes Fest", inst: "IIM Calcutta", instType: "IIM", dates: "Nov 15–17, 2024", watch: "Olympus, Marketplace, Lord of Sales, Bizworth, Consulting Knights, Empires of the Mind, Launchpad, Sociopreneur", reg: "Late September", tracks: ["consulting", "management", "finance"], star: true },
  { month: 11, monthLabel: "November", name: "Amalthea", inst: "IIT Gandhinagar", instType: "IIT", dates: "Nov 9–10, 2024", watch: "Conclave, Symposium, Tech Expo (ISRO / Indian Army / Dronelab), Networking Dinner", reg: "Mid-September", tracks: ["tech-mgmt"] },
  { month: 11, monthLabel: "November", name: "Backwaters", inst: "IIM Kozhikode", instType: "IIM", dates: "Nov 15–17, 2024", watch: "InQuizzitive (quiz), Kotler Sutra (marketing), White Knight (national B-plan), Avatar: The Ultimate CEO, MUN, Healthcare Summit", reg: "Mid-September", tracks: ["consulting", "entrepreneurship", "management"], star: true },

  { month: 12, monthLabel: "December", name: "E-Summit (Eureka!)", inst: "IIT Bombay", instType: "IIT", dates: "Dec 11–12, 2025", prize: "Eureka! ₹2 Cr", watch: "Eureka! — Asia's largest business model competition; 28th edition; 25,000+ entries last year; access to 50+ leading VC firms.", reg: "Mid-October", tracks: ["entrepreneurship"], star: true },
  { month: 12, monthLabel: "December", name: "Techfest", inst: "IIT Bombay", instType: "IIT", dates: "Dec 21–24, 2025", watch: "Asia's largest sci-tech festival; Robowars, International Humanoid Summit (debut 2025), Techfest World MUN, AI/ML/IoT workshops", reg: "Mid-October", tracks: ["tech-mgmt"] },
  { month: 12, monthLabel: "December", name: "IMRC — India Mgmt Research Conf.", inst: "IIM Ahmedabad", instType: "IIM", dates: "Dec 5–7, 2025", watch: "Research-paper presentations. Academic flagship — not a student case comp.", reg: "Late August", tracks: ["academic"] },
];

const MONTHS = ["All Year", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TRACKS = [
  { id: "all", label: "All Tracks" },
  { id: "consulting", label: "Consulting" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "finance", label: "Finance" },
  { id: "tech-mgmt", label: "Tech-Mgmt" },
  { id: "management", label: "Management" },
  { id: "economics", label: "Economics" },
  { id: "cultural", label: "Cultural" },
  { id: "academic", label: "Academic" },
];
const INSTS = ["all", "IIM", "IIT", "DU", "Other"];

const WATCHLIST = [
  ["E-Summit IIT-B", "Dec 11–12"], ["IMRC IIM-A", "Dec 5–7"], ["Techfest IIT-B", "Dec 21–24"],
  ["Shaastra IIT-M", "Jan 2–6"], ["Elan & nVision IIT-H", "Jan 9–11"], ["Manfest-Varchasva IIM-L", "Early Feb"],
  ["GES IIT-KGP", "Early Feb"], ["IRIS IIM-I", "Mid-Feb"], ["Anwesha IIT-P", "Feb 7–9"],
  ["Advitiya IIT-Ropar", "Feb 6–8"], ["Arbitrage Ramjas", "Feb 17–18"], ["Tryst IIT-D", "Feb 27–Mar 1"],
  ["Technex IIT-BHU", "Mar 13–15"], ["Cognizance IIT-R", "Late Mar"], ["Techkriti IITK", "Mar 27–30"],
  ["Venix IIM-B", "Aug 1–3"],
];

const HANDLES = [
  "@ecell.iitb", "@techfest.iitb", "@ecell-iitkgp", "@ecelliitk", "@ecelliitbhu", "@trbsiima",
  "@iimbvenix", "@manfestvarchasva_iiml", "@iris_iimi", "@backwatersiimk", "@atharvfest",
  "@ensemble_valhalla", "@shaastra_iitm", "@techkriti.iitk", "@tryst.iitd", "@cogni.iitr",
  "@techniche.iitg", "@advitiya_iitrpr", "@amalthea_iitgn", "@anwesha_iitpatna", "@ignite180.kmc",
  "@crossroads.srcc", "@confluence.hrc", "@renaissance_kmc", "@lsr.tarang", "@mokshansut",
];

function Index() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(0);
  const [track, setTrack] = useState("all");
  const [inst, setInst] = useState("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EVENTS.filter(e => {
      if (month !== 0 && e.month !== month) return false;
      if (track !== "all" && !e.tracks.includes(track)) return false;
      if (inst !== "all" && e.instType !== inst) return false;
      if (q && !`${e.name} ${e.inst} ${e.watch}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, month, track, inst]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <div className="ava">SM</div>
            <span>The Fest Map <span className="yr">'26</span></span>
          </div>
          <div className="nav-links">
            <a className="nav-link" href="#calendar">Calendar</a>
            <a className="nav-link" href="#leadtime">Lead Time</a>
            <a className="nav-link" href="#watchlist">Watchlist</a>
            <a className="nav-link" href="#tracks">By Track</a>
            <a className="nav-link" href="#handles">@meet_.shivam</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div>
              <span className="pin-tag">📌 2026 Planning Edition</span>
              <h1 className="hero-title">
                India's Case-Comp &<br/>
                <span className="red">B-Fest</span> Calendar <span className="blue">—</span><br/>
                Month by Month
              </h1>
              <p className="lede">
                Every IIM, IIT &amp; DU fest worth competing in, mapped across the year.
                Prize pools, flagship events, and exactly when to set your Unstop alerts.
                Whoever you are, wherever you study — don't miss the window.
              </p>
              <div className="heads-up">
                <span className="badge">heads-up</span>
                This is a <b>calendar to track windows</b> — not a links repository.
                Registration links go live <b>as &amp; when the organisers launch</b> the comp / fest.
                Bookmark this, then watch Unstop + the host's Instagram closer to date.
              </div>
              <div className="cta-row">
                <a href="#calendar" className="btn">Explore the Calendar ↓</a>
                <a href="#watchlist" className="btn">Must-Monitor List</a>
              </div>
            </div>

            <div className="polaroid">
              <span className="tape" />
              <div className="photo">SM</div>
              <h3>Shivam Meet</h3>
              <div className="sub">Career navigation for college students</div>
              <div className="center"><span className="follow">✦ 100K+ on Instagram</span></div>
              <div className="socials">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="LinkedIn">in</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="bigpicture">
        <div className="wrap">
          <span className="sec-tag">The Big Picture</span>
          <h2 className="sec-title">Two heavy clusters. One summer drought.</h2>
          <p className="sec-sub">The whole Indian fest calendar bunches into two windows. If you only optimise one quarter, optimise <b>Jan–March</b> — it carries most of the year's prize money and competition count.</p>

          <div className="tldr-grid">
            <div className="note yellow"><span className="tack" />
              <h3>Cluster 1</h3>
              <span className="big">Jan–Apr</span>
              <p>IRIS, Manfest-Varchasva, GES, Technex, Techkriti, Cognizance, Shaastra + nearly all DU society fests. The densest, highest-stakes window of the year.</p>
            </div>
            <div className="note">
              <h3>The Drought</h3>
              <span className="big" style={{color:"#999"}}>May–Jul</span>
              <p>End-sem exams + summer break. Flagship physical fests pause. Use it for solo Unstop comps, internships, and prepping submissions for the August onset (Venix).</p>
            </div>
            <div className="note yellow"><span className="tack" />
              <h3>Cluster 2</h3>
              <span className="big">Aug–Dec</span>
              <p>Venix, Techniche, Red Brick Summit, Atharv Ranbhoomi, Ensemble-Valhalla, 7 Lakes Fest, Eureka! (₹2 Cr) at IIT-B's E-Summit. The B-school &amp; start-up heavy half.</p>
            </div>
          </div>

          <div style={{marginTop: 40}}>
            <span className="sec-tag" style={{background:"var(--red)"}}>Heat Map</span>
            <div className="season">
              {[
                ["JAN","peak","hot"],["FEB","peak","hot"],["MAR","peak","hot"],["APR","busy","warm"],
                ["MAY","quiet","cold"],["JUN","quiet","cold"],["JUL","quiet","cold"],
                ["AUG","builds","warm"],["SEP","builds","warm"],
                ["OCT","peak","hot"],["NOV","peak","hot"],["DEC","peak","hot"],
              ].map(([m,l,c]) => (
                <div key={m} className={`mo ${c}`}>{m}<small>{l}</small></div>
              ))}
            </div>
            <div className="legend">
              <span><i className="swatch" style={{background:"var(--red)"}} /> Peak — register early</span>
              <span><i className="swatch" style={{background:"var(--postit)"}} /> Busy / building up</span>
              <span><i className="swatch" style={{background:"#e2e2e2"}} /> Quiet — off-season</span>
            </div>
          </div>
        </div>
      </section>

      <section id="calendar">
        <div className="wrap">
          <span className="sec-tag">The Calendar</span>
          <h2 className="sec-title">Filter the whole circuit ✦</h2>
          <p className="sec-sub">Filter by month, track, or institution — or just search a fest name. Starred cards are the highest-priority / highest-prize events to never miss.</p>

          <div className="filters">
            <div className="filter-row">
              <span className="lbl">🔍 Search</span>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Type a fest, institution, or sub-event… e.g. Eureka, Strategikon, IIM Indore" />
            </div>
            <div className="filter-row">
              <span className="lbl">📅 Month</span>
              <div className="chips">
                {MONTHS.map((m, i) => (
                  <span key={m} className={`chip ${month === i ? "active" : ""}`} onClick={() => setMonth(i)}>{m}</span>
                ))}
              </div>
            </div>
            <div className="filter-row">
              <span className="lbl">🎯 Track</span>
              <div className="chips">
                {TRACKS.map(t => (
                  <span key={t.id} className={`chip ${track === t.id ? "active" : ""}`} onClick={() => setTrack(t.id)}>{t.label}</span>
                ))}
              </div>
            </div>
            <div className="filter-row">
              <span className="lbl">🏛 Institution</span>
              <div className="chips">
                {INSTS.map(i => (
                  <span key={i} className={`chip ${inst === i ? "active" : ""}`} onClick={() => setInst(i)}>{i === "all" ? "All" : i}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="count-pill">Showing {filtered.length} events</div>

          {filtered.length === 0 ? (
            <div className="no-results">✏️ Nothing matches that combo — try clearing a filter.</div>
          ) : (
            <div className="grid">
              {filtered.map((e, idx) => (
                <div key={idx} className={`card ${e.star ? "star" : ""}`}>
                  {e.star && <span className="star-badge">★ MUST-DO</span>}
                  <div className="ev-month">{e.monthLabel}</div>
                  <h3>{e.name}</h3>
                  <div className="inst">{e.inst}</div>
                  <div className="dates">📅 {e.dates}</div>
                  {e.prize && <span className="prize">💰 {e.prize}</span>}
                  <div className="sub"><b>Watch:</b> {e.watch}</div>
                  <div className="reg">Registration opens: <b>{e.reg}</b></div>
                  <div className="tags">
                    <span className="tag itype">{e.instType}</span>
                    {e.tracks.map(t => (
                      <span key={t} className={`tag ${t}`}>
                        {TRACKS.find(x => x.id === t)?.label ?? t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="leadtime">
        <div className="wrap">
          <span className="sec-tag">Timing</span>
          <h2 className="sec-title">When to actually hit "register"</h2>
          <p className="sec-sub">The golden rule: start monitoring Unstop + the host's Instagram <b>2 months before</b> the typical fest month. Here's the lead time by format.</p>
          <div className="lead-grid">
            <div className="lead"><span className="tape" />
              <h4>Multi-round national case comps</h4>
              <p><i>Eureka!, Empresario, Strategikon, The Fifth Move, Pitch Premier, Olympus</i></p>
              <p>Listings go live <span className="weeks">6–8 weeks</span> before. Round-1 PPT deadlines fall <span className="weeks">3–4 weeks</span> before the main event.</p>
            </div>
            <div className="lead">
              <h4>B-plan / start-up pitching</h4>
              <p><i>Eureka! (IITB), Empresario (KGP), Pitch Premier (IITK), Boardroom (IIT Indore)</i></p>
              <p>Round-1 deck submissions open <span className="weeks">8–10 weeks</span> ahead — mentorship rounds are layered in early.</p>
            </div>
            <div className="lead">
              <h4>Online quiz + on-campus final</h4>
              <p><i>Bizzathlon, Kotler Sutra, Marketplace, Beat the Market</i></p>
              <p>Registration opens <span className="weeks">3–5 weeks</span> before. Round-1 quiz fires <span className="weeks">2–3 weeks</span> before finals.</p>
            </div>
            <div className="lead"><span className="tape" />
              <h4>DU society case comps</h4>
              <p><i>Shri Ram Case Competition, Ramjas Caselympics, KMC Ignite 180</i></p>
              <p>Posted <span className="weeks">3–4 weeks</span> before and close fast. Set Unstop alerts on each society's page.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="watchlist">
        <div className="wrap">
          <span className="sec-tag" style={{background:"var(--blue)"}}>Action List</span>
          <h2 className="sec-title">Build this Unstop watch-list now</h2>
          <p className="sec-sub">The 16 must-monitor events for the next 12 months, in chronological order. Screenshot this.</p>
          <div className="watch-strip">
            {WATCHLIST.map(([name, when], i) => (
              <div key={i} className="watch-item">
                <span className="num">{i + 1}</span>
                <div>
                  <div className="w-name">{name}</div>
                  <div className="w-when">{when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tracks">
        <div className="wrap">
          <span className="sec-tag">Pick Your Lane</span>
          <h2 className="sec-title">The circuit, by ambition</h2>
          <p className="sec-sub">Don't chase everything. Pick the track that matches your goal and hit these in order across the year.</p>
          <div className="track-grid">
            <div className="track">
              <div className="t-head"><div className="t-icon">🧠</div><h3>Consulting aspirant</h3></div>
              <ol>
                <li><b>Venix</b> — The Fifth Move (IIM-B, Aug)</li>
                <li><b>Ignite 180</b> — KMC (Sep–Oct)</li>
                <li><b>Advaita</b> — Consilium, ISB (Oct)</li>
                <li><b>Red Brick Summit</b> — IIM-A (Oct)</li>
                <li><b>Ensemble-Valhalla</b> — Strategikon, XLRI (Nov)</li>
                <li><b>Backwaters</b> — Kotler Sutra, IIM-K (Nov)</li>
                <li><b>SRCC Business Conclave</b> + Economics Summit (Mar–Apr)</li>
              </ol>
            </div>
            <div className="track">
              <div className="t-head"><div className="t-icon">🚀</div><h3>Entrepreneurship / B-plan</h3></div>
              <ol>
                <li><b>Eureka!</b> — IIT Bombay, ₹2 Cr pool (Dec)</li>
                <li><b>Empresario</b> — IIT-KGP, ₹1.2 Cr+ (Feb)</li>
                <li><b>Pitch Premier</b> — Techkriti, IITK (Mar)</li>
                <li><b>Venix YES</b> — IIM Bangalore (Aug)</li>
                <li><b>Atharv Ranbhoomi</b> — IIM Indore (Oct–Nov)</li>
                <li><b>White Knight</b> — Backwaters, IIM-K (Nov)</li>
                <li><b>i5 Summit</b> — IIT + IIM Indore (Aug–Sep)</li>
              </ol>
            </div>
            <div className="track">
              <div className="t-head"><div className="t-icon">📈</div><h3>Finance / quant</h3></div>
              <ol>
                <li><b>Manfest-Varchasva</b> — StockGro &amp; ICICI tracks (Feb)</li>
                <li><b>Global Trading League</b> — GES, IIT-KGP (Feb)</li>
                <li><b>Vertex</b> — Ramjas Arbitrage (Feb)</li>
                <li><b>Beat the Market</b> — Techkriti, IITK (Mar)</li>
                <li><b>Atharv Ranbhoomi</b> finance events (Oct–Nov)</li>
              </ol>
            </div>
            <div className="track">
              <div className="t-head"><div className="t-icon">🏫</div><h3>DU undergrad (low travel)</h3></div>
              <ol>
                <li><b>Mar–Apr Delhi cluster</b> — SRCC, KMC, Ramjas, LSR, Hansraj, Hindu, NSUT</li>
                <li><b>Shri Ram Economics Summit</b> (Apr)</li>
                <li><b>Ignite 180</b> — KMC consulting (Sep–Oct)</li>
                <li><b>Econvista</b> — LSR Economics (Oct)</li>
                <li><b>Arbitrage</b> — Ramjas Commerce (Feb)</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="handles">
        {HANDLES.map(h => <span key={h} className="handle">{h}</span>)}
      </section>

      <section id="caveats">
        <div className="wrap">
          <span className="sec-tag">Read the Fine Print</span>
          <h2 className="sec-title">Before you plan your year</h2>
          <div className="caveat">
            <p><b>A few honest caveats so you don't get burned:</b></p>
            <ul>
              <li><b>Dates shift 2–6 weeks year-to-year.</b> Recent moves: SRCC Crossroads (Feb '24 → Apr '25 → Mar '26), IIT-H Elan &amp; nVision (Feb '25 → Jan '26), IIM Trichy Dhruva (Oct → Jan/Feb). Use the month here, then verify on Unstop + the host's Instagram 6–8 weeks out.</li>
              <li><b>Mergers reduced the fest count.</b> Vista + Eximius = Venix (IIM-B, Aug). Intaglio + Carpe Diem + 7 Lakes Run = 7 Lakes Fest (IIM-C, Nov). The old names persist colloquially but aren't separately registrable.</li>
              <li><b>Prize-pool figures are organiser-published</b> and may bundle in-kind sponsorship value — net cash prizes are usually a fraction. Treat ₹2 Cr / ₹1.2 Cr headlines as marketing-adjusted.</li>
              <li><b>DU society events outside the named flagships are fluid</b> — a single college's Marketing or Finance society may run comps every semester with no fixed brand. Follow each <i>society</i>, not just the college.</li>
              <li><b>Mecca (Hindu College) 2025 was reportedly cancelled</b>; the 2026 edition is expected back in a Feb–Mar slot but isn't confirmed.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="foot">
        Built by Shivam Meet · The Fest Map '26 · Bookmark &amp; revisit closer to each fest.
      </footer>
    </>
  );
}
