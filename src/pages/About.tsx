import { useMarkdown } from '../lib/useMarkdown'

export default function About(){
  const html = useMarkdown('/content/about.md')
  return (
    <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
