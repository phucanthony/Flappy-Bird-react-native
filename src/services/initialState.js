import {vw, vh, vmin, vmax , heightOfPipeUp ,
    heightOfPipeDown ,  heightOfGround , heightOfInvisibleArea ,
    positionOfPipeDown  } from './viewport'



const initialState = {
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
                topHeight: Math.floor(Math.random()*(50-10+1))+10
            },
            pipe1: {
                position: 210,
                velocity: {
                    x: -1,
                    y: 0
                },
                topHeight: Math.floor(Math.random()*(50-10+1))+10
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
        }
    },
    gameOver: false,
    start: false,
    pause: false,
    animate: false,
}

export const startAgainState = {
    game: {
        objects: {
            bird: {
                position: {
                    x: 46,
                    y: 30
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
                topHeight: Math.floor(Math.random()*(50-10+1))+10
            },
            pipe1: {
                position: 210,
                velocity: {
                    x: -1,
                    y: 0
                },
                topHeight: Math.floor(Math.random()*(50-10+1))+10
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
        }
    },
    gameOver: false,
    start: true,
    pause: false,
    animate: false
}

export default initialState