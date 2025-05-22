import { Link } from 'react-router-dom'
import Logo from '../common/Logo'

export default function HeaderPrivate() {
  return (
    <header className="private-header header">
      <div className="wrapper">
        <Logo />
        <nav className="">
          <Link to="/login" className="">
            Login
          </Link>
          <Link to="/register" className="">
            Register
          </Link>
        </nav>
      </div>
    </header>
  )
}
