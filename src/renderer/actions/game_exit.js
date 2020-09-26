import msg from 'scripts/tunnel'
import store from 'store'

import WinningsComponent from 'components/slot/win'

import slotsEvents from 'events/slots'

export default (exitCb) => {
    const { SESSION_READY, GAME_START, GAME_EXIT } = msg.types

    msg.listen(GAME_EXIT, (event, data) => {
        if (data.error) {
            return
        }


        WinningsComponent.stopShowWin();

        store.game = null
        store.gameOpt = null
        store.gamble = null
        store.gambleOpt = null
        store.canReq = true
        store.playState = 0

        slotsEvents.destroy()

        msg.removeBut([SESSION_READY, GAME_START, GAME_EXIT])

        exitCb(store.data.credits)

        store.hasGame = false;
    })
}
