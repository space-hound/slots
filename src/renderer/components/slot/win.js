import { SHOW_WIN_INTERVAL } from 'renderer/config'

// index for winning combo to be displayed
let INDEX = null
// if all will be cleared
let ALTERNATOR = null
// the raw combos ( only coords )
let RAW_COMBOS = null
// the elements that are part of a combo
let COMBOS = null
// the interval id of the animation
let INTERVAL = null

// return an array with elements representig a winning combo
const getSingleByCoords = (combo) => {
    return combo.map(unit => {
        return $(`.symbol[data-row="${unit.row}"][data-col="${unit.col}"]`)
    })
}

// return an array of arrays of elements for each winning combos
const getAllByCoords = (combos) => {
    return combos.map(getSingleByCoords)
}

// mark elements that are part of the combo at INDEX to active
const markAsActiveByIndex = () => {
    const combo = COMBOS[INDEX]

    combo.forEach($unit => {
        $unit.addClass('active')
    })
}

// unmark the elemnts that are part of the combo at INDEX
const unMarkFromActiveByIndex = () => {
    const combo = COMBOS[INDEX]

    combo.forEach($unit => {
        $unit.removeClass('active')
    })
}

// unmark everything from active to none
const unMarkFromActiveAll = () => {
    COMBOS.forEach(combo => {
        combo.forEach($unit => {
            $unit.removeClass('active')
        })
    })
}

// go to next index
const nextIndex = () => {
    if (INDEX + 1 >= COMBOS.length) {
        INDEX = 0
    } else {
        INDEX += 1
    }
}

const isBetween = () => {
    return INDEX >= 0 && INDEX < COMBOS.length
}

// setup
const setup = (combos, index = -1) => {
    RAW_COMBOS = combos
    COMBOS = getAllByCoords(RAW_COMBOS)
    INDEX = index
    ALTERNATOR = true
}

const clear = () => {
    RAW_COMBOS = null
    COMBOS = null
    INDEX = null
    INTERVAL = null
    ALTERNATOR = null
}

export default {

    startShowWin (combos) {
        // make initial setup
        setup(combos)

        // start interval
        INTERVAL = setInterval(() => {
            if (ALTERNATOR) {
                nextIndex()

                markAsActiveByIndex()

                ALTERNATOR = false
            } else {
                if (isBetween()) {
                    unMarkFromActiveByIndex()
                }

                ALTERNATOR = true
            }
        }, SHOW_WIN_INTERVAL)
    },

    stopShowWin () {

        if(INTERVAL === null) return;

        clearInterval(INTERVAL)
        unMarkFromActiveAll()
        clear()
    }

}
