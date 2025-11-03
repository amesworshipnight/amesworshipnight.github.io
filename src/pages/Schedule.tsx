import schedule from '../../content/schedule.json'

export default function Schedule(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Schedule</h1>
      <div className="grid gap-3">
        {schedule.upcoming.map((ev, i)=> (
          <div key={i} className="rounded-2xl bg-white shadow p-4 border border-gray-100">
            <div className="font-medium">{ev.title}</div>
            <div className="text-gray-600">{new Date(ev.date).toLocaleString()} · {ev.location}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
