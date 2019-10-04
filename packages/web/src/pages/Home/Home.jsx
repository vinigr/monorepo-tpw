import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Menu, MenuItem, Fade } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import logo from '../../assets/images/rede-ftc.png';
import { Container, IconSearch, LinkLogin, LinkMenu } from './styles';

const useStyles = makeStyles({
  avatar: {
    cursor: 'pointer',
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

export default function Home(props) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
        {/* <LinkLogin to="/login">Login</LinkLogin> */}
        <Avatar
          className={classes.avatar}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          H
        </Avatar>
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
        <MenuItem onClick={handleClose}>Sair</MenuItem>
      </Menu>
    </Container>
  );
}
