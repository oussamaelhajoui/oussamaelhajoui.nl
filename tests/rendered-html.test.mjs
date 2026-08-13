import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readPage = (route = "") => readFile(new URL(`../out/${route}index.html`, import.meta.url), "utf8");

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
  assert.doesNotMatch(sitemap, /https:\/\/oussamaelhajoui\.nl\/(?:diensten|over|offerte)\//);
  assert.match(llms, /^# Oussama El Hajoui/m);
  assert.equal(llmAlias, llms);
  assert.match(tracking, /googletagmanager\.com/);
  assert.match(tracking, /connect\.facebook\.net/);
  assert.match(tracking, /analytics\.tiktok\.com/);
  assert.match(tracking, /sc-static\.net/);
  assert.doesNotMatch(tracking, /eval\s*\(/);
});

test("bouwt de Strapi-snapshot in zonder client-side CMS-request", async () => {
  const home = await readPage();
  const services = await readPage("diensten/");
  const process = await readPage("werkwijze/");
  const about = await readPage("over/");
  const snapshot = JSON.parse(await readFile(new URL("../content/site.json", import.meta.url), "utf8"));
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
