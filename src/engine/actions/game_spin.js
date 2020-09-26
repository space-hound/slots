const { session } = require('../../storage')
const wheels = require('../wheels')
const errors = require('./../errors')

const UTILS = {

    canSpin (sessionData, gameData) {
        if (gameData.canSpin !== true) {
            return { able: false, error: errors.errors.gameSpin }
        }

        if (sessionData.credits < gameData.bet) {
            return { able: false, error: errors.errors.no_funds }
        }

        return { able: true, error: null }
    },

    /* ============================================================================= */

    takeCredits_classic (sessionData, gameData) {
        sessionData.credits -= gameData.bet
    },

    takeCredits_freegames (gameData) {
        throw new Error(errors.types.NotImplemented)
    },

    takeCredits_expanding (gameData) {
        throw new Error(errors.types.NotImplemented)
    },

    /* ============================================================================= */

    applySpin_classic (gameData, spinRes) {
        gameData.current = spinRes.matrix

        if (spinRes.wins === null) {
            // if there is no wins then it can spin again without collect

            // make wins null
            gameData.wins = null
            // hold make sure is zero
            gameData.hold = 0

            // can now change bet
            gameData.canChangeBet = true
            // can now change lines
            gameData.canChangeLines = true

            // can spin again
            gameData.canSpin = true

            // nothing to collect
            gameData.canCollect = false
            // nothing to gamble
            gameData.canGamble = false
        } else {
            // if there is wins it first must collect to be able to spin

            // make wins as the current wins
            gameData.wins = spinRes.wins
            // make hold as the total hold
            gameData.hold = spinRes.total

            // can not change bet or lines untill collect or lose in gamble
            gameData.canChangeBet = false
            gameData.canChangeLines = false

            // can not spin untill collect
            gameData.canSpin = false

            // can gamble or collect
            gameData.canGamble = true
            gameData.canCollect = true
        }
    },

    applySpin_freegames (gameData, spinRes) {
        throw new Error(errors.types.NotImplemented)

        /*
            if hase free games

            we care about
                - spinRes.others
                - spinRes.frames

            canChangeBet = false;
            canChangeLine = false;
            canSpin = false;

            untill collect

        */
    },

    applySpin_expanding (gameData, spinRes) {
        throw new Error(errors.types.NotImplemented)

        /*
            if has expanding with respin

            we care about
                - spinRes.others
                - spinRes.frames

            canChangeBet = false;
            canChangeLine = false;
            canSpin = false;

            untill collect

        */
    }
}

const gameSpin = async () => {
    // get the session data { name, credits }
    const sessionData = session.getSession('data.data')

    // get the game data
    const gameData = session.getSession('game.data')

    // check if user can spin
    const canSpin = UTILS.canSpin(sessionData, gameData)

    if (canSpin.able !== true) {
        // if is not able to spin return the error
        return { error: canSpin.error }
    }

    // get game options (settings)
    const gameOpt = session.getGameOpt()

    // take a spin => { matrix, wins, total, others, frames }
    const spinRes = wheels.spin(gameData, gameOpt)

    // remove credits from session data if have to
    UTILS[`applySpin_${gameOpt.type}`](gameData, spinRes)

    // remove credits from session data if have to
    UTILS[`takeCredits_${gameOpt.type}`](sessionData, gameData)

    // save result to storage
    await session.updateSession()

    return { sessionData, gameData, spinRes, error: null }
}

module.exports = gameSpin
