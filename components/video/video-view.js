import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal,
    StyleSheet
} from 'react-native';

import Video from 'react-native-video';
import Colors from '../colors';

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

const width = Dimensions.get('window').width;

const getColor = (name) => {
    switch(name) {
        case 'arts': return Colors.blue;
        case 'cchm': return Colors.yellow;
        case 'elks': return Colors.yellow; 
        case 'esther': return Colors.green; 
        case 'evergreen': return Colors.green; 
        case 'heritage': return Colors.green; 
        case 'hidden': return Colors.red; 
        case 'kiggins': return Colors.red; 
        case 'providence': return Colors.red; 
        case 'schofield': return Colors.blue; 
        case 'slocum': return Colors.blue; 
        case 'smith': return Colors.yellow; 
    }
}

export default class VideoView extends Component {
    state = {
        thumbnail: null,
        title: "",
        description: "",
        location: "",
        showExtra: false,
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

    togglePaused = () => {
        //set paused to the opposive of itself - effectively toggling it on or off each time this function is called
        this.setState({paused: !this.state.paused});
    }

    closeModal = () => {
        this.setState({showExtra: false});
    }

    openModal = () => {
        this.setState({showExtra: true});
    }

    boldLine = (text) => {
        let parts = text.split("");

        return (
            <View style={{height: 60, justifyContent: 'space-between', flexDirection: 'row'}}>
                {parts.map(letter => {
                    return <Text adjustsFontSizeToFit={true} minimumFontScale={0.1} style={{textTransform: 'uppercase', fontSize: 55, color: Colors.white, fontFamily: 'Lato-Black'}}>{letter}</Text>
                })}
            </View>
        )
    };

    liteLine = (text) => {
        let parts = text.split("");

        return (
            <View style={{height: 75, justifyContent: 'space-between', flexDirection: 'row'}}>
                {parts.map(letter => {
                    return <Text adjustsFontSizeToFit={true} minimumFontScale={0.1} style={{textTransform: 'uppercase', fontSize: 55, color: Colors.white, fontFamily: 'Lato-Light'}}>{letter}</Text>
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
            <View>{line1}{line2}</View>
        )
    }

    render() {
        const imageSize = 150;
        const { params } = this.props.navigation.state;
        const cleanText = (text) => {
            return text && text.replace(/ +(?= )/g,'').replace(/\s/g, " ").trim();
        }

        return this.state.loaded ? (
            <View style={{flex: 1, backgroundColor: Colors.white}}>
                <View style={{height: 120, backgroundColor: Colors.blue}}>
                    {this.handleTitle(params.title)}
                </View>
                <View style={{flex: 1, padding: 15}}>
                    <Text style={{fontFamily: 'Lato-Light', fontSize: 25, textAlign: 'center', marginBottom: 15, textTransform: 'uppercase'}}>{this.state.title}</Text>
                    <View style={{flex: 0, flexDirection: 'row', marginBottom: 15, height: imageSize}}>
                        <View style={{paddingRight: 15, width: width - imageSize - 30}}>
                            <Text numberOfLines={5} style={{ fontSize: 18, fontFamily: 'Lato-Light'}}>{cleanText(params.content)}</Text>
                            <TouchableOpacity onPress={this.openModal} style={{height: 50, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)', flexDirection: 'row', alignSelf: 'center'}}>
                                <Text style={{color: getColor(params.name), fontSize: 18, fontFamily: 'Lato-Bold'}}>Read More</Text>
                                <Text style={{color: getColor(params.name), fontSize: 18}}>{"\u25BC"}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{backgroundColor: Colors.orange, width: imageSize, height: imageSize}}></View>
                    </View>
                    <View style={{backgroundColor: Colors.black, borderRadius: 6, overflow: 'hidden', flex: 0, height: width * (9/16)}}>
                        <Video 
                            source={{uri: this.state.location}}
                            ref={ref => this.video = ref}
                            paused={this.state.paused}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}
                            />
                        <TouchableOpacity 
                            style={{alignSelf: 'center', backgroundColor: '#fff'}}
                            onPress={this.togglePaused}><Text>{this.state.paused ? "PLAY" : "PAUSE"}</Text></TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.showExtra}
                    onRequestClose={() => {}}>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            backgroundColor: Colors.white,
                            borderRadius: 6,
                            padding: 15,
                            flex: 0,
                            margin: 50,
                            maxHeight: '50%',
                            shadowColor: Colors.black,
                            shadowOffset: { width: 0, height: 5},
                            shadowOpacity: 0.3,
                            shadowRadius: 50,
                        }}>
                            <TouchableOpacity style={{borderTopLeftRadius: 6, borderTopRightRadius: 6, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, right: 0, height: 50, backgroundColor: getColor(params.name)}} onPress={this.closeModal}>
                                <Text style={{color: Colors.white, fontSize: 18, fontFamily: 'Lato-Black'}}>Close</Text>
                            </TouchableOpacity>
                            <ScrollView style={{flex: 0, marginTop: 50}}>
                                <Text>{cleanText(params.content)}</Text>
                            </ScrollView>
                            
                        </View>
                    </View>
                </Modal>
            </View>
        ) : <View></View>
    }
}