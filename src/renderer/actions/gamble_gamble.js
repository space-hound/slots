import msg from 'scripts/tunnel'
import store from 'store'

import GambleComponent from 'components/gamble/gamble'
import MessageComponent from 'components/slot/message'
import WinningsComponent from 'components/slot/win'
import { PLAY_STATE, GAMBLE_DURATION } from 'renderer/config'

import events from 'events/gamble'

export default () => {
    const { GAMBLE_GAMBLE } = msg.types

    msg.listen(GAMBLE_GAMBLE, (event, data) => {
        //console.log('GAMBLE RESPONSE', data)

        if (data.error) {
            return
        }

        // sessionData, gameData, gambleData, gambleRes, finish

        store.data = data.sessionData
        store.game = data.gameData

        store.gamble = data.gambleData
        store.gambleRes = data.gambleRes

        if (data.finish) {
            events.destroy()

            GambleComponent.setCurrent(store.gamble.current.value, store.game.hold)

            if (store.game.hold > 0) {
                MessageComponent.onWinGamble(store.game.hold)

                store.playState = PLAY_STATE.COLLECT

                store.gamble = null
                store.gambleOpt = null
                store.gambleRes = null
            } else {
                MessageComponent.onLost()

                store.playState = PLAY_STATE.SPIN

                store.gamble = null
                store.gambleOpt = null
                store.gambleRes = null

                WinningsComponent.stopShowWin()
            }

            store.canReq = true

            setTimeout(() => {
                GambleComponent.destroy()
            }, GAMBLE_DURATION)
        } else {
            //console.log('GAMBLE CURRENT', store.gamble.current)

            GambleComponent.setCurrent(store.gamble.current.value, store.game.hold)

            store.canReq = true
        }
    })
}
