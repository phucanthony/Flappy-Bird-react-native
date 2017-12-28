import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { vw, vh, vmin, vmax } from '../services/viewport';

type Props = {
	animate ?: boolean
}

export default class Bird extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = { margin: 0 };
	}

	startAnimation() {
		if (this.animating)			{ return; }
		this.intervalId = setInterval(() => {
			this.setState({
				margin: (this.state.margin + 10) % 30
			});
		}, 100);

		this.animating = true;
	}

	stopAnimation() {
		if (this.animating) {
			clearInterval(this.intervalId);
			this.animating = false;
		}
	}

	componentDidMount() {
		if (this.props.animate) this.startAnimation();
	}

	componentWillUnmount() {
		this.stopAnimation();
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props.animate !== nextProps.animate) {
			if (nextProps.animate) { this.startAnimation(); }			else { this.stopAnimation(); }
		}
	}

	renderStaticImage = () => {
		return <Image style={{ width: 10 * vmin, height: 10 * vmin }}
									resizeMode="cover"
									source={{ uri: 'https://i2.wp.com/whyareyouadog.com/wp-content/uploads/2017/09/02-Pug.png?ssl=1' }}/>;
	};

	renderAnimateImage = () => {
		return <View style={{ marginTop: -this.state.margin * vmin }}>
			<Image source={require('../images/bird1.png')} style={{ width: 10 * vmin, height: 10 * vmin }}/>
			<Image source={require('../images/bird2.png')}
						 style={{ width: 10 * vmin, height: 10 * vmin }} />
			<Image source={require('../images/bird3.png')}
						 style={{ width: 10 * vmin, height: 10 * vmin }} />
		</View>;
	};

	render() {
		return (
			<View style={{
				position: 'absolute', left: this.props.x, top: this.props.y, width: 10 * vw, height: 5 * vh, overflow: 'hidden', }} >
				{this.renderStaticImage()}
			</View>
		);
	}
}