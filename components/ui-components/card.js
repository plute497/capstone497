import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Colors from '../colors';

const { width } = Dimensions.get('window');

export default function Card(props) {
    return (
        <TouchableOpacity onPress={() => props.onPress(props.item)}>
            <View style={styles.wrapper}>
                <View style={[styles.imageWrapper, {backgroundColor: props.color}]}>
                    <ActivityIndicator
                        size="small"
                        animating={true}
                        color={Colors.white}
                        style={{alignSelf: 'center'}} />
                    <Image resizeMode={'cover'} style={[styles.image]} source={props.uri ? {uri: props.uri} : props.thumbnail} />
                </View>
                <View style={styles.dataWrapper}>
                    <Text style={[styles.title, {color: props.color}]}>{props.title}</Text>
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
        height: (width - 30) * (9/16),
        width: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        justifyContent: 'center'
    },
    loading: {
        ...StyleSheet.absoluteFillObject
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%'
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