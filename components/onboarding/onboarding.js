import React, { Component } from 'react';

import {
	View,
	Text,
	Image,
	ScrollView,
	SafeAreaView,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	Animated
} from 'react-native';

import Colors from '../colors';
import Academy from '../images/onboarding/academy.png';
import Heritage from '../images/onboarding/heritage.png';
import House from '../images/onboarding/house.png';
import Orange from '../images/onboarding/orange.png';
import Smith from '../images/onboarding/smith.png';

import Bus from '../images/bus-white.png';
import Ar from '../images/AR-white.png';
import Clock from '../images/clock-white.png';
import Handset from '../images/phone-white.png';
import Quill from '../images/folktells-white.png';

const width = Dimensions.get('window').width;

export default class Onboarding extends Component {
	state = {
		currentSlide: 0
	}

	buttonAnimation = new Animated.Value(0);

	handleScroll = (e) => {
		this.setState({ currentSlide: parseInt(e.nativeEvent.contentOffset.x / width) }, () => {

			//when you add in the other two slides, change this to 4
			if (this.state.currentSlide === 2) {
				Animated.timing(this.buttonAnimation, { toValue: 1, duration: 500 }).start();
			}
		});
	}

	solidDot = () => {
		return <View style={styles.solidDot}></View>
	}

	nextSlide = () => {
		let index = this.state.currentSlide + 1;
		this.scrollView.scrollTo({ x: index * width, y: 0, animated: true });
		this.setState({ currentSlide: index });
	}

	emptyDot = (index) => {
		return (
			<TouchableOpacity
				hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
				onPress={() => {
					this.scrollView.scrollTo({ x: index * width, y: 0, animated: true });
					this.setState({ currentSlide: index });
				}}
				style={styles.emptyDot}>
			</TouchableOpacity>
		)
	}

