import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    Button,
    UIManager,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import Header from '../header/header-main';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const { height, width }= Dimensions.get('window');

export default class MapMain extends Component {
    static navigationOptions = {
        drawerLabel: 'Map'
    };

    state = {
        contextTop: height - 130
    };

    contextOpen = false;

    openContext = () => {
        

        if(!this.contextOpen) {
            this.contextOpen = true;
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ contextTop: 60});    
        } else {
            this.contextOpen = false;
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({contextTop: height - 130});
        }
        
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} />

                <View style={{flex: 1, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
                    <Button title="Toggle Pin" style={{elevation: 10}} onPress={this.openContext}></Button>
                </View>
                <View style={{position: 'absolute', top: this.state.contextTop, left: 0, right: 0, height: height, backgroundColor: '#333333',  elevation: 10}}>
                    <View style={{height: height - 190}}>
                    <TouchableOpacity onPress={this.openContext}><View style={{ padding: 10}}><Text>X</Text></View></TouchableOpacity>
                    <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{padding: 40, flex: 0}}>
                        
                            <Text style={{color: '#ffffff', fontSize: 24, marginBottom: 15}}>Location Title</Text>
                            <Text style={{color: '#ffffff', marginBottom: 15}}>
                            Component that wraps platform ScrollView while providing integration with touch locking "responder" system.

                            Keep in mind that ScrollViews must have a bounded height in order to work, since they contain unbounded-height children into a bounded container (via a scroll interaction). In order to bound the height of a ScrollView, either set the height of the view directly (discouraged) or make sure all parent views have bounded height. Forgetting to transfer  down the view stack can lead to errors here, which the element inspector makes easy to debug.

                            Doesn't yet support other contained responders from blocking this scroll view from becoming the responder.

                            mhut6hjmb
                            </Text>
                            <Button title="Open Video A" onPress={() => this.props.navigation.navigate("VideoView", {id: 1, title: "Video A"})}></Button>
                            <View style={{height: 10}}></View>
                            <Button title="Open Story A" onPress={() => this.props.navigation.navigate("StoryView", {id: 1})}></Button>
                            <View style={{height: 10}}></View>
                            <Button title="Open AR A" onPress={() => this.props.navigation.navigate("ArView", {id: 1})}></Button>
                            <View style={{height: 10}}></View>
                            <Button title="Open Audio A" onPress={() => this.props.navigation.navigate("AudioView", {id: 1})}></Button>
                        
                    </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}