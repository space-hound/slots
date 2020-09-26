import msg from 'scripts/tunnel'
import store from 'store'

import { PLAY_STATE } from 'renderer/config'

import MessagesComponent from 'components/slot/message'
import DisplayComponent from 'components/slot/display'
import BetsComponent from 'components/slot/bet'

import gameSpin from './game_spin'
import gameCollect from './game_collect'
import betChange from './bet_change'
import gambleStart from './gamble_start'
import gambleGamble from './gamble_gamble'
import gambleCollect from './gamble_collect'
import gameExit from './game_exit'

import events from 'events/slots'

export default (startCb, exitCb) => {
    const { GAME_START } = msg.types

    msg.listen(GAME_START, (event, data) => {
        if (data.error) {
            return
        }

        if (store.game !== null && store.gameOpt !== null) {
            return
        }

        store.game = data.gameData
        store.gameOpt = data.gameOpt

        DisplayComponent.initial()

        BetsComponent.setup(store.game.bet, store.gameOpt.bets)

        if (store.game.hold > 0) {
            MessagesComponent.onWin(store.game.hold)
            store.playState = PLAY_STATE.COLLECT
        }

        events.build()

        gameSpin()

        gameCollect()

        betChange()

        gambleStart()

        gambleGamble()

        gambleCollect()

        gameExit(
            exitCb
        )

        startCb()

        store.hasGame = true;
    })
}
