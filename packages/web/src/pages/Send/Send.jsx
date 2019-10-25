import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';
import { Snackbar } from '@material-ui/core';

import MySnackbarContentWrapper from '../../components/SnackBar/SnackBar';
import MenuAvatar from '../../components/MenuAvatar/MenuAvatar';
import Avatar from '../../components/Avatar/Avatar';

import { Container } from './styles';

import logo from '../../assets/images/rede-ftc.png';

import AuthService from '../../service/auth';

import api from '../../service/api';

export default function Send(props) {
  const [authors, setAuthors] = useState([]);
  const [othersAuthors, setOthersAuthors] = useState('');
  const [advisor, setAdvisor] = useState();
  const [name, setName] = useState();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setName(AuthService.getName());
    }
  }, []);

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
      setOpenSuccess(true);
    } catch ({ response }) {
      setOpenError(true);
    }
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <img src={logo} alt="rede-ftc-logo" />
        </Link>
        {name && <Avatar setAnchorEl={setAnchorEl} name={name} />}
      </header>
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
          loadOptions={_.debounce(findUsers, 500)}
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
          loadOptions={_.debounce(findAdvisor, 500)}
          placeholder="Selecione"
        />
        <button onClick={createArticle}>Concluir</button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message="Artigo criado!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="error"
          message="Erro ao criar artigo!"
        />
      </Snackbar>
      <MenuAvatar
        anchorEl={anchorEl}
        open={open}
        handleClose={handleCloseMenu}
        {...props}
      />
    </Container>
  );
}
