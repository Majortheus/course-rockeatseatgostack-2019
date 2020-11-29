import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
  const [providers, setProvider] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProvider(response.data);
    }

    loadProviders();
  }, []);
  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar
                    ? `http://10.0.2.2:3333/files/${provider.avatar.path}`
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}
