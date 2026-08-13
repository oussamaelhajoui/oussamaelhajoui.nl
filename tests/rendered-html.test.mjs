import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readPage = (route = "") => readFile(new URL(`../out/${route}index.html`, import.meta.url), "utf8");

test("exporteert echte HTML voor alle hoofdpagina's", async () => {
  const routes = ["", "diensten/", "werkwijze/", "over/", "offerte/", "privacy/", "bedankt/"];
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
  assert.doesNotMatch(home, /<script[^>]+src=/i);
  assert.match(home, /rel="canonical" href="https:\/\/oussamaelhajoui\.nl\/?"/);
  assert.match(home, /Ga naar de inhoud/);
  assert.match(quote, /action="https:\/\/formsubmit\.co\//);
  assert.match(quote, /name="privacy-akkoord"/);
  assert.match(quote, /type="email"/);
});

test("bouwt de Strapi-snapshot in zonder client-side CMS-request", async () => {
  const home = await readPage();
  const snapshot = JSON.parse(await readFile(new URL("../content/site.json", import.meta.url), "utf8"));
  assert.ok(home.includes(snapshot.heroTitle));
  assert.doesNotMatch(home, /localhost:1337|\/api\/site-setting/);
});
