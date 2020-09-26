const { session } = require('../../storage')
const gamble = require('../gamble')
const errors = require('../errors')

const { last, castArray, drop } = require('lodash')

const UTILS = {

    gamble (gameData, gambleData, gambleRes) {
        // push the generated card/cards on to the history stack
        gambleData.history.push(gambleRes.last)

        // for cards type of gamble
        gambleData.current = gambleRes.current

        // multiply hold with multiplier ( 0 if lost )
        gameData.hold *= gambleRes.mult

        // increment step
        gameData.gambleStep += 1
    },

    endGamble (sessionData, gameData, gambleData, gambleRes) {
        if (gambleRes.win === false || gameData.gambleStep > gambleData.maximum) {
            if (gambleRes.win === true) {
                // can now spin
                gameData.canSpin = false
                // can not collect as there is no win
                gameData.canCollect = true
                // can now change bet
                gameData.canChangeBet = false
                // can now change lines
                gameData.canChangeLines = false
            } else {
                // reset hold (up this point if was not lost we added that to credits)
                gameData.hold = 0
                // can now spin
                gameData.canSpin = true
                // can not collect as there is no win
                gameData.canCollect = false
                // can now change bet
                gameData.canChangeBet = true
                // can now change lines
                gameData.canChangeLines = true
            }

            // can not gamble anymore
            gameData.canGamble = false
            // step is null as it is not relevant anymore
            gameData.gambleStep = null

            // the card needed for cards type gamble set to null
            // gambleData.history.push(gambleData.current);
            // gambleData.current = null

            return true
        }

        return false
    }
}

const gambleGamble = async ({ pick }) => {
    const gameData = session.getSession('game.data')

    // if it can't gamble then return error
    if (gameData.canGamble !== true) {
        return { error: errors.errors.gambleStart }
    }

    // get session data
    const sessionData = session.getSession('data.data')

    // get gamble data => { history }
    const gambleData = session.getSession('gamble.data')

    // get gamble options
    const gambleOpt = session.getGambleOpt()

    // get gamble result
    // name ----> type of gamble
    // last(history) ----> last card
    // current ----> used for cards type gamble
    // pick ----> user pick
    const lastCard = last(gambleData.history)
    const gambleRes = gamble.gamble(gambleOpt.name, lastCard, gambleData.current, pick, gambleOpt.paytable)

    // set gamble history, gamble card, gamble step and hold
    UTILS.gamble(gameData, gambleData, gambleRes)

    // save hold if we might have max step reached
    const oldHold = gameData.hold

    // check if gamble ends => either lost or max step reached
    const end = UTILS.endGamble(sessionData, gameData, gambleData, gambleRes)

    // save session data
    await session.updateSession()

    // if ends is true then release session data
    if (end === true) {
        await session.releaseSessionGamble()
    }

    // return all data back
    return { sessionData, gameData, gambleData, gambleRes, finish: end, oldHold, error: null }
}

module.exports = gambleGamble
