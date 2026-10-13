# Parth Ganeriwala | Portfolio

Personal site at [parthganeriwala.com](https://parthganeriwala.com), built with Next.js (Pages Router), Tailwind CSS and `next-themes` (light/dark), exported as a static site and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## How it is deployed

- Pushes to `master` run `.github/workflows/deploy.yml`, which builds the site (`next build` writes `./out`) and publishes it to GitHub Pages.
- The CV PDFs are not edited by hand. Every push to `main` in the [Resume](https://github.com/ParthGaneriwala/Resume) repo triggers `.github/workflows/update_resume_pdf.yml` here, which compiles both CVs and commits `public/parth_resume.pdf` (industry) and `public/parth_cv_academic.pdf` (academic).

## Where things live

- `pages/index.js`: all page content (hero, about, experience, skills, projects, publications, contact).
- `components/`: shared UI and the skill/social icons.
- `public/`: images (WebP where possible), CV PDFs, `sitemap.xml`, `robots.txt`, `og-image.jpg`.
