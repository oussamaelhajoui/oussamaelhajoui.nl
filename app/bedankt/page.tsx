import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bedankt", robots: { index: false, follow: false } };

export default function BedanktPage() {
  return (
    <main className="hero-grid grid min-h-[70vh] place-items-center px-4 py-24">
      <div className="panel max-w-2xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan/15 text-2xl text-blue" aria-hidden="true">✓</span>
        <p className="kicker mt-7">Aanvraag ontvangen</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Dank je wel.</h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-ink-muted">Je bericht is onderweg. Ik lees je aanvraag persoonlijk en neem zo snel mogelijk contact met je op.</p>
        <a className="button button-primary mt-8" href="/">Terug naar home</a>
      </div>
    </main>
  );
}
