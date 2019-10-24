import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { Container } from './styles';

import api from '../../service/api';

export default function User({ _id, nome, professor, administrador }) {
  const [isProfessor, setIsProfessor] = useState(professor);
  const [isAdministrador, setIsAdministrador] = useState(administrador);

  async function switchTeacher() {
    try {
      await api.put(`/user/teacher/${_id}`);
      setIsProfessor(!isProfessor);
    } catch (error) {
      console.log(error);
    }
  }

  async function switchAdmin() {
    try {
      await api.put(`/user/admin/${_id}`);
      setIsAdministrador(!isAdministrador);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <h3>{nome}</h3>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={isProfessor}
              onChange={switchTeacher}
              value="checkedA"
              color="primary"
            />
          }
          label="Professor"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isAdministrador}
              onChange={switchAdmin}
              value="checkedB"
              color="secondary"
            />
          }
          label="Administrador"
          labelPlacement="start"
        />
      </div>
    </Container>
  );
}
