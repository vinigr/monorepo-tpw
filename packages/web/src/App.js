import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Home, Login, Cadastro, Search, Send } from './pages';
import GlobalStyle from './styles/global';
import AuthService from './service/auth';

function App() {
  const AccessRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (!AuthService.loggedIn()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <AccessRoute path="/login" component={props => <Login {...props} />} />
        <AccessRoute
          path="/cadastro"
          component={props => <Cadastro {...props} />}
        />
        <Route exact path="/search" component={Search} />
        <Route exact path="/send" component={Send} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
