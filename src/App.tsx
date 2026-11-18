import { FormEvent, ReactNode, useEffect, useState } from "react";

type Route = "public" | "admin" | "member";
type LeadStatus = "New" | "Follow-Up" | "Converted" | "Closed";
type Lead = {
  id: number;
  name: string;
  phone: string;
  source: string;
  goal: string;
  status: LeadStatus;
  note: string;
  time: string;
};

const HERO =
  "https://images.unsplash.com/photo-1734668485281-c1d03fee6023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=86&w=1800";
const GYM =
  "https://images.unsplash.com/photo-1770513649465-2c60c8039806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=82&w=1200";

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Neha Bhosale",
    phone: "+91 98765 41230",
    source: "Website",
    goal: "Weight loss",
    status: "New",
    note: "Prefers morning batch",
    time: "10 min ago",
  },
  {
    id: 2,
    name: "Arjun Jadhav",
    phone: "+91 98201 38852",
    source: "Walk-in",
    goal: "Muscle gain",
    status: "New",
    note: "Asked about annual plan",
    time: "34 min ago",
  },
  {
    id: 3,
    name: "Kavya More",
    phone: "+91 97688 90441",
    source: "OCR Scan",
    goal: "General fitness",
    status: "Follow-Up",
    note: "Call after 7 PM",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Omkar Shinde",
    phone: "+91 98920 67453",
    source: "Website",
    goal: "Muscle gain",
    status: "Converted",
    note: "Quarterly plan",
    time: "2 days ago",
  },
  {
    id: 5,
    name: "Tanvi Naik",
    phone: "+91 99304 11229",
    source: "Walk-in",
    goal: "Weight loss",
    status: "Closed",
    note: "Relocating from Thane",
    time: "3 days ago",
  },
];

const members = [
  {
    name: "Rohan Deshmukh",
    id: "VFT-0842",
    phone: "98201 67441",
    plan: "Annual",
    expiry: "28 Feb 2027",
    days: 342,
    due: 0,
    status: "Active",
  },
  {
    name: "Sneha Kulkarni",
    id: "VFT-0836",
    phone: "98673 11204",
    plan: "Quarterly",
    expiry: "26 Mar 2026",
    days: 5,
    due: 2500,
    status: "Expiring",
  },
  {
    name: "Aditya Patil",
    id: "VFT-0791",
    phone: "99302 77851",
    plan: "Half-Yearly",
    expiry: "18 Mar 2026",
    days: 0,
    due: 0,
    status: "Expired",
  },
  {
    name: "Mitali Joshi",
    id: "VFT-0812",
    phone: "97692 34518",
    plan: "Annual",
    expiry: "11 Dec 2026",
    days: 265,
    due: 4000,
    status: "Active",
  },
  {
    name: "Rahul Pawar",
    id: "VFT-0840",
    phone: "98921 58002",
    plan: "Monthly",
    expiry: "27 Mar 2026",
    days: 6,
    due: 0,
    status: "Expiring",
  },
];

const plans = [
  { name: "Monthly", price: 2500, tag: "Flexible start", saving: "" },
  { name: "Quarterly", price: 6500, tag: "Build momentum", saving: "Save ₹1,000" },
  { name: "Half-Yearly", price: 11000, tag: "Serious results", saving: "Save ₹4,000" },
  { name: "Annual", price: 18000, tag: "Best value", saving: "Save ₹12,000", featured: true },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    scan: (
      <>
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M7 12h10M7 9h10M7 15h7" />
      </>
    ),
    card: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </>
    ),
    activity: <path d="M3 12h4l2-7 4 14 2-7h6" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    receipt: (
      <>
        <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Z" />
        <path d="M9 7h6M9 11h6M9 15h3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
        <path d="M4 19v2h16v-2" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h3l2-3h6l2 3h3v13H4V7Z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7V2Z" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M14 3h7v18h-7" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] || paths.activity}
    </svg>
  );
}

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="logo-mark">V</span>
      {!compact && (
        <span>
          <b>VERSATILE</b>
          <small>FITNESS THANE</small>
        </span>
      )}
    </div>
  );
}

