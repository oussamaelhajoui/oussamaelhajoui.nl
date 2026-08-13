# oussamaelhajoui.nl

Persoonlijke website van Oussama El Hajoui. De frontend is een statische, multi-page Next.js-export met Tailwind CSS. Strapi 5 is de headless CMS-laag; GitHub Actions bouwt en publiceert de statische HTML naar GitHub Pages.

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

Zet in GitHub onder **Settings → Secrets and variables → Actions** alleen:

- `QUOTE_EMAIL`: het Gmail-adres voor offerteaanvragen.

Een push naar `main` publiceert de nieuwe statische versie automatisch.

## Offerteformulier

Het formulier gebruikt FormSubmit en werkt zonder frontend-JavaScript. Bij de eerste testmail stuurt FormSubmit een activatielink naar `QUOTE_EMAIL`; bevestig die eenmalig. Daarna komen aanvragen direct in Gmail binnen.

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
