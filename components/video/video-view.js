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

import Video from 'react-native-video';
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

export default class VideoView extends Component {
    state = {
        thumbnail: null,
        title: "",
        description: "",
        location: "",
        showExtra: false,
        loaded: false,
        paused: true,
        ended: false
    }

    fade = new Animated.Value(1);

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
        if(this.state.ended) {
            return this.replay();
        }
        
        this.setState({paused: !this.state.paused}, () => {
            if(this.state.paused) {
                Animated.timing(this.fade, {toValue: 1, duration: 500}).start();
            } else {
                setTimeout(() => {
                    Animated.timing(this.fade, {toValue: 0, duration: 500}).start();
                }, 1000);
            }
        });
    }

    closeModal = () => {
        this.setState({showExtra: false});
    }

    openModal = () => {
        this.setState({showExtra: true});
    }

    playing = () => {
        Animated.timing(this.fade, {toValue: 0, duration: 500}).start();
    }

    ended = () => {
        this.setState({paused: true, ended: true});
        Animated.timing(this.fade, {toValue: 1, duration: 500}).start();
    }

    replay = () => {
        this.video.seek(0);
        this.setState({ended: false, paused: false}, () => {
            Animated.timing(this.fade, {toValue: 0, duration: 500}).start();
        });
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
               <View style={{backgroundColor: Colors.black, overflow: 'hidden', flex: 0, height: width * (9/16)}}>
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
                        onEnd={this.ended}

                        />
                        <Animated.View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            opacity: this.fade,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} onPress={this.togglePaused}>
                            <TouchableOpacity 
                                style={{alignSelf: 'center'}}
                                hitSlop={{top: 50, left: 50, right: 50, bottom: 50}}
                                onPress={this.togglePaused}>
                                <Image source={videoIcon()} />
                            </TouchableOpacity>
                        </Animated.View>
                </View>
                <View style={{height: 120, backgroundColor: Colors.blue, width: '100%'}}>
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