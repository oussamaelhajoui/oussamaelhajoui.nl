import type { Metadata } from "next";
import { PageHero } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacyverklaring voor offerteaanvragen via oussamaelhajoui.nl.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero kicker="Privacy" title={<>Duidelijk over <span className="text-blue">je gegevens.</span></>} text="Deze beknopte verklaring legt uit welke gegevens via het offerteformulier worden verwerkt en waarom." />
      <section className="section-pad bg-white">
        <div className="site-shell max-w-3xl space-y-10">
          {[
            ["Welke gegevens", "Via het offerteformulier kunnen naam, e-mailadres, bedrijfsnaam en informatie over je project worden ontvangen."],
            ["Waarom", "Deze gegevens worden uitsluitend gebruikt om je aanvraag te beoordelen, contact met je op te nemen en eventueel een offerte op te stellen."],
            ["Formulierverwerking", "Het formulier gebruikt FormSubmit om je bericht per e-mail af te leveren. Verstuur geen gevoelige persoonsgegevens via het vrije tekstveld."],
            ["Analyse en marketing", "Google-tags en pixels van Meta, TikTok of Snapchat worden alleen geladen nadat je hiervoor toestemming hebt gegeven. Je kunt je keuze via Cookievoorkeuren in de footer opnieuw openen."],
            ["Bewaartermijn", "Gegevens worden niet langer bewaard dan nodig is voor de aanvraag, samenwerking en wettelijke administratieverplichtingen."],
            ["Jouw rechten", "Je kunt vragen om inzage, correctie of verwijdering van je gegevens door contact op te nemen via het e-mailadres op de offertepagina."],
          ].map(([title, text]) => (
            <section className="border-t border-navy/15 pt-7" key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-ink-muted">{text}</p>
            </section>
          ))}
          <p className="font-mono text-xs text-ink-muted">Laatst bijgewerkt: augustus 2026</p>
        </div>
      </section>
    </main>
  );
}
