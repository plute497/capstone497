import React, { Component } from 'react';

import {
    View,
    Text,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
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
import BG from '../images/gradient-bg.png';

import ArtsTitle from '../images/sites/arts-title.png';

import { locations } from '../locations/locations';
import Chip from '../ui-components/chip';

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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const getVideo = (name) => {
    switch(name) {
        case 'arts': return SplashArts;
        case 'cchm': return SplashCchm;
        case 'elks': return SplashElks; 
        case 'esther': return SplashEstherShort; 
        case 'evergreen': return SplashEvergreen; 
        case 'heritage': return SplashHeritage; 
        case 'hidden': return SplashHidden; 
        case 'kiggins': return SplashKiggins; 
        case 'providence': return SplashProvidence; 
        case 'schofield': return SplashSchofield; 
        case 'slocum': return SplashSlocum; 
        case 'smith': return SplashSmith; 
    }
}

const getImage = (name) => {
    switch(name) {
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

const dummyCards = [
    {
        title: "Dummy Card 1",
        description: "Dummy Description",
        thumbnail: "https://dummyimage.com/640x4:3/f0f",
        type: 'video',
        location: "https://s3-us-west-2.amazonaws.com/columbia-pacific/front-page.mp4"
    },
    {
        title: "Dummy Card 2",
        description: "Dummy Description",
        thumbnail: "https://dummyimage.com/640x4:3/f0f",
        type: 'story',
        content: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Quisque sed sollicitudin metus. Quisque ut massa massa. Duis enim lectus, 
            ultrices eget ex congue, aliquet auctor est. In bibendum nulla et ipsum faucibus, 
            ut ultricies metus sagittis. Fusce dictum scelerisque odio vitae pellentesque. 
            Sed tempus libero sed maximus finibus. Proin a sollicitudin augue. 
            Donec magna felis, interdum a quam ac, mollis venenatis magna. Ut sed cursus urna. 
            Aenean turpis diam, luctus in eleifend at, pharetra a ante. 
            Phasellus sollicitudin arcu neque, sit amet tincidunt metus gravida quis. 
            Vestibulum posuere tellus non orci hendrerit, quis vestibulum lorem tincidunt. 
            Integer purus lacus, porttitor eu tristique vitae, pharetra sed mi. 
            Pellentesque imperdiet non magna nec elementum. Sed volutpat venenatis magna 
            in tincidunt. Nullam finibus et mi at malesuada.`
    },
    {
        title: "Dummy Card 3",
        description: "Dummy Description",
        thumbnail: "https://dummyimage.com/640x4:3/f0f",
        type: 'video',
        location: "https://s3-us-west-2.amazonaws.com/columbia-pacific/front-page.mp4"
    }
];


export default class Site extends Component {
    state = {
        showVideo: true,
        location: {
            niceName: ""
        }
    }

    videoRotation = new Animated.Value(0);
    mainScale = new Animated.Value(0);
    opacity = new Animated.Value(1);

    videoEnded = () => {
        Animated.sequence([
            Animated.timing(this.opacity, {toValue: 0, duration: 1000}),
            Animated.delay(3000),
            Animated.parallel([
                Animated.timing(this.videoRotation, {toValue: 1, duration: 1000}),
                Animated.timing(this.mainScale, {toValue: 1, duration: 1000}),
            ])
        ]).start(() => {
            this.setState({showVideo: false});
        });
    }

    readMore = () => {
        this.props.navigation.navigate("SiteContent", {...this.state.location, content: dummyCards });
    }

    componentDidMount() {
        let location = locations.find(loc => loc.name === this.props.navigation.state.params.name);
        this.setState({location: location});
    }

    renderStats = () => {
        console.log(this.state.location);
        return this.state.location.descriptions && this.state.location.descriptions.map(line => {
            return (
                <Text key={line[0]}>
                    <Text style={{fontFamily: 'Lato-Light', textTransform: 'capitalize', marginRight: 15, fontSize: 18}}>{line[0]}</Text>
                    <Text style={{fontFamily: 'Lato-Regular', fontSize: 20, marginLeft: 15}}>{line[1]}</Text>
                </Text>
            )
        })
    }

    render() {
        const { location } = this.state;

        const vidRotation = this.videoRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });

        const otherRotation = this.videoRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '360deg']
        });

        const scale = this.mainScale.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.65, 1]
        });

        const { showVideo } = this.state;

        const { params } = this.props.navigation.state;
        const nameParts = location.niceName.split(" ");

        const getLine1 = () => {
            if(nameParts.length === 2) {
                return nameParts[0];
            } else {
                return nameParts[0] + " " + nameParts[1];
            }
        }

        const getLine2 = () => {
            if(nameParts.length === 2) {
                return nameParts[1];
            } else if(nameParts.length === 3) {
                return nameParts[2];
            } else {
                return nameParts[2] + " " + nameParts[3];
            }
        }

        const longDesc = () => {
            return location.longDescription && location.longDescription.replace(/ +(?= )/g,'').replace(/\s/g, " ").trim();
        }

        return (
            <View style={{flex: 1, backgroundColor: Colors.lightGray}}>
                
                <Animated.View
                    style={{
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0,
                        backfaceVisibility: 'hidden',
                        transform: [{perspective: 500}, {rotateY: vidRotation}, {scale: scale}]
                    }}>
                        <Image
                            style={{position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', top: 0, height: '100%'}}
                            resizeMode={'cover'}
                            source={getImage(params.name)}
                        />
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%'}}>
                            <Text 
                                adjustsFontSizeToFit 
                                minimumFontScale={0.1} 
                                numberOfLines={1} 
                                style={{fontSize: 400, marginTop: -45, color: getColor(params.name), lineHeight: 0, fontFamily: 'Lato-Black', textTransform: 'uppercase'}}>
                                {getLine1()}
                            </Text>
                            <Text 
                                adjustsFontSizeToFit 
                                minimumFontScale={0.1} 
                                numberOfLines={1} 
                                style={{margin: 0, fontSize: 400,  color: getColor(params.name), marginTop: -65, fontFamily: 'Lato-Light', textTransform: 'uppercase'}}>
                                {getLine2()}
                            </Text>
                        </View>
                        
                </Animated.View>
                <Animated.View
                    style={{
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0,
                        backgroundColor: Colors.white,
                        transform: [{perspective: 500}, {rotateY: otherRotation}, {scale: scale}],
                        backfaceVisibility: 'hidden'
                    }}>
                    <View style={{position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        backgroundColor: Colors.white}}>
                        <Image style={{width: '100%', height: '17%'}} resizeMode={'contain'} source={ArtsTitle} />
                        <View style={{
                            padding: 15
                        }}>
                            {this.state.location.descriptions && this.state.location.descriptions.map(line => {
                                return (
                                    <Text key={line[0]}>
                                        <Text style={{fontFamily: 'Lato-Light', textTransform: 'uppercase', marginRight: 15, fontSize: 16}}>{line[0]} </Text>
                                        <Text style={{fontFamily: 'Lato-Regular', fontSize: 20, marginLeft: 15}}>   {line[1]}</Text>
                                    </Text>
                                )
                            })}

                            <View style={{flexDirection: 'row', marginTop: 15}}>
                                <View style={{height: 2, alignSelf: 'center', flex: 1, borderTopWidth: 3, borderTopColor: getColor(params.name)}}></View>
                                <View style={{width: 15}}></View>
                                <Text style={{fontSize: 22, fontFamily: 'Lato-Light', textTransform: 'uppercase'}}>Constructed In</Text>
                            </View>

                            <View style={{
                                alignSelf: 'flex-end', 
                                borderBottomColor: getColor(params.name), 
                                borderBottomWidth: 2, 
                                color: getColor(params.name)
                            }}>
                                <Text style={{
                                    fontSize: 100, 
                                    color: getColor(params.name), 
                                    fontFamily: 'Lato-Black'}}>
                                    {location.year}
                                </Text>
                            </View>

                            <Text
                                numberOfLines={13}
                                style={{
                                textAlign: 'justify',
                                marginTop: 15,
                                fontFamily: "Lato-Light",
                                fontSize: 18
                            }}>{longDesc()}</Text>
                        </View>
                        <TouchableOpacity onPress={this.readMore} style={{position: 'absolute', bottom: 30, left: 0, right: 0, height: 50, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)'}}>
                            <Text style={{color: getColor(params.name), fontSize: 18, fontFamily: 'Lato-Bold'}}>Read More</Text>
                            <Text style={{color: getColor(params.name), fontSize: 18}}>{"\u25BC"}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {showVideo ? (
                    <Animated.View
                        style={{
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0,
                            backfaceVisibility: 'hidden',
                            backgroundColor: Colors.white,
                            opacity: this.opacity
                        }}>
                        <Video 
                            onEnd={this.videoEnded}
                            source={getVideo(params.name)}
                            rate={2}
                            style={{
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                right: 0, 
                                bottom: 0, 
                                backgroundColor: Colors.white
                            }} 
                        />
                    </Animated.View>
                ) : null}
                
            </View>
        )
    }
}

