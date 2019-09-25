import React, { useState } from "react";

import logo from "../../assets/images/rede-ftc.png";
import { Container, IconSearch, LinkLogin } from "./styles";

export default function Home() {
  const [text, setText] = useState("");

  function search() {}

  function keyPress(e) {
    if (e.keyCode === 13) {
      search();
    }
  }

  return (
    <Container>
      <header>
        <LinkLogin to="/login">Login</LinkLogin>
      </header>
      <img src={logo} alt="rede-ftc-logo" />
      <div id="search">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Pesquisar artigos"
          onKeyDown={keyPress}
          required
        />
        <IconSearch onClick={() => console.log(text)} />
      </div>
    </Container>
  );
}