import type { ServiceContent } from "@/lib/strapi";

const primaryNav = [
  ["Home", "/"],
  ["Werkwijze", "/werkwijze/"],
  ["Over Oussama", "/over-oussama/"],
  ["Contact", "/contact/"],
];

function Chevron() {
  return (
    <svg className="menu-chevron size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceLinks({ services, mobile = false }: { services: ServiceContent[]; mobile?: boolean }) {
  return services.map((service) => (
    <a
      className={mobile
        ? "group flex min-h-14 items-center gap-3 rounded-xl border border-navy/10 bg-white px-3 py-2.5 transition-colors hover:border-blue/30 hover:bg-mist"
        : "group grid min-h-32 grid-cols-[auto_1fr_auto] gap-4 rounded-2xl border border-navy/10 bg-white p-5 transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-blue/35 hover:bg-ice"}
      href={`/online-diensten/#${service.slug}`}
      key={service.slug}
    >
      <span className="font-mono text-[.65rem] font-bold text-blue">{service.number}</span>
      <span className="min-w-0">
        <strong className={mobile ? "block text-sm leading-5" : "block text-base leading-5"}>{service.title}</strong>
        {!mobile && <span className="mt-2 block text-xs leading-5 text-ink-muted">{service.lead}</span>}
      </span>
      <span className="text-blue transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span>
    </a>
  ));
}

export function Header({ services }: { services: ServiceContent[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ice/90 backdrop-blur-xl">
      <div className="site-shell flex h-[76px] items-center justify-between gap-5">
        <a className="flex shrink-0 items-center" href="/" aria-label="Oussama El Hajoui — home">
          <img
            src="/logo.webp"
            width="512"
            height="245"
            className="h-auto w-[132px] xl:w-[150px]"
            alt="Oussama El Hajoui"
          />
        </a>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Hoofdnavigatie">
          <a className="flex min-h-11 items-center text-sm font-semibold text-navy transition-colors hover:text-blue" href="/">Home</a>
          <details className="mega-menu">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-blue">
              Diensten <Chevron />
            </summary>
            <div className="mega-menu-panel absolute inset-x-0 top-full border-y border-navy/10 bg-white shadow-[0_30px_70px_rgba(7,23,47,.16)]">
              <div className="site-shell grid gap-8 py-8 lg:grid-cols-[.55fr_1.45fr] xl:gap-12 xl:py-10">
                <div className="flex flex-col items-start rounded-[1.7rem] bg-navy p-7 text-white">
                  <p className="font-mono text-[.65rem] font-bold uppercase tracking-[.2em] text-cyan">Online diensten</p>
                  <p className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-.045em]">Van sterk idee naar digitaal product.</p>
                  <p className="mt-4 text-sm leading-6 text-white/70">Websites, webshops, software en technische expertise voor organisaties die vooruit willen.</p>
                  <a className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-navy transition-colors hover:bg-cyan" href="/online-diensten/">
                    Bekijk alle diensten <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <ServiceLinks services={services} />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-navy/10 pt-5 text-xs font-semibold">
                    <span className="font-mono uppercase tracking-[.15em] text-ink-muted">Veel gekozen</span>
                    <a className="hover:text-blue" href="/website-laten-maken/eindhoven/">Website laten maken Eindhoven</a>
                    <a className="hover:text-blue" href="/diensten/webshops/eindhoven/">Webshop laten maken</a>
                    <a className="ml-auto text-blue hover:text-navy" href="/contact/">Vraag een offerte aan →</a>
                  </div>
                </div>
              </div>
            </div>
          </details>
          {primaryNav.slice(1).map(([label, href]) => (
            <a className="flex min-h-11 items-center text-sm font-semibold text-navy transition-colors hover:text-blue" href={href} key={href}>{label}</a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a className="button button-primary min-h-[42px] px-5 py-2 text-sm" href="/contact/">Offerte aanvragen</a>
        </div>

        <details className="mobile-menu relative lg:hidden">
          <summary className="cursor-pointer list-none gap-2 rounded-full border border-navy/15 px-4 py-2 text-sm font-bold">
            <svg className="menu-open-icon size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 4h11M2.5 8h11M2.5 12h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <svg className="menu-close-icon size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Menu
          </summary>
          <nav className="absolute right-0 top-14 grid gap-1 rounded-2xl border border-navy/10 bg-white p-3 shadow-2xl" aria-label="Mobiele navigatie">
            <a className="flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold hover:bg-mist" href="/">Home</a>
            <details className="mobile-services rounded-xl bg-mist">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 text-sm font-bold hover:text-blue">
                <span>Diensten <span className="ml-1 font-mono text-[.62rem] text-blue">{services.length}</span></span>
                <Chevron />
              </summary>
              <div className="grid gap-2 border-t border-navy/10 p-2">
                <ServiceLinks services={services} mobile />
                <a className="flex min-h-12 items-center justify-between rounded-xl px-3 text-sm font-bold text-blue hover:bg-white" href="/online-diensten/">
                  Alle diensten bekijken <span aria-hidden="true">→</span>
                </a>
              </div>
            </details>
            {primaryNav.slice(1).map(([label, href]) => (
              <a className="flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold hover:bg-mist" href={href} key={href}>{label}</a>
            ))}
            <a className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-navy px-4 text-sm font-semibold text-white hover:bg-blue" href="/contact/">Offerte aanvragen</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
