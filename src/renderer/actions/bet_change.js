import msg from 'scripts/tunnel'
import store from 'store'

import BetsComponent from 'components/slot/bet'

export default () => {
    const { BET_CHANGE } = msg.types

    msg.listen(BET_CHANGE, (event, data) => {
        if (data.error) {
            return
        }

        store.game = data.gameData

        BetsComponent.update(data.gameData.bet)

        store.canReq = true
    })
}
