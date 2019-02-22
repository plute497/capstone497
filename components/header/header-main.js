import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';

export default class Header extends Component {
    render() {
        return (
            <View style={{height: 50, width: '100%', elevation: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff'}}>
                <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                    <Text>Menu</Text>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.props.navigation.state.routeName}</Text>
                </View>
            </View>
        )
    }
}