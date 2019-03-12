import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import {
    Player,
    Recorder,
    MediaStates
} from 'react-native-audio-toolkit';

const width = Dimensions.get('window').width;

export default class AudioView extends Component {
    state = {
        thumbnail: null,
        title: "",
        description: "",
        location: "",
        loaded: false
    }

    playing = false;

    componentDidMount() {
        let { navigation } = this.props;

        this.setState({
            thumbnail: navigation.getParam('thumbnail'),
            title: navigation.getParam('title'),
            description: navigation.getParam('description'),
            location: navigation.getParam('location'),
            loaded: true
        }, () => {
            //creates the audio player using the mp3's url
            this.audioPlayer = new Player(this.state.location);
        });
    }

    toggleAudio = () => {
        //make sure this.audioPlayer (created above) exists before attempting to play
        if(this.audioPlayer) {
            //if the playing variable is false, we want to play it
            if(!this.playing) {

                //tells the audio player to play
                this.audioPlayer.play((error) => {
                    if(error) {
                        //the audio couldn't be played, so we better tell the user an error has happened
                        alert('Could not play audio file');
                        return;
                    }

                    //now that it's playing, we set the variable to true
                    this.playing = true;
                });
            } else {//the audio file IS playing, so we want to pause it
                this.audioPlayer.pause((err) => {
                    if(error) {
                        alert('Could not pause audio file');
                        return;
                    }

                    //sets playing to false so that the next time the user hits the button they'll resume playing
                    this.playing = false;
                });
            }
            
        } 
    }

    componentWillUnmount() {
        if(this.audioPlayer) {
            this.audioPlayer.stop();
            this.audioPlayer.destroy();
        }
    }

    render() {
        return this.state.loaded ? (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: '#000000', height: 200, width: width}}>
                    <TouchableOpacity style={{position: 'absolute', top: 0, left: 0}} onPress={() => this.props.navigation.goBack()} style={{padding: 15}}>
                        <Text style={{color: '#fff'}}>▼</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.toggleAudio} style={{backgroundColor: 'white', padding: 15}}>
                        <Text>Play Audio</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{padding: 15}}>
                    <Text style={{fontSize: 24, marginBottom: 15}}>{this.state.title}</Text>
                    <Text style={{marginTop: 15}}>{this.state.description}</Text>
                </ScrollView>
            </View>
        ) : <View></View>
    }
}