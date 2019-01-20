import { Button, Text, View,StyleSheet, Dimensions,TouchableOpacity,TouchableHighlight,ActivityIndicator,Alert, } from 'react-native';
import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE,Marker,Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import RNGooglePlaces from 'react-native-google-places';
import Loader from './Loader';


const GOOGLE_MAPS_APIKEY = 'AIzaSyBqu8npUOIhk8RsyyQq2x_tRAwaEjj1GHE';
let ws;

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
      money:'',
      isLoading: false,
      DeviceIMEI: '',
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
    this.getDeviceIMEI();
    this.onGetMessageFromQueue();
    // ActiveMQ.connect( "topicName", "userid");
    
  }
  
  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }
  
  render() {
  //  console.log('ssssss '+this.state.latitude);
  if (this.state.isLoading) {
    return (
      <View style={{flex:1, paddingTop: 20,}}>
        {/* <Text style={styles.titleText}>FASTGO</Text>
          <Button style={styles.buttons}
          title="Bắt đầu"
          onPress={() => this.props.navigation.navigate('Maps')}
          /> */}
        {/* <ActivityIndicator /> */}
        <Loader
          loading={this.state.loading} />
      </View>
      
    );
  }
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
      <Text style={styles.baseText}>Loại xe: Xe máy</Text>
      <Text style={styles.baseText}>{'Giá tiền: ' + this.state.money}</Text>
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
         onPress={() => /*this.showDialogSendTrip()*/ this.onFetchLoginRecords()}
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
        
        this.setState({ 
          longitudeOutput: place.longitude,
          latitudeOutput: place.latitude,
          outputAddress: place.address,
        })
        this.fitMapFromLocation();
        this.getDataTrip();
        // this._gotoCurrentLocation();
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
        
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  getDataTrip(){
    return fetch('https://reactnativecode.000webhostapp.com/StudentsList.php')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              money:responseJson[0].student_phone_number,
            }, function() {
              // In this block you can do something with new state.
            //  this.showDialogResultTrip();
            });
            
          })
  }
  getResultDataTrip(){
    return fetch('https://reactnativecode.000webhostapp.com/StudentsList.php')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              money:responseJson[0].student_phone_number,
            }, function() {
              // In this block you can do something with new state.
             this.showDialogResultTrip();
            });
            
          })
  }
  sendDataMyTrip(){
    this.setState({ 
      isLoading: true,
    })
    this.getResultDataTrip();
  }

  showDialogSendTrip(){
    Alert.alert(
      'Bạn đã sẵn sàng !!!',
      'Chúng tôi sẽ tìm tài xế cho bạn ???',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.sendDataMyTrip()},
      ],
      { cancelable: false }
    )
  }

  showDialogResultTrip(){
    Alert.alert(
      'Xin chào !!!',
      'Lái xe đang trên đường đón bạn !',
      [
        {text: 'OK', onPress: () => console.log('Ok Pressed')},
      ],
      { cancelable: false }
    )
  }

  getDeviceIMEI = () => {
    const IMEI = require('react-native-imei')
    console.log("imei : "+IMEI.getImei());
    this.setState({
      DeviceIMEI: IMEI.getImei(),
    })
  }

  async onFetchLoginRecords() {
    var data = {
     "deviceOS": "android",
	"deviceId": this.state.DeviceIMEI,
	"deviceType": "driver",
	"author": "HiepNt"
    };
    console.log("data : "+data);
    try {
     let response = await fetch(
      "https://izktg7yj2f.execute-api.ap-southeast-1.amazonaws.com/dev/receive-device-info",
      {
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify(data)
     }
    );
    console.log("responseMQ : "+JSON.stringify(response));
     if (response.status >= 200 && response.status < 300) {
        alert("authenticated successfully!!!");
        // this._openWebSocket();
        this.onGetMessageFromQueue();
     }
   } catch (errors) {

     alert(errors);
    } 
}

async onFetchLogOutRecords() {
  var data = {
"deviceId": this.state.DeviceIMEI
  };
  try {
   let response = await fetch(
    "https://izktg7yj2f.execute-api.ap-southeast-1.amazonaws.com/dev/logout-device",
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }
  );
   if (response.status >= 200 && response.status < 300) {
      alert("logout successfully!!!");
      
   }
 } catch (errors) {

   alert(errors);
  } 
}

async onGetMessageFromQueue(){
  var client = Stomp.client( "wss://b-7e13e372-33b1-41cc-9c08-419bda9459a8-1.mq.ap-southeast-1.amazonaws.com:61619");
  client.connect( "activemqd1adm", "abcde12345-@",
   function() {
       client.subscribe("jms.topic.test",
        function( message ) {
            alert( message );
           }, 
     { priority: 9 } 
       );
    client.send("jms.topic.test", { priority: 9 }, "Pub/Sub over STOMP!");
   }
  );
}


_openWebSocket(){
  ws = new WebSocket('ws://b-7e13e372-33b1-41cc-9c08-419bda9459a8-1.mq.ap-southeast-1.amazonaws.com:61614', 'v10.stomp');

  ws.onopen = () => {

    var frame = "CONNECT\n"
            + "login: websockets\n";
            + "passcode: abcde12345-@\n";
            + "username: activemqd1adm\n";
            + "\n\n\0";
    ws.send(frame);
    // connection opened
    console.log("I openend the connection without troubles!");

    // First step is to try subscribe to the proper channel

    let payload = {
      command: 'subscribe',
      identifier: JSON.stringify({ channel: 'ConversationChannel' }),
      // data: JSON.stringify({ to: 'user', message: 'hi', action: 'chat' }),
    }

    let subscribe_command = JSON.stringify(payload)
    ws.send(subscribe_command); // send a message
  };

  ws.onmessage = (e) => {

    let data_received = JSON.parse(e.data)

    if (data_received.type !== "ping") {
      console.log("Data was received: ", data_received);

      if (data_received.message) {
        let custom_messages = []

        data_received.message.messages_raw.forEach( (single_message) => {
            // console.log(single_message);
            custom_messages.push(
              {
                _id: single_message.id,
                text: single_message.body,
                createdAt: new Date(single_message.created_at),
                user: {
                  _id: single_message.user_id,
                  name: (single_message.user_id === 3 ? 'User Three' : 'User One'),
                },
              }
            )

        });

        this.setState({
          messages: custom_messages.reverse()
        });
      }

    }

    // console.log("A message was received");
    // // a message was received
    // console.log(e.data);
  };

  ws.onerror = (e) => {
    console.log("There has been an error : ");

    // an error occurred
    console.log(e.message);
  };

  ws.onclose = (e) => {
    // connection closed
    console.log("I'm closing it");

    console.log(e.code, e.reason);
  };

}

async onFetchGetDataRecords() {
  var data = {
"deviceId": this.state.DeviceIMEI,
"author":  "TEST_MQ_123456789",
"deviceReceiveTime": "2018-12-18T08:20:52.837Z",
"deviceSendTime": "2018-12-18T08:21:52.837Z",
"data": "cocococococ - Test message",
"messageId": 77

  };
  try {
   let response = await fetch(
    "https://izktg7yj2f.execute-api.ap-southeast-1.amazonaws.com/dev/receive-message-info",
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }
  );
   if (response.status >= 200 && response.status < 300) {
      alert("getdata successfully!!!");
   }
 } catch (errors) {

   alert(errors);
  } 
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