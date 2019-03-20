import React, { Component, Fragment } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';

// import {
// 	ViroARScene,
// 	ViroText,
// 	ViroConstants,
// 	ViroARSceneNavigator,
// 	ViroAmbientLight,
// 	ViroSphere,
// 	ViroMaterials,
// 	ViroOmniLight,
// 	ViroBox,
// 	ViroARPlane,
// 	ViroDirectionalLight
// } from 'react-viro';

// let api = "3D8F23E6-792C-4F66-B078-94EDB6E33A32";

export default class ArView extends Component {
	// state = {
	//     text: "initializing ar"
	// }

	// componentDidMount() {
	//     console.log(ViroARScene);
	// }

	// _onInitialized(state, reason) {
	//     console.log('initialized');
	//     console.log(state, reason);
	//     if (state == ViroConstants.TRACKING_NORMAL) {
	//         this.setState({
	//             text: "Hello World!"
	//         });
	//     } else if (state == ViroConstants.TRACKING_NONE) {
	//         // Handle loss of tracking
	//     }
	// }

	// render() {
	//     return (
	//         <ViroARSceneNavigator
	//             initialScene={{
	//                 scene: ArScene,
	//             }}
	//             apiKey={api} />

	//     )
	// }
	render() {
		return <View></View>
	}
}

// export class ArScene extends Component {
//     state = {
//         text: "Loading"
//     }

//     _onInitialized = (state, reason) => {
//         console.log('initialized');
//         console.log(state, reason);
//         if (state == ViroConstants.TRACKING_NORMAL) {
//             this.setState({
//                 text: "Hello World!"
//             });
//         } else if (state == ViroConstants.TRACKING_NONE) {
//             // Handle loss of tracking
//         }
//     }

//     render() {
//         return (
//             <ViroARScene style={{ flex: 1 }} onTrackingUpdated={this._onInitialized} >
//                 <ViroDirectionalLight
//                     color="#ffffff"
//                     direction={[0, -1, 0]}
//                 />
//                 <ViroAmbientLight color="#ffffff" intensity={100} />
//                 <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
//                 <ViroBox materials={["grid"]} position={[0, .5, -2]} />
//                 <ViroSphere
//                     position={[1, 0.5, -2]}
//                     heightSegmentCount={20}
//                     widthSegmentCount={20}
//                     radius={0.5} materials={["grid"]} />
//             </ViroARScene>
//         )
//     }
// }

// ViroMaterials.createMaterials({
//     grid: {
//         shininess: 2.0,
//         lightingModel: "Lambert",
//         diffuseColor: "#ff00ff",
//     }
// });

// var styles = StyleSheet.create({
//     helloWorldTextStyle: {
//         fontFamily: 'Arial',
//         fontSize: 30,
//         color: '#ffffff',
//         textAlignVertical: 'center',
//         textAlign: 'center',
//     },
// });
