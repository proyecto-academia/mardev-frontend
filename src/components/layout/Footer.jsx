import { Link } from "react-router-dom";
import Logo from "../common/Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Logo />
        <div className="footer-links">
          <Link to="/home" className="">
            Home
          </Link>
          <Link to="/courses" className="">
            Courses
          </Link>
          <Link to="/classes" className="">
            Classes
          </Link>
          <Link to="/dashboard" className="">
            Dashboard
          </Link>
        </div>
        <div className="footer-links">
          <Link to="/about" className="">
            About Us
          </Link>
          <Link to="/contact" className="">
            Contact
          </Link>
          <Link to="/privacy" className="">
            Privacy Policy
          </Link>
          <Link to="/terms" className="">
            Terms of Service
          </Link>
          <Link to="/faq" className="">
            FAQ
          </Link>
        </div>
      </div>

      <div className="last">
        <p className="">
          &copy; {new Date().getFullYear()} MarDev. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
