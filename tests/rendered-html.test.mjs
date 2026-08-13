import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readPage = (route = "") => readFile(new URL(`../out/${route}index.html`, import.meta.url), "utf8");

test("exporteert echte HTML voor alle hoofdpagina's", async () => {
  const routes = ["", "diensten/", "projecten/", "werkwijze/", "over/", "offerte/", "privacy/", "bedankt/"];
  for (const route of routes) {
    const html = await readPage(route);
    assert.match(html, /<html lang="nl"/);
    assert.match(html, /<title>/);
    assert.doesNotMatch(html, /codex-preview|loading skeleton/i);
  }
});

test("bevat SEO, toegankelijkheid en het offerteformulier", async () => {
  const home = await readPage();
  const quote = await readPage("offerte/");
  assert.match(home, /application\/ld\+json/);
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
  assert.match(sitemap, /https:\/\/oussamaelhajoui\.nl\/projecten\//);
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
  assert.doesNotMatch(home, /localhost:1337|\/api\/site-setting/);
});
