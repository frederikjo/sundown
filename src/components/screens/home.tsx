import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { OrderFlow } from "../boxes/order-flow";
import { Card } from "../../shared/card";
import { Button } from "../../shared/button";
import styled from "styled-components";
import { Paragraph } from "../../shared/paragraph";
import Input from "../../shared/input";
import { useFetch } from "../../api/hooks";
import { ContentBox } from "../boxes/content-box";
import { foodUrl } from "../../api/base-url";

export const StyledSlidingImg = styled.img`
  display: block;
  margin: auto;
  max-width: 90%;
  object-fit: contain;
`;

export const Home = () => {
  const res = useFetch(`${foodUrl}`, {});

  if (!res.response) {
    return <div>Loading...</div>;
  }

  const contentBoxResult = res.response.meals[0];

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
            <Input placeholder="enter email" type="search" />
            <Button theme="primary" onClick={() => console.log("find clciked")}>
              Find
            </Button>
          </Card>
        </Col>
        <Col xs={12} md={5}>
          <ContentBox meal={contentBoxResult} />
        </Col>
      </Row>
    </Container>
  );
};
