import React, { FC } from "react";
import { StyledParagraph } from "./styles";

interface ParagraphProps {
  weight: "light" | "bold";
}

export const Paragraph: FC<ParagraphProps> = ({ weight, children }) => {
  return <StyledParagraph weight={weight}>{children}</StyledParagraph>;
};
