import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	Image,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	StyleSheet
} from 'react-native';

import Card from '../ui-components/card';

import { FetchVideos } from '../_api/video/video';

const width = Dimensions.get('window').width;

export default class VideoMain extends Component {
	state = {
		videos: [],
		loading: true
	};

	componentDidMount() {
		FetchVideos().then(res => {
			if (res.error) {
				//console.log(res);
			} else {
				this.setState({ videos: res, loading: false });
			}
		}).catch(e => {
			//console.log(e);
		});
	}

	openVideo = (video) => {
		this.props.navigation.navigate("VideoView", video);
	}

	renderVideo = (video, i) => {
		return (
			<Card
				onPress={this.openVideo}
				thumbnail={video.thumbnail}
				title={video.title}
				description={video.description}
				key={'video_' + i}
			/>
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
							{this.state.videos.map((video, i) => {
								return this.renderVideo(video, i);
							})}
						</ScrollView>
					)}
			</View>
		)
	}
}