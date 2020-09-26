import templates from 'templates'

const parent = () => {
    return $('#app')
}

const unSetPrev = (value) => {
    $('#gamble #gamble-numbers__display').find(
        `.numbers-card:not([data-card="${value}"])`
    ).removeClass('active')
}

const setHoldValue = (value) => {
    $('#gamble #gamble-numbers__controls .number-won div').text(value)
    $('#gamble #gamble-numbers__controls .number-win div').text(value * 2)
}

const setCurrent = (value, hold) => {
    unSetPrev(value)
    $('#gamble #gamble-numbers__display').find(`.numbers-card[data-card="${value}"]`).addClass('active')
    setHoldValue(hold)
}

const setup = (cards, hold, current) => {
    parent().append(templates.gamble.gamble(cards, hold))

    setCurrent(current.value, hold)

    $('#gamble').addClass('active')
}

const destroy = () => {
    $('#gamble').remove()
}

export default {
    setup,
    destroy,
    setCurrent,
    setHoldValue
}
