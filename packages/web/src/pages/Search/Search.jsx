import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  }, [props.location.search]);
  return (
    <Container>
      <section id="area-search">
        <Link to="/">
          <img src={logo} alt="rede-ftc-logo" />
        </Link>
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
