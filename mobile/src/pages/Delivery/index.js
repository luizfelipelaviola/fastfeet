import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useIsFocused } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';

import api from '~/services/api';
import {
  Container,
  Head,
  HeadLine,
  BackButton,
  PageTitle,
  Body,
  Box,
  BoxHead,
  BoxTitle,
  BoxItem,
  BoxLabel,
  BoxText,
  BoxGroup,
  ButtonBox,
  LeftButton,
  MiddleButton,
  RightButton,
  ButtonLabel,
} from './styles';

export default function Delivery({ route, navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [data, setData] = useState({});
  const isFocused = useIsFocused();

  const { id } = route.params;
  if (!id) {
    navigation.navigate('Dashboard');
  }

  navigation.setOptions({
    headerShown: false,
  });

  function Loading() {
    return (
      <ContentLoader
        speed={1}
        width={200}
        height={12}
        viewBox="0 0 200 12"
        backgroundColor="#f3f3f3"
        foregroundColor="#ddd"
      >
        <Rect x="0" y="6" rx="3" ry="3" width="200" height="6" />
      </ContentLoader>
    );
  }

  async function request() {
    try {
      setLoading(true);
      const response = await api.get(`/deliveryman/${user.id}/delivery/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('Falha na requisição', err.response.data.error);
      } else {
        Alert.alert('Falha na requisição', 'Falha na conexão com o servidor.');
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      request();
    }
  }, [isFocused]);

  async function handleDelivery() {
    try {
      setActionButtonLoading(true);
      const response = await api.get(`/deliveryman/${user.id}/delivery/${id}`);
      if (!!data.canceled_at || !!data.end_date) return;

      if (!response.data.start_date) {
        setLoading(true);
        await api.put(`/deliveryman/${user.id}/delivery/${id}`, {
          start: true,
        });
        Alert.alert('Retirar Produto', 'Ação registrada com sucesso');
        request();
      } else {
        navigation.navigate('Confirm', {
          id,
        });
      }
      setActionButtonLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('Falha na requisição', err.response.data.error);
      } else {
        Alert.alert('Falha na requisição', 'Falha na conexão com o servidor.');
      }
      setActionButtonLoading(true);
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
          <PageTitle>Detalhes da Encomenda</PageTitle>
        </HeadLine>
      </Head>
      <Body>
        <Box>
          <BoxHead>
            <Icon name="local-shipping" size={15} color="#7D40E7" />
            <BoxTitle>Informações da entrega</BoxTitle>
          </BoxHead>
          <BoxItem>
            <BoxLabel>DESTINATÁRIO</BoxLabel>
            {loading ? <Loading /> : <BoxText>{data.recipient.name}</BoxText>}
          </BoxItem>
          <BoxItem>
            <BoxLabel>ENDEREÇO DE ENTREGA</BoxLabel>
            {loading ? (
              <Loading />
            ) : (
              <BoxText>{`${data.recipient.street}, ${data.recipient.number}${
                data.recipient.complement && `, ${data.recipient.complement}`
              }, ${data.recipient.neighborhood} - ${data.recipient.city} - ${
                data.recipient.state
              } - ${data.recipient.zipcode}`}</BoxText>
            )}
          </BoxItem>
          <BoxItem>
            <BoxLabel>PRODUTO</BoxLabel>
            {loading ? <Loading /> : <BoxText>{data.product}</BoxText>}
          </BoxItem>
        </Box>
        <Box>
          <BoxHead>
            <Icon name="event" size={15} color="#7D40E7" />
            <BoxTitle>Situação da entrega</BoxTitle>
          </BoxHead>
          <BoxItem>
            <BoxLabel>STATUS</BoxLabel>
            {loading ? (
              <Loading />
            ) : (
              <BoxText>
                {data.end_date
                  ? 'Entregue'
                  : data.canceled_at
                  ? 'Cancelada'
                  : data.start_date
                  ? 'Retirada'
                  : 'Pendente'}
              </BoxText>
            )}
          </BoxItem>
          <BoxGroup>
            <BoxItem>
              <BoxLabel>DATA DE RETIRADA</BoxLabel>
              {loading ? (
                <Loading />
              ) : (
                <BoxText>
                  {data.start_date
                    ? format(parseISO(data.start_date), 'dd/MM/yyyy')
                    : '--/--/--'}
                </BoxText>
              )}
            </BoxItem>
            <BoxItem>
              <BoxLabel>DATA DE ENTREGA</BoxLabel>
              {loading ? (
                <Loading />
              ) : (
                <BoxText>
                  {data.end_date
                    ? format(parseISO(data.end_date), 'dd/MM/yyyy')
                    : '--/--/--'}
                </BoxText>
              )}
            </BoxItem>
          </BoxGroup>
        </Box>
        <ButtonBox>
          <LeftButton
            onPress={() => navigation.navigate('Problem', { id })}
            disabled={!!data.canceled_at || !!data.end_date}
          >
            <>
              <Icon name="highlight-off" size={20} color="#E74040" />
              <ButtonLabel>Informar Problema</ButtonLabel>
            </>
          </LeftButton>
          <MiddleButton
            onPress={() =>
              navigation.navigate('Problems', { id, product: data.product })
            }
          >
            <>
              <Icon name="info-outline" size={20} color="#E7BA40" />
              <ButtonLabel>Visualizar Problemas</ButtonLabel>
            </>
          </MiddleButton>
          <RightButton
            onPress={handleDelivery}
            disabled={!!data.canceled_at || !!data.end_date}
          >
            {actionButtonLoading ? (
              <ActivityIndicator size="small" color="#7D40E7" />
            ) : (
              <>
                <Icon name="add-circle-outline" size={20} color="#7D40E7" />
                <ButtonLabel>
                  {data.end_date
                    ? 'Confirmar Entrega'
                    : data.canceled_at
                    ? 'Confirmar Entrega'
                    : data.start_date
                    ? 'Confirmar Entrega'
                    : 'Retirar Produto'}
                </ButtonLabel>
              </>
            )}
          </RightButton>
        </ButtonBox>
      </Body>
    </Container>
  );
}

Delivery.propTypes = {
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
