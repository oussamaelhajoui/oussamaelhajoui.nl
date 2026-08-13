import type { ContactContent } from "@/lib/strapi";

export function Footer({ tagline, contact, trackingEnabled }: { tagline: string; contact: ContactContent; trackingEnabled: boolean }) {
  const socialLinks = [
    ["LinkedIn", contact.linkedinUrl],
    ["GitHub", contact.githubUrl],
    ["WhatsApp", contact.whatsappUrl],
  ].filter((item): item is [string, string] => Boolean(item[1]?.startsWith("https://")));

  return (
    <footer className="border-t border-white/10 bg-navy py-12 text-white">
      <div className="site-shell grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <a className="inline-flex rounded-2xl bg-white p-2" href="/" aria-label="Oussama El Hajoui — home">
            <img src="/logo.webp" width="512" height="245" className="h-auto w-[145px]" alt="Oussama El Hajoui" loading="lazy" />
          </a>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/55">{tagline}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
            <a className="hover:text-cyan" href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.location && <span>{contact.location}</span>}
            {socialLinks.map(([label, href]) => <a className="hover:text-cyan" href={href} key={label} rel="noreferrer" target="_blank">{label}</a>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
          <a className="hover:text-cyan" href="/diensten/">Diensten</a>
          <a className="hover:text-cyan" href="/projecten/">Projecten</a>
          <a className="hover:text-cyan" href="/werkwijze/">Werkwijze</a>
          <a className="hover:text-cyan" href="/over/">Over mij</a>
          <a className="hover:text-cyan" href="/privacy/">Privacy</a>
          {trackingEnabled && <button className="cursor-pointer border-0 bg-transparent p-0 text-white/70 hover:text-cyan" data-consent-settings type="button">Cookievoorkeuren</button>}
        </div>
      </div>
      <div className="site-shell mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[.14em] text-white/65">
        <span>© {new Date().getFullYear()} Oussama El Hajoui</span>
        <span>Ontworpen & gebouwd in Nederland</span>
      </div>
    </footer>
  );
}
