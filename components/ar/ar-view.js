import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

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
const cowFBX = require("../../res/cowAnimationWalkidle.vrx");
const cowTexture = require("../../res/cowAnimationWalkidle.fbm/Final Texture.png");
const cowMaterial = require("../../res/cowMat.mtl");

const bookModel = require("../../res/CCHMbookmobile.obj");
const bookMaterial = require("../../res/CCHMbookmobile.mtl");
const bookFBX = require('../../res/CCHMbookmobile.vrx');

let api = "3D8F23E6-792C-4F66-B078-94EDB6E33A32";

export default class ArView extends Component {
	state = {
		text: "initializing ar"
	};

	componentDidMount() {
		const { params } = this.props.navigation.state;

		if(!params) return;

		if(params.name === "schofield") {
			return this.scene.jump({scene: CowScene});
		}

		if(params.name === "cchm") {
			return this.scene.jump({scene: BookScene});
		}

		if(params.name === "smith") {
			return this.scene.jump({scene: SmithScene});
		}
	}

	render() {
		return (
			<ViroARSceneNavigator
				initialScene={{
					scene: EmptyScene
				}}
				shadowsEnabled
				ref={ref => this.scene = ref}
				apiKey={api}
			/>
		);
	}
}

export class EmptyScene extends Component {
	render() {
		return (
			<ViroARScene
				displayPointCloud={true}
				style={{ flex: 1 }}>
			</ViroARScene>
		);
	}
}

export class SmithScene extends Component {
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
				displayPointCloud={true}
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

export class BookScene extends Component {
	state = {
		text: "Loading"
	};

	onDrag = ([x, y, z]) => {
		this.object.setNativeProps({
			position: [x, y, z]
		});
	}

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
					materials={["car1", "car2", "car3", "car4", "car5", "car6", "car7", "car8", "car9", "car10", "car11", "car12"]}
					resources={[bookMaterial]}
					position={[0, -5, -20]}
					rotation={[0, -150, 0]}
					scale={[1, 1, 1]}
					dragType={"FixedDistance"}
					type={"OBJ"}
					onDrag={this.onDrag}
				/>
			</ViroARScene>
		);
	}
}

export class CowScene extends Component {
	state = {
		text: "Loading"
	};

	_onInitialized = (state, reason) => {

	};

	componentDidMount() {
		this.checkBox();
	}

	checkBox = () => {};

	render() {
		return (
			<ViroARScene
				style={{ flex: 1 }}
				displayPointCloud={true}
				onTrackingUpdated={this._onInitialized}>
				<ViroDirectionalLight color="#ffffff" direction={[0, -1, 0]} />
				<ViroAmbientLight color="#ffffff" intensity={100} />
				<ViroARPlane
					minHeight={0.5}
					minWidth={0.5}
					alignment={"Horizontal"}>
					<Viro3DObject
						source={cowFBX}
						ref={ref => (this.object = ref)}
						//materials={"cow"}
						resources={[require("../../res/Final Texture.png")]}
						position={[0, -10, -20]}
						rotation={[0, 25, 0]}
						scale={[0.1, 0.1, 0.1]}
						animation={{ name: "idle", run: true, loop: true }}
						type={"VRX"}
					/>	
				</ViroARPlane>
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
		diffuseColor: "#aaaaaa"
	},
	car2: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#555555"
	},
	car3: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#ffffff"//body
	},
	car4: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#dddddd"
	},
	car5: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#ffffff"//lettering
	},
	car6: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#333333"
	},
	car7: {//trim
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#aaaaaa"
	},
	car8: {//tires
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#111111"
	},
	car9: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#dddddd"//grill
	},
	car10: {//headlights
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#ffff00"
	},
	car11: {//windows
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#9cccff"
	},
	car12: {
		shininess: 2.0,
		lightingModel: "Phong",
		diffuseColor: "#333333"
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
