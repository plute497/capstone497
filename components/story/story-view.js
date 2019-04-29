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
	FlatList
} from "react-native";

import Colors from "../colors";

const { width, height } = Dimensions.get("window");

export default class StoryView extends Component {
	state = {
		loaded: false
	};

	playing = false;

	animatedHeight = new Animated.Value(height);
	animatedPosition = new Animated.Value(-10);

	componentDidMount() {
		let { params } = this.props.navigation.state;

		this.setState({ loaded: true }, () => {
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
					backgroundColor: Colors.black
				}}>
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
					backgroundColor: Colors.black
				}}>
				<Image
					style={{ flex: 1 }}
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
					renderItem={this.renderItem}
					keyExtractor={(item, i) => String(i)}
					pagingEnabled={true}
					horizontal={true}
					removeClippedSubviews={true}
					getItemLayout={(data, index) => ({
						length: width,
						offset: width * index,
						index
					})}
					initialNumToRender={2}
					windowSize={2}
					maxToRenderPerBatch={2}
					progressViewOffset={2}
					contentContainerStyle={{ backgroundColor: Colors.black }}
				/>
			</View>
		) : null;
	}
}
