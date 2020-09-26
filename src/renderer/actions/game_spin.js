import msg from 'scripts/tunnel'
import store from 'store'

import { PLAY_STATE } from 'renderer/config'

import DisplayComponent from 'components/slot/display'
import MessageComponent from 'components/slot/message'
import WinningsComponent from 'components/slot/win'
import CreditsComponent from 'components/slot/credits'

export default () => {
    const { GAME_SPIN } = msg.types

    msg.listen(GAME_SPIN, async (event, data) => {
        if (data.error) {
            return
        }

        store.data = data.sessionData
        store.game = data.gameData
        store.spinRes = data.spinRes

        CreditsComponent.update(store.data.credits)

        await DisplayComponent.spin()

        if (data.spinRes.wins !== null) {
            const combos = data.spinRes.wins.map(unit => {
                return unit.combo
            })

            WinningsComponent.startShowWin(combos)

            MessageComponent.onWin(store.game.hold)

            store.playState = PLAY_STATE.COLLECT
        } else {
            store.playState = PLAY_STATE.SPIN

            MessageComponent.onLost();
        }

        if(store.auto) {
            setTimeout( () => {
                if(store.auto) {
                    $('#slot-control #control-play').click();
                }
            }, 500)
        }

        $('#slot-control #control-play').addClass("start");
        $('#slot-control #control-play').removeClass("stop");

        store.canReq = true
    })
}
