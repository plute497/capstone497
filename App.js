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
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

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
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: '100%', flex: 1, width: '100%' }}>
                    <Navigator ref={ref => this.navigator = ref} style={{ flex: 1 }} />
                </View>
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
