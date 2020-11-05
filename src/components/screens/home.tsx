import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Col, Container, Row } from "react-grid-system";
import { OrderFlow } from "../boxes/order-flow";
import { Card } from "../../shared/card";
import { Recipes } from "../../api/recipes";
import { Button } from "../../shared/button";
import { Slider } from "../slider/slider";
import styled from "styled-components";
import Axios from "axios";
import { Image } from "../../shared/Image";
import { Paragraph } from "../../shared/paragraph";
import { StyledHome } from ".";

export const StyledSlidingImg = styled.img`
  display: block;
  margin: auto;
  max-width: 90%;
  object-fit: contain;
`;

export const Home = () => {
  const [data, setData] = useState({ hits: [] });
  const [activeIndex, setActiveIndex] = useState(0);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await axios(
  //         "https://www.themealdb.com/api/json/v1/1/random.php"
  //       );

  //       setData(result.data);
  //     };

  //     fetchData();
  //   }, []);

  //   console.log(data);

  const images = useMemo(() => {
    return [
      {
        src:
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib",
        alt: "coffee",
      },
      {
        src:
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib",
        alt: "coffee",
      },
    ];
  }, []);

  const Recipes = async () => {
    let result;
    try {
      result = await Axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    return result;
  };

  const nextImage = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  return (
    <StyledHome>
      <Container>
        <Row>
          <Col xs={12} md={9}>
            <Card>
              <Slider
                activeSlide={activeIndex}
                moveLeft={prevImage}
                moveRight={nextImage}
              >
                {images.map((img, index) => (
                  <Image width={250} height={250} key={index} src={img.src} />
                ))}
              </Slider>
            </Card>
          </Col>
          <Col xs={12} md={3}>
            <OrderFlow />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={7}>
            <Card>
              <Paragraph weight="bold">Find your order</Paragraph>
            </Card>
          </Col>
        </Row>
      </Container>
    </StyledHome>
  );
};
