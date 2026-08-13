import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";
import { getSiteContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Werkwijze",
  description: "Een transparant webdevelopmentproces van verkenning en ontwerp tot bouw, livegang en doorontwikkeling.",
  alternates: { canonical: "/werkwijze/" },
};

export default async function WerkwijzePage() {
  const content = await getSiteContent();

  return (
    <main>
      <PageHero
        kicker={content.processHero.kicker}
        title={<>{content.processHero.title} <span className="text-blue">{content.processHero.highlight}</span></>}
        text={content.processHero.text}
      />
      <section className="section-pad bg-white">
        <div className="site-shell">
          <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 className="section-title">Vijf stappen van vraag naar live.</h2>
            <p className="max-w-xl leading-7 text-ink-muted lg:justify-self-end">Een vast ritme geeft rust. Binnen dat kader blijft genoeg ruimte om slimme inzichten onderweg mee te nemen.</p>
          </div>
          <div>
            {content.processSteps.map((step) => (
              <article className="number-line" key={step.number}>
                <span className="font-mono text-xs text-blue">{step.number}</span>
                <h3 className="text-2xl font-semibold tracking-[-.035em] sm:text-3xl">{step.title}</h3>
                <div>
                  <p className="leading-7 text-ink-muted">{step.text}</p>
                  {step.result && <p className="mt-5 font-mono text-[11px] uppercase tracking-[.14em] text-blue">{step.result}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-navy text-white">
        <div className="site-shell grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="kicker text-cyan">Samenwerken</p>
            <h2 className="section-title mt-5 text-white">Korte lijnen, volwassen keuzes.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
            {content.collaborationCards.map((card) => (
              <article className="bg-navy-soft p-7" key={card.title}>
                <h3 className="text-lg font-semibold text-cyan">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand content={content.cta} />
    </main>
  );
}
