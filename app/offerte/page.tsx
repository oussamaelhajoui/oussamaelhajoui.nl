import type { Metadata } from "next";
import { PageHero } from "@/components/Ui";
import { getSiteContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description: "Vertel kort over je website of web app en ontvang persoonlijk een vrijblijvende reactie van Oussama El Hajoui.",
  alternates: { canonical: "/offerte/" },
};

export default async function OffertePage() {
  const content = await getSiteContent();
  const formAction = `https://formsubmit.co/${encodeURIComponent(process.env.QUOTE_EMAIL ?? content.quoteEmail)}`;

  return (
    <main>
      <PageHero
        kicker="Offerte aanvragen"
        title={<>Vertel me wat je <span className="text-blue">wilt bouwen.</span></>}
        text="Een paar duidelijke antwoorden zijn genoeg voor een goede eerste inschatting. Vrijblijvend en rechtstreeks bij mij in de inbox."
      />
      <section className="section-pad bg-white">
        <div className="site-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <aside>
            <p className="kicker">Wat gebeurt er daarna?</p>
            <ol className="mt-8 space-y-7">
              {[
                ["01", "Ik lees je aanvraag persoonlijk."],
                ["02", "Je ontvangt vragen of een voorstel voor een korte kennismaking."],
                ["03", "Daarna volgt een heldere scope, planning en prijs."],
              ].map(([index, text]) => (
                <li className="flex gap-5 border-t border-navy/15 pt-5" key={index}>
                  <span className="font-mono text-[11px] text-blue">{index}</span>
                  <span className="text-sm leading-6 text-ink-muted">{text}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-2xl bg-mist p-6">
              <p className="text-sm font-semibold text-navy">Liever direct mailen?</p>
              <a className="mt-2 block break-all text-sm text-blue underline" href={`mailto:${content.quoteEmail}`}>{content.quoteEmail}</a>
            </div>
          </aside>

          <form className="panel grid gap-6" action={formAction} method="POST">
            <input type="hidden" name="_subject" value="Nieuwe offerteaanvraag via oussamaelhajoui.nl" />
            <input type="hidden" name="_next" value="https://oussamaelhajoui.nl/bedankt/" />
            <input type="hidden" name="_template" value="table" />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="quote-field">
                <span className="quote-label">Naam *</span>
                <input className="quote-input" type="text" name="naam" autoComplete="name" required />
              </label>
              <label className="quote-field">
                <span className="quote-label">E-mailadres *</span>
                <input className="quote-input" type="email" name="email" autoComplete="email" required />
              </label>
            </div>
            <label className="quote-field">
              <span className="quote-label">Bedrijf of organisatie</span>
              <input className="quote-input" type="text" name="bedrijf" autoComplete="organization" />
            </label>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="quote-field">
                <span className="quote-label">Waar gaat het om? *</span>
                <select className="quote-input" name="projecttype" required defaultValue="">
                  <option value="" disabled>Kies een optie</option>
                  <option>Nieuwe website</option>
                  <option>Web app</option>
                  <option>Backend of API</option>
                  <option>Doorontwikkeling</option>
                  <option>Nog niet zeker</option>
                </select>
              </label>
              <label className="quote-field">
                <span className="quote-label">Budgetindicatie</span>
                <select className="quote-input" name="budget" defaultValue="">
                  <option value="">Nog niet bepaald</option>
                  <option>€ 1.500 – € 3.000</option>
                  <option>€ 3.000 – € 7.500</option>
                  <option>€ 7.500 – € 15.000</option>
                  <option>€ 15.000+</option>
                </select>
              </label>
            </div>
            <label className="quote-field">
              <span className="quote-label">Gewenste planning</span>
              <input className="quote-input" type="text" name="planning" placeholder="Bijvoorbeeld: live in november" />
            </label>
            <label className="quote-field">
              <span className="quote-label">Vertel kort over je project *</span>
              <textarea className="quote-input" name="project" required placeholder="Wat wil je bereiken, voor wie en wat moet er gebouwd worden?" />
            </label>
            <label className="flex items-start gap-3 text-sm leading-6 text-ink-muted">
              <input className="mt-1 h-4 w-4 accent-blue" type="checkbox" name="privacy-akkoord" required />
              <span>Ik ga ermee akkoord dat mijn gegevens worden gebruikt om op deze aanvraag te reageren. Lees het <a className="text-blue underline" href="/privacy/">privacybeleid</a>.</span>
            </label>
            <button className="button button-primary w-full sm:w-fit" type="submit">Verstuur aanvraag <span aria-hidden="true">↗</span></button>
            <p className="text-xs leading-5 text-ink-muted">Bij de eerste inzending vraagt de e-maildienst eenmalig om bevestiging van het ontvangstadres.</p>
          </form>
        </div>
      </section>
    </main>
  );
}