function RoleSwitcher({ route, go }: { route: Route; go: (r: Route) => void }) {
  const [open, setOpen] = useState(false);
  const labels = { public: "Public Website", admin: "Admin Panel", member: "Member Portal" };
  return (
    <div className="role-switcher">
      <button onClick={() => setOpen(!open)}>
        <span className="live-dot" />
        <span className="demo-label">Demo:</span> {labels[route]} <Icon name="chevron" size={14} />
      </button>
      {open && (
        <div className="role-menu">
          {(Object.keys(labels) as Route[]).map((r) => (
            <button
              className={route === r ? "active" : ""}
              key={r}
              onClick={() => {
                go(r);
                setOpen(false);
              }}
            >
              {labels[r]}
              <span>{route === r && <Icon name="check" size={15} />}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PublicPage({ onSubmit }: { onSubmit: (lead: Lead) => void }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      id: Date.now(),
      name: String(data.get("name")),
      phone: `+91 ${data.get("phone")}`,
      source: "Website",
      goal: String(data.get("goal")),
      status: "New",
      note: `Prefers ${data.get("timing")}`,
      time: "Just now",
    });
    setSent(true);
    e.currentTarget.reset();
  };
  return (
    <div className="public-page">
      <header className="public-nav">
        <Logo />
        <nav>
          <a href="#facilities">Facilities</a>
          <a href="#plans">Memberships</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#inquiry" className="button small">
          Book free trial
        </a>
      </header>
      <main>
        <section className="hero">
          <img src={HERO} alt="Athlete training with a barbell in a modern gym" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow">
              <span /> THANE'S MOST VERSATILE GYM
            </div>
            <h1>
              YOUR LIMITS.
              <br />
              <em>REDEFINED.</em>
            </h1>
            <p>
              Train stronger, move better, and become the version of yourself you came here to
              build.
            </p>
            <div className="hero-actions">
              <a href="#inquiry" className="button">
                Book your free trial <Icon name="arrow" size={18} />
              </a>
              <a href="#plans" className="text-link">
                Explore memberships <span>↓</span>
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <Icon name="clock" />
                <span>
                  <small>OPEN DAILY</small>6:00 AM – 10:30 PM
                </span>
              </div>
              <div>
                <Icon name="pin" />
                <span>
                  <small>LOCATION</small>Ghodbunder Road, Thane
                </span>
              </div>
            </div>
          </div>
          <div className="hero-number">
            EST. 2018 <b>VFT / 01</b>
          </div>
        </section>

        <section className="section" id="facilities">
          <div className="section-head">
            <div>
              <span className="kicker">BUILT FOR EVERY GOAL</span>
              <h2>
                ONE GYM. <em>EVERY POSSIBILITY.</em>
              </h2>
            </div>
            <p>
              Premium equipment, expert coaching, and the energy you need to show up stronger every
              day.
            </p>
          </div>
          <div className="facility-grid">
            {[
              [
                "01",
                "Strength & Free Weights",
                "Olympic platforms, premium racks, dumbbells up to 50 kg and dedicated lifting zones.",
              ],
              [
                "02",
                "Cardio & Functional",
                "High-performance cardio deck, turf track, battle ropes and functional rigs.",
              ],
              [
                "03",
                "Personal Training",
                "Goal-led 1:1 coaching, body assessments and progress tracking that keeps you accountable.",
              ],
            ].map((x, i) => (
              <article className="facility-card" key={x[0]}>
                {i === 0 && <img src={GYM} alt="Modern gym equipment" />}
                <div className="facility-icon">
                  <Icon name={i === 0 ? "activity" : i === 1 ? "bolt" : "users"} />
                </div>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
                <a href="#inquiry">
                  Explore zone <Icon name="arrow" size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section plans-section" id="plans">
          <div className="center-head">
            <span className="kicker">SIMPLE. TRANSPARENT. WORTH IT.</span>
            <h2>
              CHOOSE YOUR <em>COMMITMENT.</em>
            </h2>
            <p>No joining fee. No hidden charges. Just full access and serious progress.</p>
          </div>
          <div className="plans-grid">
            {plans.map((p) => (
              <article className={`plan-card ${p.featured ? "featured" : ""}`} key={p.name}>
                {p.featured && <b className="popular">MOST POPULAR</b>}
                <span>{p.tag}</span>
                <h3>{p.name}</h3>
                <div className="price">
                  {inr(p.price)}
                  <small> / total</small>
                </div>
                <hr />
                <ul>
                  <li>
                    <Icon name="check" size={15} />
                    Full gym access
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    Free fitness assessment
                  </li>
                  <li>
                    <Icon name="check" size={15} />
                    Locker room access
                  </li>
                </ul>
                {p.saving && <div className="saving">{p.saving}</div>}
                <a href="#inquiry" className={p.featured ? "button" : "outline-button"}>
                  Choose plan
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="inquiry-section" id="inquiry">
          <div className="inquiry-copy">
            <span className="kicker">YOUR FIRST STEP IS FREE</span>
            <h2>
              READY TO
              <br />
              <em>START?</em>
            </h2>
            <p>
              Book a complimentary trial session. Tour the gym, meet a coach and experience the
              energy for yourself.
            </p>
            <div className="promise">
              <span>01</span>
              <div>
                <b>No pressure. No commitment.</b>
                <p>Just a real workout and a conversation about your goals.</p>
              </div>
            </div>
            <div className="promise">
              <span>02</span>
              <div>
                <b>We’ll call within 30 minutes.</b>
                <p>Our team will confirm your preferred slot.</p>
              </div>
            </div>
          </div>
          <form className="inquiry-form" onSubmit={submit}>
            {sent ? (
              <div className="success-state">
                <div>
                  <Icon name="check" size={32} />
                </div>
                <span>INQUIRY RECEIVED</span>
                <h3>You're on the list.</h3>
                <p>Our Thane team will call you shortly to confirm your free trial slot.</p>
                <button type="button" className="outline-button" onClick={() => setSent(false)}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="form-title">
                  <span>FREE TRIAL FORM</span>
                  <b>01 / 01</b>
                </div>
                <label>
                  Full name
                  <input required name="name" placeholder="e.g. Aarav Mehta" />
                </label>
                <div className="form-row">
                  <label>
                    Phone number
                    <div className="phone-input">
                      <span>+91</span>
                      <input required name="phone" inputMode="tel" placeholder="98765 43210" />
                    </div>
                  </label>
                  <label>
                    Age
                    <input required name="age" type="number" min="14" placeholder="24" />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Gender
                    <select name="gender">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </label>
                  <label>
                    Preferred timing
                    <select name="timing">
                      <option>Morning (6–10 AM)</option>
                      <option>Afternoon (12–4 PM)</option>
                      <option>Evening (5–10 PM)</option>
                    </select>
                  </label>
                </div>
                <label>
                  Primary fitness goal
                  <select name="goal">
                    <option>Weight Loss</option>
                    <option>Muscle Gain</option>
                    <option>General Fitness</option>
                  </select>
                </label>
                <button className="button submit">
                  Book my free trial <Icon name="arrow" size={18} />
                </button>
                <small className="privacy">
                  By submitting, you agree to be contacted by Versatile Fitness Thane.
                </small>
              </>
            )}
          </form>
        </section>
      </main>
      <footer>
        <Logo />
        <p>Stronger every day. Right here in Thane.</p>
        <span>© 2026 Versatile Fitness Thane</span>
      </footer>
    </div>
  );
}

const adminNav = [
  ["overview", "grid", "Overview"],
  ["leads", "users", "Leads CRM"],
  ["members", "user", "Members"],
  ["scanner", "scan", "AI Scanner"],
  ["billing", "card", "Billing & POS"],
];

function Shell({
  type,
  active,
  setActive,
  children,
}: {
  type: "admin" | "member";
  active: string;
  setActive: (s: string) => void;
  children: ReactNode;
}) {
  const nav =
    type === "admin"
      ? adminNav
      : [
          ["dashboard", "grid", "Dashboard"],
          ["metrics", "activity", "Body Metrics"],
          ["invoices", "receipt", "Invoices"],
          ["assistant", "bolt", "AI Coach"],
          ["profile", "user", "Profile"],
        ];
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo />
        <div className="side-label">{type === "admin" ? "OPERATIONS" : "MEMBER AREA"}</div>
        <nav>
          {nav.map((n) => (
            <button
              key={n[0]}
              className={active === n[0] ? "active" : ""}
              onClick={() => setActive(n[0])}
            >
              <Icon name={n[1]} />
              <span>{n[2]}</span>
              {n[0] === "leads" && <b>3</b>}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="side-user">
            <div>{type === "admin" ? "AS" : "RD"}</div>
            <span>
              <b>{type === "admin" ? "Amit Sharma" : "Rohan Deshmukh"}</b>
              <small>{type === "admin" ? "Club Manager" : "VFT-0842"}</small>
            </span>
          </div>
          <button>
            <Icon name="logout" />
          </button>
        </div>
      </aside>
      <div className="shell-content">{children}</div>
      <nav className="bottom-nav">
        {nav.slice(0, 5).map((n) => (
          <button
            key={n[0]}
            className={active === n[0] ? "active" : ""}
            onClick={() => setActive(n[0])}
          >
            <Icon name={n[1]} size={19} />
            <span>{n[2].split(" ")[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function AdminPage({ leads, setLeads }: { leads: Lead[]; setLeads: (x: Lead[]) => void }) {
  const [active, setActive] = useState("overview");
  return (
    <Shell type="admin" active={active} setActive={setActive}>
      <Topbar
        title={adminNav.find((n) => n[0] === active)?.[2] || "Overview"}
        subtitle="Thursday, 21 March 2026"
      />
      {active === "overview" && <AdminOverview setActive={setActive} leads={leads} />}{" "}
      {active === "leads" && <LeadCRM leads={leads} setLeads={setLeads} />}{" "}
      {active === "members" && <MemberDirectory />}{" "}
      {active === "scanner" && (
        <Scanner
          onSave={(l) => {
            setLeads([l, ...leads]);
            setActive("leads");
          }}
        />
      )}{" "}
      {active === "billing" && <Billing />}
    </Shell>
  );
}

function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="topbar">
      <div>
        <span className="mobile-logo">
          <Logo compact />
        </span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="top-actions">
        <button className="icon-button">
          <Icon name="search" />
        </button>
        <button className="avatar">AS</button>
      </div>
    </header>
  );
}

function AdminOverview({ setActive, leads }: { setActive: (s: string) => void; leads: Lead[] }) {
  const kpis = [
    ["Active members", "248", "+12 this month", "users"],
    ["Expiring in 7 days", "14", "Action needed", "clock"],
    ["Pending balance", "₹38,500", "Across 11 members", "card"],
    [
      "Today's inquiries",
      String(leads.filter((l) => l.time === "Just now").length + 6),
      "+28% vs yesterday",
      "activity",
    ],
  ];
  return (
    <main className="dashboard">
      <div className="welcome">
        <div>
          <span>GOOD MORNING, AMIT</span>
          <h2>
            Here's what's happening
            <br />
            at <em>Versatile today.</em>
          </h2>
        </div>
        <button className="button" onClick={() => setActive("billing")}>
          <Icon name="plus" size={17} /> New invoice
        </button>
      </div>
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <article className="kpi" key={k[0]}>
            <div className={`kpi-icon i${i}`}>
              <Icon name={k[3]} />
            </div>
            <span>{k[0]}</span>
            <strong>{k[1]}</strong>
            <small className={i === 1 || i === 2 ? "warn" : ""}>{k[2]}</small>
            <div className="spark">
              {[20, 35, 28, 50, 42, 62, 58, 78].map((h, j) => (
                <i key={j} style={{ height: h + "%" }} />
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="overview-grid">
        <section className="panel leads-panel">
          <PanelHead
            title="Recent inquiries"
            sub="Latest leads across all sources"
            action="View CRM"
            onClick={() => setActive("leads")}
          />
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Goal</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 4).map((l) => (
                  <tr key={l.id}>
                    <td>
                      <b>{l.name}</b>
                      <small>{l.phone}</small>
                    </td>
                    <td>
                      <span className={`source ${l.source[0]}`}>{l.source}</span>
                    </td>
                    <td>{l.goal}</td>
                    <td>
                      <Status value={l.status} />
                    </td>
                    <td>
                      <Icon name="arrow" size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel quick-panel">
          <PanelHead title="Quick actions" sub="Common front-desk tasks" />
          <div className="quick-grid">
            <button onClick={() => setActive("scanner")}>
              <span className="lime">
                <Icon name="scan" />
              </span>
              <b>Scan document</b>
              <small>AI + OCR capture</small>
            </button>
            <button onClick={() => setActive("members")}>
              <span>
                <Icon name="user" />
              </span>
              <b>Add member</b>
              <small>Create profile</small>
            </button>
            <button onClick={() => setActive("billing")}>
              <span>
                <Icon name="receipt" />
              </span>
              <b>Create invoice</b>
              <small>POS checkout</small>
            </button>
            <button onClick={() => setActive("leads")}>
              <span>
                <Icon name="users" />
              </span>
              <b>Add inquiry</b>
              <small>New lead</small>
            </button>
          </div>
        </section>
      </div>
      <section className="panel expiring">
        <PanelHead
          title="Memberships expiring soon"
          sub="14 members need attention in the next 7 days"
          action="View all"
          onClick={() => setActive("members")}
        />
        <div className="member-strip">
          {members
            .filter((m) => m.days < 10)
            .map((m) => (
              <div key={m.id}>
                <div className="mini-avatar">
                  {m.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>
                <span>
                  <b>{m.name}</b>
                  <small>
                    {m.plan} · {m.id}
                  </small>
                </span>
                <strong>{m.days} days</strong>
                <button>Renew</button>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

function PanelHead({
  title,
  sub,
  action,
  onClick,
}: {
  title: string;
  sub: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="panel-head">
      <div>
        <h3>{title}</h3>
        <p>{sub}</p>
      </div>
      {action && (
        <button onClick={onClick}>
          {action}
          <Icon name="arrow" size={14} />
        </button>
      )}
    </div>
  );
}

function Status({ value }: { value: string }) {
  return (
    <span className={`status status-${value.toLowerCase().replace(/[^a-z]/g, "")}`}>
      <i />
      {value}
    </span>
  );
}

function LeadCRM({ leads, setLeads }: { leads: Lead[]; setLeads: (x: Lead[]) => void }) {
  const [filter, setFilter] = useState<LeadStatus | "All">("All");
  const statuses: LeadStatus[] = ["New", "Follow-Up", "Converted", "Closed"];
  const convert = (id: number) =>
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: "Converted" } : l)));
  const addLead = () => {
    setLeads([
      {
        id: Date.now(),
        name: "Priya Sawant",
        phone: "+91 98204 65119",
        source: "Walk-in",
        goal: "General fitness",
        status: "New",
        note: "New front-desk inquiry",
        time: "Just now",
      },
      ...leads,
    ]);
    setFilter("New");
  };
  return (
    <main className="dashboard">
      <div className="page-actions">
        <div>
          <h2>Lead pipeline</h2>
          <p>Track every conversation from inquiry to membership.</p>
        </div>
        <button className="button" onClick={addLead}>
          <Icon name="plus" size={17} /> Add lead
        </button>
      </div>
      <div className="filter-pills mobile-only">
        <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>
          All
        </button>
        {statuses.map((s) => (
          <button className={filter === s ? "active" : ""} onClick={() => setFilter(s)} key={s}>
            {s}
          </button>
        ))}
      </div>
      <div className="kanban">
        {statuses.map((status) => (
          <section
            className={`kanban-col ${filter !== "All" && filter !== status ? "mobile-hide" : ""}`}
            key={status}
          >
            <header>
              <Status value={status} />
              <b>{leads.filter((l) => l.status === status).length}</b>
            </header>
            {leads
              .filter((l) => l.status === status)
              .map((l) => (
                <article className="lead-card" key={l.id}>
                  <div className="lead-top">
                    <div className="mini-avatar">
                      {l.name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>
                    <span>
                      <b>{l.name}</b>
                      <small>{l.time}</small>
                    </span>
                    <button>•••</button>
                  </div>
                  <p>{l.phone}</p>
                  <div className="lead-tags">
                    <span>{l.source}</span>
                    <span>{l.goal}</span>
                  </div>
                  <div className="note">“{l.note}”</div>
                  {status !== "Converted" && status !== "Closed" && (
                    <button className="convert" onClick={() => convert(l.id)}>
                      <Icon name="bolt" size={15} /> Convert to member
                    </button>
                  )}
                </article>
              ))}
          </section>
        ))}
      </div>
    </main>
  );
}

function MemberDirectory() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const shown = members.filter(
    (m) =>
      (filter === "All" ||
        (filter === "Balance Due" && m.due > 0) ||
        (filter === "Active" && m.status === "Active") ||
        (filter === "Expiring in 7 Days" && m.days > 0 && m.days < 8) ||
        (filter === "Expired" && m.status === "Expired")) &&
      m.name.toLowerCase().includes(query.toLowerCase()),
  );
  const exportCsv = () => {
    const rows = [
      ["Member", "ID", "Phone", "Plan", "Expiry", "Status", "Balance Due"],
      ...shown.map((m) => [m.name, m.id, m.phone, m.plan, m.expiry, m.status, String(m.due)]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "versatile-fitness-members.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <main className="dashboard">
      <div className="page-actions">
        <div>
          <h2>Member directory</h2>
          <p>{members.length + 243} total members · updated just now</p>
        </div>
        <div>
          <button className="outline-button" onClick={exportCsv}>
            <Icon name="download" size={17} /> Export CSV
          </button>
          <button className="button">
            <Icon name="plus" size={17} /> Add member
          </button>
        </div>
      </div>
      <div className="directory-tools">
        <div className="search-box">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members..."
          />
        </div>
        <div className="filter-pills">
          {["All", "Active", "Expiring in 7 Days", "Expired", "Balance Due"].map((f) => (
            <button className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <section className="panel member-table table-scroll">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Plan</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="member-cell">
                    <div className="mini-avatar">
                      {m.name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>
                    <span>
                      <b>{m.name}</b>
                      <small>
                        {m.id} · +91 {m.phone}
                      </small>
                    </span>
                  </div>
                </td>
                <td>{m.plan}</td>
                <td>
                  {m.expiry}
                  <small>{m.days ? `${m.days} days remaining` : "Expired"}</small>
                </td>
                <td>
                  <Status value={m.status} />
                </td>
                <td className={m.due ? "due" : ""}>{m.due ? inr(m.due) : "—"}</td>
                <td>
                  <button className="icon-button">•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Scanner({ onSave }: { onSave: (l: Lead) => void }) {
  const [phase, setPhase] = useState<"upload" | "scanning" | "result">("upload");
  const simulate = () => {
    setPhase("scanning");
    setTimeout(() => setPhase("result"), 1900);
  };
  return (
    <main className="dashboard">
      <div className="page-actions">
        <div>
          <h2>AI document scanner</h2>
          <p>Extract member data from inquiry forms or government IDs.</p>
        </div>
        <span className="ai-badge">
          <Icon name="bolt" size={15} /> AI + OCR POWERED
        </span>
      </div>
      <div className={`scanner-layout ${phase}`}>
        <section className="panel upload-panel">
          <PanelHead title="Document capture" sub="Upload a clear photo or use your camera" />
          <div className="document-stage">
            {phase === "upload" ? (
              <>
                <div className="upload-icon">
                  <Icon name="camera" size={30} />
                </div>
                <h3>Drop a document here</h3>
                <p>Inquiry form, Aadhaar card or driving licence</p>
                <label className="outline-button">
                  Browse files
                  <input type="file" accept="image/*" hidden />
                </label>
                <span>JPG, PNG or PDF · max 10 MB</span>
              </>
            ) : (
              <div className="mock-doc">
                <div className="doc-head">
                  <span>MH</span>
                  <b>INDIAN UNION DRIVING LICENCE</b>
                </div>
                <div className="doc-body">
                  <div className="photo">AP</div>
                  <div>
                    <b>ADITYA PRAKASH PATIL</b>
                    <p>12/08/1997 · M</p>
                    <p>WAGLE ESTATE, THANE</p>
                    <small>DL NO: MH04 20190001234</small>
                  </div>
                </div>
                {phase === "scanning" && <div className="scan-line" />}
              </div>
            )}
          </div>
          {phase === "upload" && (
            <button className="button scan-button" onClick={simulate}>
              <Icon name="scan" size={18} /> Simulate scan
            </button>
          )}
          {phase === "scanning" && (
            <div className="scanning-label">
              <span className="spinner" />
              <b>Reading document...</b>
              <small>Identifying fields with AI</small>
            </div>
          )}
        </section>
        <section className="panel verify-panel">
          <PanelHead
            title="Verify extracted data"
            sub={
              phase === "result"
                ? "Review and edit before saving"
                : "Extracted fields will appear here"
            }
          />
          {phase === "result" ? (
            <div className="verify-form">
              <div className="confidence">
                <Icon name="check" size={17} />
                <span>
                  <b>98% confidence</b>
                  <small>5 fields extracted successfully</small>
                </span>
              </div>
              <label>
                Full name
                <input defaultValue="Aditya Prakash Patil" />
              </label>
              <div className="form-row">
                <label>
                  Phone number
                  <input defaultValue="+91 99302 77851" />
                </label>
                <label>
                  Gender
                  <select defaultValue="Male">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Date of birth
                  <input defaultValue="12 Aug 1997" />
                </label>
                <label>
                  Age
                  <input defaultValue="28" />
                </label>
              </div>
              <label>
                Address
                <textarea defaultValue="Wagle Estate, Thane West, Maharashtra 400604" />
              </label>
              <button
                className="button submit"
                onClick={() =>
                  onSave({
                    id: Date.now(),
                    name: "Aditya Prakash Patil",
                    phone: "+91 99302 77851",
                    source: "OCR Scan",
                    goal: "General fitness",
                    status: "Converted",
                    note: "Converted from driving licence scan",
                    time: "Just now",
                  })
                }
              >
                <Icon name="check" size={18} /> Save & convert to member
              </button>
            </div>
          ) : (
            <div className="empty-fields">
              {[1, 2, 3, 4, 5].map((x) => (
                <div key={x}>
                  <i />
                  <span />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Billing() {
  const [plan, setPlan] = useState("Annual");
  const [discount, setDiscount] = useState(1000);
  const [paid, setPaid] = useState(12000);
  const [mode, setMode] = useState("UPI");
  const [done, setDone] = useState(false);
  const base = plans.find((p) => p.name === plan)?.price || 20000,
    total = base - discount,
    balance = Math.max(0, total - paid);
  if (done)
    return (
      <main className="dashboard receipt-success">
        <div className="receipt-preview">
          <Logo />
          <div className="success-check">
            <Icon name="check" size={28} />
          </div>
          <span>PAYMENT RECORDED</span>
          <h2>{inr(paid)}</h2>
          <p>Invoice #VFT-2026-0104</p>
          <div>
            <b>Rohan Deshmukh</b>
            <small>
              {plan} membership · {mode}
            </small>
          </div>
          <button className="button" onClick={() => window.print()}>
            <Icon name="download" size={17} /> Download PDF receipt
          </button>
          <button className="outline-button" onClick={() => setDone(false)}>
            Create another invoice
          </button>
        </div>
      </main>
    );
  return (
    <main className="dashboard">
      <div className="page-actions">
        <div>
          <h2>New invoice</h2>
          <p>Fast checkout · Invoice #VFT-2026-0104</p>
        </div>
      </div>
      <div className="billing-layout">
        <section className="panel checkout">
          <PanelHead title="Checkout details" sub="Assign plan and collect payment" />
          <label>
            Member
            <div className="search-box">
              <Icon name="search" size={17} />
              <input defaultValue="Rohan Deshmukh · VFT-0842" />
            </div>
          </label>
          <label>
            Membership plan
            <div className="plan-selector">
              {[...plans.map((p) => p.name), "PT"].map((p) => (
                <button className={plan === p ? "active" : ""} onClick={() => setPlan(p)} key={p}>
                  {p}
                  <small>
                    {p === "PT" ? "₹8,000" : inr(plans.find((x) => x.name === p)?.price || 0)}
                  </small>
                </button>
              ))}
            </div>
          </label>
          <div className="form-row">
            <label>
              Discount (₹)
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(+e.target.value)}
              />
            </label>
            <label>
              Amount paid (₹)
              <input type="number" value={paid} onChange={(e) => setPaid(+e.target.value)} />
            </label>
          </div>
          <label>
            Payment mode
            <div className="payment-modes">
              {["Cash", "UPI", "Card"].map((x) => (
                <button className={mode === x ? "active" : ""} onClick={() => setMode(x)} key={x}>
                  <Icon name={x === "Cash" ? "receipt" : "card"} size={18} />
                  {x}
                  {x === "UPI" && <small>QR scan</small>}
                </button>
              ))}
            </div>
          </label>
        </section>
        <aside className="panel order-summary">
          <PanelHead title="Invoice summary" sub="#VFT-2026-0104" />
          <div className="invoice-brand">
            <Logo />
            <small>21 Mar 2026</small>
          </div>
          <div className="line">
            <span>{plan} membership</span>
            <b>{inr(base)}</b>
          </div>
          <div className="line discount">
            <span>Custom discount</span>
            <b>− {inr(discount)}</b>
          </div>
          <hr />
          <div className="line total">
            <span>Total</span>
            <b>{inr(total)}</b>
          </div>
          <div className="line">
            <span>Paid now</span>
            <b>{inr(paid)}</b>
          </div>
          <div className="balance">
            <span>Balance due</span>
            <strong>{inr(balance)}</strong>
          </div>
          <button className="button submit" onClick={() => setDone(true)}>
            Collect {inr(paid)} & generate receipt
          </button>
          <small className="secure">
            <Icon name="check" size={13} /> GST-ready digital invoice
          </small>
        </aside>
      </div>
    </main>
  );
}

function MemberPage() {
  const [active, setActive] = useState("dashboard");
  return (
    <Shell type="member" active={active} setActive={setActive}>
      <Topbar
        title={
          active === "dashboard"
            ? "My dashboard"
            : active === "assistant"
              ? "AI Fitness Coach"
              : active === "metrics"
                ? "Body Metrics"
                : active === "invoices"
                  ? "Invoices"
                  : "My Profile"
        }
        subtitle="Welcome back, Rohan"
      />
      {active === "dashboard" && <MemberDashboard setActive={setActive} />}{" "}
      {active === "metrics" && <Metrics />} {active === "invoices" && <Invoices />}{" "}
      {active === "assistant" && <Assistant />} {active === "profile" && <Profile />}
    </Shell>
  );
}

function MemberDashboard({ setActive }: { setActive: (s: string) => void }) {
  return (
    <main className="dashboard member-dashboard">
      <div className="member-hello">
        <span>GOOD EVENING, ROHAN</span>
        <h2>
          Stay consistent.
          <br />
          <em>Results will follow.</em>
        </h2>
        <p>You've trained 14 days this month. Keep the streak alive.</p>
      </div>
      <section className="membership-hero">
        <div className="membership-copy">
          <span className="active-pill">
            <i /> MEMBERSHIP ACTIVE
          </span>
          <h3>Annual Membership</h3>
          <p>20 Mar 2026 — 28 Feb 2027</p>
          <div className="member-details">
            <div>
              <small>MEMBER ID</small>
              <b>VFT-0842</b>
            </div>
            <div>
              <small>HOME CLUB</small>
              <b>Thane West</b>
            </div>
            <div>
              <small>BALANCE</small>
              <b className="lime-text">Fully paid</b>
            </div>
          </div>
        </div>
        <div className="progress-ring">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" />
            <circle className="value" cx="60" cy="60" r="50" />
          </svg>
          <div>
            <strong>342</strong>
            <span>DAYS LEFT</span>
          </div>
        </div>
        <div className="membership-watermark">V</div>
      </section>
      <div className="member-cards">
        <section className="panel metric-summary">
          <PanelHead title="Body metrics" sub="Last updated 18 Mar" />
          <div className="metric-values">
            <div>
              <small>WEIGHT</small>
              <b>
                76.4 <span>kg</span>
              </b>
              <em>↓ 1.8 kg</em>
            </div>
            <div>
              <small>BMI</small>
              <b>23.6</b>
              <em>Healthy</em>
            </div>
            <div>
              <small>HEIGHT</small>
              <b>
                180 <span>cm</span>
              </b>
            </div>
          </div>
          <div className="mini-chart">
            <svg viewBox="0 0 400 80" preserveAspectRatio="none">
              <path d="M0 15 C50 20, 65 35, 105 31 S165 48,200 42 S260 58,300 52 S355 68,400 60" />
              <path
                className="area"
                d="M0 15 C50 20,65 35,105 31 S165 48,200 42 S260 58,300 52 S355 68,400 60 V80 H0Z"
              />
            </svg>
          </div>
          <button onClick={() => setActive("metrics")}>
            View progress <Icon name="arrow" size={14} />
          </button>
        </section>
        <section className="panel coach-card">
          <div className="coach-icon">
            <Icon name="bolt" size={23} />
          </div>
          <span>AI FITNESS & DIET COACH</span>
          <h3>Your plan, built around you.</h3>
          <p>
            Get a personalised weekly workout and Indian nutrition plan based on your goal and BMI.
          </p>
          <button className="button" onClick={() => setActive("assistant")}>
            Generate my plan <Icon name="arrow" size={16} />
          </button>
        </section>
      </div>
      <section className="panel recent-payments">
        <PanelHead
          title="Recent payments"
          sub="Your latest transactions"
          action="View all"
          onClick={() => setActive("invoices")}
        />
        <div className="payment-row">
          <div className="receipt-icon">
            <Icon name="receipt" />
          </div>
          <span>
            <b>Annual membership</b>
            <small>20 Mar 2026 · UPI</small>
          </span>
          <strong>
            ₹18,000<small>Paid</small>
          </strong>
          <button>
            <Icon name="download" size={17} />
          </button>
        </div>
      </section>
    </main>
  );
}

function Metrics() {
  const [weight, setWeight] = useState(76.4),
    [height, setHeight] = useState(180),
    [logs, setLogs] = useState([78.2, 77.8, 77.3, 76.9, 76.4]);
  const bmi = (weight / (height / 100) ** 2).toFixed(1);
  return (
    <main className="dashboard">
      <div className="page-actions">
        <div>
          <h2>Your progress</h2>
          <p>Small changes add up to powerful results.</p>
        </div>
      </div>
      <div className="metrics-layout">
        <section className="panel log-metric">
          <PanelHead title="Log today's metrics" sub="Keep your progress up to date" />
          <div className="form-row">
            <label>
              Weight (kg)
              <input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} />
            </label>
            <label>
              Height (cm)
              <input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} />
            </label>
          </div>
          <div className="bmi-result">
            <span>Calculated BMI</span>
            <strong>{bmi}</strong>
            <em>Healthy range</em>
          </div>
          <button className="button submit" onClick={() => setLogs([...logs, weight])}>
            <Icon name="plus" size={16} /> Save today's entry
          </button>
        </section>
        <section className="panel progress-panel">
          <PanelHead title="Weight trend" sub="Last 6 entries" />
          <div className="big-chart">
            <div className="chart-bars">
              {logs.map((v, i) => (
                <div key={i}>
                  <span style={{ height: `${25 + (80 - v) * 10}%` }} />
                  <small>{i === logs.length - 1 ? "Today" : `${i + 1} Mar`}</small>
                </div>
              ))}
            </div>
            <div className="chart-summary">
              <b>−{(logs[0] - logs[logs.length - 1]).toFixed(1)} kg</b>
              <span>since your first log</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const invoiceData = [
  ["#VFT-2026-0104", "Annual Membership", "20 Mar 2026", "₹18,000"],
  ["#VFT-2025-0082", "Personal Training · 8 sessions", "12 Nov 2025", "₹8,000"],
  ["#VFT-2025-0041", "Quarterly Membership", "18 Aug 2025", "₹6,500"],
];
function Invoices() {
  return (
    <main className="dashboard">
      <div className="page-actions">
        <div>
          <h2>Billing history</h2>
          <p>Receipts and payments in one place.</p>
        </div>
      </div>
      <section className="panel invoice-list">
        {invoiceData.map((i) => (
          <div className="invoice-row" key={i[0]}>
            <div className="receipt-icon">
              <Icon name="receipt" />
            </div>
            <span>
              <b>{i[1]}</b>
              <small>
                {i[0]} · {i[2]}
              </small>
            </span>
            <strong>
              {i[3]}
              <small>Paid</small>
            </strong>
            <button className="outline-button" onClick={() => window.print()}>
              <Icon name="download" size={15} /> Download PDF
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

function Assistant() {
  const [generated, setGenerated] = useState(false);
  return (
    <main className="dashboard">
      <div className="assistant-hero">
        <div className="coach-icon">
          <Icon name="bolt" size={24} />
        </div>
        <span>POWERED BY VFT INTELLIGENCE</span>
        <h2>
          Your goal. Your body.
          <br />
          <em>Your smartest plan.</em>
        </h2>
        <p>Based on your Muscle Gain goal, BMI of 23.6 and current weight of 76.4 kg.</p>
        {!generated && (
          <button className="button" onClick={() => setGenerated(true)}>
            Generate my plan <Icon name="bolt" size={16} />
          </button>
        )}
      </div>
      {generated && (
        <div className="ai-results">
          <section className="panel workout-plan">
            <PanelHead title="Weekly workout split" sub="5 training days · 60–75 min sessions" />
            <div className="week-grid">
              {[
                ["MON", "Push", "Chest · Shoulders · Triceps"],
                ["TUE", "Pull", "Back · Biceps · Core"],
                ["WED", "Recovery", "Mobility · 8k steps"],
                ["THU", "Legs", "Quads · Glutes · Calves"],
                ["FRI", "Upper", "Strength · Hypertrophy"],
                ["SAT", "Conditioning", "Cardio · Functional"],
              ].map((d, i) => (
                <div className={i === 2 ? "rest" : ""} key={d[0]}>
                  <span>{d[0]}</span>
                  <b>{d[1]}</b>
                  <small>{d[2]}</small>
                </div>
              ))}
            </div>
          </section>
          <section className="panel diet-plan">
            <PanelHead title="Indian nutrition plan" sub="Lean muscle · Approx. 2,650 kcal/day" />
            <div className="macros">
              <div>
                <b>145g</b>
                <small>PROTEIN</small>
              </div>
              <div>
                <b>330g</b>
                <small>CARBS</small>
              </div>
              <div>
                <b>80g</b>
                <small>FATS</small>
              </div>
            </div>
            {[
              ["Breakfast", "Paneer bhurji, 2 rotis, banana & milk"],
              ["Lunch", "Jeera rice, dal, chicken tikka & salad"],
              ["Snack", "Roasted chana, fruit & whey shake"],
              ["Dinner", "2 rotis, palak paneer & cucumber raita"],
            ].map((m) => (
              <div className="meal" key={m[0]}>
                <b>{m[0]}</b>
                <span>{m[1]}</span>
              </div>
            ))}
          </section>
        </div>
      )}
    </main>
  );
}

function Profile() {
  return (
    <main className="dashboard">
      <section className="panel profile-card">
        <div className="profile-avatar">RD</div>
        <h2>Rohan Deshmukh</h2>
        <p>Member since August 2025</p>
        <div className="profile-grid">
          <label>
            Phone
            <input defaultValue="+91 98201 67441" />
          </label>
          <label>
            Email
            <input defaultValue="rohan.d@email.com" />
          </label>
          <label>
            Fitness goal
            <select>
              <option>Muscle Gain</option>
              <option>Weight Loss</option>
            </select>
          </label>
          <label>
            Preferred timing
            <select>
              <option>Evening (5–10 PM)</option>
            </select>
          </label>
          <label className="full">
            Address
            <input defaultValue="Hiranandani Estate, Ghodbunder Road, Thane West" />
          </label>
        </div>
        <button className="button">Save profile</button>
      </section>
    </main>
  );
}

export default function App() {
  const getRoute = (): Route =>
    location.pathname.startsWith("/admin")
      ? "admin"
      : location.pathname.startsWith("/member")
        ? "member"
        : "public";
  const [route, setRoute] = useState<Route>(getRoute);
  const [leads, setLeads] = useState(initialLeads);
  useEffect(() => {
    const syncRoute = () => setRoute(getRoute());
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);
  const go = (r: Route) => {
    const path = r === "public" ? "/" : `/${r}`;
    history.pushState({}, "", path);
    setRoute(r);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <RoleSwitcher route={route} go={go} />
      {route === "public" ? (
        <PublicPage onSubmit={(l) => setLeads([l, ...leads])} />
      ) : route === "admin" ? (
        <AdminPage leads={leads} setLeads={setLeads} />
      ) : (
        <MemberPage />
      )}
    </>
  );
}
