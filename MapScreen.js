import { Button, Text, View,StyleSheet, Dimensions,TouchableOpacity,TouchableHighlight, } from 'react-native';
import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE,Marker,Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import RNGooglePlaces from 'react-native-google-places';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBqu8npUOIhk8RsyyQq2x_tRAwaEjj1GHE';

export default class MapScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Maps',
  };
  constructor(props) {
    super(props);
    this._getCoords = this._getCoords.bind(this);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeOutput: 0,
      longitudeOutput: 0,
      error: "",
      timestamp: null,
      inputAddress:"Điểm bắt đầu",
      outputAddress:"Điểm kết thúc",
    };
    this.stateOutPut = {
      latitude: 37.78825,
      longitude: -122.4324,
      error: "",
      timestamp: null
    };

  }
  _getCoords = () => {
    // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //         var initialPosition = JSON.stringify(position.coords);
    //         this.setState({position: initialPosition});
    //         let tempCoords = {
    //             latitude: Number(position.coords.latitude),
    //             longitude: Number(position.coords.longitude)
    //         }
    //         this._map.animateToCoordinate(tempCoords, 1);
    //       }, function (error) { alert(error) },
    //  );
    Geolocation.getCurrentPosition(
      (position) => {
          console.log(position);
          this.setState({ 
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            timestamp:  position.timestamp,
          })
          this._gotoCurrentLocation();
//           fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=' + GOOGLE_MAPS_APIKEY)
//           .then((response) => response.json())
//           .then((responseJson) => {
//             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
//             this.setState({ 
//               inputAddress: JSON.stringify(responseJson).results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].short_name,
//             })
// })
      },
      (error) => {this.setState({ error: error.message })
          // See error code charts below.
          console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({ 
    //       latitude: position.coords.latitude ,
    //       longitute: position.coords.longitude,
    //       timestamp:  position.timestamp
    //     })
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // )
    this._getCoords();
    
  }
  
  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }
  
  render() {
  //  console.log('ssssss '+this.state.latitude);
    return (
        <View style={{flex:1}}>
        <View style={{flex:0.15,width:'50%',backgroundColor:'#EE8709',
        marginLeft:'25%',marginRight:'25%'}}>
        {/* <TouchableHighlight onPress={() => this.openSearchModalInput()}> */}
        <Text numberOfLines={1} ref={ref => { this.txtInput = ref; }}
        style={styles.baseText} onPress={() => this.openSearchModalInput()}>{this.state.inputAddress}</Text>
        {/* </TouchableHighlight> */}
        {/* <TouchableHighlight onPress={() => this.openSearchModalOutput()}> */}
        <Text numberOfLines={1}  ref={ref => { this.txtOutput = ref; }}
        style={styles.baseText} onPress={() => this.openSearchModalOutput()}>{this.state.outputAddress}</Text>
        {/* </TouchableHighlight> */}
      </View>
     
        <MapView
        ref={ref => { this.map = ref; }}
      style={{flex: 1, alignSelf: 'stretch', }}
      onRegionChange={this._handleMapRegionChange}
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
    onMapReady={() => {
      if (
        this.state.moveToUserLocation &&
        this.props.userLocation.data.coords &&
        this.props.userLocation.data.coords.latitude
      ) {
        this._gotoCurrentLocation();
        this.state.moveToUserLocation = false;
      }
    }}
    // onRegionChangeComplete={region => {this._gotoCurrentLocation()}}
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

      <MapView.Marker 
        title={'Hi'}
        style={{
          width: 20,
          height: 20
        }}
        // image={require('../FastGo/Images/my_location.png')}
        coordinate={{ latitude: this.state.latitudeOutput,
         longitude: this.state.longitudeOutput,
         latitudeDelta: 0.0922,
      longitudeDelta: 0.0421 }}/>
{/* <MapViewDirections
    origin={{latitude: this.state.latitude, longitude: this.state.longitude}}
    destination={{latitude: this.state.latitudeOutput, longitude: this.state.longitudeOutput}}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="hotpink"
  />  */}
      <Polyline
		coordinates={[
			{ latitude: this.state.latitude, longitude: this.state.longitude },
			{ latitude: this.state.latitudeOutput, longitude: this.state.longitudeOutput }
		]}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>
      </MapView>
      <View style={{flex:0.07,width:'100%',backgroundColor:'#EE8709',flexDirection:'row'}}>
      <Text style={styles.baseText}>Loại xe:</Text>
      <Text style={styles.baseText}>Giá tiền:</Text>
      <View style={{flex:0.3}}
        >
        <Text style={styles.baseText}
        onPress={() => this.props.navigation.navigate('Profile')}
        >HO</Text>
        </View>
      </View>
      <View style={{flex:0.07,width:'100%',backgroundColor:'#EE8709',flexDirection:'row'}}>
      <TouchableOpacity
         style={styles.button}
         onPress={() => this.openSearchModalInput()}
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
  _gotoCurrentLocation() {
    console.log('ssssss '+this.state.latitude);
    this.map.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }

  openSearchModalInput() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
        console.log(place);
        this.setState({ 
          longitude: place.longitude,
          latitude: place.latitude,
          inputAddress: place.address,
        })
        this._gotoCurrentLocation();
        
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  fitMapFromLocation(){
    this.map.fitToCoordinates([
      { latitude: this.state.latitude, longitude: this.state.longitude },
      { latitude: this.state.latitudeOutput, longitude: this.state.longitudeOutput }
    ] , {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }

  openSearchModalOutput() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
        console.log(place);
        this.setState({ 
          longitudeOutput: place.longitude,
          latitudeOutput: place.latitude,
          outputAddress: place.address,
        })
        this.fitMapFromLocation();
        // this._gotoCurrentLocation();
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
        
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }
}

onPress = () => {
  this._gotoCurrentLocation()
  // this.setState({
  //   count: this.state.count+1
  // })
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
},
});