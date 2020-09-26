let INDEX = null
let BETS = null

const setup = (bet, bets) => {
    BETS = bets

    INDEX = bets.findIndex(el => {
        el === bet
    })

    if (INDEX === -1) {
        INDEX = 0
    }
}

const update = (value) => {
    $('#slot-control #control-bet .bet-display h3').text(value)
}

const next = () => {
    if (INDEX + 1 >= BETS.length) {
        INDEX = 0
    } else {
        INDEX += 1
    }

    return INDEX
}

const prev = () => {
    if (INDEX - 1 < 0) {
        INDEX = BETS.length - 1
    } else {
        INDEX -= 1
    }

    return INDEX
}

export default {
    setup,
    update,
    next,
    prev
}
