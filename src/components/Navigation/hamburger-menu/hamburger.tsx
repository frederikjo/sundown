import React, { FC } from "react";

import { StyledHamburger } from "../styles";

interface HamburgerProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const Hamburger: FC<HamburgerProps> = ({ open, setOpen }) => (
  <StyledHamburger open={open} onClick={() => setOpen(!open)}>
    <div />
    <div />
    <div />
  </StyledHamburger>
);
