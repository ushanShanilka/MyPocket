import React, { Component } from 'react'
import { Text, View, 
TextInput,Image, StyleSheet, 
ImageBackground, KeyboardAvoidingView, 
Button, TouchableOpacity, 
TouchableWithoutFeedback, Keyboard , Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';


const image = { uri: "https://www.fonewalls.com/wp-content/uploads/2019/10/Gradient-Background-Wallpaper-009.jpg" };


export default class Loging extends Component {
constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:''
    };
    this.getData();
  }

storeData = async (value) => {
      try {
        await AsyncStorage.setItem('name', this.state.userName)
        await AsyncStorage.setItem('password', this.state.password)
        console.log("Data Saved");
      } catch (e) {
         console.log("Data Saved Faild");
      }
    }

getData = async () => {
  try {
    const name = await AsyncStorage.getItem('name')
    const password = await AsyncStorage.getItem('password')
    if(name == this.state.userName ) {
      console.log("name is "+name);
      console.log("password is "+password);
      this.props.navigation.navigate('Home')
    }else{
          console.log("Data ne!")
          Alert.alert("Chek And Try Again");
    }
  } catch(e) {
    console.log("Data ne!")
    Massage
  }
}

createNewAccoutn = () => {
    console.log("Create New Account");
    this.props.navigation.navigate('Create New Account')
  
};

login = () => {
    console.log("Login")
    
};

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>

              <Text style={styles.topic}>Loging</Text>
                        
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

                <TouchableOpacity style={styles.button} onPress={this.getData.bind(this)}>
                    <Text>Loging</Text>
                </TouchableOpacity>

                <Text style={styles.text}
                    onPress={this.createNewAccoutn}
                >Create New Account ?</Text>

                <Text style={styles.boottom}>Copyright © 2021 </Text>
            </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
  topic:{
    fontSize:28,
    textAlign: "center",
    top:-200,
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
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
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
        backgroundColor:'#218c74',
        width: 280,
        borderRadius: 10,
        left: 75,
  },
  text:{
      left: 145,
      borderColor: "#000000",
      top: -70,
  },
   boottom:{
     alignItems: 'center',
     justifyContent:'center',
     fontSize:15,
     top:250,
     left: 150,
  }

})