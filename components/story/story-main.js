import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	Image,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import Header from '../header/header-main';

import { FetchStories } from '../_api/stories/stories';

export default class StoryMain extends Component {
	state = {
		stories: [],
		loading: true
	};

	componentDidMount() {
		FetchStories().then(res => {
			if (res.error) {
				//console.log(res);
			} else {
				this.setState({ stories: res, loading: false });
			}
		}).catch(e => {
			//console.log(e);
		});
	}

	openStory = (story) => {
		this.props.navigation.navigate("StoryView", story);
	}

	renderStory = (story, i) => {
		return (
			<TouchableOpacity onPress={() => this.openStory(story)} key={i}>
				<View style={{ flexDirection: 'row', marginBottom: 10, elevation: 3, backgroundColor: '#fff', maxHeight: 100 }}>
					<Image style={{ height: 100, width: 100 }} source={{ uri: story.thumbnail }} />
					<View style={{ paddingHorizontal: 15, flex: 1 }}>
						<Text style={{ fontSize: 18, marginTop: 15, marginBottom: 10 }}>{story.title}</Text>
						<Text numberOfLines={3}>{story.description}</Text>
					</View>
				</View>
			</TouchableOpacity>

		)
	}

	render() {
		//console.log(this.state);
		return (
			<View style={{ flex: 1, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
				{this.state.loading ? (
					<ActivityIndicator size={'large'} animating={true} />
				) : (
						<ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 15, width: Dimensions.get('window').width }}>
							{this.state.stories.map((story, i) => {
								return this.renderStory(story, i);
							})}
						</ScrollView>
					)}
			</View>
		)
	}
}