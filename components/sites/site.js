import React, { Component } from 'react';

import {
	View,
	Text,
	Animated,
	StyleSheet,
	TouchableOpacity,
	Easing,
	Image,
	Dimensions,
	ScrollView
} from 'react-native';

import Video from 'react-native-video';
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

import HeaderArts from '../images/sites/headers/arts.png';
import HeaderCchm from '../images/sites/headers/cchm.png';
import HeaderElks from '../images/sites/headers/elks.png';
import HeaderEstherShort from '../images/sites/headers/esthershort.png';
import HeaderEvergreen from '../images/sites/headers/evergreen.png';
import HeaderHeritage from '../images/sites/headers/heritage.png';
import HeaderHidden from '../images/sites/headers/hidden.png';
import HeaderKiggins from '../images/sites/headers/kiggins.png';
import HeaderProvidence from '../images/sites/headers/providence.png';
import HeaderSchofield from '../images/sites/headers/schofield.png';
import HeaderSlocum from '../images/sites/headers/slocum.png';
import HeaderSmith from '../images/sites/headers/smith.png';
import { isIphoneX } from 'react-native-iphone-x-helper';

import ArtsTitle from '../images/sites/arts-title.png';

import { locations, audioStories } from '../locations/locations';
import Chip from '../ui-components/chip';

const SplashArts = require('../videos/splash-arts-small.mp4');
const SplashCchm = require('../videos/splash-cchm-small.mp4');
const SplashElks = require('../videos/splash-elks-small.mp4');
const SplashEstherShort = require('../videos/splash-esthershort-small.mp4');
const SplashEvergreen = require('../videos/splash-evergreen-small.mp4');
const SplashHeritage = require('../videos/splash-heritage-small.mp4');
const SplashHidden = require('../videos/splash-hidden-small.mp4');
const SplashKiggins = require('../videos/splash-kiggins-small.mp4');
const SplashProvidence = require('../videos/splash-providence-small.mp4');
const SplashSchofield = require('../videos/splash-schofield-small.mp4');
const SplashSlocum = require('../videos/splash-slocum-small.mp4');
const SplashSmith = require('../videos/splash-smith-small.mp4');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const getVideo = (name) => {
	switch (name) {
		case 'arts': return SplashArts;
		case 'cchm': return SplashCchm;
		case 'elks': return SplashElks;
		case 'esther': return SplashEstherShort;
		case 'evergreen': return SplashEvergreen;
		case 'heritage': return SplashHeritage;
		case 'hidden': return SplashHidden;
		case 'kiggins': return SplashKiggins;
		case 'providence': return SplashProvidence;
		case 'schofield': return SplashSchofield;
		case 'slocum': return SplashSlocum;
		case 'smith': return SplashSmith;
	}
}

