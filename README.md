# Muhammad Zakee Qureshi — Portfolio

A clean, minimalist portfolio site (inspired by mehdio.com) with Home, Projects, About, and
Contact Me pages, light/dark mode, and a downloadable one-page resume. Plain HTML/CSS/JS —
no build step, no dependencies.

## Structure

```
PortfolioWebsite/
├── index.html        Home
├── projects.html      Projects
├── about.html         About (experience, education, skills)
├── contact.html        Contact Me
├── css/style.css       All styling (theme tokens for light/dark mode)
├── js/script.js        Theme toggle, mobile nav, contact form
├── assets/
│   ├── profile.png      Circular profile photo (transparent corners)
│   └── resume.pdf        One-page downloadable resume
└── vercel.json          Clean URLs config
```

## Running locally

No build tools needed. From this folder, run any static file server, e.g.:

```bash
python -m http.server 8080
```

Then open http://localhost:8080 in a browser.

## Deploying to Vercel

**Option A — GitHub + Vercel (recommended, no local Node needed):**

1. Create a new GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repo.
3. Framework preset: choose **"Other"** (it's a static site, no build command needed).
4. Click **Deploy**. Vercel will serve the files as-is.

**Option B — Vercel CLI** (requires Node.js installed):
```bash
npm i -g vercel
vercel
```

## Updating content later

- **Resume PDF**: replace `assets/resume.pdf` with a new export any time — the download
  button always points to that file.
- **Profile photo**: replace `assets/profile.png` (keep it square; it's clipped into a
  circle automatically).
- **Projects / experience text**: edit directly in `projects.html` / `about.html` — each
  project/role is a self-contained HTML block, easy to copy-paste and edit.
- **Colors**: all colors are CSS variables at the top of `css/style.css` under `:root` and
  `:root[data-theme="dark"]`.
