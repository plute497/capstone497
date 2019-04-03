import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { FetchSignIn } from '../_api/user/user';


export default class SignIn extends PureComponent {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        errorMessage: "",
        loading: false
    }

    submitSignIn = async () => {
        let { email, password } = this.state;
        if(email, password) {
            this.setState({errorMessage: ""});

            try {
                this.setState({loading: true});
                let user = await FetchSignIn(email, password);
                this.setState({loading: false});
                if(user.error) {
                    this.setState({errorMessage: user.error});
                } else {
                    this.props.screenProps.setToken(user.token);
                    this.props.navigation.navigate("SignUpSuccess");
                }
            } catch(e) {
                console.log(e);
                this.setState({errorMessage: "We're sorry, we ran into an issue with the sign up. Please check your inputs and try again."});
            }
        } else {
            this.setState({errorMessage: "Please ensure you have filled out the entire form."});
        }
    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    setPassword = (text) => {
        this.setState({password: text});
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Sign In</Text>
                <TextInput 
                    onChangeText={this.setEmail}
                    underlineColorAndroid="#333"
                    keyboardType={"email-address"}
                    autoCapitalize="none"
                    placeholder="Email Address" />
                <TextInput 
                    onChangeText={this.setPassword}
                    underlineColorAndroid="#333"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholder="Enter a password" />
                <TouchableOpacity
                    onPress={this.submitSignIn}
                    style={{flex: 0, height: 50, backgroundColor: 'blue'}}>
                    {this.state.loading ? (
                        <ActivityIndicator
                            size="small"
                            color="#fff" />
                    ) : (
                        <Text style={{color: '#fff'}}>Sign In</Text>
                    )}
                </TouchableOpacity>
                {this.state.errorMessage ? (
                    <Text>{this.state.errorMessage}</Text>
                ) : null}
            </SafeAreaView>
        )
    }
    
}