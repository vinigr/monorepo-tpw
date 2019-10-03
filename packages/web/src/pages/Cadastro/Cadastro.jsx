import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, LinkHome, LinkRegister } from './styles';
import logo from '../../assets/images/rede-ftc.png';

import api from '../../service/api';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState();

  async function register(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      return setError('Email ou senha incompletos!');
    }

    const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ftc)\.edu\.br$/;

    if (!regex.test(email)) {
      setError("Seu email precisa ser dominio '.ftc'");
      return;
    }

    try {
      await api.post('/criarUsuario', {
        nome: name,
        login: email,
        senha: password,
      });

      setRedirect(true);
    } catch ({ response }) {
      setError(response.data.error);
    }
  }

  function renderRedirect() {
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { email },
          }}
        />
      );
    }
  }

  return (
    <Container>
      {renderRedirect()}
      <LinkHome to="/">
        <img src={logo} alt="rede-ftc" />
      </LinkHome>
      <form>
        <h1>Cadastro</h1>
        <input
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div id="options">
          <LinkRegister to="/login">Fazer login</LinkRegister>
          <button onClick={register}>Cadastrar</button>
        </div>
        {error && <span className="error">{error}</span>}
      </form>
    </Container>
  );
}
