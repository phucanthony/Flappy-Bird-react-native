import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import Bird from './component/Bird'
import Pipe from './component/Pipe'
import Ground from './component/Ground'
import GameOver from './component/GameOver'
import Start from './component/Start'
import StartAgain from './component/StartAgain'

import * as appActions from './store/action/app'
import {vw, vh, vmin, vmax} from './services/viewport'
import { Provider, connect } from 'react-redux';

var requestAnimation = requestAnimationFrame;
var time = new Date();
var myReqAnimationId;

type Props = {
	game?: Object,
	dispatch?: Function,
};

@connect(({ app }) => {
	return {
		game: app.game,
		gameOver: app.gameOver,
		start: app.start,
	}
})

class App extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = { pause: false };
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextState.pause){
			return false;
		}
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		if(nextProps.gameOver){
			this.setState({ pause: true });
			cancelAnimationFrame(myReqAnimationId);
		}
	}

	update() {
		console.log("GameOver:", this.props.gameOver);
		var timeDiff = new Date() - time;
		time = new Date();
		this.props.dispatch(appActions.tick(timeDiff));
		myReqAnimationId = requestAnimation(this.update.bind(this))
	}

	startFlappyBird(){
		time = new Date();
		this.props.dispatch(appActions.start());
		myReqAnimationId = requestAnimation(this.update.bind(this));
	}

	startFlappyBirdAgain(){
		console.log("Props <<<<:", this.props.game);
		time = new Date();
		this.props.dispatch(appActions.startAgain());
		this.setState({ pause: false });
	}

	clickMeToBounce(){
		this.props.dispatch(appActions.bounce());
	}

	render() {
		return(
			<TouchableOpacity style={styles.image}
							  activeOpacity={1}
							  onPress = {this.clickMeToBounce.bind(this)}>
				<Image style={ styles.image } source={ require('./images/bg.png')}>
					<View style={{position:'absolute', top: 0, left: 0}}>
						{this.props.gameOver ? <GameOver/> : <Text></Text>}
						{!this.props.start ? <Start onStart = {this.startFlappyBird.bind(this)}/> : <Text></Text>}
						<Bird x = {this.props.game.objects.bird.position.x * vw}
							  y = {this.props.game.objects.bird.position.y * vh}
							  animate = {true}/>
						<Pipe x = {this.props.game.objects.pipe.position}
							  topHeight = {this.props.game.objects.pipe.topHeight}/>
						<Pipe x = {this.props.game.objects.pipe1.position}
							  topHeight = {this.props.game.objects.pipe1.topHeight}/>
						<Ground x = {this.props.game.objects.ground.position.x}
								y = {this.props.game.objects.ground.position.y}
								width = {this.props.game.objects.ground.dimension.width}
								height = {this.props.game.objects.ground.dimension.height}/>
						<Ground x = {this.props.game.objects.ground1.position.x}
								y = {this.props.game.objects.ground1.position.y}
								width = {this.props.game.objects.ground1.dimension.width}
								height = {this.props.game.objects.ground1.dimension.height}/>
						{(this.props.gameOver && this.props.start ) ? <StartAgain onStartAgain = {this.startFlappyBirdAgain.bind(this)}/> : <Text></Text>}
					</View>
				</Image>
			</TouchableOpacity>
		)
	}
}

type ContainerProps = {
	store: Object,
};

export default function AppContainer({ store }: ContainerProps) {
	return <Provider store={store}>
		<App/>
	</Provider>;
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
	}
});