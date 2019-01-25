import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class MapMain extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white'}}>Map View</Text>
            </View>
        )
    }
}