# Ames Worship Night — Public Site (No Auth)

**Purpose:** A clean public website at `amesworshipnight.github.io` with no login. Content is stored in `/content` so you can edit it in GitHub. Team submissions use Google Forms (links in `content/links.json`).

## Deploy on GitHub Pages
1) Create repo **amesworshipnight.github.io**.
2) Upload this project and commit to **main**.
3) GitHub Actions will build and deploy automatically (workflow included).

## Edit Content
- `content/schedule.json` → upcoming events.
- `content/about.md` → About page.
- `content/posts/*.md` → Blog posts (add more files, then list them in `Blog` page).
- `content/links.json` → Instagram/YouTube/Contact + Google Forms links.

## Local dev
```bash
npm i
npm run dev
```
