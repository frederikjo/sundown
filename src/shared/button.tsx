import React, { FC } from "react";
import { StyledButton } from "./styles";

interface ButtonProps {
  theme: "primary" | "secondary";
  onClick?: (value: any) => void;
}

export const Button: FC<ButtonProps> = ({ theme, children, onClick }) => {
  return (
    <StyledButton theme={theme} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
