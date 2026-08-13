const nav = [
  ["Home", "/"],
  ["Online diensten", "/online-diensten/"],
  ["Over Oussama", "/over-oussama/"],
  ["Contact", "/contact/"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ice/90 backdrop-blur-xl">
      <div className="site-shell flex h-[76px] items-center justify-between gap-6">
        <a className="flex shrink-0 items-center" href="/" aria-label="Oussama El Hajoui — home">
          <img
            src="/logo.webp"
            width="512"
            height="245"
            className="h-auto w-[132px] sm:w-[150px]"
            alt="Oussama El Hajoui"
          />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hoofdnavigatie">
          {nav.map(([label, href]) => (
            <a className="text-sm font-semibold text-navy transition-colors hover:text-blue" href={href} key={href}>{label}</a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a className="button button-primary min-h-[42px] px-5 py-2 text-sm" href="/contact/">Offerte aanvragen</a>
        </div>
        <details className="mobile-menu relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-navy/15 px-4 py-2 text-sm font-bold">Menu</summary>
          <nav className="absolute right-0 top-14 grid gap-1 rounded-2xl border border-navy/10 bg-white p-3 shadow-2xl" aria-label="Mobiele navigatie">
            {nav.map(([label, href]) => (
              <a className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-mist" href={href} key={href}>{label}</a>
            ))}
            <a className="mt-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white" href="/contact/">Offerte aanvragen</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
