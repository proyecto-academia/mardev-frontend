import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import { useAuthStore } from '../../stores/useAuthStore'
import AuthRepository from '../../api/auth/AuthRepository'

export default function HeaderPrivate() {

  const authStore = useAuthStore();

  const logout = () => {
    AuthRepository.logout();
    authStore.clear();
  }

  return (
    <header className="private-header header">
      <div className="wrapper">
        <Logo />
        <nav className="">
          <Link to="/login" className="">
            logout
          </Link>
          <Link to="/register" className="">
            Register
          </Link>
          <a href="/" onClick={logout} className='logout'>Logout</a>
        </nav>
      </div>
    </header>
  )
}
