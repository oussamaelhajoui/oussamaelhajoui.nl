import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readPage = (route = "") => readFile(new URL(`../out/${route}index.html`, import.meta.url), "utf8");

const getSnapshot = async () => JSON.parse(
  await readFile(new URL("../content/site.json", import.meta.url), "utf8"),
);

const getLandingRoute = (service, location) => service.isWebsiteService
  ? `website-laten-maken/${location.slug}/`
  : `diensten/${service.slug}/${location.slug}/`;

const textContent = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--\s*-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&#x27;/g, "'")
  .replace(/\s+/g, " ")
  .trim();

test("exporteert echte HTML voor alle hoofdpagina's", async () => {
  const routes = [
    "",
    "online-diensten/",
    "over-oussama/",
    "contact/",
    "projecten/",
    "werkwijze/",
    "privacy/",
    "bedankt/",
  ];
  for (const route of routes) {
    const html = await readPage(route);
    assert.match(html, /<html lang="nl"/);
    assert.match(html, /<title>/);
    assert.doesNotMatch(html, /codex-preview|loading skeleton/i);
  }
});

test("bevat SEO, toegankelijkheid en het offerteformulier", async () => {
  const home = await readPage();
  const quote = await readPage("contact/");
  assert.match(home, /application\/ld\+json/);
  assert.match(home, /<meta charSet="utf-8"/i);
  assert.match(home, /<meta name="viewport"/i);
  assert.match(home, /<meta name="theme-color" content="#07172f"/i);
  assert.match(home, /<meta name="description"/i);
  assert.match(home, /<meta name="generator" content="Next\.js"/i);
  assert.match(home, /<meta name="application-name" content="Oussama El Hajoui"/i);
  assert.match(home, /<meta name="author" content="Oussama El Hajoui"/i);
  assert.match(home, /<meta name="keywords"/i);
  assert.match(home, /<meta name="referrer" content="origin-when-cross-origin"/i);
  assert.match(home, /<meta name="robots"/i);
  assert.match(home, /<meta name="googlebot"/i);
  assert.match(home, /<meta property="og:title"/i);
  assert.match(home, /<meta property="og:description"/i);
  assert.match(home, /<meta property="og:image"/i);
  assert.match(home, /<meta name="twitter:card" content="summary_large_image"/i);
  assert.match(home, /<meta name="twitter:title"/i);
  const externalScripts = home.match(/<script[^>]+src=/gi) ?? [];
  const stylesheets = home.match(/<link[^>]+rel="stylesheet"/gi) ?? [];
  assert.ok(externalScripts.length <= 1);
  assert.ok(externalScripts.every((tag) => tag.includes("/tracking.js")));
  assert.equal(stylesheets.length, 1);
  assert.match(home, /rel="canonical" href="https:\/\/oussamaelhajoui\.nl\/?"/);
  assert.match(home, /Ga naar de inhoud/);
  assert.match(quote, /action="https:\/\/formsubmit\.co\//);
  assert.match(quote, /name="privacy-akkoord"/);
  assert.match(quote, /type="email"/);
});

test("bevat complete en unieke SEO-meta op iedere indexeerbare pagina", async () => {
  const sitemap = await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  const paths = [...sitemap.matchAll(/<loc>https:\/\/oussamaelhajoui\.nl(.*?)<\/loc>/g)].map((match) => match[1]);
  const titles = new Set();
  const descriptions = new Set();

  assert.equal(paths.length, 71);
  for (const path of paths) {
    const route = path === "/" ? "" : path.replace(/^\//, "");
    const html = await readPage(route);
    const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];

    assert.ok(title, `Titel ontbreekt voor ${path}`);
    assert.ok(description, `Description ontbreekt voor ${path}`);
    assert.ok(html.includes(`rel="canonical" href="https://oussamaelhajoui.nl${path}"`), `Canonical ontbreekt voor ${path}`);
    assert.match(html, /<meta name="robots"/i);
    assert.match(html, /<meta name="googlebot"/i);
    assert.match(html, /<meta property="og:title"/i);
    assert.match(html, /<meta property="og:description"/i);
    assert.match(html, /<meta property="og:image"/i);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/i);
    assert.match(html, /<meta name="twitter:title"/i);
    assert.match(html, /<meta name="twitter:description"/i);
    assert.match(html, /<meta name="twitter:image"/i);
    assert.match(html, /<h1/);
    assert.match(html, /application\/ld\+json/);
    assert.doesNotMatch(html, /id="__next_error__"|<meta name="robots" content="noindex"/i);

    titles.add(title);
    descriptions.add(description);
  }

  assert.equal(titles.size, paths.length);
  assert.equal(descriptions.size, paths.length);
});

