import React, { Component, Fragment } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroARSceneNavigator,
    ViroSphere,
    ViroMaterials,
    ViroOmniLight,
    ViroBox,
    ViroARPlane
} from 'react-viro';

let api = "3D8F23E6-792C-4F66-B078-94EDB6E33A32";

export default class ArView extends Component {
    state = {
        text: "initializing ar"
    }

    componentDidMount() {
        console.log(ViroARScene);
    }

    _onInitialized(state, reason) {
        console.log('initialized');
        console.log(state, reason);
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: "Hello World!"
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }

    render() {
        return (
            <ViroARSceneNavigator
                initialScene={{
                    scene: ArScene,
                }}
                apiKey={api} />

        )
    }
}

export function ArScene() {
    return (
        <ViroARScene style={{ flex: 1 }} onTrackingUpdated={this._onInitialized} >
            <ViroText text={"hello world3"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            <ViroARPlane>
                <ViroBox position={[0, .5, 0]} />
            </ViroARPlane>
        </ViroARScene>
    )
}

ViroMaterials.createMaterials({
    grid: {
        shininess: 2.0,
        lightingModel: "Lambert",
        diffuseColor: "#ff00ff",
    }
});

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});
