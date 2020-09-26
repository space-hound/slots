// "vendor" imports
const { cloneDeep, forEach, inRange, isObject } = require('lodash')

/**
 * This object has methods useful for manipulating 2d matrices.
 */
const matrix = {

    /**
     * Will log to the console a given matrix
     *
     * @param {Array<Array>} matrix
     * @returns {string}
     */
    log (matrix) {
        const rowLen = matrix.length

        let string = ''

        // for each row in the matrix
        for (let row = 0; row < rowLen; row++) {
            const colLen = matrix[row].length

            // for each column in the matrix
            for (let col = 0; col < colLen; col++) {
                // store all elements on row row in a string
                string += `${matrix[row][col]}  `
            }

            string += '\n'
        }

        //console.log(string)

        return string
    },

    /**
     * Depp clone the matrix using lodash _.cloneDeep
     *
     * @param {Array<Array>} matrix the matrix to be copied
     * @returns {Array<Array>}
     *
     */
    clone (matrix) {
        return cloneDeep(matrix)
    },

    /**
     * Returns the element at the position matrix[row][col]
     *
     * @param {Array<Array>} matrix the matrix from where to get the element
     * @param {integer} row the row in that matrix
     * @param {integer} col the column in that matrix
     * @returns
     *
     */
    get (matrix, row, col) {
        return matrix[row][col]
    },

    /**
     * Sets the element at the matrix[row][col] with the "value" and returns old value
     *
     * @param {Array<Array>} matrix the matrix from where to get the element
     * @param {integer} row the row in that matrix
     * @param {integer} col the column in that matrix
     * @param {*} value the value to be set at that position
     * @returns
     *
     */
    set (matrix, row, col, value) {
        const element = matrix[row][col]

        let oldValue

        // in case an element is more than a primitive
        if (isObject(element)) {
            oldValue = cloneDeep(matrix[row][col])
        } else {
            oldValue = element
        }

        matrix[row][col] = value

        return oldValue
    },

    /**
     * Takes a matrix and perform it's transpose (swap rows with columns)
     *
     * @param {Array<Array>} matrix
     * @returns
     *
     */
    transpose (matrix) {
        const transposed = []

        // columns length becomes the rows length
        const rowLen = matrix[0].length
        // rows length becomes the cols length
        const colLen = matrix.length

        // create "row" empty rows ("row" = number of columns)
        for (let row = 0; row < rowLen; row++) {
            transposed.push([])
        }

        // for every empty row
        for (let row = 0; row < colLen; row++) {
            // create the columns
            for (let col = 0; col < rowLen; col++) {
                // transposed[row][col]
                // where transposed row = matrix col
                // and transposed col = matrix row
                transposed[col].push(matrix[row][col])
            };
        };

        return transposed
    },

    /**
     * Takes an array of objects representing coords in a matrix and apply a callback on the element at that position
     *
     * @param {Array<Array>} matrix the matrix on witch to iterate
     * @param {Array<Object>} coordSet the array of objects containing all the coordinates ex: { i: 2, j: 1}
     * @param {Function} callback (element, coords, index, coordSet, matrix) [return false to break]
     *
     */

    /*
        a line is an array of objects with 'row' and 'col' keys representing the elemnt at that position

        ex: [ { row: 2, col: 0}, { row: 2, col: 1}, { row: 2, col: 2}, { row: 2, col: 3}, { row: 2, col: 4} ]
    */

    eachFromCoords (matrix, coordSet, callback) {
        // for each coordinate object in the coordinate set
        forEach(coordSet, (coord, index) => {
            // get the raw numbers using spread syntax
            const { row, col } = coord

            // get the element of the matrix at the [row][col] position
            const element = matrix[row][col]

            // run callback and listen for return
            const terminate = callback(element, coord, index, coordSet, matrix)

            // if there is false return then return false explicitely
            // so it could break the lodash's _.forEach loop
            // if(terminate) without explicitly checking could evaluate as false
            // no return in a function it actually returns "undefined"
            if (terminate === false) {
                return false
            }
        })
    },

    /**
     * Takes an array and run a callback on each element row by row.
     *
     * @param {Array<Array>} matrix the matrix on witch to iterate
     * @param {Function} callback (element, row, column, matrix) [return false to break from current row]
     * @param {Function} endRowCallback - OPTIONAL (row, matrix) [return false to break from whole loop]
     *
     */
    eachByRow (matrix, callback, endRowCallback = null) {
        // get the rows length
        const rowLen = matrix.length

        // for each row
        for (let row = 0; row < rowLen; row++) {
            const colLen = matrix[row].length

            // for each column
            for (let col = 0; col < colLen; col++) {
                // get the element
                const element = matrix[row][col]

                // listen for callback retunrn
                const terminate = callback(element, row, col, matrix)

                // see above for explanation
                // break from curent row loop
                if (terminate === false) {
                    break
                }
            }

            if (endRowCallback !== null) {
                const terminate = endRowCallback(row, matrix)

                // break from whole lopp
                if (terminate === false) {
                    break
                }
            }
        }
    },

    /**
     * Takes an array and run a callback on each element column by column.
     *
     * @param {Array<Array>} matrix the matrix on witch to iterate
     * @param {Function} callback (element, row, column, matrix) [return false to break from current column]
     * @param {Function} endColCallbakc - OPTIONAL (col, matrix) [return false to break from whole loop]
     *
     */
    eachByCol (matrix, callback, endColCallbakc = null) {
        // get rows length
        const rowLen = matrix.length
        // get column length
        const colLen = matrix[0].length

        // for each column
        for (let col = 0; col < colLen; col++) {
            // for each row
            for (let row = 0; row < rowLen; row++) {
                const element = matrix[row][col]

                const terminate = callback(element, row, col, matrix)

                // see above if unclear
                if (terminate === false) {
                    break
                }
            }

            if (endColCallbakc !== null) {
                const terminate = endColCallbakc(col, matrix)

                // break from whole lopp
                if (terminate === false) {
                    break
                }
            }
        }
    },

    /**
     * Create an array filled with the hole row with given symbol
     *
     * @param {Array<Array>} matrix
     * @param {integer} row
     * @param {*} symbol
     * @returns {Array<Array>}
     */
    expandRow (matrix, row, symbol) {
        // clone matrix
        const clone = this.clone(matrix)

        // get that row length
        const colLen = clone[row].length

        // fill all row with symbol
        for (let col = 0; col < colLen; col++) {
            clone[row][col] = symbol
        }

        // return clone
        return clone
    },

    /**
     * Create an array filled with the hole column with given symbol
     *
     * @param {Array<Array>} matrix
     * @param {integer} col
     * @param {*} symbol
     * @returns {Array<Array>}
     */
    expandColumn (matrix, col, symbol) {
        // clone matrix
        const clone = this.clone(matrix)

        // get number of rows
        const rowLen = clone.length

        // fill all column with "symbol"
        for (let row = 0; row < rowLen; row++) {
            clone[row][col] = symbol
        }

        // return clone
        return clone
    },

    /**
     * Checks if the given number is smaller/bigger (or equal) depending on a direction
     *
     * @param {integer} number
     * @param {integer} limit
     * @param {[-1, 1]} direction
     * @returns {boolean}
     */
    __overflow (number, limit, direction) {
        // check fo greater or equaly if direction = -1
        if (direction === -1) {
            return number >= limit
        } else {
            return number <= limit
        }
    },

    /**
     * Fill the column from a position up/down "size" tiles depending on the direction value with given symbol
     * [MUTATES THE ARRAY!!!]
     *
     * @param {Array<Array>} matrix
     * @param {*} symbol
     * @param {integer} size
     * @param {integer} cRow
     * @param {integer} cCol
     * @param {[-1, 1]} direction
     *
     */

    // MUTATES THE ARRAY

    expandVertical (matrix, symbol, size, cRow, cCol, direction) {
        // get the limit - either 0 or matrix.length - 1
        const limit = direction === -1 ? 0 : matrix.length - 1

        let counter = 1; let tempRow = cRow + direction

        // from center + 1 up/down start to fill up till limit "size" tiles inclusive
        while (this.__overflow(tempRow, limit, direction) && counter <= size) {
            matrix[tempRow][cCol] = symbol

            tempRow += direction

            counter++
        }
    },

    /**
     * Fill the column from a position left/right "size" tiles depending on the direction value with given symbol
     * [MUTATES THE ARRAY!!!]
     *
     * @param {Array<Array>} matrix
     * @param {*} symbol
     * @param {integer} size
     * @param {integer} cRow
     * @param {integer} cCol
     * @param {[-1, 1]} direction
     *
     */

    // MUTATES THE ARRAY

    expandHorizontal (matrix, symbol, size, cRow, cCol, direction) {
        // get the limit - either 0 or matrix[cRow].length - 1
        const limit = direction === -1 ? 0 : matrix[cRow].length - 1

        let counter = 1; let tempCol = cCol + direction

        // from center + 1 left/right start to fill up till limit "size" tiles inclusive
        while (this.__overflow(tempCol, limit, direction) && counter <= size) {
            matrix[cRow][tempCol] = symbol

            tempCol += direction
            counter++
        }
    },

    /**
     * Create a new array filled with a square subarray from a center point.
     *
     * @param {Array<Array>} matrix
     * @param {Object} center ex: { row: 3, col: 2 }
     * @param {integer} size
     * @param {*} symbol
     * @returns {Array<Array>}
     */

    /*
            IMPORTANT: MAKE IT WORK FOR NEGATIVE ROWS TOO !!!

            ex: center: { row: 0, col: -1 }  -  WORK
            ex: center: { row: -1, col: 0 }  -  DONT WORK

     */
    expandSquareFromCenter (matrix, center, size, symbol) {
        // clone matrix
        const clone = cloneDeep(matrix)

        const { row: cRow, col: cCol } = center

        // get left and right limit
        const leftLimit = cCol - size
        const rightLimit = cCol + size

        // goes on every column in that row from leftLimit to rightLimit and expands it vertically
        for (let counter = leftLimit; counter <= rightLimit; counter++) {
            if (inRange(counter, 0, clone[cRow].length - 1)) {
                // middle
                clone[cRow][counter] = symbol

                // up
                this.fillVertical(clone, symbol, size, cRow, counter, -1)

                // down
                this.fillVertical(clone, symbol, size, cRow, counter, 1)
            }
        }

        return clone
    }
}

module.exports = matrix
