import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar as PersonAvatar } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  blueAvatar: {
    color: '#fff',
    backgroundColor: blue[800],
    cursor: 'pointer',
  },
});

export default function Avatar({ setAnchorEl, name }) {
  const classes = useStyles();

  return (
    name && (
      <PersonAvatar
        className={classes.blueAvatar}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        {name.substring(0, 1)}
      </PersonAvatar>
    )
  );
}
