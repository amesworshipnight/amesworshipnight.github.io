import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Loading from './Loading'

export default function Guard({ children }: { children: JSX.Element }) {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); setReady(true) })
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null))
    return () => { listener.subscription.unsubscribe() }
  }, [])

  if (!ready) return <Loading />
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
