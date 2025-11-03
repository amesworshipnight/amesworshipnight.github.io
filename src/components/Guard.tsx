import { useEffect, useState } from 'react'
import { supabase, SUPABASE_URL, SUPABASE_ANON } from '../lib/supabase'
import Loading from './Loading'
import ErrorBanner from './ErrorBanner'
import { envIssue } from '../lib/envGuard'

function getParamFromUrl(name: string) {
  const fromSearch = new URLSearchParams(window.location.search).get(name)
  if (fromSearch) return fromSearch
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
  return new URLSearchParams(hash).get(name)
}

async function maybeVerifyMagicLink() {
  const token_hash = getParamFromUrl('token_hash')
  const type = getParamFromUrl('type')
  if (token_hash && SUPABASE_URL && SUPABASE_ANON) {
    const email = localStorage.getItem('otp_email') || undefined
    try {
      await supabase.auth.verifyOtp({ type: (type as any) || 'magiclink', token_hash, email })
      const url = new URL(window.location.href)
      url.searchParams.delete('token_hash'); url.searchParams.delete('type')
      window.history.replaceState({}, '', url.origin + url.pathname + '#/')
    } catch (e) {
      console.error('verifyOtp error', e)
    }
  }
}

export default function Guard({ children }: { children: JSX.Element }) {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<any>(null)
  const issue = envIssue()

  useEffect(() => {
    (async () => {
      if (!issue) {
        await maybeVerifyMagicLink()
        const { data } = await supabase.auth.getUser()
        setUser(data.user)
      }
      setReady(true)
    })()
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null))
    return () => { listener.subscription.unsubscribe() }
  }, [])

  if (!ready) return <Loading />
  if (issue) return <div className="p-6 max-w-xl mx-auto"><ErrorBanner msg={issue} /></div>
  if (!user) return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Sign in required</h1>
      <p className="mb-4">Use your email to receive a magic link.</p>
      <LoginForm />
    </div>
  )
  return children
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <form onSubmit={async e => {
      e.preventDefault()
      localStorage.setItem('otp_email', email)
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + '/#/' } })
      if (!error) setSent(true)
      else alert(error.message)
    }} className="space-y-3">
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@example.com" className="w-full border rounded-xl p-3" />
      <button className="px-4 py-2 rounded-xl bg-black text-white">Send magic link</button>
      {sent && <p className="text-green-600">Check your inbox!</p>}
    </form>
  )
}
