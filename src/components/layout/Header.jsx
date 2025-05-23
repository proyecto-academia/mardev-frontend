import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import { useAuthStore } from '../../stores/useAuthStore'
import AuthRepository from '../../api/auth/AuthRepository'

export default function Header() {

  const authStore = useAuthStore();

  const logout = () => {
    AuthRepository.logout();
    authStore.clear();
  }

  if(authStore.isAuthenticated()) {
    return (
      <header className="private-header header">
        <div className="wrapper">
          <Logo />
          <nav className="">
            <Link to="/courses" className="">
              Courses
            </Link>
            <Link to="/profile" className="">
              Profile
            </Link>
            <button onClick={logout} className="logout">
              Logout
            </button>
          </nav>
        </div>
      </header>
    )
  }else{
    return (
      <header className="public-header header">
        <div className="wrapper">
          <Logo />
          <nav className="">
            <Link to="/courses" className="">
              Courses
            </Link>
            <Link to="/profile" className="">
              Profile
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

  
}
