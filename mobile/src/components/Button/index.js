import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text, Frame } from './styles';

export default function Button({ children, loading, ...rest }) {
  return (
    <Frame>
      <Container {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text>{children}</Text>
        )}
      </Container>
    </Frame>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
