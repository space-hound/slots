const { session } = require('../../storage')
const errors = require('../errors')

const { each, inRange } = require('lodash')

const lineChange = async ({ indexes }) => {
    const gameData = session.getSession('game.data')

    if (gameData.canChangeLines !== true) {
        return { error: errors.lineChange }
    }

    // get all lines
    const LINES = session.getGameOpt('lines')

    // set flag as false
    let fail = false

    // for each index in indexes
    each(indexes, value => {
        // check if index is out of bounds
        if (!inRange(value, LINES.length)) {
            // if true then something is fishy
            fail = true

            return false
        }
    })

    if (fail) {
        // if fail is true then set the current lines as all lines

        gameData.lines = LINES
    } else {
        // otehrwise set the lines as the lines at indexes

        gameData.lines = indexes.map(value => LINES[value])
    }

    return { lines: gameData.lines, error: null }
}

module.exports = lineChange
