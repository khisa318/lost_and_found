import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-lg tracking-tight text-gray-900">
          Lost&Found
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/items" className={linkClass}>
            Items
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
