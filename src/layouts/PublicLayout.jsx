import { Outlet } from 'react-router-dom'
import HeaderPublic from '../components/layout/HeaderPublic'
import Footer from '../components/layout/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPublic />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
