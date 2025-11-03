# Ames Worship Night (GitHub Pages + Supabase)

A static front end hosted on **GitHub Pages** with a hosted backend on **Supabase** (Auth, Postgres, Storage). Built with **Vite + React + Tailwind**. Ready for **Codespaces**.

## One-time Setup

1. **Create a repository** named `amesworshipnight.github.io` under your account/organization.
2. **Open in Codespaces**, upload this project, and run:
   ```bash
   npm i
   npm run dev
   ```
3. **Create a Supabase project** at https://supabase.com → copy Project URL and anon key.
4. In Supabase → **SQL Editor**, run the contents of `schema.sql` (included).
5. In Supabase → **Storage**, create a bucket named `media` (private).
6. In Supabase → **Authentication → URL Configuration → Redirect URLs**, add:
   - `https://amesworshipnight.github.io/`
   - `https://amesworshipnight.github.io/#/`
   - `http://localhost:5173/`
7. In GitHub → **Settings → Secrets and variables → Actions** set:
   - **Variables**: `VITE_SUPABASE_URL = https://YOUR-PROJECT.supabase.co`
   - **Secrets**:   `VITE_SUPABASE_ANON_KEY = <your anon public key>`
8. Commit & push to `main`. Pages deploys automatically via **.github/workflows/pages.yml**.
9. Enable **Settings → Pages → Source: GitHub Actions** if prompted.

## Local Dev
```bash
npm i
VITE_SUPABASE_URL=... VITE_SUPABASE_ANON_KEY=... npm run dev
```

## Notes
- Routing uses **HashRouter** so refreshes work on GitHub Pages.
- Tables are protected with **Row Level Security**; only authenticated users can read non-public data.
- Extend with: Setlist builder, Assignments, public highlights, uploads to `media` via signed URLs.
