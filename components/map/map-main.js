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
	 Alert,
	 WebView
} from 'react-native';

import GeoFence from './geo-fence';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const { height, width } = Dimensions.get('window');

const html = `
<!DOCTYPE html>

<head>
	<script src='https://static-assets.mapbox.com/gl-pricing/dist/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
	<div id='map' style='position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px;'></div>
	<script>
		mapboxgl.accessToken = 'pk.eyJ1IjoiY2FyZC1iIiwiYSI6ImNqdG45bmVvYjA4Ymc0YW1xenR5YjE4dDgifQ.BSraC2WHncupQX8aWt_2dA';
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/card-b/cju1tmxi71ojf1fo0ongxvlqq',
			center: [-122.671605, 45.627714],
			zoom: 15.5,
			pitch: 40,
			bearing: -20
		});

		let moving = false;

		map.on('moveend', () => {
			moving = false;
		})

		var options = {
			enableHighAccuracy: false,
			timeout: 5000,
			maximumAge: 0
		};

		map.addControl(new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true
		}));

		document.addEventListener('message', function (data) {
			let { lat, long } = JSON.parse(data.data);

			try {
				if(!moving) {
					map.flyTo({ center: [long, lat] });
				}
			} catch (e) {
				console.log(e);
			}
		});

	</script>
</body>
`;

export default class MapMain extends Component {
	state = {
		contextTop: height - 130,
		lng: -122.672605,
		lat: 45.625663,
		currentCount: 16
	};


	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
		  position => {
			const lng = position.coords.longitude;
			const lat = position.coords.latitude;
			this.setState({ lat:lat, lng:lng }, () => {
				this.webview.postMessage(JSON.stringify({lat: lat, long: lng}));
			});
		  },
		  error => (e) => {
			  console.log(e);
		  },
		  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	  };

	componentDidMount(){
		const intervalId = setInterval(this.findCoordinates, 1000);
		// store intervalId in the state so it can be accessed later:
		this.setState({intervalId: intervalId});
	 };
	 
	 componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId);
	 };
	 
	/* timer = () => {
		// setState method is used to update the state

		//we don't need current count, just set the timer to a bigger interval, I think
		//this.setState({ currentCount: this.state.currentCount -1 });
		this.findCoordinates();
	 };*/

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
					style={{ flex: 1 }}
					geolocationEnabled={true}
					source={{ html: html }}
					ref={ref => this.webview = ref}
				/>
				<GeoFence lng={this.state.lng} lat={this.state.lat} timer={this.state.currentCount}/>
			</View>
		)
	}
}