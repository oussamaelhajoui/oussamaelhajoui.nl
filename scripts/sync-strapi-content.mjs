import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destination = resolve(projectRoot, "content/site.json");
const publicDirectory = resolve(projectRoot, "public");
const strapiUrl = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const headers = process.env.STRAPI_API_TOKEN
  ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
  : undefined;

const [siteResponse, projectsResponse, locationsResponse] = await Promise.all([
  fetch(`${strapiUrl}/api/site-setting?populate=*`, { headers }),
  fetch(`${strapiUrl}/api/projects?populate=coverImage&sort=sortOrder:asc&pagination[pageSize]=100`, { headers }),
  fetch(`${strapiUrl}/api/locations?filters[active][$eq]=true&sort=sortOrder:asc&pagination[pageSize]=100`, { headers }),
]);

if (!siteResponse.ok) {
  throw new Error(`Strapi gaf HTTP ${siteResponse.status} voor Website-instellingen. Is de content gepubliceerd?`);
}

if (!projectsResponse.ok) {
  throw new Error(`Strapi gaf HTTP ${projectsResponse.status} voor Projecten. Is de publieke leesrechten ingesteld?`);
}

if (!locationsResponse.ok) {
  throw new Error(`Strapi gaf HTTP ${locationsResponse.status} voor Locaties. Is de publieke leestoegang ingesteld?`);
}

const sitePayload = await siteResponse.json();
const projectsPayload = await projectsResponse.json();
const locationsPayload = await locationsResponse.json();
const data = sitePayload?.data;

const publicFields = [
  "siteName",
  "seoTitle",
  "seoDescription",
  "seoKeywords",
  "socialTitle",
  "socialDescription",
  "robotsIndex",
  "robotsFollow",
  "googleSiteVerification",
  "bingSiteVerification",
  "customMetaTags",
  "heroTitle",
  "heroHighlight",
  "heroText",
  "availability",
  "stack",
  "homeServices",
  "homePrinciples",
  "servicesHero",
  "services",
  "audienceCards",
  "processHero",
  "processSteps",
  "collaborationCards",
  "aboutHero",
  "aboutQuote",
  "aboutParagraphs",
  "aboutValues",
  "quoteHero",
  "quoteSteps",
  "cta",
  "footerTagline",
  "contact",
  "tracking",
];

if (!data || publicFields.some((field) => data[field] == null)) {
  throw new Error("Strapi retourneerde niet alle verwachte websitevelden. Publiceer Website-instellingen opnieuw.");
}

const services = Array.isArray(data.services) ? data.services : [];
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
if (
  services.length === 0 ||
  services.some((service) =>
    !validSlug.test(service.slug || "") ||
    !service.seoKeyword ||
    !Array.isArray(service.searchTerms) ||
    service.searchTerms.length === 0 ||
    !service.landingIntro,
  ) ||
  services.filter((service) => service.isWebsiteService).length !== 1
) {
  throw new Error("Iedere Strapi-dienst moet een unieke slug, SEO-zoekterm, aanvullende zoektermen en landingsintro hebben; markeer exact één dienst als website-dienst.");
}

if (new Set(services.map((service) => service.slug)).size !== services.length) {
  throw new Error("De slugs van Strapi-diensten moeten uniek zijn.");
}

const locations = Array.isArray(locationsPayload?.data) ? locationsPayload.data : [];
if (
  locations.length === 0 ||
  locations.some((location) =>
    !location.name ||
    !validSlug.test(location.slug || "") ||
    !location.intro ||
    !location.localText ||
    !location.regionalContext,
  )
) {
  throw new Error("Iedere gepubliceerde actieve locatie moet een naam, geldige slug, intro, website-tekst en regionale context hebben.");
}

if (new Set(locations.map((location) => location.slug)).size !== locations.length) {
  throw new Error("De slugs van Strapi-locaties moeten uniek zijn.");
}

const rawProjects = Array.isArray(projectsPayload?.data) ? projectsPayload.data : [];
const projectImageDirectory = resolve(publicDirectory, "projects");
await mkdir(projectImageDirectory, { recursive: true });

