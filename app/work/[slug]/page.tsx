import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio-data";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { CaseStudyNotes } from "@/components/portfolio/CaseStudyNotes";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.name || "Project", description: project?.description };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="case">
      <div className="case-top">
        <Link href="/#work">← ALL WORK</Link>
        <span>KEITH.OS / PROJECT FILE</span>
        <span>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
      </div>
      <h1>{project.name}</h1>
      <div className="case-grid">
        <dl className="case-meta">
          <div><dt>TYPE</dt><dd>{project.category}</dd></div>
          <div><dt>ROLE</dt><dd>{project.role}</dd></div>
          <div><dt>TEAM</dt><dd>{project.team}</dd></div>
          <div><dt>STATUS</dt><dd>{project.status}</dd></div>
          <div><dt>STACK</dt><dd>{project.stack.join(" / ")}</dd></div>
          {project.links?.length ? <div><dt>LINKS</dt><dd className="case-links">
            {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
          </dd></div> : null}
        </dl>
        <div className="case-copy"><h2>OVERVIEW</h2><p>{project.detail}</p></div>
      </div>
      <ProjectGallery images={project.gallery} />
      <CaseStudyNotes notes={project.caseStudy} />
    </main>
  );
}
