// "vendor" imports
const { indexOf, reverse, forEach, includes } = require('lodash')
// my files import
const { eachFromCoords, clone, eachByCol } = require('./utils/matrix')

const checker = {

    /**
     * Check a matrix with a given line if it yields win combo
     *
     * @param {Array<Array>} matrix the matrix in which to search
     * @param {Array} line an array of objects representing a coordinate in the matrix
     * @param {Array} paytable the paytable that yields combo and wins for those combos
     * @param {Array} ignore symbols to be ignored that don't need lines to yield wins
     * @param {Array} wilds can be any combination
     *
     * @returns {?Object} returns object or null
     */
    __checkLineGeneralOneWay (matrix, line, paytable, ignore, wilds = []) {
        // get the coords of the first element in the array
        const { row, col } = line[0]

        // get the first element in the array
        let symbol = matrix[row][col]

        // if the symbol is to be ignored return null
        if (includes(ignore, symbol)) {
            return null
        }

        // keep track of how many duplicates in sequence
        let count = 1
        // keep track of the duplicates coors sequence
        const combo = [{ row, col }]

        // if the first is wild and the next is not than change it to next
        let isWild = includes(wilds, symbol)

        // for each element starting from on that line check if they are equal to the first element
        eachFromCoords(matrix, line, (element, coords, index) => {
            // skip the first element
            if (index !== 0) {
                // if first element is wild
                if (isWild) {
                    // and the second is to be ignored we are done
                    if (includes(ignore, element)) {
                        return false
                    }

                    // if first is wild and the second is not then can't have line of wilds
                    if (!includes(wilds, element)) {
                        isWild = false
                        symbol = element
                    }
                }

                // if element is same as the first or is wild
                if (element === symbol || includes(wilds, element)) {
                    count++

                    combo.push(coords)
                } else {
                    // otherwise return false to break the loop
                    return false
                }
            }
        })

        // search the paytable to see if has combo for "count" X "symbol"
        const payIndex = indexOf(paytable[symbol].count, count)

        // if not return null
        if (payIndex === -1) {
            return null
        }

        // return the symbol, it's count, combo as the sequence of coords
        // the line on which we have a combo and how much it pays that combo
        return {
            symbol,
            count,
            combo,
            line,
            pays: paytable[symbol].pays[payIndex]
        }
    },

    __checkLineGeneralBothWays (matrix, line, ways, paytable, ignore, wilds = []) {
        if (ways === -1) { // only left to right
            const win = this.__checkLineGeneralOneWay(matrix, line, paytable, ignore, wilds)

            if (win !== null) {
                return [win]
            }

            return null
        } else if (ways === 1) { // only right to left
            const reverseLine = reverse(clone(line))

            const win = this.__checkLineGeneralOneWay(matrix, reverseLine, paytable, ignore, wilds)

            if (win !== null) {
                return [win]
            }

            return null
        } else { // both ways
            const win = []

            const reverseLine = reverse(clone(line))

            const rtl = this.__checkLineGeneralOneWay(matrix, line, paytable, ignore, wilds)
            const ltr = this.__checkLineGeneralOneWay(matrix, reverseLine, paytable, ignore, wilds)

            if (rtl !== null) {
                win.push(rtl)
            }

            if (ltr !== null) {
                win.push(ltr)
            }

            if (win.length > 0) {
                return win
            }

            return null
        }
    },

    __checkAllLinesGeneral (matrix, lines, ways, paytable, ignore, wilds) {
        const winnings = []

        // for each lines ( array of objects representing coordinates in the matrix )
        forEach(lines, (line) => {
            // check if the line yield win
            const win = this.__checkLineGeneralBothWays(matrix, line, ways, paytable, ignore, wilds)

            // if it does push the win
            if (win !== null) {
                winnings.push(...win)
            }
        })

        // if there are wins return them
        if (winnings.length > 0) {
            return winnings
        }

        // null otherwise
        return null
    },

    /**
     * Chek an array if has "check" symbols in any order/combo
     *
     * @param {Array<Array>} matrix the matrix in which to search
     * @param {Array} paytable the paytable of the win yielding combos
     * @param {*} check the symbols to search for
     *
     * @returns {?Object} returns either null or an object
     */

    // This does not check in a specific order

    __checkAmorphic (matrix, paytable, symbol) {
        let count = 0; let combo = []

        // check on each column for that symbol
        eachByCol(matrix, (element, row, col) => {
            if (element === symbol) {
                count++

                combo.push({ row, col })

                // return false
            }
        })

        // search the paytable to see if has combo for "count" X "symbol"
        const payIndex = indexOf(paytable[symbol].count, count)

        // if not return null
        if (payIndex === -1) {
            return null
        }

        return {
            symbol,
            count,
            combo,
            line: null,
            pays: paytable[symbol].pays[payIndex]
        }
    },

    /**
     * Chek an array if has [...checks] symbols in any order/combo
     *
     * @param {Array<Array>} matrix the matrix in which to search
     * @param {Array} paytable the paytable of the win yielding combos
     * @param {Array} check the array symbols to search for
     *
     * @returns {?Array<Object>} returns either null or an array of objects
     */

    // This does not check in a specific order

    __checkAllAmorphic (matrix, paytable, checks) {
        const amorphic = []

        // check for all symbols
        forEach(checks, (check) => {
            const win = this.__checkAmorphic(matrix, paytable, check)

            if (win !== null) {
                amorphic.push(win)
            }
        })

        if (amorphic.length > 0) {
            return amorphic
        }

        return null
    },

    check (matrix, { lines, ways, paytable, specials, wilds }) {
        const general = this.__checkAllLinesGeneral(matrix, lines, ways, paytable, specials, wilds)
        // presume we don't have scatters
        let amorphics = null
        // check scatters - IF WE HAVE SCATTERS - that don't have to be in a specific line
        if (specials.length > 0) {
            amorphics = this.__checkAllAmorphic(matrix, paytable, specials)
        }

        const win = []

        // if there are wins on lines push them
        if (general !== null) {
            win.push(...general)
        }

        // if there are wins from scatter push them
        if (amorphics !== null) {
            win.push(...amorphics)
        }

        // if there are wins return them
        if (win.length > 0) {
            return win
        }

        // null otherwise
        return null
    }
}

module.exports = checker
