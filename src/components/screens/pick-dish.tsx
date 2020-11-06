import React from "react";
import { Col, Container, Row, Visible } from "react-grid-system";
import { useFetch } from "../../api/hooks";
import { Card } from "../../shared/card";
import { Image } from "../../shared/Image";
import { foodUrl } from "../../api/base-url";
import { Paragraph } from "../../shared/paragraph";
import { Button } from "../../shared/button";

export const PickDish = () => {
  const res = useFetch(`${foodUrl}`, {});

  if (!res.response) {
    return <div>Loading...</div>;
  }

  const pickDishResult = res.response.meals[0];

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Card noGutter>
            <Image height={350} width={350} src={pickDishResult.strMealThumb} />
          </Card>
        </Col>
        <Visible xs sm></Visible>
        <Col xs={12} md={4}>
          <Card noGutter>
            <Paragraph weight="light">
              Lorem lipsum dollar sinar pick some drinks next
            </Paragraph>
            <Button theme="primary" href="/pick-drinks">
              Next
            </Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <Card>
            <Paragraph weight="bold">{pickDishResult.strMeal}</Paragraph>
            <Paragraph weight="light">
              {pickDishResult.strInstructions}
            </Paragraph>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} offset={{ md: 4 }}>
          <Button theme="primary" onClick={() => console.log("hello")}>
            Generate
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
