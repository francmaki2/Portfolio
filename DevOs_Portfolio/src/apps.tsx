import { useEffect, useRef, useState } from "react";
import { AppIcon, Icon, type AppId } from "./icons";
import { PORTFOLIO_NAME, CONTACT_EMAIL, RESUME_FILENAME } from "./profile";

const firstName = PORTFOLIO_NAME.split(" ")[0];
const terminalPrompt = `${firstName.toLowerCase()}@devos ~ %`;

export const APPS: { id: AppId; name: string; description: string; keywords: string }[] = [
  {
    id: "projects",
    name: "Projects",
    description: "Explore software engineering projects",
    keywords: "finder work demo web backend",
  },
  {
    id: "certifications",
    name: "Certifications",
    description: "Browse courses and credentials",
    keywords: "certificates education awards",
  },
  {
    id: "about",
    name: "About Me",
    description: `Meet ${firstName} and see the learning timeline`,
    keywords: `profile education biography ${PORTFOLIO_NAME.toLowerCase()}`,
  },
  {
    id: "stack",
    name: "Tech Stack",
    description: "Languages, frameworks, and tools",
    keywords: "skills developer technologies react javascript",
  },
  {
    id: "resume",
    name: "Resume",
    description: "Preview, download, or print my résumé",
    keywords: "cv pdf education experience",
  },
  {
    id: "contact",
    name: "Contact",
    description: "Find email and collaboration details",
    keywords: "email mail hire internship",
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Navigate the workspace with commands",
    keywords: "cli shell command prompt console",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Explore my GitHub profile",
    keywords: "git version control open source",
  },
];

type OpenApp = (id: AppId) => void;

function Tags({ items }: { items: string[] }) {
  return <div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div>;
}