const projects = await Promise.all(rawProjects.map(async ({ coverImage, ...project }) => {
  if (!coverImage?.url) return { ...project, coverImageUrl: null, coverImageAlt: null };

  const sourceUrl = coverImage.url.startsWith("http") ? coverImage.url : `${strapiUrl}${coverImage.url}`;
  const imageResponse = await fetch(sourceUrl);
  if (!imageResponse.ok) throw new Error(`Projectafbeelding voor ${project.title} kon niet worden opgehaald.`);

  const destinationName = `${project.slug}.webp`;
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  await sharp(imageBuffer)
    .resize({ width: 1400, height: 875, fit: "cover", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(resolve(projectImageDirectory, destinationName));

  return {
    ...project,
    coverImageUrl: `/projects/${destinationName}`,
    coverImageAlt: coverImage.alternativeText || project.title,
  };
}));
const snapshot = {
  ...Object.fromEntries(publicFields.map((field) => [field, data[field]])),
  locations,
  projects,
};
const serialized = JSON.stringify(
  snapshot,
  (key, value) => (key === "id" || key === "documentId" ? undefined : value),
  2,
);

const llmsText = `# ${data.siteName}

> ${data.seoDescription}

${data.siteName} is een software engineer uit de regio Eindhoven voor websites, WordPress, Shopify-webshops, Liquid-maatwerk, webapplicaties, backends, AI-training, security-assessments en technisch projectleiderschap.

## Belangrijkste pagina's

- [Home](https://oussamaelhajoui.nl/): Overzicht van expertise, diensten en beschikbaarheid.
- [Online diensten](https://oussamaelhajoui.nl/online-diensten/): ${services.map((service) => service.title).join(", ")}.
- [Projecten](https://oussamaelhajoui.nl/projecten/): Gepubliceerde portfolio-projecten en gebruikte technologieën.
- [Werkwijze](https://oussamaelhajoui.nl/werkwijze/): Het proces van kennismaking tot livegang.
- [Over Oussama](https://oussamaelhajoui.nl/over-oussama/): Achtergrond, technische expertise en samenwerkingsstijl.
- [Contact](https://oussamaelhajoui.nl/contact/): Contact- en offerteformulier voor nieuwe projecten.
- [Privacy](https://oussamaelhajoui.nl/privacy/): Informatie over gegevensverwerking en trackingtoestemming.
${projects.map((project) => `- [${project.title}](https://oussamaelhajoui.nl/projecten/): ${project.summary}`).join("\n")}

## Diensten per locatie

${locations.flatMap((location) => services.map((service) => {
  const path = service.isWebsiteService
    ? `/website-laten-maken/${location.slug}/`
    : `/diensten/${service.slug}/${location.slug}/`;
  return `- [${service.seoKeyword} ${location.name}](https://oussamaelhajoui.nl${path}): ${service.lead}`;
})).join("\n")}

## Contact

- E-mail: ${data.contact.email}
- Locatie: ${data.contact.location || "Nederland"}
`;

const sitemapUrls = [
  ["/", "1.0"],
  ["/online-diensten/", "0.9"],
  ["/over-oussama/", "0.9"],
  ["/contact/", "0.9"],
  ["/projecten/", "0.9"],
  ["/werkwijze/", "0.8"],
  ["/privacy/", "0.3"],
  ...locations.flatMap((location) => services.map((service) => [
    service.isWebsiteService
      ? `/website-laten-maken/${location.slug}/`
      : `/diensten/${service.slug}/${location.slug}/`,
    service.isWebsiteService || service.slug === "webshops" ? "0.8" : "0.7",
  ])),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(([path, priority]) => `  <url><loc>https://oussamaelhajoui.nl${path}</loc><priority>${priority}</priority></url>`).join("\n")}
</urlset>
`;
const robots = `User-agent: *
Allow: /
Disallow: /bedankt/

Sitemap: https://oussamaelhajoui.nl/sitemap.xml
`;

await mkdir(dirname(destination), { recursive: true });
await mkdir(publicDirectory, { recursive: true });
await Promise.all([
  writeFile(destination, `${serialized}\n`, "utf8"),
  writeFile(resolve(publicDirectory, "llms.txt"), llmsText, "utf8"),
  writeFile(resolve(publicDirectory, "llm.txt"), llmsText, "utf8"),
  writeFile(resolve(publicDirectory, "sitemap.xml"), sitemap, "utf8"),
  writeFile(resolve(publicDirectory, "robots.txt"), robots, "utf8"),
]);

console.log(`Publieke Strapi-content en discoverybestanden bijgewerkt vanuit ${strapiUrl}`);
