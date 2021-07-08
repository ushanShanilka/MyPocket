import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, ScrollViewBase, FlatList, ActivityIndicator } from 'react-native'
import { Button, Text } from 'native-base'
import { Table, Row } from 'react-native-table-component';

export default class Assignment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resp: [],
            tableHead: ['Name', 'User Name', 'Email'],
            widthArr: [120, 120, 120]
        };
    }

  getData() {
        fetch('http://192.168.8.202:3000/IncomeRouter/income')
            .then((response) => response.json())
            .then((response) => {
              let resp=response.data
              console.log(resp)
                this.setState({ resp })
            })
            .catch((error) => console.error(error));
}


    render() {

        const tableData = this.state.resp.map(record => ([record.category, record.income, record.date]));

        return (
            <View style={styles.container}>
                <Button rounded success
                style={{marginStart: 15,marginEnd:15}}
                    onPress={this.getData.bind(this)}
                >
                    <Text>Get Data FROM API AND LOAD TO THE TABLE</Text>
                </Button>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    <Row data={this.state.tableHead} style={styles.header} widthArr={this.state.widthArr} textStyle={styles.text} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        {
                            tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    style={[styles.row]}
                                    widthArr={this.state.widthArr}
                                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                    textStyle={styles.text}
                                />
                            ))
                        }
                    </Table>
                </ScrollView>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { height: 40, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 50, backgroundColor: '#E7E6E1' }
});