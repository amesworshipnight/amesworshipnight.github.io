import { useEffect, useState } from 'react'
import { marked } from 'marked'

type Post = { slug: string, title: string }

export default function Blog(){
  const [posts, setPosts] = useState<Post[]>([{ slug: 'first-post', title: 'Bible Study — John 4:23-24' }])
  const [content, setContent] = useState<string | null>(null)

  const open = async(slug: string)=>{
    const md = await (await fetch(`/content/posts/${slug}.md`)).text()
    setContent(marked.parse(md) as string)
    window.scrollTo({top:0, behavior:'smooth'})
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <aside className="md:col-span-1 space-y-2">
        <h1 className="text-2xl font-semibold mb-2">Blog</h1>
        {posts.map(p => (
          <button key={p.slug} className="block w-full text-left rounded-xl border p-3 hover:bg-gray-50" onClick={()=>open(p.slug)}>{p.title}</button>
        ))}
      </aside>
      <section className="md:col-span-2">
        {content? (
          <article className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{__html:content}} />
        ): (
          <div className="text-gray-600">Select a post to read.</div>
        )}
      </section>
    </div>
  )
}
