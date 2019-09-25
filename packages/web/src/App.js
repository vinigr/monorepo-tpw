import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Login } from "./pages";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
