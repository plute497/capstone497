import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class ArMain extends Component {
    openAr = () => {
        this.props.navigation.navigate("ArView");
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Ar List</Text>
                <Button onPress={this.openAr} title="Go to ar" />
            </View>
        )
    }
}