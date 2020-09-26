import msg from 'scripts/tunnel'
import store from 'store'

import { PLAY_STATE } from 'renderer/config'

import MessageComponent from 'components/slot/message'
import WinningsComponent from 'components/slot/win'
import CollectComponent from 'components/slot/collect'

export default () => {
    const { GAME_COLLECT } = msg.types

    msg.listen(GAME_COLLECT, async (event, data) => {
        if (data.error) {
            return
        }

        const credits = {
            before: store.data.credits,
            after: data.sessionData.credits
        }

        const hold = store.game.hold

        store.data = data.sessionData
        store.game = data.gameData

        await CollectComponent.animate(credits, hold)

        WinningsComponent.stopShowWin()

        MessageComponent.onSpin()

        store.playState = PLAY_STATE.SPIN

        store.canReq = true

        if(store.auto) {
            setTimeout( () => {
                if(store.auto) {
                    $('#slot-control #control-play').click();
                }
            }, 500)
        }
    })
}
