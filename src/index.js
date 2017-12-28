import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Provider, connect } from 'react-redux';
import Bird from './component/Bird';
import Pipe from './component/Pipe';
import Ground from './component/Ground';
import GameOver from './component/GameOver';
import Start from './component/Start';
import StartAgain from './component/StartAgain';
import Score from './component/Score';

import * as appActions from './store/action/app';
import { vw, vh, vmin, vmax } from './services/viewport';

const requestAnimation = requestAnimationFrame;
let time = new Date();
let myReqAnimationId;

type Props = {
	game?: Object,
	dispatch?: Function,
};

@connect(({ app }) => {
	return {
		game: app.game,
		gameOver: app.gameOver,
		start: app.start,
		score: app.score,
	};
})

class App extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = { pause: false };
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !nextState.pause;
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.gameOver) {
			this.setState({ pause: true });
			cancelAnimationFrame(myReqAnimationId);
		}
	}

	update() {
		const timeDiff = new Date() - time;
		time = new Date();
		this.props.dispatch(appActions.tick(timeDiff));
		myReqAnimationId = requestAnimation(this.update.bind(this));
	}

	startFlappyBird() {
		time = new Date();
		this.props.dispatch(appActions.start());
		myReqAnimationId = requestAnimation(this.update.bind(this));
	}

	startFlappyBirdAgain() {
		time = new Date();
		this.props.dispatch(appActions.startAgain());
		this.setState({ pause: false });
	}

	clickMeToBounce() {
		this.props.dispatch(appActions.bounce());
	}

	render() {
		return (
			<TouchableOpacity
				style={styles.image}
				activeOpacity={1}
				onPress={() => this.clickMeToBounce()}>
				<ImageBackground style={styles.image}
												 source={{ uri: 'https://previews.123rf.com/images/svetlanaprikhnenko/svetlanaprikhnenko1304/svetlanaprikhnenko130400007/18847705-seamless-background-with-footprint-of-cat-and-dog-Stock-Vector.jpg' }}
												 resizeMode="cover"
												 // source={require('./images/bg.png')}
				>
					<View style={{ position:'absolute', top: 0, left: 0 }}>
						{this.props.gameOver ? <GameOver/> : <Text />}
						{!this.props.start ? <Start onStart={() => this.startFlappyBird()}/> : <Text />}
						<Bird x={this.props.game.objects.bird.position.x * vw}
									y={this.props.game.objects.bird.position.y * vh} animate/>
						<Pipe x={this.props.game.objects.pipe.position}
									topHeight={this.props.game.objects.pipe.topHeight}/>
						<Pipe x={this.props.game.objects.pipe1.position}
									topHeight={this.props.game.objects.pipe1.topHeight}/>
						<Ground
							x={this.props.game.objects.ground.position.x}
							y={this.props.game.objects.ground.position.y}
							width={this.props.game.objects.ground.dimension.width}
							height={this.props.game.objects.ground.dimension.height}/>
						<Ground
							x={this.props.game.objects.ground1.position.x}
							y={this.props.game.objects.ground1.position.y}
							width={this.props.game.objects.ground1.dimension.width}
							height={this.props.game.objects.ground1.dimension.height}/>
						<Score score={this.props.score}/>
						{(this.props.gameOver && this.props.start) ? <StartAgain onStartAgain={() => this.startFlappyBirdAgain()}/> : <Text />}
					</View>
				</ImageBackground>
			</TouchableOpacity>
		);
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