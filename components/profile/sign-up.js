import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { FetchSignUp } from '../_api/user/user';

export default function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function submitSignUp() {
        if(email, password, firstName, lastName) {
            setErrorMessage("");

            try {
                setLoading(true);
                let user = await FetchSignUp(email, password, firstName, lastName);
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
            <Text>Sign Up</Text>
            <TextInput 
                onChangeText={setFirstName}
                textContentType="name"
                placeholder="First Name" />
            <TextInput 
                onChangeText={setLastName}
                textContentType="familyName"
                placeholder="Last Name" />
            <TextInput 
                onChangeText={setEmail}
                textContentType="emailAddress"
                placeholder="Email Address" />
            <TextInput 
                onChangeText={setPassword}
                textContentType="password"
                placeholder="Enter a password" />
            <TouchableOpacity
                onPress={submitSignUp}
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