	render() {
		const { currentSlide } = this.state;

		const opacity = this.buttonAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1]
		});

		const transform = this.buttonAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [20, 0]
		});

		return (
			<View style={[styles.wrapper, { backgroundColor: Colors.white }]}>
				<ScrollView
					pagingEnabled={true}
					horizontal={true}
					style={styles.scrollview}
					onMomentumScrollEnd={this.handleScroll}
					scrollEventThrottle={20}
					ref={ref => this.scrollView = ref}
				>
					<View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.yellow }]}>	
						</View>
						
						<Image style={[styles.backgroundImage]} resizeMode={'cover'} source={Orange} />

						<View style={styles.container}>
							<Text style={[styles.innerTitle, { color: Colors.yellow }]}><Text style={styles.bold}>LET'S</Text> <Text style={styles.light}>GO</Text></Text>
							<Image source={Bus} style={[styles.icon, { tintColor: Colors.yellow }]} resizeMode={'contain'} />
							<Text style={styles.subtitle}>
								Tour 12 historic{"\n"}sites of downtown{"\n"}Vancouver, WA
							</Text>
						</View>

						<TouchableOpacity style={styles.next} onPress={this.nextSlide}>
							<Text style={styles.buttonText}>Next</Text>
						</TouchableOpacity>
						
					</View>
					{/* <View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.blue }]}>
						</View>

						<Image style={[styles.backgroundImage]} resizeMode={'cover'} source={Academy} />

						<View style={styles.container}>
							<Text style={[styles.innerTitle, { color: Colors.blue }]}><Text style={styles.bold}>FOLK</Text>{"\n"}<Text style={styles.light}>TELLS</Text></Text>
							<Image source={Quill} style={[styles.icon, { tintColor: Colors.blue }]} resizeMode={'cover'} />
							<Text style={styles.subtitle}>
								Share your own{"\n"}stories and{"\n"}connections to{"\n"}Vancouver History
							</Text>
						</View>						
					</View> */}
					<View style={styles.page}>
						
						<View style={[styles.pageInner, { borderColor: Colors.green }]}>
						</View>
						
						<Image style={[styles.backgroundImage]} resizeMode={'cover'} source={Smith} />

						<View style={styles.container}>
							<Text style={[styles.innerTitle, { color: Colors.green }]}><Text style={styles.bold}>THEN</Text>{"\n"}<Text style={styles.light}>&{"\n"}NOW</Text></Text>
							<Image source={Ar} style={[styles.icon, { tintColor: Colors.green }]} resizeMode={'cover'} />
							<Text style={styles.subtitle}>
								Experience history{"\n"}through augmented{"\n"}reality!
							</Text>
						</View>	

						<TouchableOpacity style={styles.next} onPress={this.nextSlide}>
							<Text style={styles.buttonText}>Next</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.red }]}>
						</View>

						<Image style={[styles.backgroundImage]} resizeMode={'cover'} source={Heritage} />

						<View style={styles.container}>
							<Text style={[styles.innerTitle, { color: Colors.red, fontSize: 40 }]}><Text style={styles.bold}>NOWA</Text><Text style={styles.light}>DAYS</Text></Text>
							<Image source={Handset} style={[styles.icon, { tintColor: Colors.red }]} resizeMode={'cover'} />
							<Text style={styles.subtitle}>
								Archive your{"\n"}modern{"\n"}experiences
							</Text>
						</View>	
					</View> */}
					<View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.blue }]}>
						</View>
						<Image style={[styles.backgroundImage]} resizeMode={'cover'} source={House} />
						<View style={styles.container}>
							<Text style={[styles.innerTitle, { color: Colors.blue }]}><Text style={styles.bold}>BACK</Text><Text style={styles.light}>IN</Text>{"\n"}<Text style={styles.bold}>THE</Text><Text style={styles.light}>DAY</Text></Text>
							<Image source={Clock} style={[styles.icon, { tintColor: Colors.blue }]} resizeMode={'cover'} />
							<Text style={styles.subtitle}>
							Learn about{"\n"}Vancouver's{"\n"}historic sites!
							</Text>
						</View>	

						<TouchableOpacity style={styles.next} onPress={this.props.close}>
							<Text style={styles.buttonText}>Get Started</Text>
						</TouchableOpacity>

					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: StyleSheet.absoluteFillObject,
	scrollview: {
		flex: 1
	},
	page: {
		height: '100%',
		width: width,
		alignItems: 'center',
		paddingTop: 60,
		overflow: 'hidden'
	},
	pageInner: {
		borderWidth: 12,
		margin: 30,
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0
	},
	container: {
		backgroundColor: Colors.transWhite, 
		borderRadius: 12, 
		padding: 15
	},
	innerTitle: {
		textAlign: 'center',
		fontSize: 50
	},
	icon: {
		alignSelf: 'center',
		width: 190,
		height: 190
	},
	backgroundImage: {
		width: '100%',
		height: '70%',
		position: 'absolute',
		top: '50%',
		bottom: 0
	},
	bold: {
		fontFamily: 'Lato-Black'
	},
	light: {
		fontFamily: 'Lato-Light'
	},
	subtitle: {
		fontSize: 30,
		fontFamily: "Lato-Light",
		textAlign: 'center',
	},
	next: {
		position: 'absolute',
		left: '25%',
		right: '25%',
		bottom: 50,
		height: 50,
		borderRadius: 6,
		backgroundColor: Colors.red,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 7
	},
	done: {
		position: 'absolute',
		left: '25%',
		right: '25%',
		bottom: 90,
		height: 50,
		borderRadius: 6,
		backgroundColor: Colors.red,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 7
	},
	buttonText: {
		fontSize: 18,
		color: Colors.white
	},
	dots: {
		position: 'absolute',
		bottom: 40,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	dotsInner: {
		flexDirection: 'row',
	},
	solidDot: {
		height: 27,
		width: 27,
		borderRadius: 27 / 2,
		borderColor: Colors.white,
		borderWidth: 6,
		backgroundColor: Colors.white,
		margin: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5
	},
	emptyDot: {
		height: 27,
		width: 27,
		borderRadius: 27 / 2,
		borderColor: Colors.white,
		borderWidth: 6,
		margin: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2
	}
})