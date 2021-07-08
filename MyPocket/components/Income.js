import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView,Button, 
Image, TouchableOpacity,Pressable,Modal,Alert,TextInput } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';


import AsyncStorage from '@react-native-async-storage/async-storage';


export default class income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      income:'',
      category:'',
      date:'',
      
      resp: [],
      tableHead: ['Category', 'Income', 'Date'],
      widthArr: [120, 120, 158],
    };
    this.getData();
  }


saveIncome(){
  const date = new Date();

  fetch('http://192.168.8.202:3000/IncomeRouter/income', {
        method: 'POST',
        body: JSON.stringify({
          income: this.state.income,
          category: this.state.category,
          date: date,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  this.getData();
  Alert.alert('Ocay..!')
}

getData() {
  console.log("Call")
        fetch('http://192.168.8.202:3000/IncomeRouter/income')
            .then((response) => response.json())
            .then((response) => {
              let resp=response.data
              console.log(resp[0].income)
                this.setState({ resp })
              for (const i in resp) {
                
                let x = (resp[0].income)+(resp[i].income)
                console.log(x)
              }
                
            })
            .catch((error) => console.error(error));
}

removeValue = async () => {
  try {
    await AsyncStorage.removeItem('name')
    await AsyncStorage.removeItem('password')
    console.log("Data Remove");
  } catch(e) {
    console.log("Data Ne")
  }
}


setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
}

back = () => {
    console.log("Bck")
    this.props.navigation.navigate('Loging')
    this.removeValue();
};

logOut = () => {
  console.log("JHb")

}

save(){
  console.log("Save")

}

  render() {
    const { modalVisible } = this.state;

    const tableData = this.state.resp.map(record => ([record.category, record.income, record.date]));

    return (
      <View style={style.main}>
        <View>

        <TouchableOpacity  style={style.x}>
          <Image source={require('../assets/icon/logout.png')} resizeMode='contain' style={style.iconlogOut} onPress={this.removeValue.bind(this)}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.back}>
          <Image source={require('../assets/icon/back.png')} resizeMode='contain' style={style.iconBack} onPress={this.createNewAccoutn}/>
        </TouchableOpacity>
          <Text style={style.topic}>My Income</Text>
        </View>
        <View style={style.section}>
          <TouchableOpacity onPress={this.back}>
            <Image source={require('../assets/icon/left.png')} resizeMode='contain' style={style.iconLeft} />
          </TouchableOpacity>

            <Image source={require('../assets/icon/calender.png')} resizeMode='contain' style={style.iconCalender} />
            <Text style={style.calenderLbl}>July - 2021</Text>
            <Text style={style.lblRs}>Rs.</Text>
            <Text style={style.lblIncome}>{this.state.income}</Text>

          <TouchableOpacity onPress={this.back}>
            <Image source={require('../assets/icon/right.png')} resizeMode='contain' style={style.iconRight}/>
          </TouchableOpacity>
        </View>
        <View style={style.section1}>
            <View style={{height:400}}>
                <Table>
                    <Row data={this.state.tableHead} style={style.header} widthArr={this.state.widthArr} textStyle={style.text} />
                </Table>
                <ScrollView style={style.dataWrapper}>
                    <Table style={{marginTop:10}}>
                        {
                            tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    style={[style.row]}
                                    widthArr={this.state.widthArr}
                                    style={[style.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                    textStyle={style.text}
                                />
                            ))
                        }
                    </Table>
                </ScrollView>
            </View>
         
    
            <View style={style.centeredView}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                  <View style={style.centeredView}>
                      <View style={style.modalView}>
                          <Text style={style.modalText}>Add Your Income</Text>
                                <TouchableOpacity
                                style={[style.button, style.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                                >
                                  <Image source={require('../assets/icon/close.png')} resizeMode='contain' style={style.iconclose} />
                                    </TouchableOpacity>

              <View>
                    <TextInput
                        style={style.income}
                        placeholder="Income"
                        value={this.state.income}
                            onChangeText={(value)=>{
                            this.setState({
                            income : value
                            })
                        }}
                   />

                   <TextInput
                        style={style.category}
                        placeholder="Category"
                        value={this.state.category}
                            onChangeText={(value)=>{
                            this.setState({
                            category : value
                            })
                        }}
                   />

                   <TextInput
                        style={style.date}
                        placeholder="Date"
                        value={this.state.date}
                            onChangeText={(value)=>{
                            this.setState({
                            date : value
                            })
                        }}
                   />

                   <TouchableOpacity onPress={(this.saveIncome.bind(this))} style={style.btnSave} >
                     <Text>Save</Text>
                    </TouchableOpacity>
              </View>
            </View>
              </View>
              </Modal>

          </View>

          <TouchableOpacity style={style.editebutton} onPress={() => this.setModalVisible(true)}>
              <Text>+ Income</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({

  topic:{
    top: -15,
    left: 137,
    fontSize:32,
    color:'#00b894'
  },
  iconlogOut:{
    left:370,
    top: 25,
    width:35,
    height: 35,
    position: 'absolute',
  },

  section:{
    marginTop: 90,
    position: 'absolute',
    left:13,
    borderRadius: 10,
    width: 400,
    height: 150,
    backgroundColor: 'white',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width:0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation:5
  },
  iconBack:{
    left:20,
    top: 25,
    width:35,
    height: 35,
  },
  iconLeft:{
    position: 'absolute',
    top: 25,
    left: 10,
    width:40,
  },
   iconRight:{
    width:40,
    position: 'absolute',
    left: 350,
    top:-125
  },
  iconCalender:{
    flex:1,
    left: 130,
    width:45,
    position: 'relative',
  },
  calenderLbl:{
    fontSize: 22,
    position: 'absolute',
    left: 190,
    top: 60,
  },
  lblRs:{
    fontSize: 24,
    position: 'absolute',
    left: 180,
    top: 100,
    color:'#00b894',
  },
  lblIncome:{
    fontSize: 24,
    position: 'absolute',
    left: 220,
    top: 100,
    color:'#00b894',
  },
  lblSalary:{
    fontSize: 22,
    position: 'absolute',
    left: 10,
    top: 50,
    color:'#10ac84',
    fontFamily: 'sans-serif-medium',
  },
  count:{
    fontSize: 22,
    position: 'absolute',
    right: 10,
    top: 50,
    color:'#10ac84'
  },
  section1:{
    marginTop: 250,
    position: 'absolute',
    left:13,
    borderRadius: 10,
    width: 400,
    height: 500,
    backgroundColor: 'white',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width:0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation:5
  },
  editebutton:{
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        position: 'absolute',
        top: 420,
        marginBottom:20,
        backgroundColor:'#00b894',
        width: 280,
        borderRadius: 10,
        left: 75,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: 410,
    height: 600,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
        padding: 10,
        position: 'absolute',
        top: 20,
        marginBottom:20,
        left: 350,
  },
  iconclose:{
      width: 20,
      height: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop:10,
    textAlign: "center",
    fontSize: 22,
    color:'#00b894',
  },
  income: {
    height: 40,
    margin: 12,
    width: 300,
    top:60,
    borderWidth: 1,
  },
  category: {
    height: 40,
    margin: 12,
    width: 300,
    top:80,
    borderWidth: 1,
  },
  date: {
    height: 40,
    margin: 12,
    width: 300,
    top:100,
    borderWidth: 1,
  },
  btnSave: {
    height: 40,
    margin: 12,
    width: 200,
    top:120,
    borderWidth: 1,
    left:50,
    backgroundColor:'#00b894',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  text: {
     textAlign: 'center',
     fontWeight: '100' },
  dataWrapper: {
     marginTop: -1
      },
  row: { 
    height: 50, 
   },
   header: { 
     height: 40,
     backgroundColor: '#00b894'
   },
})