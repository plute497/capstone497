import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class Header extends Component {
    render() {
        return (
            <View style={{height: 50, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text>Our App</Text>
            </View>
        )
    }
}