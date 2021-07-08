import React, { Component } from 'react';
import { View,Alert,ScrollView, Text,StyleSheet,TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Table, TableWrapper, Row } from 'react-native-table-component';


export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      category:'',
      resp: [],
      tableHead: ['Categorys'],
      widthArr: [],
    };
    this.getData();
  }

setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
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

saveCategory(){
  const date = new Date();

  fetch('http://192.168.8.202:3000/CategoryRouter/category', {
        method: 'POST',
        body: JSON.stringify({
          category: this.state.category,
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
    fetch('http://192.168.8.202:3000/CategoryRouter/categorys')
      .then((response) => response.json())
        .then((response) => {
           let resp=response.data
            console.log(resp)
                this.setState({ resp })               
        })
     .catch((error) => console.error(error));
}

  render() {
    const { modalVisible } = this.state;

    const tableData = this.state.resp.map(record => ([record.category]));
    return (
      <View>
        <View>
          <TouchableOpacity  style={style.x}>
            <Image source={require('../assets/icon/logout.png')} resizeMode='contain' style={style.iconlogOut} onPress={this.removeValue.bind(this)}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.back}>
            <Image source={require('../assets/icon/back.png')} resizeMode='contain' style={style.iconBack} onPress={this.createNewAccoutn}/>
          </TouchableOpacity>
            <Text style={style.topic}>Category</Text>
          </View>
            <View style={style.section}> 
              <View style={{height:548}}>
                <Table>
                    <Row data={this.state.tableHead} style={style.header} widthArr={this.state.widthArr} textStyle={style.text} />
                </Table>
                <ScrollView style={style.dataWrapper}>
                    <Table >
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

              <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)} style={style.editebutton}>
                 <Text>+ Category</Text>
              </TouchableOpacity>
           </View>

           <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}

        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>+ Category</Text>
              <TouchableOpacity
                style={[style.button, style.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                 <Image source={require('../assets/icon/close.png')} resizeMode='contain' style={style.iconclose} />
              </TouchableOpacity>

              <View>
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
                   <TouchableOpacity onPress={this.saveCategory.bind(this)} style={style.btnSave}>
                     <Text>Save</Text>
                    </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        </View>
    );
  }
}

const style = StyleSheet.create({

  topic:{
    top: -15,
    left: 147,
    fontSize:32,
    color:'#74b9ff'
  },
  iconlogOut:{
    left:370,
    top: 25,
    width:35,
    height: 35,
    position: 'absolute',
  },
  iconBack:{
    left:20,
    top: 25,
    width:35,
    height: 35,
  },
  section:{
    marginTop: 100,
    position: 'absolute',
    left:13,
    borderRadius: 10,
    width: 400,
    height: 650,
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
        top: 580,
        marginBottom:20,
        backgroundColor:'#74b9ff',
        width: 150,
        borderRadius: 10,
        left:130,
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
    color:'#74b9ff',
  },
  category: {
    height: 40,
    margin: 12,
    width: 300,
    top:60,
    borderWidth: 1,
  },
  btnSave: {
    height: 40,
    margin: 12,
    width: 200,
    top:120,
    borderWidth: 1,
    left:50,
    backgroundColor:'#74b9ff',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  text: {
     textAlign: 'center',
     fontWeight: '100' },
     dataWrapper: {
     marginTop: -1,
      },
  row: { 
    height: 50, 
    backgroundColor: '#E7E6E1',
    borderWidth:1,
    borderRadius: 5,
    marginTop:20
   },
  header: { 
    height: 40,
    backgroundColor: '#74b9ff',
  },
})