// my files import
const { integer, pickone, pickset } = require('./utils/random')
// my files import
const { transpose } = require('./utils/matrix')
// "vendor" imports
const { forEach, forOwn, has } = require('lodash')

const generator = {

    /**
     * Pick a random subarray from an array with some elements restricted to a maximum number of occurences.
     *
     * @param {integer} size
     * @param {Array} pool
     * @param {Object} restriction ex: { symbols: { 'x': 2, 'y': 1 }, pool: [pool]/['x', 'y']}
     * @returns {Array}
     *
     */

    /*
            the restriction.pool will not contain any symbol in restriction.symbols

            restriction: {
                symbols: {
                    '6': 3,
                    '7': 1
                }

                pool: ['0', '0', ..., '3', '4', '4', ..., '5', '5', ..., '5']
            }
     */

    __pickRestrictedColumn (size, pool, restriction) {
        const set = pickset(size, pool)

        const slag = {}

        forEach(set, (symbol, index) => {
            if (has(restriction.symbols, symbol)) {
                if (!has(slag, symbol)) {
                    slag[symbol] = [index]
                } else {
                    slag[symbol].push(index)
                }
            }
        })

        forOwn(slag, (occurences, symbol) => {
            const len = occurences.length

            if (len > restriction.symbols[symbol]) {
                const keep = integer(0, len - 1)

                forEach(occurences, (value, index) => {
                    if (index !== keep) {
                        set[value] = pickone(restriction.pool)
                    }
                })
            }
        })

        return set
    },

    /**
     * Pick "count" random sets and returns an array if them.
     *
     * @param {integer} count the number of sets
     * @param {integer} size the size of a single set
     * @param {Array<Array>} pools an array of pools of available simbols
     * @param {Array<Object>} restrictions an array of objects having the restricted symbols with their limit and a pool
     * @returns {Array<Array>}
     *
     */

    /*
            the restrictions[k].pool will not contain any symbol in restrictions[k].symbols

            restrictions: [
                {
                    symbols: {
                        '6': 3,
                        '7': 1
                    }

                    pool: ['0', '0', ..., '3', '4', '4', ..., '5', '5', ..., '5']
                },
                ...,
                {
                    symbols: {
                        '6': 3,
                        '7': 1
                    }

                    pool: ['0', '0', ..., '3', '4', '4', ..., '5', '5', ..., '5']
                }
            ]
     */

    __pickRestrictedColumns (stetsCount, setSize, pools, restrictions) {
        const sets = []

        for (let i = 0; i < stetsCount; i++) {
            sets.push(this.__pickRestrictedColumn(setSize, pools[i], restrictions[i]))
        }

        return sets
    },

    /**
     * Generates a 2d matrix of restricted symbols.
     *
     * @param {integer} rows rows of the matrix
     * @param {integer} cols columns of the matrix
     * @param {Array<Array>} pools array of pools of available symbols
     * @param {Array<Object>} restrictions an array of objects having the restricted symbols with their limit and a pool
     * @returns {Array<Array>}
     *
     */
    generate ({ rows, cols, pools, restrictions }) {
        const flippedMatrix = this.__pickRestrictedColumns(cols, rows, pools, restrictions)

        return transpose(flippedMatrix)
    }
}

module.exports = generator
