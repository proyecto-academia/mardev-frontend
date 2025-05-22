import { Outlet } from 'react-router-dom'
import HeaderPrivate from '../components/layout/HeaderPrivate'
import Sidebar from '../components/layout/Sidebar'
import Notifications from '../components/layout/Notifications'

export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderPrivate />
        <Notifications />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
