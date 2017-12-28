import { appReducer } from 'react-universal-ui';
import * as Actions from '../actions';
import { vw, vh, vmin, vmax } from '../../services/viewport';

const initialState = {
	gravity: 0.0001,
	game: {
	  objects: {
		  bird: {
			  position: {
				  x: 46,
				  y: 20
			  },
			  velocity: {
				  x: 0,
				  y: 0
			  },
			  dimension: {
				  width: 10,
				  height: 8
			  },
		  },
		  pipe: {
			  position: 130,
			  velocity: {
				  x: -1,
				  y: 0
			  },
			  topHeight: Math.floor(Math.random() * (50 - 10 + 1)) + 10
		  },
		  pipe1: {
			  position: 210,
			  velocity: {
				  x: -1,
				  y: 0
			  },
			  topHeight: Math.floor(Math.random() * (50 - 10 + 1)) + 10
		  },
		  ground: {
			  position: {
				  x: 0,
				  y: 80,
			  },
			  velocity: {
				  x: -1,
				  y: 0
			  },
			  dimension: {
				  width: 100,
				  height: 20,
			  }
		  },
		  ground1: {
			  position: {
				  x: 100,
				  y: 80,
			  },
			  velocity: {
				  x: -1,
				  y: 0
			  },
			  dimension: {
				  width: 100,
				  height: 20,
			  }
		  }
	  },
  	},
	gameOver: false,
	start: false,
	score: 0,
};

const startAgainState = {
	gravity: 0.0001,
	game: {
		objects: {
			bird: {
				position: {
					x: 46,
					y: 20
				},
				velocity: {
					x: 0,
					y: 0
				},
				dimension: {
					width: 10,
					height: 8
				},
			},
			pipe: {
				position: 160,
				velocity: {
					x: -1,
					y: 0
				},
				topHeight: Math.floor(Math.random() * (50 - 10 + 1)) + 10
			},
			pipe1: {
				position: 240,
				velocity: {
					x: -1,
					y: 0
				},
				topHeight: Math.floor(Math.random() * (50 - 10 + 1)) + 10
			},
			ground: {
				position: {
					x: 0,
					y: 80,
				},
				velocity: {
					x: -1,
					y: 0
				},
				dimension: {
					width: 100,
					height: 20,
				}
			},
			ground1: {
				position: {
					x: 100,
					y: 80,
				},
				velocity: {
					x: -1,
					y: 0
				},
				dimension: {
					width: 100,
					height: 20,
				}
			}
		},
	},
	gameOver: false,
	start: true,
	score: 0,
};

function getUpdatedVelocity(newPosition, bird, timeLapsed, gravity) {
	let updatedVelocity = bird.velocity.y + timeLapsed * gravity;
	if (newPosition > 100) {
		updatedVelocity = 0;
	}
	return { x: bird.velocity.x, y: updatedVelocity };
}

function getUpdatedY(bird, timeLapsed, gravity) {
	const distanceCovered = bird.velocity.y * timeLapsed + 0.5 * gravity * timeLapsed * timeLapsed;
	return { x: bird.position.x, y: bird.position.y + distanceCovered };
}

function updateBird(bird, dt = 1000 / 60, gravity = 0.0001) {
	const newPosition = getUpdatedY(bird, dt, gravity);
	const updatedVelocity = getUpdatedVelocity(newPosition, bird, dt, gravity);
	return newBird = Object.assign({}, bird,
		{ position: newPosition, velocity: updatedVelocity });
}

function getUpdateDistanceForPipe(pipe) {
	const distanceCovered = pipe.velocity.x;
	if (pipe.position > 0 - (15 * vw)) {
		return pipe.position + distanceCovered;
	}	else {
		return 100;
	}
}

function getUpdateHole(pipe) {
	if (pipe.position > 0 - (15 * vw)) {
		return pipe.topHeight;
	}	else {
		return Math.floor(Math.random() * ((50 - 10) + 1)) + 10;
	}
}

