import { Link, useLocation , useNavigate} from "react-router-dom";
import Logo from "../common/Logo";
import { useAuthStore } from "../../stores/useAuthStore";
import { resetAllStores } from "../../helpers/resetAllStores";

export default function Header() {
  const authStore = useAuthStore();
  const location = useLocation(); // Obtener la ruta actual
  const navigate = useNavigate(); // Usar navigate para redirigir

  const logout = () => {
    resetAllStores(); // Resetear todos los stores
    navigate("/"); // Redirigir a la página de inicio de sesión
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
