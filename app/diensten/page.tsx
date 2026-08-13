import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";
import { getLocations, getSiteContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Diensten",
  description: "Websites, WordPress, Shopify, webshops, web apps, backends, AI-training, pentests en technisch projectleiderschap.",
  alternates: { canonical: "/online-diensten/" },
  robots: { index: false, follow: true },
};

export default async function DienstenPage() {
  const [content, locations] = await Promise.all([getSiteContent(), getLocations()]);

  return (
    <main>
      <PageHero
        kicker={content.servicesHero.kicker}
        title={<>{content.servicesHero.title} <span className="text-blue">{content.servicesHero.highlight}</span></>}
        text={content.servicesHero.text}
      />
      <section className="section-pad bg-white">
        <div className="site-shell divide-y divide-navy/15">
          {content.services.map((service) => (
            <article id={service.slug} className="grid scroll-mt-28 gap-8 py-12 first:pt-0 last:pb-0 lg:grid-cols-[90px_1fr_1.1fr]" key={service.number}>
              <span className="font-mono text-xs text-blue">{service.number}</span>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-.045em] text-navy sm:text-4xl">{service.title}</h2>
                <p className="mt-4 max-w-md text-lg leading-8 text-navy">{service.lead}</p>
              </div>
              <div>
                <p className="leading-7 text-ink-muted">{service.detail}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2" aria-label={`Onderdelen van ${service.title}`}>
                  {service.items.map((item) => (
                    <li className="flex items-center gap-3 border-t border-navy/10 pt-3 text-sm font-semibold" key={item}>
                      <span className="text-cyan" aria-hidden="true">●</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-pad bg-mist">
        <div className="site-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="kicker">Past dit bij jou?</p>
            <h2 className="section-title mt-5">Sterk in compacte, ambitieuze projecten.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.audienceCards.map((card) => (
              <article className="panel" key={card.title}>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="site-shell">
          <p className="kicker">Werkgebied</p>
          <h2 className="section-title mt-5">Website laten maken in jouw plaats.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">Bekijk de lokale aanpak en alle beschikbare diensten voor jouw regio.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <a className="panel flex min-h-24 items-center justify-between gap-4 !p-5 font-semibold hover:border-blue hover:text-blue" href={`/website-laten-maken/${location.slug}/`} key={location.slug}>
                {location.name}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CtaBand content={content.cta} />
    </main>
  );
}
