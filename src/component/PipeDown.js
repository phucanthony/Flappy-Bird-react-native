import React, { Component } from 'react'
import { View, Image } from 'react-native'

import {vw, vh, vmin, vmax} from '../services/viewport'

export default class PipeUp extends Component {
    render(){
        return(
            <View style={{
                position: 'absolute',
                left: this.props.x * vw,
                bottom: this.props.y * vh,
                width: this.props.width*vw, height: this.props.height*vh,
            }}>
                <View style={{
                    backgroundColor: '#59DA5D',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderBottomWidth: 2,
                    borderTopWidth: 2,
                    borderColor: 'black',
                    height: 3*vh}}></View>
                <View style={{
                    backgroundColor: '#59DA5D',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderColor: 'black',
                    flex: 1
                }}></View>
            </View>
        )
    }
}
