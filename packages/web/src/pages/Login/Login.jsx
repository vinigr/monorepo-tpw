import React, { useState } from "react";

import { Container } from "./styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
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
        <button>Entrar</button>
      </form>
    </Container>
  );
}
