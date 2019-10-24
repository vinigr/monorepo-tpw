import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';

import { Container } from './styles';

import api from '../../service/api';

export default function Send() {
  const [authors, setAuthors] = useState([]);
  const [othersAuthors, setOthersAuthors] = useState('');
  const [advisor, setAdvisor] = useState();

  async function findUsers(newValue) {
    const inputValue = newValue.replace(/\W/g, '');
    const { data } = await api.get(`/userFind/${inputValue}`);
    return data.users;
  }

  async function findAdvisor(newValue) {
    const inputValue = newValue.replace(/\W/g, '');
    const { data } = await api.get(`/teacherFind/${inputValue}`);
    return data.users;
  }

  async function createArticle(e) {
    e.preventDefault();
    if (authors.length === 0 && othersAuthors === '') {
      return;
    }
    const authorsId = authors.map(author => author._id);

    try {
      await api.post('/article/create', {
        authors: authorsId,
        othersAuthors,
        advisor,
      });

      setAuthors([]);
      setOthersAuthors('');
    } catch ({ response }) {
      console.log(response);
    }
  }

  return (
    <Container>
      <form onKeyDown={e => e.keyCode === 13 && e.preventDefault()}>
        <h1>Criar artigo</h1>
        <label>Quem são os autores?</label>
        <AsyncSelect
          className="select"
          isMulti
          cacheOptions
          onChange={e => setAuthors(e)}
          getOptionValue={option => option._id}
          getOptionLabel={option => option.nome}
          loadOptions={_.debounce(findUsers, 1000)}
          placeholder="Selecione"
          isSearchable
        />
        <label>Outros autores</label>
        <input
          className="text"
          type="text"
          value={othersAuthors}
          onChange={e => setOthersAuthors(e.target.value)}
        />
        <label>Quem é o orientador?</label>
        <AsyncSelect
          className="select"
          value={advisor}
          cacheOptions
          onChange={e => setAdvisor(e)}
          getOptionValue={option => option._id}
          getOptionLabel={option => option.nome}
          loadOptions={_.debounce(findAdvisor, 1000)}
          placeholder="Selecione"
        />
        <button onClick={createArticle}>Concluir</button>
      </form>
    </Container>
  );
}
