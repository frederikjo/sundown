import React, { FC, memo } from "react";
import { StyledImage } from "../styles";

interface ImgProps {
  src?: string;
  width?: number;
  height?: number;
}

export const Image: FC<ImgProps> = memo(({ src, width, height }) => (
  <StyledImage src={src} width={width} height={height} />
));
