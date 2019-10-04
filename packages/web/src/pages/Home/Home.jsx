import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Menu, MenuItem, Fade } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import logo from '../../assets/images/rede-ftc.png';
import { Container, IconSearch, LinkLogin, LinkMenu } from './styles';

import AuthService from '../../service/auth';

const useStyles = makeStyles({
  blueAvatar: {
    color: '#fff',
    backgroundColor: blue[800],
    cursor: 'pointer',
  },
});

export default function Home(props) {
  const classes = useStyles();
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

  function logout() {
    AuthService.logout(props);
    props.history.go();
  }

  return (
    <Container>
      <header>
        <h1>Artigos</h1>
        {name ? (
          <Avatar
            className={classes.blueAvatar}
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            {name.substring(0, 1)}
          </Avatar>
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
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <LinkMenu to="/account">
          <MenuItem onClick={handleClose}>Minha conta</MenuItem>
        </LinkMenu>
        <MenuItem onClick={logout}>Sair</MenuItem>
      </Menu>
    </Container>
  );
}
