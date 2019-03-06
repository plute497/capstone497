import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';

const width = Dimensions.get('window').width;

export default class StoryView extends Component {
    state = {
        thumbnail: null,
        title: "",
        description: "",
        loaded: false
    }
    componentDidMount() {
        let { navigation } = this.props;

        this.setState({
            thumbnail: navigation.getParam('thumbnail'),
            title: navigation.getParam('title'),
            description: navigation.getParam('description'),
            loaded: true
        }, () => console.log(this.state.thumbnail));
    }
    render() {
        return this.state.loaded ? (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <ScrollView contentContainerStyle={{padding: 15}}>
                    <Text style={{fontSize: 24, marginBottom: 15}}>{this.state.title}</Text>
                    <Image style={{flex: 1, borderColor: 'red', borderWidth: 1, width: '100%', height: width, backgroundColor: 'red'}} source={{uri: this.state.thumbnail}} />
                    <Text style={{marginTop: 15}}>{this.state.description}</Text>
                </ScrollView>
            </View>
        ) : <View></View>
    }
}