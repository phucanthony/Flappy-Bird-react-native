import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { vw, vh, vmin, vmax } from '../services/viewport';

type Props = {
	x ?: number,
	topHeight ?: number
}

export default class Pipe extends Component {
	props: Props;

	render() {
		return (
			<View style={[styles.pipeContainer, { left: this.props.x * vw }]}>
				<View style={[styles.topPipe, { height: this.props.topHeight * vh, }]}/>
				<View style={styles.smallBox}/>
				<View style={{ height: 20 * vh }}/>
				<View style={styles.smallBox}/>
				<View style={styles.bottomPipe}/>
			</View>
		);
	}
}

const pipeColor = 'grey';

const styles = StyleSheet.create({
	pipeContainer: {
		position: 'absolute', top: 0, width: 15 * vw, height: 80 * vh,
	},
	topPipe: { backgroundColor: pipeColor, borderLeftWidth: 2, borderRightWidth: 2, borderColor: 'black',
	},
	smallBox: {
		backgroundColor: pipeColor,
		borderWidth: 2,
		borderColor: 'black',
		height: 3 * vh
	},
	bottomPipe: {
		backgroundColor: pipeColor,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: 'black',
		flex: 1
	}
});
