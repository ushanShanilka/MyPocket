import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'

export default class Loading extends Component {
    constructor(props) {

        setTimeout(function(){
            props.navigation.navigate('Loging');
        },  3000);
    super(props);
    this.state = {
    };
  }

    render() {
        return (
        <View style={styles.fullFrame}>
            <Text style={styles.top}>Welcome to My Pocket</Text>
            <ImageBackground source={require('../assets/img/loading.png' )}  style={styles.image}></ImageBackground>
            <Text style={styles.boottom}>Copyright © 2021 </Text>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    fullFrame:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'white',
     
      
      },
      image:{
        
        width:400,
        height:250,
        resizeMode: "cover"
       },
       top:{
        fontSize:30,
        top:-120,
        color:'#18dcff',
        fontWeight:'bold'
       },
       boottom:{
           alignItems: 'center',
           top:280,
           fontSize:15,
       }
})

