import React from 'react';

import { Container } from './styles';

import imageError from '../../assets/images/not-found.png';

const PageNotFound = () => (
  <Container>
    <img src={imageError} alt="error-404" />
  </Container>
);

export default PageNotFound;
