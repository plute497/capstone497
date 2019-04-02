import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { FetchSignIn } from '../_api/user/user';

export default function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading]

    async function submitSignIn() {
        if(email, password) {
            setErrorMessage("");

            try {
                setLoading(true);
                let user = await FetchSignIn(email, password);
                setLoading(false);
                if(user.error) {
                    setErrorMessage("We're sorry, we ran into an issue with the sign up. Please check your inputs and try again.");
                } else {
                    props.setToken(user.token);
                    props.navigation.navigate("SignUpSuccess");
                }
            } catch(e) {
                setErrorMessage("We're sorry, we ran into an issue with the sign up. Please check your inputs and try again.");
            }
        } else {
            setErrorMessage("Please ensure you have filled out the entire form.");
        }
    }

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Sign In</Text>
            <TextInput 
                onChangeText={setEmail}
                textContentType="emailAddress"
                placeholder="Email Address" />
            <TextInput 
                onChangeText={setPassword}
                textContentType="password"
                placeholder="Enter a password" />
            <TouchableOpacity
                onPress={submitSignIn}
                style={{flex: 0, height: 50, backgroundColor: 'blue'}}>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color="#fff" />
                ) : (
                    <Text style={{color: '#fff'}}>Sign Up</Text>
                )}
            </TouchableOpacity>
            {errorMessage ? (
                <Text>{errorMessage}</Text>
            ) : null}
        </SafeAreaView>
    )
}