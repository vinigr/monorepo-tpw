import React, { useState } from 'react';

import { Container, ArticleItem, ArticleLink } from './styles';

export default function LatestArticles() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useState(() => {
    try {
      setLoading(false);
    } catch (err) {}
  }, []);

  return (
    <Container>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <ul>
          {articles.map(article => (
            <ArticleItem key={article.id}>
              <ArticleLink to={`article/${article.id}`}>
                <h3>{article.titulo}</h3>
                <div id="authors">
                  {article.autores &&
                    article.autores.map(autor => (
                      <h4 key={autor.id}>{autor.nome};</h4>
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
