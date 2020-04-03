import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import stc from 'string-to-color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

import {
  Container,
  ProfileContainer,
  Profile,
  Avatar,
  AvatarImage,
  AvatarChar,
  WelcomeContainer,
  Welcome,
  ProfileName,
  SignOut,
  TabBar,
  TabBarTitle,
  Tabs,
  TabButton,
  TabButtonText,
  TabContainer,
  Empty,
} from './styles';
import DeliveryItem from './DeliveryItem';
import { GetUserStr } from '~/util/AvatarFunctions';

export default function Deliveries({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  navigation.setOptions({
    headerShown: false,
  });

  function Pendentes() {
    const [pendente, setPendente] = useState([]);
    const [pendendenteEnd, setPendenteEnd] = useState(false);
    const [pagePendente, setPagePendente] = useState(1);
    const [refreshingPendente, setRefreshingPendente] = useState(false);

    async function loadPendentes() {
      try {
        setPendenteEnd(false);
        setRefreshingPendente(true);
        setPagePendente(1);
        const response = await api.get(`deliveryman/${user.id}`, {
          params: {
            p: 1,
          },
        });
        setPendente(response.data);
        if (pendente.length < 20) setPendenteEnd(true);
        else setPendenteEnd(false);
        setRefreshingPendente(false);
      } catch (err) {
        if (err.response) {
          Alert.alert('Falha na requisição', err.response.data.error);
        } else {
          Alert.alert(
            'Falha na requisição',
            'Falha na conexão com o servidor.'
          );
        }
        setRefreshingPendente(false);
      }
    }

    async function loadMorePendentes() {
      try {
        if (pendendenteEnd) return;
        setPagePendente(pagePendente + 1);
        setRefreshingPendente(true);
        const response = await api.get(`deliveryman/${user.id}`, {
          params: {
            p: pagePendente,
          },
        });
        if (pendente.join('') !== response.data.join(''))
          setPendente([...pendente, ...response.data]);
        if (pendente.length < 20) setPendenteEnd(true);
        else setPendenteEnd(false);
        setRefreshingPendente(false);
      } catch (err) {
        if (err.response) {
          Alert.alert('Falha na requisição', err.response.data.error);
        } else {
          Alert.alert(
            'Falha na requisição',
            'Falha na conexão com o servidor.'
          );
        }
        setRefreshingPendente(false);
      }
    }

    useEffect(() => {
      if (isFocused) {
        loadPendentes();
      }
    }, [isFocused]);

    return (
      <TabContainer
        data={pendente}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DeliveryItem data={item} navigation={navigation} />
        )}
        ListEmptyComponent={() => <Empty>Nada para exibir aqui</Empty>}
        refreshing={refreshingPendente}
        onEndReached={() => loadMorePendentes()}
        onRefresh={() => loadPendentes()}
        onEndReachedThreshold={0.2}
      />
    );
  }

  function Entregues() {
    const [entregue, setEntregue] = useState([]);
    const [refreshingEntregue, setRefreshingEntregue] = useState(false);
    const [pageEntregue, setPageEntregue] = useState(1);
    const [entregueEnd, setEntregueEnd] = useState(false);

    async function loadEntregues() {
      try {
        setEntregueEnd(false);
        setRefreshingEntregue(true);
        setPageEntregue(1);
        const response = await api.get(`deliveryman/${user.id}/deliveries`, {
          params: {
            p: 1,
          },
        });
        setEntregue(response.data);
        if (entregue.length < 20) setEntregueEnd(true);
        else setEntregueEnd(false);
        setRefreshingEntregue(false);
      } catch (err) {
        if (err.response) {
          Alert.alert('Falha na requisição', err.response.data.error);
        } else {
          Alert.alert(
            'Falha na requisição',
            'Falha na conexão com o servidor.'
          );
        }
        setRefreshingEntregue(false);
      }
    }

    async function loadMoreEntregues() {
      try {
        if (entregueEnd) return;
        setPageEntregue(pageEntregue + 1);
        setRefreshingEntregue(true);
        const response = await api.get(`deliveryman/${user.id}/deliveries`, {
          params: {
            p: pageEntregue + 1,
          },
        });
        if (entregue.join('') !== response.data.join(''))
          setEntregue([...entregue, ...response.data]);
        if (entregue.length < 20) setEntregueEnd(true);
        else setEntregueEnd(false);
        setRefreshingEntregue(false);
      } catch (err) {
        if (err.response) {
          Alert.alert('Falha na requisição', err.response.data.error);
        } else {
          Alert.alert(
            'Falha na requisição',
            'Falha na conexão com o servidor.'
          );
        }
        setRefreshingEntregue(false);
      }
    }

    useEffect(() => {
      if (isFocused) {
        loadEntregues();
      }
    }, [isFocused]);

    return (
      <TabContainer
        data={entregue}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DeliveryItem data={item} navigation={navigation} />
        )}
        ListEmptyComponent={() => <Empty>Nada para exibir aqui</Empty>}
        refreshing={refreshingEntregue}
        onEndReached={() => loadMoreEntregues()}
        onRefresh={() => loadEntregues(1)}
        onEndReachedThreshold={0.2}
      />
    );
  }

  function TabBarComponent({ state, descriptors, navigation, position }) {
    return (
      <TabBar>
        <TabBarTitle>Entregas</TabBarTitle>
        <Tabs>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            let label;
            if (options.tabBarLabel !== undefined) {
              label = options.tabBarLabel;
            } else if (options.title !== undefined) {
              label = options.title;
            } else {
              label = route.name;
            }

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabButton
                key={route.key}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <TabButtonText selected={isFocused}>{label}</TabButtonText>
              </TabButton>
            );
          })}
        </Tabs>
      </TabBar>
    );
  }

  const Tab = createMaterialTopTabNavigator();

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <ProfileContainer>
        <Profile>
          <Avatar
            color={stc(user.name)}
            onPress={() => navigation.navigate('Profile')}
          >
            {user.avatar ? (
              <AvatarImage source={{ uri: user.avatar.url }} />
            ) : (
              <AvatarChar color={stc(user.name)}>
                {GetUserStr(user.name)}
              </AvatarChar>
            )}
          </Avatar>
          <WelcomeContainer>
            <Welcome>Bem vindo de volta,</Welcome>
            <ProfileName>{user.name}</ProfileName>
          </WelcomeContainer>
        </Profile>
        <SignOut onPress={() => dispatch(signOut())}>
          <Icon name="exit-to-app" size={30} color="#E74040" />
        </SignOut>
      </ProfileContainer>

      <Tab.Navigator tabBar={(props) => <TabBarComponent {...props} />}>
        <Tab.Screen name="Pendentes" component={Pendentes} />
        <Tab.Screen name="Entregues" component={Entregues} />
      </Tab.Navigator>
    </Container>
  );
}

Deliveries.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
