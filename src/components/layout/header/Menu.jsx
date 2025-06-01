import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--dark-color);
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: 100vh;
  width: 70%;
  max-width: 300px;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 15;

  @media (min-width: 769px) {
    display: none;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: var(--hover-color);
    }
  }
`;

const Menu = ({ open, links, onLinkClick }) => {
  return (
    <StyledMenu open={open}>
      {links.map(({ to, label, onClick, className }) => (
        <Link
          key={to}
          to={to}
          onClick={() => {
            onClick?.();
            onLinkClick(); // Cierra el menú
          }}
          className={className}
        >
          {label}
        </Link>
      ))}
    </StyledMenu>
  );
};

export default Menu;
