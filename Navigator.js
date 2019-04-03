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
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';

/**
 * These are react components I've written where we'll put our content
 */
import MapMain from './components/map/map-main';
import MapLocation from './components/map/map-location';
import AudioMain from './components/audio/audio-main';
import AudioView from './components/audio/audio-view';
import VideoMain from './components/video/video-main';
import VideoView from './components/video/video-view';
import ArMain from './components/ar/ar-main';
import ArView from './components/ar/ar-view';
import StoryMain from './components/story/story-main';
import StoryView from './components/story/story-view';
import ProfileView from './components/profile/profile-view';
import SignIn from './components/profile/sign-in';
import SignOut from './components/profile/sign-out';
import SignUp from './components/profile/sign-up';
import SignUpIn from './components/profile/sign-up-in';
import SignUpSuccess from './components/profile/sign-up-success';
import SubmitStory from './components/profile/submit-story';

const listenerFunctions = [];
const onOpenDrawer = (func) => {
    listenerFunctions.forEach(func => func());
}

const addDrawerListener = (func) => {
    listenerFunctions.push(func);
}

class DrawerContent extends Component {
    componentDidMount(){
        addDrawerListener(this.props.navigation.openDrawer);
    }

    render() {
        return (
            <DrawerItems {...this.props} />
        )        
    }
}
// const DrawerContent = (props) => {
//     console.log("DrawerContent", props);
//     return (
//     <View style={{backgroundColor: 'red', height: 200}}>
//       <View
//         style={{
//           backgroundColor: '#f50057',
//           height: 140,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 30 }}>
//           Header
//         </Text>
//       </View>
//       <DrawerItems {...props} />
//     </View>
//   )}
  


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
    SignUpIn: {
        screen: SignUpIn,
        navigationOptions: (props) => {
            //check if user is signed in
            if(props.screenProps.user.unset) {
                return {
                    title: "Sign Up/In"
                }
            } else {
                return {
                    drawerLabel: () => null
                }
            }
        }
    },
    SubmitStory: {
        screen: SubmitStory,
        navigationOptions: {
            title: "Submit Story"
        }
    },
    SignOut: {
        screen: SignOut,
        navigationOptions: (props) => {
            //check if user is signed in
            if(props.screenProps.user.unset) {
                return {
                    drawerLabel: () => null
                }
            } else {
                return {
                    title: "Sign Out"
                }
            }
        }
    }
}, {
    drawerType: 'slide',
    drawerLockMode: 'unlocked',
    contentComponent: DrawerContent
});

const Main = createStackNavigator({
    Root: {
        screen: MainNav,
        navigationOptions: () => ({
            title: "Historic Routes",
            headerLeft: (
                <TouchableOpacity onPress={() => onOpenDrawer()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            )
        })
    },
    MapLocation: {
        screen: MapLocation,
        navigationOptions: {
            drawerLabel: () => null
        },
    },
    VideoView: {
        screen: VideoView,
        navigationOptions: {
            header: null
        },
    },
    AudioView: {
        screen: AudioView,
        navigationOptions: {
            header: null
        },
    },
    ArView: {
        screen: ArView,
        navigationOptions: {
            drawerLabel: () => null
        },
    },
    StoryView: {
        screen: StoryView,
        navigationOptions: {
            drawerLabel: () => null
        },
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: (props) => ({
            drawerLabel: () => null
        })
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: (props) => ({
            drawerLabel: () => null
        })
    },
    SignUpSuccess: {
        screen: SignUpSuccess,
        navigationOptions: {
            drawerLabel: null
        }
    }
}, {
    mode: 'modal'
})

export const Navigator = createAppContainer(Main);