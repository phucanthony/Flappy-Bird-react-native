import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {vw, vh, vmin, vmax} from '../services/viewport'

export default class GameOver extends Component {
    render(){
        return(
        <View style={{position : 'absolute', left : 25 * vmin, top : 30 * vmax, zIndex: 1  }}  >
            <Image resizeMode="stretch"  source = {require('../images/flappybird_gameover.png')}
                   style={{width: 40*vw, height: 7*vh}}/>
        </View>
        )
    }
}
