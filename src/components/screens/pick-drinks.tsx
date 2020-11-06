import React from "react";
import { Col, Container, Row, Visible } from "react-grid-system";
import { useFetch } from "../../api/hooks";
import { Card } from "../../shared/card";
import { Image } from "../../shared/Image";
import { drinksUrl } from "../../api/base-url";
import { Paragraph } from "../../shared/paragraph";
import { Button } from "../../shared/button";

export const PickDrinks = () => {
  const res = useFetch(`${drinksUrl}`, {});

  if (!res.response) {
    return <div>Loading...</div>;
  }

  const drinks = res.response;

  console.log(res.response);
  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Card>
            <Row align="center">
              {drinks.map((r: any) => {
                return (
                  <Col xs={12} md={6}>
                    <Card>
                      <Image height={100} width={25} src={r.image_url} />
                      <span>{r.name}</span>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Col>
        <Visible xs sm></Visible>
        <Col xs={12} md={4}>
          <Card noGutter>
            <Paragraph weight="light">Next pick date and amount</Paragraph>
            <Button theme="primary">Next</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
