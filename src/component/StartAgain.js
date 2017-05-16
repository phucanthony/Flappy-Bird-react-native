import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {vw, vh, vmin, vmax} from '../services/viewport'

export default class StartAgain extends Component {
    pressMe(){
        this.props.onStartAgain();
    }

    render(){
        return(
            <View style={{position: 'absolute', left: 35 * vmin, top: 40 * vmax}}>
                <TouchableOpacity activeOpacity={1} onPress = {this.pressMe.bind(this)}>
                    <Image resizeMode="stretch" source={require('../images/flappybird_play.png')}
                           style={{width: 30*vw, height: 10*vh}}/>
                </TouchableOpacity>
            </View>
        )
    }
}