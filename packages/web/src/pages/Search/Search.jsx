import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { Container } from './styles';
import { LinkLogin } from '../Home/styles';
import ArticleItem from '../../components/ArticleItem/ArticleItem.jsx';
import MenuAvatar from '../../components/MenuAvatar/MenuAvatar';
import Avatar from '../../components/Avatar/Avatar';
import LatestArticles from '../../components/LatestArticles/LatestArticles';

import logo from '../../assets/images/rede-ftc.png';

import api from '../../service/api';

import AuthService from '../../service/auth';
import { articles } from '../../service/data';

export default function Search(props) {
  const [text, setText] = useState('');
  // const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setName(AuthService.getName());
    }
  }, []);

  useEffect(() => {
    const { article } = queryString.parse(props.location.search);
    setText(article);

    if (!article) {
      return;
    }

    // async function fetchData() {
    //   setLoading(true);
    //   try {
    //     const { data } = await api.post('/trabalho', {
    //       pesquisa: article,
    //     });
    //     setArticles(data.trabalhos);
    setLoading(false);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // fetchData();
  }, [props.location.search]);

  function keyPress(e) {
    if (e.keyCode === 13) {
      props.history.push(`/search?article=${text}`);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <section id="area-search">
        <div id="initial-area">
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
        </div>
        {name ? (
          <Avatar setAnchorEl={setAnchorEl} name={name} />
        ) : (
          <LinkLogin to="/login">Login</LinkLogin>
        )}
      </section>
      <section id="articles">
        <section id="results">
          {!loading ? (
            <ul>
              {articles &&
                articles.map(article => (
                  <ArticleItem key={article.id} {...article} />
                ))}
            </ul>
          ) : (
            <span>Carregando...</span>
          )}
        </section>
        <section id="last">
          <h2>Últimas postagens</h2>
          <LatestArticles />
        </section>
      </section>
      <MenuAvatar
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        {...props}
      />
    </Container>
  );
}
