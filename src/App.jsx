import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Tutorial from './pages/Tutorial'
import Scan from './pages/Scan'
import Maps from './pages/Maps'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/maps" element={<Maps />} />
      </Routes>
    </div>
  )
}

export default App
