# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Site static Astro 5 + Tailwind pentru Școala Gimnazială Christiana (Cluj-Napoca), programul „A Doua Șansă". Pornit din template-ul [AstroWind](https://github.com/onwidget/astrowind), portat de pe WordPress.

`README.md` este ghidul de onboarding pentru dezvoltatori (în română, foarte detaliat) — citește-l pentru rețete pas cu pas. Fișierul de aici acoperă doar ce nu e evident din README sau din structura fișierelor.

## Comenzi

```bash
npm run dev      # dev server pe http://localhost:4321
npm run build    # build static în dist/
npm run preview  # servește dist/ local
npm run check    # OBLIGATORIU înainte de commit: astro check + eslint + prettier --check
npm run fix      # eslint --fix + prettier -w
```

**Nu există suită de teste** — `npm test` nu e definit, iar pasul de test din CI e comentat. Verificarea unei schimbări se face prin `npm run check` + `npm run build`, iar pentru schimbări vizibile prin inspectarea HTML-ului generat în `dist/` sau `npm run preview`.

CI (`.github/workflows/actions.yaml`) rulează `npm run build` pe Node 18/20/22 și `npm run check` pe Node 22, la push și PR pe `main`.

## Arhitectură — ce necesită citit mai multe fișiere

### `src/config.yaml` → modulul virtual `astrowind:config`

