import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native';

import { FetchSignUp } from '../_api/user/user';
const width = Dimensions.get('window').width;

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
                <View style={styles.wrapper}>
                    <Text style={styles.header}>Sign Up</Text>
                    <TextInput 
                        onChangeText={this.setFirst}
                        style={styles.textInput}
                        autoCapitalize="words"
                        underlineColorAndroid="#333"
                        placeholder="First Name" />
                    <TextInput 
                        onChangeText={this.setLast}
                        style={styles.textInput}
                        underlineColorAndroid="#333"
                        placeholder="Last Name" />
                    <TextInput 
                        onChangeText={this.setEmail}
                        style={styles.textInput}
                        underlineColorAndroid="#333"
                        keyboardType={"email-address"}
                        autoCapitalize="none"
                        placeholder="Email Address" />
                    <TextInput 
                        onChangeText={this.setPassword}
                        style={styles.textInput}
                        underlineColorAndroid="#333"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholder="Enter a password" />
                    <TouchableOpacity
                        onPress={this.submitSignUp}
                        style={styles.button}>
                        {this.state.loading ? (
                            <ActivityIndicator
                                size="small"
                                color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                    {this.state.errorMessage ? (
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    ) : null}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center', 
        flex: 1, 
        padding: 15
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 30,
        color: Colors.orange,
        textAlign: 'center'
    },
    textInput: {
        flex: 0, 
        height: 50, 
        borderColor: 
        Colors.lightGray, 
        borderWidth: 0.5, 
        borderRadius: 3, 
        width: width - 30, 
        padding: 15, 
        marginBottom: 15
    },
    button: {
        flex: 0,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue,
        borderRadius: 6,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 3},
        width: width - 30,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white
    },
    errorMessage: {
        fontWeight: 'bold',
        color: Colors.orange,
        textAlign: 'center',
        marginTop: 30
    }
});