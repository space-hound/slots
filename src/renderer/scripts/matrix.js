import { DUMMY_COUNT } from 'renderer/config'

import { random } from './random'

export const transpose = (matrix) => {
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
}

export const attachCoords = (matrix) => {
    const withCoords = []

    for (let i = 0; i < matrix.length; i++) {
        withCoords[i] = []

        for (let j = 0; j < matrix[i].length; j++) {
            withCoords[i][j] = {
                value: matrix[i][j],
                coords: {
                    row: i,
                    col: j
                }
            }
        }
    }

    return withCoords
}

export const attachDummy = (matrix) => {
    const withCoords = transpose(attachCoords(matrix))

    for (let i = 0; i < withCoords.length; i++) {
        const dummy = random(DUMMY_COUNT).map(symbol => {
            return {
                value: symbol,
                coords: null
            }
        })

        withCoords[i].push(...dummy)
    }

    return withCoords
}
