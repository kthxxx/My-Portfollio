"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CinematicHero } from "@/components/landing/CinematicHero";
import { contact, creativeAreas, profile, projects, skillGroups } from "@/data/portfolio-data";

const navigation = [
  ["Index", "#index"], ["About", "#about"], ["Work", "#work"],
  ["Creative", "#creative"], ["Terminal", "/terminal"], ["Contact", "#contact"],
] as const;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-PH", {
      timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit",
      second: "2-digit", hour12: false,
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <>
    <header className="topbar">
      <Link href="/" className="brand">KJ<span>®</span></Link>
      <div className="sys">KEITH.OS / 2026 <i /> PH {time}</div>
      <nav aria-label="Primary navigation">
        {navigation.map(([label, href], index) =>
          <Link key={label} href={href}><small>0{index + 1}</small>{label}</Link>
        )}
      </nav>
      <button className="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "CLOSE" : "MENU"}
      </button>
    </header>
    <AnimatePresence>{menuOpen &&
      <motion.nav className="mobile-menu" aria-label="Mobile navigation" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}>
        {navigation.map(([label, href], index) =>
          <Link key={label} href={href} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}</Link>
        )}
      </motion.nav>
    }</AnimatePresence>
  </>;
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{index}</span><span>{children}</span><span>KEITH.OS</span></div>;
}

function Cursor() {
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: "" });
  useEffect(() => {
    const move = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setCursor({ x: event.clientX, y: event.clientY, label: element?.dataset.cursor ?? "" });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className={`cursor ${cursor.label ? "is-label" : ""}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}>{cursor.label}</div>;
}

export function Portfolio() {
  return <main>
    <Header /><Cursor />
    <CinematicHero />

      <section id="about" className="section">
        <SectionLabel index="02">WHOAMI</SectionLabel>
        <div className="about-grid"><h2>BUILDING BETWEEN<br /><i>LOGIC &amp; FEELING.</i></h2><div className="bio">
          {profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <dl><div><dt>EDUCATION</dt><dd>{profile.school}<br />{profile.degree}</dd></div><div><dt>LOCATION</dt><dd>{profile.location}</dd></div><div><dt>LANGUAGE</dt><dd>{profile.language}</dd></div></dl>
        </div></div>
      </section>

      <section id="work" className="section work">
        <SectionLabel index="03">SELECTED WORK</SectionLabel>
        <div className="section-intro"><h2>SYSTEMS<br />I&apos;VE BUILT</h2><p>Academic, mobile, and interface work—each one a record of a problem explored and a skill sharpened.</p></div>
        <div className="project-list">{projects.map((project, index) =>
          <Link data-cursor="VIEW" href={`/work/${project.slug}`} className="project-row" key={project.slug}>
            <span>0{index + 1}</span><div><small>{project.category}</small><h3>{project.name}</h3></div><p>{project.description}</p><b>↗</b>
          </Link>
        )}</div>
      </section>

      <section id="creative" className="section creative">
        <SectionLabel index="04">CREATIVE ARCHIVE</SectionLabel>
        <div className="section-intro"><h2>THE OTHER<br /><i>HALF OF THE SYSTEM.</i></h2><p>Code builds the structure. Visual work gives it voice.</p></div>
        <div className="archive-grid">{creativeAreas.map((area, index) =>
          <article data-cursor="EXPLORE" key={area.index} className={`archive a${index + 1}`}>
            <div className="archive-screen"><span>{area.index}</span><b>ASSET<br />PENDING</b><i>+</i></div><small>ARCHIVE / {area.index}</small><h3>{area.title}</h3><p>{area.note}</p><em>{area.state}</em>
          </article>
        )}</div>
      </section>

      <section className="section">
        <SectionLabel index="05">CAPABILITIES</SectionLabel>
        <div className="duality"><h2>CODE <span>×</span><br />DESIGN <span>×</span><br />MEDIA</h2><div>
          {skillGroups.map((group) => <div className="skill-row" key={group.label}><span>{group.index} / {group.label}</span><p>{group.items.join(" · ")}</p></div>)}
        </div></div>
      </section>

      <section id="contact" className="contact">
        <SectionLabel index="06">CONTACT</SectionLabel><p>HAVE AN IDEA?</p><h2>LET&apos;S BUILD<br /><i>SOMETHING.</i></h2>
        <div className="contact-links"><a data-cursor="OPEN" href={`mailto:${contact.email}`}>{contact.email} ↗</a><Link data-cursor="OPEN" href="/terminal">OPEN TERMINAL ↗</Link></div>
        <footer><span>KEITH JUSTIN EMETERIO</span><span>CODE × DESIGN × MEDIA</span><span>© {new Date().getFullYear()}</span></footer>
      </section>
  </main>;
}
