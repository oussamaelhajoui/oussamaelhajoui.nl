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

const [siteResponse, projectsResponse] = await Promise.all([
  fetch(`${strapiUrl}/api/site-setting?populate=*`, { headers }),
  fetch(`${strapiUrl}/api/projects?populate=coverImage&sort=sortOrder:asc&pagination[pageSize]=100`, { headers }),
]);

if (!siteResponse.ok) {
  throw new Error(`Strapi gaf HTTP ${siteResponse.status} voor Website-instellingen. Is de content gepubliceerd?`);
}

if (!projectsResponse.ok) {
  throw new Error(`Strapi gaf HTTP ${projectsResponse.status} voor Projecten. Is de publieke leesrechten ingesteld?`);
}

const sitePayload = await siteResponse.json();
const projectsPayload = await projectsResponse.json();
const data = sitePayload?.data;

const publicFields = [
  "siteName",
  "seoTitle",
  "seoDescription",
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
  projects,
};
const serialized = JSON.stringify(
  snapshot,
  (key, value) => (key === "id" || key === "documentId" ? undefined : value),
  2,
);

const llmsText = `# ${data.siteName}

> ${data.seoDescription}

${data.siteName} is een Nederlandse software engineer die snelle websites en webapplicaties ontwerpt en ontwikkelt met React, Angular, Java, C#, Tailwind CSS en Strapi.

## Belangrijkste pagina's

- [Home](https://oussamaelhajoui.nl/): Overzicht van expertise, diensten en beschikbaarheid.
- [Diensten](https://oussamaelhajoui.nl/diensten/): Websites, web apps, backends, API's en doorontwikkeling.
- [Projecten](https://oussamaelhajoui.nl/projecten/): Gepubliceerde portfolio-projecten en gebruikte technologieën.
- [Werkwijze](https://oussamaelhajoui.nl/werkwijze/): Het proces van kennismaking tot livegang.
- [Over mij](https://oussamaelhajoui.nl/over/): Achtergrond, technische expertise en samenwerkingsstijl.
- [Offerte aanvragen](https://oussamaelhajoui.nl/offerte/): Contact- en offerteformulier voor nieuwe projecten.
- [Privacy](https://oussamaelhajoui.nl/privacy/): Informatie over gegevensverwerking en trackingtoestemming.
${projects.map((project) => `- [${project.title}](https://oussamaelhajoui.nl/projecten/): ${project.summary}`).join("\n")}

## Contact

- E-mail: ${data.contact.email}
- Locatie: ${data.contact.location || "Nederland"}
`;

const sitemapUrls = [
  ["/", "1.0"],
  ["/diensten/", "0.9"],
  ["/projecten/", "0.9"],
  ["/werkwijze/", "0.8"],
  ["/over/", "0.8"],
  ["/offerte/", "0.9"],
  ["/privacy/", "0.3"],
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(([path, priority]) => `  <url><loc>https://oussamaelhajoui.nl${path}</loc><priority>${priority}</priority></url>`).join("\n")}
</urlset>
`;

await mkdir(dirname(destination), { recursive: true });
await mkdir(publicDirectory, { recursive: true });
await Promise.all([
  writeFile(destination, `${serialized}\n`, "utf8"),
  writeFile(resolve(publicDirectory, "llms.txt"), llmsText, "utf8"),
  writeFile(resolve(publicDirectory, "llm.txt"), llmsText, "utf8"),
  writeFile(resolve(publicDirectory, "sitemap.xml"), sitemap, "utf8"),
]);

console.log(`Publieke Strapi-content en discoverybestanden bijgewerkt vanuit ${strapiUrl}`);
