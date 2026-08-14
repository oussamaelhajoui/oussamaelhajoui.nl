import type { ContactContent, LocationContent, ServiceContent } from "@/lib/strapi";

type FooterProps = {
  tagline: string;
  contact: ContactContent;
  trackingEnabled: boolean;
  services: ServiceContent[];
  locations: LocationContent[];
};

export function Footer({ tagline, contact, trackingEnabled, services, locations }: FooterProps) {
  const socialLinks = [
    ["LinkedIn", contact.linkedinUrl],
    ["GitHub", contact.githubUrl],
    ["WhatsApp", contact.whatsappUrl],
  ].filter((item): item is [string, string] => Boolean(item[1]?.startsWith("https://")));

  return (
    <footer className="overflow-hidden bg-navy text-white">
      <div className="site-shell py-12 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/12 pb-10">
          <a className="inline-flex rounded-2xl bg-white p-2" href="/" aria-label="Oussama El Hajoui — home">
            <img src="/logo.webp" width="512" height="245" className="h-auto w-[145px]" alt="Oussama El Hajoui" loading="lazy" />
          </a>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <a className="footer-pill" href={`mailto:${contact.email}`} aria-label={`E-mail ${contact.email}`}>Mail</a>
            {socialLinks.map(([label, href]) => <a className="footer-pill" href={href} key={label} rel="noreferrer" target="_blank">{label}</a>)}
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/12 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="kicker footer-kicker">Klaar voor de volgende stap?</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.9rem,6.8vw,6.5rem)] font-semibold leading-[.94] tracking-[-.065em] text-white">
              Samen bouwen aan je <span className="text-cyan">volgende project?</span>
            </h2>
          </div>
          <a className="footer-cta" href="/contact/">
            <span>Start hier</span><span className="footer-cta-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_.75fr_1.2fr_.9fr] lg:gap-10">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-cyan">Oussama El Hajoui</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">{tagline}</p>
            <p className="mt-7 text-sm text-white/75">Software engineer · Eindhoven & omgeving</p>
          </div>

          <nav aria-label="Footernavigatie">
            <p className="footer-heading">Navigatie</p>
            <div className="mt-4 grid gap-1">
              {[
                ["Home", "/"],
                ["Projecten", "/projecten/"],
                ["Werkwijze", "/werkwijze/"],
                ["Over Oussama", "/over-oussama/"],
                ["Contact", "/contact/"],
              ].map(([label, href]) => <a className="footer-link" href={href} key={href}>{label}</a>)}
            </div>
          </nav>

          <nav aria-label="Diensten in de footer">
            <p className="footer-heading">Diensten</p>
            <div className="mt-4 grid gap-1">
              {services.map((service) => (
                <a className="footer-link" href={`/online-diensten/#${service.slug}`} key={service.slug}>{service.title}</a>
              ))}
            </div>
          </nav>

          <nav aria-label="Werkgebied in de footer">
            <p className="footer-heading">Werkgebied</p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
              {locations.map((location) => (
                <a className="footer-link" href={`/website-laten-maken/${location.slug}/`} key={location.slug}>{location.name}</a>
              ))}
            </div>
          </nav>
        </div>

        <div className="grid gap-5 border-t border-white/12 pt-7 text-xs text-white/55 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-cyan" href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.location && <span>{contact.location}</span>}
          </div>
          <span className="font-mono uppercase tracking-[.12em]">© {new Date().getFullYear()} Oussama El Hajoui</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            <a className="hover:text-cyan" href="/privacy/">Privacy</a>
            <a className="hover:text-cyan" href="/sitemap.xml">Sitemap</a>
            <a className="hover:text-cyan" href="/llms.txt">LLM-info</a>
            {trackingEnabled && <button className="cursor-pointer border-0 bg-transparent p-0 text-white/55 hover:text-cyan" data-consent-settings type="button">Cookievoorkeuren</button>}
          </div>
        </div>
      </div>
    </footer>
  );
}
