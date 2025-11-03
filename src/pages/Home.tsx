import links from '../../content/links.json'
import schedule from '../../content/schedule.json'

export default function Home(){
  const next = schedule.upcoming?.[0]
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white shadow p-6 border border-gray-100">
        <h1 className="text-3xl font-semibold mb-2">Welcome to Ames Worship Night</h1>
        <p className="text-gray-600">We gather monthly in Ames, IA to worship Jesus with one heart and one voice.</p>
      </section>

      {next && (
        <section className="rounded-2xl bg-white shadow p-6 border border-gray-100">
          <div className="text-sm uppercase text-gray-500">Next Worship Night</div>
          <div className="text-xl font-medium">{next.title}</div>
          <div className="text-gray-600">{new Date(next.date).toLocaleString()} · {next.location}</div>
        </section>
      )}

      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Follow us</h2>
          <ul className="list-disc pl-5 text-blue-600">
            <li><a href={links.instagram} target="_blank">Instagram</a></li>
            <li><a href={links.youtube} target="_blank">YouTube</a></li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">What to expect</h2>
          <p className="text-gray-600">Prayer, scripture, and extended worship—leaving room for the Holy Spirit to move.</p>
        </div>
      </section>
    </div>
  )
}
