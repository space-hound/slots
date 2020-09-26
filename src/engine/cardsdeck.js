const { pickone } = require('./utils/random')

const deck = {

    // faces of the card -> A, 2, 3, ..., 10, J, Q, K
    faces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    // symbols of the card -> hearts, diamonds, spades, clubs
    symbols: [1, 2, 3, 4],
    // colors of the card -> red, black
    colors: [1, 2],

    pickCard () {
        const face = pickone(this.faces)
        const symbol = pickone(this.symbols)
        const color = pickone(this.colors)

        return { face, symbol, color, value: face }
    },

    pickCards (count) {
        const cards = []

        for (let i = 0; i < count; i++) {
            cards.push(this.pickCard())
        }

        return cards
    }
}

module.exports = deck
