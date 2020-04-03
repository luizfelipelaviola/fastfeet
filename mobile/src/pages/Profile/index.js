import React from 'react';
import stc from 'string-to-color';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  Avatar,
  AvatarImage,
  AvatarChar,
  Row,
  Label,
  Content,
  Logout,
  LogoutText,
} from './styles';
import { GetUserStr } from '~/util/AvatarFunctions';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <Avatar color={stc(user.name)}>
        {user.avatar ? (
          <AvatarImage source={{ uri: user.avatar.url }} />
        ) : (
          <AvatarChar color={stc(user.name)}>
            {GetUserStr(user.name)}
          </AvatarChar>
        )}
      </Avatar>
      <Row>
        <Label>Nome completo</Label>
        <Content>{user.name}</Content>
      </Row>
      <Row>
        <Label>Email</Label>
        <Content>{user.email}</Content>
      </Row>
      <Row>
        <Label>Data de cadastro</Label>
        <Content>
          {format(parseISO(user.createdAt), 'dd/MM/yyyy', {
            locale: pt,
          })}
        </Content>
      </Row>
      <Logout onPress={() => dispatch(signOut())}>
        <LogoutText>Logout</LogoutText>
      </Logout>
    </Container>
  );
}
