import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { Logo } from "../../utils/icons";
import { StyledNav, StyledLink } from "./styles";

export const Nav = () => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <StyledNav>
            <Logo />
            <StyledLink href="/">Restauranter</StyledLink>
            <StyledLink href="/">Produkter</StyledLink>
            <StyledLink href="/">Nyhedsbrev</StyledLink>
            <StyledLink href="/">Kontakt</StyledLink>
          </StyledNav>
        </Col>
      </Row>
    </Container>
  );
};
