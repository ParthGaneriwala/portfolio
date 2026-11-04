import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import Attitude from "../components/Attitude";
import FlightPlan from "../components/FlightPlan";

const stats = [
  ["30", "peer-reviewed publications in formal verification and autonomous systems"],
  ["67%", "shorter release cycle on a major flight-display software release I led testing for"],
  ["11", "publications from the students I mentored in the lab"],
  ["6", "early-career engineers I mentor at Avidyne, four of them interns"],
];

const EMAIL = "ganeriwalaparth@gmail.com";
const SCHOLAR =
  "https://scholar.google.com/citations?user=aG73xF8AAAAJ&hl=en&oi=ao";
const GITHUB = "https://github.com/ParthGaneriwala";
const LINKEDIN = "https://www.linkedin.com/in/parth-ganeriwala/";

const experience = [
  {
    role: "Software Engineer II",
    org: "Avidyne",
    dates: "May 2026 – Present",
    bullets: [
      "Design and implement embedded C++ software for avionics flight displays: OS services, device drivers and touchscreen interfaces.",
      "Verify software and maintain requirements traceability to support DO-178C and FAA certification audits.",
      "Led testing for a major flight-display software release, cutting the release cycle by 67% versus the previous minor release.",
      "Co-created an internal Claude Code toolkit for certification work, adopted by 5 engineers.",
      "Mentor 6 early-career engineers, including 4 interns.",
    ],
  },
  {
    role: "Software Engineer Intern / Co-Op",
    org: "Avidyne",
    dates: "May 2025 – May 2026",
    bullets: [
      "Expanded end-to-end test coverage across navigation, communication, flight management and flight display systems by 25%.",
      "Built 30+ system-level and flight-specific test cases, cutting initial verification cycle time by ~10%.",
    ],
  },
  {
    role: "Research Scholar",
    org: "ASSIST Research Lab, Florida Institute of Technology",
    dates: "August 2021 – Present",
    bullets: [
      "Formally modeling human cognitive behavior representation with respect to cyber-sickness in AR/VR systems, in a DARPA-funded collaboration with Collins Aerospace, Iowa State University, RTX Technologies Research Center and Smart Information Flow Technologies.",
      "Research on formal verification and assurance of learning-enabled autonomous systems, funded by NASA, DARPA and NAVAIR.",
      "Mentored 20–30 undergraduate and high school students, leading to 11 publications.",
    ],
  },
];

const projects = [
  {
    title: "Soar to nuXmv Translator",
    status: "ASSIST Research Lab",
    text: "A tool converting SOAR (State, Operator, And Result) specifications into nuXmv-compatible models for formal verification and analysis of reactive systems.",
    img: "/nuxmvSoar.webp",
    w: 3745,
    h: 1796,
    href: "https://assistresearchlab.fit.edu/",
    cta: "Visit the lab",
  },
  {
    title: "ALINA + AssistTaxi Dataset",
    status: "Published at CVPR 2024",
    text: "Line marking identification system using the AssistTaxi dataset for autonomous taxiway navigation. AssistTaxi-v2 (AIAA SciTech 2026) extends the dataset.",
    img: "/assist.webp",
    w: 1200,
    h: 775,
    href: "https://openaccess.thecvf.com/content/CVPR2024W/VDU/html/Khan_ALINA_Advanced_Line_Identification_and_Notation_Algorithm_CVPRW_2024_paper.html",
    cta: "Read the paper",
  },
  {
    title: "Software Requirements from Source Code",
    status: "Published at NLPIR 2023",
    text: "A framework using AI language models to automatically extract software requirements from source code.",
    img: "/auto.png",
    w: 1581,
    h: 741,
    href: "https://dl.acm.org/doi/abs/10.1145/3639233.3639242",
    cta: "Read the paper",
  },
  {
    title: "Auto SysML Activity Diagrams",
    status: "IEEE SysCon 2025",
    text: "Functional reasoning tool to automatically generate SysML activity diagrams from structured natural language.",
    img: "/sysml.webp",
    w: 736,
    h: 231,
    href: "https://arxiv.org/abs/2501.18514",
    cta: "Read the paper",
  },
];

