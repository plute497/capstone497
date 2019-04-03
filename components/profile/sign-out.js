import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';

export default function SignOut(props) {
    function done() {
        props.screenProps.signOut();
        props.navigation.navigate("Main");
    }

    function confirm() {
        Alert.alert("Signing Out", "Are you sure you want to sign out?", [{text: "Sign Out", onPress: done}, {text: "Cancel"}])
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={confirm} style={{backgroundColor: 'blue'}}>
                <Text style={{color: '#fff'}}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}