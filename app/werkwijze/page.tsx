import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Werkwijze",
  description: "Een transparant webdevelopmentproces van verkenning en ontwerp tot bouw, livegang en doorontwikkeling.",
  alternates: { canonical: "/werkwijze/" },
};

const steps = [
  ["01", "Scherpstellen", "We bespreken doel, doelgroep, gewenste functies en randvoorwaarden. Daarna krijg je een heldere scope, planning en offerte.", "Resultaat: gedeelde richting"],
  ["02", "Structuur & ontwerp", "Ik vertaal de inhoud en gebruikersreis naar een sterk visueel systeem. Je ziet vroeg hoe het product gaat voelen.", "Resultaat: klikbaar beeld"],
  ["03", "Bouwen", "De gekozen richting wordt zorgvuldig ontwikkeld. Je kunt tussentijds meekijken en krijgt korte, concrete updates.", "Resultaat: werkend product"],
  ["04", "Testen & live", "Responsiviteit, toegankelijkheid, snelheid en SEO worden gecontroleerd voordat de definitieve versie livegaat.", "Resultaat: zelfverzekerde lancering"],
  ["05", "Verder groeien", "Na livegang kan ik ondersteunen met meten, verbeteren en uitbreiden. Alleen wanneer het echt iets toevoegt.", "Resultaat: duurzame vooruitgang"],
];

export default function WerkwijzePage() {
  return (
    <main>
      <PageHero
        kicker="Werkwijze"
        title={<>Duidelijk proces. <span className="text-blue">Sterk resultaat.</span></>}
        text="Je weet steeds wat er gebeurt, waarom een keuze wordt gemaakt en wat de volgende stap is. Zonder onnodige vergaderingen."
      />
      <section className="section-pad bg-white">
        <div className="site-shell">
          <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 className="section-title">Vijf stappen van vraag naar live.</h2>
            <p className="max-w-xl leading-7 text-ink-muted lg:justify-self-end">Een vast ritme geeft rust. Binnen dat kader blijft genoeg ruimte om slimme inzichten onderweg mee te nemen.</p>
          </div>
          <div>
            {steps.map(([index, title, text, result]) => (
              <article className="number-line" key={index}>
                <span className="font-mono text-xs text-blue">{index}</span>
                <h3 className="text-2xl font-semibold tracking-[-.035em] sm:text-3xl">{title}</h3>
                <div>
                  <p className="leading-7 text-ink-muted">{text}</p>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[.14em] text-blue">{result}</p>
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
            {[
              ["Transparant", "Je ziet voortgang, aandachtspunten en beslissingen zonder technisch rookgordijn."],
              ["Pragmatisch", "We bouwen wat nodig is voor jouw doel — niet meer, maar ook niet minder."],
              ["Toegankelijk", "Feedback kan gewoon in duidelijke taal. Ik vertaal het naar de techniek."],
              ["Eigenaarschap", "Ik kijk verder dan mijn takenlijst en signaleer kansen voordat ze problemen worden."],
            ].map(([title, text]) => (
              <article className="bg-navy-soft p-7" key={title}>
                <h3 className="text-lg font-semibold text-cyan">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
