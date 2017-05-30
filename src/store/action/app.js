import * as Actions from '../actions';

export function tick (dt) {
	return { type: Actions.TICK, dt };
}

export function bounce() {
	return { type: Actions.BOUNCE };
}

export function start() {
	return { type: Actions.START };
}

export function startAgain() {
	return { type: Actions.STARTAGAIN };
}