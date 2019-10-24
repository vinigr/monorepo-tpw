import React from 'react';

import { Container, LinkArticle, Check, CancelIcon } from './styles';

export default function MyArticle({
  _id,
  titulo,
  autores,
  publicado,
  editavel,
}) {
  return (
    <Container>
      <LinkArticle to={`/article/${_id}`}>
        <div>
          <h3>{titulo ? titulo : '---'}</h3>
          {autores.length > 0 && (
            <div id="keywords">
              {autores.map(autor => (
                <h4 key={autor._id}>{autor.nome};</h4>
              ))}
            </div>
          )}
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
