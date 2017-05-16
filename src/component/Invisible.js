import React, { Component } from 'react'
import { View, Image } from 'react-native'
import {vw, vh, vmin, vmax} from '../services/viewport';

export default class Invisible extends Component {
    render(){
        return(
            <View  style={{position : 'absolute', left : this.props.x , top : this.props.y*vmax}}  >
                <Text style ={{ width : this.props.width * vmin, height : this.props.height  *vmax }}>  </Text>
            </View>
        )
    }
}