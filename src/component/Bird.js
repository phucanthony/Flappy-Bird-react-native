/**
 * Created by Admin on 15-May-17.
 */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {vw, vh, vmin, vmax} from '../services/viewport'


export default class Bird extends Component {
    constructor(props) {
        super(props);
        this.state = { margin: 0}
    }

    startAnimation(){
        if (this.animating)
            return;
        this.intervalId = setInterval (() => {
            this.setState({
                margin: (this.state.margin+10)%30
            })
        }, 100);

        this.animating = true;
    }

    stopAnimation(){
        if (this.animating){
            clearInterval(this.intervalId)
            this.animating = false;
        }
    }

    componentDidMount(){
        if (this.props.animate)
            this.startAnimation();
    }

    componentWillUnmount(){
        this.stopAnimation();
    }

    componentWillUpdate(nextProps, nextState){
        if(this.props.animate != nextProps.animate) {
            if(nextProps.animate)
                this.startAnimation();
            else
                this.stopAnimation();
        }
    }

    render(){
        return(
            <View style={{
                position: 'absolute',
                left: this.props.x,
                top: this.props.y,
                width: 10*vmin,
                height: 10*vmin,
                overflow: 'hidden',
            }}>
                <View style={ { marginTop: -this.state.margin*vmin} }>
                    <Image source={require('../images/bird1.png')} style={ { width: 10*vmin, height: 10*vmin} }/>
                    <Image source={ require('../images/bird2.png') }
                           style={ { width: 10*vmin, height: 10*vmin} } />
                    <Image source={ require('../images/bird3.png') }
                           style={ { width: 10*vmin, height: 10*vmin} } />
                </View>
            </View>
        )
    }
}

