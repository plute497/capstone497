import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	Platform,
	Alert,
	Animated,
	Image,
	Linking
} from 'react-native';

import { WebView } from 'react-native-webview';

import GeoFence from './geo-fence';
import crosshairs from '../images/crosshairs-gps.png';
import Colors from '../colors';


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
		let bounds = new mapboxgl.LngLatBounds([-122.68101379537353, 45.61673251292356], [-122.66463567033702, 45.63848011716303]);
		
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/card-b/cju1tmxi71ojf1fo0ongxvlqq',
			center: [-122.671605, 45.627714],
			zoom: 16,
			pitch: 40,
			bearing: -25,
			minZoom: 10,
			maxBounds: bounds
		});

		let moving = false;

		map.on('moveend', () => {
			moving = false;
		});

		map.on('touchend', (e) => {
			window.ReactNativeWebView.postMessage(JSON.stringify(map.getCenter()));
		});

		// var options = {
		// 	enableHighAccuracy: false,
		// 	timeout: 5000,
		// 	maximumAge: 0
		// };

		// map.addControl(new mapboxgl.GeolocateControl({
		// 	positionOptions: {
		// 		enableHighAccuracy: true
		// 	},
		// 	trackUserLocation: true
		// }));

		document.addEventListener('message', function (data) {
			let { command, lat, long, bounds } = JSON.parse(data.data);

			try {
				if(command === "move") {
					if(!moving) {
						map.jumpTo({ center: [long, lat], zoom: 15, bearing: -25,  });
					}
				}

				if(command === "bounds") {
					window.ReactNativeWebView.postMessage(JSON.stringify(map.getBounds()))
				}
			} catch (e) {
				//console.log(e);
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
		mapMoved: false,
		currentCount: 16,
		url: 'about:blank',
		html: '<html><head></head><body><h1>Loading</h1></body></html>'
	};

	moved = false;
	bottom = new Animated.Value(0);

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {

				const lng = position.coords.longitude;
				const lat = position.coords.latitude;
				this.setState({ lat: lat, lng: lng }, () => {
					//console.log(lat, lng, this.geoFence);
					this.geoFence && this.geoFence.checkFences();
					this.webview && this.webview.postMessage(JSON.stringify({ command: "move", lat: lat, long: lng }));
				});
			},
			error => (e) => {
				//console.log("could not find position");
				//console.log(e);
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

	componentDidMount() {
		this.intervalId = setInterval(this.findCoordinates, 3000);
		// store intervalId in the state so it can be accessed later:

		setTimeout(() => {
			this.setState({ url: 'http://142.93.27.45:8080/map.html', html: html });
		}, 1000);
	};

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.intervalId);
	};

	/* timer = () => {
		// setState method is used to update the state

		//we don't need current count, just set the timer to a bigger interval, I think
		//this.setState({ currentCount: this.state.currentCount -1 });
		this.findCoordinates();
	 };*/

	contextOpen = false;

	openContext = () => {
		this.props.navigation.navigate("MapLocation", { name: 'elks' });
	}

	openDrawer = () => {
		this.props.navigation.openDrawer();
	}

	navigationChange = (e) => {
		if (e.url !== 'about:blank' && !e.url.includes('react-js-navigation') && !e.url.includes('142.93.27.45')) {
			this.webview.stopLoading();
			Linking.canOpenURL(e.url).then(supported => {
				if (supported) {
					Alert.alert("Confirm Leaving", `Are you sure you want to leave Historic Routes to visit ${e.url}?`, [{ text: 'Yes', onPress: () => Linking.openURL(e.url) }, { text: 'Cancel' }]);
				}
			});
		}
	}

	goToLocation = (name) => {
		alert("going to location");
		this.props.navigation.navigate("Site", { name: name });
	}

	mapMoved = (e) => {
		clearInterval(this.intervalId);
		this.setState({ mapMoved: true });
	}

	relocate = () => {
		this.findCoordinates();
		this.intervalId = setInterval(this.findCoordinates, 3000);
		this.setState({ mapMoved: false });
	}

	onMessage = (e) => {
		try {
			let data = JSON.parse(e.nativeEvent.data);
			if (data.lat) {
				this.setState({ lat: data.lat, lng: data.lng }, () => {
					this.geoFence && this.geoFence.checkFences();
				});
			}

			console.log(data);

			// //console.log(JSON.parse(e.nativeEvent.data));
		} catch (err) {
			//console.log(err);
		}
	}

	getBounds = () => {
		this.webview.postMessage(JSON.stringify({ command: "bounds" }));
	}

	render() {
		return this.props.screenProps.onboarded ? (
			<View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
			//onStartShouldSetResponder={e => //console.log('setResponder', e.nativeEvent)}
			//	onMoveShouldSetResponder={this.mapMoved}
			>

				<WebView
					style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
					geolocationEnabled={true}
					source={{ html: this.state.html }}
					//source={{ uri: this.state.url }}
					onMessage={this.onMessage}
					onNavigationStateChange={this.navigationChange}
					startInLoadingState={true}
					renderLoading={() => (<View><Text>Loading</Text></View>)}
					originWhitelist={['*']}
					ref={ref => this.webview = ref}
				/>
				{this.state.mapMoved ? (
					<TouchableOpacity
						style={{
							position: 'absolute',
							top: 15,
							right: 15,
							height: 40,
							width: 40,
							backgroundColor: Colors.white,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 25,
							shadowOffset: { width: 0, height: 3 },
							shadowOpacity: 0.2,
							shadowRadius: 3,
							elevation: 3
						}}
						hitSlop={{
							top: 15,
							left: 15,
							right: 15,
							bottom: 15
						}}
						onPress={this.relocate}>
						<Image
							source={crosshairs}
							style={{
								height: 20,
								width: 20,
								tintColor: Colors.black
							}}
							resizeMode={"contain"} />
					</TouchableOpacity>
				) : null}
				<GeoFence ref={ref => this.geoFence = ref} goToLocation={this.goToLocation} lng={this.state.lng} lat={this.state.lat} timer={this.state.currentCount} />
			</View>
		) : null;
	}
}