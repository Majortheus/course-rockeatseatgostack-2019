import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import './config/ReactotronConfig';
import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159C1" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}
