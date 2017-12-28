import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { vw, vh, vmin, vmax } from '../services/viewport';

type Props = {
	score ?: number
}

export default class Score extends Component {
	props: Props;

	shouldComponentUpdate(nextProps) {
		return !nextProps.score !== this.props.score;
	}

	static getScoreImage(num) {
		switch (num) {
		case '0':
			return require('../images/flappybird_00.png');
		case '1':
			return require('../images/flappybird_01.png');
		case '2':
			return require('../images/flappybird_02.png');
		case '3':
			return require('../images/flappybird_03.png');
		case '4':
			return require('../images/flappybird_04.png');
		case '5':
			return require('../images/flappybird_05.png');
		case '6':
			return require('../images/flappybird_06.png');
		case '7':
			return require('../images/flappybird_07.png');
		case '8':
			return require('../images/flappybird_08.png');
		case '9':
			return require('../images/flappybird_09.png');
		default:
			return require('../images/flappybird_00.png');
		}
	}

	render() {
		const scoreString = this.props.score.toString();
		const scoreArray = [];
		for (let i = 0; i < scoreString.length; i++) {
			scoreArray.push(scoreString[i]);
		}
		return (
            <View style={{ position: 'absolute', left: 45 * vmin, top: 20 * vmax, flexDirection: 'row', zIndex: 5 }}>
                { scoreArray.map((item, index) => {
	return <Image key={index} resizeMode="stretch" source={Score.getScoreImage(item)} style={{ height: 40, width: 30 }}/>;
}) }
            </View>
		);
	}
}