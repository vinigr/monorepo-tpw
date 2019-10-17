import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

import { Container } from './styles';

import { users } from '../../service/data';

const filterUsers = inputValue => {
  return users.filter(i =>
    i.nome.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterUsers(inputValue));
    }, 1000);
  });

export default function Send() {
  const [othersAuthors, setOthersAuthors] = useState('');

  return (
    <Container>
      <form onKeyDown={e => e.keyCode === 13 && e.preventDefault()}>
        <h1>Criar artigo</h1>
        <label>Quem são os autores?</label>
        <AsyncSelect
          className="select"
          isMulti
          cacheOptions
          loadOptions={promiseOptions}
          placeholder="Selecione"
        />
        <label>Outros autores</label>
        <input
          className="text"
          type="text"
          value={othersAuthors}
          onChange={e => setOthersAuthors(e.target.value)}
        />
        <button>Concluir</button>
      </form>
    </Container>
  );
}
