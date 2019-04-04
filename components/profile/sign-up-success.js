import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default function SignUpSuccess(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Text>
                Thanks for signing up!
            </Text>
            <Text>
                Please check your email to confirm your account. Once your account is confirmed,
                you will be able to submit your story!
            </Text>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Main")}
                style={{backgroundColor: 'blue'}}>
                <Text>Back to the Map</Text>    
            </TouchableOpacity>
        </SafeAreaView>
    )
}
