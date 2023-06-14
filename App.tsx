import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Title } from './src/screen/Title';
import { Menu } from './src/screen/Menu';
import { Answer } from './src/screen/Answer';
import { Result } from './src/screen/Result';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Title" component={Title} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Answer" component={Answer} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