const publications = [
  ["Automated Framework to Extract Software Requirements from Source Code", "NLPIR 2023", "https://dl.acm.org/doi/abs/10.1145/3639233.3639242"],
  ["Assuring Learning-Enabled Increasingly Autonomous Systems", "IEEE SysCon 2023", "https://ieeexplore.ieee.org/abstract/document/10131227"],
  ["Systems Engineering With Architecture Modeling, Formal Verification, and Human Interactions for Learning-Enabled Autonomous Agent", "Systems Engineering 28(5), 2025", "https://incose.onlinelibrary.wiley.com/doi/10.1002/sys.21816"],
  ["Design and Validation of Learning Aware HMI for Learning-Enabled Increasingly Autonomous Systems", "IEEE SysCon 2025", "https://ieeexplore.ieee.org/document/11014784"],
  ["Runway vs. Taxiway: Challenges in Automated Line Identification and Notation Approaches", "IEEE SysCon 2025", "https://ieeexplore.ieee.org/document/11014782"],
  ["ALINA: Advanced Line Identification and Notation Algorithm", "CVPR VDU Workshop 2024", "https://openaccess.thecvf.com/content/CVPR2024W/VDU/html/Khan_ALINA_Advanced_Line_Identification_and_Notation_Algorithm_CVPRW_2024_paper.html"],
  ["AssistTaxi: A Comprehensive Dataset for Taxiway Analysis and Autonomous Operations", "IEEE ICMLA 2023", "https://ieeexplore.ieee.org/abstract/document/10459875"],
  ["Cross Dataset Analysis and Network Architecture Repair for Autonomous Car Lane Detection", "IEEE Intelligent Vehicles Symposium 2023", "https://ieeexplore.ieee.org/abstract/document/10186721"],
  ["Towards Knowledge Extraction and Parsing of XML Metadata for SysML System Architecture Modeling", "IEEE UEMCON 2023", "https://ieeexplore.ieee.org/abstract/document/10316143"],
];

const skills = [
  ["Avionics and safety-critical", ["DO-178C", "DOORS", "Embedded C++", "Real-time systems", "HIL simulation", "Test automation", "Formal verification"]],
  ["Languages", ["C/C++", "Python", "Java", "Bash"]],
  ["Machine learning and data", ["PyTorch", "TensorFlow", "OpenCV", "CUDA", "NumPy", "Pandas", "Dask", "Jupyter", "Neo4j", "MongoDB", "MySQL"]],
  ["Tools and practice", ["Linux", "Git", "GitLab", "ROS", "Android", "Scrum", "Claude Code"]],
];

const phrases = [
  "the flight display in the cockpit",
  "proofs behind autonomous pilots",
  "tests that certify an aircraft",
  "AI that sees the taxiway",
];

