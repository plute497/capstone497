import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';

export default function SignUpIn(props) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Want to sign up?</Text>
            <TouchableOpacity onPress={props.navigation.navigate.bind(this, "SignUp")} style={{backgroundColor: 'blue', flex: 0, height: 60, marginBottom: 40}}>
                <Text style={{color: '#fff'}}>Sign Up</Text>
            </TouchableOpacity>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={props.navigation.navigate.bind(this, "SignIn")} style={{backgroundColor: 'red', flex: 0, height: 60}}>
                <Text style={{color: '#fff'}}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}