function updatePipe(pipe) {
	const newPositionOfPipe = getUpdateDistanceForPipe(pipe);
	const newHolePosition = getUpdateHole(pipe);
	return Object.assign({}, pipe, { position: newPositionOfPipe, topHeight: newHolePosition });
}

function getUpdatedGroundPosition(ground) {
	const distanceCovered = ground.velocity.x;
	if (ground.position.x > -97) {
		return { x: ground.position.x + distanceCovered, y: 80 };
	}	else {
		return { x: 100, y: 80 };
	}
}

function updateGround(ground) {
	const newGroundPosition = getUpdatedGroundPosition(ground);
	return newGround = Object.assign({}, ground, { position: newGroundPosition });
}

function detectCollisionBirdPipe(bird, pipe) {
	const birdXPosition = bird.position.x;
	const birdYPosition = bird.position.y;
	const birdWidth = bird.dimension.width;

	const pipeXPosition = pipe.position;
	const pipeHolePosition = pipe.topHeight;

	if ((birdXPosition > pipeXPosition) && (birdXPosition <= pipeXPosition + 10) && (birdYPosition < pipeHolePosition)) {
		{	console.log('Case 1 <<<<');
			return true; }
	}
	if ((birdXPosition > pipeXPosition) && (birdXPosition <= pipeXPosition + 10) && (birdYPosition - 4 >= (pipeHolePosition + 20))) {
		{	console.log('Case 2 <<<<');
			return true; }
	}
	if ((birdXPosition >= pipeXPosition - birdWidth) && (birdXPosition <= pipeXPosition) && (birdYPosition <= pipeHolePosition)) {
		{	console.log('Case 3 <<<<');
			return true; }
	}
	if ((birdXPosition >= pipeXPosition - birdWidth) && (birdXPosition <= pipeXPosition) && (birdYPosition >= pipeHolePosition + 20)) {
		{	console.log('Case 4 <<<<');
			return true; }
	}
}

function detectCollisionGround(bird) {
	const birdYPosition = bird.position.y;
	const birdHeight = bird.dimension.height;
	if ((birdYPosition < 0) || (birdYPosition + birdHeight > 80))	{ return true; }
}

function checkCollision(gameObjects) {
	if (detectCollisionBirdPipe(gameObjects.bird, gameObjects.pipe)) {
		return true;
	}
	if (detectCollisionBirdPipe(gameObjects.bird, gameObjects.pipe1)) {
		return true;
	}
	if (detectCollisionGround(gameObjects.bird)) {
		return true;
	}	else {
		return false;
	}
}

function bounce(bird) {
	const bounceUpdatedVelocity = { x: bird.velocity.x, y: -0.05 };
	return Object.assign({}, bird, { velocity: bounceUpdatedVelocity });
}

function checkForBirdPass(pipe) {
	const pipePositionX = pipe.position;
 	return (pipePositionX + 15 === 46);
}

function checkForScoreUp(gameObjects, score) {
	if (checkForBirdPass(gameObjects.pipe) || checkForBirdPass(gameObjects.pipe1)) {
		score += 1;
	}
	return score;
}

export default appReducer((state = initialState, action) => {
	switch (action.type) {
	case Actions.TICK:
		return { ...state,
			game: { ...state.game,
				objects: { ...state.game.objects,
					bird: updateBird(state.game.objects.bird, action.dt, state.gravity),
					pipe: updatePipe(state.game.objects.pipe),
					pipe1: updatePipe(state.game.objects.pipe1),
					ground: updateGround(state.game.objects.ground),
					ground1: updateGround(state.game.objects.ground1)
				} },
			gameOver: checkCollision(state.game.objects),
			score: checkForScoreUp(state.game.objects, state.score),
		};
	case Actions.BOUNCE:
		return { ...state,
			game: { ...state.game,
				objects: { ...state.game.objects,
					bird: bounce(state.game.objects.bird)
				}
			}
		};
	case Actions.START:
		return { ...state, start: true };
	case Actions.STARTAGAIN:
		return startAgainState;
	default:
		return state;
	}
});