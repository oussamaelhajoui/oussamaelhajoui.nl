import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHero } from "@/components/Ui";
import { getProjects, getSiteContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Projecten & conceptcases",
  description: "Bekijk transparant gelabelde conceptcases voor websites, Shopify-webshops, web apps, AI-training en security van software engineer Oussama El Hajoui.",
  alternates: { canonical: "/projecten/" },
};

export default async function ProjectenPage() {
  const [content, projects] = await Promise.all([getSiteContent(), getProjects()]);

  return (
    <main>
      <PageHero
        kicker="Projecten"
        title={<>Werk dat techniek en <span className="text-blue">resultaat verbindt.</span></>}
        text="Conceptcases die laten zien hoe ik websites, webshops en software vanuit een helder doel vertaal naar een sterk digitaal product."
      />
      <section className="section-pad bg-white">
        <div className="site-shell">
          {projects.length > 0 ? (
            <>
              {projects.some((project) => project.isConcept) && (
                <aside className="mb-10 flex gap-4 rounded-2xl border border-blue/15 bg-mist p-5 sm:items-center" aria-label="Toelichting conceptcases">
                  <span className="status-dot mt-1 shrink-0 sm:mt-0" aria-hidden="true" />
                  <p className="text-sm leading-6 text-ink-muted"><strong className="text-navy">Transparant portfolio:</strong> deze items zijn eigen conceptcases en geen claims over uitgevoerde klantopdrachten. Ze tonen de aanpak, techniek en ontwerpkwaliteit die ik voor een vergelijkbare opdracht inzet.</p>
                </aside>
              )}
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => <ProjectCard project={project} key={project.slug} />)}
              </div>
            </>
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
