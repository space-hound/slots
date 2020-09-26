const { session } = require('../../storage')
const errors = require('../errors')

const UTILS = {

    canCollect (gameData) {
        return gameData.hold > 0 && gameData.canGamble === true
    },

    collect (sessionData, gameData, gambleData) {
        // can not gamble anymore
        gameData.canGamble = false
        // step is null as it is not relevant anymore
        gameData.gambleStep = null

        // can now change bet
        gameData.canChangeBet = false
        // can now change lines
        gameData.canChangeLines = false
        // can now spin
        gameData.canSpin = false
        // can not collect as there is no win
        gameData.canCollect = true

        // the card needed for cards type gamble set to null
        // gambleData.current = null
    }
}

const gambleCollect = async () => {
    const gameData = session.getSession('game.data')

    // if it can't gamble then return error
    if (UTILS.canCollect(gameData) !== true) {
        return { error: errors.errors.gambleCollect }
    }

    // get session data
    const sessionData = session.getSession('data.data')

    // get gamble data => { history }
    const gambleData = session.getSession('gamble.data')

    // save hold if we might have max step reached
    const oldHold = gameData.hold

    UTILS.collect(sessionData, gameData, gambleData)

    // save session data
    await session.updateSession()

    // release the gamble object
    await session.releaseSessionGamble()

    // return all data back
    return { sessionData, gameData, gambleData, oldHold, error: false }
}

module.exports = gambleCollect
