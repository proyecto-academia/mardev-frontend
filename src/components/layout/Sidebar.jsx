import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const activeClass = 'text-blue-600 font-semibold'
  const baseClass = 'block px-4 py-2 hover:bg-gray-100 rounded transition-colors'

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm p-4">
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-gray-700'}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-gray-700'}`}
        >
          Courses
        </NavLink>
        <NavLink
          to="/classes"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-gray-700'}`}
        >
          Classes
        </NavLink>
        <NavLink
          to="/packs"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-gray-700'}`}
        >
          Packs
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-gray-700'}`}
        >
          My Profile
        </NavLink>
      </nav>
    </aside>
  )
}
