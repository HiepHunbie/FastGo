import React, {Component} from 'react';
import { Button, Text, View,StyleSheet,PermissionsAndroid } from 'react-native';



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

export default class HomeScreen extends React.Component {

  async componentDidMount() {
 
    await request_location_runtime_permission()
 
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

