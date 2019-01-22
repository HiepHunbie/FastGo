import React, {Component} from 'react';
import { Button, Text, View,StyleSheet,PermissionsAndroid } from 'react-native';
import SQLite from 'react-native-sqlite-2';


export async function request_location_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      Alert.alert("Location Permission Granted.");
    }
    else {

      Alert.alert("Location Permission Not Granted");

    }
  } catch (err) {
    console.warn(err)
  }
}

export async function request_read_phone_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        'title': 'ReactNativeCode Read Phone Permission',
        'message': 'ReactNativeCode App needs access to your READ_PHONE_STATE '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      Alert.alert("READ_PHONE_STATE Permission Granted.");
    }
    else {

      Alert.alert("READ_PHONE_STATE Permission Not Granted");

    }
  } catch (err) {
    console.warn(err)
  }
}

const db = SQLite.openDatabase('test.db', '1.0', '', 1);


export default class HomeScreen extends React.Component {

  
  async componentDidMount() {
 
    await request_location_runtime_permission(),
    await request_read_phone_runtime_permission()
    this.createTable();
    // this.insertDataToTable();
    // this.getDataTable();
  }
  
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center',}}>
        <Text style={styles.titleText}>FASTGO</Text>
          <Button style={styles.buttons}
          title="Bắt đầu"
          onPress={() => this.props.navigation.navigate('Maps')}
          />
        
      </View>
      
    );
  }

  createTable() {
    db.transaction(function (txn) {
      // txn.executeSql('DROP TABLE IF EXISTS GeoLocation', []);
      txn.executeSql('CREATE TABLE IF NOT EXISTS GeoLocation(user_id INTEGER PRIMARY KEY NOT NULL, lat VARCHAR(30), long VARCHAR(30))', []);
      
    });
  }

  insertDataToTable(){
    db.transaction(function (txn) {
      txn.executeSql('INSERT INTO student (lat, long) VALUES ("1", "1")');
    });
  }

  getDataTable(){
    db.transaction(function (txn) {
      txn.executeSql('SELECT * FROM `GeoLocation`', [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item:', res.rows.item(i));
        }
      });
    });
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
      },
  });

