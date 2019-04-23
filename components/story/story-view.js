import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal,
    Animated,
    StyleSheet
} from 'react-native';

import Colors, { getColor } from '../colors';

import BackArts from '../images/sites/arts.png';
import BackCchm from '../images/sites/cchm.png';
import BackElks from '../images/sites/elks.png';
import BackEstherShort from '../images/sites/esthershort.png';
import BackEvergreen from '../images/sites/evergreen.png';
import BackHeritage from '../images/sites/heritage.png';
import BackHidden from '../images/sites/hidden.png';
import BackKiggins from '../images/sites/kiggins.png';
import BackProvidence from '../images/sites/providence.png';
import BackSchofield from '../images/sites/schofield.png';
import BackSlocum from '../images/sites/slocum.png';
import BackSmith from '../images/sites/smith.png';
import PlayButton from '../images/play.png';
import PauseButton from '../images/pause.png';
import ReplayButton from '../images/replay.png';

const width = Dimensions.get('window').width;

export default class StoryView extends Component {
    state = {
        thumbnail: null,
        title: "",
        description: "",
        location: "",
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

    boldLine = (text) => {
        let parts = text.split("");

        return (
            <View style={{height: 75, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 0}}>
                {parts.map((letter, i) => {
                    return <Text key={letter + i} adjustsFontSizeToFit={true} minimumFontScale={0.1} style={{marginTop: -15, marginBottom: -15, textTransform: 'uppercase', fontSize: 50, color: Colors.white, fontFamily: 'Lato-Black'}}>{letter}</Text>
                })}
            </View>
        )
    };

    liteLine = (text) => {
        let parts = text.split("");

        return (
            <View style={{height: 75, justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                {parts.map((letter, i) => {
                    return <Text key={letter + i} adjustsFontSizeToFit={true} minimumFontScale={0.1} style={{marginTop: -15, marginBottom: -15, textTransform: 'uppercase', fontSize: 50, color: Colors.white, fontFamily: 'Lato-Light'}}>{letter}</Text>
                })}
            </View>
        )
    };

    handleTitle = (text) => {
        let nameParts = text.split(" ");
        let line1;
        let line2;
        if(nameParts.length === 2) {
            line1 = this.boldLine(nameParts[0]);
        } else {
            line1 = this.boldLine(nameParts[0] + " " + nameParts[1]);
        }

        if(nameParts.length === 2) {
            line2 = this.liteLine(nameParts[1]);
        } else if(nameParts.length === 3) {
            line2 = this.liteLine(nameParts[2]);
        } else {
            line2 = this.liteLine(nameParts[2] + " " + nameParts[3]);
        }

        return (
            <View style={{width: '100%'}}>{line1}{line2}</View>
        )
    }

    render() {
        const imageSize = 150;
        const { params } = this.props.navigation.state;
        const cleanText = (text) => {
            return text && text.replace(/ +(?= )/g,'').replace(/\s/g, " ").trim();
        }

        const videoIcon = () => {
            if(this.state.ended) {
                return ReplayButton;
            } else {
                if(this.state.paused) {
                    return PlayButton;
                } else {
                    return PauseButton;
                }
            }
        }

        return this.state.loaded ? (
            <View style={{flex: 1, backgroundColor: Colors.white}}>
                <View style={{height: 120, backgroundColor: getColor(params.name), width: '100%'}}>
                    {this.handleTitle(params.title)}
                </View>
                <View style={{flex: 1, padding: 15}}>
                    <Text style={{fontFamily: 'Lato-Light', fontSize: 25, textAlign: 'center', marginBottom: 15, textTransform: 'uppercase'}}>{this.state.title}</Text>
                    <View style={{flex: 0, flexDirection: 'row', marginBottom: 15, height: imageSize, flexWrap: 'wrap'}}>
                        <View style={{flex: 0, marginBottom: 15, backgroundColor: Colors.orange, width: '100%', height: width * (9/16)}}></View>
                        <Text style={{ fontSize: 18, fontFamily: 'Lato-Light'}}>{cleanText(params.content)}</Text>
                        
                    </View>
                </View>
            </View>
        ) : <View></View>
    }
}