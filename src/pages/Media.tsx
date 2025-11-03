import links from '../../content/links.json'

export default function Media(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Media</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white shadow p-4 border border-gray-100">
          <h2 className="font-semibold mb-2">Instagram</h2>
          <p className="text-gray-600">We’ll embed highlights here. For now, visit our Instagram.</p>
          <a href={links.instagram} target="_blank" className="text-blue-600 underline">Open Instagram</a>
        </div>
        <div className="rounded-2xl bg-white shadow p-4 border border-gray-100">
          <h2 className="font-semibold mb-2">YouTube</h2>
          <p className="text-gray-600">Watch songs and testimonies on our channel.</p>
          <a href={links.youtube} target="_blank" className="text-blue-600 underline">Open YouTube</a>
        </div>
      </div>
    </div>
  )
}
