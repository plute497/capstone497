import React, { PureComponent } from "react";

import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";

import Colors, { getColor } from "../colors";

import Chip from "../ui-components/chip";
import Card from "../ui-components/card";

export default class SiteContent extends PureComponent {
	handleContent = item => {
		let { params } = this.props.navigation.state;
		let { navigate } = this.props.navigation;

		if (item.type === "audio") {
			navigate("AudioView", {
				...item,
				locationData: params
			});
		}

		if (item.type === "video") {
			navigate("VideoView", { ...item, locationData: params });
		}

		if (item.type === "story") {
			navigate("StoryView", { ...item, locationData: params });
		}
	};

	renderChips = (item, i) => {
		let { params } = this.props.navigation.state;
		if (item.type === "audio") {
			return (
				<Card
					onPress={this.handleContent.bind(this, item)}
					uri={item.thumbnail}
					title={params.niceName + " Audio"}
					color={getColor(params.name)}
					description={item.text}
					key={params.name + "_" + i}
				/>
			);
		}

		if (item.type === "video") {

			return (
				<Card
					onPress={this.handleContent.bind(this, item)}
					uri={item.thumbnail}
					title={item.title}
					color={getColor(params.name)}
					description={item.text}
					key={params.name + "_" + i}
				/>
			);
		}

		if (item.type === "story") {
			return (
				<Card
					onPress={this.handleContent.bind(this, item)}
					uri={item.thumbnail}
					title={params.niceName + " Story"}
					color={getColor(params.name)}
					description={item.text}
					key={params.name + "_" + i}
				/>
			);
		}
	};

	render() {
		let { params } = this.props.navigation.state;
		console.log(params);

		return (
			<View style={{ flex: 1 }}>
				<ScrollView
					style={{ flex: 1, backgroundColor: Colors.lighterGray }}
					contentContainerStyle={{ padding: 15 }}>
					<Text
						style={{
							fontSize: 30,
							marginBottom: 15,
							fontFamily: "Lato-Black",
							color: getColor(params.name)
						}}>
						{params.niceName}
					</Text>
					{params.content.map(this.renderChips)}
				</ScrollView>
			</View>
		);
	}
}
