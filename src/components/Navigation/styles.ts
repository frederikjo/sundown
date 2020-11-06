import { colors } from "../../styles/colors";
import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const StyledLink = styled.a`
  color: ${colors.colors.primary};
  text-decoration: none;
  text-transform: uppercase;

  @media (min-width: 600px) {
    &:not(:first-child) {
      margin: 0 5%;
    }
  }

  &:hover {
    color: ${colors.colors.secondary};
  }
`;

export const StyledHamburger = styled.button<{ open: boolean }>`
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1;

  @media (max-width: 600px) {
    right: ${({ open }) => (open ? "initial" : "10vw")};
    left: ${({ open }) => (open ? "2vw" : "initial")};
  }

  div {
    position: relative;
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;
    background-color: ${({ open }) =>
      open ? colors.colors.primary : colors.colors.primary};

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const StyledHamburgerMenu = styled.nav<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 35vw;
  position: fixed;
  background-color: ${colors.colors.secondary};
  opacity: 0.5;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 10rem 0;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: 600px) {
    width: 100%;
  }
`;
