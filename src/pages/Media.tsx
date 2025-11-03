// src/pages/Media.tsx
import links from '../../content/links.json'

const youtube = [
  // paste any new video links here; only the v=… or /live/… id matters
  'wxNLSpR7jj8',
  '4vTqsrgsx9s',
  '8zMOO04bVMo',
  'VfiovXILQJw',
]

export default function Media(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Media</h1>

      {/* Instagram preview + button */}
      <section className="rounded-2xl bg-white shadow p-4 border border-gray-100">
        <h2 className="font-semibold text-lg mb-2">Instagram</h2>
        <p className="text-gray-600 mb-3">Highlights, photos, and short clips from our worship nights.</p>
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="" className="w-10 h-10 rounded-full opacity-80" />
          <div>
            <div className="font-medium">@ames.worship</div>
            <div className="text-sm text-gray-500">Ames, IA • Monthly worship nights</div>
          </div>
          <a
            href={links.instagram || 'https://www.instagram.com/ames.worship/'}
            target="_blank"
            className="ml-auto inline-block bg-black text-white text-sm px-4 py-2 rounded-xl"
          >
            Open Instagram
          </a>
        </div>
      </section>

      {/* YouTube video grid */}
      <section className="rounded-2xl bg-white shadow p-4 border border-gray-100">
        <h2 className="font-semibold text-lg mb-4">Worship Night Videos</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {youtube.map((id) => (
            <div key={id} className="aspect-video rounded-xl overflow-hidden border">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Want your video here? Send us the YouTube link and we’ll add it.
        </p>
      </section>
    </div>
  )
}
