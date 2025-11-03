import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import Songs from './pages/Songs'
import People from './pages/People'
import Posts from './pages/Posts'
import Admin from './pages/Admin'
import Guard from './components/Guard'
import './styles.css'

export default function App(){
  return (
    <HashRouter>
      <Guard>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/schedule" element={<Schedule/>} />
            <Route path="/songs" element={<Songs/>} />
            <Route path="/people" element={<People/>} />
            <Route path="/posts" element={<Posts/>} />
            <Route path="/admin" element={<Admin/>} />
          </Routes>
        </div>
      </Guard>
    </HashRouter>
  )
}
