import React, { memo } from "react";
import { StyledCard } from "./styles";

export const Card = memo(({ children }) => {
  return <StyledCard theme="secondary">{children}</StyledCard>;
});
