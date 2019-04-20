import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Easing,
    Animated
} from 'react-native';

import Video from 'react-native-video';

const SplashArts = require('../videos/splash-arts-small.mp4');
const SplashCchm = require('../videos/splash-cchm-small.mp4');
const SplashElks = require('../videos/splash-elks-small.mp4');
const SplashEstherShort = require('../videos/splash-esthershort-small.mp4');
const SplashEvergreen = require('../videos/splash-evergreen-small.mp4');
const SplashHeritage = require('../videos/splash-heritage-small.mp4');
const SplashHidden = require('../videos/splash-hidden-small.mp4');
const SplashKiggins = require('../videos/splash-kiggins-small.mp4');
const SplashProvidence = require('../videos/splash-providence-small.mp4');
const SplashSchofield = require('../videos/splash-schofield-small.mp4');
const SplashSlocum = require('../videos/splash-slocum-small.mp4');
const SplashSmith = require('../videos/splash-smith-small.mp4');

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Site extends Component {
    state = {
        showVideo: true
    }

    videoRotation = new Animated.Value(0);
    mainRotation = new Animated.Value(0);

    videoEnded = () => {
        Animated.parallel([
            Animated.timing(this.videoRotation, {toValue: 1, duration: 750}),
            Animated.timing(this.mainRotation, {toValue: 1, duration: 750}),
        ]).start();
    }

    render() {
        const vidRotation = this.videoRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });

        const otherRotation = this.mainRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '0deg']
        });

        return (
            <View style={{flex: 1}}>
                <Animated.View
                    style={{
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0,
                        backfaceVisibility: 'hidden',
                        transform: [{perspective: 500}, {rotateY: vidRotation}]
                    }}>
                    <Video 
                        onEnd={this.videoEnded}
                        source={SplashArts}
                        style={{
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            backgroundColor: 'white'}} 
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0,
                        transform: [{perspective: 500}, {rotateY: otherRotation}],
                        backfaceVisibility: 'hidden'
                    }}>
                    <View style={{flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 40}}>Hello World!</Text>
                    </View>
                </Animated.View>
            </View>
        )
        
    }
}