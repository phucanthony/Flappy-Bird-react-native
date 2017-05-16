import {vw, vh, vmin, vmax } from '../services/viewport'

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

function getUpdatedGroundPosition(ground) {
    var distanceCovered = ground.velocity.x;
    if (ground.position.x > -97) {
        return { x: ground.position.x + distanceCovered, y: 80 }
    }
    else {
        return { x: 100, y: 80}
    }
}

function detectCollitionBirdPipe(bird, pipe){
    var birdXPosition = bird.position.x;
    var birdYPosition = bird.position.y;
    var birdWidth = bird.dimension.width;
    var birdHeight = bird.dimension.height;

    var pipeXPosition = pipe.position;
    var pipeHolePosition = pipe.topHeight;
    var pipeWidth = 15;

    if ((birdXPosition > pipeXPosition) && (birdXPosition <= pipeXPosition + 15) && (birdYPosition < pipeHolePosition)) {
        return true
    }
    if ((birdXPosition > pipeXPosition) && (birdXPosition <= pipeXPosition + 15) && (birdYPosition + 4 >= (pipeHolePosition + 20))) {
        return true
    }
    if ((birdXPosition >= pipeXPosition - birdWidth) && (birdXPosition <= pipeXPosition) && (birdYPosition <= pipeHolePosition )) {
        return true
    }
    if ((birdXPosition >= pipeXPosition - birdWidth) && (birdXPosition <= pipeXPosition) && (birdYPosition >= pipeHolePosition + 20)) {
        return true
    }
}

function detectCollitionGround(bird){
    var birdYPosition = bird.position.y;
    var birdHeight = bird.dimension.height;
    if ((birdYPosition < 0) || (birdYPosition + birdHeight > 80))
    {return true}
}

export function checkCollition(gameObjects){
    if (detectCollitionBirdPipe(gameObjects.bird,gameObjects.pipe)) {
        return true;
    }
    if (detectCollitionBirdPipe(gameObjects.bird,gameObjects.pipe1)) {
        return true;
    }
    if (detectCollitionGround(gameObjects.bird)) {
        return true;
    }
    else {
        return false;
    }
}

export function bounce(bird){
    var bounceUpdatedVelocity = { x: bird.velocity.x, y: -0.05 }
    return newBird = Object.assign({}, bird, { velocity: bounceUpdatedVelocity })
}

export function updateBird(bird, dt = 1000/60, gravity = 0.0001){
    var newPosition = getUpdatedY(bird,dt,gravity);
    var updatedVelocity = getUpdatedVelocity(newPosition,bird,dt,gravity);
    return newBird = Object.assign({}, bird,
        { position: newPosition, velocity: updatedVelocity })
}

export function updatePipe(pipe){
    var newPositionOfPipe = getUpdateDistanceForPipe(pipe);
    var newHolePosition = getUpdateHole(pipe);
    return newPipe = Object.assign({}, pipe, {position: newPositionOfPipe, topHeight: newHolePosition})
}

export function updateGround(ground){
    var newGroundPosition = getUpdatedGroundPosition(ground);
    return newGround = Object.assign({}, ground, {position: newGroundPosition})
}
