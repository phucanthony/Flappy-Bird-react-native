import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import Bird from './component/Bird'
import Pipe from './component/Pipe'
import Ground from './component/Ground'
import GameOver from './component/GameOver'
import Start from './component/Start'
import StartAgain from './component/StartAgain'

import initialState, {startAgainState} from './services/initialState'

import { bounce, updatePipe, updateGround, updateBird, checkCollition } from './services/gameFunction'

import {vw, vh, vmin, vmax} from './services/viewport'

var requestAnimation = requestAnimationFrame;
var time = new Date();
var myReqAnimationId;

export default class MainGame extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.pause){
            return false;
        }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.pause){
            cancelAnimationFrame(myReqAnimationId);
        }
    }

    update() {
        var timeDiff = new Date() - time;
        time = new Date();
        this.setState({
            game: {
                objects: {
                    bird: updateBird(this.state.game.objects.bird,timeDiff,0.0001),
                    ground: updateGround(this.state.game.objects.ground),
                    ground1: updateGround(this.state.game.objects.ground1),
                    pipe: updatePipe(this.state.game.objects.pipe),
                    pipe1: updatePipe(this.state.game.objects.pipe1)
                }
            },
            gameOver: checkCollition(this.state.game.objects),
            start: true,
            pause: this.state.pause,
            animate: true,
        });
        if (this.state.gameOver) {
            this.setState({
                game: this.state.game,
                gameOver: this.state.gameOver,
                start: this.state.start,
                pause: true,
                animate: this.state.animate,
            })
        }
        myReqAnimationId = requestAnimation(this.update.bind(this))
    }

    startFlappyBird(){
        time = new Date();
        myReqAnimationId = requestAnimation(this.update.bind(this))
    }

    startFlappyBirdAgain(){
        time = new Date();
        this.setState(startAgainState);
        myReqAnimationId = requestAnimation(this.update.bind(this))
    }

    clickMeToBounce(){
        this.setState({
            game: {
                objects: {
                    bird: bounce(this.state.game.objects.bird),
                    ground: this.state.game.objects.ground,
                    ground1: this.state.game.objects.ground1,
                    pipe: this.state.game.objects.pipe,
                    pipe1: this.state.game.objects.pipe1
                }
            },
            gameOver: this.state.gameOver,
            start: this.state.start,
            pause: this.state.pause,
            animate: this.state.animate,
        })
    }

    render() {
        return(
            <TouchableOpacity style={styles.image}
                              activeOpacity={1}
                              onPress = {this.clickMeToBounce.bind(this)}>
                <Image style={ styles.image } source={ require('./images/bg.png')}>
                    <View style={{position:'absolute', top: 0, left: 0}}>
                        {this.state.gameOver ? <GameOver/> : <Text></Text>}
                        {!this.state.start ? <Start onStart = {this.startFlappyBird.bind(this)}/> : <Text></Text>}
                        <Bird x = {this.state.game.objects.bird.position.x * vw}
                              y = {this.state.game.objects.bird.position.y * vh}
                              animate = {this.state.animate}/>
                        <Pipe x = {this.state.game.objects.pipe.position}
                              topHeight = {this.state.game.objects.pipe.topHeight}/>
                        <Pipe x = {this.state.game.objects.pipe1.position}
                              topHeight = {this.state.game.objects.pipe1.topHeight}/>
                        <Ground x = {this.state.game.objects.ground.position.x}
                                y = {this.state.game.objects.ground.position.y}
                                width = {this.state.game.objects.ground.dimension.width}
                                height = {this.state.game.objects.ground.dimension.height}/>
                        <Ground x = {this.state.game.objects.ground1.position.x}
                                y = {this.state.game.objects.ground1.position.y}
                                width = {this.state.game.objects.ground1.dimension.width}
                                height = {this.state.game.objects.ground1.dimension.height}/>
                        {(this.state.gameOver && this.state.start ) ? <StartAgain onStartAgain = {this.startFlappyBirdAgain.bind(this)}/> : <Text></Text>}
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    }
})