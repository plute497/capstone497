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
    SafeAreaView
} from 'react-native';

import Chip from '../ui-components/chip';

import { FetchAudio } from '../_api/audio/audio';

export default class AudioMain extends Component {
    state = {
        audio: [],
        loading: true
    };

    componentDidMount() {
        FetchAudio().then(res => {
            if(res.error) {
                console.log(res);
            } else {
                this.setState({audio: res, loading: false});
            }
        }).catch(e => {
            console.log(e);
        });
    }

    openAudio = (audio) => {
        this.props.navigation.navigate("AudioView", audio);
    }

    renderAudio = (audio, i) => {
        return (
            <Chip
                onPress={this.openAudio}
                thumbnail={audio.thumbnail}
                title={audio.title}
                description={audio.description}
                key={'audio_' + i}
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center'}}>
                {this.state.loading ? (
                    <ActivityIndicator size={'large'} animating={true} />
                ) : (
                    <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 15, width: Dimensions.get('window').width}}>
                        {this.state.audio.map((audio, i) => {
                            return this.renderAudio(audio, i);
                        })}
                    </ScrollView>
                )}
            </SafeAreaView>
        )
    }
}