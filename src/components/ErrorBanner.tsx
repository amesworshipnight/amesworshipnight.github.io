export default function ErrorBanner({ msg }: { msg: string }){
  return (
    <div style={{background:'#fee2e2', color:'#7f1d1d', padding:'12px 16px', borderRadius:12, border:'1px solid #fecaca', margin:'12px 0'}}>
      <strong>Configuration error:</strong> {msg}
    </div>
  )
}
