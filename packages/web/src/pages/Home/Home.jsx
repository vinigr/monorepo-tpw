import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuAvatar from '../../components/MenuAvatar/MenuAvatar';
import Avatar from '../../components/Avatar/Avatar';

import logo from '../../assets/images/rede-ftc.png';
import { Container, IconSearch, LinkLogin } from './styles';

import AuthService from '../../service/auth';

export default function Home(props) {
  const [text, setText] = useState('');
  const [name, setName] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setName(AuthService.getName());
    }
  }, []);

  function keyPress(e) {
    if (e.keyCode === 13) {
      props.history.push(`/search?article=${text}`);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <header>
        <h1>Artigos</h1>
        {name ? (
          <Avatar setAnchorEl={setAnchorEl} name={name} />
        ) : (
          <LinkLogin to="/login">Login</LinkLogin>
        )}
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
        <Link to={`/search?article=${text}`}>
          <IconSearch />
        </Link>
      </div>
      <MenuAvatar
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        {...props}
      />
    </Container>
  );
}
