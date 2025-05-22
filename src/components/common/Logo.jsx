import { Link } from "react-router-dom";
import logo from "../../assets/logotipo-mardev.svg";
export default function Logo() {
  return (
    <Link to="/" className="">
      <div className="main-logo">
        <img src={logo} alt="Logo" />
      </div>
    </Link>
  );
}
