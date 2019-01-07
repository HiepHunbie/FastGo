import { Button, Text, View } from 'react-native';
import React, {Component} from 'react';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
        <Button
          title="Go to HomeScreen"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}