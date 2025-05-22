import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

export default function PrivateRoute() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
