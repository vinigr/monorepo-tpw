import React from 'react';
import { Menu, MenuItem, Fade } from '@material-ui/core';
import { LinkMenu } from './styles';

import AuthService from '../../service/auth';

export default function MenuAvatar(props) {
  function logout() {
    AuthService.logout(props);
    props.history.go();
  }

  const { anchorEl, open, handleClose } = props;
  return (
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
      {AuthService.loggedIn() && AuthService.getRole() !== 'aluno' && (
        <LinkMenu to="/send">
          <MenuItem onClick={handleClose}>Criar artigo</MenuItem>
        </LinkMenu>
      )}
      <MenuItem onClick={logout}>Sair</MenuItem>
    </Menu>
  );
}
