const deck = require('./cardsdeck')
const { inRange, random } = require('lodash')

const gamble = {

    // last - not used
    // current not used
    // pick will be { symbol: value, color: null } or { symbol: null, color: value }
    //
    // each time user see last cards and a card facing down
    // he can choose either a color or a symbol
    // then generated will be compared with his pick
    // generated will be pushed into history
    __colors (last, current, pick, paytable) {
        const generated = deck.pickCard()

        let win = false; let mult = 0

        if (pick.symbol !== null) {
            // if there is symbol than  check if picked symbol matches generated one

            win = pick.symbol === generated.symbol

            // if it matches mult will be 4

            if (win === true) {
                mult = paytable[1]
            }
        } else {
            // if there is color than  check if picked color matches generated one

            win = pick.color === generated.color

            // if it matches mult will be 2

            if (win === true) {
                mult = paytable[0]
            }
        }

        return { win, mult, pick, generated, current: null }
    },

    // last ---> not used here
    // current ----> generated card
    // pick ----> a value between 0 and 4
    //
    // users sees 6 cards, first is reveald (current) and 5 facing down
    // he pick an index from 0 to 4 (those 5 cards facing down)
    // cards will be pushed into history and a new current card will be generated
    __cards (last, current, pick, paytable) {
        // get 5 cards from wich user had to pick an unknown one
        const generated = deck.pickCards(5)

        // get new current card
        const newCurrent = deck.pickCard()

        // check if pick came correctly
        // in range not including upper bound
        // random including upper bound
        pick = inRange(pick, 5) ? pick : random(0, 4)

        // get the card picked by user
        const userCard = generated[pick]

        // if user card value is higher than current is a win
        const win = userCard.value > current.value

        // if win is true than paytable[0] otherwise 0
        const mult = win === true ? paytable[0] : 0

        return { win, mult, pick, generated, current: newCurrent }
    },

    // last will be the card from wich to compare
    // current not used here
    // pick is -1 or 1 (smaller or bigger)
    //
    // user see all cards with a selected one
    // he can choose bigger or smaller
    // the generated wone will be compared to the visible one (last)
    // then generated becomes last
    __comparison (last, current, pick, paytable) {
        const generated = deck.pickCard()

        let win = false

        //console.log(current)
        //console.log(generated)

        if (pick < 0) {
            // if user picked smaller

            win = current.value > generated.value
        } else {
            // if user picked bigger

            win = current.value < generated.value
        }

        // if win is false "mult" becomes 0
        const mult = win === true ? paytable[0] : 0

        return { win, mult, pick, generated, current: generated, last: current }
    },

    gamble (type, last, current, pick, paytable) {
        return this[`__${type}`](last, current, pick, paytable)
    }

}

module.exports = gamble
