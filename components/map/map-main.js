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
	WebView
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import Header from '../header/header-main';

// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const { height, width } = Dimensions.get('window');

const access_token = "sk.eyJ1IjoiY2FyZC1iIiwiYSI6ImNqdHJzcTJpaTB0azM0ZG0yYWxnNGhicTgifQ.jO1HLoCY0hE27lpd7kPTGA";

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
			zoom: 15.5
		});

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
				map.flyTo({ center: [long, lat] });

			} catch (e) {
				console.log(e);
			}
		});

	</script>
</body>
`;

export default class MapMain extends Component {
	state = {
		contextTop: height - 130
	};



	_mapOptions = Object.keys(MapboxGL.StyleURL).map(key => {
		return {
			label: key,
			data: MapboxGL.StyleURL[key],
		};
	}).sort(onSortOptions);

	componentDidMount() {
		console.log(this._mapOptions);

		setInterval(() => {
			this.webview.postMessage(JSON.stringify({ lat: 45.626765, long: -122.674841 }));
		}, 3000);
	}

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

			</View>
		)
	}
}