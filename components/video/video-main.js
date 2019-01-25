import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class VideoMain extends Component {
    openVideo = () => {
        this.props.navigation.navigate("VideoView");
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Video List</Text>
                <Button onPress={this.openVideo} title="Go to video" />
            </View>
        )
    }
}