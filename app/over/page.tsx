import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Over mij",
  description: "Maak kennis met Oussama El Hajoui, software engineer gespecialiseerd in websites, web apps, React, Angular, Java en C#.",
  alternates: { canonical: "/over/" },
};

export default function OverPage() {
  return (
    <main>
      <PageHero
        kicker="Over mij"
        title={<>Technisch scherp. <span className="text-blue">Menselijk helder.</span></>}
        text="Ik ben Oussama El Hajoui: software engineer met een sterke interesse in het snijvlak van ontwerp, gebruikerservaring en degelijke techniek."
      />
      <section className="section-pad bg-white">
        <div className="site-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <div className="panel bg-mist shadow-none">
              <p className="font-mono text-[11px] uppercase tracking-[.16em] text-blue">Oussama / engineer</p>
              <div className="mt-8 rounded-2xl bg-white p-5">
                <img src="/logo.webp" width="512" height="245" className="h-auto w-full" alt="Logo van Oussama El Hajoui" />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["React", "Angular", "Java", "C#"].map((item) => <span className="chip justify-center bg-white" key={item}>{item}</span>)}
              </div>
            </div>
          </div>
          <div className="max-w-3xl">
            <p className="text-2xl font-semibold leading-[1.35] tracking-[-.03em] text-navy sm:text-3xl">
              Goede software merk je niet aan hoeveel techniek erin zit. Je merkt het aan hoe vanzelfsprekend alles werkt.
            </p>
            <div className="mt-10 space-y-6 text-lg leading-8 text-ink-muted">
              <p>Daarom kijk ik altijd naar het hele plaatje. Wat moet een bezoeker begrijpen? Welke stap moet eenvoudig voelen? En welke technische keuzes houden het product ook later prettig om aan te werken?</p>
              <p>Mijn frontendwerk ligt in React en Angular. Voor backends werk ik met Java en C#. Bij websites verbind ik die technische basis met sterke content, Tailwind CSS en een flexibel CMS zoals Strapi.</p>
              <p>Je werkt rechtstreeks met mij. Dat betekent korte lijnen, eerlijke verwachtingen en iemand die verantwoordelijkheid neemt voor het eindresultaat.</p>
            </div>
            <a className="button button-primary mt-10" href="/offerte/">Kennismaken <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="section-pad bg-mist">
        <div className="site-shell">
          <p className="kicker">Waar ik voor sta</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Kwaliteit zonder drama", "Doordachte keuzes, nette uitvoering en open communicatie."],
              ["Eenvoud als resultaat", "Complexiteit terugbrengen tot een ervaring die logisch aanvoelt."],
              ["Samen boven overdracht", "Geen ticketfabriek, maar echt betrokken bij jouw doel."],
            ].map(([title, text], index) => (
              <article className="panel" key={title}>
                <span className="font-mono text-xs text-blue">0{index + 1}</span>
                <h2 className="mt-10 text-xl font-semibold">{title}</h2>
                <p className="mt-3 leading-7 text-ink-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
