const generator = require('./generator')
const checker = require('./checker')
const { reduce } = require('lodash')

const wheels = {

    /*
        options must have
        {
            rows => integer
            cols => integer
            pools => Array<Array> - pool of symbols for each column
            restrictions => Array<Object> - restrictions for each column
            lines => Array<Object> - object of the avilable lines
            ways => integer (-1, 0, 1) - if is only from left to right or reverse or both
            paytable => Object
            specials => Array
        }
    */

    __calculateTotal (wins, bet) {
        // if wins is null there is no total
        if (wins === null) {
            return null
        }

        // else calculate the total wins by summing each win * bet
        return reduce(wins, (result, win) => {
            return result + (win.pays * bet)
        }, 0)
    },

    __classic (gameData, gameOpt) {
        const matrix = generator.generate(gameOpt)

        const wins = checker.check(matrix, gameOpt)

        const total = this.__calculateTotal(wins, gameData.bet)

        return { matrix, wins, total, others: null, frames: null }
    },

    __expanding (gameData, gameOpt) {

    },

    __freegames (gameData, gameOpt) {

    },

    __bonusgames (gameData, gameOpt) {

    },

    spin (gameData, gameOpt) {
        return this[`__${gameOpt.type}`](gameData, gameOpt)
    }

}

module.exports = wheels
