import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import { Container } from './styles';
import ArticleItem from '../../components/ArticleItem/ArticleItem.jsx';

import logo from '../../assets/images/rede-ftc.png';

export default function Search(props) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { article } = queryString.parse(props.location.search);
    setText(article);
    console.log(article);
  }, [props.location.search]);
  return (
    <Container>
      <section id="area-search">
        <img src={logo} alt="rede-ftc-logo" />
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Pesquisar"
        />
      </section>
      <section id="results">
        {!loading ? (
          <ul>
            <ArticleItem />
          </ul>
        ) : (
          <span>Carregando...</span>
        )}
      </section>
    </Container>
  );
}
