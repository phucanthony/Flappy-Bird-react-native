import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {vw, vh, vmin, vmax} from '../services/viewport'

export default class Start extends Component {
    pressMe(){
        this.props.onStart();
    }

    render(){
        return(
            <View style={{position: 'absolute', left: 27*vmin, top: 30*vmax}}>
                <Image resizeMode="stretch" source={require('../images/flappybird-logo.png')}
                       style={{width:40*vw, height:8*vh}}/>
                <TouchableOpacity activeOpacity={1} onPress={this.pressMe.bind(this)}>
                    <Image resizeMode="stretch" source={require('../images/flappybird-tab.png')}
                           style={{width:40*vw, height: 6*vh}}/>
                </TouchableOpacity>
            </View>
        )
    }
}
