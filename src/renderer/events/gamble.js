import store from 'store'
import msg from 'scripts/tunnel'

const onCollect = () => {
    if (!store.canReq) {
        return
    }

    const { GAMBLE_COLLECT } = msg.types

    msg.emit(GAMBLE_COLLECT)

    store.canReq = false
}

const onBigger = () => {
    if (!store.canReq) {
        return
    }

    const { GAMBLE_GAMBLE } = msg.types

    msg.emit(GAMBLE_GAMBLE, {
        pick: 1
    })

    store.canReq = false

    //console.log('BIGGER')
}

const onSmaller = () => {
    if (!store.canReq) {
        return
    }

    const { GAMBLE_GAMBLE } = msg.types

    msg.emit(GAMBLE_GAMBLE, {
        pick: -1
    })

    store.canReq = false

    //console.log('SMALLER')
}

export default {

    start () {
        $('#gamble .number-smaller').on('click', onSmaller)
        $('#gamble .number-bigger').on('click', onBigger)
        $('#gamble .number-collect').on('click', onCollect)
    },

    destroy () {
        $('#gamble .number-smaller').off('click', onSmaller)
        $('#gamble .number-bigger').off('click', onBigger)
        $('#gamble .number-collect').off('click', onCollect)
    }
}
