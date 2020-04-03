import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Loading from '~/pages/Loading';
import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import Delivery from '~/pages/Delivery';
import Problems from '~/pages/Problems';
import Problem from '~/pages/Problem';
import Confirm from '~/pages/Confirm';

function Dashboard() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Deliveries" component={Deliveries} />
      <Stack.Screen name="Delivery" component={Delivery} />
      <Stack.Screen name="Problems" component={Problems} />
      <Stack.Screen name="Problem" component={Problem} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const { connecting, signed } = useSelector((state) => state.auth);

  if (connecting) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    );
  }

  if (!signed) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    );
  }

  const Tabs = createBottomTabNavigator();

  const tabBarOptions = {
    style: { height: 70 },
    tabStyle: {
      padding: 10,
    },
    labelStyle: {
      margin: 0,
      padding: 0,
      position: 'relative',
    },
    labelPosition: 'below-icon',
    activeTintColor: '#7D40E7',
    inactiveTintColor: '#999999',
  };

  return (
    <Tabs.Navigator tabBarOptions={tabBarOptions}>
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="dehaze" size={30} color={color} />
          ),
        }}
        component={Dashboard}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={30} color={color} />
          ),
        }}
        component={Profile}
      />
    </Tabs.Navigator>
  );
}
