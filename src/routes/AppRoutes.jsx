import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import PrivateLayout from '../layouts/PrivateLayout'

// Pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CourseList from '../pages/courses/CourseList'
import CourseDetail from '../pages/courses/CourseDetail'
import ClassDetail from '../pages/classes/ClassDetail'
import Profile from '../pages/Profile'

// Helpers
import PrivateRoute from './PrivateRoutes'
import NecessaryEnrollmentRoutes from './NecessaryEnrollmentRoutes'
import CourseBuy from '../pages/courses/CourseBuy'

export default function AppRoutes() {
  // const user = useAuthStore((state) => state.user)

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/buy/:id" element={<CourseBuy />} />
            <Route element={<NecessaryEnrollmentRoutes/>} >
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/courses/:id/classes/:classId" element={<ClassDetail />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
