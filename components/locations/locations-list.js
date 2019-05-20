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

import Colors, { getColor } from '../colors';

const cleanText = (text) => {
	return text && text.replace(/ +(?= )/g, '').replace(/\s/g, " ").trim();
}

export default class LocationsList extends Component {
	state = {
		locations: []
	}

	componentDidMount() {
		console.log(this.props.screenProps.locations);
	}

	navigate = (item) => {
		this.props.navigation.navigate('Site', item);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.props.screenProps.locations}
					keyExtractor={item => item.name}
					contentContainerStyle={{ paddingBottom: 60, paddingLeft: 15, paddingRight: 15, paddingTop: 15 }}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity onPress={() => this.navigate(item)} key={index} style={{ flexDirection: 'row', minHeight: 100, borderBottomColor: Colors.lightGray, borderBottomWidth: StyleSheet.hairlineWidth }}>
								<View style={{ height: 85, width: 85, marginTop: 7.5, borderRadius: 6 }}>
									<Image source={{uri: item.backgroundImage}} style={{ height: 85, width: 85, borderRadius: 6, position: 'absolute' }} resizeMode={'cover'} />
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