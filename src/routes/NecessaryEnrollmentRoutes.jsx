import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useAvailableContentStore } from '../stores/useAvailableContentStore'
import { useMemo } from 'react'

export default function NecessaryEnrollmentRoutes() {
  const { id: courseId } = useParams()
  const { availableCoursesIds } = useAvailableContentStore()

  // Normalizar
  const numericCourseId = Number(courseId)

  const isLoaded = Array.isArray(availableCoursesIds) && availableCoursesIds.length > 0

  // Normalizar los IDs del store a números por si vienen como strings
  const hasAccess = useMemo(() => {
    if (!isLoaded || isNaN(numericCourseId)) return false
    const normalizedIds = availableCoursesIds.map(id => Number(id))
    return normalizedIds.includes(numericCourseId)
  }, [availableCoursesIds, numericCourseId, isLoaded])

  if (!isLoaded) return null // puedes reemplazar por un spinner si quieres

  if (!hasAccess) {
    return <Navigate to={`/courses/buy/${courseId}`} replace />
  }

  return <Outlet />
}
