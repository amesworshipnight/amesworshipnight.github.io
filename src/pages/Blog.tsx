// src/pages/Blog.tsx
import { useMemo, useState } from 'react'

// Grab all markdown files from /content/posts at build time.
// Vite will inline them (no network fetch needed).
const files = import.meta.glob('/content/posts/*.md', { eager: true, as: 'raw' }) as Record<string, string>

type PostMeta = { slug: string; title: string; date?: string }

function parseTitle(md: string) {
  // first H1 line becomes title; optional date from filename prefix
  const lines = md.split(/\r?\n/)
  const h1 = lines.find(l => /^#\s+/.test(l))?.replace(/^#\s+/, '').trim() || 'Untitled'
  return h1
}

function slugFromPath(path: string) {
  // "/content/posts/2025-12-14-hope.md" -> "2025-12-14-hope"
  return path.replace(/^.*\/|\.md$/g, '')
}

export default function Blog() {
  const posts = useMemo<PostMeta[]>(() => {
    const items: PostMeta[] = Object.entries(files).map(([path, md]) => {
      const slug = slugFromPath(path)
      const title = parseTitle(md)
      // date prefix if present (YYYY-MM-DD-*)
      const m = slug.match(/^(\d{4}-\d{2}-\d{2})-/)
      const date = m ? m[1] : undefined
      return { slug, title, date }
    })
    // sort by date if present, otherwise by slug desc
    items.sort((a, b) => (b.date || b.slug).localeCompare(a.date || a.slug))
    return items
  }, [])

  const [activeSlug, setActiveSlug] = useState<string | null>(posts[0]?.slug ?? null)
  const activeMd = useMemo(() => (activeSlug ? files[`/content/posts/${activeSlug}.md`] : null), [activeSlug])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <aside className="md:col-span-1 space-y-2">
        <h1 className="text-2xl font-semibold mb-2">Blog</h1>
        {posts.map(p => (
          <button
            key={p.slug}
            className={`block w-full text-left rounded-xl border p-3 hover:bg-gray-50 ${activeSlug===p.slug?'border-black':''}`}
            onClick={() => setActiveSlug(p.slug)}
          >
            <div className="font-medium">{p.title}</div>
            {p.date && <div className="text-xs text-gray-500">{p.date}</div>}
          </button>
        ))}
        {posts.length === 0 && <div className="text-gray-600">No posts yet. Add a .md file in /content/posts/</div>}
      </aside>

      <section className="md:col-span-2">
        {activeMd ? (
          // minimal markdown rendering: we keep it simple (headings, paragraphs)
          // You can switch to "marked" later if you want full markdown features
          <article className="whitespace-pre-wrap leading-7">{activeMd}</article>
        ) : (
          <div className="text-gray-600">Select a post to read.</div>
        )}
      </section>
    </div>
  )
}
