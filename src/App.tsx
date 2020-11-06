import React from "react";
import { ScreenClassProvider } from "react-grid-system";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Nav } from "./components/navigation/nav";
import { Home } from "./components/screens/home";
import { PickDish } from "./components/screens/pick-dish";
import { PickDrinks } from "./components/screens/pick-drinks";

export const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <ScreenClassProvider>
            <Nav />
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/pick-dish" exact>
              <PickDish />
            </Route>
            <Route path="/pick-drinks" exact>
              <PickDrinks />
            </Route>
          </ScreenClassProvider>
        </Switch>
      </BrowserRouter>
    </main>
  );
};
