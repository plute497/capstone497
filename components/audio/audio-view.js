import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	Animated,
	Easing,
	StyleSheet
} from "react-native";

import { Player, Recorder, MediaStates } from "react-native-audio-toolkit";

import AudioImageCchm from "../sounds/images/cchm.jpg";
import AudioImageElks from "../sounds/images/elks.jpg";
import AudioImageEvergreen from "../sounds/images/evergreen.jpg";
import AudioImageHeritage from "../sounds/images/heritage.jpg";
import AudioImageProvidence from "../sounds/images/providence.jpg";
import AudioImageSchofield from "../sounds/images/schofield.jpg";
import AudioImageSmith from "../sounds/images/smith.jpg";

const getAudioImage = name => {
	switch (name) {
		case "cchm":
			return AudioImageCchm;
		case "elks":
			return AudioImageElks;
		case "evergreen":
			return AudioImageEvergreen;
		case "heritage":
			return AudioImageHeritage;
		case "providence":
			return AudioImageProvidence;
		case "schofield":
			return AudioImageSchofield;
		case "smith":
			return AudioImageSmith;
	}
};

const { width, height } = Dimensions.get("window");

const getAudio = name => {
	return "https://s3-us-west-2.amazonaws.com/cmdc-cchm/" + name + ".mp3";
};

export default class AudioView extends Component {
	state = {
		// loaded: false
	};

	playing = false;

	animatedHeight = new Animated.Value(height);
	animatedPosition = new Animated.Value(-10);

	componentDidMount() {
		let { params } = this.props.navigation.state;

		try {
			this.audioPlayer = new Player(getAudio(params.name)).play();
		} catch (e) {
			console.log(e);
		}

		Animated.sequence([
			Animated.timing(this.animatedPosition, {
				toValue: 0,
				duration: 3000,
				easing: Easing.linear
			}),
			Animated.timing(this.animatedHeight, {
				toValue: width,
				duration: 500
			})
		]).start();
	}

	toggleAudio = () => {
		//make sure this.audioPlayer (created above) exists before attempting to play
		if (this.audioPlayer) {
			//if the playing variable is false, we want to play it
			if (!this.playing) {
				//tells the audio player to play
				this.audioPlayer.play(error => {
					if (error) {
						//the audio couldn't be played, so we better tell the user an error has happened
						alert("Could not play audio file");
						return;
					}

					//now that it's playing, we set the variable to true
					this.playing = true;
				});
			} else {
				//the audio file IS playing, so we want to pause it
				this.audioPlayer.pause(error => {
					if (error) {
						alert("Could not pause audio file");
						return;
					}

					//sets playing to false so that the next time the user hits the button they'll resume playing
					this.playing = false;
				});
			}
		}
	};

	componentWillUnmount() {
		if (this.audioPlayer) {
			this.audioPlayer.stop();
			this.audioPlayer.destroy();
		}
	}

	linkToAr = () => {
		this.props.navigation.navigate("ArView", {
			name: this.props.navigation.state.params.name
		});
	};

	render() {
		let { params } = this.props.navigation.state;

		return (
			<View style={{ flex: 1 }}>
				<ScrollView
					style={{ margin: 0 }}
					contentContainerStyle={{ paddingBottom: 50 }}>
					<Animated.Image
						style={{
							position: "absolute",
							top: 0,
							left: -10,
							right: -10,
							width: width + 20,
							height: this.animatedHeight,
							transform: [{ translateX: this.animatedPosition }]
						}}
						resizeMode={"cover"}
						source={getAudioImage(params.name)}
					/>
					<Animated.Text
						style={{
							fontFamily: "Lato-Regular",
							lineHeight: 20,
							fontSize: 16,
							padding: 15,
							marginTop: this.animatedHeight,
							width: width - 15
						}}>
						{params.text}
					</Animated.Text>
					{params.linkToAr && (
						<TouchableOpacity
							onPress={this.linkToAr}
							style={{
								flex: 0,
								marginLeft: 30,
								marginTop: 15,
								marginRight: 30,
								backgroundColor: Colors.orange,
								alignItems: "center",
								justifyContent: "center",
								height: 60,
								borderRadius: 6,
								shadowOffset: { width: 0, height: 3 },
								shadowOpacity: 0.2,
								shadowRadius: 3,
								elevation: 3
							}}>
							<Text
								style={{
									color: Colors.white,
									fontFamily: "Lato-Black",
									fontSize: 18
								}}>
								View AR
							</Text>
						</TouchableOpacity>
					)}
				</ScrollView>
			</View>
		);
	}
}
