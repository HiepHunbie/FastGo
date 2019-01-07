import { Button, Text, View,StyleSheet, } from 'react-native';
import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

state = {
  location: null
};

findCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const location = JSON.stringify(position);

      this.setState({ location });
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};



export default class MapScreen extends React.Component {
  render() {
    return (
      <MapView
      provider={PROVIDER_GOOGLE}
      showsMyLocationButton={true}
      style={styles.container}
      initialRegion={{
      latitude: this.state.location.location,
      longitude: this.state.location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
      width: '100%',
      height:'100%', 
  },
});