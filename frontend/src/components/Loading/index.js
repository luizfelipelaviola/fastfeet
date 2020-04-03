import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Loading({ amount }) {
  const elements = [];
  for (let i = 0; i < amount; i += 1) {
    elements.push(
      <Container key={i}>
        <div />
      </Container>
    );
  }
  return elements;
}

Loading.propTypes = {
  amount: PropTypes.number,
};

Loading.defaultProps = {
  amount: 1,
};
