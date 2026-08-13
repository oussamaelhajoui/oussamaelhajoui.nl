import type { ProjectContent } from "@/lib/strapi";

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
      <div className="flex flex-1 flex-col p-[clamp(1.5rem,4vw,2.5rem)]">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[.14em] text-blue">
        <span>{project.client || "Project"}</span>
        {project.year && <span>{project.year}</span>}
      </div>
      <h2 className="mt-8 text-2xl font-semibold tracking-[-.035em] text-navy">{project.title}</h2>
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
