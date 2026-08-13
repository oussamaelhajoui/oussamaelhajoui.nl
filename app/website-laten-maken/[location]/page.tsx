import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";
import { getLocations, getServiceLocationPath, getSiteContent } from "@/lib/strapi";

const siteUrl = "https://oussamaelhajoui.nl";

type LocationPageProps = {
  params: Promise<{ location: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const locations = await getLocations();
  return locations.map((location) => ({ location: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location: locationSlug } = await params;
  const [content, locations] = await Promise.all([getSiteContent(), getLocations()]);
  const location = locations.find((item) => item.slug === locationSlug);
  const websiteService = content.services.find((service) => service.isWebsiteService);
  if (!location || !websiteService) notFound();

  const title = `Website laten maken in ${location.name}`;
  const description = `Website laten maken of bouwen in ${location.name}? Oussama bouwt snelle maatwerk- en WordPress-websites met sterke SEO en persoonlijke begeleiding.`;
  const path = `/website-laten-maken/${location.slug}/`;

  return {
    title,
    description,
    keywords: [...websiteService.searchTerms, "webdesign", "websitebouwer"].map((term) => `${term} ${location.name}`),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: "Oussama El Hajoui",
      title,
      description,
      url: path,
      images: [{ url: "/og.png", width: 1200, height: 628, alt: `${title} — Oussama El Hajoui` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default async function WebsiteLatenMakenPage({ params }: LocationPageProps) {
  const { location: locationSlug } = await params;
  const [content, locations] = await Promise.all([getSiteContent(), getLocations()]);
  const location = locations.find((item) => item.slug === locationSlug);
  const websiteService = content.services.find((service) => service.isWebsiteService);
  if (!location || !websiteService) notFound();

  const path = getServiceLocationPath(websiteService, location);
  const otherLocations = locations.filter((item) => item.slug !== location.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}${path}#service`,
        name: `Website laten maken in ${location.name}`,
        serviceType: websiteService.seoKeyword,
        description: location.intro,
        url: `${siteUrl}${path}`,
        provider: { "@id": `${siteUrl}/#business` },
        areaServed: {
          "@type": "City",
          name: location.name,
          containedInPlace: { "@type": "AdministrativeArea", name: location.province },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}${path}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Online diensten", item: `${siteUrl}/online-diensten/` },
          { "@type": "ListItem", position: 3, name: `Website laten maken ${location.name}`, item: `${siteUrl}${path}` },
        ],
      },
    ],
  };

  return (
    <main>
      <nav className="site-shell py-5 text-sm text-ink-muted" aria-label="Broodkruimel">
        <ol className="flex flex-wrap items-center gap-2">
          <li><a className="inline-flex min-h-11 items-center hover:text-blue" href="/">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a className="inline-flex min-h-11 items-center hover:text-blue" href="/online-diensten/">Online diensten</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{location.name}</li>
        </ol>
      </nav>

      <PageHero
        kicker={`Website laten maken · ${location.name}`}
        title={<>Website laten maken in <span className="text-blue">{location.name}.</span></>}
        text={location.intro}
      />

      <section className="section-pad bg-white">
        <div className="site-shell grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            <p className="kicker">Lokaal relevant, technisch sterk</p>
            <h2 className="section-title mt-5">Een website die vertrouwen omzet in actie.</h2>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-ink-muted">
              <p>{location.localText}</p>
              <p>Wil je een website laten bouwen in {location.name}? Ik help met maatwerk, WordPress en een beheervriendelijk CMS. Daarbij krijgen inhoud, mobiele snelheid, toegankelijkheid en lokale vindbaarheid vanaf het begin aandacht.</p>
              <p>{websiteService.detail}</p>
            </div>
            <a className="button button-primary mt-10" href="/contact/">Bespreek je website <span aria-hidden="true">↗</span></a>
          </div>
          <aside className="panel bg-mist shadow-none">
            <p className="kicker">Wat je krijgt</p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-.035em]">Websiteontwikkeling voor {location.name}</h2>
            <p className="mt-4 leading-7 text-ink-muted">{websiteService.lead}</p>
            <ul className="mt-8 grid gap-4">
              {websiteService.items.map((item) => (
                <li className="flex gap-3 border-t border-navy/10 pt-4 font-semibold" key={item}>
                  <span className="text-cyan" aria-hidden="true">●</span>{item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="site-shell">
          <p className="kicker">Meer digitale mogelijkheden</p>
          <h2 className="section-title mt-5">Alle diensten in {location.name}.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {content.services.map((service) => (
              <article className="panel flex flex-col" key={service.slug}>
                <span className="font-mono text-xs text-blue">{service.number}</span>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-.035em]">{service.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-ink-muted">{service.lead}</p>
                <a className="mt-6 inline-flex min-h-11 items-center font-semibold text-blue hover:underline" href={getServiceLocationPath(service, location)}>
                  {service.seoKeyword} in {location.name} <span className="ml-2" aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-shell">
          <p className="kicker">Andere locaties</p>
          <h2 className="section-title mt-5">Website laten maken in de regio.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {otherLocations.map((item) => (
              <a className="chip min-h-11 items-center px-4 font-sans text-sm font-semibold hover:border-blue hover:text-blue" href={`/website-laten-maken/${item.slug}/`} key={item.slug}>
                Website laten maken {item.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand content={content.cta} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
