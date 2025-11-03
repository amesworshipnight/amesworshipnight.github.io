import { useEffect, useState } from 'react'
import { marked } from 'marked'

export function useMarkdown(path: string){
  const [html, setHtml] = useState<string>('')
  useEffect(()=>{
    fetch(path).then(r=>r.text()).then(md=> setHtml(marked.parse(md) as string))
  }, [path])
  return html
}
