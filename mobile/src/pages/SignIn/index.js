import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { StatusBar } from 'react-native';

import logo from '~/assets/logo.png';
import { Container, Main, Logo, InputComponent, Input, Button } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn({ navigation }) {
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  navigation.setOptions({
    headerShown: false,
  });

  function handleNumbers(text) {
    let newText = '';
    const numbers = '0123456789';

    for (let i = 0; i < text.length; i += 1) {
      if (numbers.indexOf(text[i]) > -1) {
        newText += text[i];
      } else {
        Toast.show('Seu ID de cadastro é numérico');
      }
    }
    setId(newText);
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Main>
        <Logo source={logo} />
        <InputComponent>
          <Input
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={12}
            value={id}
            onChangeText={(text) => handleNumbers(text)}
            placeholder="Informe seu ID de cadastro"
            returnKeyType="go"
            onSubmitEditing={() => {
              dispatch(signInRequest(id));
            }}
          />
        </InputComponent>
        <Button
          loading={useSelector((state) => state.auth.loading)}
          onPress={() => dispatch(signInRequest(id))}
        >
          Entrar no sistema
        </Button>
      </Main>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
