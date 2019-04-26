import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity
} from 'react-native';

import { locations } from '../locations/locations';
import Colors from '../colors';

export default class GeoFence extends Component {
	state = {
		foundLoc: false
		// create a found location state variable, which react will monitor
	}

	bottom = new Animated.Value(0);
	opacity = new Animated.Value(0);

	componentDidUpdate(oldProps) {
		// console.log(oldProps);
	}

	componentDidMount() {
		//setInterval will call checkFences every 4000ms, or every 4 seconds, we can set that number to whatever we think is appropriate
		// var intervalId = setInterval(() => {
		// 	this.checkFences();
		// }, 4000);

		// this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		// clearInterval(this.state.intervalId);
	};

	check_a_point = (a, b, x, y, r) => {
		var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
		r *= r;
		return ((dist_points < r) ? true : false);
	}

	check_a_point2 = (a, b, x, y, r) => {
		var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
		r *= r;
		return ((dist_points < r) ? dist_points : false);
	}

	checkFencesAlt = () => {
		let found = [];

	}

	checkFences = () => {
		let foundLoc = locations.find(thisLocation => {
			if (this.check_a_point(this.props.lng, this.props.lat, thisLocation.lng, thisLocation.lat, 0.0006)) {
				return thisLocation;
			} else {
				return false;
			}
		});

		//if we have found a location, we set the state, which will update the location prop on LocationDrawer below
		if (foundLoc) {
			this.setState({ foundLoc: foundLoc });
			this.showButton();
		} else {
			this.hideButton();
		}
	}

	showButton = () => {
		Animated.parallel([
			Animated.timing(this.opacity, { toValue: 1, duration: 500 }),
			Animated.timing(this.bottom, { toValue: 150, duration: 500 })
		]).start();
	}

	hideButton = () => {
		Animated.parallel([
			Animated.timing(this.opacity, { toValue: 0, duration: 500 }),
			Animated.timing(this.bottom, { toValue: 0, duration: 500 })
		]).start(() => this.setState({ foundLoc: null }));
	}

	goToLocation = () => {
		this.props.goToLocation(this.state.foundLoc.name);
	}

	render() {
		//if we have found a location, return the locationdrawer render
		return (
			<Animated.View style={{
				position: 'absolute', bottom: this.bottom, left: 0, right: 0, opacity: this.opacity, zIndex: 10
			}}>
				{this.state.foundLoc ? (
					<TouchableOpacity
						onPress={this.goToLocation}
						style={{
							position: 'absolute',
							left: 30,
							right: 30,
							backgroundColor: Colors.orange,
							alignItems: 'center',
							justifyContent: 'center',
							height: 60,
							borderRadius: 6,
							shadowOffset: { width: 0, height: 3 },
							shadowOpacity: 0.2,
							shadowRadius: 3,
							elevation: 3,
							zIndex: 11
						}}>
						<Text style={{ color: Colors.white, fontFamily: 'Lato-Black', fontSize: 18 }}>{this.state.foundLoc.niceName}</Text>
					</TouchableOpacity>
				) : null}
			</Animated.View>
		)
	}
}