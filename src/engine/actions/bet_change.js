const { session } = require('../../storage')
const { errors } = require('./../errors')

const { inRange } = require('lodash')

const betChange = async ({ index }) => {
    const gameData = session.getSession('game.data')

    if (gameData.canChangeBet !== true) {
        return { error: errors.betChange }
    }

    const bets = session.getGameOpt('bets')

    if (inRange(index, bets.length)) {
        gameData.bet = bets[index]
    } else {
        gameData.bet = bets[0]
    }

    return { gameData, error: null }
}

module.exports = betChange
