import React, { useRef, useState } from "react";
import { Col, Container, Hidden, Row, Visible } from "react-grid-system";
import { useOnClickOutside } from "../../hooks.ts/hooks";
import { Logo } from "../../utils/icons";
import { Hamburger } from "./hamburger-menu/hamburger";
import { StyledNav, StyledLink, StyledHamburgerMenu } from "./styles";

export const Nav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);

  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setOpen(false));

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <StyledNav>
            <StyledLink href="/">
              <Logo />
            </StyledLink>
            <Hidden sm xs>
              <StyledLink href="/">Restauranter</StyledLink>
              <StyledLink href="/">Produkter</StyledLink>
              <StyledLink href="/">Nyhedsbrev</StyledLink>
              <StyledLink href="/">Kontakt</StyledLink>
            </Hidden>
            <Visible xs sm>
              <Hamburger open={open} setOpen={setOpen} />
              <StyledHamburgerMenu open={open}>
                <StyledLink href="/">Restauranter</StyledLink>
                <StyledLink href="/">Produkter</StyledLink>
                <StyledLink href="/">Nyhedsbrev</StyledLink>
                <StyledLink href="/">Kontakt</StyledLink>
              </StyledHamburgerMenu>
            </Visible>
          </StyledNav>
        </Col>
      </Row>
    </Container>
  );
};
