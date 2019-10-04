import React from 'react';

// import { Container } from './styles';

const ArticleItem = ({ article }) => (
  <li>
    <h3>{article.title}</h3>
    <h4>Autores: </h4>
    <span>{article.palavrasChave}</span>
  </li>
);

export default ArticleItem;
