import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import Colors from '../colors';

export default function Card(props) {
    return (
        <TouchableOpacity onPress={() => props.onPress(props.item)}>
            <View style={styles.wrapper}>
                <View style={styles.imageWrapper}>
                   <Image style={styles.image} source={{uri: props.thumbnail}} />
                </View>
                <View style={styles.dataWrapper}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description} numberOfLines={3}>{props.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 15,
        elevation: 3,
        backgroundColor: Colors.white,
        borderRadius: 6,
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 30
    },
    imageWrapper: {
        minHeight: 300,
        width: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    image: {
        flex: 1,
        width: '100%',
    },
    dataWrapper: {
        paddingHorizontal: 15,
        flex: 1,
        paddingBottom: 15
    },
    title: {
        fontSize: 18, 
        marginTop: 15, 
        marginBottom: 10,
        color: Colors.blue,
        fontWeight: 'bold'
    },
    description: {

    }
})