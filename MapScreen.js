import { Button, Text, View,StyleSheet, Dimensions,TouchableOpacity, } from 'react-native';
import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


export default class MapScreen extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      timestamp: null
    };
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          latitude: position.coords.latitude ,
          longitute: position.coords.longitude,
          timestamp:  position.timestamp
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }
  
  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }
  render() {
   console.log('ssssss '+this.state.latitude);
    return (
        <View style={{flex:1}}>
        <MapView
      style={{flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsMyLocationButton={true}
      style={styles.container}
      initialRegion={{
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }
    }
      >
      <MapView.Marker 
        title={'Hi'}
        style={{
          width: 20,
          height: 20
        }}
        // image={require('../FastGo/Images/my_location.png')}
        coordinate={{ latitude: this.state.latitude,
         longitude: this.state.longitude,
         latitudeDelta: 0.0922,
      longitudeDelta: 0.0421 }}/>
      </MapView>
      <View style={{flex:0.07,width:'100%',backgroundColor:'#EE8709',flexDirection:'row'}}>
      <Text style={styles.baseText}>Loại xe:</Text>
      <Text style={styles.baseText}>Giá tiền:</Text>
      </View>
      <View style={{flex:0.07,width:'100%',backgroundColor:'#EE8709',flexDirection:'row'}}>
      <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text style={{textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    alignItems: 'center',}}> Gửi yêu cầu </Text>
       </TouchableOpacity>
      </View>
      </View>
       
    );
  }
}
onPress = () => {
  this.setState({
    count: this.state.count+1
  })
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },autoSearch: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - 50,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding:200,
    marginLeft:100,
    marginRight:100,
},baseText: {
  fontFamily: 'Cochin',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    padding:5,
    flex:1,
    color: 'white',
},button: {
  alignItems: 'center',
  backgroundColor: '#EE8709',
  flex:1,
  borderColor: 'white',
  borderWidth: 1,
  fontWeight: 'bold',
  fontSize: 18,
  color: 'white',
},marker: {
  width: 60,
  height: 75
},
});