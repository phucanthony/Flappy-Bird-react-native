import React, { Component } from 'react';
import {View, Image} from 'react-native';

import {vw, vh, vmin, vmax} from '../services/viewport'

export default class Ground extends Component {
    render(){
        return(
            <View style={{position:'absolute', left: this.props.x * vw, top: this.props.y * vh}}>
                <Image resizeMode="stretch" source={require('../images/flappybird-bg-brow.png')}
                       style={{width : this.props.width * vmin, height : this.props.height*vmax}}/>
            </View>
        )
    }
}