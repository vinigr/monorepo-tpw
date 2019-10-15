import React from 'react';

import { Container, Check, EditIcon } from './styles';

export default function MyArticle({ titulo, publicado, editavel }) {
  return (
    <Container>
      <div>
        <h3>{titulo}</h3>
      </div>

      <div id="status">
        <span>Status</span>
        {publicado ? (
          <>
            <span>Publicado</span>
            <Check />
          </>
        ) : (
          <>
            <span>Editável</span>
            <EditIcon editavel={editavel} />
          </>
        )}
      </div>
    </Container>
  );
}
