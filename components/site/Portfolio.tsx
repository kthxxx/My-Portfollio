"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CinematicHero } from "@/components/landing/CinematicHero";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { Tooltip } from "@/components/portfolio/Tooltip";
import { contact, creativeArchivePreviews, graphicDesignProjects, profile, projects, skillGroups, videoProjects } from "@/data/portfolio-data";

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
  const reduceMotion = useReducedMotion();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [activeArchive, setActiveArchive] = useState<(typeof creativeArchivePreviews)[number]["id"]>(creativeArchivePreviews[0].id);
  const [selectedGraphic, setSelectedGraphic] = useState<(typeof graphicDesignProjects)[number] | null>(null);
  const archiveLauncher = useRef<HTMLButtonElement>(null);
  const closeArchive = useCallback(() => {
    setArchiveOpen(false);
    window.requestAnimationFrame(() => archiveLauncher.current?.focus());
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedGraphic) setSelectedGraphic(null);
      else closeArchive();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedGraphic, archiveOpen, closeArchive]);

  useEffect(() => {
    if (!archiveOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [archiveOpen, activeArchive]);

  useEffect(() => {
    if (!archiveOpen) return;
    const frame = window.requestAnimationFrame(() => document.getElementById(`archive-tab-${activeArchive}`)?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [archiveOpen]);

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
            <span>0{index + 1}</span>
            <div><small>{project.category}</small><h3>{project.name}</h3></div>
            <p>{project.description}</p>
            <div className="project-thumb">
              <Image src={project.mockupImage.src} alt="" fill sizes="(max-width: 800px) 42vw, 18vw" />
            </div>
            <b>↗</b>
          </Link>
        )}</div>
      </section>

      <section id="creative" className="section creative">
        <SectionLabel index="04">CREATIVE ARCHIVE</SectionLabel>
        <div className="section-intro"><h2>THE OTHER<br /><i>HALF OF THE SYSTEM.</i></h2><p>Code builds the structure. Visual work gives it voice.</p></div>
        <button ref={archiveLauncher} data-cursor="EXPLORE" className="archive-launch archive-launch-single" type="button" aria-haspopup="dialog" onClick={() => setArchiveOpen(true)}>
          <span className="archive-launch-media" style={{ backgroundImage: `url("${creativeArchivePreviews[0].cover}")` }} />
          <span className="archive-launch-copy"><small>{creativeArchivePreviews.reduce((total, archive) => total + archive.itemCount, 0).toString().padStart(2, "0")} SELECTED WORKS</small><strong>THE CREATIVE ARCHIVE</strong><em>Posters, identity studies, visual communication, and selected video work.</em><b>OPEN ARCHIVE ↗</b></span>
        </button>
      </section>

      {archiveOpen && <div className="archive-dialog" role="dialog" aria-modal="true" aria-label="Creative archive" onClick={closeArchive}>
        <div className="archive-dialog-panel" onClick={(event) => event.stopPropagation()}>
          <header className="archive-dialog-header">
            <div><small>CREATIVE ARCHIVE</small><h2>{activeArchive === "graphic-design" ? "Graphic Design" : "Video & Media"}</h2></div>
            <Tooltip label="Close archive"><button type="button" onClick={closeArchive} aria-label="Close archive">CLOSE ×</button></Tooltip>
          </header>
          <div className="archive-tabs" role="tablist" aria-label="Creative archive collections" onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              const next = activeArchive === "graphic-design" ? "video-media" : "graphic-design";
              setActiveArchive(next);
              document.getElementById(`archive-tab-${next}`)?.focus();
            }
          }}>
            {creativeArchivePreviews.map((archive) => <button key={archive.id} id={`archive-tab-${archive.id}`} type="button" role="tab" aria-selected={activeArchive === archive.id} aria-controls="archive-active-panel" tabIndex={activeArchive === archive.id ? 0 : -1} onClick={() => setActiveArchive(archive.id)}>
              {archive.title}<small>{String(archive.itemCount).padStart(2, "0")}</small>
            </button>)}
          </div>
          <AnimatePresence mode="wait" initial={false}>
          {activeArchive === "graphic-design" ? <motion.div
            className="graphic-gallery archive-tab-panel"
            key="graphic-design"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <div id="archive-active-panel" role="tabpanel" aria-labelledby="archive-tab-graphic-design">
            {(["School", "Conference", "Logo"] as const).map((category) => <section className="graphic-category" key={category}>
              <div className="graphic-category-heading"><span>GRAPHIC DESIGN / {category.toUpperCase()}</span><b>{graphicDesignProjects.filter((graphic) => graphic.category === category).length} WORKS</b></div>
              <div className="graphic-grid">{graphicDesignProjects.filter((graphic) => graphic.category === category).map((graphic) =>
                <button data-cursor="VIEW" className="graphic-card" type="button" key={graphic.src} onClick={() => setSelectedGraphic(graphic)}>
                  <Image src={graphic.src} alt={graphic.title} width={graphic.width} height={graphic.height} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 30vw" />
                  <span><small>{graphic.category}</small><strong>{graphic.title}</strong></span>
                </button>
              )}</div>
            </section>)}
            </div>
          </motion.div> : <motion.div
            className="video-grid archive-tab-panel"
            id="archive-active-panel"
            role="tabpanel"
            aria-labelledby="archive-tab-video-media"
            key="video-media"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >{videoProjects.map((video) =>
            <a data-cursor="WATCH" key={video.id} className="video-card" href={video.href} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)` }}>
              <span className="video-card-play" aria-hidden="true">▶</span>
              <span className="video-card-copy"><small>{video.role}</small><strong>{video.title}</strong><em>Watch on YouTube ↗</em></span>
            </a>
          )}</motion.div>}
          </AnimatePresence>
        </div>
      </div>}

      {selectedGraphic && <div className="graphic-lightbox" role="dialog" aria-modal="true" aria-label={selectedGraphic.title} onClick={() => setSelectedGraphic(null)}>
        <Tooltip label="Close artwork"><button className="graphic-lightbox-close" type="button" aria-label="Close artwork" onClick={() => setSelectedGraphic(null)}>CLOSE ×</button></Tooltip>
        <div className="graphic-lightbox-art" onClick={(event) => event.stopPropagation()}>
          <Image src={selectedGraphic.src} alt={selectedGraphic.title} fill sizes="90vw" priority />
          <p>{selectedGraphic.category} / {selectedGraphic.title}</p>
        </div>
      </div>}

      <section className="section">
        <SectionLabel index="05">CAPABILITIES</SectionLabel>
        <div className="duality"><h2>CODE <span>×</span><br />DESIGN <span>×</span><br />MEDIA</h2><div>
          {skillGroups.map((group) => <div className="skill-row" key={group.label}><span>{group.index} / {group.label}</span><p>{group.items.join(" · ")}</p></div>)}
        </div></div>
      </section>

      <section id="contact" className="contact">
        <SectionLabel index="06">CONTACT</SectionLabel><p>HAVE AN IDEA?</p><h2>LET&apos;S BUILD<br /><i>SOMETHING.</i></h2>
        <ContactForm />
        <div className="contact-links">
          <a data-cursor="OPEN" href={`mailto:${contact.email}`}>{contact.email} ↗</a>
          <a data-cursor="OPEN" href={contact.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a data-cursor="OPEN" href={contact.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a data-cursor="OPEN" href={contact.behance} target="_blank" rel="noreferrer">BEHANCE ↗</a>
          <a data-cursor="OPEN" href={contact.resume} download="Keith_Justin_Emeterio_Final_CV.pdf">DOWNLOAD CV ↓</a>
          <Link data-cursor="OPEN" href="/terminal">OPEN TERMINAL ↗</Link>
        </div>
        <footer><span>KEITH JUSTIN EMETERIO</span><span>CODE × DESIGN × MEDIA</span><span>© {new Date().getFullYear()}</span></footer>
      </section>
  </main>;
}
