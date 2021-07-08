import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const image = { uri: "https://www.fonewalls.com/wp-content/uploads/2019/10/Gradient-Background-Wallpaper-009.jpg" };



import Income from './Income'
import Category from './Category'
import Expense from './Expense'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Tab.Navigator animationType="slide"
        tabBarOptions={{
          showLabel: false,
          style: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0, 
            backgroundColor:'#ffffff',
            borderRadius: 15,
            height: 90,
            ...style.shadow
          }
        }}
      >
          <Tab.Screen name="Income" component={Income} options={{ 
            tabBarIcon:({focused})=>(
              <View style={{alignItems:'center', justifyContent: 'center', top: 10,}}>
                <Image
                  source={require('../assets/icon/income.png')}
                  resizeMode='contain'
                  style={{
                    width:25,
                    height: 25,
                    tintColor: focused ? '#00b894' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? '#00b894' : '#748c94', fontSize: 14,}}>
                Income</Text>
              </View>
            )
          }}/>
          <Tab.Screen name="Expense" component={Expense} options={{ 
            tabBarIcon:({focused})=>(
              <View style={{alignItems:'center', justifyContent: 'center', top: 10,}}>
                <Image
                  source={require('../assets/icon/expense.png')}
                  resizeMode='contain'
                  style={{
                    width:25,
                    height: 25,
                    tintColor: focused ? '#e32f45' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? '#e32f45' : '#748c94', fontSize: 14,}}>
                Expense</Text>
              </View>
            )
          }}/>
          <Tab.Screen name="Category" component={Category} options={{ 
            tabBarIcon:({focused})=>(
              <View style={{alignItems:'center', justifyContent: 'center', top: 10,}}>
                <Image
                  source={require('../assets/icon/category.png')}
                  resizeMode='contain'
                  style={{
                    width:25,
                    height: 25,
                    tintColor: focused ? '#74b9ff' : '#748c94',
                  }}
                />
                <Text
                  style={{color: focused ? '#74b9ff' : '#748c94', fontSize: 14,}}>
                Category</Text>
              </View>
            )
          }}/>
    </Tab.Navigator>
    );
  }
}

const style = StyleSheet.create({
  tab:{

  },
  img:{
    width: 36,
    top: 0,
    height: 36,
  },
  shadow:{
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width:0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})