Configul global al site-ului stă în `src/config.yaml`. Integrarea din `vendor/integration/` îl citește la build și îl expune ca **modul virtual** `astrowind:config`, cu export-urile `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, `ANALYTICS`:

```ts
import { APP_BLOG } from 'astrowind:config';
```

Deci ca să schimbi URL-uri de blog, SEO implicit, temă sau paginare, **editezi `config.yaml`**, nu codul. `vendor/` este cod de template — nu se modifică.

### Noutăți (blog) — lanțul complet

Un anunț nou traversează: `src/data/post/*.md` → schema din `src/content/config.ts` (glob loader, `base: 'src/data/post'`) → `src/utils/blog.ts` → rutele dinamice din `src/pages/[...blog]/`.

Detalii care contează:

- **Fișierele stau în `src/data/post/`, NU în `src/content/post/`.** Colecția se numește `post`, dar `base` e `src/data/post`.
- **Slug-ul URL vine din numele fișierului**, nu din frontmatter: `src/utils/blog.ts` face `cleanSlug(id)`. Câmpul `slug:` prezent în frontmatter-ul posturilor existente **este ignorat** (schema zod din `src/content/config.ts` nu îl declară, deci îl elimină în silentio). Când adaugi un articol, numele fișierului dictează URL-ul — păstrează totuși `slug:` identic cu numele fișierului, pentru consistență cu restul postărilor.
- Permalink-urile vin din `config.yaml` → `apps.blog`: postările la `/noutati/%slug%`, lista la `/noutati`, categoriile la `/categorie`, etichetele la `/eticheta`. Pattern-ul e expandat în `generatePermalink()` din `blog.ts` (suportă și `%year%`, `%month%`, `%category%` etc.).
- Articolele apar automat în listă și în `BlogLatestPosts` de pe homepage după build — nu se adaugă manual în `src/navigation.ts`.
- `draft: true` ascunde articolul în producție.

### Pipeline-ul Markdown (plugin-uri din `astro.config.ts`)

Trei plugin-uri definite în `src/utils/frontmatter.ts` se aplică tuturor fișierelor Markdown:

- `readingTimeRemarkPlugin` — injectează `readingTime` în frontmatter.
- `responsiveTablesRehypePlugin` — împachetează tabelele în `<div style="overflow:auto">`. **Atenție: doar tabelele de la nivelul rădăcină al documentului.** Un tabel imbricat (într-o listă, într-un blockquote) nu devine scrollabil pe mobil.
- `lazyImagesRehypePlugin` — adaugă `loading="lazy"` la `<img>`.

Convenția din postările existente pentru date tabelare (orare, calendare, tabele de posturi) este **HTML brut `<table>` scris pe un singur rând**, la nivel rădăcină — vezi `src/data/post/calendarul-examenelor-anul-scolar-2025-2026-programul-a-doua-sansa.md`. Fișierele `.md` **nu pot** folosi componente Astro; doar `.mdx` poate (MDX e activat, dar nicio postare nu îl folosește încă).

### Pagini statice

Rutare pe bază de fișiere în `src/pages/`. Toate paginile de conținut urmează același șablon: `PageLayout` + `Hero` (cu slot-urile `title`/`subtitle`) + `WidgetWrapper` sau o `<section>` cu clase Tailwind. Copiază `despre-noi.astro` sau `documente-utile.astro` ca punct de plecare.

Meniurile sunt în `src/navigation.ts` (`headerData`, `footerData`). Folosește **întotdeauna** `getPermalink('/cale')` / `getBlogPermalink()` / `getAsset()` din `src/utils/permalinks.ts` pentru link-uri interne — respectă `base` și `trailingSlash` din config. O pagină nouă apare în meniu doar dacă o adaugi aici.

### `src/assets/` vs `public/` — decizia se ia o dată, per fișier

- `src/assets/images/` — imagini **importate** în cod, optimizate de Astro (hash în nume). Folosite prin `<Image src={import} />`.
- `public/` — servit ca atare, la URL fix. **Toate PDF-urile și documentele descărcabile merg aici.**

Convenția de căi din `public/images/uploads/YYYY/MM/` este moștenită din WordPress și e păstrată pentru fișierele noi (ex. `public/images/uploads/2026/09/...` referit ca `/images/uploads/2026/09/...`). Redenumește fișierele primite în nume descriptive, fără diacritice și fără prefixe de export (`6_Programa_titu_P_...` → `Programa-concurs-Consiliere-psihopedagogica.pdf`).

### Stilizare

Tailwind cu clase utilitare în HTML. Culorile temei sunt variabile CSS în `src/components/CustomStyles.astro` (`--aw-color-primary` etc.), mapate în `tailwind.config.js` la `text-primary`, `bg-secondary`, `text-accent`. Tema e **light-only** (`ui.theme: 'light:only'` în `config.yaml`) — clasele `dark:` existente în cod sunt inerte, moștenite din template; nu e nevoie să adaugi variante dark noi.

## Convenții de conținut

- **Tot conținutul și mesajele de commit sunt în română**, cu diacritice. Istoricul folosește formulări ca „Adaugă...", „Corectare...", „UI: ...".
- Textele folosesc ghilimelele românești `„...”` (nu `"..."`). Păstrează stilul când transcrii documente primite.
- Anunțurile de concurs/examene sunt transcrieri fidele ale documentelor oficiale primite de școală — nu rescrie, nu rezuma, nu „îmbunătăți" formulările; păstrează datele, orele, adresele și listele de documente exact.

## Capcane cunoscute

- **Prettier nu e idempotent pe `README.md`.** Un singur `npm run fix` nu ajunge: prima trecere aliniază tabelele Markdown, iar abia a doua reformatează blocurile de cod `astro` imbricate. Dacă `npm run check` mai pică pe formatare imediat după `npm run fix`, rulează `npm run fix` încă o dată înainte să cauți altă cauză.
- Dacă `npm run check` semnalează un fișier pe care nu l-ai atins, rulează `npm run fix` și verifică diff-ul înainte de a-l include în commit.
- `public/decapcms/` este un rest din template-ul AstroWind: nu e referit de nicăieri și configul lui indică o colecție `src/content/post` care nu există. Nu îl folosi ca sursă de adevăr pentru schema postărilor.
- `src/pages/documente/` este un folder gol, rămas din portare.
- `dist/` este generat și în `.gitignore` — nu edita nimic acolo.

## Deploy

Producția (`scoalachristiana.ro`) e pe **Netlify**, cu deploy automat la merge în `main` (`netlify.toml`: `npm run build` → publică `dist/`). Netlify face și Deploy Preview pentru fiecare PR. Nu există pas manual de deploy. `Dockerfile` + `nginx/` sunt o alternativă de self-hosting (nginx pe portul 8080), nefolosită în producție.
