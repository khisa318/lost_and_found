import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Items from './pages/Items'
import Admin from './pages/Admin'
import About from './pages/About'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './pages/ProtectedRoute' 
import ItemsDetailPage from './pages/ItemsDetailPage'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        
        {/* FIXED: Changed <protectedRoute> to <ProtectedRoute> */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/items/:id" element={<ItemsDetailPage />} />
      </Routes>
    </div>
  )
}

export default App