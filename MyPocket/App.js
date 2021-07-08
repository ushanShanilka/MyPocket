import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loging from './components/Loging'
import CreateNewAccount from './components/CreateNewAccount'
import HomePage from './components/HomePage'
import Sample from './components/Sample'
import Loading from './components/Loading'


const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    
    return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName="PondScreen" headerMode="none" mode="card">
                <Stack.Screen  name="Loading" component={Loading} />
                <Stack.Screen name="Loging" component={Loging} options={{tabBarVisible: false}}/>
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Create New Account" component={CreateNewAccount} />
              </Stack.Navigator>
          </NavigationContainer>
    )
  }
}
