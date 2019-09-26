import React, { useState } from "react";

import { Container, LinkHome, LinkRegister } from "./styles";
import logo from "../../assets/images/rede-ftc.png";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    try {
      console.log(name, email, password);
    } catch (error) {}
  }

  return (
    <Container>
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
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div id="options">
          <LinkRegister to="/login">Fazer login</LinkRegister>
          <button onClick={register}>Cadastrar</button>
        </div>
      </form>
    </Container>
  );
}
