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
    Image,
    TouchableOpacity
} from 'react-native';

/**
 * here we are importing the navigation setup functions,
 * this is a third-party package that is set up to set this up for us
 */
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import Colors from './components/colors';
import menuIcon from './components/images/menu.png';
import closeIcon from './components/images/close.png';

import historicRoutesLogo from './components/images/historicRoutesLogo.png';
import arIcon from './components/images/ar.png';
import busIcon from './components/images/bus.png';
import clockIcon from './components/images/clock.png';
import handsetIcon from './components/images/handset.png';
import quillIcon from './components/images/quill.png';
import radioIcon from './components/images/radio.png';
import tvIcon from './components/images/television-classic.png';
import loginIcon from './components/images/login-variant.png';
import logoutIcon from './components/images/logout-variant.png';

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
import Site from './components/sites/site';
import SiteContent from './components/sites/site-content';

const listenerFunctions = [];
const onOpenDrawer = (func) => {
    listenerFunctions.forEach(func => func());
}

const addDrawerListener = (func) => {
    listenerFunctions.push(func);
}

class DrawerContent extends Component {
    componentDidMount(){
        addDrawerListener(this.toggleDrawer);
    }

    toggleDrawer = () => {
        if(!this.props.navigation.state.isDrawerOpen) {
            this.props.navigation.openDrawer();
        } else {
            this.props.navigation.closeDrawer();
        }
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    backgroundColor: Colors.white,
                    height: 140,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image style={{flex: 1, width: '100%'}} source={historicRoutesLogo} resizeMode={'contain'} />
                </View>

                <DrawerItems {...this.props} />
            </View>
        )        
    }
}

// const DrawerContent = (props) => {
//     console.log("DrawerContent", props);
//     return (
//         <View style={{ backgroundColor: 'red', height: 200 }}>
//             <View
//                 style={{
//                     backgroundColor: '#f50057',
//                     height: 140,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <Text style={{ color: 'white', fontSize: 30 }}>
//                     Header
//         </Text>
//             </View>
//             <DrawerItems {...props} />
//         </View>
//     )
// }
  

/**
 * Here's our parent navigator. It consist of our first route, our Tab Navigator,
 * and the other routes which will overdraw the tabs when we navigate to them
 * 
 * Details here: https://reactnavigation.org/docs/en/stack-navigator.html
 */
const generateIcon = (icon, tint) => {
    function getStyle() {
        if(tint) {
            return {
                height: 20,
                width: 20,
                tintColor: Colors.black
            }
        } else {
            return {
                height: 20,
                width: 20
            }
        }
    }
    return (
        <Image
            source={icon}
            style={getStyle()}
            resizeMode={'contain'}
        />
    )
}

const MainNav = createDrawerNavigator({
    Main: {
        screen: MapMain,
        navigationOptions: {
            title: "Let's Go",
            drawerIcon: generateIcon(busIcon)
        }
    },
    Video: {
        screen: VideoMain,
        navigationOptions: {
            title: "Videos",
            drawerIcon: generateIcon(tvIcon, true)
        }
    },
    Ar: {
        screen: ArMain,
        navigationOptions: {
            title: "Then & Now",
            drawerIcon: generateIcon(arIcon)
        }
    },
    Story: {
        screen: StoryMain,
        navigationOptions: {
            title: "Nowadays",
            drawerIcon: generateIcon(handsetIcon)
        }
    },
    Audio: {
        screen: AudioMain,
        navigationOptions: {
            title: "Audio",
            drawerIcon: generateIcon(radioIcon, true)
        }
    },
    SignUpIn: {
        screen: SignUpIn,
        navigationOptions: (props) => {
            //check if user is signed in
            if(props.screenProps.user.unset) {
                return {
                    title: "Sign Up/In",
                    drawerIcon: generateIcon(loginIcon, true)
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
            title: "Folktells",
            drawerIcon: generateIcon(quillIcon)
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
                    title: "Sign Out",
                    drawerIcon: generateIcon(logoutIcon, true)
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
        navigationOptions: (props) => {
            const { isDrawerOpen, isTransitioning, isDrawerIdle, drawerMovementDirection } = props.navigation.state;

            let shouldShowX = drawerMovementDirection === "opening" || isDrawerOpen && drawerMovementDirection !== "closing";

            return {
                title: "Historic Routes",
                headerStyle: {
                    backgroundColor: Colors.blue
                },
                headerTintColor: {
                    color: Colors.white
                },
                headerTitleStyle: {
                    color: Colors.white,
                    fontFamily: 'Lato-Black'
                },
                headerBackTitle: null,
                headerTruncatedBackTitle: null,
                headerLeft: (
                    <TouchableOpacity onPress={() => onOpenDrawer()}>
                        <Image style={{height: 27, width: 27, marginLeft: 12, tintColor: Colors.white}} resizeMode={'contain'} source={shouldShowX ? closeIcon : menuIcon} />
                    </TouchableOpacity>
                )
            }
        }
    },
    MapLocation: {
        screen: MapLocation,
        navigationOptions: {
            drawerLabel: () => null
        },
    },
    VideoView: {
        screen: VideoView,
        navigationOptions: (props) => ({
            title: props.navigation.state.params.niceName,
            headerBackTitle: props.navigation.state.params.niceName,
            headerTruncatedBackTitle: null
        })
    },
    AudioView: {
        screen: AudioView,
        navigationOptions: (props) => ({
            title: props.navigation.state.params.niceName,
            headerBackTitle: props.navigation.state.params.niceName,
            headerTruncatedBackTitle: null
        })
    },
    ArView: {
        screen: ArView,
        navigationOptions: {
            drawerLabel: () => null
        },
    },
    StoryView: {
        screen: StoryView,
        navigationOptions: (props) => ({
            title: props.navigation.state.params.niceName,
            headerBackTitle: props.navigation.state.params.niceName,
            headerTruncatedBackTitle: null,
            drawerLabel: () => null
        })
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
    },
    Site: {
        screen: Site,
        navigationOptions: {
            headerBackTitle: null,
            headerTruncatedBackTitle: null
        }
    },
    SiteContent: {
        screen: SiteContent,
        navigationOptions: (props) => ({
            title: props.navigation.state.params.niceName,
            headerBackTitle: props.navigation.state.params.niceName,
            headerTruncatedBackTitle: null
        })
    }
}, {
    mode: 'modal'
})

export const Navigator = createAppContainer(Main);