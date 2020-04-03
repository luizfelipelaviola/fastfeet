import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';
import {
  Container,
  Head,
  HeadLine,
  PageTitle,
  Body,
  BackButton,
  Input,
  Button,
} from './styles';

export default function Problem({ route, navigation }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = route.params;

  if (!id) {
    navigation.navigate('Dashboard');
  }

  navigation.setOptions({
    headerShown: false,
  });

  async function handleSubmit() {
    if (loading) return;
    try {
      setLoading(true);
      await api.post(`delivery/${id}/problems`, {
        description: text,
      });
      setLoading(false);
      Alert.alert('Informar Problema', 'Problema registrado com sucesso.');
      navigation.goBack();
    } catch (err) {
      if (err.response) {
        Alert.alert('Falha na requisição', err.response.data.error);
      } else {
        Alert.alert('Falha na requisição', 'Falha na conexão com o servidor.');
      }
      setLoading(false);
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Head>
        <HeadLine>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="keyboard-arrow-left" size={25} color="#FFF" />
          </BackButton>
          <PageTitle>Informar problema</PageTitle>
        </HeadLine>
      </Head>
      <Body>
        <Input
          multiline
          onChangeText={(input) => setText(input)}
          value={text}
          placeholder="Inclua aqui o problema que ocorreu na entrega."
          maxLength={255}
        />
        <Button loading={loading} onPress={handleSubmit}>
          Enviar
        </Button>
      </Body>
    </Container>
  );
}

Problem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
