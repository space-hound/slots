// "vendor" imports
const Chance = require('chance')

const CHANCE = new Chance()

const random = {

    /**
     * Generates a random integer between "min" and "max".
     *
     * @param {integer} min
     * @param {integer} max
     * @returns {integer}
     *
     */
    integer (min, max) {
        return CHANCE.integer({ min, max })
    },

    /**
     * Pick a random element from an array.
     *
     * @param {Array} pool
     * @returns
     *
     */
    pickone (pool) {
        return CHANCE.pickone(pool)
    },

    /**
     * Pick a random subarray from an array.
     *
     * @param {integer} size
     * @param {Array} pool
     * @returns {Array}
     *
     */
    pickset (size, pool) {
        return CHANCE.pickset(pool, size)
    }

}

module.exports = random
