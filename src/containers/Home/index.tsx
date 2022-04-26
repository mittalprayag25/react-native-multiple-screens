import { View, Text } from 'react-native';
import React from 'react';

const Home = ({ navigation }): JSX.Element => {
  return (
    //@ts-ignore
    <View>
      {/*@ts-ignore*/}
      <Text onPress={() => navigation.navigate('DetailScreen')}>Page1</Text>
    </View>
  );
};

export default Home;
