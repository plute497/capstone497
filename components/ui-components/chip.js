import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import Colors from '../colors';

export default function Chip(props) {
    return (
        <TouchableOpacity onPress={() => props.onPress(props.item)}>
            <View style={styles.wrapper}>
                <View style={styles.imageWrapper}>
                   <Image resizeMode={'cover'} style={styles.image} source={props.uri ? {uri: props.uri} : props.thumbnail} />
                </View>
                <View style={styles.dataWrapper}>
                    <Text style={[styles.title, {color: props.color}]}>{props.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{props.description}</Text>
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
        marginBottom: 30,
        flexDirection: 'row',
        minHeight: 120,
        maxHeight: 150
    },
    imageWrapper: {
        width: 120,
        minHeight: 120,
        maxHeight: 150,
        overflow: 'hidden',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },
    image: {
        width: 120,
        minHeight: 120,
        maxHeight: 150,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
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
        fontFamily: 'Lato-Black'
    },
    description: {
        fontFamily: 'Lato-Light'
    }
})