import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Login, Cadastro } from "./pages";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
