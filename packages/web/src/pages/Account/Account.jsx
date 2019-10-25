import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import MyArticle from '../../components/MyArticle/MyArticle.jsx';
import User from '../../components/User/User.jsx';

import logo from '../../assets/images/rede-ftc.png';

import AuthService from '../../service/auth';

import api from '../../service/api';

export default function Account(props) {
  const [name, setName] = useState();
  const [articles, setArticles] = useState([]);
  const [articlesTeacher, setArticlesTeacher] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setName(AuthService.getName());
    }

    async function fetchData() {
      try {
        const { data } = await api.get('/articles');
        if (data) {
          setArticles(data);
        }

        if (
          AuthService.getRole() === 'professor' ||
          AuthService.getRole() === 'administrador'
        ) {
          const { data } = await api.get('/articlesTeacher');
          if (data) {
            return setArticlesTeacher(data);
          }
        }

        if (AuthService.getRole() === 'administrador') {
          const { data } = await api.get('/users');
          setUsers(data.users);
        }
      } catch ({ response }) {}
    }

    fetchData();
  }, [articlesTeacher]);

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
            <MyArticle key={article._id} {...article} />
          ))}
        </ul>
      </section>
      {articlesTeacher.length > 0 && (
        <section id="articles">
          <h2>Artigos de alunos</h2>
          <ul>
            {articlesTeacher.map(article => (
              <MyArticle key={article._id} {...article} />
            ))}
          </ul>
        </section>
      )}

      {AuthService.getRole() === 'administrador' && (
        <section id="users">
          <h2>Contas</h2>
          {users.map(user => (
            <User key={user._id} {...user} />
          ))}
        </section>
      )}
    </Container>
  );
}
