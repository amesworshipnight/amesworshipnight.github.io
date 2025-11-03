import Card from '../components/Card'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin(){
  const [me,setMe] = useState<any>(null)
  useEffect(()=>{(async()=>{
    const { data } = await supabase.auth.getUser()
    const uid = data.user?.id
    if(!uid) return
    const { data: prof } = await supabase.from('profiles').select('*').eq('id', uid).single()
    setMe(prof)
  })()},[])

  async function setRole(role:string){
    const { data } = await supabase.auth.getUser(); const uid = data.user?.id
    if(!uid) return
    const { error } = await supabase.from('profiles').upsert({ id: uid, role })
    if(error) alert(error.message); else alert('Role updated to '+role)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <Card>
        <div className="space-y-3">
          <div>Your role: <span className="font-medium">{me?.role ?? '—'}</span></div>
          <div className="text-sm text-gray-600">(For first-time setup you may manually set yourself as ADMIN)</div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl border" onClick={()=>setRole('ADMIN')}>Make me ADMIN</button>
            <button className="px-3 py-2 rounded-xl border" onClick={()=>setRole('LEADER')}>Make me LEADER</button>
            <button className="px-3 py-2 rounded-xl border" onClick={()=>setRole('MEMBER')}>Make me MEMBER</button>
          </div>
        </div>
      </Card>
    </div>
  )
}
