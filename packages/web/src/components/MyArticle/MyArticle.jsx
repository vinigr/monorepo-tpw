import React from 'react';

import { Container, LinkArticle, Check, CancelIcon } from './styles';

export default function MyArticle({ id, titulo, publicado, editavel }) {
  return (
    <Container>
      <LinkArticle to={`/article/${id}`}>
        <div>
          <h3>{titulo}</h3>
          <div></div>
        </div>
        <div id="status">
          <div className="publicado">
            <span>Publicado</span>
            {publicado ? <Check /> : <CancelIcon />}
          </div>
          <div className="publicado">
            <span>Editável</span>
            {editavel ? <Check /> : <CancelIcon />}
          </div>
        </div>
      </LinkArticle>
    </Container>
  );
}
