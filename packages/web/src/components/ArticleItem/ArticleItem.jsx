import React from 'react';

import { Container, LinkArticle } from './styles';

const ArticleItem = ({ _id, titulo, palavrasChave }) => (
  <Container>
    <LinkArticle to={`/article/${_id}`}>
      <h3>{titulo}</h3>
      <div>
        {palavrasChave &&
          palavrasChave.map(palavra => <span key={palavra}>{palavra};</span>)}
      </div>
    </LinkArticle>
  </Container>
);

export default ArticleItem;
