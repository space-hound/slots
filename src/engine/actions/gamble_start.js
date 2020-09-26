const { session } = require('../../storage')
const cardsdeck = require('../cardsdeck')
const errors = require('../errors')

const { drop, last } = require('lodash')

const INITIAL_CHECKUP = {

    general (gambleData, gameData) {
        //console.log(gambleData.history)

        if (gambleData.history.length === 0) {
            gambleData.history.push(...cardsdeck.pickCards(gambleData.historyCap))
        }

        if (gambleData.history.length > gambleData.historyCap) {
            const count = gambleData.history.length - gambleData.historyCap
            gambleData.history = drop(gambleData.history, count)
        }

        // if gambleStep is null make it 1
        if (gameData.gambleStep === null) {
            gameData.gambleStep = 1
        }

        // if current card is null initialize it
        if (gambleData.current === null) {
            gambleData.current = cardsdeck.pickCard()
        }

        // can not change bet or lines
        gameData.canChangeBet = false
        gameData.canChangeLines = false
        // can not spin or collect (can collect only from gamble now)
        gameData.canSpin = false
        gameData.canCollect = false
    }
}

const gambleStart = async ({ gambleName }) => {
    const gameData = session.getSession('game.data')

    // if it can't gamble then return error
    if (gameData.canGamble !== true) {
        return { error: errors.errors.gambleStart }
    }

    // get gamble options
    const gambleOpt = await session.loadSessionGamble(gambleName)

    // get gamble data => { history }
    const gambleData = session.getSession('gamble.data')

    // make the inital checkup and settings
    INITIAL_CHECKUP.general(gambleData, gameData)

    return { gameData, gambleData, gambleOpt, error: null }
}

module.exports = gambleStart
