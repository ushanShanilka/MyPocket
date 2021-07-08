import React, { Component } from 'react';
import { Text,Password, View, 
TextInput, StyleSheet, 
ImageBackground, KeyboardAvoidingView, 
Button, TouchableOpacity, 
TouchableWithoutFeedback, Keyboard, Alert  } from 'react-native'

const image = { uri: "https://cuteiphonewallpaper.com/wp-content/uploads/2019/09/Gradient-iPhone-Wallpaper-in-HD.jpg"}

import AsyncStorage from '@react-native-async-storage/async-storage';


export default class CreateNewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:''
    };
  }

  storeData = async (value) => {
      try {
        await AsyncStorage.setItem('name', this.state.userName)
        await AsyncStorage.setItem('password', this.state.password)
        console.log("Data Saved");
        Alert.alert("Saved..!");
        this.props.navigation.navigate('Loging')
      } catch (e) {
         
      }
  }

  render() {
    return (
      <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
              <ImageBackground source={image} style={styles.image}>

                <Text style={styles.topic}>Create My Pocket Account</Text>
                
                <TextInput style={styles.input}
                        placeholder='User Name'
                        value={this.state.userName}
                            onChangeText={(value)=>{
                            this.setState({
                            userName : value
                    })
                }}
                />    

                <TextInput secureTextEntry={true} style={styles.input}
                    placeholder='Password'
                    value={this.state.password}
                        onChangeText={(value)=>{
                        this.setState({
                        password : value
                    })
                }}
                />

                <TextInput secureTextEntry={true} style={styles.input}
                    placeholder='Confirm Password'
                />

                

                <TouchableOpacity style={styles.button}  onPress={this.storeData.bind(this)}>
                    <Text>Sing Up</Text>
                </TouchableOpacity>

                <Text style={styles.boottom}>Copyright © 2021 </Text>
            </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
   topic:{
    fontSize:24,
    textAlign: "center",
    top:-160,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  input: {
    width: 350,
    margin: 25,
    left: 15,
    top: -110,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4
  },
  button:{
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    top: -80,
    marginBottom:20,
    backgroundColor:'#00cec9',
    width: 280,
    borderRadius: 10,
    left: 75
  },
  boottom:{
     alignItems: 'center',
     justifyContent:'center',
     fontSize:15,
     top:200,
     left: 150,
  }


})