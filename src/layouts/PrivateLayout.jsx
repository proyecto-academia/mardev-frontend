import { Outlet } from 'react-router-dom'
import HeaderPrivate from '../components/layout/HeaderPrivate'
import Notifications from '../components/layout/Notifications'
import Footer from '../components/layout/Footer'

export default function PrivateLayout() {
  return (
      <div className="content-container">
        <HeaderPrivate />
        <Notifications />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}
