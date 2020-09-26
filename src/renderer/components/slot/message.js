const message = () => {
    return $('#slot-control #control-message h3')
}

export default {

    onSpin () {
        message().html('Good luck!')
    },

    onWin (ammount) {
        message().html(`You won <span>${ammount}</span>. Collect or gamble to win more!`)
    },

    onLost () {
        message().html('Good luck next time!')
    },

    onWinGamble (ammount) {
        message().html(`You won <span>${ammount}</span>. Collect everything!`)
    }

}
