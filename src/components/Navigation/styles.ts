import { colors } from "../../shared/styles/colors";
import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledLink = styled.a`
  color: ${colors.colors.primary};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${colors.colors.secondary};
  }
`;
