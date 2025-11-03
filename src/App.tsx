import { HashRouter, Routes, Route } from 'react-router-dom'
import SiteShell from './components/SiteShell'
import Home from './pages/Home'
import About from './pages/About'
import Schedule from './pages/Schedule'
import Media from './pages/Media'
import Blog from './pages/Blog'
import Team from './pages/Team'
import Contact from './pages/Contact'
import './styles.css'

export default function App(){
  return (
    <HashRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/media" element={<Media/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </SiteShell>
    </HashRouter>
  )
}
