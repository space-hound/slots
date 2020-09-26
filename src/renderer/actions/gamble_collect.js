import msg from 'scripts/tunnel'
import store from 'store'

import GambleComponent from 'components/gamble/gamble'
import MessageComponent from 'components/slot/message'
import { PLAY_STATE } from 'renderer/config'

import events from 'events/gamble'

export default () => {
    const { GAMBLE_COLLECT } = msg.types

    msg.listen(GAMBLE_COLLECT, (event, data) => {
        if (data.error) {
            return
        }

        // sessionData, gameData, gambleData, oldHold

        store.data = data.sessionData
        store.game = data.gameData

        store.gamble = null
        store.gambleOpt = null
        store.gambleRes = null

        setTimeout(() => {
            events.destroy()

            GambleComponent.destroy()

            MessageComponent.onWinGamble(store.game.hold)

            store.canReq = true

            store.playState = PLAY_STATE.COLLECT

            store.canReq = true
        }, 1000)
    })
}
