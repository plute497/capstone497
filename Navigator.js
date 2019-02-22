//this brings in the React code
import React, { Component } from 'react';

/**
 * these are native-specific elements we want to use
 * !!!everything you use in the view has to be imported
 */
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';

/**
 * here we are importing the navigation setup functions,
 * this is a third-party package that is set up to set this up for us
 */
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

/**
 * These are react components I've written where we'll put our content
 */
import MapMain from './components/map/map-main';
import AudioMain from './components/audio/audio-main';
import AudioView from './components/audio/audio-view';
import VideoMain from './components/video/video-main';
import VideoView from './components/video/video-view';
import ArMain from './components/ar/ar-main';
import ArView from './components/ar/ar-view';
import StoryMain from './components/story/story-main';
import StoryView from './components/story/story-view';
import ProfileView from './components/profile/profile-view';

/**
 * I have created a tiny react component here that does just one thing,
 * acts as our left button from our main route, the tabs
 */
const UserButton = (e) => {
    let nav = e.scene.descriptor.navigation;
    return (
        <TouchableOpacity 
            onPress={() => nav.navigate("UserMenu")}>
            <Text style={{marginLeft: 10, fontSize: 20}}>😊</Text>
        </TouchableOpacity>
    ); 
};

/**
 * Here is our main tabs, it's the first route in our "Card Stack" down below
 * and contains our 5 main components
 * 
 * Details here: https://reactnavigation.org/docs/en/tab-navigator.html
 */
const TabNavigator = createBottomTabNavigator({
    Map: MapMain,
    Video: VideoMain,
    Ar: ArMain,
    Story: StoryMain,
    Audio: AudioMain
});

/**
 * Here's our parent navigator. It consist of our first route, our Tab Navigator,
 * and the other routes which will overdraw the tabs when we navigate to them
 * 
 * Details here: https://reactnavigation.org/docs/en/stack-navigator.html
 */
const MainNav = createDrawerNavigator({
    Main: {
        screen: MapMain,
        navigationOptions: {
            title: "Historic Roots",
            headerLeft: UserButton
        }
    },
    Video: VideoMain,
    Ar: ArMain,
    Story: StoryMain,
    Audio: AudioMain,
    
    VideoView: {
        screen: VideoView,
        navigationOptions: {
            title: "Video"
        }
    },
    AudioView: {
        screen: AudioView,
        navigationOptions: {
            title: "Audio"
        }
    },
    ArView: {
        screen: ArView,
        navigationOptions: {
            title: "Augmented Reality"
        }
    },
    StoryView: {
        screen: StoryView,
        navigationOptions: {
            title: "Story"
        }
    },
    UserMenu: {
        screen: ProfileView,
        navigationOptions: {
            title: "User"
        }
    }
}, {
    drawerType: 'slide',
    drawerLockMode: 'unlocked'
});

export const Navigator = createAppContainer(MainNav);