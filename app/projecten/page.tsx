import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHero } from "@/components/Ui";
import { getProjects, getSiteContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Projecten",
  description: "Bekijk websites, web apps en softwareprojecten van software engineer Oussama El Hajoui.",
  alternates: { canonical: "/projecten/" },
};

export default async function ProjectenPage() {
  const [content, projects] = await Promise.all([getSiteContent(), getProjects()]);

  return (
    <main>
      <PageHero
        kicker="Projecten"
        title={<>Werk dat techniek en <span className="text-blue">resultaat verbindt.</span></>}
        text="Een selectie van websites, web apps en technische oplossingen. Ieder project start bij het doel en eindigt bij een product dat prettig werkt."
      />
      <section className="section-pad bg-white">
        <div className="site-shell">
          {projects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => <ProjectCard project={project} key={project.slug} />)}
            </div>
          ) : (
            <div className="panel mx-auto max-w-3xl text-center">
              <p className="kicker">Portfolio in opbouw</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-.04em]">Nieuwe cases volgen binnenkort.</h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-ink-muted">
                Wil je ondertussen weten wat ik voor jouw website of web app kan betekenen? Vertel me kort over je idee.
              </p>
              <a className="button button-primary mt-8" href="/contact/">Bespreek je project</a>
            </div>
          )}
        </div>
      </section>
      <CtaBand content={content.cta} />
    </main>
  );
}
