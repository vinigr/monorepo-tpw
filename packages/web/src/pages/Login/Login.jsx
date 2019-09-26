import React, { useState } from "react";

import { Container, LinkHome, LinkRegister } from "./styles";
import logo from "../../assets/images/rede-ftc.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    try {
      console.log(email, password);
    } catch (error) {}
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
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div id="options">
          <LinkRegister to="/cadastro">Cadastrar-se</LinkRegister>
          <button onClick={login}>Entrar</button>
        </div>
      </form>
    </Container>
  );
}
