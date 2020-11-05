import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { OrderFlow } from "../boxes/order-flow";
import { Card } from "../../shared/card";
import { Button } from "../../shared/button";
import styled from "styled-components";
import { Paragraph } from "../../shared/paragraph";
import { StyledHome } from ".";
import Input from "../../shared/input";

export const StyledSlidingImg = styled.img`
  display: block;
  margin: auto;
  max-width: 90%;
  object-fit: contain;
`;

export const Home = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Card>The slider</Card>
        </Col>
        <Col xs={12} md={4}>
          <OrderFlow />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={7}>
          <Card>
            <Paragraph weight="bold">Find your order</Paragraph>
            <Input
              onChange={() => console.log("pressed")}
              placeholder="enter email"
              type="search"
            />
            <Button theme="primary" onClick={() => console.log("find clciked")}>
              Find
            </Button>
          </Card>
        </Col>
        <Col xs={12} md={5}>
          <Card>
            <div>
              <Paragraph weight="light">lorem lipsum dollar sinar –</Paragraph>
              <Paragraph weight="bold">content box</Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
