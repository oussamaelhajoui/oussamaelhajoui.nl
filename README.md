# oussamaelhajoui.nl

Persoonlijke website van Oussama El Hajoui. De frontend is een statische, multi-page Next.js-export met Tailwind CSS. Strapi 5 is de headless CMS-laag; GitHub Actions bouwt en publiceert de statische HTML naar GitHub Pages.

## Lokaal starten

Vereist Node.js 22.

```bash
npm install
copy .env.example .env.local
npm run dev
```

De website draait op `http://localhost:3000`.

## Strapi CMS

```bash
cd cms
copy .env.example .env
npm run develop
```

Open daarna `http://localhost:1337/admin` en maak het eerste beheerdersaccount. Het contenttype **Website-instellingen** en de begininhoud worden automatisch aangemaakt. De publieke website leest deze inhoud tijdens `npm run build`. Zonder bereikbare Strapi-installatie gebruikt de build veilige lokale standaardteksten.

Voor productie host je `cms/` op Strapi Cloud of een andere Node.js-host met persistente PostgreSQL-database. Zet vervolgens in GitHub onder **Settings → Secrets and variables → Actions**:

- `STRAPI_URL`: de publieke URL van Strapi;
- `STRAPI_API_TOKEN`: optioneel read-only token;
- `QUOTE_EMAIL`: het Gmail-adres voor offerteaanvragen.

Publiceer na een CMS-wijziging opnieuw via **Actions → Deploy naar GitHub Pages → Run workflow**.

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
