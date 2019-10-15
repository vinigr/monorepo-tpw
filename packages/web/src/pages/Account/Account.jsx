import React, { useState, useEffect } from 'react';

import { Container } from './styles';
import MyArticle from '../../components/MyArticle/MyArticle.jsx';

import AuthService from '../../service/auth';

const articles = [
  {
    id: 'kjfhnsdjfds',
    titulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publicado: true,
    editavel: false,
  },
  {
    id: 'kjdjfds',
    titulo: 'Aenean cursus sem non metus tincidunt consectetur.',
    publicado: false,
    editavel: true,
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
        <h1>Perfil</h1>
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
    </Container>
  );
}
