import React, {Component} from 'react';
import { Button, Text, View,StyleSheet, } from 'react-native';


export default class HomeScreen extends React.Component {
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

