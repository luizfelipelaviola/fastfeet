import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Main, Logo } from './styles';
import logo from '~/assets/logo.png';

export default function Loading({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  });
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Main>
        <Logo source={logo} />
        <ActivityIndicator size="small" color="#FFF" />
      </Main>
    </Container>
  );
}

Loading.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
