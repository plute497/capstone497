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

	componentDidMount() {
		// alert("changed");
	}

	handleScroll = (e) => {
		//console.log(e.nativeEvent.contentOffset.x);
		//console.log(e);

		this.setState({ currentSlide: parseInt(e.nativeEvent.contentOffset.x / width) }, () => {
			//console.log(this.state.currentSlide);

			if (this.state.currentSlide === 4) {
				Animated.timing(this.buttonAnimation, { toValue: 1, duration: 500 }).start();
			}
		});
	}

	solidDot = () => {
		return <View style={styles.solidDot}></View>
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

		//console.log(currentSlide, currentSlide === 0);
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
							<Text style={[styles.innerTitle, { color: Colors.yellow }]}><Text style={styles.bold}>Let's</Text> <Text style={styles.light}>Go</Text></Text>
							<Image source={Bus} style={[styles.icon, { tintColor: Colors.yellow }]} resizeMode={'contain'} />

						</View>
						<Image style={[styles.backgroundImage]} resizeMode={'cover'} source={Orange} />
						<Text style={styles.subtitle}>
							Tour 12 historic{"\n"}sites of downtown{"\n"}Vancouver, WA
                        </Text>
					</View>
					<View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.blue }]}>
							<Text style={[styles.innerTitle, { color: Colors.blue }]}><Text style={styles.bold}>Folk</Text><Text style={styles.light}>Tells</Text></Text>
							<Image source={Quill} style={[styles.icon, { tintColor: Colors.blue }]} resizeMode={'cover'} />

						</View>
						<Image style={[styles.backgroundImage]} resizeMode={'cover'} source={Academy} />
						<Text style={styles.subtitle}>
							Share your own{"\n"}stories and{"\n"}connections to{"\n"}Vancouver History
                        </Text>
					</View>
					<View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.green }]}>
							<Text style={[styles.innerTitle, { color: Colors.green }]}><Text style={styles.bold}>Then</Text><Text style={styles.light}>&Now</Text></Text>
							<Image source={Quill} style={[styles.icon, { tintColor: Colors.green }]} resizeMode={'cover'} />

						</View>
						<Image style={[styles.backgroundImage, { height: '40%', top: '60%' }]} resizeMode={'cover'} source={Smith} />
						<Text style={styles.subtitle}>
							Experience history{"\n"}through augmented{"\n"}reality!
                        </Text>
					</View>
					<View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.red }]}>
							<Text style={[styles.innerTitle, { color: Colors.red }]}><Text style={styles.bold}>Nowa</Text><Text style={styles.light}>days</Text></Text>
							<Image source={Handset} style={[styles.icon, { tintColor: Colors.red }]} resizeMode={'cover'} />

						</View>
						<Image style={[styles.backgroundImage, { height: '40%', top: '60%' }]} resizeMode={'cover'} source={Heritage} />
						<Text style={styles.subtitle}>
							Archive your modern{"\n"}experiences
                        </Text>
					</View>
					<View style={styles.page}>
						<View style={[styles.pageInner, { borderColor: Colors.blue }]}>
							<Text style={[styles.innerTitle, { color: Colors.blue }]}><Text style={styles.bold}>Back</Text><Text style={styles.light}>in</Text>{"\n"}<Text style={styles.bold}>the</Text><Text style={styles.light}>day</Text></Text>
							<Image source={Clock} style={[styles.icon, { tintColor: Colors.blue }]} resizeMode={'cover'} />

						</View>
						<Image style={[styles.backgroundImage, { height: '40%', top: '60%' }]} resizeMode={'cover'} source={House} />
						<Text style={[styles.subtitle, { marginTop: 20 }]}>
							Learn about{"\n"}Vancouver's historic{"\n"}sites!
                        </Text>
						<Animated.View style={[styles.done, { opacity: opacity, transform: [{ translateY: transform }] }]}>
							<TouchableOpacity onPress={this.props.close}>
								<Text style={styles.buttonText}>Get Started</Text>
							</TouchableOpacity>
						</Animated.View>

					</View>
				</ScrollView>

				<View style={styles.dots}>
					<View style={styles.dotsInner}>
						{currentSlide === 0 ? this.solidDot() : this.emptyDot(0)}
						{currentSlide === 1 ? this.solidDot() : this.emptyDot(1)}
						{currentSlide === 2 ? this.solidDot() : this.emptyDot(2)}
						{currentSlide === 3 ? this.solidDot() : this.emptyDot(3)}
						{currentSlide === 4 ? this.solidDot() : this.emptyDot(4)}
					</View>
				</View>
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
		justifyContent: 'center',
		overflow: 'hidden'
	},
	pageInner: {
		borderWidth: 12,
		margin: 40,
		position: 'absolute',
		top: 40,
		right: 0,
		left: 0,
		height: '100%',
		paddingTop: 20
	},
	innerTitle: {
		textAlign: 'center',
		fontSize: 50,
		textTransform: 'uppercase',
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
		marginTop: -50
	},
	done: {
		position: 'absolute',
		left: '25%',
		right: '25%',
		bottom: 90,
		height: 50,
		borderRadius: 6,
		backgroundColor: Colors.yellow,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
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
	}
})