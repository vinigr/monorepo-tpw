import React, { useState } from 'react';

import { Container, ArticleItem, ArticleLink } from './styles';

import api from '../../service/api';

export default function LatestArticles() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useState(() => {
    async function fetchData() {
      try {
        const { data } = await api.get('articles/latest');
        setArticles(data);
        setLoading(false);
      } catch (err) {}
    }

    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <ul>
          {articles.map(article => (
            <ArticleItem key={article._id}>
              <ArticleLink to={`article/${article._id}`}>
                <h3>{article.titulo}</h3>
                <div id="authors">
                  {article.autores &&
                    article.autores.map(autor => (
                      <h4 key={autor._id}>{autor.nome};</h4>
                    ))}
                  {article.outrosAutores &&
                    article.outrosAutores.map(autor => (
                      <h4 key={autor}>{autor};</h4>
                    ))}
                </div>
              </ArticleLink>
            </ArticleItem>
          ))}
        </ul>
      )}
    </Container>
  );
}
