import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import LocationDrawer from './location-drawer';

export default class GeoFence extends Component {
	state = {
		foundLoc: false
// create a found location state variable, which react will monitor
	}

	locations = [
		{
			key: 1,
			name: 'Ester Short',
			lat: 45.626765,
			lng: -122.674841
		},
		{
			key: 2,
			name: 'Slocum House',
			lat: 45.626075,
			lng: -122.675758
		},
		{
			key: 3,
			name: 'Kiggins Theater',
			lat: 45.629400,
			lng: -122.671396
		},
		{
			key: 4,
			name: 'Smith Tower',
			lat: 45.625663,
			lng: -122.672605
		},
		{
			key: 5,
			name: 'Evergreen Hotel',
			lat: 45.625349,
			lng: -122.671862
		},
		{
			key: 6,
			name: 'Heritage Building',
			lat: 45.625854,
			lng: -122.671638
		},
		{
			key: 7,
			name: 'Schofield Building',
			lat: 45.625647,
			lng: -122.671682
		},
		{
			key: 8,
			name: 'Elks Building',
			lat: 45.628779,
			lng: -122.671746
		},
		{
			key: 9,
			name: 'Providence Academy',
			lat: 45.629956,
			lng: -122.667598
		},
		{
			key: 10,
			name: 'Hidden House',
			lat: 45.631393,
			lng: -122.67191
		},
		{
			key: 11,
			name: 'Clark County Historical Museum',
			lat: 45.633279,
			lng: -122.671241
		}
        /*{
            key: 12,
            name: 'Medical Arts Building',
            lat: 45.62,
            lng: -122.67
        }*/
	];

	componentDidUpdate(oldProps) {
		console.log(oldProps);
	}

	componentDidMount() {
		//setInterval will call checkFences every 4000ms, or every 4 seconds, we can set that number to whatever we think is appropriate
		var intervalId = setInterval(() => {
			this.checkFences();
		}, 4000);

		this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId);
	 };

	check_a_point = (a, b, x, y, r) => {
		var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
		r *= r;
		return((dist_points < r) ? true : false);
	}

	checkFences = () => {
		let foundLoc = this.locations.find(thisLocation => {
			if (this.check_a_point(this.props.lng, this.props.lat, thisLocation.lng, thisLocation.lat, 0.00001)) {
				return thisLocation;
			} else {
				return false;
			}
		});

		//if we have found a location, we set the state, which will update the location prop on LocationDrawer below
		if (foundLoc) {
			this.setState({ foundLoc: foundLoc });
		} else {
			this.setState({ foundLoc: null });
		}
	}

	render() {
		//if we have found a location, return the locationdrawer render
		if (this.state.foundLoc) 
			return (<LocationDrawer	location={this.state.foundLoc}/>);
		else
			return (null);
	}
}