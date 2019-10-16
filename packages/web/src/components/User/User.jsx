import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { Container } from './styles';

export default function User({ name, professor }) {
  const [isProfessor, setIsProfessor] = useState(professor);

  return (
    <Container>
      <h3>{name}</h3>
      <FormControlLabel
        control={
          <Switch
            checked={isProfessor}
            onChange={() => setIsProfessor(!isProfessor)}
            value="checkedB"
            color="primary"
          />
        }
        label="Professor"
        labelPlacement="start"
      />
    </Container>
  );
}
