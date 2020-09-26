import store from 'store'
import msg from 'scripts/tunnel'
import { PLAY_STATE } from 'renderer/config'

import BetsComponent from 'components/slot/bet'
import MessageComponent from 'components/slot/message'

const onPlay = (event) => {
    // if can't request return
    if (!store.canReq) {
        return
    }

    // states for this button
    const { GAME_SPIN, GAME_COLLECT } = msg.types

    // if it's play than emit play
    if (store.playState === PLAY_STATE.SPIN) {
        if (store.game.canSpin) {
            msg.emit(GAME_SPIN)
            MessageComponent.onSpin()
        }

        store.canReq = false

        $('#slot-control #control-play').removeClass("start");
        $('#slot-control #control-play').addClass("stop");
    }
    // if it's collect then emmit collect
    else if (store.playState === PLAY_STATE.COLLECT) {
        if (store.game.canCollect) {
            msg.emit(GAME_COLLECT)
        }

        store.canReq = false
    }
}

const onBet = (event) => {

    if(store.auto) {
        return;
    }

    if (!store.canReq || !store.game.canChangeBet) {
        return
    }

    const { BET_CHANGE } = msg.types

    const btn = $(event.target).closest(".control-button");

    const action = $(btn).data('action')

    if(!action) return;

    const index = BetsComponent[action]()

    msg.emit(BET_CHANGE, {
        index
    })

    store.canReq = false
}

const onGamble = (event) => {
    if (!store.canReq || !store.game.canGamble) {
        return
    }

    const { GAMBLE_START } = msg.types

    msg.emit(GAMBLE_START, {
        gambleName: 'comparison'
    })

    store.canReq = false
}

const onExit = (event) => {
    const { GAME_EXIT } = msg.types

    msg.emit(GAME_EXIT)

    store.canReq = false
}

const onAuto = ( event ) => {

    store.auto = !store.auto

    if(store.auto) {
        $('#slot-control #control-auto').removeClass("start");
        $('#slot-control #control-auto').addClass("stop");

        $('#slot-control #control-play').click();
    } else {
        $('#slot-control #control-auto').removeClass("stop");
        $('#slot-control #control-auto').addClass("start");
    }
}

export default {
    build () {
        $('#slot-control #control-play').on('click', onPlay)

        $('#slot-control #control-bet .bet-actions .control-button').on('click', onBet)

        $('#slot-control #control-gamble').on('click', onGamble)

        $('#slot-control #control-exit').on('click', onExit)

        $('#slot-control #control-auto').on('click', onAuto)
    },

    destroy () {
        $('#slot-control #control-play').off('click', onPlay)

        $('#slot-control #control-bet .bet-actions .control-button').off('click', onBet)

        $('#slot-control #control-gamble').off('click', onGamble)

        $('#slot-control #control-exit').off('click', onExit)

        $('#slot-control #control-auto').off('click', onAuto)
    }
}
