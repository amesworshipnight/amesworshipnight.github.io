// src/pages/Gallery.tsx
// Auto-import every image in src/gallery (jpg/png/webp)
const images = import.meta.glob('/src/gallery/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }) as Record<string, string>

export default function Gallery(){
  const items = Object.entries(images).map(([path, url]) => ({ path, url }))
  // Newest first by filename (you can rename files to control order)
  items.sort((a, b) => b.path.localeCompare(a.path))
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Photo Gallery</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(({ path, url }) => (
          <a key={path} href={url} target="_blank" className="block rounded-xl overflow-hidden border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-48 object-cover" />
          </a>
        ))}
      </div>
      {items.length === 0 && <div className="text-gray-600">Drop images into <code>src/gallery/</code> and commit.</div>}
    </div>
  )
}
