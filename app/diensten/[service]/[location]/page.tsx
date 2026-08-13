import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/Ui";
import { getLocations, getServiceLocationPath, getSiteContent } from "@/lib/strapi";

const siteUrl = "https://oussamaelhajoui.nl";

type ServiceLocationPageProps = {
  params: Promise<{ service: string; location: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const [content, locations] = await Promise.all([getSiteContent(), getLocations()]);
  return content.services
    .filter((service) => !service.isWebsiteService)
    .flatMap((service) => locations.map((location) => ({ service: service.slug, location: location.slug })));
}

export async function generateMetadata({ params }: ServiceLocationPageProps): Promise<Metadata> {
  const { service: serviceSlug, location: locationSlug } = await params;
  const [content, locations] = await Promise.all([getSiteContent(), getLocations()]);
  const service = content.services.find((item) => item.slug === serviceSlug && !item.isWebsiteService);
  const location = locations.find((item) => item.slug === locationSlug);
  if (!service || !location) notFound();

  const title = `${service.seoKeyword} in ${location.name}`;
  const description = `${service.seoKeyword} in ${location.name}? ${service.lead} Rechtstreeks samenwerken met software engineer Oussama El Hajoui.`;
  const path = getServiceLocationPath(service, location);

  return {
    title,
    description,
    keywords: [service.seoKeyword, ...service.searchTerms, service.title].map((term) => `${term} ${location.name}`),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: content.siteName,
      title,
      description,
      url: path,
      images: [{ url: "/og.png", width: 1200, height: 628, alt: `${title} — ${content.siteName}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default async function ServiceLocationPage({ params }: ServiceLocationPageProps) {
  const { service: serviceSlug, location: locationSlug } = await params;
  const [content, locations] = await Promise.all([getSiteContent(), getLocations()]);
  const service = content.services.find((item) => item.slug === serviceSlug && !item.isWebsiteService);
  const location = locations.find((item) => item.slug === locationSlug);
  if (!service || !location) notFound();

  const path = getServiceLocationPath(service, location);
  const otherServices = content.services.filter((item) => item.slug !== service.slug);
  const otherLocations = locations.filter((item) => item.slug !== location.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}${path}#service`,
        name: `${service.seoKeyword} in ${location.name}`,
        serviceType: service.title,
        description: service.landingIntro,
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
          { "@type": "ListItem", position: 3, name: `${service.title} in ${location.name}`, item: `${siteUrl}${path}` },
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
          <li aria-current="page">{service.title} in {location.name}</li>
        </ol>
      </nav>

      <PageHero
        kicker={`${service.title} · ${location.name}`}
        title={<>{service.seoKeyword} in <span className="text-blue">{location.name}.</span></>}
        text={`${service.landingIntro} Voor organisaties in ${location.name} werk ik rechtstreeks, transparant en met korte lijnen.`}
      />

      <section className="section-pad bg-white">
        <div className="site-shell grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            <p className="kicker">Van vraag naar werkende oplossing</p>
            <h2 className="section-title mt-5">{service.title} met een duidelijke aanpak.</h2>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-ink-muted">
              <p>{service.detail}</p>
              <p>{location.regionalContext}</p>
            </div>
            <a className="button button-primary mt-10" href="/contact/">Bespreek je project <span aria-hidden="true">↗</span></a>
          </div>
          <aside className="panel bg-mist shadow-none">
            <p className="kicker">Onderdelen</p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-.035em]">{service.title} in {location.name}</h2>
            <p className="mt-4 leading-7 text-ink-muted">{service.lead}</p>
            <ul className="mt-8 grid gap-4">
              {service.items.map((item) => (
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
          <p className="kicker">Aanvullende expertise</p>
          <h2 className="section-title mt-5">Andere diensten in {location.name}.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {otherServices.map((item) => (
              <article className="panel flex flex-col" key={item.slug}>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-ink-muted">{item.lead}</p>
                <a className="mt-6 inline-flex min-h-11 items-center font-semibold text-blue hover:underline" href={getServiceLocationPath(item, location)}>
                  {item.seoKeyword} in {location.name} <span className="ml-2" aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-shell">
          <p className="kicker">Andere locaties</p>
          <h2 className="section-title mt-5">{service.title} in de regio.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {otherLocations.map((item) => (
              <a className="chip min-h-11 items-center px-4 font-sans text-sm font-semibold hover:border-blue hover:text-blue" href={getServiceLocationPath(service, item)} key={item.slug}>
                {service.seoKeyword} {item.name}
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
