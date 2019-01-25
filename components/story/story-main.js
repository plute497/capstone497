import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class StoryMain extends Component {
    openStory = () => {
        this.props.navigation.navigate("StoryView");
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Story List</Text>
                <Button onPress={this.openStory} title="Go to story" />
            </View>
        )
    }
}