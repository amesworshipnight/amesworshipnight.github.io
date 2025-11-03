import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type Song = { id: string; title: string; default_key: string | null; bpm: number | null }

export default function Songs(){
  const [songs,setSongs] = useState<Song[]>([])
  const [q,setQ] = useState('')
  const [form,setForm] = useState({ title:'', default_key:'C', bpm:120 })

  const load = async()=>{
    let query = supabase.from('songs').select('*').order('created_at', { ascending: false })
    if(q) query = query.ilike('title', `%${q}%`)
    const { data } = await query
    setSongs((data ?? []) as Song[])
  }
  useEffect(()=>{ load() },[q])

  const add = async (e:any)=>{
    e.preventDefault()
    const { error } = await supabase.from('songs').insert(form as any)
    if(error) alert(error.message); else { setForm({ title:'', default_key:'C', bpm:120 }); load() }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Songs</h1>

      <Card>
        <div className="flex gap-3 items-center">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search songs…" className="border rounded-xl p-3 flex-1" />
        </div>
      </Card>

      <Card>
        <form onSubmit={add} className="grid md:grid-cols-3 gap-3">
          <input className="border rounded-xl p-3" placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title:e.target.value })} required />
          <input className="border rounded-xl p-3" placeholder="Default key" value={form.default_key} onChange={e=>setForm({ ...form, default_key:e.target.value })} />
          <input className="border rounded-xl p-3" type="number" placeholder="BPM" value={form.bpm} onChange={e=>setForm({ ...form, bpm: Number(e.target.value) })} />
          <button className="bg-black text-white rounded-xl px-4 py-2">Add Song</button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 gap-3">
        {songs.map(s=> (
          <Card key={s.id}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-gray-600 text-sm">Key: {s.default_key ?? '—'} · BPM: {s.bpm ?? '—'}</div>
              </div>
              <button className="text-red-600 text-sm" onClick={async()=>{ await supabase.from('songs').delete().eq('id', s.id); load() }}>Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
