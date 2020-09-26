import menu from 'components/menu'
import msg from 'scripts/tunnel'

const Menu = {

    onSessionReady (credits, games) {
        menu.build(credits, games)
    },

    onGameClick (event) {
        const data = $(this).data('key')

        if (data === '') {
            return
        }

        const { GAME_START } = msg.types

        msg.emit(GAME_START, {
            gameName: data
        })
    },

    onGameStart () {
        menu.toggle(false)
    },

    onGameExit (credits) {
        $('#slot').remove()

        $('#gamble').remove()

        menu.setCredits(credits)

        menu.toggle(true)
    }
}

export default Menu
