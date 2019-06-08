import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from "react-native";

import {
	ViroARScene,
	ViroText,
	ViroAnimations,
	ViroConstants,
	ViroARSceneNavigator,
	ViroAmbientLight,
	ViroSphere,
	ViroMaterials,
	ViroOmniLight,
	Viro3DObject,
	ViroBox,
	ViroARPlane,
	ViroQuad,
	ViroDirectionalLight,
	ViroLightingEnvironment,
	ViroNode,
	Viro360Image,
	ViroSurface,
	ViroARPlaneSelector,
	ViroSpatialSound,
	ViroFlexView
} from "react-viro";

import CloseIcon from '../images/close.png';
import Colors from '../colors';

const cowFBX = require("../../res/cow.vrx");
// const cowTexture = require("../../assets/res/cow-text.png");
const bookModel = require("../../res/CCHMbookmobile.obj");
const bookMaterial = Platform.OS === "ios" ? require("../../res/CCHMbookmobile_mat.mtl") : require("../../res/CCHMbookmobile_mat.mtl");

const concreteMoldModel = require('../../res/Concrete_Mold.obj');
const concreteSlabModel = require('../../res/Concrete_Slab.obj');
const concreteSlabModel1 = require('../../res/Concrete_Slab_1.obj');
const concreteSlabModel2 = require('../../res/Concrete_Slab_2.obj');
const concreteSlabModel3 = require('../../res/Concrete_Slab_3.obj');
const concreteSlabModel4 = require('../../res/Concrete_Slab_4.obj');
const concreteSlabModel5 = require('../../res/Concrete_Slab_5.obj');
const concreteSlabModel6 = require('../../res/Concrete_Slab_6.obj');
const concreteSlabModel7 = require('../../res/Concrete_Slab_7.obj');
const smithTowerModel = require('../../res/Smith_Tower.obj');

const concreteMoldMateral = require('../../res/materials/Concrete_Mold.mtl');
const concreteSlabMaterial = require('../../res/materials/Concrete_Slab.mtl');
const smithTowerMaterial = require('../../res/materials/Smith_Tower.mtl');

let api = "3D8F23E6-792C-4F66-B078-94EDB6E33A32";

let listeners = [];

const arAddEventListener = (name, func) => {
	console.log('added event listener', name);
	listeners.push({name: name, func: func});
}

const arRemoveListener = (name) => {
	listeners = listeners.filter(listener => listener.name !== name);
}

const removeListeners = () => listeners = [];

const fireEvent = (name, ...args) => {
	listeners.forEach(listener => {
		if(listener.name === name) {
			listener.func(...args);
		}
	});
}

export default class ArView extends Component {
	state = {
		show: true,
		showBuildingInstructions: false
	};

