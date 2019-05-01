import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';

import Card from '../ui-components/card';
import Colors from '../colors';

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
                        uri={""}
                        title={"Bookmobile AR"}
                        color={Colors.blue}
                        description={""}
                    />
                    <Card
                        onPress={() => this.openAr('schofield')}
                        uri={""}
                        title={"Cow AR"}
                        color={Colors.blue}
                        description={""}
                    />
                     <Card
                        onPress={() => this.openAr('smith')}
                        uri={""}
                        title={"Smith Tower AR"}
                        color={Colors.blue}
                        description={""}
                    />
                </ScrollView>
            </View>
        )
    }
}