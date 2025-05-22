import { Link } from 'react-router-dom'
import Logo from '../common/Logo'

export default function HeaderPublic() {
  return (
    <header className="public-header header">
      <div className="wrapper">
        <Logo />
        <nav className="">
          <Link to="/courses" className="">
            Courses
          </Link>
          <Link to="/login" className="primary-link">
            Login
          </Link>
          <Link to="/register" className="secondary-link">
            Register
          </Link>
        </nav>
      </div>
    </header>
  )
}
