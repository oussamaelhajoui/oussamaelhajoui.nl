import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ProjectVisual } from "@/components/ProjectCard";
import { getProjects, getSiteContent } from "@/lib/strapi";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projecten/${project.slug}/` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `/projecten/${project.slug}/`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${project.title} — Oussama El Hajoui` }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: ["/og.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [content, projects] = await Promise.all([getSiteContent(), getProjects()]);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: { "@type": "Person", name: content.siteName },
    keywords: project.technologies.join(", "),
    url: `https://oussamaelhajoui.nl/projecten/${project.slug}/`,
  };

  return (
    <main>
      <section className="page-grid overflow-hidden bg-mist py-[clamp(5rem,10vw,9rem)]">
        <div className="site-shell">
          <a className="inline-flex min-h-11 items-center text-sm font-semibold text-blue hover:underline" href="/projecten/">← Alle projecten</a>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-blue">
                <span>{project.client || "Project"}</span>
                {project.year && <><span aria-hidden="true">·</span><span>{project.year}</span></>}
              </div>
              {project.isConcept && <span className="mt-6 inline-flex rounded-full bg-cyan/16 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.14em]">Conceptcase · eigen demo</span>}
              <h1 className="page-title mt-6 max-w-4xl">{project.title}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-muted md:text-xl">{project.summary}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-y border-navy/15 py-6 text-sm">
              <div><span className="block font-mono text-[10px] uppercase tracking-[.14em] text-ink-muted">Type</span><strong className="mt-2 block">{project.services?.[0] || "Digitaal product"}</strong></div>
              <div><span className="block font-mono text-[10px] uppercase tracking-[.14em] text-ink-muted">Status</span><strong className="mt-2 block">{project.isConcept ? "Concept & prototype" : "Gerealiseerd"}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-shell">
          {project.coverImageUrl ? (
            <img className="aspect-[8/5] w-full rounded-[2rem] object-cover" src={project.coverImageUrl} alt={project.coverImageAlt || project.title} width="1400" height="875" />
          ) : <ProjectVisual project={project} large />}

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
            <div>
              <p className="kicker">De case</p>
              <h2 className="section-title mt-5">Van vraagstuk naar heldere oplossing.</h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-muted">{project.description || project.summary}</p>
              {project.isConcept && (
                <aside className="mt-8 rounded-2xl border border-blue/15 bg-mist p-5 text-sm leading-6 text-ink-muted">
                  <strong className="text-navy">Transparant:</strong> dit is een eigen conceptcase. De case toont mijn ontwerp- en ontwikkelaanpak voor een vergelijkbare opdracht en is geen claim over een uitgevoerde klantopdracht.
                </aside>
              )}
            </div>
            <div className="grid content-start gap-8">
              <div className="border-t border-navy/15 pt-6">
                <p className="footer-heading !text-ink-muted">Expertise</p>
                <div className="mt-4 flex flex-wrap gap-2">{project.services?.map((service) => <span className="chip" key={service}>{service}</span>)}</div>
              </div>
              <div className="border-t border-navy/15 pt-6">
                <p className="footer-heading !text-ink-muted">Technologie</p>
                <div className="mt-4 flex flex-wrap gap-2">{project.technologies.map((technology) => <span className="chip" key={technology}>{technology}</span>)}</div>
              </div>
              {project.projectUrl?.startsWith("https://") && <a className="button button-ghost" href={project.projectUrl} rel="noreferrer" target="_blank">Bekijk live project ↗</a>}
            </div>
          </div>
        </div>
      </section>

      <CtaBand content={content.cta} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
