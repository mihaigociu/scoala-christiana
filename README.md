# Școala Gimnazială Christiana — site oficial

Site-ul oficial al **Școlii Gimnaziale Christiana** din Cluj-Napoca, portat de pe WordPress pe [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/).

🌐 **Producție: [scoalachristiana.ro](https://scoalachristiana.ro)**

> Acest README este gândit ca **ghid de start pentru un dezvoltator nou pe proiect**. Citește-l o dată de la cap la coadă înainte să faci prima modificare — îți va economisi mult timp.

---

## Cuprins

1. [Despre școală și site](#1-despre-școală-și-site)
2. [Tehnologii folosite](#2-tehnologii-folosite)
3. [Cerințe preliminare](#3-cerințe-preliminare)
4. [Pornire rapidă](#4-pornire-rapidă)
5. [Comenzi npm](#5-comenzi-npm)
6. [Structura proiectului](#6-structura-proiectului)
7. [Cum funcționează Astro (pe scurt)](#7-cum-funcționează-astro-pe-scurt)
8. [Rețete practice — cele mai frecvente sarcini](#8-rețete-practice--cele-mai-frecvente-sarcini)
9. [Stilizare și temă](#9-stilizare-și-temă)
10. [Verificarea codului înainte de commit](#10-verificarea-codului-înainte-de-commit)
11. [Git și deploy](#11-git-și-deploy)
12. [Greșeli frecvente / depanare](#12-greșeli-frecvente--depanare)
13. [De unde să înveți mai mult](#13-de-unde-să-înveți-mai-mult)

---

## 1. Despre școală și site

Școala Gimnazială Christiana din Cluj-Napoca derulează programul de învățământ **„A Doua Șansă"**, destinat persoanelor care nu și-au finalizat educația de bază la nivel primar și gimnazial.

Site-ul este un **site static** (fără bază de date, fără backend). Tot conținutul stă în fișiere din repo:

- **paginile** sunt fișiere `.astro` în `src/pages/`
- **noutățile/articolele** sunt fișiere Markdown în `src/data/post/`
- **meniurile** sunt configurate în `src/navigation.ts`

Când faci un build, Astro generează HTML pur în folderul `dist/`, care apoi este servit de hosting. Nu există parte de server care rulează „live".

---

## 2. Tehnologii folosite

| Tehnologie | Rol | De ce contează pentru tine |
|---|---|---|
| [Astro 5](https://astro.build/) | Framework de site static | Definește formatul fișierelor `.astro` și cum se generează paginile |
| [Tailwind CSS 3](https://tailwindcss.com/) | Stilizare prin clase utilitare | Aproape tot stilul se face cu clase în HTML (ex: `class="text-xl font-bold"`) |
| [MDX](https://mdxjs.com/) | Markdown + componente | Folosit pentru articole/noutăți |
| [AstroWind](https://github.com/onwidget/astrowind) | Template de bază | Multe componente (Hero, Header, Footer etc.) vin de aici |
| [TypeScript](https://www.typescriptlang.org/) | Tipuri pentru JS | Folosit în scripturi și config; nu e nevoie de cunoștințe avansate |

Site-ul a pornit de la template-ul AstroWind, deci o parte din cod (mai ales `src/components/`, `src/utils/` și `vendor/`) este moștenit din template și **rar trebuie atins**. Tu vei lucra cel mai des în `src/pages/`, `src/data/post/` și `src/navigation.ts`.

---

## 3. Cerințe preliminare

- **Node.js** versiune `18.17.1+`, `20.3.0+` sau `21+` (vezi câmpul `engines` din `package.json`). Recomandat: ultima versiune LTS (20 sau 22).
  - Verifică ce versiune ai: `node --version`
  - Dacă jonglezi cu mai multe versiuni, folosește [nvm](https://github.com/nvm-sh/nvm).
- **npm** (vine cu Node).
- **Git**.
- **VS Code** (recomandat). La deschiderea proiectului îți va sugera extensiile din `.vscode/extensions.json`:
  - Astro, Tailwind CSS IntelliSense, ESLint, Prettier, MDX. **Instalează-le pe toate** — îți colorează sintaxa, îți completează clasele Tailwind și formatează codul automat.

---

## 4. Pornire rapidă

```bash
# 1. Clonează repo-ul (se va crea folderul scoala-christiana)
git clone <url-repo>
cd scoala-christiana

# 2. Instalează dependențele (o singură dată, sau când se schimbă package.json)
npm install

# 3. Pornește serverul de dezvoltare
npm run dev
```

Serverul de dev pornește de obicei pe **http://localhost:4321**. Are **hot reload**: salvezi un fișier și pagina se actualizează singură în browser.

---

## 5. Comenzi npm

| Comandă | Ce face |
|---|---|
| `npm run dev` | Pornește serverul local de dezvoltare (cu hot reload) |
| `npm run build` | Generează site-ul de producție în `dist/` |
| `npm run preview` | Servește local build-ul din `dist/` (verifici cum arată producția) |
| `npm run check` | **Verificare completă**: Astro + ESLint + Prettier. Rulează asta înainte de commit |
| `npm run check:astro` | Doar verificarea de tipuri/erori Astro |
| `npm run check:eslint` | Doar ESLint (calitatea codului) |
| `npm run check:prettier` | Doar Prettier (formatare) — verifică, nu modifică |
| `npm run fix` | Repară automat ce se poate: ESLint `--fix` + Prettier `-w` |

> ⚠️ **Important:** întotdeauna rulează `npm run check` (verificarea completă) înainte de commit/push, nu doar `astro check`. CI-ul (GitHub Actions) rulează aceleași verificări și va pica build-ul dacă sunt erori de lint sau de formatare.

---

## 6. Structura proiectului

```
.
├── astro.config.ts        # Configurarea Astro (integrări, plugin-uri, alias-uri)
├── src/
│   ├── config.yaml        # Config global site: nume, SEO, blog, analytics, temă
│   ├── navigation.ts      # ⭐ Meniul din header și footer
│   ├── pages/             # ⭐ Fiecare fișier = o pagină (rutare bazată pe fișiere)
│   │   ├── index.astro    #    → pagina principală (/)
│   │   ├── despre-noi.astro      # → /despre-noi
│   │   ├── cursanti/      #    → pagini sub /cursanti/... (orar, structura an etc.)
│   │   └── [...blog]/     #    → paginile de noutăți/blog (generate dinamic)
│   ├── data/post/         # ⭐ Articole/noutăți în Markdown (.md / .mdx)
│   ├── layouts/           # Layout-uri de pagină (structura comună: header, footer)
│   ├── components/        # Componente reutilizabile (vin în mare parte din AstroWind)
│   │   ├── widgets/       #    Blocuri mari: Hero, Header, Footer, Features, Contact...
│   │   ├── ui/            #    Elemente mici: Button, Headline, Timeline...
│   │   ├── blog/          #    Componente specifice blogului
│   │   └── common/        #    Meta, analytics, scripturi de bază
│   ├── assets/            # Imagini și stiluri PROCESATE de Astro (optimizate la build)
│   │   ├── images/        #    Imagini importate în componente
│   │   └── styles/        #    tailwind.css
│   ├── content/           # Definiția schemei colecției de articole (config.ts)
│   └── utils/             # Funcții ajutătoare (permalinks, blog, imagini) — rar de atins
├── public/                # Fișiere statice servite ca atare (NU sunt procesate)
│   └── images/            #    Imagini/PDF-uri referite direct prin URL (/images/...)
├── vendor/                # Integrarea AstroWind (cod de template) — nu modifica
├── tailwind.config.js     # Configurarea Tailwind (culori, fonturi, animații)
├── eslint.config.js       # Reguli ESLint
├── .prettierrc.cjs        # Reguli de formatare Prettier
├── netlify.toml / vercel.json / Dockerfile  # Configurări de deploy (vezi secțiunea 11)
└── dist/                  # Rezultatul build-ului (generat — NU se editează, NU se comite)
```

Cele marcate cu ⭐ sunt locurile unde vei lucra cel mai des.

### `assets/` vs `public/` — diferența importantă

- **`src/assets/`** — imagini pe care le **imporți** într-o componentă. Astro le optimizează automat (redimensionare, format modern, hash în nume). Folosește-le pentru imagini din pagini.
- **`public/`** — fișiere servite **exact așa cum sunt**, la URL-ul lor direct (ex: `public/images/document.pdf` → `https://site/images/document.pdf`). Folosește pentru PDF-uri, documente descărcabile și imagini referite prin URL fix.

---

## 7. Cum funcționează Astro (pe scurt)

Dacă n-ai mai lucrat cu Astro, citește asta — îți explică tot ce-ți trebuie ca să te descurci.

### Rutare bazată pe fișiere

Numele fișierului din `src/pages/` **devine URL-ul paginii**:

| Fișier | URL |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/contact.astro` | `/contact` |
| `src/pages/cursanti/orar.astro` | `/cursanti/orar` |

Fișierele între paranteze (`[...blog]`) sunt **rute dinamice** — generează mai multe pagini dintr-un șablon (aici, paginile de noutăți). Pe acestea nu va trebui să le modifici la început.

### Anatomia unui fișier `.astro`

```astro
---
// 1. ZONA DE SCRIPT (frontmatter) — JavaScript/TypeScript care rulează LA BUILD
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';

const metadata = {
  title: 'Despre noi',   // titlul din tab-ul browserului + SEO
};
---

<!-- 2. ZONA DE TEMPLATE — HTML cu componente -->
<Layout metadata={metadata}>
  <Hero>
    <Fragment slot="title">Titlul paginii</Fragment>
  </Hero>

  <section class="max-w-4xl mx-auto px-4">
    <p>Conținutul paginii, stilizat cu clase Tailwind.</p>
  </section>
</Layout>
```

- Tot ce e între `---` rulează **la build**, nu în browser. Aici faci import-uri și pregătești datele.
- Tot ce e dedesubt este HTML-ul randat.
- `<Fragment slot="title">` pune conținut într-un „slot" definit de componenta `Hero` (slot-urile sunt locuri unde o componentă-părinte poate insera conținut).

### Alias-ul `~`

În import-uri, `~` înseamnă folderul `src/`. Deci:

```astro
import Hero from '~/components/widgets/Hero.astro';
// este echivalent cu src/components/widgets/Hero.astro
```

Folosește mereu `~/...` în loc de căi relative cu multe `../../`.

---

## 8. Rețete practice — cele mai frecvente sarcini

### 8.1 Adaug o pagină nouă

1. Creează un fișier în `src/pages/`, ex. `src/pages/noutati-admitere.astro`. Numele fișierului devine URL-ul (`/noutati-admitere`).
2. Pornește de la o pagină existentă simplă ca model — **copiază `despre-noi.astro` sau `curriculum.astro`** și modifică conținutul. E cel mai rapid mod de a respecta structura.
3. Setează `metadata.title` în zona de script — apare în tab și în SEO.
4. Dacă pagina trebuie să apară în meniu, adaug-o în `src/navigation.ts` (vezi 8.3).

Șablon minim:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';

const metadata = {
  title: 'Titlul paginii mele',
};
---

<Layout metadata={metadata}>
  <Hero>
    <Fragment slot="title">Titlul afișat mare</Fragment>
    <Fragment slot="subtitle">Un subtitlu opțional.</Fragment>
  </Hero>

  <section class="mx-auto max-w-4xl px-4 md:px-8 pb-16">
    <div class="prose prose-lg max-w-none">
      <p>Conținutul paginii aici.</p>
    </div>
  </section>
</Layout>
```

> 💡 Clasa `prose` (din pluginul Tailwind Typography) stilizează automat text, titluri, liste și tabele — folosește-o pentru conținut de tip „articol".

### 8.2 Adaug o noutate / un articol

Noutățile sunt fișiere Markdown în `src/data/post/`. Creează un fișier nou, ex. `src/data/post/anunt-inscrieri-2026.md`:

```markdown
---
publishDate: 2026-06-15T10:00:00Z
title: 'Titlul anunțului'
slug: anunt-inscrieri-2026
excerpt: 'Un rezumat scurt care apare în lista de noutăți și în SEO.'
category: noutati
---

Conținutul articolului în **Markdown**.

## Subtitlu

Poți folosi liste, link-uri și chiar tabele HTML pentru date complexe (orare, calendare).
```

Câmpurile din zona dintre `---` se numesc **frontmatter**. Schema lor (ce e obligatoriu/opțional) e definită în `src/content/config.ts`:

- `title` — **obligatoriu**.
- `publishDate` — dată ISO; determină ordinea (cele mai noi primele).
- `slug` — partea din URL (articolul va fi la `/noutati/<slug>`, vezi `permalink` în `config.yaml`).
- `excerpt` — rezumat scurt.
- `category` — categoria (ex. `noutati`).
- `draft: true` — opțional; ascunde articolul din producție cât timp lucrezi la el.

Articolul apare automat în lista de noutăți după build — nu trebuie adăugat manual în meniu.

### 8.3 Modific meniul (header / footer)

Tot meniul este în **`src/navigation.ts`**. Are două obiecte exportate: `headerData` (meniul de sus) și `footerData` (subsol).

Structura unui element de meniu:

```ts
{
  text: 'Despre noi',                       // textul afișat
  href: getPermalink('/despre-noi'),        // link-ul (folosește getPermalink!)
  links: [                                  // opțional: submeniu (dropdown)
    { text: 'Galerie', href: getPermalink('/galerie') },
  ],
},
```

- Folosește mereu `getPermalink('/calea')` pentru link-uri interne — generează URL-ul corect respectând `base` și `trailingSlash` din config.
- `getBlogPermalink()` → pagina de noutăți; `getAsset('/fisier')` → fișiere statice.

### 8.4 Adaug o imagine

- **Imagine de conținut într-o pagină** → pune-o în `src/assets/images/`, import-o și folosește componenta `Image`:
  ```astro
  ---
  import Image from '~/components/common/Image.astro';
  import poza from '~/assets/images/poza.jpg';
  ---
  <Image src={poza} alt="Descriere" />
  ```
- **PDF / document descărcabil / imagine cu URL fix** → pune-l în `public/images/` (sau `public/`) și referă-l prin URL direct: `/images/document.pdf`.

### 8.5 Modific textul unei pagini existente

Cel mai des: deschizi fișierul din `src/pages/`, găsești textul în zona de HTML și îl editezi direct. Salvezi → pagina se reîncarcă în browser. Atât.

---

## 9. Stilizare și temă

### Tailwind CSS

Stilul se face în mare parte cu **clase utilitare** direct în HTML, ex:

```html
<p class="text-lg font-bold text-gray-800 mt-4">Text</p>
```

Dacă nu cunoști Tailwind, ține deschisă [documentația / cheatsheet-ul](https://tailwindcss.com/docs) și folosește extensia **Tailwind CSS IntelliSense** din VS Code — îți autocompletează clasele și îți arată ce fac.

### Culori și fonturi ale temei

Culorile temei sunt definite ca variabile CSS în **`src/components/CustomStyles.astro`**:

```css
--aw-color-primary: rgb(1 97 239);
--aw-color-secondary: rgb(1 84 207);
--aw-color-accent: rgb(109 40 217);
```

Acestea sunt mapate în `tailwind.config.js` la clase ca `text-primary`, `bg-secondary`, `text-accent`. Deci ca să schimbi culoarea principală a site-ului, **editezi variabila în `CustomStyles.astro`**, nu fiecare pagină.

Fontul implicit este **Inter** (variabil), încărcat tot din `CustomStyles.astro`.

### Temă (light/dark)

Site-ul este configurat **doar light** (`ui.theme: 'light:only'` în `src/config.yaml`). Nu te preocupa de varianta dark.

---

## 10. Verificarea codului înainte de commit

Înainte de **orice** commit/push, rulează:

```bash
npm run check
```

Asta verifică, pe rând:

1. **Astro check** — erori de tipuri și de template.
2. **ESLint** — probleme de calitate a codului.
3. **Prettier** — formatare consistentă.

Dacă pică pe ESLint sau Prettier, repară automat majoritatea problemelor cu:

```bash
npm run fix
```

Apoi rulează din nou `npm run check` ca să confirmi că totul e verde. **CI-ul (GitHub Actions) rulează exact aceste verificări** la fiecare push/PR pe `main`, plus build pe Node 18, 20 și 22 — dacă local e verde, și CI va fi.

---

## 11. Git și deploy

### Flux de lucru Git

- Branch-ul principal este **`main`**.
- Pentru o schimbare, ideal creezi un branch, faci PR către `main`. GitHub Actions rulează build + check automat.
- Mesaje de commit: proiectul folosește mesaje în limba română (vezi istoricul: „Adaugă...", „Corectare...", „UI: ...").

Exemplu complet, de la modificare până la push:

```bash
# 1. Asigură-te că pornești de la main actualizat
git checkout main
git pull

# 2. Creează și treci pe un branch nou pentru schimbarea ta
git checkout -b adauga-pagina-inscrieri

# 3. (faci modificările în cod) ... apoi verifică totul
npm run check

# 4. Vezi ce ai modificat
git status

# 5. Adaugă fișierele în stage (sau `git add .` pentru toate)
git add src/pages/inscrieri.astro src/navigation.ts

# 6. Creează commit-ul cu un mesaj descriptiv în română
git commit -m "Adaugă pagina de înscrieri și link în meniu"

# 7. Trimite branch-ul pe GitHub
#    (prima dată pe branch folosești -u ca să-l legi de remote)
git push -u origin adauga-pagina-inscrieri
```

După push, deschizi un **Pull Request** către `main` din interfața GitHub. Pentru commit-uri ulterioare pe același branch, `git push` simplu este suficient.

### Deploy

Producția (`scoalachristiana.ro`) rulează pe **[Netlify](https://www.netlify.com/)**. Deploy-ul este **automat**: după ce un PR este făcut merge în `main`, Netlify pornește singur build-ul și publică site-ul — **nu trebuie să faci deploy manual**.

Configurarea este în `netlify.toml`:

- `command = "npm run build"` — comanda de build.
- `publish = "dist"` — folderul publicat (rezultatul build-ului).

Fluxul complet al unei schimbări: **branch → PR → merge în `main` → Netlify build + deploy automat → live pe `scoalachristiana.ro`**.

> Înainte de a trimite ceva spre producție, testează local cu `npm run build && npm run preview` — vezi exact ce va construi și publica Netlify.
>
> 💡 Netlify face automat și **Deploy Previews** pentru fiecare PR (un URL temporar cu modificările tale), util pentru a verifica schimbarea înainte de merge.

---

## 12. Greșeli frecvente / depanare

| Problemă | Cauză / soluție |
|---|---|
| `npm run dev` nu pornește | Versiune greșită de Node. Verifică `node --version` față de `engines` din `package.json`. |
| Modificările nu apar în browser | Salvează fișierul; dacă tot nu apare, oprește și repornește `npm run dev`. |
| Pagina nouă dă 404 | Verifică numele/locul fișierului în `src/pages/` — el dictează URL-ul. Repornește dev serverul. |
| Link de meniu greșit | Ai folosit `getPermalink('/cale')`? Link-urile interne scrise „de mână" pot rata `base`/`trailingSlash`. |
| `npm run check` pică pe Prettier | Rulează `npm run fix`, apoi `npm run check` din nou. |
| Imaginea nu se încarcă | Din `src/assets/` se importă în cod; din `public/` se referă prin URL direct (`/images/...`). Nu le amesteca. |
| Am editat ceva în `dist/` și s-a pierdut | `dist/` e generat de build — se suprascrie. Editează în `src/`. |
| Articol nou nu apare | Verifică frontmatter-ul (titlu obligatoriu, dată validă) și că nu ai `draft: true`. |

---

## 13. De unde să înveți mai mult

- **Astro** — [docs.astro.build](https://docs.astro.build/) (citește secțiunile „Pages", „Layouts", „Content Collections").
- **Tailwind CSS** — [tailwindcss.com/docs](https://tailwindcss.com/docs).
- **MDX** — [mdxjs.com](https://mdxjs.com/).
- **AstroWind** (template-ul de bază) — [github.com/onwidget/astrowind](https://github.com/onwidget/astrowind); multe componente din `src/components/` sunt documentate acolo.

---

## Licență

[MIT](./LICENSE.md) — bazat pe template-ul [AstroWind](https://github.com/onwidget/astrowind).
