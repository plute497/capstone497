import React, { PureComponent } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Colors from '../colors';

import BackArts from '../images/sites/arts.png';
import BackCchm from '../images/sites/cchm.png';
import BackElks from '../images/sites/elks.png';
import BackEstherShort from '../images/sites/esthershort.png';
import BackEvergreen from '../images/sites/evergreen.png';
import BackHeritage from '../images/sites/heritage.png';
import BackHidden from '../images/sites/hidden.png';
import BackKiggins from '../images/sites/kiggins.png';
import BackProvidence from '../images/sites/providence.png';
import BackSchofield from '../images/sites/schofield.png';
import BackSlocum from '../images/sites/slocum.png';
import BackSmith from '../images/sites/smith.png';

import Card from '../ui-components/card';
import Chip from '../ui-components/chip';

const getImage = (name) => {
    switch(name) {
        case 'arts': return BackArts;
        case 'cchm': return BackCchm;
        case 'elks': return BackElks; 
        case 'esther': return BackEstherShort; 
        case 'evergreen': return BackEvergreen; 
        case 'heritage': return BackHeritage; 
        case 'hidden': return BackHidden; 
        case 'kiggins': return BackKiggins; 
        case 'providence': return BackProvidence; 
        case 'schofield': return BackSchofield; 
        case 'slocum': return BackSlocum; 
        case 'smith': return BackSmith; 
    }
}

const getColor = (name) => {
    switch(name) {
        case 'arts': return Colors.blue;
        case 'cchm': return Colors.yellow;
        case 'elks': return Colors.yellow; 
        case 'esther': return Colors.green; 
        case 'evergreen': return Colors.green; 
        case 'heritage': return Colors.green; 
        case 'hidden': return Colors.red; 
        case 'kiggins': return Colors.red; 
        case 'providence': return Colors.red; 
        case 'schofield': return Colors.blue; 
        case 'slocum': return Colors.blue; 
        case 'smith': return Colors.yellow; 
    }
}

export default class SiteContent extends PureComponent {
    handleContent = (item) => {
        if(item.type === "video") {
            this.props.navigation.navigate("VideoView", item);
        }

        if(item.type === "story") {
            this.props.navigation.navigate("StoryView", item);
        }
    }

    render() {
        let { params } = this.props.navigation.state;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, backgroundColor: Colors.lighterGray}} contentContainerStyle={{padding: 15}}>
                    <Text style={{fontSize: 30, marginBottom: 15, fontFamily: "Lato-Black", color: getColor(params.name)}}>{params.niceName}</Text>
                    {params.content.map((item, i) => {
                        return (
                            <Chip
                                onPress={this.handleContent.bind(this, item)}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                color={getColor(params.name)}
                                description={item.description}
                                key={params.name + '_' + i}
                            />
                        )
                    })}
                    <Text>i love you</Text>
                </ScrollView>
                
            </View>
        );
    }
}