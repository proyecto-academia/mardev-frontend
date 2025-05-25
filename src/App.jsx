import { useEffect } from 'react'
import { useAuthStore } from './stores/useAuthStore'
import AppRoutes from './routes/AppRoutes'
import { useAvailableContentStore } from './stores/useAvailableContentStore'

function App() {
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage)
  const fetchAvailableCourses = useAvailableContentStore((state) => state.fetchAvailableCourses)

  useEffect(() => {
    loadUserFromStorage()
    fetchAvailableCourses()
  }, [loadUserFromStorage, fetchAvailableCourses])

  return <AppRoutes />
}

export default App
