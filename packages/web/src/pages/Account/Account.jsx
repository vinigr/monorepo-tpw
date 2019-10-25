import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import MyArticle from '../../components/MyArticle/MyArticle';
import MenuAvatar from '../../components/MenuAvatar/MenuAvatar';
import Avatar from '../../components/Avatar/Avatar';
import User from '../../components/User/User';

import logo from '../../assets/images/rede-ftc.png';

import AuthService from '../../service/auth';

import api from '../../service/api';

export default function Account(props) {
  const [name, setName] = useState();
  const [articles, setArticles] = useState([]);
  const [articlesTeacher, setArticlesTeacher] = useState([]);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
            setArticlesTeacher(data);
          }
        }

        if (AuthService.getRole() === 'administrador') {
          const { data } = await api.get('/users');

          setUsers(data.users);
        }
      } catch ({ response }) {}
    }

    fetchData();
  }, []);

  function handleClose() {
    setAnchorEl(null);
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
          {name && (
            <>
              <h5>{name}</h5> <Avatar setAnchorEl={setAnchorEl} name={name} />
            </>
          )}
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
      <MenuAvatar
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        {...props}
      />
    </Container>
  );
}
