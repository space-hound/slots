import { lastAnimations } from 'scripts/animate.js'

const elements = () => {
    return {
        message: $('#slot-control #control-message h3 span')[0],
        credits: $('#slot-control #control-balance h3')[0]
    }
}

export default {

    animate (credits, hold) {
        const els = elements()

        return lastAnimations([
            {
                targets: els.message,
                innerText: [hold, 0],
                round: 1,
                easing: 'easeInOutExpo'
            },
            {
                targets: els.credits,
                innerText: [credits.before, credits.after],
                round: 1,
                easing: 'easeInOutExpo'
            }
        ])
    }
}
