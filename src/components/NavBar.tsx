import { NavLink } from 'react-router-dom'
import { supabase } from '../lib/supabase'
export default function NavBar() {
  const link = ({isActive}:{isActive:boolean}) => (isActive ? 'font-semibold' : '')
  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <NavLink to="/" className="font-semibold">Ames Worship Night</NavLink>
        <nav className="flex items-center gap-3 text-sm">
          <NavLink to="/schedule" className={link}>Schedule</NavLink>
          <NavLink to="/songs" className={link}>Songs</NavLink>
          <NavLink to="/people" className={link}>People</NavLink>
          <NavLink to="/posts" className={link}>Posts</NavLink>
          <NavLink to="/admin" className={link}>Admin</NavLink>
        </nav>
        <div className="ml-auto">
          <button onClick={()=>supabase.auth.signOut()} className="text-sm text-gray-600">Sign out</button>
        </div>
      </div>
    </div>
  )
}
