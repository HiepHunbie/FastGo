import { Button, Text, View,StyleSheet, Dimensions, } from 'react-native';
import React, {Component} from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'TT cá nhân' },
      { key: 'second', title: 'TT chuyến xe' },
    ],
  };
  render() {
    return (
      <View style={{ flex: 1,width:'100%'}}>
        <View style={{flex:0.2,width:'100%', justifyContent: 'center', alignItems: 'center'}}
        >
        <View style={{width:'40%',height:'80%',backgroundColor: '#EE8709', justifyContent: 'center', alignItems: 'center',}}
        >
        <Text style={styles.baseText}
        >H</Text>
        </View>
        </View>
        
        <View style={{flex:0.8,witdh:'100%',backgroundColor: '#EE8709'}}>
        {/* <Text>Profile!</Text>
        <Button
          title="Go to HomeScreen"
          onPress={() => this.props.navigation.navigate('Home')}
        /> */}
        <TabView
  navigationState={this.state}
  onIndexChange={index => this.setState({ index })}
  // initialLayout={{ width: Dimensions.get('window').width }}
  renderScene={SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })}
/>
        </View>
        
      </View>
    );
  }
}const styles = StyleSheet.create({
  container: {
      flex: 1,
  },baseText: {
  fontFamily: 'Cochin',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    flex:1,
    color: 'white',
    marginTop:'15%'
},scene: {
  flex: 1,
},
});