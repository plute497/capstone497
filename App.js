//this imports react - it's what lets us write JSX, our HTML-style javascript
import React, { Component } from 'react';

/**
 * These are react native specific elements we will want to bring in
 * they can be functions that give us information about the device,
 * or they will be our UI elements.
 * 
 * Anything we want to use, like buttons, text, input fields, everything in the 
 * render function of our class will NEED to be imported
 */
import { StyleSheet, View, TouchableOpacity, Text, AsyncStorage, SafeAreaView, Modal } from 'react-native';
import Header from './components/header/header-main';
import { NavigationActions } from 'react-navigation';
import Colors from './components/colors';
import Onboarding from './components/onboarding/onboarding';

const jwtDecode = require('jwt-decode');

const navigate = (route) => {
	return NavigationActions.navigate({
		routeName: route,
	});
}

/**
 * This is a component I wrote, it's in the same directory, (hence the './' part),
 * (long comment, what I mean is the import { Navigator } from './Navigator';)
 * and is named "Navigator.js", but I can drop the .js part in the import statement.
 * 
 * Note there are two ways of importing other scripts, there's the curly braces way: 
 * 
 *      import { MyThing } from './my-folder/my-thing';
 * 
 * or there's the non-curly braces way:
 * 
 *      import MyThing from './my-folder/my-thing';
 * 
 * There is a key difference between the two: in order to use the non-curly braces way, whatever you are importing
 * has to use the "default" keyword, just like our App class below. In the above example, if we are using curly braces,
 * we'd write our component we are importing like this:
 * 
 *      export class MyThing extends Component {...}
 * 
 * whereas if we wanted to import it without curly braces, we'd write it like this with the default keyword:
 * 
 *      export default class MyThing extends Component {...}
 * 
 * You CAN write a script with multiple exports, but a script can only have ONE default export.
 */
import { Navigator } from './Navigator';

export default class App extends Component {
	state = {
		navigationSet: false,
		token: "",
		user: {
			unset: true
		},
		onboarded: true,
		checked: false
	};

	//build in react method, calls right when this component wakes up, which is right on app open
	componentDidMount() {
		//should check whether the user is signed in and whether or not they have gone through onboarding
		this.checkSignedIn();
		this.checkOnboarded();
	}

	//this async function will wait for the AsyncStorage promise to resolve before moving onto the next line
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
	checkOnboarded = async () => {
		let onboarded = await AsyncStorage.getItem('onboarded');

		if (!onboarded) {
			this.setState({ onboarded: false, checked: true });
		} else {
			this.setState({ onboarded: true, checked: true });
		}
	}

	setToken = (token) => {
		let user = jwtDecode(token);

		AsyncStorage.setItem('token', token);

		this.setState({ token: token, user: user });
	}

	checkSignedIn = async () => {
		let token = await AsyncStorage.getItem('token');
		if (token) {
			this.setToken(token);
		}
	}

	signOut = () => {
		AsyncStorage.removeItem('token');
		this.setState({ user: { unset: true }, token: "" });
	}

	setOnboarded = () => {
		this.setState({ onboarded: true });
		AsyncStorage.setItem('onboarded', 'true');
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ height: '100%', flex: 1, width: '100%' }}>
					<Navigator
						ref={ref => this.navigator = ref}
						screenProps={{
							setToken: this.setToken,
							signOut: this.signOut,
							user: this.state.user,
							token: this.state.token,
							onboarded: this.state.onboarded && this.state.checked
						}}
						style={{ flex: 1 }} />
				</View>

				{/* This will only show if the onboarded state is set to false - look up JS ternary operators if you don't understand this: `myCondition ? 'myCondition is true' : 'myCondition is false'` */}
				{/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator */}
				{!this.state.onboarded ? <Onboarding close={this.setOnboarded} /> : null}

			</View>
		);
	}
}

/**
 * React styles are not the same as CSS, but they're mostly the same
 * Note that the CSS styles have been renamed in camelCase,
 * Also, there's no document-based positioning, everything is flexbox based,
 * so get a handle on that: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#eeffee',
	}
});
