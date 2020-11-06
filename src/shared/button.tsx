import React, { FC } from "react";
import { StyledButton } from "../styles";

interface ButtonProps {
  theme: "primary" | "secondary";
  onClick?: (value: any) => void;
  href?: string;
  fixedSize?: boolean;
}

export const Button: FC<ButtonProps> = ({
  theme,
  children,
  onClick,
  href,
  fixedSize,
}) => {
  return (
    <StyledButton
      theme={theme}
      onClick={onClick}
      href={href}
      fixedSize={fixedSize}
    >
      {children}
    </StyledButton>
  );
};
