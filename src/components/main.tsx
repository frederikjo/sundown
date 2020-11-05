import React from "react";
import { ScreenClassProvider } from "react-grid-system";
import { Nav } from "./navigation/nav";
import { Home } from "./screens/home";

export const Main = () => {
  return (
    <ScreenClassProvider>
      <Nav />
      <Home />
    </ScreenClassProvider>
  );
};
