const { session } = require('../../storage')
const errors = require('./../errors')

const UTILS = {

    collect (sessionData, gameData) {
        // add the hold to credits
        sessionData.credits += gameData.hold

        // set wins to null
        gameData.wins = null
        // set hold to 0
        gameData.hold = 0

        // mark that it can now spin
        gameData.canSpin = true

        // can not gamble now untill next spin if yields wins
        gameData.canGamble = false
        // can not collect again untill next spin if yields wins
        gameData.canCollect = false

        // can change bet or lines now
        gameData.canChangeBet = true
        gameData.canChangeLines = true
    }
}

const gameCollect = async () => {
    // get the session data { name, credits }
    const sessionData = session.getSession('data.data')

    // get the game data
    const gameData = session.getSession('game.data')

    if (gameData.canCollect !== true) {
        // if is not able to spin return the error
        return { error: errors.errors.game_collect }
    }

    // add credits from hold to credits and set other data
    UTILS.collect(sessionData, gameData)

    // save current data to storage
    await session.updateSession()

    return { sessionData, gameData, error: null }
}

module.exports = gameCollect
