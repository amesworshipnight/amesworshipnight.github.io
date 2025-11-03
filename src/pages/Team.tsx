// src/pages/Team.tsx
import links from '../../content/links.json'

export default function Team(){
  const f = links.forms
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Team Portal</h1>
      <p className="text-gray-600">Use these quick forms to submit updates—no login needed.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          href={f.availability}
          title="Availability (next 3 months)"
          helper="Pick the dates you can serve. Update anytime if things change."
        />
        <Card
          href={f.lyrics}
          title="Lyrics & Song Links"
          helper="Add song title, key (if known), plus YouTube/Spotify links."
        />
        <Card
          href={f.finances}
          title="Finance Log"
          helper="Offerings & expenses. Attach receipt links if available (Drive/Dropbox)."
        />
        <Card
          href={f.attendance}
          title="Attendance"
          helper="Leaders: capture team + attendee counts after each night."
        />
      </div>

      <div className="text-sm text-gray-500">
        Tip: In Google Forms → Settings → Presentation → Confirmation message, add a link back to this site (e.g.
        “Thanks! Return to <a class='underline' href='https://amesworshipnight.github.io/#/team'>Team Portal</a>”).
      </div>
    </div>
  )
}

function Card({ href, title, helper }:{ href?: string, title: string, helper: string }){
  if (!href) return (
    <div className="rounded-2xl bg-white shadow p-4 border border-gray-100 opacity-60">
      <div className="font-medium">{title}</div>
      <div className="text-gray-600 text-sm">{helper}</div>
      <div className="text-xs text-red-600 mt-1">Missing link — set it in <code>content/links.json</code></div>
    </div>
  )
  return (
    <a className="rounded-2xl bg-white shadow p-4 border border-gray-100 block hover:shadow-md transition"
       target="_blank" href={href}>
      <div className="font-medium">{title}</div>
      <div className="text-gray-600 text-sm">{helper}</div>
    </a>
  )
}
