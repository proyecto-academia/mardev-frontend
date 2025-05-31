import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function PrivateLayout() {
  return (
      <div className="content-container">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}
