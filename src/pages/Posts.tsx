import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

export default function Posts(){
  const [posts,setPosts] = useState<any[]>([])
  const [form,setForm] = useState({ title:'', body_md:'' })
  const load = async()=>{
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data ?? [])
  }
  useEffect(()=>{ load() },[])

  const add = async(e:any)=>{
    e.preventDefault()
    const { error } = await supabase.from('posts').insert({ ...form, published_at: new Date().toISOString() })
    if(error) alert(error.message); else { setForm({ title:'', body_md:'' }); load() }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Leader Posts</h1>
      <Card>
        <form onSubmit={add} className="space-y-3">
          <input className="w-full border rounded-xl p-3" placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title:e.target.value })} required />
          <textarea className="w-full border rounded-xl p-3 h-32" placeholder="Markdown body…" value={form.body_md} onChange={e=>setForm({ ...form, body_md:e.target.value })}></textarea>
          <button className="bg-black text-white rounded-xl px-4 py-2">Publish</button>
        </form>
      </Card>
      <div className="grid gap-3">
        {posts.map(p=> (
          <Card key={p.id}>
            <div className="font-medium text-lg">{p.title}</div>
            <div className="text-gray-500 text-sm">{new Date(p.published_at ?? p.created_at).toLocaleString()}</div>
            <pre className="whitespace-pre-wrap text-sm mt-2">{p.body_md}</pre>
          </Card>
        ))}
      </div>
    </div>
  )
}
