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
    StyleSheet,
    StatusBar,
    Platform
} from 'react-native';

import Video from 'react-native-video';
import Colors, { getColor } from '../colors';

import PlayButton from '../images/play.png';
import PauseButton from '../images/pause.png';
import ReplayButton from '../images/replay.png';

const evergreenVideo = 'https://s3-us-west-2.amazonaws.com/cmdc-cchm/videos/evergreen-video.mp4';
const hiddenVideo = 'https://s3-us-west-2.amazonaws.com/cmdc-cchm/videos/hidden-video.mp4';
const slocumVideo = 'https://s3-us-west-2.amazonaws.com/cmdc-cchm/videos/slocum-video.mp4';
const kigginsVideo = 'https://s3-us-west-2.amazonaws.com/cmdc-cchm/videos/kiggins-video.mp4';

const getVideoPath = (name) => {
    switch(name) {
        case "evergreen": return evergreenVideo;
        case "hidden": return hiddenVideo;
        case "slocum": return slocumVideo;
        case "kiggins": return kigginsVideo;
    }
}

const width = Dimensions.get('window').width;

export default class VideoView extends Component {
    state = {
        showExtra: false,
        loaded: false,
        paused: true,
        fullscreen: false,
        ended: false
    }

    fade = new Animated.Value(1);

    componentDidMount() {
        Dimensions.addEventListener('change', this.handleOrientation);
        this.setState({loaded: true});
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.handleOrientation);
    }

    handleOrientation = (e) => {
        if(Platform.OS === "android") {
            if(e.window.width > e.window.height) {
                if(this.video) {
                    this.props.navigation.setParams({hidden: true});
                    this.setState({fullscreen: true});
                    this.video.presentFullscreenPlayer();
                    StatusBar.setHidden(true, 'slide');
                }
            } else {
                if(this.video) {
                    this.props.navigation.setParams({hidden: false});
                    this.setState({fullscreen: false});
                    this.video.dismissFullscreenPlayer();
                    StatusBar.setHidden(false, 'slide');
                }
            }
        } else {
            if(e.window.width > e.window.height) {
                if(this.video) {
                    this.video.presentFullscreenPlayer();
                }
            } else {
                if(this.video) {
                    this.video.dismissFullscreenPlayer();
                }
            }
        }
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
                {!this.state.fullscreen && (
                    <View style={{height: 120, width: '100%', elevation: 10}}>
                        <Image source={{uri: params.locationData.backgroundImage}} resizeMode={'cover'} style={{position: 'absolute', height: '100%', width: '100%'}} />
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5, backgroundColor: getColor(params.locationData.name)}}></View>
                        <Image source={{uri: params.locationData.headerImage}} resizeMode={'contain'} style={{position: 'absolute', height: '100%', width: '100%'}} />
                    </View>
                )}
               <View style={{backgroundColor: Colors.black, elevation: 5, overflow: 'hidden', flex: this.state.fullscreen ? 1 : 0, height: this.state.fullscreen ? '100%' : width * (9/16)}}>
                    <Video 
                        source={{uri: params.location ? params.location : null}}
                        ref={ref => this.video = ref}
                        paused={this.state.paused}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: Colors.black
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
                {!this.state.fullscreen && (
                    <View style={{flex: 1, backgroundColor: Colors.lightGray}}>
                        <View style={{flex: 0, backgroundColor: Colors.darkGray, padding: 15}}>
                            <Text style={{fontFamily: 'Lato-Bold', color: Colors.lightGray, fontSize: 16, textAlign: 'center'}}>{params.title}</Text>
                        </View>
                    </View>
                )}
                
            </View>
        ) : <View></View>
    }
}