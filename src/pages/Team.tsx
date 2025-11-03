import links from '../../content/links.json'

export default function Team(){
  const f = links.forms
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Team Portal</h1>
      <p className="text-gray-600">No login needed right now. Use the forms below to submit updates.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <a className="rounded-2xl bg-white shadow p-4 border border-gray-100 block" target="_blank" href={f.availability}>
          <div className="font-medium">Availability (next 3 months)</div>
          <div className="text-gray-600 text-sm">Tell us when you can serve.</div>
        </a>
        <a className="rounded-2xl bg-white shadow p-4 border border-gray-100 block" target="_blank" href={f.lyrics}>
          <div className="font-medium">Lyrics & Song Links</div>
          <div className="text-gray-600 text-sm">Submit titles, YouTube/Spotify links, and notes.</div>
        </a>
        <a className="rounded-2xl bg-white shadow p-4 border border-gray-100 block" target="_blank" href={f.finances}>
          <div className="font-medium">Finance Log</div>
          <div className="text-gray-600 text-sm">Offerings, expenses, receipts.</div>
        </a>
        <a className="rounded-2xl bg-white shadow p-4 border border-gray-100 block" target="_blank" href={f.attendance}>
          <div className="font-medium">Attendance</div>
          <div className="text-gray-600 text-sm">Capture attendees & newcomers.</div>
        </a>
      </div>
      <p className="text-sm text-gray-500">Form responses go to your Google Sheets. Later, we can add a secure admin view.</p>
    </div>
  )
}
