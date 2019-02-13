import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class VideoView extends Component {
    state = {
        title: ""
    }

    componentDidMount() {
        this.setState({title: this.props.navigation.getParam("title", "")});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Video View</Text>
                <Text>Title: {this.state.title}</Text>
            </View>
        )
    }
}