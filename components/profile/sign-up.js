import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { FetchSignUp } from '../_api/user/user';

export default class SignUp extends PureComponent {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        errorMessage: "",
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    submitSignUp = async () => {
        let { email, password, firstName, lastName } = this.state;

        if(email, password, firstName, lastName) {
            this.setState({errorMessage: ""});

            try {
                this.setState({loading: true});
                let user = await FetchSignUp(email, password, firstName, lastName);
                console.log(user);
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

    setFirst = (text) => {
        this.setState({firstName: text});
    }

    setLast = (text) => {
        this.setState({lastName: text});
    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    setPassword = (text) => {
        this.setState({password: text});
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Text>Sign Up</Text>
                <TextInput 
                    onChangeText={this.setFirst}
                    autoCapitalize="words"
                    underlineColorAndroid="#333"
                    placeholder="First Name" />
                <TextInput 
                    onChangeText={this.setLast}
                    underlineColorAndroid="#333"
                    placeholder="Last Name" />
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
                    onPress={this.submitSignUp}
                    style={{flex: 0, height: 50, backgroundColor: 'blue'}}>
                    {this.state.loading ? (
                        <ActivityIndicator
                            size="small"
                            color="#fff" />
                    ) : (
                        <Text style={{color: '#fff'}}>Sign Up</Text>
                    )}
                </TouchableOpacity>
                {this.state.errorMessage ? (
                    <Text>{this.state.errorMessage}</Text>
                ) : null}
            </SafeAreaView>
        )
    }
    
}