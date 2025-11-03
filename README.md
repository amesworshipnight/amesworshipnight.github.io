# Ames Worship Night (Fixed Build)
This version adds **@vitejs/plugin-react** so Vite can compile React. Follow the same setup steps as before (Supabase URL/Key, SQL schema, Pages deploy).


## Magic Link Notes
- This build handles Supabase's `token_hash` flow automatically. We store your email locally when you click **Send magic link**, then verify it after redirect using `supabase.auth.verifyOtp`.
- Ensure Supabase Auth → Redirect URLs include:
  - `https://amesworshipnight.github.io/`
  - `https://amesworshipnight.github.io/#/`
  - `http://localhost:5173/`
