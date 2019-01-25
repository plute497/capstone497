import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class AudioView extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Audio View</Text>
            </View>
        )
    }
}