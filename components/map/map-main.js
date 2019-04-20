import React, { Component } from 'react';
import {
	View,
	Text,
	LayoutAnimation,
	Button,
	UIManager,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	Platform,
 	Alert
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import Header from '../header/header-main';
import GeoFence from './geo-fence';

import LocationDrawer from './location-drawer';


// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const { height, width } = Dimensions.get('window');

const access_token = "sk.eyJ1IjoiY2FyZC1iIiwiYSI6ImNqdHJzcTJpaTB0azM0ZG0yYWxnNGhicTgifQ.jO1HLoCY0hE27lpd7kPTGA";

//other access token?
//sk.eyJ1IjoiY2FyZC1iIiwiYSI6ImNqdHJzcTJpaTB0azM0ZG0yYWxnNGhicTgifQ.jO1HLoCY0hE27lpd7kPTGA



//public access token
//pk.eyJ1IjoiY2FyZC1iIiwiYSI6ImNqdG45bmVvYjA4Ymc0YW1xenR5YjE4dDgifQ.BSraC2WHncupQX8aWt_2dA

//historic routes map
//mapbox://styles/card-b/cju1tmxi71ojf1fo0ongxvlqq
//reg map
//mapbox://styles/card-b/cjukim3np5vm41ftqmnp4tpuc


MapboxGL.setAccessToken(access_token);

function onSortOptions(a, b) {
	if (a.label < b.label) {
		return -1;
	}

	if (a.label > b.label) {
		return 1;
	}

	return 0;
}

export default class MapMain extends Component {
	static navigationOptions = {
		drawerLabel: 'Map'
	};

	state = {
		contextTop: height - 130,
		lng: -122.672605,
		lat: 45.625663
		//currentCount: 16
	};

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
		  position => {
			const lng = position.coords.longitude;
			const lat = position.coords.latitude;
			this.setState({ lat:lat, lng:lng });
		  },
		  error => Alert.alert(error.message),
		  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	  };

	componentDidMount(){
		var intervalId = setInterval(this.timer, 1000);
		// store intervalId in the state so it can be accessed later:
		this.setState({intervalId: intervalId});
	 };
	 
	 componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId);
	 };
	 
	 timer = () => {
		// setState method is used to update the state

		//we don't need current count, just set the timer to a bigger interval, I think
		//this.setState({ currentCount: this.state.currentCount -1 });
		this.findCoordinates();
	 };

	contextOpen = false;

	openContext = () => {
		this.props.navigation.navigate("MapLocation");
	}

	openDrawer = () => {
		this.props.navigation.openDrawer();
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<WebView
        			source={{uri: 'https://github.com/facebook/react-native'}}
        			style={{marginTop: 20}}
      			/>
				<GeoFence lat={this.state.lat} lng={this.state.lng} />
			</View>
		)
	}
}