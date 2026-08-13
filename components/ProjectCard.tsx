import type { ProjectContent } from "@/lib/strapi";

const visualThemes = ["blue", "cyan", "violet", "green", "amber", "rose"] as const;

function ProjectVisual({ project }: { project: ProjectContent }) {
  const themeIndex = Math.abs(Math.floor(project.sortOrder / 10) - 1) % visualThemes.length;

  return (
    <div className={`project-visual project-visual-${visualThemes[themeIndex]}`} aria-hidden="true">
      <div className="project-visual-orbit" />
      <div className="project-window">
        <div className="project-window-bar">
          <span /><span /><span />
          <em>BUILD / CREATE</em>
        </div>
        <div className="project-window-body">
          <div className="project-window-copy">
            <i className="w-2/3" />
            <i className="w-full" />
            <i className="w-4/5" />
            <b />
          </div>
          <div className="project-window-ui">
            <span className="col-span-2" />
            <span /><span />
            <span /><span />
          </div>
        </div>
      </div>
      <span className="project-visual-code">{project.slug.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}

export function ProjectCard({ project }: { project: ProjectContent }) {
  const projectUrl = project.projectUrl?.startsWith("https://") ? project.projectUrl : null;

  return (
    <article className="panel flex h-full flex-col overflow-hidden !p-0">
      {project.coverImageUrl && (
        <img
          src={project.coverImageUrl}
          alt={project.coverImageAlt || `Project ${project.title}`}
          width="1400"
          height="875"
          className="aspect-[8/5] w-full object-cover"
          loading="lazy"
        />
      )}
      {!project.coverImageUrl && <ProjectVisual project={project} />}
      <div className="flex flex-1 flex-col p-[clamp(1.5rem,4vw,2.5rem)]">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[.14em] text-blue">
          <span>{project.client || "Project"}</span>
          {project.year && <span>{project.year}</span>}
        </div>
        {project.isConcept && <span className="mt-5 w-fit rounded-full bg-cyan/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-navy">Conceptcase · eigen demo</span>}
        <h2 className="mt-5 text-2xl font-semibold tracking-[-.035em] text-navy">{project.title}</h2>
        <p className="mt-4 flex-1 leading-7 text-ink-muted">{project.summary}</p>
        {project.description && <p className="mt-4 text-sm leading-6 text-ink-muted">{project.description}</p>}
        {project.technologies.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2" aria-label={`Technologieën voor ${project.title}`}>
            {project.technologies.map((technology) => <span className="chip" key={technology}>{technology}</span>)}
          </div>
        )}
        {projectUrl && (
          <a className="mt-8 inline-flex min-h-11 items-center font-semibold text-blue hover:underline" href={projectUrl} rel="noreferrer" target="_blank">
            Bekijk project <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
