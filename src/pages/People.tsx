import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

export default function People(){
  const [profiles,setProfiles] = useState<any[]>([])
  useEffect(()=>{(async()=>{
    const { data } = await supabase.from('profiles').select('id, full_name, role, avatar_url').order('full_name')
    setProfiles(data ?? [])
  })()},[])
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">People</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {profiles.map(p=> (
          <Card key={p.id}>
            <div className="flex items-center gap-3">
              <img src={p.avatar_url ?? 'https://placehold.co/64x64'} className="w-12 h-12 rounded-full"/>
              <div>
                <div className="font-medium">{p.full_name ?? 'Unnamed'}</div>
                <div className="text-gray-600 text-sm">{p.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
