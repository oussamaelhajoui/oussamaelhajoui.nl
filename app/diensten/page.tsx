import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Diensten",
  description: "Websites, web apps en backend development met React, Angular, Java, C#, Tailwind CSS en Strapi.",
  alternates: { canonical: "/diensten/" },
};

const services = [
  {
    index: "01",
    title: "Websites",
    lead: "Snel, vindbaar en ontworpen om vertrouwen om te zetten in aanvragen.",
    detail: "Van positionering en paginastructuur tot responsive bouw, technische SEO en CMS-inrichting. Je krijgt geen standaard thema, maar een herkenbare site die past bij jouw bedrijf.",
    items: ["UX & visueel ontwerp", "Tailwind CSS", "Strapi CMS", "SEO & performance"],
  },
  {
    index: "02",
    title: "Web apps",
    lead: "Gebruiksvriendelijke tools voor klanten, teams en complexe processen.",
    detail: "Ik vertaal workflows naar een heldere interface en schaalbare frontend. Denk aan dashboards, klantportalen, configurators en interne applicaties.",
    items: ["React", "Angular", "Design systems", "API-integraties"],
  },
  {
    index: "03",
    title: "Backend & API's",
    lead: "Een stevige technische basis waarop je verder kunt bouwen.",
    detail: "Onderhoudbare services, datamodellen en koppelingen met aandacht voor veiligheid, testbaarheid en heldere verantwoordelijkheden.",
    items: ["Java", "C# / .NET", "REST API's", "Integraties"],
  },
  {
    index: "04",
    title: "Doorontwikkeling",
    lead: "Bestaande software sneller, duidelijker en beter onderhoudbaar maken.",
    detail: "Ik help bij gerichte performanceverbetering, een nieuw frontend-onderdeel, technische opschoning of het stap voor stap moderniseren van je product.",
    items: ["Performance audit", "Refactoring", "Nieuwe features", "Technisch advies"],
  },
];

export default function DienstenPage() {
  return (
    <main>
      <PageHero
        kicker="Diensten"
        title={<>Van scherpe website tot <span className="text-blue">solide software.</span></>}
        text="Je hebt één aanspreekpunt voor ontwerp en development. Dat houdt de lijn kort, de kwaliteit hoog en het proces overzichtelijk."
      />
      <section className="section-pad bg-white">
        <div className="site-shell divide-y divide-navy/15">
          {services.map((service) => (
            <article className="grid gap-8 py-12 first:pt-0 last:pb-0 lg:grid-cols-[90px_1fr_1.1fr]" key={service.index}>
              <span className="font-mono text-xs text-blue">{service.index}</span>
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
            {[
              ["Een nieuwe website", "Je bedrijf is gegroeid, maar je site vertelt nog het oude verhaal."],
              ["Een digitaal product", "Je wilt een portaal, dashboard of web app van idee naar eerste versie brengen."],
              ["Extra engineeringkracht", "Je team kan tijdelijk een ervaren frontend- of backendbouwer gebruiken."],
              ["Een technische upgrade", "Je bestaande product moet sneller, stabieler of makkelijker te onderhouden worden."],
            ].map(([title, text]) => (
              <article className="panel" key={title}>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
