import React, { Component } from 'react';

import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet,
	FlatList
} from 'react-native';

import { locations } from './locations';
import Colors, { getColor } from '../colors';

import BackArts from '../images/sites/arts.png';
import BackCchm from '../images/sites/cchm.png';
import BackElks from '../images/sites/elks.png';
import BackEstherShort from '../images/sites/esthershort.png';
import BackEvergreen from '../images/sites/evergreen.png';
import BackHeritage from '../images/sites/heritage.png';
import BackHidden from '../images/sites/hidden.png';
import BackKiggins from '../images/sites/kiggins.png';
import BackProvidence from '../images/sites/providence.png';
import BackSchofield from '../images/sites/schofield.png';
import BackSlocum from '../images/sites/slocum.png';
import BackSmith from '../images/sites/smith.png';

const getImage = (name) => {
	switch (name) {
		case 'arts': return BackArts;
		case 'cchm': return BackCchm;
		case 'elks': return BackElks;
		case 'esther': return BackEstherShort;
		case 'evergreen': return BackEvergreen;
		case 'heritage': return BackHeritage;
		case 'hidden': return BackHidden;
		case 'kiggins': return BackKiggins;
		case 'providence': return BackProvidence;
		case 'schofield': return BackSchofield;
		case 'slocum': return BackSlocum;
		case 'smith': return BackSmith;
	}
}

const cleanText = (text) => {
	return text && text.replace(/ +(?= )/g, '').replace(/\s/g, " ").trim();
}

export default class LocationsList extends Component {
	state = {
		locations: []
	}

	componentDidMount() {
		//console.log(locations);
		this.setState({ locations: locations });
	}

	navigate = (item) => {
		this.props.navigation.navigate('Site', item);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.locations}
					keyExtractor={item => item.name}
					contentContainerStyle={{ paddingBottom: 60, paddingLeft: 15, paddingRight: 15, paddingTop: 15 }}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity onPress={() => this.navigate(item)} key={index} style={{ flexDirection: 'row', height: 100, borderBottomColor: Colors.lightGray, borderBottomWidth: StyleSheet.hairlineWidth }}>
								<View style={{ height: 85, width: 85, marginTop: 7.5, borderRadius: 6 }}>
									<Image source={getImage(item.name)} style={{ height: 85, width: 85, borderRadius: 6, position: 'absolute' }} resizeMode={'cover'} />
									<View style={[StyleSheet.absoluteFillObject, { backgroundColor: getColor(item.name), opacity: 0.6, borderRadius: 6 }]}></View>
								</View>
								<View style={{ flex: 1, padding: 7.5, paddingLeft: 15 }}>
									<Text style={{ color: getColor(item.name), fontFamily: 'Lato-Black', fontSize: 18 }}>{item.niceName}</Text>
									<Text numberOfLines={3} style={{ color: Colors.black, fontFamily: 'Lato-Light' }}>{cleanText(item.longDescription)}</Text>
								</View>
							</TouchableOpacity>
						)
					}} />
			</View>

		)
	}
}