export function Footer({ tagline }: { tagline: string }) {
  return (
    <footer className="border-t border-white/10 bg-navy py-12 text-white">
      <div className="site-shell grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <a className="inline-flex rounded-2xl bg-white p-2" href="/" aria-label="Oussama El Hajoui — home">
            <img src="/logo.webp" width="512" height="245" className="h-auto w-[145px]" alt="Oussama El Hajoui" loading="lazy" />
          </a>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/55">{tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
          <a className="hover:text-cyan" href="/diensten/">Diensten</a>
          <a className="hover:text-cyan" href="/werkwijze/">Werkwijze</a>
          <a className="hover:text-cyan" href="/over/">Over mij</a>
          <a className="hover:text-cyan" href="/privacy/">Privacy</a>
        </div>
      </div>
      <div className="site-shell mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[.14em] text-white/65">
        <span>© {new Date().getFullYear()} Oussama El Hajoui</span>
        <span>Ontworpen & gebouwd in Nederland</span>
      </div>
    </footer>
  );
}