function PanelHeading({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return <header className="panel-heading"><span className="panel-kicker">{kicker}</span><h2>{title}</h2><p>{description}</p></header>;
}

const projectNav = [
  { text: "All Projects", icon: "grid" },
  { text: "Featured", icon: "star" },
  { text: "Web Applications", icon: "globe" },
  { text: "Backend", icon: "server" },
];

function Projects({ openApp }: { openApp: OpenApp }) {
  const [filter, setFilter] = useState("All Projects");
  const [detail, setDetail] = useState(false);
  const [upcoming, setUpcoming] = useState(false);
  const [tab, setTab] = useState<"overview" | "demo" | "architecture" | "results">("overview");
  const scroll = useRef<HTMLElement>(null);
  useEffect(() => { if (scroll.current) scroll.current.scrollTop = 0; }, [filter, detail, tab]);
  const visible = filter !== "Backend";
  return <div className="finder">
    <aside className="finder-sidebar" aria-label="Project categories">
      <span className="sidebar-heading">Favorites</span>
      {projectNav.map(({ text, icon }) => <button key={text} className={text === filter ? "current" : ""} aria-pressed={text === filter} onClick={() => { setFilter(text); setDetail(false); setUpcoming(false); }}><Icon name={icon} size={16}/>{text}</button>)}
      <span className="sidebar-heading finder-secondary">Repositories</span>
      <button onClick={() => openApp("github")}><Icon name="github" size={16}/> GitHub</button>
    </aside>
    <section className="finder-main" ref={scroll}>
      {detail && upcoming ? <>
        <button className="text-action" onClick={() => { setDetail(false); setUpcoming(false); }}><Icon name="back" size={16}/> Back to projects</button>
        <PanelHeading kicker="Upcoming project · Planning stage" title="Adaptive AI Study Platform" description="An AI-powered personalized study workspace designed to adapt to each student's learning progress."/>
        <div className="upcoming-banner"><span>COMING SOON</span><h3>Learn smarter. Improve continuously.</h3><p>Project concept — not yet a released application.</p></div>
        <Tags items={["Next.js (planned)", "TypeScript (planned)", "PostgreSQL (planned)", "LLM API (planned)", "RAG (planned)"]}/>
        <div className="detail-text">
          <section><h3>The idea</h3><p>A personalized learning platform that identifies knowledge gaps, generates tailored quizzes, and recommends what to study next based on performance and learning history.</p></section>
          <section><h3>Planned features</h3><p>Adaptive quizzes, progress tracking, personalized study recommendations, and an AI tutor grounded in relevant study materials through retrieval-augmented generation (RAG).</p></section>
          <section><h3>Proposed architecture</h3><p>Next.js and TypeScript for the application, PostgreSQL for learning data, and an existing LLM API with a RAG pipeline for study-material-aware assistance. This stack is a proposal and may change during development.</p></section>
          <section><h3>Project status</h3><p>In planning. No demo, public repository, or completed functionality is available yet.</p></section>
        </div>
      </> : detail ? <>
        <button className="text-action" onClick={() => setDetail(false)}><Icon name="back" size={16}/> Back to projects</button>
        <PanelHeading kicker="Featured thesis · 2026 · Full-stack developer" title="VisionCore" description="Smart Scheduling. Stronger Teams. An intelligent web-based scheduling and absence replacement system."/>
        <Tags items={["Full-stack", "Scheduling", "Greedy", "Backtracking", "Heuristics", "Genetic Algorithm"]}/>
        <nav className="vision-tabs" aria-label="VisionCore case study sections">
          {(["overview", "demo", "architecture", "results"] as const).map(item => <button key={item} className={tab === item ? "selected" : ""} onClick={() => setTab(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}
        </nav>
        {tab === "overview" && <div className="vision-content">
          <img className="vision-poster" src="/visioncore/poster.png" alt="VisionCore thesis expo poster showing the scheduling interface and leave requests"/>
          <div className="detail-text"><section><h3>The challenge</h3><p>Manual employee scheduling is time-consuming, absences can leave shifts uncovered, and uneven assignments affect workload fairness.</p></section><section><h3>The solution</h3><p>VisionCore generates schedules under defined constraints, identifies replacement candidates for absences, and supports more balanced workload distribution.</p></section><section><h3>My role · Full-stack developer</h3><p>I contributed across frontend development, backend logic, database integration, scheduling algorithms, testing, and technical documentation as part of the thesis project.</p></section></div>
        </div>}
        {tab === "demo" && <div className="vision-content"><h3>VisionCore audiovisual presentation</h3><video className="vision-video" controls preload="metadata" poster="/visioncore/poster.png"><source src="/visioncore/demo.mp4" type="video/mp4"/>Your browser does not support HTML5 video.</video><p className="sample-note">Compressed presentation video for faster loading. The video demonstrates the thesis project; it is not an interactive production deployment.</p></div>}
        {tab === "architecture" && <div className="vision-content"><div className="detail-text"><section><h3>Full-stack implementation</h3><p>VisionCore combines a web user interface for schedules and absence workflows, server-side scheduling logic, and persistent employee and shift data. My contribution spanned these application layers.</p></section><section><h3>Algorithmic approach</h3><p>Greedy selection builds initial assignments; backtracking checks assignment constraints; heuristic methods select absence replacements; and a genetic approach explores workload balance across candidate schedules.</p></section><section><h3>Core workflow</h3><p>Scheduling inputs → apply constraints → generate candidate assignments → evaluate coverage and fairness → produce schedules and replacement recommendations.</p></section></div><p className="sample-note">Architecture is summarized from the thesis materials. Internal backend source code is not publicly distributed.</p></div>}
        {tab === "results" && <div className="vision-content"><div className="vision-stats"><div><strong>13.11s</strong><span>Weekly schedule generation in the reported test</span></div><div><strong>92.86%</strong><span>Automated absence replacement success</span></div><div><strong>76.99%</strong><span>Manual replacement comparison</span></div><div><strong>26 → 4</strong><span>Unfilled shifts (84.62% reduction)</span></div><div><strong>7.47 → 3.26</strong><span>Workload standard deviation</span></div><div><strong>50</strong><span>System evaluation participants</span></div></div><p className="sample-note">Figures are reported thesis evaluation results, not guarantees of performance in every scheduling scenario. Presentation slides contain differing evaluation averages (3.83/5 and 4.10/5), so neither is shown as a definitive overall score here.</p></div>}
      </> : <>
        <PanelHeading kicker="Project explorer" title={filter} description={visible ? "Featured software engineering work and thesis case studies." : "Backend implementation details are available within the VisionCore case study."}/>
        {visible && <div className="project-grid"><button className="project-card" onClick={() => { setUpcoming(false); setDetail(true); setTab("overview"); }}><div className="vision-card-image"><img src="/visioncore/poster.png" alt="VisionCore project poster"/></div><div className="project-copy"><div className="project-title"><h3>VisionCore</h3><Icon name="chevron" size={16}/></div><p>Full-stack intelligent shift scheduling, absence replacement, and workload balancing.</p><Tags items={["Full-stack", "Algorithms", "Thesis · 2026"]}/></div></button>{filter !== "Featured" && <button className="project-card" onClick={() => { setUpcoming(true); setDetail(true); }}><div className="upcoming-card-art"><span className="upcoming-card-mark">✦</span><span className="upcoming-card-label">COMING SOON</span><strong>Adaptive AI<br/>Study Platform</strong></div><div className="project-copy"><div className="project-title"><h3>Adaptive AI Study Platform</h3><Icon name="chevron" size={16}/></div><p>Personalized quizzes, knowledge-gap analysis, and AI-guided study recommendations.</p><Tags items={["Upcoming", "AI / RAG", "Full-stack (planned)"]}/></div></button>}</div>}
      </>}
    </section>
  </div>;
}

const certificates = [
  {
    name: "SAP Certified - SAP Build Developer",
    issuer: "SAP",
    date: "Jul 17, 2026",
    skills: ["SAP Build", "Process Automation", "APIs"],
    initials: "SAP",
    tone: "mint",
    pdf: "/certificates/sap-build-developer.pdf",
    href: "https://www.credly.com/badges/a0d23c57-4a48-4236-843e-804980c71fff",
    credentialId: "",
    expires: "Jul 18, 2027",
    type: "Professional certification",
  },
  {
    name: "PMI Project Management Ready",
    issuer: "Project Management Institute",
    date: "Mar 18, 2026",
    skills: ["Project Management", "Agile", "Business Analysis"],
    initials: "PMI",
    tone: "iris",
    pdf: "/certificates/pmi-project-management-ready.pdf",
    href: "",
    credentialId: "4wrw-XMpP",
    expires: "Mar 18, 2031",
    type: "Professional certification",
  },
  {
    name: "Information Technology Specialist - Python",
    issuer: "Certiport",
    date: "Jul 16, 2025",
    skills: ["Python", "Programming"],
    initials: "Py",
    tone: "peach",
    pdf: "/certificates/its-python.pdf",
    href: "",
    credentialId: "CMEx-uT6C",
    expires: "Jul 16, 2030",
    type: "Professional certification",
  },
  {
    name: "Complete Guide to Android Development with Kotlin for Beginners",
    issuer: "LinkedIn Learning",
    date: "Nov 18, 2025",
    skills: ["Kotlin", "Android Development"],
    initials: "Kt",
    tone: "mint",
    pdf: "/certificates/android-kotlin.pdf",
    href: "https://www.linkedin.com/learning/certificates/9c81dd6bb4d2f7b18a89cc3ab9c1b1f16d847ae14c495760563794c56bbc3bc0",
    credentialId: "",
    expires: "",
    type: "Course completion",
  },
  {
    name: "Using Git with Visual Studio Code",
    issuer: "LinkedIn Learning",
    date: "Oct 27, 2025",
    skills: ["Git", "Visual Studio Code"],
    initials: "Git",
    tone: "iris",
    pdf: "/certificates/git-vscode.pdf",
    href: "https://www.linkedin.com/learning/certificates/41c198250d2e52f12e65370794133910f7d90b68c56e895cec5b750c01400484",
    credentialId: "",
    expires: "",
    type: "Course completion",
  },
  {
    name: "Learning MATLAB",
    issuer: "LinkedIn Learning",
    date: "Oct 3, 2025",
    skills: ["MATLAB"],
    initials: "MAT",
    tone: "peach",
    pdf: "/certificates/learning-matlab.pdf",
    href: "https://www.linkedin.com/learning/certificates/1b75f84279eb0e3fd40545e9a30c87af8efd3e279f65cd89a9b4396f3a49b5f9",
    credentialId: "",
    expires: "",
    type: "Course completion",
  },
];

function Certifications() {
  return (
    <div className="panel-page">
      <PanelHeading
        kicker="Learning record"
        title="Certifications"
        description="Six earned credentials and completed courses. Open a certificate to view the original PDF, or follow its verification link."
      />
      <div className="certificate-grid">
        {certificates.map((cert) => (
          <article className="certificate-card" key={cert.name}>
            <div className={`certificate-preview ${cert.tone}`} aria-hidden="true">
              <div className="certificate-paper">
                <b>{cert.initials}</b>
                <i />
                <i />
                <i />
                <span><Icon name="star" size={13} /></span>
              </div>
            </div>
            <div className="certificate-copy">
              <span className="example-label">{cert.type}</span>
              <h3>{cert.name}</h3>
              <p>{cert.issuer} · {cert.date}</p>
              {cert.expires && <p>Expires: {cert.expires}</p>}
              {cert.credentialId && <p>Credential ID: {cert.credentialId}</p>}
              <Tags items={cert.skills} />
              <a className="text-action" href={cert.pdf} target="_blank" rel="noopener noreferrer">
                View Certificate PDF <Icon name="external" size={14} />
              </a>
              {cert.href && (
                <a className="text-action" href={cert.href} target="_blank" rel="noopener noreferrer">
                  Verify Credential <Icon name="external" size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="panel-page about-page">
      <div className="profile-header">
        <div className="profile-avatar" aria-label="Profile initials">
          {PORTFOLIO_NAME.split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
        <PanelHeading
          kicker="Developer profile"
          title={PORTFOLIO_NAME}
          description="Computer Science student · Software Engineering specialization"
        />
      </div>
      <p className="profile-intro">
        Hi, I'm Franc! I'm a Computer Science student specializing in Software Engineering at
        FEU Institute of Technology. I enjoy building practical software solutions, exploring
        algorithms, and working with databases to solve real-world problems. My experience
        spans Python, Java, C++, PostgreSQL, MySQL, and Git, as well as database management
        and technical troubleshooting. I'm seeking a software development internship where
        I can contribute to a team and continue growing as an engineer.
      </p>
      <div className="about-facts">
        <section>
          <Icon name="book" />
          <h3>Education</h3>
          <p>
            BS Computer Science, specializing in Software Engineering
            <br />
            FEU Institute of Technology · 2023–Present
            <br />
            Dean's Lister
          </p>
        </section>
        <section>
          <Icon name="code" />
          <h3>Technical Interests</h3>
          <p>Software engineering, backend development, databases, algorithms, and optimization.</p>
        </section>
      </div>
      <h3 className="section-title">Experience &amp; milestones</h3>
      <ol className="timeline">
        <li>
          <time>2026</time>
          <div>
            <strong>Built an algorithm-driven shift scheduling system</strong>
            <p>Developed a web-based system using layered architecture, greedy scheduling,
              backtracking, heuristics, and a genetic algorithm.</p>
          </div>
        </li>
        <li>
          <time>2023–Present</time>
          <div>
            <strong>Studying Computer Science at FEU Institute of Technology</strong>
            <p>Specializing in Software Engineering; recognized as a Dean's Lister.</p>
          </div>
        </li>
        <li>
          <time>2022–2024</time>
          <div>
            <strong>Database &amp; Administrative Assistant · Frostbyte Car Airconditioning</strong>
            <p>Maintained and verified customer records and digital files, prepared Excel-based expense trackers and reporting, supported audit documentation, and provided basic software and hardware troubleshooting in a hybrid role in Bulacan.</p>
          </div>
        </li>
      </ol>
    </div>
  );
}

const skillGroups = [
  { name: "Programming Languages", icon: "code", items: [
    ["Py", "Python", "#72c8e4"], ["J", "Java", "#f0aa73"], ["C++", "C++", "#9bbcff"],
    ["SQL", "SQL", "#b9abff"],
  ] },
  { name: "Databases & Data", icon: "grid", items: [
    ["Pg", "PostgreSQL", "#88b4ef"], ["My", "MySQL", "#7bc4d6"],
    ["Acc", "Microsoft Access", "#e5a5bd"], ["XL", "Microsoft Excel", "#90d6ac"],
  ] },
  { name: "Development & Version Control", icon: "branch", items: [
    ["git", "Git", "#fc9a83"], ["github", "GitHub", "#c7adff"],
    ["><", "Visual Studio Code", "#7ac5ff"], ["Rail", "Railway", "#b8b6f3"],
  ] },
  { name: "Additional Training & Tools", icon: "server", items: [
    ["Kt", "Kotlin / Android fundamentals", "#c6a4ff"],
    ["MAT", "MATLAB fundamentals", "#ffae85"],
    ["SAP", "SAP Build", "#85c7fa"],
    ["365", "Microsoft Office", "#efae8b"],
    ["GW", "Google Workspace", "#9dc8ff"],
    ["Adobe", "Adobe Creative Suite", "#e9a5b1"],
  ] },
];

function TechMark({ mark }: { mark: string }) {
  if (mark === "github" || mark === "git")
    return <Icon name={mark === "git" ? "branch" : "github"} size={19} />;
  if (mark === "react")
    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      >
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    );
  if (mark === "tailwind")
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
        <path d="M12 5c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7 1.2 1.2 2.6 2.5 5.4 2.5 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7C16.2 6.3 14.8 5 12 5ZM6 12.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7 1.2 1.2 2.6 2.5 5.4 2.5 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7C10.2 13.5 8.8 12.2 6 12.2Z" />
      </svg>
    );
  return <>{mark}</>;
}

function TechStack() {
  return (
    <div className="panel-page">
      <PanelHeading
        kicker="Developer toolkit"
        title="Tech Stack"
        description="Languages, databases, development tools, and technologies documented in my résumé and training."
      />
      <div className="skills-list">
        {skillGroups.map((group) => (
          <section className="skill-group" key={group.name}>
            <h3>
              <Icon name={group.icon} size={17} />
              {group.name}
            </h3>
            <div>
              {group.items.map(([mark, label, color]) => (
                <span className="skill" key={label}>
                  <b style={{ color }}>
                    <TechMark mark={mark} />
                  </b>
                  {label}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const resumeSections = [
  { title: "Professional Summary", rows: [
    { heading: "", description: "Computer Science student specializing in Software Engineering, with programming, database management, and technical troubleshooting experience. Seeking a software development internship." },
  ] },
  { title: "Education", rows: [
    { heading: "FEU Institute of Technology | BS Computer Science", description: "Software Engineering specialization | 2023–Present | Dean's Lister." },
  ] },
  { title: "Professional Experience", rows: [
    { heading: "Database & Administrative Assistant | Frostbyte Car Airconditioning", description: "2022–2024 | Maintained customer databases and digital records, created Excel-based financial trackers, supported document accuracy and reporting, and performed basic IT troubleshooting." },
  ] },
  { title: "Featured Project", rows: [
    { heading: "VisionCore | Web-based scheduling system | 2026", description: "Full-stack thesis project using layered architecture, greedy scheduling, backtracking, heuristics, and genetic algorithms for workload fairness and absence replacement." },
  ] },
  { title: "Technical Skills", rows: [
    { heading: "", description: "Python, Java, C++, PostgreSQL, MySQL, Microsoft Access, Git, GitHub, Railway, Microsoft Office, Google Workspace." },
  ] },
];

export function ResumeSheet() {
  return (
    <article className="resume-paper">
      <h2>{PORTFOLIO_NAME}</h2>
      <p className="resume-role">Computer Science Student | Software Engineering</p>
      <p className="resume-address">{CONTACT_EMAIL}</p>
      {resumeSections.map(({ title, rows }) => (
        <section key={title}>
          <h3>{title}</h3>
          {rows.map(({ heading, description }) => (
            <div key={description}>
              {heading && <h4>{heading}</h4>}
              <p>{description}</p>
            </div>
          ))}
        </section>
      ))}
      <p className="resume-address">For the complete résumé, open /resume.pdf.</p>
    </article>
  );
}

function Resume() {
  return (
    <div className="resume-viewer">
      <div className="resume-toolbar">
        <span className="resume-filename">
          <AppIcon id="resume" size={24} />{" "}
          <span>{RESUME_FILENAME}<small>Official résumé · PDF</small></span>
        </span>
        <div className="panel-actions">
          <a className="panel-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Icon name="print" size={16} /> Open / Print
          </a>
          <a className="panel-button primary" href="/resume.pdf" download={RESUME_FILENAME}>
            <Icon name="download" size={16} /> Download PDF
          </a>
        </div>
      </div>
      <div className="resume-scroll resume-pdf-container">
        <iframe className="resume-pdf-frame" src="/resume.pdf#toolbar=0" title="Franc Marcus Hermogenes résumé PDF preview" />
        <p className="resume-pdf-fallback">PDF preview not available? <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Open the résumé in a new tab.</a></p>
      </div>
    </div>
  );
}

function Contact({ openApp }: { openApp: OpenApp }) {
  const [copyStatus, setCopyStatus] = useState("");
  const email = CONTACT_EMAIL;
  const phone = "+63 961 557 3163";
  const phoneHref = "tel:+639615573163";
  const linkedin = "https://ph.linkedin.com/in/franc-marcus-hermogenes-32b0b6381";
  const facebook = "https://www.facebook.com/francmarcus.hermogenes";

  async function copyValue(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copied.`);
    } catch {
      setCopyStatus("Clipboard unavailable. Please select and copy the contact detail.");
    }
  }

  return (
    <div className="panel-page contact-page">
      <AppIcon id="contact" size={64} />
      <PanelHeading
        kicker="Contact"
        title="Let’s connect."
        description="I'm open to software development internships, collaboration, and professional connections."
      />
      <div className="contact-links">
        <div className="contact-card">
          <Icon name="mail" size={22} />
          <div>
            <small>Email</small>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <button className="panel-button" aria-label="Copy email address" onClick={() => copyValue(email, "Email address")}>
            <Icon name="copy" size={17} />
          </button>
        </div>
        <div className="contact-card">
          <Icon name="phone" size={22} />
          <div>
            <small>Phone</small>
            <a href={phoneHref}>{phone}</a>
          </div>
          <button className="panel-button" aria-label="Copy phone number" onClick={() => copyValue(phone, "Phone number")}>
            <Icon name="copy" size={17} />
          </button>
        </div>
        <div className="contact-card">
          <Icon name="linkedin" size={22} />
          <div>
            <small>LinkedIn</small>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">Franc Marcus Hermogenes</a>
          </div>
          <a className="panel-button" href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile">
            <Icon name="external" size={17} />
          </a>
        </div>
        <div className="contact-card">
          <Icon name="facebook" size={22} />
          <div>
            <small>Facebook</small>
            <a href={facebook} target="_blank" rel="noopener noreferrer">Franc Marcus Hermogenes</a>
          </div>
          <a className="panel-button" href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Open Facebook profile">
            <Icon name="external" size={17} />
          </a>
        </div>
      </div>
      <p className="copy-status" role="status">{copyStatus}</p>
      <button className="text-action" onClick={() => openApp("github")}>
        <Icon name="github" size={17} /> View my GitHub <Icon name="arrow" size={15} />
      </button>
    </div>
  );
}

function Terminal({ openApp }: { openApp: OpenApp }) {
  const [command, setCommand] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [output, setOutput] = useState<{ command: string; response: string }[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottom.current?.parentElement)
      bottom.current.parentElement.scrollTop = bottom.current.parentElement.scrollHeight;
  }, [output]);
  const targets: Record<string, AppId> = {
    about: "about",
    projects: "projects",
    skills: "stack",
    contact: "contact",
  };
  function execute() {
    const value = command.trim();
    setCommand("");
    if (!value) return;
    const lower = value.toLowerCase();
    if (lower === "clear") {
      setOutput([]);
      setShowWelcome(false);
      return;
    }
    const app = Object.prototype.hasOwnProperty.call(targets, lower) ? targets[lower] : undefined;
    const name = APPS.find(({ id }) => id === app)?.name;
    const response =
      lower === "help"
        ? "help      Show available commands\nabout     Open the developer profile\nprojects  Browse projects\nskills    Open the tech stack\ncontact   Show contact details\nclear     Clear terminal history"
        : name
          ? `Opening ${name}.app…`
          : `Command not found: ${value}. Type “help” to list commands.`;
    setOutput((history) => [...history, { command: value, response }]);
    if (app) openApp(app);
  }
  return (
    <div
      className="terminal-panel"
      onClick={(event) => {
        if (!window.getSelection()?.toString() && event.target !== input.current)
          input.current?.focus();
      }}
    >
      {showWelcome && (
        <>
          <p className="terminal-welcome">
            DevOS Terminal <span>v1.0</span>
          </p>
          <p>
            Type <b>help</b> to see available commands.
          </p>
        </>
      )}
      <div className="terminal-history" aria-live="polite">
        {output.map((entry, index) => (
          <div key={index}>
            <p>
              <span className="terminal-prompt">{terminalPrompt}</span> {entry.command}
            </p>
            <pre>{entry.response}</pre>
          </div>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          execute();
        }}
        className="terminal-form"
      >
        <label className="terminal-prompt" htmlFor="terminal-command">
          {terminalPrompt}
        </label>
        <div className="terminal-input">
          <input
            ref={input}
            id="terminal-command"
            aria-label="Terminal command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!command && <span className="terminal-cursor" />}
        </div>
        <button className="terminal-run" type="submit" aria-label="Run command">
          <Icon name="enter" size={16} />
        </button>
      </form>
      <div ref={bottom} />
    </div>
  );
}

function GitHub() {
  return <div className="panel-page"><PanelHeading kicker="Developer repositories" title="GitHub" description="My public development profile and repositories."/><div className="repository-list"><a className="repository" href="https://github.com/francmaki2" target="_blank" rel="noreferrer"><Icon name="github" size={20}/><div><strong>francmaki2 on GitHub</strong><span>Explore public repositories and source code</span></div><Icon name="external" size={16}/></a></div><p className="sample-note">VisionCore thesis backend source is not published through this portfolio.</p></div>;
}

export function AppContent({ id, openApp }: { id: AppId; openApp: OpenApp }) {
  switch (id) {
    case "projects":
      return <Projects openApp={openApp} />;
    case "certifications":
      return <Certifications />;
    case "about":
      return <About />;
    case "stack":
      return <TechStack />;
    case "resume":
      return <Resume />;
    case "contact":
      return <Contact openApp={openApp} />;
    case "terminal":
      return <Terminal openApp={openApp} />;
    case "github":
      return <GitHub />;
  }
}
