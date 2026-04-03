# Școala Gimnazială Christiana

Site-ul oficial al **Școlii Gimnaziale Christiana** din Cluj-Napoca, portat de pe WordPress pe [Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/).

🌐 **[scoalachristiana.ro](https://scoalachristiana.ro)**

## Despre școală

Școala Gimnazială Christiana din Cluj-Napoca derulează programul de învățământ **„A Doua Șansă"**, destinat persoanelor care nu și-au finalizat educația de bază la nivel primar și gimnazial.

## Tehnologii

- [Astro 5](https://astro.build/) — framework static site
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [AstroWind](https://github.com/onwidget/astrowind) — template de bază
- [MDX](https://mdxjs.com/) — pentru articole/noutăți

## Dezvoltare locală

```bash
# Instalare dependențe
npm install

# Server de dezvoltare
npm run dev

# Build producție
npm run build

# Preview build
npm run preview

# Verificare cod
npm run check
```

## Structura proiectului

```
src/
├── components/     # Componente Astro reutilizabile
├── data/post/      # Articole/noutăți (Markdown)
├── layouts/        # Layout-uri de pagină
├── pages/          # Pagini site
│   ├── cursanti/   # Pagini pentru cursanți (orar, structura an școlar etc.)
│   └── documente/  # Documente oficiale
├── assets/         # Imagini și resurse procesate
└── navigation.ts   # Configurare meniuri
public/
└── images/         # Imagini statice
```

## Licență

[MIT](./LICENSE.md) — bazat pe template-ul [AstroWind](https://github.com/onwidget/astrowind).
