import { colors } from "./colors";
import styled from "styled-components";

export const StyledButton = styled.a<{
  theme: "primary" | "secondary";
  large?: boolean;
}>`
  display: flex;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
  width: 150px;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 5px 10px;
  font-weight: 600;
  text-transform: uppercase;
  transition: 0.1s all;

  ${({ theme }) =>
    theme === "primary"
      ? `background-color: ${colors.colors.primary}; border: 1px solid ${colors.colors.primary};`
      : theme === "secondary"
      ? `background-color: ${colors.colors.secondary}; border: 1px solid ${colors.colors.secondary};`
      : ""};

  &:hover {
    background: transparent;
    ${({ theme }) =>
      theme === "primary"
        ? `color: ${colors.colors.primary}; border: 1px solid ${colors.colors.primary};`
        : theme === "secondary"
        ? `color: ${colors.colors.secondary}; border: 1px solid ${colors.colors.secondary};`
        : ""};
  }
`;

export const StyledParagraph = styled.p<{ weight: "light" | "bold" }>`
  color: ${colors.colors.primary};
  text-transform: uppercase;

  ${({ weight }) =>
    weight === "light"
      ? `font-weight: 500;`
      : weight === "bold"
      ? `font-weight: 700`
      : ""};
`;

export const StyledCard = styled.div`
  padding: 10px;
  border: 1px solid #000;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
`;

export const StyledImage = styled.img<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "100%")};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
`;
