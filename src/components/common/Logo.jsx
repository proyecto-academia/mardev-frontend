import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/" className="">
      <div className="main-logo">
        <img src="/logotipo-mardev.svg" alt="Logo" />
      </div>
    </Link>
  );
}
