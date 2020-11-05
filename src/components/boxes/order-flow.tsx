import React from "react";
import { Button } from "../../shared/button";
import { Card } from "../../shared/card";
import { Paragraph } from "../../shared/paragraph";

export const OrderFlow = () => {
  return (
    <Card>
      <Paragraph weight="bold">Order flow box</Paragraph>
      <Button theme="primary">Order</Button>
    </Card>
  );
};
