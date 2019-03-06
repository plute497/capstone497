import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

const width = Dimensions.get('window').width;

export default class VideoView extends Component {
    state = {
        thumbnail: null,
        title: "",
        description: "",
        location: "",
        loaded: false
    }
    componentDidMount() {
        let { navigation } = this.props;

        this.setState({
            thumbnail: navigation.getParam('thumbnail'),
            title: navigation.getParam('title'),
            description: navigation.getParam('description'),
            location: navigation.getParam('location'),
            loaded: true
        }, () => console.log(this.state.thumbnail));
    }
    render() {
        return this.state.loaded ? (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: '#000000', height: width * (9/16), width: width}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{padding: 15}}>
                        <Text style={{color: '#fff'}}>▼</Text>
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