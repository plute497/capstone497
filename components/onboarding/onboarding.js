import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Colors from '../colors';

const width = Dimensions.get('window').width;

export default class Onboarding extends Component {
    state = {
        currentSlide: 0
    }

    handleScroll = (e) => {
        console.log(e.nativeEvent.contentOffset.x);

        this.setState({currentSlide: parseInt(e.nativeEvent.contentOffset.x / width)}, () => {
            console.log(this.state.currentSlide);
        });
    }

    solidDot = () => {
        return <View style={styles.solidDot}></View>
    }

    emptyDot = (index) => {
        return (
            <TouchableOpacity 
                hitSlop={{top: 15, left: 15, right: 15, bottom: 15}} 
                onPress={() => {
                    this.scrollView.scrollTo({x: index * width, y: 0, animated: true});
                    this.setState({currentSlide: index});
                }} 
                style={styles.emptyDot}>
            </TouchableOpacity>
        )
    }

    render() {
        const { currentSlide } = this.state;
        
        console.log(currentSlide, currentSlide === 0);
        return (
            <View style={styles.wrapper}>
                <ScrollView
                    pagingEnabled={true}
                    horizontal={true}
                    style={styles.scrollview}
                    onMomentumScrollEnd={this.handleScroll}
                    scrollEventThrottle={20}
                    ref={ref => this.scrollView = ref}
                >
                    <View style={styles.page}>
                        <Text>Let's Go</Text>
                    </View>
                    <View style={styles.page}>
                        <Text>FolkTells</Text>
                    </View>
                    <View style={styles.page}>
                        <Text>Then & Now</Text>
                    </View>
                    <View style={styles.page}>
                        <Text>Nowadays</Text>
                    </View>
                    <View style={styles.page}>
                        <Text>Back in the day</Text>
                        <TouchableOpacity onPress={this.props.close} style={styles.done}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>
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
        borderColor: 'green',
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    done: {
        position: 'absolute',
        left: '25%',
        right: '25%',
        bottom: 70,
        height: 60,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center'
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
        backgroundColor: Colors.yellow
    },
    solidDot: {
        height: 27,
        width: 27,
        borderRadius: 27 / 2,
        borderColor: Colors.white,
        borderWidth: 6,
        backgroundColor: Colors.white,
        margin: 5
    },
    emptyDot: {
        height: 27,
        width: 27,
        borderRadius: 27/2,
        borderColor: Colors.white,
        borderWidth: 6,
        margin: 5
    }
})