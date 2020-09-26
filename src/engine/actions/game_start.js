const { session } = require('../../storage')
const wheels = require('./../wheels')
const errors = require('../errors')

const INITIAL_CHECKUP = {

    __general (gameOpt, gameData) {
        if (gameData.bet === null) {
            gameData.bet = gameOpt.bets[0]
        }

        if (gameData.lines === null) {
            gameData.lines = gameOpt.lines
        }

        if (gameData.current === null) {
            const { matrix } = wheels[`__${gameOpt.type}`](gameData, gameOpt)

            gameData.current = matrix
        }
    },

    classic (gameOpt, gameData) {
        this.__general(gameOpt, gameData)
    },

    expanding (gameOpt, gameData) {
        this.__general(gameOpt, gameData)

        throw new Error(errors.types.NotImplemented)
    },

    freegames (gameOpt, gameData) {
        this.__general(gameOpt, gameData)

        throw new Error(errors.types.NotImplemented)
    }
}

const gameStart = async ({ gameName }) => {
    let gameData = session.getSession('game.data')

    if (gameData !== null) {
        const gameOpt = session.getGameOpt()

        return { gameData: gameData, gameOpt: gameOpt, error: null }

        return { error: errors.errors.gameStart }
    }

    await session.loadSessionGame(gameName)

    gameData = session.getSession('game.data')

    const gameOpt = session.getGameOpt()

    INITIAL_CHECKUP[gameOpt.type](gameOpt, gameData)

    return { gameData: gameData, gameOpt: gameOpt, error: null }
}

module.exports = gameStart
