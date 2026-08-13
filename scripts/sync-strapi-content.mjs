import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destination = resolve(projectRoot, "content/site.json");
const strapiUrl = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

const response = await fetch(`${strapiUrl}/api/site-setting?populate=*`, {
  headers: process.env.STRAPI_API_TOKEN
    ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
    : undefined,
});

if (!response.ok) {
  throw new Error(`Strapi gaf HTTP ${response.status}. Is de content gepubliceerd en de API toegankelijk?`);
}

const payload = await response.json();
const data = payload?.data;

const publicFields = [
  "heroTitle",
  "heroHighlight",
  "heroText",
  "availability",
  "quoteEmail",
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
];

if (!data || publicFields.some((field) => data[field] == null)) {
  throw new Error("Strapi retourneerde niet alle verwachte websitevelden. Publiceer Website-instellingen opnieuw.");
}

const snapshot = Object.fromEntries(publicFields.map((field) => [field, data[field]]));
const serialized = JSON.stringify(
  snapshot,
  (key, value) => (key === "id" || key === "documentId" ? undefined : value),
  2,
);

await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, `${serialized}\n`, "utf8");
console.log(`Publieke Strapi-content opgeslagen in ${destination}`);
