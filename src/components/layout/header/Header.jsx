import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../common/Logo";
import { useAuthStore } from "../../../stores/useAuthStore";
import { resetAllStores } from "../../../helpers/resetAllStores";
import Burger from "./Burger";
import Menu from "./Menu";

const Wrapper = styled.div`
  position: relative;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const authStore = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentPage = (path) => location.pathname === path;

  const logout = () => {
    resetAllStores();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLinks = () => {
    if (authStore.isAuthenticated()) {
      return [
        { to: "/courses", label: "Courses", className: isCurrentPage("/courses") ? "currentPageLink" : "" },
        { to: "/packs", label: "Packs", className: isCurrentPage("/packs") ? "currentPageLink" : "" },
        { to: "/profile", label: "Profile", className: isCurrentPage("/profile") ? "currentPageLink" : "" },
        { to: "/", label: "Logout", onClick: logout, className: "logout" },
      ];
    } else {
      return [
        { to: "/courses", label: "Courses", className: isCurrentPage("/courses") ? "currentPageLink" : "" },
        { to: "/packs", label: "Packs", className: isCurrentPage("/packs") ? "currentPageLink" : "" },
        { to: "/profile", label: "Profile", className: isCurrentPage("/profile") ? "currentPageLink" : "" },
        { to: "/login", label: "Login", className: isCurrentPage("/login") ? "currentPageLink" : "primary-link" },
        { to: "/register", label: "Register", className: isCurrentPage("/register") ? "currentPageLink" : "secondary-link" },
      ];
    }
  };

  const links = getLinks();

  return (
    <header className={`${authStore.isAuthenticated() ? "private-header" : "public-header"} header`}>
      <Overlay open={open} onClick={() => setOpen(false)} />
      <Wrapper className="header-flex" ref={menuRef}>
        <Logo />

        <DesktopNav>
          {links.map(({ to, label, onClick, className }) => (
            <Link key={to} to={to} onClick={onClick} className={className}>
              {label}
            </Link>
          ))}
        </DesktopNav>

        <MobileWrapper>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} links={links} onLinkClick={() => setOpen(false)} />
        </MobileWrapper>
      </Wrapper>
    </header>
  );
}
