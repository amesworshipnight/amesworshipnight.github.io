// src/pages/Schedule.tsx
import { useEffect, useState } from 'react'
import scheduleLocal from '../../content/schedule.json'
import source from '../../content/schedule-source.json'

type Event = { title: string; date: string; location?: string }

export default function Schedule(){
  const [items, setItems] = useState<Event[] | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        if (!source.csvUrl) throw new Error('No CSV url')
        const csv = await (await fetch(source.csvUrl, { cache: 'no-store' })).text()
        const rows = csv.trim().split(/\r?\n/)
        const header = rows.shift()?.split(',').map(s => s.trim().toLowerCase()) || []
        const iTitle = header.indexOf('title')
        const iDate = header.indexOf('date')
        const iLoc = header.indexOf('location')
        const parsed: Event[] = rows.map(r => {
          const cols = r.split(',')
          return {
            title: cols[iTitle]?.trim() || '',
            date: cols[iDate]?.trim() || '',
            location: cols[iLoc]?.trim(),
          }
        }).filter(x => x.title && x.date)
        if (!cancelled) setItems(parsed)
      } catch {
        // fallback
        setItems(scheduleLocal.upcoming || [])
      }
    })()
    return () => { cancelled = true }
  }, [])

  const data = items || []

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Schedule</h1>
      <div className="grid gap-3">
        {data.map((ev, i)=> (
          <div key={i} className="rounded-2xl bg-white shadow p-4 border border-gray-100">
            <div className="font-medium">{ev.title}</div>
            <div className="text-gray-600">
              {new Date(ev.date).toLocaleString()} {ev.location ? `· ${ev.location}` : ''}
            </div>
          </div>
        ))}
        {data.length === 0 && <div className="text-gray-600">No upcoming items yet.</div>}
      </div>
      <p className="text-xs text-gray-500">
        This list is synced from a Google Sheet. Update the sheet to change this page.
      </p>
    </div>
  )
}
