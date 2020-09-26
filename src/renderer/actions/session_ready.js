import msg from 'scripts/tunnel'
import store from 'store'

export default (callback) => {
    const { SESSION_READY, GAME_START } = msg.types

    msg.listen(SESSION_READY, (event, data) => {

        //console.log(data);

        store.data = data.sessionData

        callback(store.data.credits, store.data.games)
    })

    msg.emit(SESSION_READY, {
        sessionName: 'anonymous'
    })
}
