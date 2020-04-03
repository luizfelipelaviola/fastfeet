import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  Head,
  HeadLine,
  PageTitle,
  Product,
  Body,
  BackButton,
  List,
  Empty,
  Problem,
  ProblemLoad,
  ProblemText,
  ProblemDate,
} from './styles';

export default function Problems({ route, navigation }) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, product } = route.params;

  if (!id) {
    navigation.navigate('Dashboard');
  }

  navigation.setOptions({
    headerShown: false,
  });

  function Loading() {
    return (
      <ProblemLoad>
        <ContentLoader
          speed={1}
          width={250}
          height={12}
          viewBox="0 0 250 12"
          backgroundColor="#f3f3f3"
          foregroundColor="#ddd"
        >
          <Rect x="0" y="6" rx="3" ry="3" width="250" height="6" />
        </ContentLoader>
      </ProblemLoad>
    );
  }

  async function request() {
    try {
      setLoading(true);
      const response = await api.get(`delivery/${id}/problems`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('Falha na requisição', err.response.data.error);
      } else {
        Alert.alert('Falha na requisição', 'Falha na conexão com o servidor.');
      }
    }
  }

  useEffect(() => {
    if (isFocused) {
      request();
    }
  }, [isFocused]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Head>
        <HeadLine>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="keyboard-arrow-left" size={25} color="#FFF" />
          </BackButton>
          <PageTitle>Visualizar problemas</PageTitle>
        </HeadLine>
        <HeadLine>
          <Product>{product}</Product>
        </HeadLine>
      </Head>
      <Body>
        {loading ? (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        ) : (
          <List
            data={data}
            keyExtractor={(problem) => String(problem.id)}
            renderItem={({ item }) => (
              <Problem>
                <ProblemText>{item.description}</ProblemText>
                <ProblemDate>
                  {format(parseISO(item.createdAt), 'dd/MM/yyyy')}
                </ProblemDate>
              </Problem>
            )}
            ListEmptyComponent={() => (
              <Problem>
                <Empty>Nenhum problema registrado</Empty>
              </Problem>
            )}
          />
        )}
      </Body>
    </Container>
  );
}

Problems.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      product: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
