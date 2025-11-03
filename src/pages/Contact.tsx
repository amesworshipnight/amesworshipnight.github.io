import links from '../../content/links.json'
export default function Contact(){
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="text-gray-600">Email us at <a href={`mailto:${links.contactEmail}`} className="text-blue-600 underline">{links.contactEmail}</a></p>
    </div>
  )
}
