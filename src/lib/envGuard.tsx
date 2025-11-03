export function envIssue(): string | null {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  if (!url || !anon) return 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in GitHub → Settings → Secrets and variables → Actions.'
  try {
    const u = new URL(url) // throws if invalid
    if (!u.hostname.endsWith('.supabase.co')) return 'VITE_SUPABASE_URL does not look like a Supabase URL.'
  } catch {
    return 'VITE_SUPABASE_URL is not a valid URL.'
  }
  return null
}
