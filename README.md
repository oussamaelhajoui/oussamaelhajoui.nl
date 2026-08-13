# oussamaelhajoui.nl

Persoonlijke website van Oussama El Hajoui. De frontend is een statische, multi-page Next.js-export met Tailwind CSS. Strapi 5 is de headless CMS-laag; GitHub Actions bouwt en publiceert de statische HTML naar GitHub Pages.

De primaire pagina's zijn **Home** (`/`), **Online diensten** (`/online-diensten/`), **Over Oussama** (`/over-oussama/`) en **Contact** (`/contact/`). Portfolio, werkwijze en privacy blijven als aanvullende pagina's beschikbaar.

## Lokaal starten

Vereist Node.js 22.

```bash
npm install
copy .env.example .env.local
npm run dev
```

De website draait op `http://localhost:3000` en leest tijdens development rechtstreeks uit de lokale Strapi-server.

## Strapi CMS

```bash
cd cms
copy .env.example .env
npm run develop
```

Open daarna `http://localhost:1337/admin` en maak het eerste beheerdersaccount. Het contenttype **Website-instellingen** en de begininhoud worden automatisch aangemaakt.

Onder **Content Manager → Website-instellingen** beheer je onder andere:

- de homepage-intro, beschikbaarheid, stack, diensten en kwaliteitsprincipes;
- de intro, diensten en doelgroepen van de dienstenpagina;
- de vijf processtappen en samenwerkingsprincipes;
- de over-mij-intro, biografie en kernwaarden;
- de offerte-intro, vervolgstappen, algemene CTA en footertekst.
- SEO-titel, omschrijving, zoekwoorden, social-preview, robots-instellingen en verificatiecodes;
- vrije extra `<meta name="...">`- en `<meta property="...">`-tags;
- contactgegevens en sociale profielen;
- Google Tag Manager, Google tag en pixels voor Meta, TikTok en Snapchat.

Onder **Content Manager → Projecten** voeg je portfolio-items toe. Alleen gepubliceerde projecten verschijnen op de projectenpagina; items met **Uitgelicht** verschijnen ook op de homepage.

Tracking staat standaard uit. Vul onder **Tracking en pixels** alleen de ID's in, zet **Enabled** aan en publiceer. Tags worden pas na toestemming geladen. Gebruik pixels óf beheer ze in Google Tag Manager om dubbele metingen te voorkomen.

De site genereert standaard de technische en SEO-meta-informatie: charset, viewport, theme color, description, keywords, canonical URL, robots en Googlebot-regels, auteursinformatie, Open Graph, Twitter Cards, iconen en gestructureerde data. Vul onder **Website-instellingen** ook de optionele Google- en Bing-verificatiecodes in; voeg alleen de codewaarde toe, niet de volledige HTML-tag.

Gebruik **Extra meta-tags** voor een provider-specifieke tag die nog niet standaard aanwezig is. Kies `name` of `property`, vul bij **Meta key** alleen de sleutel in (bijvoorbeeld `pinterest-site-verification` of `product:brand`) en vul daarna **Content** in. Deze tags worden veilig als HTML-attributen op iedere pagina geplaatst; scripts of vrije HTML worden niet uitgevoerd. Voeg standaardtags niet dubbel toe.

Klik na een wijziging in Strapi op **Publish**. Vernieuw de lokale website om de wijziging te bekijken.

Strapi blijft lokaal en is niet vanaf GitHub Pages bereikbaar. Daarom wordt alleen de publieke websitecontent vóór publicatie naar `content/site.json` geëxporteerd:

```bash
npm run content:sync
```

Deze snapshot bevat geen beheerdersaccount, wachtwoord of databasegegevens. De lokale SQLite-database in `cms/.tmp/` wordt niet naar GitHub gestuurd.

Controleer vervolgens de productiebuild en push de gewijzigde snapshot:

```bash
npm run content:publish
git add content/site.json
git commit -m "Update website content"
git push
```

GitHub Actions bouwt de statische website uitsluitend uit de gecontroleerde snapshot. Bezoekers maken daardoor geen request naar Strapi.

De synchronisatie werkt ook `robots.txt`, `sitemap.xml`, `llms.txt` en de compatibiliteitsalias `llm.txt` bij. Projectafbeeldingen worden als geoptimaliseerde WebP-bestanden naar de statische site gekopieerd.

Een push naar `main` publiceert de nieuwe statische versie automatisch.

## Offerteformulier

Het formulier gebruikt FormSubmit en werkt zonder frontend-JavaScript. Het ontvangstadres beheer je bij **Contactgegevens** in Strapi. Bij de eerste testmail naar een nieuw adres stuurt FormSubmit een activatielink; bevestig die eenmalig. Daarna komen aanvragen direct in die inbox binnen.

## GitHub Pages en domein

De workflow in `.github/workflows/deploy-pages.yml` publiceert de map `out/`. `public/CNAME` koppelt de build aan `oussamaelhajoui.nl`.

In Namecheap voeg je voor het hoofddomein vier `A`-records toe:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Voeg daarnaast `CNAME` host `www` toe met waarde `<github-gebruikersnaam>.github.io`. Verwijder conflicterende parkeer- of redirectrecords. Activeer ten slotte **Enforce HTTPS** bij **Settings → Pages** zodra GitHub het certificaat heeft uitgegeven.

## Controle

```bash
npm run typecheck
npm test
```
