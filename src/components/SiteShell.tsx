import { NavLink } from 'react-router-dom'

export default function SiteShell({ children }: { children: React.ReactNode }){
  const link = ({isActive}:{isActive:boolean}) => (isActive ? 'font-semibold underline' : '')
  return (
    <div>
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
          <NavLink to="/" className="font-semibold">Ames Worship Night</NavLink>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/about" className={link}>About</NavLink>
            <NavLink to="/schedule" className={link}>Schedule</NavLink>
            <NavLink to="/media" className={link}>Media</NavLink>
            <NavLink to="/blog" className={link}>Blog</NavLink>
            <NavLink to="/team" className={link}>Team</NavLink>
            <NavLink to="/contact" className={link}>Contact</NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
      <footer className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Ames Worship Night
      </footer>
    </div>
  )
}
