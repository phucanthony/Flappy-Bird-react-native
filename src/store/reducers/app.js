import * as Actions from '../actions'
import {vw, vh, vmin, vmax } from '../../services/viewport'
import { utils } from 'react-universal-ui';

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
};

function getUpdatedVelocity( newPosition, bird, timeLapsed, gravity ){
	let updatedVelocity = bird.velocity.y + timeLapsed * gravity;
	if (newPosition > 100) {
		updatedVelocity = 0;
	}
	return { x: bird.velocity.x, y: updatedVelocity }
}

function getUpdatedY(bird, timeLapsed, gravity){
	let distanceCovered = bird.velocity.y * timeLapsed + 0.5 * gravity * timeLapsed * timeLapsed;
	return { x: bird.position.x , y: bird.position.y + distanceCovered }
}

function updateBird(bird, dt = 1000/60, gravity = 0.0001){
	var newPosition = getUpdatedY(bird,dt,gravity);
	var updatedVelocity = getUpdatedVelocity(newPosition,bird,dt,gravity);
	return newBird = Object.assign({}, bird,
		{ position: newPosition, velocity: updatedVelocity })
}

function getUpdateDistanceForPipe(pipe) {
	var distanceCovered = pipe.velocity.x;
	if (pipe.position > 0 - 15 * vw ) {
		return pipe.position + distanceCovered
	}
	else {
		return 100
	}
}

function getUpdateHole(pipe){
	if (pipe.position > 0 - 15 * vw) {
		return pipe.topHeight;
	}
	else {
		var updatedHolePosition = Math.floor(Math.random()*(50-10+1))+10;
		return updatedHolePosition;
	}
}

function updatePipe(pipe){
	var newPositionOfPipe = getUpdateDistanceForPipe(pipe);
	var newHolePosition = getUpdateHole(pipe);
	return newPipe = Object.assign({}, pipe, {position: newPositionOfPipe, topHeight: newHolePosition})
}

function getUpdatedGroundPosition(ground) {
	var distanceCovered = ground.velocity.x;
	if (ground.position.x > -97) {
		return { x: ground.position.x + distanceCovered, y: 80 }
	}
	else {
		return { x: 100, y: 80}
	}
}

function updateGround(ground){
	var newGroundPosition = getUpdatedGroundPosition(ground);
	return newGround = Object.assign({}, ground, {position: newGroundPosition})
}

function detectCollisionBirdPipe(bird, pipe){
	var birdXPosition = bird.position.x;
	var birdYPosition = bird.position.y;
	var birdWidth = bird.dimension.width;

	var pipeXPosition = pipe.position;
	var pipeHolePosition = pipe.topHeight;

	if ((birdXPosition > pipeXPosition) && (birdXPosition <= pipeXPosition + 15) && (birdYPosition < pipeHolePosition)) {
		return true
	}
	if ((birdXPosition > pipeXPosition) && (birdXPosition <= pipeXPosition + 15) && (birdYPosition + 4 >= (pipeHolePosition + 20))) {
		return true
	}
	if ((birdXPosition >= pipeXPosition - birdWidth) && (birdXPosition <= pipeXPosition) && (birdYPosition - 4 <= pipeHolePosition )) {
		return true
	}
	if ((birdXPosition >= pipeXPosition - birdWidth) && (birdXPosition <= pipeXPosition) && (birdYPosition >= pipeHolePosition + 20)) {
		return true
	}
}

function detectCollisionGround(bird){
	var birdYPosition = bird.position.y;
	var birdHeight = bird.dimension.height;
	if ((birdYPosition < 0) || (birdYPosition + birdHeight > 80))
	{return true}
}

function checkCollision(gameObjects){
	if (detectCollisionBirdPipe(gameObjects.bird,gameObjects.pipe)) {
		return true;
	}
	if (detectCollisionBirdPipe(gameObjects.bird,gameObjects.pipe1)) {
		return true;
	}
	if (detectCollisionGround(gameObjects.bird)) {
		return true;
	}
	else {
		return false;
	}
}

function bounce(bird){
	var bounceUpdatedVelocity = { x: bird.velocity.x, y: -0.05 };
	return newBird = Object.assign({}, bird, { velocity: bounceUpdatedVelocity })
}

export default utils.appReducer((state = initialState, action) => {
	switch (action.type) {
		case Actions.TICK:
			return {...state,
				game: {...state.game,
					objects: {...state.game.objects,
						bird: updateBird(state.game.objects.bird, action.dt, state.gravity),
						pipe: updatePipe(state.game.objects.pipe),
						pipe1: updatePipe(state.game.objects.pipe1),
						ground: updateGround(state.game.objects.ground),
						ground1: updateGround(state.game.objects.ground1)
					}},
				gameOver: checkCollision(state.game.objects),
			};
		case Actions.BOUNCE:
			return {...state,
				game: {...state.game,
					objects: {...state.game.objects,
						bird: bounce(state.game.objects.bird)
					}
				}
			};
		case Actions.START:
			return {...state, start: true };
		case Actions.STARTAGAIN:
			return startAgainState;
		default:
			return state;
	}
})