import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  Account,
  Home,
  Login,
  Cadastro,
  Search,
  Send,
  Article,
  PageNotFound,
} from './pages';
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

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        AuthService.loggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );

  const TeacherRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        AuthService.loggedIn() && AuthService.getRole() !== 'aluno' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
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
        <Route exact path="/article/:id" component={Article} />
        <TeacherRoute
          exact
          path="/send"
          component={props => <Send {...props} />}
        />
        <PrivateRoute
          exact
          path="/account"
          component={props => <Account {...props} />}
        />
        <Route
          path="*"
          component={() => <PageNotFound>Page not found</PageNotFound>}
        />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
