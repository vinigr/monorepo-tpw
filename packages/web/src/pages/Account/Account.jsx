import React from 'react';

import { Container } from './styles';
import MyArticle from '../../components/MyArticle/MyArticle.jsx';

export default function Account() {
  return (
    <Container>
      <header>
        <h1>Perfil</h1>
      </header>
      <section id="articles">
        <h2>Meus artigos</h2>
        <ul>
          <MyArticle />
        </ul>
      </section>
    </Container>
  );
}
