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
            <TouchableNativeFeedback onPress={() => this.openAudio(audio)} key={i}>
                <View style={{flexDirection: 'row', marginBottom: 10, elevation: 3, backgroundColor: '#fff', maxHeight: 100}}>
                    <Image style={{height: 100, width: 100}} source={{uri: audio.thumbnail}} />
                    <View style={{paddingHorizontal: 15, flex: 1}}>
                        <Text style={{fontSize: 18, marginTop: 15, marginBottom: 10}}>{audio.title}</Text>
                        <Text numberOfLines={3}>{audio.description}</Text>
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
                        {this.state.audio.map((audio, i) => {
                            return this.renderAudio(audio, i);
                        })}
                    </ScrollView>
                )}
            </View>
        )
    }
}