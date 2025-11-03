import Card from '../components/Card'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard(){
  const [nextEvent, setNextEvent] = useState<any>(null)
  useEffect(()=>{(async()=>{
    const { data } = await supabase.from('events').select('*').gte('start_at', new Date().toISOString()).order('start_at').limit(1)
    setNextEvent(data?.[0] ?? null)
  })()},[])
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Card>
        {nextEvent? (
          <div>
            <div className="text-lg font-medium">Next Worship Night</div>
            <div className="text-gray-600">{new Date(nextEvent.start_at).toLocaleString()} · {nextEvent.location ?? 'TBD'}</div>
          </div>
        ) : <div>No upcoming event yet.</div>}
      </Card>
    </div>
  )
}
