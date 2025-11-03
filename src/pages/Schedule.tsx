import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

export default function Schedule(){
  const [events, setEvents] = useState<any[]>([])
  const [form, setForm] = useState({ title: '', start_at: '', location: '' })
  const load = async()=>{
    const { data } = await supabase.from('events').select('*').order('start_at', { ascending: true })
    setEvents(data ?? [])
  }
  useEffect(()=>{ load() },[])

  const add = async (e:any)=>{
    e.preventDefault()
    const { error } = await supabase.from('events').insert({ ...form, start_at: new Date(form.start_at).toISOString(), status: 'published' })
    if(error) alert(error.message); else { setForm({ title:'', start_at:'', location:''}); load() }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Schedule</h1>
      <Card>
        <form onSubmit={add} className="grid md:grid-cols-3 gap-3">
          <input className="border rounded-xl p-3" placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} required />
          <input className="border rounded-xl p-3" type="datetime-local" value={form.start_at} onChange={e=>setForm({ ...form, start_at: e.target.value })} required />
          <input className="border rounded-xl p-3" placeholder="Location" value={form.location} onChange={e=>setForm({ ...form, location: e.target.value })} />
          <button className="bg-black text-white rounded-xl px-4 py-2">Add Event</button>
        </form>
      </Card>

      <div className="grid gap-3">
        {events.map(ev=> (
          <Card key={ev.id}>
            <div className="flex items-center gap-4">
              <div className="font-medium">{ev.title}</div>
              <div className="text-gray-600">{new Date(ev.start_at).toLocaleString()}</div>
              <div className="text-gray-600">{ev.location}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
