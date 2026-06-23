import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const isLoggedIn = !!localStorage.getItem('adminToken');
  // Check if the admin token exists in localStorage
  const isUserLoggedIn = !!localStorage.getItem('userToken');
  // Updated colors to match the earthy brown/cream palette
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 ${isActive
      ? 'bg-[#2d1e13] text-[#fbf6ef]'
      : 'text-[#5c4a3d] hover:bg-[#eaddcf] hover:text-[#2d1e13]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-[#c1a084]/30 bg-[#fbf6ef]/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

        {/* Logo Section: Styled as a branded mark */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#2d1e13] flex items-center justify-center text-[#fbf6ef] font-bold text-xs">
            L&F
          </div>
          <span className="font-bold text-xl tracking-tight text-[#2d1e13]">
            Lost&Found
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/items" className={linkClass}>
            Items
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to={isLoggedIn ? "/admin-dashboard" : "/admin"} className={linkClass}>
            Admin
          </NavLink>
          {isUserLoggedIn ? (
            <NavLink to="/user-dashboard" className={linkClass}>My Dashboard</NavLink>
          ) : (
            <NavLink to="/login" className={linkClass}>Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar