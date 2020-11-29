import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

const Routes = () => (
  <Stack.Navigator
    initialRouteName="Main"
    screenOptions={{
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#7159C1',
      },
      headerTintColor: '#FFF',
    }}
  >
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ title: 'Principal' }}
    />
    <Stack.Screen
      name="User"
      component={User}
      options={{ title: 'Usuários' }}
    />
  </Stack.Navigator>
);

export default Routes;
