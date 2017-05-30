import React, { Component } from 'react'
import { View, Image } from 'react-native'

import {vw, vh, vmin, vmax} from '../services/viewport'

export default class Pipe extends Component {
    render(){
        return(
            <View style={{
                position: 'absolute',
                left: this.props.x * vw,
                top: 0,
                width: 15*vw, height: 80*vh,
            }}>
                <View style={{
                    backgroundColor: '#59DA5D',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderColor: 'black',
                    height: this.props.topHeight*vh,
                }}/>
                <View style={{
                    backgroundColor: '#59DA5D',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderBottomWidth: 2,
                    borderTopWidth: 2,
                    borderColor: 'black',
                    height: 3*vh}}/>
                <View style={{
                    height: 20*vh
                }}/>
                <View style={{
                    backgroundColor: '#59DA5D',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderBottomWidth: 2,
                    borderTopWidth: 2,
                    borderColor: 'black',
                    height: 3*vh}}/>
                <View style={{
                    backgroundColor: '#59DA5D',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderColor: 'black',
                    flex: 1
                }}/>
            </View>
        )
    }
}
