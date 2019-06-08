import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import Colors from '../colors';
const { height, width } = Dimensions.get('window');

export default class GeoFence extends Component {
	state = {
		foundLoc: false
		// create a found location state variable, which react will monitor
	}

	bottom = new Animated.Value(-99);
	opacity = new Animated.Value(0);

	componentDidUpdate(oldProps) {
		//called when this component's props change
	}

	componentDidMount() {
		//called when this component first starts
	}

	componentWillUnmount() {
		//called when this component leaves
	};

	/**
	 * @param {Number} a device longitude
	 * @param {Number} b device latitude
	 * @param {Number} x longitude point to check
	 * @param {Number} y latitude point to check
	 * @param {Number} r radius of circle 
	 */
	check_a_point = (a, b, x, y, r) => {
		var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
		r *= r;
		return ((dist_points < r) ? true : false);
	}

	/**
	 * @param {Number} a device longitude
	 * @param {Number} b device latitude
	 * @param {Number} x longitude point to check
	 * @param {Number} y latitude point to check
	 */
	distance = (a, b, x, y) => {
		var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
		return dist_points;
	}

	reorderedLocations = () => {
		const { locations } = this.props;

		//create a new array from the locations list
		let locs = [...locations];

		//sort the locations by distance from user
		locs = locs.sort((a, b) => {
			//looks at two locations and gets distance for both
			let distA = this.distance(this.props.lng, this.props.lat, a.lng, a.lat);
			let distB = this.distance(this.props.lng, this.props.lat, b.lng, b.lat);

			//returns number of how far the two items are
			return distA - distB;
		});

		//return the sorted array
		return locs;
	}

	checkFences = () => {
		//gets locations sorted by distance, then returns the closest one inside the radius
		let foundLoc = this.reorderedLocations().find(thisLocation => {
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
			Animated.timing(this.bottom, { toValue: 0, duration: 500 })
		]).start();
	}

	hideButton = () => {
		Animated.parallel([
			Animated.timing(this.opacity, { toValue: 0, duration: 500 }),
			Animated.timing(this.bottom, { toValue: -99, duration: 500 })
		]).start(() => this.setState({ foundLoc: null }));
	}

	goToLocation = () => {
		this.props.goToLocation(this.state.foundLoc);
	}

	render() {
		//if we have found a location, return the locationdrawer render
		return (
			<Animated.View style={{
				position: 'absolute', bottom: this.bottom, left: 0, right: 0, height: 100, zIndex: 10, width: '100%'
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
							width: width - 60,
							zIndex: 11
						}}>
						<Text style={{ color: Colors.white, fontFamily: 'Lato-Black', fontSize: 18 }}>{this.state.foundLoc.niceName}</Text>
					</TouchableOpacity>
				) : null}
			</Animated.View>
		)
	}
}