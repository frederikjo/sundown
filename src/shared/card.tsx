import React, { FC, memo } from "react";
import { StyledCard } from "../styles";

interface CardProps {
  noGutter?: boolean;
}

export const Card: FC<CardProps> = memo(({ noGutter, children }) => {
  return (
    <StyledCard theme="secondary" noGutter={noGutter}>
      {children}
    </StyledCard>
  );
});
