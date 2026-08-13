import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destination = resolve(projectRoot, "content/site.json");
const strapiUrl = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

const response = await fetch(`${strapiUrl}/api/site-setting`, {
  headers: process.env.STRAPI_API_TOKEN
    ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
    : undefined,
});

if (!response.ok) {
  throw new Error(`Strapi gaf HTTP ${response.status}. Is de content gepubliceerd en de API toegankelijk?`);
}

const payload = await response.json();
const data = payload?.data;

if (
  !data ||
  typeof data.heroTitle !== "string" ||
  typeof data.heroText !== "string" ||
  typeof data.availability !== "string" ||
  typeof data.quoteEmail !== "string" ||
  !Array.isArray(data.stack) ||
  !data.stack.every((item) => typeof item === "string")
) {
  throw new Error("Strapi retourneerde niet alle verwachte websitevelden.");
}

const snapshot = {
  heroTitle: data.heroTitle,
  heroText: data.heroText,
  availability: data.availability,
  quoteEmail: data.quoteEmail,
  stack: data.stack,
};

await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Publieke Strapi-content opgeslagen in ${destination}`);
