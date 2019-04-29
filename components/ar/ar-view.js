import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import {
	ViroARScene,
	ViroText,
	ViroConstants,
	ViroARSceneNavigator,
	ViroAmbientLight,
	ViroSphere,
	ViroMaterials,
	ViroOmniLight,
	Viro3DObject,
	ViroBox,
	ViroARPlane,
	ViroDirectionalLight
} from "react-viro";

const cowModel = require("../../res/cowObj.obj");
const cowFBX = require("../../res/cowFbx.vrx");
const cowTexture = require("../../res/cowTex.png");
const cowMaterial = require("../../res/cowMat.mtl");

const bookModel = require("../../res/bookmobileObj.obj");
const bookMaterial = require("../../res/bookmobileMat.mtl");

let api = "3D8F23E6-792C-4F66-B078-94EDB6E33A32";

export default class ArView extends Component {
	state = {
		text: "initializing ar"
	};

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

	render() {
		return (
			<ViroARSceneNavigator
				initialScene={{
					scene: BookScene
				}}
				apiKey={api}
			/>
		);
	}
}

export class BookScene extends Component {
	state = {
		text: "Loading"
	};

	_onInitialized = (state, reason) => {
		console.log("initialized");
		console.log(state, reason);
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text: "Hello World!"
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	};

	componentDidMount() {
		this.checkBox();
	}

	checkBox = () => {};

	render() {
		return (
			<ViroARScene
				style={{ flex: 1 }}
				onTrackingUpdated={this._onInitialized}>
				<ViroDirectionalLight color="#ffffff" direction={[0, -1, 0]} />
				<ViroAmbientLight color="#ffffff" intensity={100} />
				<Viro3DObject
					source={bookModel}
					ref={ref => (this.object = ref)}
					materials={["car1", "car2", "car3", "car4", "car5"]}
					resources={[bookMaterial]}
					position={[0, -10, -30]}
					rotation={[0, -150, 0]}
					scale={[1, 1, 1]}
					dragType={"FixedDistance"}
					type={"OBJ"}
				/>
				{/* <Viro3DObject
					source={cowFBX}
					ref={ref => (this.object = ref)}
					materials={"cow"}
					resources={[cowMaterial, cowTexture]}
					position={[-10, -10, -50]}
					rotation={[0, 45, 0]}
					scale={[10, 10, 10]}
					animation={{ name: "rigAction", run: true, loop: true }}
					type={"VRX"}
				/> */}
			</ViroARScene>
		);
	}
}

export class CowScene extends Component {
	state = {
		text: "Loading"
	};

	_onInitialized = (state, reason) => {
		console.log("initialized");
		console.log(state, reason);
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text: "Hello World!"
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	};

	componentDidMount() {
		this.checkBox();
	}

	checkBox = () => {};

	render() {
		return (
			<ViroARScene
				style={{ flex: 1 }}
				onTrackingUpdated={this._onInitialized}>
				<ViroDirectionalLight color="#ffffff" direction={[0, -1, 0]} />
				<ViroAmbientLight color="#ffffff" intensity={100} />
				<Viro3DObject
					source={cowModel}
					ref={ref => (this.object = ref)}
					materials={"cow"}
					resources={[cowMaterial, cowTexture]}
					position={[0, -1, -5]}
					rotation={[0, 45, 0]}
					scale={[1, 1, 1]}
					type={"OBJ"}
				/>
				{/* <Viro3DObject
					source={cowFBX}
					ref={ref => (this.object = ref)}
					materials={"cow"}
					resources={[cowMaterial, cowTexture]}
					position={[-10, -10, -50]}
					rotation={[0, 45, 0]}
					scale={[10, 10, 10]}
					animation={{ name: "rigAction", run: true, loop: true }}
					type={"VRX"}
				/> */}
			</ViroARScene>
		);
	}
}

ViroMaterials.createMaterials({
	grid: {
		shininess: 2.0,
		lightingModel: "Lambert",
		diffuseColor: "#ff00ff"
	},
	cow: {
		shininess: 1.0,
		lightingModel: "Lambert",
		diffuseTexture: cowTexture
	},
	car1: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#333333"
	},
	car2: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#555555"
	},
	car3: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#ffffff"
	},
	car4: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#0099ff"
	},
	car5: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#ffff00"
	}
});

var styles = StyleSheet.create({
	helloWorldTextStyle: {
		fontFamily: "Arial",
		fontSize: 30,
		color: "#ffffff",
		textAlignVertical: "center",
		textAlign: "center"
	}
});