test("publiceert robots-, sitemap- en LLM-discoverybestanden", async () => {
  const [robots, sitemap, llms, llmAlias, tracking] = await Promise.all([
    readFile(new URL("../out/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../out/llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../out/llm.txt", import.meta.url), "utf8"),
    readFile(new URL("../out/tracking.js", import.meta.url), "utf8"),
  ]);
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/oussamaelhajoui\.nl\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/oussamaelhajoui\.nl\/online-diensten\//);
  assert.match(sitemap, /https:\/\/oussamaelhajoui\.nl\/over-oussama\//);
  assert.match(sitemap, /https:\/\/oussamaelhajoui\.nl\/contact\//);
  assert.match(sitemap, /https:\/\/oussamaelhajoui\.nl\/projecten\//);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/oussamaelhajoui\.nl\/(?:diensten|over|offerte)\/<\/loc>/);
  assert.match(llms, /^# Oussama El Hajoui/m);
  assert.equal(llmAlias, llms);
  assert.match(tracking, /googletagmanager\.com/);
  assert.match(tracking, /connect\.facebook\.net/);
  assert.match(tracking, /analytics\.tiktok\.com/);
  assert.match(tracking, /sc-static\.net/);
  assert.doesNotMatch(tracking, /eval\s*\(/);
});

test("exporteert iedere Strapi-locatie voor iedere dienst als unieke landingspagina", async () => {
  const snapshot = await getSnapshot();
  assert.equal(snapshot.locations.length, 8);
  assert.equal(snapshot.services.length, 8);
  assert.equal(snapshot.services.filter((service) => service.isWebsiteService).length, 1);

  const routes = new Set();
  for (const service of snapshot.services) {
    assert.match(service.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(service.seoKeyword);
    assert.ok(Array.isArray(service.searchTerms));
    assert.ok(service.searchTerms.length > 0);
    assert.ok(service.landingIntro);

    for (const location of snapshot.locations) {
      const route = getLandingRoute(service, location);
      routes.add(route);
      const html = await readPage(route);
      const canonical = `https://oussamaelhajoui.nl/${route}`;

      assert.match(html, /<html lang="nl"/);
      assert.ok(html.includes(location.name));
      assert.ok(html.includes(service.seoKeyword));
      assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
      assert.match(html, /application\/ld\+json/);
      assert.match(html, /<meta property="og:image"/i);
      assert.match(html, /<meta name="twitter:card" content="summary_large_image"/i);
      const externalScripts = html.match(/<script[^>]+src=/gi) ?? [];
      const stylesheets = html.match(/<link[^>]+rel="stylesheet"/gi) ?? [];
      assert.ok(externalScripts.length <= 1);
      assert.ok(externalScripts.every((tag) => tag.includes("/tracking.js")));
      assert.equal(stylesheets.length, 1);
      assert.doesNotMatch(html, /localhost:1337|\/api\/locations|\/api\/site-setting/);
    }
  }

  assert.equal(routes.size, snapshot.locations.length * snapshot.services.length);
});

test("neemt alle locatie-landingspagina's op in sitemap en LLM-overzicht", async () => {
  const [snapshot, sitemap, llms] = await Promise.all([
    getSnapshot(),
    readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../out/llms.txt", import.meta.url), "utf8"),
  ]);

  const expectedRoutes = snapshot.services.flatMap((service) => snapshot.locations.map(
    (location) => getLandingRoute(service, location),
  ));
  assert.equal(new Set(expectedRoutes).size, snapshot.services.length * snapshot.locations.length);

  for (const route of expectedRoutes) {
    const url = `https://oussamaelhajoui.nl/${route}`;
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.ok(llms.includes(url));
  }
});

test("bouwt de Strapi-snapshot in zonder client-side CMS-request", async () => {
  const home = await readPage();
  const services = await readPage("diensten/");
  const process = await readPage("werkwijze/");
  const about = await readPage("over/");
  const snapshot = await getSnapshot();
  assert.ok(home.includes(snapshot.heroTitle));
  assert.ok(home.includes(snapshot.homeServices[0].title));
  assert.ok(services.includes(snapshot.services[0].lead));
  assert.ok(process.includes(snapshot.processSteps[0].text));
  assert.ok(about.includes(snapshot.aboutQuote));
  assert.ok(Array.isArray(snapshot.seoKeywords));
  assert.equal(typeof snapshot.robotsIndex, "boolean");
  assert.equal(typeof snapshot.robotsFollow, "boolean");
  assert.ok(Array.isArray(snapshot.customMetaTags));
  assert.doesNotMatch(home, /localhost:1337|\/api\/site-setting/);
});

test("ondersteunt de regionale commerciële zoekintentie en nieuwe expertises", async () => {
  const [home, websiteEindhoven, webshopEindhoven, services, quote, snapshot] = await Promise.all([
    readPage(),
    readPage("website-laten-maken/eindhoven/"),
    readPage("diensten/webshops/eindhoven/"),
    readPage("online-diensten/"),
    readPage("contact/"),
    getSnapshot(),
  ]);

  const requiredServices = [
    "websites",
    "webshops",
    "web-apps",
    "backend-apis",
    "doorontwikkeling",
    "ai-training-gastlessen",
    "security-assessments-pentests",
    "technisch-projectleider",
  ];
  assert.deepEqual(snapshot.services.map((service) => service.slug), requiredServices);
  assert.match(textContent(home), /Website laten bouwen in Eindhoven en omgeving/i);
  assert.match(textContent(home), /WordPress/i);
  assert.match(textContent(home), /Shopify \/ Liquid/i);
  assert.match(textContent(websiteEindhoven), /website laten bouwen in Eindhoven/i);
  assert.match(textContent(websiteEindhoven), /WordPress/i);
  assert.match(textContent(webshopEindhoven), /Shopify/i);
  assert.match(textContent(webshopEindhoven), /Liquid maatwerk/i);
  assert.match(textContent(services), /AI-training & gastlessen/i);
  assert.match(textContent(services), /Security-assessments & pentests/i);
  assert.match(textContent(services), /nearshore[\s\S]*offshore/i);
  assert.match(textContent(services), /farshore/i);
  assert.match(textContent(quote), /Webshop, Shopify of Liquid/i);
  assert.match(textContent(quote), /Security-assessment of pentest/i);
});

test("biedt veilige vrije name- en property-metatags via Strapi", async () => {
  const schema = JSON.parse(await readFile(
    new URL("../cms/src/components/shared/meta-tag.json", import.meta.url),
    "utf8",
  ));
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.deepEqual(schema.attributes.attribute.enum, ["name", "property"]);
  assert.equal(schema.attributes.metaKey.required, true);
  assert.equal(schema.attributes.content.required, true);
  assert.match(layout, /<meta property=\{tag\.metaKey\} content=\{tag\.content\}/);
  assert.match(layout, /<meta name=\{tag\.metaKey\} content=\{tag\.content\}/);
  assert.match(layout, /validMetaKey\.test\(tag\.metaKey\)/);
});

test("beheert locaties en dienst-SEO volledig via Strapi", async () => {
  const [locationSchema, serviceSchema] = await Promise.all([
    readFile(new URL("../cms/src/api/location/content-types/location/schema.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../cms/src/components/shared/service.json", import.meta.url), "utf8").then(JSON.parse),
  ]);

  assert.equal(locationSchema.kind, "collectionType");
  for (const field of ["name", "slug", "province", "intro", "localText", "regionalContext", "active", "sortOrder"]) {
    assert.ok(locationSchema.attributes[field]);
  }
  for (const field of ["slug", "seoKeyword", "searchTerms", "landingIntro", "isWebsiteService"]) {
    assert.ok(serviceSchema.attributes[field]);
  }
});
