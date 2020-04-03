import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  Head,
  Delivery,
  Body,
  Status,
  StatusItem,
  StatusDot,
  StatusLabel,
  Footer,
  FooterItem,
  FooterLabel,
  FooterText,
  FooterButton,
  FooterButtonText,
} from './styles';

export default function DeliveryItem({ navigation, data }) {
  return (
    <Container>
      <Head>
        <Icon name="local-shipping" size={24} color="#7D40E7" />
        <Delivery>Encomenda 0{data.id}</Delivery>
      </Head>
      <Body>
        <Status>
          <StatusItem>
            <StatusDot filled />
            <StatusLabel>Aguardando Retirada</StatusLabel>
          </StatusItem>
          <StatusItem>
            <StatusDot filled={!!data.start_date} />
            <StatusLabel>Retirada</StatusLabel>
          </StatusItem>
          <StatusItem>
            <StatusDot filled={data.end_date && !data.canceled_at} />
            <StatusLabel>Entregue</StatusLabel>
          </StatusItem>
        </Status>
      </Body>
      <Footer>
        <FooterItem>
          <FooterLabel>Data</FooterLabel>
          <FooterText>
            {format(parseISO(data.createdAt), 'dd/MM/yyyy', {
              locale: pt,
            })}
          </FooterText>
        </FooterItem>
        <FooterItem>
          <FooterLabel>Cidade</FooterLabel>
          <FooterText>{data.recipient.city}</FooterText>
        </FooterItem>
        <FooterButton
          onPress={() =>
            navigation.navigate('Delivery', {
              id: data.id,
            })
          }
        >
          <FooterButtonText>Ver detalhes</FooterButtonText>
        </FooterButton>
      </Footer>
    </Container>
  );
}

DeliveryItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    canceled_at: PropTypes.string,
    createdAt: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
