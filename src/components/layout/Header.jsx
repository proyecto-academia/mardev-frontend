import { Link, useLocation } from "react-router-dom";
import Logo from "../common/Logo";
import { useAuthStore } from "../../stores/useAuthStore";
import AuthRepository from "../../api/auth/AuthRepository";

export default function Header() {
  const authStore = useAuthStore();
  const location = useLocation(); // Obtener la ruta actual

  const logout = () => {
    AuthRepository.logout();
    authStore.clear();
  };

  const isCurrentPage = (path) => location.pathname === path; // Comparar ruta actual con el enlace

  if (authStore.isAuthenticated()) {
    return (
      <header className="private-header header">
        <div className="wrapper">
          <Logo />
          <nav>
            <Link
              to="/courses"
              className={isCurrentPage("/courses") ? "currentPageLink" : ""}
            >
              Courses
            </Link>
            <Link
              to="/packs"
              className={isCurrentPage("/packs") ? "currentPageLink" : ""}
            >
              Packs
            </Link>
            <Link
              to="/profile"
              className={isCurrentPage("/profile") ? "currentPageLink" : ""}
            >
              Profile
            </Link>
            <a onClick={logout} className="logout">
              Logout
            </a>
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header className="public-header header">
        <div className="wrapper">
          <Logo />
          <nav>
            <Link
              to="/courses"
              className={isCurrentPage("/courses") ? "currentPageLink" : ""}
            >
              Courses
            </Link>
            <Link
              to="/packs"
              className={isCurrentPage("/packs") ? "currentPageLink" : ""}
            >
              Packs
            </Link>
            <Link
              to="/profile"
              className={isCurrentPage("/profile") ? "currentPageLink" : ""}
            >
              Profile
            </Link>
            <Link
              to="/login"
              className={isCurrentPage("/login") ? "currentPageLink" : "primary-link"}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={isCurrentPage("/register") ? "currentPageLink" : "secondary-link"}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}
