import store from 'store'
import * as dictionary from 'scripts/dictionary'
import templates from 'templates'
import {
    transpose, attachDummy, attachCoords
} from 'scripts/matrix'
import { SPIN_DURATION, SPIN_DELAY } from 'renderer/config'
import { lastAnimations } from 'scripts/animate'

const empty = () => {
    $('#slot-display .display').empty()
}

const append = (matrix) => {
    $('#slot-display .display').append(templates.slot.reels(attachDummy(matrix)))
}

const getSizes = ( ) => {
    store.displaySize = {
        width: {
            display: $('#slot-display').outerWidth(),
            reel: $('#slot-display .reel').first().outerWidth(),
            symbol: $('#slot-display .reel').first().find('.symbol').first().outerWidth()
        },

        height: {
            display: $('#slot-display').outerHeight(),
            reel: $('#slot-display .reel').first().outerHeight(),
            symbol: $('#slot-display .reel').first().find('.symbol').first().outerHeight()
        }
    }
}

const reflow = () => {
    $('#slot-display .reel').css('position', 'relative')
    $('#slot-display .reel').css('overflow-y', 'hidden')
    $('#slot-display .reel .reel-inner').css('position', 'absolute')
}

const resize = () => {
    $('#slot-display').css('width', store.displaySize.width.display + 'px')
    $('#slot-display').css('height', store.displaySize.height.display + 'px')

    $('#slot-display .reel').css('width', store.displaySize.width.reel + 'px')
    $('#slot-display .reel').css('height', store.displaySize.height.reel + 'px')
}

const move = () => {
    const size = store.gameOpt.rows
    const unit = Math.floor(store.displaySize.height.symbol)

    $('#slot-display .reel').each((index, reel) => {
        const count = $(reel).find('.symbol').length - size

        $(reel).find('.reel-inner').css('top', `-${unit * count}px`)
    })
}

const animate = async () => {
    const options = []

    $('#slot-display .reel').each((index, reel) => {
        const target = $(reel).find('.reel-inner')[0]

        options.push({
            targets: target,
            top: `-${0}px`,
            duration () {
                return SPIN_DURATION + (index + 1) * SPIN_DELAY
            },
            easing: 'cubicBezier(.5, .05, .1, .3)'
        })
    })

    return lastAnimations(options)
}

const initial = () => {
    dictionary.set(store.gameOpt.symbols, store.gameOpt.images)

    $('#app').append(
        templates.slot.slot(store.data.credits, store.game.bet, transpose(attachCoords(store.game.current)))
    )

    store.displaySize = {
        width: {
            display: $('#slot-display').outerWidth(),
            reel: $('#slot-display .reel').first().outerWidth(),
            symbol: $('#slot-display .reel').first().find('.symbol').first().outerWidth()
        },

        height: {
            display: $('#slot-display').outerHeight(),
            reel: $('#slot-display .reel').first().outerHeight(),
            symbol: $('#slot-display .reel').first().find('.symbol').first().outerHeight()
        }
    }
}

const spin = async () => {
    empty()
    append(store.spinRes.matrix)
    reflow()
    //getSizes()
    resize()
    move()
    return animate()
}

export default {
    initial,
    spin
}
