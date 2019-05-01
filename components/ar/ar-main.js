import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

import Card from '../ui-components/card';
import Colors from '../colors';
import cowRender from '../images/cow-render.jpg';
import bookmobileRender from '../images/bookmobile-render.png';
import smithRender from '../images/smith-render.jpg';

export default class ArMain extends Component {
    openAr = (name) => {
        this.props.navigation.navigate("ArView", {name: name});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 15}}>
                    <Card
                        onPress={() => this.openAr('cchm')}
                        thumbnail={bookmobileRender}
                        title={"Bookmobile AR"}
                        color={Colors.blue}
                        description={""}
                    />
                    <Card
                        onPress={() => this.openAr('schofield')}
                        thumbnail={cowRender}
                        title={"Cow AR"}
                        color={Colors.blue}
                        description={""}
                    />
                     <Card
                        onPress={() => this.openAr('smith')}
                        thumbnail={smithRender}
                        title={"Smith Tower AR"}
                        color={Colors.blue}
                        description={""}
                    />
                </ScrollView>
            </View>
        )
    }
}