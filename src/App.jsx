import { useEffect } from 'react'
import { useAuthStore } from './stores/useAuthStore'
import AppRoutes from './routes/AppRoutes'

function App() {
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage)

  useEffect(() => {
    loadUserFromStorage()
  }, [])

  return <AppRoutes />
}

export default App
