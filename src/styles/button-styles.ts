import { colors } from "./colors";
import styled from "styled-components";

export const StyledButton = styled.a<{
  theme: "primary" | "secondary";
  large?: boolean;
}>`
  ${({ theme }) =>
    theme === "primary"
      ? `background-color: ${colors.colors.primary}; border: 1px solid ${colors.colors.primary};`
      : theme === "secondary"
      ? `background-color: ${colors.colors.secondary}; border: 1px solid ${colors.colors.secondary};`
      : ""};

  border-radius: 6px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 5px 10px;
  font-weight: 600;

  &:hover {
    ${({ theme }) =>
      theme === "primary"
        ? `color: ${colors.colors.primary}; border: 1px solid ${colors.colors.primary};`
        : theme === "secondary"
        ? `color: ${colors.colors.secondary}; border: 1px solid ${colors.colors.secondary};`
        : ""};
    background: transparent;
  }
`;
