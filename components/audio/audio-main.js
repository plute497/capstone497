import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class AudioMain extends Component {
    openAudio = () => {
        this.props.navigation.navigate("AudioView");
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Audio List</Text>
                <Button onPress={this.openAudio} title="Go to audio" />
            </View>
        )
    }
}