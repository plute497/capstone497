import React, { PureComponent } from 'react';

import {
	View,
	Image,
	Text,
	TouchableOpacity,
	ScrollView
} from 'react-native';

import Colors from '../colors';

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

import AudioImageCchm from '../sounds/images/cchm.jpg';
import AudioImageElks from '../sounds/images/elks.jpg';
import AudioImageEvergreen from '../sounds/images/evergreen.jpg';
import AudioImageHeritage from '../sounds/images/heritage.jpg';
import AudioImageProvidence from '../sounds/images/providence.jpg';
import AudioImageSchofield from '../sounds/images/schofield.jpg';
import AudioImageSmith from '../sounds/images/smith.jpg';

import AudioCchm from '../sounds/cchm.mp3';
import AudioElks from '../sounds/elks.mp3';
import AudioEvergreen from '../sounds/evergreen.mp3';
import AudioHeritage from '../sounds/heritage.mp3';
import AudioProvidence from '../sounds/providence.mp3';
import AudioSchofield from '../sounds/schofield.mp3';
import AudioSmith from '../sounds/smith.mp3';

import Chip from '../ui-components/chip';

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

const getColor = (name) => {
	switch (name) {
		case 'arts': return Colors.blue;
		case 'cchm': return Colors.yellow;
		case 'elks': return Colors.yellow;
		case 'esther': return Colors.green;
		case 'evergreen': return Colors.green;
		case 'heritage': return Colors.green;
		case 'hidden': return Colors.red;
		case 'kiggins': return Colors.red;
		case 'providence': return Colors.red;
		case 'schofield': return Colors.blue;
		case 'slocum': return Colors.blue;
		case 'smith': return Colors.yellow;
	}
}

const getAudioImage = (name) => {
	switch (name) {
		case 'cchm': return AudioImageCchm;
		case 'elks': return AudioImageElks;
		case 'evergreen': return AudioImageEvergreen;
		case 'heritage': return AudioImageHeritage;
		case 'providence': return AudioImageProvidence;
		case 'schofield': return AudioImageSchofield;
		case 'smith': return AudioImageSmith;
	}
}

const getAudio = (name) => {
	switch (name) {
		case 'cchm': return AudioCchm;
		case 'elks': return AudioElks;
		case 'evergreen': return AudioEvergreen;
		case 'heritage': return AudioHeritage;
		case 'providence': return AudioProvidence;
		case 'schofield': return AudioSchofield;
		case 'smith': return AudioSmith;
	}
}


export default class SiteContent extends PureComponent {
	handleContent = (item) => {
		let { params } = this.props.navigation.state;
		let { navigate } = this.props.navigation;

		if (item.type === "audio") {
			navigate("AudioView", { ...item, name: params.name, location: getAudio(params.name) });
		}

		if (item.type === "video") {
			navigate("VideoView", { ...item, name: params.name });
		}

		if (item.type === "story") {
			navigate("StoryView", { ...item, name: params.name });
		}
	}

	renderChips = (item, i) => {
		//console.log(item);
		let { params } = this.props.navigation.state;
		if (item.type === "audio") {
			return (
				<Chip
					onPress={this.handleContent.bind(this, item)}
					thumbnail={getAudioImage(params.name)}
					title={params.niceName + " Audio"}
					color={getColor(params.name)}
					description={item.text}
					key={params.name + '_' + i}
				/>
			)
		}
	}

	render() {
		let { params } = this.props.navigation.state;
		//console.log(params);

		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1, backgroundColor: Colors.lighterGray }} contentContainerStyle={{ padding: 15 }}>
					<Text style={{ fontSize: 30, marginBottom: 15, fontFamily: "Lato-Black", color: getColor(params.name) }}>{params.niceName}</Text>
					{params.content.map(this.renderChips)}
				</ScrollView>

			</View>
		);
	}
}