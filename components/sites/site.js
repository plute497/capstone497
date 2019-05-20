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
	ScrollView,
	ActivityIndicator
} from 'react-native';

import Video from 'react-native-video';
import Colors, { getColor } from '../colors';
import WhiteGradient from '../images/white-gradient.png';
import Chip from '../ui-components/chip';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const getAudioStory = (name) => {
	return audioStories[name];
}

export default class Site extends Component {
	state = {
		showVideo: true,
		location: {
			niceName: "",
			
		},
		canReadMore: true,
		loaded: false
	}

	videoRotation = new Animated.Value(0);
	mainScale = new Animated.Value(0);
	opacity = new Animated.Value(1);
	slowPan = new Animated.Value(0);
	planeOpacity = new Animated.Value(0);
	textHeight = new Animated.Value(height * 0.25);

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
		Animated.timing(this.textHeight, { toValue: 10000, duration: 1000}).start(() => {
			this.setState({canReadMore: false});
		});
	}

	goToContent = () => {
		this.props.navigation.navigate("SiteContent", { ...this.state.location });
	}

	componentDidMount() {
		const { locations, audioStories } = this.props.screenProps;

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
						source={{uri: params.backgroundImage}}
					/>
					<View style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%' }}>
						<Image source={{uri: params.headerImage}} style={{ height: 120, width: '100%', flex: 0, tintColor: getColor(params.name) }} resizeMode={'contain'} />
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
						<Image source={{uri: params.headerImage}} style={{ height: 120, width: '100%', flex: 0, tintColor: getColor(params.name) }} resizeMode={'contain'} />
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

							<Animated.Text
								style={{
									textAlign: 'justify',
									marginTop: 15,
									fontFamily: "Lato-Light",
									maxHeight: this.textHeight,
									fontSize: 18
								}}>{location.longDescription}</Animated.Text>
						</View>
						{this.state.canReadMore && <TouchableOpacity onPress={this.readMore} style={{ flex: 0, width: '100%', height: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: -25 }}>
							<Image source={WhiteGradient} style={{position: 'absolute', top: -70, left: 0, right: 0, bottom: 0, width: '100%'}} resizeMode={'stretch'} />
							<Text style={{ color: getColor(params.name), fontSize: 18, fontFamily: 'Lato-Bold' }}>Read More</Text>
							<Text style={{ color: getColor(params.name), fontSize: 18 }}>{"\u25BC"}</Text>
						</TouchableOpacity>}

						<TouchableOpacity style={styles.done} onPress={this.goToContent}>
							<Text style={styles.buttonText}>View Content</Text>
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
							opacity: this.opacity,
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Video
							onEnd={this.videoEnded}
							onLoad={() => this.setState({loaded: true})}
							source={{uri: params.splashVideo}}
							rate={2}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: Colors.white
							}}
						/>
						{!this.state.loaded ? (
							<ActivityIndicator
								animating={true}
								size={'large'}
								color={getColor(params.name)} />
						) : null}
					</Animated.View>
				) : null}

			</View>
		)
	}
}

const styles = StyleSheet.create({
	done: {
		width: '50%',
		borderRadius: 6,
		backgroundColor: Colors.red,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 7,
		height: 50,
		alignSelf: 'center',
		marginBottom: 50
	},
	buttonText: {
		fontSize: 18,
		color: Colors.white
	},
})