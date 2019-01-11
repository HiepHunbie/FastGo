import React, {Component} from 'react';
import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, Alert, Platform, TouchableOpacity} from 'react-native';


export default class MyTrips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true
        }
      }
       
      GetItem (student_name) {
       
      Alert.alert(student_name);
       
      }

      componentDidMount() {
 
        return fetch('https://reactnativecode.000webhostapp.com/StudentsList.php')
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              // In this block you can do something with new state.
            });
          })
          }

          ListViewItemSeparator = () => {
            return (
              <View
                style={{
           
                  height: .5,
                  width: "100%",
                  backgroundColor: "#000",
           
                }}
              />
            );
          }

  render() {
    if (this.state.isLoading) {
    return (
      <View style={{flex:1, paddingTop: 20,}}>
        {/* <Text style={styles.titleText}>FASTGO</Text>
          <Button style={styles.buttons}
          title="Bắt đầu"
          onPress={() => this.props.navigation.navigate('Maps')}
          /> */}
        <ActivityIndicator />
      </View>
      
    );
  }
  return (
 
    <View style={styles.MainContainer}>
 
      <ListView
 
        dataSource={this.state.dataSource}
 
        renderSeparator= {this.ListViewItemSeparator}
 
        renderRow={(rowData) =>
 
       <View style={{flex:1, flexDirection: 'column'}} >
 
         <TouchableOpacity onPress={this.GetItem.bind(this, rowData.student_name)} >
       
         <Text style={styles.textViewContainer} >{'Mã chuyến đi : ' + rowData.id}</Text>
 
         <Text style={styles.textViewContainer} >{'Quãng đường : ' + rowData.student_name}</Text>
 
         <Text style={styles.textViewContainer} >{'Số điện thoại : ' + rowData.student_phone_number}</Text>
 
         </TouchableOpacity>
 
       </View>
 
        }
      />
 
    </View>
    );
  }
}

const styles = StyleSheet.create({
    titleText: {
        width: '100%',
        height:'50%', 
      fontSize: 50,
      fontWeight: 'bold',
      color : 'red',
      textAlign: 'center',
      marginTop:'30%',
      flex:1,
    },
    buttons: {
        flex:1
      },MainContainer :{
 
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex:1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#ffffff',
        padding: 5,
         
        },textViewContainer: {
 
            textAlignVertical:'center', 
            padding:10,
            fontSize: 20,
            color: '#000000',
            
           },
  });

