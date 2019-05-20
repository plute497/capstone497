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
	FlatList,
	ActivityIndicator
} from "react-native";

import Colors from "../colors";
import { Player, Recorder, MediaStates } from "react-native-audio-toolkit";


const { width, height } = Dimensions.get("window");

export default class StoryView extends Component {
	state = {
		loaded: false,
		removeClippedSubviews: false
	};

	playing = false;

	animatedHeight = new Animated.Value(height);
	animatedPosition = new Animated.Value(-10);
	audioPlayer = null;

	componentDidMount() {
		let { params } = this.props.navigation.state;

		console.log(params.location);
		if(params.location) {
			this.audioPlayer = new Player(params.location).play();
			console.log(this.audioPlayer);
		}

		this.setState({ loaded: true }, () => {
			setTimeout(() => {
				this.setState({removeClippedSubviews: true});
			}, 100);
		});
	}

	componentWillUnmount() {
		if (this.audioPlayer) {
			this.audioPlayer.stop();
			this.audioPlayer.destroy();
		}
	}

	renderImages = () => {
		return params.images.map((image, i) => {
			<View
				key={"image_" + i}
				style={{
					height: "100%",
					width: width,
					backgroundColor: Colors.black,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<ActivityIndicator
					size="small"
					color={Colors.white}
					animating={true} />
				<Image style={{ flex: 1 }} resizeMode={"contain"} />
			</View>;
		});
	};

	renderItem = ({ item }) => {
		console.log(item);
		return (
			<View
				style={{
					height: "100%",
					width: width,
					backgroundColor: Colors.black,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<ActivityIndicator
					size="small"
					color={Colors.lightGray}
					animating={true} />
				<Image
					style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%' }}
					onError={e => console.log(e)}
					source={{ uri: item }}
					resizeMode={"contain"}
				/>
			</View>
		);
	};

	render() {
		let { params } = this.props.navigation.state;

		return this.state.loaded ? (
			<View style={{ flex: 1 }}>
				<FlatList
					style={{ margin: 0 }}
					data={params.images}
					extraData={params.images}
					renderItem={this.renderItem}
					keyExtractor={(item, i) => String(i)}
					pagingEnabled={true}
					horizontal={true}
					removeClippedSubviews={this.state.removeClippedSubviews}
					getItemLayout={(data, index) => ({
						length: width,
						offset: width * index,
						index
					})}
					initialNumToRender={2}
					windowSize={2}
					maxToRenderPerBatch={2}
					progressViewOffset={1}
					contentContainerStyle={{ backgroundColor: Colors.black }}
				/>
			</View>
		) : null;
	}
}
