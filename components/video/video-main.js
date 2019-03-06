import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    ActivityIndicator,
    ScrollView,
    TouchableNativeFeedback,
    Dimensions
} from 'react-native';

import Header from '../header/header-main';

import { FetchVideos } from '../_api/video/video';

const width = Dimensions.get('window').width;

export default class VideoMain extends Component {
    state = {
        videos: [],
        loading: true
    };

    componentDidMount() {
        FetchVideos().then(res => {
            if(res.error) {
                console.log(res);
            } else {
                this.setState({videos: res, loading: false});
            }
        }).catch(e => {
            console.log(e);
        });
    }

    openVideo = (video) => {
        this.props.navigation.navigate("VideoView", video);
    }

    renderVideo = (video, i) => {
        return (
            <TouchableNativeFeedback onPress={() => this.openVideo(video)} key={i}>
                <View style={{marginBottom: 15, elevation: 3, backgroundColor: '#fff'}}>
                    <Image style={{minHeight: 300, width: '100%'}} source={{uri: video.thumbnail}} />
                        
                        <View style={{paddingHorizontal: 15, flex: 1, backgroundColor: '#fff', paddingBottom: 15}}>
                            <Text style={{fontSize: 18, marginTop: 15, marginBottom: 10}}>{video.title}</Text>
                            <Text numberOfLines={3}>{video.description}</Text>
                        </View>
                </View>
                
            </TouchableNativeFeedback>
            
        )
    }

    render() {
        console.log(this.state);
        return (
            <View style={{flex: 1, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center'}}>
                {this.state.loading ? (
                    <ActivityIndicator size={'large'} animating={true} />
                ) : (
                    <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 15, width: Dimensions.get('window').width}}>
                        {this.state.videos.map((video, i) => {
                            return this.renderVideo(video, i);
                        })}
                    </ScrollView>
                )}
            </View>
        )
    }
}