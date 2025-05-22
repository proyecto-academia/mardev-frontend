import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import PublicLayout from '../layouts/PublicLayout'
import PrivateLayout from '../layouts/PrivateLayout'

// Pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CourseList from '../pages/courses/CourseList'
import CourseDetail from '../pages/courses/CourseDetail'
import ClassList from '../pages/classes/ClassList'
import ClassDetail from '../pages/classes/ClassDetail'

// Helpers
import PrivateRoute from './PrivateRoutes'

export default function AppRoutes() {
  const user = useAuthStore((state) => state.user)

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/classes" element={<ClassList />} />
            <Route path="/classes/:id" element={<ClassDetail />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
