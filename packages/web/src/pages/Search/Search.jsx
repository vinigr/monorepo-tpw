import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { Container } from './styles';
import ArticleItem from '../../components/ArticleItem/ArticleItem.jsx';

import logo from '../../assets/images/rede-ftc.png';

import api from '../../service/api';

export default function Search(props) {
  const [text, setText] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { article } = queryString.parse(props.location.search);
    setText(article);

    if (!article) {
      return;
    }

    async function fetchData() {
      try {
        const { data } = await api.post('/trabalho', {
          pesquisa: article,
        });
        setArticles(data.trabalhos);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [props.location.search]);

  function keyPress(e) {
    if (e.keyCode === 13) {
      props.history.push(`/search?article=${text}`);
    }
  }

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
          onKeyDown={keyPress}
        />
      </section>
      <section id="results">
        {!loading ? (
          <ul>{articles && articles.map(a => <ArticleItem article={a} />)}</ul>
        ) : (
          <span>Carregando...</span>
        )}
      </section>
    </Container>
  );
}