	componentDidMount() {
		const { params } = this.props.navigation.state;

		arAddEventListener('show-building', this.turnOnBuildingInstructions);
		arAddEventListener('hide-building', this.turnOffBuildingInstructions);

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

	componentWillUnmount() {
		removeListeners();
	}

	turnOnBuildingInstructions = () => {
		console.log("should show building");
		this.setState({showBuildingInstructions: true});
	}

	turnOffBuildingInstructions = () => {
		this.setState({showBuildingInstructions: false});
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
					shadowsEnabled={true}
					ref={ref => this.scene = ref}
					apiKey={api}
				/>
				{Platform.OS === 'ios' ? (
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
				) : null}

				{this.state.showBuildingInstructions ? (
					<View style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: 15, opacity: 0.8, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{color: Colors.black, textAlign: 'center', fontFamily: 'Lato-Regular'}}>Aim the camera down towards a flat surface and tap the rectangle to show the AR scene.</Text>
					</View>
				) : null}
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

const slabY = -0.12;

export class SmithScene extends Component {
	state = {
		text: "Loading",
		showContents: false,
		playAnimations: false,
		slabAnimations: [
			'slab0',
			'slab1',
			'slab2',
			'slab3',
			'slab4',
			'slab5',
			'slab6',
			'slab7',
		],
		shouldLoad: [],
		shouldDelay: true
	};

	slabs = [];
	loadedSlabs = 0;
	shouldLoadSlab = 0;

	onDragTower = ([x, y, z]) => {
		console.log(y);
		// this.tower.setNativeProps({
		// 	position: [0, y, -1]
		// });
	}

	componentDidMount() {
		// alert('firing show building');
		fireEvent('show-building');


	}

	loadSlab = () => {

	}

	showContents = () => {
		fireEvent('hide-building');
	}

	slabLoadEnd = () => {
		this.loadedSlabs += 1;
		console.log("load ended for", this.loadedSlabs);

		if(this.loadedSlabs === 1) {
			this.setState({playAnimations: true});
		}
	}

	lastAnimationFinished = () => {
		console.log("last animation finished")
		this.state.shouldDelay ? this.setState({slabAnimations: [0,1,2,3,4,5,6,7].map(() => "fadeSlab"), shouldDelay: false}) : null;
	}

	render() {
		const { slabAnimations, playAnimations, shouldDelay } = this.state;

		return (
			<ViroARScene
				style={{ flex: 1 }}
				displayPointCloud={true}>
				{/* <ViroDirectionalLight color="#ffffff" direction={[-1, -1, -1]} /> */}
				<ViroAmbientLight color="#ffffff" intensity={50} />
				<ViroDirectionalLight castsShadow={true}
					shadowMapSize={1024}
					shadowNearZ={0.005}
					shadowFarZ={5}
					shadowOrthographicSize={2}
					shadowOrthographicPosition={[0,0,0]}
					intensity={2000}
					shadowOpacity={.7} color="#ffffff" direction={[-1, -1, 0]} /> 

				<ViroARPlaneSelector onPlaneSelected={this.showContents}>
						<ViroNode scale={[1,1,1]} position={[0,0,0]}>
							<Viro3DObject
								source={concreteMoldModel}
								ref={ref => (this.mold = ref)}
								materials={["mold"]}
								resources={[concreteMoldMateral]}
								position={[0, -0.12, 0]}
								rotation={[0, 0, 0]}
								scale={[0.012, 0.012, 0.012]}
								type={"OBJ"}
								opacity={1}
								animation={{name: 'column', run: playAnimations, loop: false, delay: slabDelay(8)}}
							/>
							<Viro3DObject
								source={concreteSlabModel}
								// ref={ref => (this.slabs[0] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								onLoadEnd={this.slabLoadEnd}
								animation={{name: slabAnimations[0], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(0) : 100}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={concreteSlabModel1}
								// ref={ref => (this.slabs[1] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								animation={{name: slabAnimations[1], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(1) : 100}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={concreteSlabModel2}
								// ref={ref => (this.slabs[2] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								animation={{name: slabAnimations[2], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(2) : 100}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={concreteSlabModel3}
								// ref={ref => (this.slabs[3] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								onLoadEnd={this.slabLoadEnd}
								animation={{name: slabAnimations[3], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(3) : 100}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={concreteSlabModel4}
								// ref={ref => (this.slabs[4] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								onLoadEnd={this.slabLoadEnd}
								animation={{name: slabAnimations[4], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(4) : 100}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={concreteSlabModel5}
								// ref={ref => (this.slabs[5] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								onLoadEnd={this.slabLoadEnd}
								animation={{name: slabAnimations[5], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(5) : 100}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={concreteSlabModel6}
								// ref={ref => (this.slabs[6] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								onLoadEnd={this.slabLoadEnd}
								animation={{name: slabAnimations[6], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(6) : 100}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={concreteSlabModel7}
								// ref={ref => (this.slabs[7] = ref)}
								materials={["concrete"]}
								// onDrag={this.onDragTower}
								//resources={[concreteSlabMaterial]}
								position={[0, slabY, 0]}
								rotation={[0, 0, 0]}
								scale={[0.01, 0.01, 0.01]}
								onLoadEnd={this.slabLoadEnd}
								animation={{name: slabAnimations[7], run: playAnimations, loop: false, delay: shouldDelay ? slabDelay(7) : 100, onFinish: this.lastAnimationFinished}}
								type={"OBJ"}
							/>
							<Viro3DObject
								source={smithTowerModel}
								onDrag={this.onDragTower}
								ref={ref => (this.tower = ref)}
								materials={["smithWindows", "smithBody", "concrete", "car6"]}
								resources={[smithTowerMaterial]}
								position={[0, 0, 0]}
								rotation={[0, 0, 0]}
								scale={[0.005, 0.005, 0.005]}
								opacity={0}
								animation={{name: 'tower', run: playAnimations, loop: false, delay: slabDelay(8)}}
								type={"OBJ"}
							/>

						</ViroNode>
						<ViroQuad materials={["floorPlane"]} position={[0, -0.115, 0]} height={2} width={2} rotation={[-90, 0, 0]} arShadowReceiver={true} />
						{/* materials={["car1"]} */}
					{/* )} */}
					
				</ViroARPlaneSelector>
			</ViroARScene>
		);
	}
}

export class BookScene extends Component {
	state = {
		text: "Loading",
		audioPaused: true,
		startAnimation: false,
		touched: false
	};

	componentDidMount() {
		this.audioTimeout = setTimeout(this.replayAudio, (Math.random() * 6000) + 5000)
	}

	componentWillUnmount() {
		clearTimeout(this.audioTimeout);
	}

	replayAudio = () => {
		if(this.sound) {
			this.sound.seekToTime(0);
		}
	}

	touch = () => {
		
		this.setState({touched: true}, () => {
			this.replayAudio();
			setTimeout(() => {
				this.setState({touched: false});
			}, 50 + 200 + 400 + 600);
		});
	}

	onDrag = ([x, y, z]) => {
		// this.object.setNativeProps({
		// 	position: [x, y, z]
		// });
	}

	startAnimation = () => {
		this.setState({startAnimation: true});
	}

	render() {
		return (
			<ViroARScene
				style={{ flex: 1 }}
				onTrackingUpdated={this._onInitialized}>
				<ViroDirectionalLight color="#ffffff" direction={[0, -1, 0]} />
				<ViroAmbientLight color="#ffffff" intensity={100} />
				<ViroNode animation={{name: 'bookmobile', run: this.state.startAnimation, loop: false, delay: 0}} rotation={[0, -90, 0]} position={[-10, 0, -5]}>
					<Viro3DObject
						source={bookModel}
						ref={ref => (this.object = ref)}
						materials={["car1", "car2", "car3", "car4", "car5", "car6", "car7", "car8", "car9", "car10", "car11", "car12"]}
						resources={[bookMaterial]}
						position={[0, -1.5, -5]}
						rotation={[0, 0, 0]}
						scale={[0.25, 0.25, 0.25]}
						dragType={"FixedDistance"}
						type={"OBJ"}
						onDrag={this.onDrag}
						onLoadEnd={this.startAnimation} 
						onClick={this.touch}
						animation={{name: 'truckTouch', loop: true, run: this.state.touched}}
					/>
					{Platform.OS !== 'ios' ? (
						<ViroSpatialSound
							source={require('../../res/carhonk.mp3')}
							minDistance={0}
							maxDistance={10}
							//ref={ref => this.sound = ref}
							paused={false}
							volume={1}
							position={[0, -1.5, -5]} />
					) : null}
					{Platform.OS !== 'ios' ? (
						<ViroSpatialSound
							source={require('../../res/truckidle.mp3')}
							minDistance={5}
							maxDistance={100}
							loop={true}
							paused={false}
							volume={1}
							rolloffModel={"Logarithmic"}
							position={[0, -1.5, -5]} />
					) : null}
				</ViroNode>
				
			</ViroARScene>
		);
	}
}

function sleep(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

export class CowScene extends Component {
	constructor(props) {
		super(props);

		this.animationSets = [
			[{name: 'walkForward', run: true, loop: true, interruptable: true, delay: 500}, {name: 'walk', run: true, loop: true, duration: 2000, interruptable: true}],
			[{name: 'slow', run: true, loop: false, interruptable: true, delay: 500}, {name: 'transition', run: true, loop: false, duration: 500, interruptable: true}],
			[{name: 'stand', run: true, loop: false, interruptable: true, delay: 500}, {name: 'idle', run: true, loop: true, duration: 10000, interruptable: true}],
		];

		this.state = {
			text: "Loading",
			currentAnimation: this.animationSets[0],
			showContents: false
		};
	}

	animationLoop = () => {
		this.setState({showContents: true}, async () => {
			this.setWalking();
			await sleep(4000);
			this.setSlowing();
			await sleep(500);
			this.setStanding();
		})
		
	}
	
	componentDidMount() {
		this.animationLoop();
		this.replayAudio();
		// this.animationInterval = setInterval(this.animationLoop, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.animationInterval);
	}

	setWalking = () => {
		this.setState({currentAnimation: this.animationSets[0]});
	}

	setSlowing = () => {
		this.setState({currentAnimation: this.animationSets[1]});
	}

	setStanding = () => {
		this.setState({currentAnimation: this.animationSets[2]});
	}

	replayAudio = () => {
		if(this.sound) {
			this.sound.seekToTime(0);
		}
	}

	render() {
		return (
			<ViroARScene
				style={{ flex: 1 }}
				onTrackingUpdated={this._onInitialized}>
				<ViroDirectionalLight castsShadow={true}
					shadowMapSize={1024}
					shadowNearZ={0.1}
					shadowFarZ={20}
					shadowOpacity={.7} color="#ffffcc" direction={[-1, -1, -1]} />
				<ViroAmbientLight color="#ffffff" intensity={100} />

					
					<ViroNode position={[-2, -1.5, -4]} rotation={[0,90,0]} animation={this.state.currentAnimation[0]}>
						<Viro3DObject
							source={cowFBX}
							ref={ref => (this.object = ref)}
							//was ../../assets/res/cow_texture.png in android
							resources={Platform.OS === "ios" ? [require('../../res/cow_texture.png')] : [require('../../assets/res/cow_texture.png')]}
							position={[0, 0, 0]}
							rotation={[0, 0, 0]}
							scale={[0.01, 0.01, 0.01]}
							animation={this.state.currentAnimation[1]}
							onClick={this.replayAudio}
							type={"VRX"}
						/>	
						<ViroSpatialSound
							source={require('../../res/moo.mp3')}
							minDistance={0}
							maxDistance={10}
							//ref={ref => this.sound = ref}
							paused={false}
							volume={1}
							position={[0,0,0]} />
					</ViroNode>
					<ViroQuad position={[0, -1.5, 0]} height={20} width={20} rotation={[-90, 0, 0]} arShadowReceiver={true} />
			</ViroARScene>
		);
	}
}

const slabDelay = (i, noOrig) => {
	let origDelay = 4000;

	return i * 1000;
}

ViroAnimations.registerAnimations({
	walkForward: {properties: {positionX: "+=1"}, duration: 2000},
	stand: {properties: {positionX: "+=0"}, duration: 5500},
	slow: {properties: {positionX: "+=0.5"}, duration: 500},
	slab0: {properties: {positionY: "0.0"}, duration: 500},
	slab1: {properties: {positionY: "0.05"}, duration: 500},
	slab2: {properties: {positionY: "0.09"}, duration: 500},
	slab3: {properties: {positionY: "0.13"}, duration: 500},
	slab4: {properties: {positionY: "0.17"}, duration: 500},
	slab5: {properties: {positionY: "0.21"}, duration: 500},
	slab6: {properties: {positionY: "0.24"}, duration: 500},
	slab7: {properties: {positionY: "0.27"}, duration: 500},
	fadeSlab: {properties: {opacity: 0}, duration: 1000},
	// fadeSlab0: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(7, true)},
	// fadeSlab1: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(6, true)},
	// fadeSlab2: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(5, true)},
	// fadeSlab3: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(4, true)},
	// fadeSlab4: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(3, true)},
	// fadeSlab5: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(2, true)},
	// fadeSlab6: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(1, true)},
	// fadeSlab7: {properties: {opacity: 0}, duration: 1000, delay: slabDelay(0, true)},
	// slab0Comp: [['slab0'], ['fadeSlab0']],
	// slab1Comp: [['slab1'], ['fadeSlab1']],
	// slab2Comp: [['slab2'], ['fadeSlab2']],
	// slab3Comp: [['slab3'], ['fadeSlab3']],
	// slab4Comp: [['slab4'], ['fadeSlab4']],
	// slab5Comp: [['slab5'], ['fadeSlab5']],
	// slab6Comp: [['slab6'], ['fadeSlab6']],
	// slab7Comp: [['slab7'], ['fadeSlab7']],
	tower: {properties: {opacity: "1"}, duration: 1000},
	column: {properties: {opacity: "0"}, duration: 1000},
	bookmobile: {properties: {positionX: "+=15"}, duration: 10000, delay: 0, easing: "EaseOut"},
	bounce: {properties: {rotateZ: "+=5"}, easing: "EaseOut", duration: 50},
	unbounce: {properties: {rotateZ: "-=7"}, easing: "EaseOut", duration: 200},
	bounce2: {properties: {rotateZ: "+=3"}, easing: "EaseOut", duration: 400},
	unbounce2: {properties: {rotateZ: "-=1"}, easing: "EaseOut", duration: 600},
	truckTouch: [['bounce', 'unbounce', 'bounce2', 'unbounce2']]
});


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
		bloomThreshold: 0.0,
		// blendMode: "Screen",
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
		// blendMode: "Add",
		lightingModel: "Phong",
		diffuseColor: "#000000cc"
	  },
	  smithBody: {
		roughness: 0.9,
		metalness: 0.2,
		lightingModel: "Lambert",
		diffuseColor: "#eeeeee",
		roughnessTexture: require('../../res/concrete_texture.jpg')
	  },
	concrete: {
		shininess: 1.0,
		roughness: 1.0,
		lightingModel: "Lambert",
		wrapS: "Repeat",
		wrapT: "Repeat",
		diffuseColor: "#999999",
		roughnessTexture: require('../../res/concrete_texture.jpg')
	},
	mold: {
		shininess: 1.5,
		lightingModel: "Lambert",
		diffuseColor: "#ccbb99"
	},
	floorPlane: {
		lightingModel: "Lambert",
		blendMode: "Add",
		diffuseColor: "#000000"
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
