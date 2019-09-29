import React, { useState } from "react";

import { Container, LinkHome, LinkRegister } from "./styles";
import logo from "../../assets/images/rede-ftc.png";

import api from '../../service/api';
import AuthService from "../../service/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  async function login(e) {
    e.preventDefault();
    setError(null);

    if(!email || !password){
      return setError('Email ou senha incompletos!')
    }

    try {
      const { data } = console.log(await api.post('/login', {
        login: email,
        senha: password
      }));

      AuthService.setToken(data.token);
      
    } catch ({response}) {
      setError(response.data.error);
    }
  }

  return (
    <Container>
      <LinkHome to="/">
        <img src={logo} alt="rede-ftc" />
      </LinkHome>
      <form>
        <h1>Login</h1>
        <input
          placeholder="Email"
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          placeholder="Senha"
          type='password' 
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div id="options">
          <LinkRegister to="/cadastro">Cadastrar-se</LinkRegister>
          <button onClick={login}>Entrar</button>
        </div>
        {error && <span>{error}</span>}
      </form>
    </Container>
  );
}
