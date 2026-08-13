import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowLink, CodeMark, SectionIntro } from "@/components/Ui";
import { getLocations, getProjects, getSiteContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Software engineer voor websites, webshops & web apps",
  description:
    "Oussama El Hajoui bouwt websites, WordPress-sites, Shopify-webshops en web apps in Eindhoven en omgeving. Vraag vrijblijvend een offerte aan.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [content, projects, locations] = await Promise.all([getSiteContent(), getProjects(), getLocations()]);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <main>
      <section className="hero-grid overflow-hidden border-b border-navy/10">
        <div className="site-shell relative grid min-h-[760px] items-center gap-14 py-20 lg:grid-cols-[1.16fr_.84fr] lg:py-24">
          <div className="relative z-10 max-w-4xl">
            <div className="eyebrow mb-7">
              <span className="status-dot" aria-hidden="true" />
              {content.availability}
            </div>
            <h1 className="display-title max-w-[980px] text-navy">
              {content.heroTitle}
              <span className="text-blue"> {content.heroHighlight}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-muted md:text-xl">
              {content.heroText}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a className="button button-primary" href="/contact/">
                Bespreek je project <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-ghost" href="/online-diensten/">
                Bekijk mijn diensten
              </a>
            </div>
            <div className="mt-14 grid max-w-2xl grid-cols-3 gap-5 border-t border-navy/15 pt-7">
              <div>
                <p className="metric">4</p>
                <p className="metric-label">kerntechnologieën</p>
              </div>
              <div>
                <p className="metric">100%</p>
                <p className="metric-label">persoonlijk contact</p>
              </div>
              <div>
                <p className="metric">0</p>
                <p className="metric-label">onnodige lagen</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="code-card rotate-[-1.25deg]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                  <span className="h-2.5 w-2.5 rounded-full bg-blue" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[.18em] text-white/65">build / create / improve</span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[.2em] text-cyan">Selected stack</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {content.stack.map((item, index) => (
                    <div className="stack-tile" key={item}>
                      <span className="font-mono text-[10px] text-white/65">0{index + 1}</span>
                      <CodeMark label={item} />
                      <p className="mt-4 text-base font-semibold text-white">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-cyan/20 bg-cyan/10 px-5 py-4">
                  <span className="text-sm text-white/75">Van eerste schets tot live product</span>
                  <span className="font-mono text-xs text-cyan">READY_</span>
                </div>
              </div>
            </div>
            <div className="hero-orbit" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-shell">
          <SectionIntro
            kicker="Diensten"
            title="Eén technische partner. Van idee tot impact."
            text="Design, frontend en backend komen samen in een product dat snel, logisch en betrouwbaar voelt."
          />
          <div className="mt-14 grid border-t border-navy/15 lg:grid-cols-3">
            {content.homeServices.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-blue">{service.number}</span>
                  <span className="text-2xl text-blue" aria-hidden="true">↗</span>
                </div>
                <h2 className="mt-14 text-2xl font-semibold tracking-[-.03em] text-navy">{service.title}</h2>
                <p className="mt-4 leading-7 text-ink-muted">{service.text}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {service.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-end">
            <ArrowLink href="/online-diensten/">Alle mogelijkheden bekijken</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-navy/10 bg-mist">
        <div className="site-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="kicker">Eindhoven & omgeving</p>
            <h2 className="section-title mt-5">Website laten bouwen in Eindhoven en omgeving.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">
              Zoek je een websitebouwer in de regio Eindhoven? Ik bouw snelle maatwerk- en WordPress-websites met persoonlijke begeleiding, sterke technische SEO en een duidelijke route naar contact.
            </p>
          </div>
          <nav className="flex flex-wrap gap-3" aria-label="Website laten maken per locatie">
            {locations.map((location) => (
              <a className="chip min-h-11 items-center px-4 font-sans text-sm font-semibold hover:border-blue hover:text-blue" href={`/website-laten-maken/${location.slug}/`} key={location.slug}>
                Website laten maken {location.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="section-pad bg-white">
          <div className="site-shell">
            <SectionIntro
              kicker="Projecten"
              title="Geselecteerd werk. Gericht op resultaat."
              text="Transparant gelabelde conceptcases waarin ontwerp, performance en degelijke techniek samenkomen."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}
            </div>
            <div className="mt-10 flex justify-end">
              <ArrowLink href="/projecten/">Alle projecten bekijken</ArrowLink>
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-mist">
        <div className="site-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="kicker">Mijn standaard</p>
            <h2 className="section-title mt-5">Mooi is goed. Goed én effectief is beter.</h2>
            <p className="mt-6 max-w-lg leading-7 text-ink-muted">
              Elke keuze moet iets opleveren: meer duidelijkheid, minder frictie of een snellere ervaring.
            </p>
          </div>
          <div className="divide-y divide-navy/15 border-y border-navy/15">
            {content.homePrinciples.map((principle, index) => (
              <article className="grid gap-4 py-8 sm:grid-cols-[60px_1fr]" key={principle.title}>
                <span className="font-mono text-xs text-blue">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold text-navy">{principle.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-ink-muted">{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-navy text-white">
        <div className="site-shell relative">
          <div className="tech-glow" aria-hidden="true" />
          <div className="relative z-10 grid items-end gap-12 lg:grid-cols-2">
            <div>
              <p className="kicker text-cyan">Techniek met een reden</p>
              <h2 className="section-title mt-5 max-w-2xl text-white">De juiste stack voor de opdracht.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-white/65 lg:justify-self-end">
              React of Angular aan de voorkant. Java of C# daarachter. WordPress, Strapi of Shopify wanneer dat beter past bij je beheer en verkoop. Geen hype-stack, wel een doordachte keuze.
            </p>
          </div>
          <div className="relative z-10 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {["React", "Angular", "Java", "C# / .NET", "WordPress", "Shopify / Liquid"].map((tech, index) => (
              <div className="bg-navy-soft p-6 sm:p-8" key={tech}>
                <span className="font-mono text-[10px] text-cyan">0{index + 1}</span>
                <p className="mt-8 text-xl font-semibold">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand content={content.cta} />
    </main>
  );
}