// The tail of the intro sentence cycles through the work. All phrases share one
// grid cell so the layout never jumps; without script the first one shows.
function Cycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % phrases.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="cycle" aria-hidden="true">
      {phrases.map((p, k) => (
        <span key={p} className={`cycle-item${k === i ? " on" : ""}`} style={{ color: `var(--c${k + 1})` }}>
          {p}
        </span>
      ))}
    </span>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const next = resolvedTheme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="plain-link"
      style={{ background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", cursor: "pointer" }}
      aria-label={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
    >
      {mounted ? (next === "light" ? "Light" : "Dark") : "Theme"}
    </button>
  );
}

export default function Home() {
  const nameRef = useRef(null);

  // Scroll reveals: heading, then text, then picture, once per element.
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Signature move: the wordmark settles back as the first screen leaves.
  useEffect(() => {
    const el = nameRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, window.scrollY / window.innerHeight);
      el.style.transform = `scale(${1 - 0.06 * p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Parth Ganeriwala | Software Engineer & PhD Researcher</title>
        <meta
          name="description"
          content="The portfolio of Parth Ganeriwala, software engineer in avionics and Ph.D. in Computer Science"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://parthganeriwala.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Parth Ganeriwala | Software Engineer & PhD Researcher" />
        <meta
          property="og:description"
          content="Safety-critical avionics software and formal verification of learning-enabled autonomous systems."
        />
        <meta property="og:url" content="https://parthganeriwala.com/" />
        <meta property="og:image" content="https://parthganeriwala.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <FlightPlan />

      <header className="hero" id="home">
        <div className="hero-top">
          <div>
            <p className="hero-intro" data-reveal>
              <span className="sr-only">
                I build software that has to be right: the flight display in
                the cockpit, proofs behind autonomous pilots, tests that
                certify an aircraft, AI that sees the taxiway.
              </span>
              <span aria-hidden="true">
                I build software that has to be right:
                <Cycle />
              </span>
            </p>
            <div style={{ marginTop: "1rem" }} data-reveal>
              <a className="btn" href="/parth_resume.pdf" download>
                Download resume
              </a>
            </div>
          </div>
          <nav className="hero-nav" aria-label="Sections">
            <a className="plain-link" href="#about">About</a>
            <a className="plain-link" href="#work">Work</a>
            <a className="plain-link" href="#contact">Contact</a>
            <ThemeToggle />
          </nav>
        </div>

        <div className="hero-art" data-reveal style={{ "--i": 2 }}>
          <Attitude />
        </div>

        <h1 className="hero-name" ref={nameRef}>
          <span className="sr-only">Parth Ganeriwala</span>
          <svg viewBox="0 0 1000 82" aria-hidden="true" focusable="false">
            <text x="0" y="80" fontSize="112" textLength="1000" lengthAdjust="spacingAndGlyphs" letterSpacing="-4">
              Parth Ganeriwala
            </text>
          </svg>
        </h1>

        <div className="hero-bottom">
          <p style={{ margin: 0 }}>
            Software engineer, avionics · Ph.D., Computer Science
          </p>
          <nav aria-label="Elsewhere">
            <a className="plain-link" href="/parth_cv_academic.pdf" download>Academic CV</a>
            <a className="plain-link" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a className="plain-link" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="plain-link" href={SCHOLAR} target="_blank" rel="noreferrer">Scholar</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section wrap" id="about" aria-labelledby="about-h">
          <div className="split">
            <div>
              <h2 id="about-h" data-reveal style={{ marginBottom: "1.5rem" }}>About</h2>
              <Image
                className="portrait"
                src="/headshot-2023.webp"
                width={1100}
                height={1383}
                alt="Parth Ganeriwala headshot"
                data-reveal
                style={{ "--i": 1 }}
              />
              <dl className="facts" style={{ marginTop: "1.5rem" }} data-reveal>
                <dt>Working at</dt>
                <dd>Avidyne</dd>
                <dt>Research</dt>
                <dd>ASSIST Research Lab, Florida Institute of Technology</dd>
                <dt>Education</dt>
                <dd>Ph.D. in Computer Science, Florida Institute of Technology, 2026</dd>
                <dd>M.S. in Computer Science, Florida Institute of Technology, 2023</dd>
                <dd>B.E. in Computer Science, BITS Pilani, 2021</dd>
              </dl>
            </div>
            <div>
              <p className="statement" data-reveal>
                I&apos;m a software engineer at{" "}
                <a className="link" href="https://www.avidyne.com/" target="_blank" rel="noreferrer">Avidyne</a>{" "}
                building safety-critical avionics software, and a research
                scholar at the ASSIST Research Lab. I recently completed my
                Ph.D. at{" "}
                <a className="link" href="https://fit.edu" target="_blank" rel="noreferrer">Florida Institute of Technology</a>,
                researching formal verification and assurance of
                learning-enabled autonomous systems.
              </p>
              <p className="statement" data-reveal style={{ "--i": 1 }}>
                I was always curious about the &ldquo;behind-the-scenes&rdquo; of
                anything and everything, and when I watched Mr.&nbsp;Robot I knew
                computer science had caught my interest.
              </p>
            </div>
          </div>
        </section>

        <section className="stats" aria-labelledby="stats-h">
          <div className="wrap">
            <h2 id="stats-h" data-reveal>In numbers</h2>
          </div>
          <dl className="stat-grid">
            {stats.map(([n, t], i) => (
              <div key={n} data-reveal style={{ "--i": i, background: `var(--f${i + 1})` }}>
                <dt className="num">{n}</dt>
                <dd>{t}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section wrap" id="experience" aria-labelledby="exp-h">
          <h2 id="exp-h" data-reveal>Experience</h2>
          <div style={{ marginTop: "2rem" }}>
            {experience.map((job) => (
              <article className="row" key={job.role + job.dates} data-reveal>
                <h3 className="row-title">
                  {job.role}
                  <span className="muted" style={{ display: "block", fontSize: "var(--step-small)", fontWeight: 400 }}>
                    {job.org}
                  </span>
                </h3>
                <ul className="bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="small muted num">{job.dates}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap" id="work" aria-labelledby="work-h">
          <h2 id="work-h" data-reveal style={{ marginBottom: "3rem" }}>Selected work</h2>
          {projects.map((p, i) => (
            <article className={`project${i % 2 ? " flip" : ""}`} key={p.title} style={{ "--pc": `var(--c${i + 1})` }}>
              <a className="shot" href={p.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" data-reveal>
                <Image src={p.img} width={p.w} height={p.h} alt="" loading="lazy" />
              </a>
              <div>
                <p className="small project-status" data-reveal style={{ marginBottom: "0.5rem" }}>{p.status}</p>
                <h3 data-reveal style={{ "--i": 1 }}>{p.title}</h3>
                <p data-reveal style={{ "--i": 2, marginBottom: "1.25rem" }}>{p.text}</p>
                <a className="link project-link" href={p.href} target="_blank" rel="noreferrer" data-reveal style={{ "--i": 3, display: "inline-block" }}>
                  {p.cta}
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="section wrap" id="publications" aria-labelledby="pubs-h">
          <div className="split">
            <div>
              <h2 id="pubs-h" data-reveal>Most cited publications</h2>
              <p className="muted" style={{ marginTop: "1rem" }} data-reveal>
                30 accepted peer-reviewed publications in formal verification,
                assurance, and machine learning for autonomous systems.
              </p>
              <p style={{ marginTop: "1rem" }} data-reveal>
                <a className="link" href={SCHOLAR} target="_blank" rel="noreferrer">
                  All publications on Google Scholar
                </a>
              </p>
            </div>
            <ul className="pubs">
              {publications.map(([title, venue, href]) => (
                <li key={title} data-reveal>
                  <a href={href} target="_blank" rel="noreferrer">
                    <span>{title}</span>
                    <span className="small">{venue}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="invert" id="skills" aria-labelledby="skills-h">
          <div className="wrap split">
            <h2 id="skills-h" data-reveal>Skills</h2>
            <div>
              {skills.map(([group, items], gi) => (
                <div className="skill-group" key={group} data-reveal>
                  <h3 className="small" style={{ fontWeight: 500, marginBottom: "0.5rem", color: `var(--c${gi + 1})` }}>{group}</h3>
                  <ul className="skill-list">
                    {items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="closer" id="contact">
        <div className="closer-top">
          <p style={{ margin: 0 }} className="small">
            Available for new projects.
            <br />
            Avionics software, formal methods, autonomous systems.
          </p>
          <nav aria-label="Page">
            <a className="plain-link" href="#about">About</a>
            <a className="plain-link" href="#work">Work</a>
            <a className="plain-link" href="#home">Back to top</a>
          </nav>
        </div>
        <div>
          <p className="lead">Let&apos;s talk about your project.</p>
          <h2>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </h2>
          <div className="closer-meta">
            <nav aria-label="Profiles">
              <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={SCHOLAR} target="_blank" rel="noreferrer">Scholar</a>
            </nav>
            <span>Parth Ganeriwala</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
