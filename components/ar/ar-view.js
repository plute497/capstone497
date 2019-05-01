import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";

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
	ViroDirectionalLight,
	ViroLightingEnvironment,
	Viro360Image
} from "react-viro";

import CloseIcon from '../images/close.png';
import Colors from '../colors';

const cowFBX = require("../../res/cowAnimationWalkidle.vrx");
// const cowTexture = require("../../assets/res/cow-text.png");
const bookModel = require("../../res/CCHMbookmobile.obj");
const bookMaterial = require("../../assets/res/CCHMbookmobile.mtl");

const concreteMoldModel = require('../../res/Concrete_Mold.obj');
const concreteSlabModel = require('../../res/Concrete_Slab.obj');
const smithTowerModel = require('../../res/Smith_Tower.obj');

const concreteMoldMateral = require('../../res/Concrete_Mold.mtl');
const concreteSlabMaterial = require('../../res/Concrete_Slab.mtl');
const smithTowerMaterial = require('../../res/Smith_Tower.mtl');

let api = "3D8F23E6-792C-4F66-B078-94EDB6E33A32";

export default class ArView extends Component {
	state = {
		show: true
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

	close = () => {
		this.setState({show: false}, () => {
			setTimeout(() => {
				this.props.navigation.goBack();
			}, 200);
		});
	}

	render() {
		return this.state.show ? (
			<View style={{flex: 1}}>
				<ViroARSceneNavigator
					initialScene={{
						scene: EmptyScene
					}}
					shadowsEnabled
					ref={ref => this.scene = ref}
					apiKey={api}
				/>
				<TouchableOpacity
						style={{
							position: 'absolute',
							top: 30,
							left: 15,
							height: 40,
							width: 40,
							backgroundColor: Colors.blue,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 25,
							shadowOffset: { width: 0, height: 3 },
							shadowOpacity: 0.2,
							shadowRadius: 3,
						}}
						hitSlop={{
							top: 15,
							left: 15,
							right: 15,
							bottom: 15
						}}
						onPress={this.close}>
						<Image
							source={CloseIcon}
							style={{
								height: 20,
								width: 20,
								tintColor: Colors.white
							}}
							resizeMode={"contain"} />
					</TouchableOpacity>
			</View>
			
		) : (
			<View style={{flex: 1, backgroundColor: '#fff'}}></View>
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

	onDragTower = ([x, y, z]) => {
		// this.tower.setNativeProps({
		// 	position: [0, y, -1]
		// });
	}

	render() {
		return (
			<ViroARScene
				style={{ flex: 1 }}
				displayPointCloud={true}>
				{/* <ViroDirectionalLight color="#ffffff" direction={[-1, -1, -1]} /> */}
				<ViroAmbientLight color="#ffffff" intensity={50} />

				<ViroOmniLight
					intensity={300}
					position={[-2, 3, 2]}
					color={"#FFFFFF"}
					attenuationStartDistance={20}
					attenuationEndDistance={30} />
				<ViroOmniLight
					intensity={300}
					position={[2, 2, -2]}
					color={"#FFFFFF"}
					attenuationStartDistance={20}
					attenuationEndDistance={30} />
				<Viro3DObject
					source={concreteMoldModel}
					ref={ref => (this.mold = ref)}
					materials={["mold"]}
					onDrag={this.onDragTower}
					resources={[concreteMoldMateral]}
					position={[0, -0.5, -1]}
					rotation={[0, 0, 0]}
					scale={[0.01, 0.01, 0.01]}
					type={"OBJ"}
				/>
				<Viro3DObject
					source={concreteSlabModel}
					ref={ref => (this.slab = ref)}
					materials={["concrete"]}
					onDrag={this.onDragTower}
					resources={[concreteMoldMateral]}
					position={[0, -0.5, -1]}
					rotation={[0, 0, 0]}
					scale={[0.009, 0.009, 0.009]}
					type={"OBJ"}
				/>
				<Viro3DObject
					source={smithTowerModel}
					onDrag={this.onDragTower}
					ref={ref => (this.tower = ref)}
					materials={["smithWindows", "smithBody", "concrete", "car6"]}
					resources={[smithTowerMaterial]}
					position={[0, -0.25, -1]}
					rotation={[0, 0, 0]}
					scale={[0.01, 0.01, 0.01]}
					type={"OBJ"}
				/>

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
					position={[0, -1.5, -5]}
					rotation={[0, -150, 0]}
					scale={[0.25, 0.25, 0.25]}
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
						resources={[{uri: 'https://s3-us-west-2.amazonaws.com/cmdc-cchm/ar/cow-texture.png'}]}
						position={[0, -1, -5]}
						rotation={[0, 25, 0]}
						scale={[0.0175, 0.0175, 0.0175]}
						animation={{ name: "idle", run: true, loop: true }}
						type={"VRX"}
					/>	
				</ViroARPlane>
			</ViroARScene>
		);
	}
}

ViroMaterials.createMaterials({
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
		shininess: 10.0,
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
	},
	smithWindows: {
		roughness: 0.0,
		metalness: 0.5,
		lightingModel: "PBR",
		diffuseColor: "#FFFFFF"
	  },
	  smithBody: {
		roughness: 0.9,
		metalness: 0.2,
		lightingModel: "PBR",
		diffuseColor: "#555555",
		roughnessTexture: require('../../res/ConcreteTexture.jpg')
	  },
	concrete: {
		shininess: 1.0,
		roughness: 1.0,
		lightingModel: "PBR",
		wrapS: "Repeat",
		wrapT: "Repeat",
		diffuseColor: "#555555",
		roughnessTexture: require('../../res/ConcreteTexture.jpg')
	},
	mold: {
		shininess: 1.5,
		lightingModel: "Lambert",
		diffuseColor: "#ccbb99"
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
