const discoveryRedirect = `
(() => {
  const routes = new Set(['/sitemap.xml/', '/robots.txt/', '/llm.txt/', '/llms.txt/']);
  if (routes.has(window.location.pathname)) {
    window.location.replace(window.location.pathname.slice(0, -1) + window.location.search + window.location.hash);
  }
})();`;

export default function NotFound() {
  return (
    <main>
      <section className="hero-grid flex min-h-[calc(100vh-76px)] items-center overflow-hidden py-20">
        <div className="site-shell grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="kicker">404 · Pagina niet gevonden</p>
            <h1 className="page-title mt-6 max-w-4xl">Deze route loopt <span className="text-blue">even dood.</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink-muted">De pagina bestaat niet meer, is verplaatst of de URL bevat een typefout. Vanaf hier helpen de belangrijkste routes je snel verder.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="button button-primary" href="/">Terug naar home <span aria-hidden="true">→</span></a>
              <a className="button button-ghost" href="/projecten/">Bekijk projecten</a>
            </div>
            <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-blue" aria-label="Handige links vanaf de 404-pagina">
              <a className="min-h-11 content-center hover:underline" href="/online-diensten/">Online diensten</a>
              <a className="min-h-11 content-center hover:underline" href="/werkwijze/">Werkwijze</a>
              <a className="min-h-11 content-center hover:underline" href="/contact/">Contact</a>
            </nav>
          </div>

          <div className="code-card p-6 text-white sm:p-8" aria-hidden="true">
            <div className="flex items-center gap-2 border-b border-white/10 pb-5">
              <span className="size-2.5 rounded-full bg-cyan" />
              <span className="size-2.5 rounded-full bg-blue-bright" />
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[.18em] text-white/55">route / not-found</span>
            </div>
            <p className="mt-10 font-mono text-xs uppercase tracking-[.2em] text-cyan">HTTP status</p>
            <p className="mt-4 text-[clamp(6rem,17vw,10rem)] font-bold leading-none tracking-[-.08em]">404</p>
            <div className="mt-8 rounded-2xl border border-cyan/25 bg-cyan/10 p-5 font-mono text-xs leading-6 text-cyan">
              <span className="text-white/55">if</span> (route.missing) {'{'}<br />
              &nbsp;&nbsp;return home;<br />
              {'}'}
            </div>
          </div>
        </div>
      </section>
      <script data-keep-script dangerouslySetInnerHTML={{ __html: discoveryRedirect }} />
    </main>
  );
}
