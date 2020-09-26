import msg from 'scripts/tunnel'
import store from 'store'

import GambleComponent from 'components/gamble/gamble'

import events from 'events/gamble'

export default () => {
    const { GAMBLE_START } = msg.types

    msg.listen(GAMBLE_START, (event, data) => {
        //console.log(data)

        if (data.error) {
            return
        }

        if (store.gamble !== null && store.gambleOpt !== null) {
            return
        }

        store.game = data.gameData
        store.gamble = data.gambleData
        store.gambleOpt = data.gambleOpt

        GambleComponent.setup(store.gambleOpt.cards, store.game.hold, store.gamble.current)

        events.start()

        store.canReq = true
    })
}
