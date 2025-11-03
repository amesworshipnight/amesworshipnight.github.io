# Ames Worship Night (Robust Pages Build)

This build adds:
- Correct, expanded GitHub Pages workflow
- Fail-fast env checks in CI
- In-app guard that shows a **red banner** if `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are missing/invalid
- Proper magic-link verification for Supabase

## Deploy
1) Set repo Variables/Secrets for Supabase (URL, anon key).
2) Commit to main; Actions will build and deploy.
3) If the site shows a red configuration banner, fix the envs in GitHub → Actions Variables/Secrets and redeploy.
