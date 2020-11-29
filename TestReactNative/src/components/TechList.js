import React, {useState} from 'react';
import {View, TextInput, Button, Text, FlatList} from 'react-native';

// import { Container } from './styles';

export default function TechList() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTechs([...techs, newTech]);
    setNewTech('');
  }

  return (
    <View>
      <FlatList
        data={techs}
        keyExtractor={tech => tech}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      <TextInput
        testID="tech-input"
        value={newTech}
        onChangeText={setNewTech}
      />
      <Button onPress={handleAdd}>
        <Text>Adicionar</Text>
      </Button>
    </View>
  );
}