const getBackground = (name) => {
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

const getHeader = (name) => {
	switch (name) {
		case 'arts': return HeaderArts;
		case 'cchm': return HeaderCchm;
		case 'elks': return HeaderElks;
		case 'esther': return HeaderEstherShort;
		case 'evergreen': return HeaderEvergreen;
		case 'heritage': return HeaderHeritage;
		case 'hidden': return HeaderHidden;
		case 'kiggins': return HeaderKiggins;
		case 'providence': return HeaderProvidence;
		case 'schofield': return HeaderSchofield;
		case 'slocum': return HeaderSlocum; 
		case 'smith': return HeaderSmith;
	}
}

const getAudioStory = (name) => {
	return audioStories[name];
}

export default class Site extends Component {
	state = {
		showVideo: true,
		location: {
			niceName: ""
		}
	}

	videoRotation = new Animated.Value(0);
	mainScale = new Animated.Value(0);
	opacity = new Animated.Value(1);
	slowPan = new Animated.Value(0);
	planeOpacity = new Animated.Value(0);

	videoEnded = () => {
		Animated.sequence([
			Animated.timing(this.opacity, { toValue: 0, duration: 1000 }),
			Animated.timing(this.slowPan, { toValue: 1, duration: 3000, easing: Easing.linear }),
			Animated.parallel([
				Animated.timing(this.planeOpacity, { toValue: 1, duration: 1000 }),
				Animated.timing(this.videoRotation, { toValue: 1, duration: 1000 }),
				Animated.timing(this.mainScale, { toValue: 1, duration: 1000 }),
			])
		]).start(() => {
			this.setState({ showVideo: false });
		});
	}

	readMore = () => {
		this.props.navigation.navigate("SiteContent", { ...this.state.location });
	}

	componentDidMount() {
		let location = locations.find(loc => loc.name === this.props.navigation.state.params.name);
		location.content = location.content.map(item => {
			if (item.type === 'audio') {
				item.text = audioStories[location.name];
			}
			return item
		});
		this.setState({ location: location });
	}

	renderStats = () => {
		//console.log(this.state.location);
		return this.state.location.descriptions && this.state.location.descriptions.map(line => {
			return (
				<Text key={line[0]}>
					<Text style={{ fontFamily: 'Lato-Light', textTransform: 'capitalize', marginRight: 15, fontSize: 18 }}>{line[0]}</Text>
					<Text style={{ fontFamily: 'Lato-Regular', fontSize: 20, marginLeft: 15 }}>{line[1]}</Text>
				</Text>
			)
		})
	}

	boldLine = (text) => {
		let parts = text.split("");

		return (
			<View style={{ height: 75, justifyContent: 'space-between', flexDirection: 'row', padding: 0 }}>
				{parts.map((letter, i) => {
					return <Text key={letter + i} adjustsFontSizeToFit={true} minimumFontScale={0.1} style={{ marginTop: -15, marginBottom: -15, textTransform: 'uppercase', fontSize: 50, color: getColor(this.props.navigation.state.params.name), fontFamily: 'Lato-Black' }}>{letter}</Text>
				})}
			</View>
		)
	};

	liteLine = (text) => {
		let parts = text.split("");

		return (
			<View style={{ height: 75, justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
				{parts.map((letter, i) => {
					return <Text key={letter + i} adjustsFontSizeToFit={true} minimumFontScale={0.1} style={{ marginTop: -15, marginBottom: -15, textTransform: 'uppercase', fontSize: 50, color: getColor(this.props.navigation.state.params.name), fontFamily: 'Lato-Light' }}>{letter}</Text>
				})}
			</View>
		)
	};

	handleTitle = (text) => {
		let nameParts = text.split(" ");
		let line1;
		let line2;
		if (nameParts.length === 2) {
			line1 = this.boldLine(nameParts[0]);
		} else {
			line1 = this.boldLine(nameParts[0] + " " + nameParts[1]);
		}

		if (nameParts.length === 2) {
			line2 = this.liteLine(nameParts[1]);
		} else if (nameParts.length === 3) {
			line2 = this.liteLine(nameParts[2]);
		} else {
			line2 = this.liteLine(nameParts[2] + " " + nameParts[3]);
		}

		return (
			<View>{line1}{line2}</View>
		)
	}

	render() {
		const { location } = this.state;

		const vidRotation = this.videoRotation.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '180deg']
		});

		const otherRotation = this.videoRotation.interpolate({
			inputRange: [0, 1],
			outputRange: ['180deg', '360deg']
		});

		const firstPlaneOpacity = this.planeOpacity.interpolate({
			inputRange: [0, 0.25, 0.75, 1],
			outputRange: [1, 1, 0, 0]
		});

		const secondPlaneOpacity = this.planeOpacity.interpolate({
			inputRange: [0, 0.25, 0.75, 1],
			outputRange: [0, 0, 1, 1]
		});

		const slowPan = this.slowPan.interpolate({
			inputRange: [0, 1],
			outputRange: [-5, 5]
		});

		const scale = this.mainScale.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [1, 0.65, 1]
		});

		const { showVideo } = this.state;

		const { params } = this.props.navigation.state;
		const nameParts = location.niceName.split(" ");

		const getLine1 = () => {
			if (nameParts.length === 2) {
				return nameParts[0];
			} else {
				return nameParts[0] + " " + nameParts[1];
			}
		}

		const getLine2 = () => {
			if (nameParts.length === 2) {
				return nameParts[1];
			} else if (nameParts.length === 3) {
				return nameParts[2];
			} else {
				return nameParts[2] + " " + nameParts[3];
			}
		}

		const longDesc = () => {
			return location.longDescription && location.longDescription.replace(/ +(?= )/g, '').replace(/\s/g, " ").trim();
		}

		return (
			<View style={{ flex: 1, backgroundColor: Colors.lightGray }}>

				<Animated.View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backfaceVisibility: 'hidden',
						backgroundColor: Colors.white,
						opacity: firstPlaneOpacity,
						transform: [{ perspective: 500 }, { rotateY: vidRotation }, { scale: scale }]
					}}>
					<Animated.Image
						style={{ position: 'absolute', bottom: 0, left: -10, right: -10, width: '120%', top: 0, height: '100%', transform: [{ translateX: slowPan }] }}
						resizeMode={'cover'}
						source={getBackground(params.name)}
					/>
					<View style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%' }}>
						<Image source={getHeader(params.name)} style={{ height: 120, width: '100%', flex: 0, tintColor: getColor(params.name) }} resizeMode={'contain'} />
					</View>

				</Animated.View>
				<Animated.View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: secondPlaneOpacity,
						backgroundColor: Colors.white,
						transform: [{ perspective: 500 }, { rotateY: otherRotation }, { scale: scale }],
						backfaceVisibility: 'hidden'
					}}>
					<ScrollView style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: Colors.white
					}}>
						<Image source={getHeader(params.name)} style={{ height: 120, width: '100%', flex: 0, tintColor: getColor(params.name) }} resizeMode={'contain'} />
						<View style={{
							padding: 15,

						}}>
							{this.state.location.descriptions && this.state.location.descriptions.map((line, i) => {
								return (
									<Text key={i + line[0]}>
										<Text style={{ fontFamily: 'Lato-Light', textTransform: 'uppercase', marginRight: 15, fontSize: 16 }}>{line[0]} </Text>
										<Text style={{ fontFamily: 'Lato-Regular', fontSize: 20, marginLeft: 15 }}>   {line[1]}</Text>
									</Text>
								)
							})}

							<View style={{ flexDirection: 'row', marginTop: 15 }}>
								<View style={{ height: 2, alignSelf: 'center', flex: 1, borderTopWidth: 3, borderTopColor: getColor(params.name) }}></View>
								<View style={{ width: 15 }}></View>
								<Text style={{ fontSize: 22, fontFamily: 'Lato-Light', textTransform: 'uppercase' }}>Constructed In</Text>
							</View>

							<View style={{
								alignSelf: 'flex-end',
								borderBottomColor: getColor(params.name),
								borderBottomWidth: 2,
								color: getColor(params.name)
							}}>
								<Text style={{
									fontSize: 100,
									color: getColor(params.name),
									fontFamily: 'Lato-Black'
								}}>
									{location.year}
								</Text>
							</View>

							<Text
								style={{
									textAlign: 'justify',
									marginTop: 15,
									fontFamily: "Lato-Light",
									fontSize: 18
								}}>{location.longDescription}</Text>
						</View>
						<TouchableOpacity onPress={this.readMore} style={{ flex: 0, height: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
							<Text style={{ color: getColor(params.name), fontSize: 18, fontFamily: 'Lato-Bold' }}>Read More</Text>
							<Text style={{ color: getColor(params.name), fontSize: 18 }}>{"\u25BC"}</Text>
						</TouchableOpacity>
					</ScrollView>
				</Animated.View>

				{showVideo ? (
					<Animated.View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backfaceVisibility: 'hidden',
							backgroundColor: Colors.white,
							opacity: this.opacity
						}}>
						<Video
							onEnd={this.videoEnded}
							source={getVideo(params.name)}
							rate={1}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: Colors.white
							}}
						/>
					</Animated.View>
				) : null}

			</View>
		)
	}
}

