export function CtaBand() {
  return (
    <section className="overflow-hidden bg-blue py-20 text-white sm:py-24">
      <div className="site-shell relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="kicker text-cyan">Heb je een idee?</p>
          <h2 className="section-title mt-5 max-w-4xl text-white">Laten we er iets sterks van maken.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">Vertel kort wat je wilt bouwen. Je ontvangt persoonlijk antwoord met de slimste volgende stap.</p>
        </div>
        <a className="button button-light lg:mb-2" href="/offerte/">Start je aanvraag <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
