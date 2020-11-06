import React, { FC } from "react";
import { Container, Row } from "react-grid-system";
import { Card } from "../../shared/card";
import { Image } from "../../shared/Image";
import { Paragraph } from "../../shared/paragraph";

interface ContentBoxProps {
  meal: any;
}

export const ContentBox: FC<ContentBoxProps> = ({ meal }) => {
  return (
    <Card>
      <Container>
        <Row justify="around">
          <Paragraph weight="bold">{meal.strMeal}</Paragraph>
          <Paragraph weight="bold">{meal.strArea}</Paragraph>
        </Row>
        <div>
          <Image height={150} width={150} src={meal.strMealThumb}>
            {meal.strMealThumb}
          </Image>
        </div>
      </Container>
    </Card>
  );
};
