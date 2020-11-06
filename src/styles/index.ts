import { colors } from "./colors";
import styled from "styled-components";

export const StyledButton = styled.a<{
  theme: "primary" | "secondary";
  fixedSize?: boolean;
}>`
  display: flex;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
  width: ${({ fixedSize }) => (fixedSize ? `130px` : "auto")};
  border: none;
  cursor: pointer;
  outline: none;
  padding: 10px;
  font-weight: 600;
  text-transform: uppercase;
  transition: 0.1s all;
  text-decoration: none;

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
      ? `font-weight: 400;`
      : weight === "bold"
      ? `font-weight: 800`
      : ""};
`;

export const StyledCard = styled.div<{ noGutter?: boolean }>`
  padding: 10px;
  border: 2px solid #000;
  min-height: 250px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  margin: ${({ noGutter }) => (noGutter ? "0 auto" : "0 auto 10px auto")};
`;

export const StyledImage = styled.img<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "100%")};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
`;
