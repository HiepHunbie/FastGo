import React, {Component} from 'react';
import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, Alert, Platform, TouchableOpacity} from 'react-native';


export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          name:'',
          address:'',
          totalPoint:''
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
              name:responseJson[0].student_name,
              address:responseJson[0].student_subject,
              totalPoint:responseJson[0].student_phone_number,
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

    <View style={styles.viewLine}>
    <Text style={styles.textBold}>Họ và Tên :</Text>
    <Text style={styles.textBasic}>{this.state.name}</Text>
    </View>
    <View style={styles.viewLine}>
    <Text style={styles.textBold}>Địa Chỉ :</Text>
    <Text style={styles.textBasic}>{this.state.address}</Text>
    </View>
    <View style={styles.viewLine}>
    <Text style={styles.textBold}>Điểm Thành Viên :</Text>
    <Text style={styles.textBasic}>{this.state.totalPoint}</Text>
    </View>
 
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
        // justifyContent: 'center',
        flex:1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#ffffff',
        padding: 5,
        marginTop:10,
         
        },textViewContainer: {
 
            textAlignVertical:'center', 
            padding:10,
            fontSize: 20,
            color: '#fff',
            
           },textBasic:{
            textAlignVertical:'center', 
            fontSize: 15,
            color: '#000000',
            paddingLeft:10,
            paddingBottom:10,
           },textBold:{
            textAlignVertical:'center', 
            paddingLeft:10,
            paddingTop:10,
            fontSize: 15,
            color: '#000000',
            fontWeight: 'bold',
           },viewLine:{
               width:'100%',
               alignSelf: 'baseline',
               backgroundColor:'#ffffff',
               borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 0,
           }
  });

