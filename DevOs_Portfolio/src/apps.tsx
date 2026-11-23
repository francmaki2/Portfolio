import { useEffect, useRef, useState } from "react";
import { AppIcon, Icon, type AppId } from "./icons";
import { PORTFOLIO_NAME, SAMPLE_EMAIL, SAMPLE_RESUME_FILENAME } from "./profile";

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
    description: "Preview, download, or print the sample résumé",
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
    description: "Explore reference repositories",
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
            <p>Maintained customer databases and records, supported reporting with Excel,
              and provided basic IT troubleshooting.</p>
          </div>
        </li>
      </ol>
    </div>
  );
}

const skillGroups = [
  {
    name: "Programming Languages",
    icon: "code",
    items: [
      ["JS", "JavaScript", "#f5d463"],
      ["TS", "TypeScript", "#74b6ff"],
      ["Py", "Python", "#72c8e4"],
      ["SQL", "SQL", "#b9abff"],
    ],
  },
  {
    name: "Frontend Development",
    icon: "globe",
    items: [
      ["react", "React", "#75dcf6"],
      ["5", "HTML5", "#ffa77a"],
      ["#", "CSS", "#78a8ff"],
      ["tailwind", "Tailwind CSS", "#6fe6eb"],
    ],
  },
  {
    name: "Backend Development",
    icon: "server",
    items: [
      ["⬡", "Node.js", "#91d88b"],
      ["Ex", "Express", "#b3adc1"],
      ["↔", "REST APIs", "#a9a6ff"],
    ],
  },
  {
    name: "Databases",
    icon: "grid",
    items: [
      ["Pg", "PostgreSQL", "#88b4ef"],
      ["SL", "SQLite", "#96dfff"],
    ],
  },
  {
    name: "Developer Tools",
    icon: "branch",
    items: [
      ["git", "Git", "#fc9a83"],
      ["github", "GitHub", "#c7adff"],
      ["><", "VS Code", "#7ac5ff"],
      [">_", "Terminal", "#90dfae"],
    ],
  },
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
        description="Languages and tools used across the sample projects and coursework."
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
  {
    title: "Profile",
    rows: [
      {
        heading: "",
        description:
          "Computer science student seeking a software development internship. Interested in accessible web applications, reliable APIs, and collaborative engineering.",
      },
    ],
  },
  {
    title: "Education",
    rows: [
      {
        heading: "Example University | B.S. Computer Science",
        description:
          "Expected 2027. Coursework: data structures, algorithms, databases, and web development.",
      },
    ],
  },
  {
    title: "Example Projects",
    rows: [
      {
        heading: "TaskFlow | React, TypeScript, Tailwind CSS",
        description:
          "Designed a responsive Kanban board with reusable components and a typed task model.",
      },
      {
        heading: "Pulse API | Node.js, Express, PostgreSQL",
        description: "Designed a REST service with input validation and weekly activity summaries.",
      },
    ],
  },
  {
    title: "Technical Skills",
    rows: [
      {
        heading: "",
        description:
          "JavaScript, TypeScript, Python, SQL, React, HTML, CSS, Node.js, Express, PostgreSQL, and Git.",
      },
    ],
  },
];

export function ResumeSheet() {
  return (
    <article className="resume-paper">
      <span className="resume-example">Sample résumé</span>
      <h2>{PORTFOLIO_NAME}</h2>
      <p className="resume-role">Software Development Intern Candidate</p>
      <p className="resume-address">{SAMPLE_EMAIL}</p>
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
    </article>
  );
}

function downloadResume() {
  const escape = (text: string) => text.replace(/[()\\]/g, "\\$&");
  const line = (text: string, y: number, size: number, bold = false) =>
    `BT /${bold ? "F2" : "F1"} ${size} Tf 54 ${y} Td (${escape(text)}) Tj ET\n`;
  let contents =
    "0.12 0.15 0.25 rg\n" +
    line("SAMPLE RESUME", 732, 9, true) +
    line(PORTFOLIO_NAME, 696, 29, true) +
    line("Software Development Intern Candidate", 673, 12, true) +
    line(SAMPLE_EMAIL, 654, 10);
  let y = 619;
  for (const section of resumeSections) {
    contents += line(section.title.toUpperCase(), y, 11, true);
    y -= 19;
    for (const { heading, description } of section.rows) {
      if (heading) {
        contents += line(heading, y, 11, true);
        y -= 15;
      }
      const lines = description.match(/.{1,88}(?:\s|$)|\S+/g) ?? [];
      for (const part of lines) {
        contents += line(part.trim(), y, 10);
        y -= 14;
      }
      y -= 7;
    }
    y -= 14;
  }
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${contents.length} >>\nstream\n${contents}endstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = objects.map((object, index) => {
    const offset = pdf.length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    return offset;
  });
  const xref = pdf.length;
  pdf += `xref\n0 7\n0000000000 65535 f \n${offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = SAMPLE_RESUME_FILENAME;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Resume() {
  return (
    <div className="resume-viewer">
      <div className="resume-toolbar">
        <span className="resume-filename">
          <AppIcon id="resume" size={24} />{" "}
          <span>
            {SAMPLE_RESUME_FILENAME} <small>1 page · Sample</small>
          </span>
        </span>
        <div className="panel-actions">
          <button className="panel-button" onClick={() => window.print()}>
            <Icon name="print" size={16} />
            Print
          </button>
          <button className="panel-button primary" onClick={downloadResume}>
            <Icon name="download" size={16} />
            Download PDF
          </button>
        </div>
      </div>
      <div className="resume-scroll">
        <ResumeSheet />
      </div>
    </div>
  );
}

function Contact({ openApp }: { openApp: OpenApp }) {
  const [copyStatus, setCopyStatus] = useState("");
  const email = SAMPLE_EMAIL;
  return (
    <div className="panel-page contact-page">
      <AppIcon id="contact" size={64} />
      <PanelHeading
        kicker="Contact"
        title="Let’s connect."
        description="Interested in working together? I’m open to software developer internships and conversations about early-career engineering."
      />
      <div className="contact-card">
        <Icon name="mail" size={22} />
        <div>
          <small>Example email address</small>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <button
          className="panel-button"
          aria-label="Copy example email address"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(email);
              setCopyStatus("Copied example address.");
            } catch {
              setCopyStatus("Clipboard unavailable. You can select and copy the address above.");
            }
          }}
        >
          <Icon name={copyStatus.startsWith("Copied") ? "check" : "copy"} size={17} />
        </button>
      </div>
      <p className="copy-status" role="status">
        {copyStatus}
      </p>
      <button className="text-action" onClick={() => openApp("github")}>
        <Icon name="github" size={17} /> Browse GitHub references <Icon name="arrow" size={15} />
      </button>
      <p className="sample-note">
        <Icon name="info" size={15} /> Replace the example address with your own before sharing this
        portfolio.
      </p>
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
