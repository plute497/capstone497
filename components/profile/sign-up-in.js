import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import historicRoutesLogo from '../images/historicRoutesLogo.png';
import Colors from '../colors';

export default function SignUpIn(props) {
    return (
        <View style={styles.wrapper}>
            <Image source={historicRoutesLogo} style={styles.headerLogo} resizeMode={'contain'} />
            <TouchableOpacity onPress={props.navigation.navigate.bind(this, "SignUp")} style={styles.signUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.navigation.navigate.bind(this, "SignIn")} style={styles.signIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        backgroundColor: Colors.white
    },
    header: {
        color: Colors.orange,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0
    },
    headerLogo: {
        flex: 0,
        width: '75%'
    },  
    signUp: {
        flex: 0,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue,
        borderRadius: 6,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 30
    },
    signIn: {
        flex: 0,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.orange,
        borderRadius: 6,
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white
    }
})