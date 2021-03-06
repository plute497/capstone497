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
import PlayButton from '../images/play.png';
import PauseButton from '../images/pause.png';

const { width, height } = Dimensions.get("window");

export default class AudioView extends Component {
	state = {
		// loaded: false
		playing: false
	};

	playing = false;

	animatedHeight = new Animated.Value(height);
	animatedPosition = new Animated.Value(-10);

	componentDidMount() {
		let { params } = this.props.navigation.state;

		console.log(params.location);

		try {
			this.audioPlayer = new Player(params.location).play();
			this.setState({playing: true});
			this.playing = true;
		} catch (e) {
			console.log(e);
		}

        if(params.locationData.name !== "arts") {
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
						//alert("Could not play audio file");
						return;
					}

					//now that it's playing, we set the variable to true
					this.playing = true;
					this.setState({playing: true});
				});
			} else {
				//the audio file IS playing, so we want to pause it
				this.audioPlayer.pause(error => {
					if (error) {
						//alert("Could not pause audio file");
						return;
					}

					//sets playing to false so that the next time the user hits the button they'll resume playing
					this.playing = false;
					this.setState({playing: false});
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
		//stop playing the audio
		if (this.audioPlayer) {
			this.audioPlayer.stop();
		}

		//navigate to ar view, passing reference of which ar scene to load by name
		this.props.navigation.navigate("ArView", {
			name: this.props.navigation.state.params.locationData.name
		});
    };
    
    linkToVideo = () => {
		//get locations from screen props
		const { locations } = this.props.screenProps;

		//find this location in locations data
        let loc = locations.find(loc => loc.name === this.props.navigation.state.params.locationData.name);
		
		//find video content attached to this location
		let video = loc.content.find(con => con.type === "video");

		//navigate to videoView passing location data for this video and location
        this.props.navigation.navigate("VideoView", {...video, locationData: this.props.navigation.state.params.locationData});
    }

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
						source={{uri: params.thumbnail}}
					/>
					<Animated.View style={{alignSelf: 'center', paddingTop: 15, marginTop: this.animatedHeight}}>
						<TouchableOpacity 
							style={{
								height: 50, 
								width: 50, 
								backgroundColor: Colors.black, 
								alignItems: 'center', 
								justifyContent: 'center',
								borderRadius: 25,
								shadowOffset: { width: 0, height: 3 },
								shadowOpacity: 0.2,
								shadowRadius: 3,
								elevation: 3}}
								onPress={this.toggleAudio}>
							<Image 
								style={{height: 25,
									width: 25}}
								source={this.state.playing ? PauseButton : PlayButton} />
						</TouchableOpacity>
					</Animated.View>
					
					<Animated.Text
						style={{
							fontFamily: "Lato-Regular",
							lineHeight: 20,
							fontSize: 16,
							padding: 15,
							//marginTop: this.animatedHeight,
							width: width - 15
						}}>
						{params.text}
					</Animated.Text>
                    {params.linkToVideo && (
						<TouchableOpacity
							onPress={this.linkToVideo}
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
								View Video
							</Text>
						</TouchableOpacity>
					)}
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
