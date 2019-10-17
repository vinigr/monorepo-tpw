import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import MyArticle from '../../components/MyArticle/MyArticle.jsx';
import User from '../../components/User/User.jsx';

import logo from '../../assets/images/rede-ftc.png';

import { articles } from '../../service/data';

import AuthService from '../../service/auth';

const users = [
  {
    id: '1',
    name: 'Stephanie G. Powell',
    professor: true,
  },
  {
    id: '2',
    name: 'Kauã Costa Ferreira',
    professor: false,
  },
];

export default function Account(props) {
  const [name, setName] = useState();
  // const [articles, setArticles] = useState();

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setName(AuthService.getName());
    }
  }, []);

  function logout() {
    AuthService.logout(props);
    props.history.go();
  }

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <img src={logo} alt="rede-ftc-logo" />
          </Link>
          <h1>Conta</h1>
        </div>
        <div>
          {name && <h5>{name}</h5>}
          <button onClick={logout}>Sair</button>
        </div>
      </header>
      <section id="articles">
        <h2>Meus artigos</h2>
        <ul>
          {articles.map(article => (
            <MyArticle key={article.id} {...article} />
          ))}
        </ul>
      </section>
      {AuthService.getRole() === 'administrador' && (
        <section id="users">
          <h2>Contas</h2>
          {users.map(user => (
            <User key={user.id} {...user} />
          ))}
        </section>
      )}
    </Container>
  );
}
