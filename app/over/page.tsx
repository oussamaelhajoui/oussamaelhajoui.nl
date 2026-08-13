import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";
import { getSiteContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Over mij",
  description: "Maak kennis met Oussama El Hajoui, software engineer gespecialiseerd in websites, web apps, React, Angular, Java en C#.",
  alternates: { canonical: "/over/" },
};

export default async function OverPage() {
  const content = await getSiteContent();

  return (
    <main>
      <PageHero
        kicker={content.aboutHero.kicker}
        title={<>{content.aboutHero.title} <span className="text-blue">{content.aboutHero.highlight}</span></>}
        text={content.aboutHero.text}
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
                {content.stack.map((item) => <span className="chip justify-center bg-white" key={item}>{item}</span>)}
              </div>
            </div>
          </div>
          <div className="max-w-3xl">
            <p className="text-2xl font-semibold leading-[1.35] tracking-[-.03em] text-navy sm:text-3xl">
              {content.aboutQuote}
            </p>
            <div className="mt-10 space-y-6 text-lg leading-8 text-ink-muted">
              {content.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <a className="button button-primary mt-10" href="/offerte/">Kennismaken <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="section-pad bg-mist">
        <div className="site-shell">
          <p className="kicker">Waar ik voor sta</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.aboutValues.map((value, index) => (
              <article className="panel" key={value.title}>
                <span className="font-mono text-xs text-blue">0{index + 1}</span>
                <h2 className="mt-10 text-xl font-semibold">{value.title}</h2>
                <p className="mt-3 leading-7 text-ink-muted">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand content={content.cta} />
    </main>
  );
}
