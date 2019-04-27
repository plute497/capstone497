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
import HeaderArts from '../images/sites/headers/arts.png';
import HeaderCchm from '../images/sites/headers/cchm.png';
import HeaderElks from '../images/sites/headers/elks.png';
import HeaderEstherShort from '../images/sites/headers/esthershort.png';
import HeaderEvergreen from '../images/sites/headers/evergreen.png';
import HeaderHeritage from '../images/sites/headers/heritage.png';
import HeaderHidden from '../images/sites/headers/hidden.png';
import HeaderKiggins from '../images/sites/headers/kiggins.png';
import HeaderProvidence from '../images/sites/headers/providence.png';
import HeaderSchofield from '../images/sites/headers/schofield.png';
// import HeaderSlocum from '../images/sites/headers/slocum.png';
import HeaderSmith from '../images/sites/headers/smith.png';

const getBackground = (name) => {
	switch (name) {
		case 'arts': return BackArts;
		case 'cchm': return BackCchm;
		case 'elks': return BackElks;
		case 'esther': return BackEstherShort;
		case 'evergreen': return BackEvergreen;
		case 'heritage': return BackHeritage;
		case 'hidden': return BackHidden;
		case 'kiggins': return BackKiggins;
		case 'providence': return BackProvidence;
		case 'schofield': return BackSchofield;
		case 'slocum': return BackSlocum;
		case 'smith': return BackSmith;
	}
}

const getHeader = (name) => {
	switch (name) {
		case 'arts': return HeaderArts;
		case 'cchm': return HeaderCchm;
		case 'elks': return HeaderElks;
		case 'esther': return HeaderEstherShort;
		case 'evergreen': return HeaderEvergreen;
		case 'heritage': return HeaderHeritage;
		case 'hidden': return HeaderHidden;
		case 'kiggins': return HeaderKiggins;
		case 'providence': return HeaderProvidence;
		case 'schofield': return HeaderSchofield;
		// case 'slocum': return HeaderSlocum; 
		case 'smith': return HeaderSmith;
	}
}

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
                        <Image source={getBackground(params.name)} resizeMode={'cover'} style={{position: 'absolute', height: '100%', width: '100%'}} />
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5, backgroundColor: getColor(params.name)}}></View>
                        <Image source={getHeader(params.name)} resizeMode={'contain'} style={{position: 'absolute', height: '100%', width: '100%'}} />
                    </View>
                )}
               <View style={{backgroundColor: Colors.black, elevation: 5, overflow: 'hidden', flex: this.state.fullscreen ? 1 : 0, height: this.state.fullscreen ? '100%' : width * (9/16)}}>
                    <Video 
                        source={{uri: getVideoPath(params.name)}}
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
                    <View style={{flex: 1, padding: 15}}>
                        <Text style={{fontFamily: 'Lato-Light', fontSize: 25, textAlign: 'center', marginBottom: 15, textTransform: 'uppercase'}}>Title</Text>
                        <View style={{flex: 0, flexDirection: 'row', marginBottom: 15, height: imageSize}}>
                            <View style={{paddingRight: 15, width: width - imageSize - 30}}>
                                <Text numberOfLines={5} style={{ fontSize: 18, fontFamily: 'Lato-Light'}}>{cleanText(params.content)}</Text>
                                {/* <TouchableOpacity onPress={this.openModal} style={{height: 50, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)', flexDirection: 'row', alignSelf: 'center'}}>
                                    <Text style={{color: getColor(params.name), fontSize: 18, fontFamily: 'Lato-Bold'}}>Read More</Text>
                                    <Text style={{color: getColor(params.name), fontSize: 18}}>{"\u25BC"}</Text>
                                </TouchableOpacity> */}
                            </View>
                            
                            {/* <View style={{backgroundColor: Colors.orange, width: imageSize, height: imageSize}}></View> */}
                        </View>
                        
                    </View>
                )}
                
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.showExtra && !this.state.fullscreen}
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