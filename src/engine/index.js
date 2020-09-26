const channels = require('./../channels')

// SESSION START
const sessionReady = require('./actions/session_ready')
// GAME START
const gameStart = require('./actions/game_start')
// GAME RELATED ACTIONS
const betChange = require('./actions/bet_change')
const linesChange = require('./actions/lines_change')
const gameSpin = require('./actions/game_spin')
const gameCollect = require('./actions/game_collect')
// GAMBLE RELATED ACTIONS
const gambleStart = require('./actions/gamble_start')
const gambleGamble = require('./actions/gamble_gamble')
const gambleCollect = require('./actions/gamble_collect')
// EXIT GAME
const gameExit = require('./actions/game_exit')

// LODASH
const { forOwn } = require('lodash')

const engine = {

    canRequest: true,

    [channels.SESSION_READY]: sessionReady,

    [channels.GAME_START]: gameStart,

    [channels.BET_CHANGE]: betChange,
    [channels.LINES_CHANGE]: linesChange,
    [channels.GAME_SPIN]: gameSpin,
    [channels.GAME_COLLECT]: gameCollect,

    [channels.GAMBLE_START]: gambleStart,
    [channels.GAMBLE_GAMBLE]: gambleGamble,
    [channels.GAMBLE_COLLECT]: gambleCollect,

    [channels.GAME_EXIT]: gameExit,

    setup (listener) {
        forOwn(channels, (action, key) => {
            listener.on(action, async (event, payload) => {
                if (this.canRequest !== true) {
                    return
                }

                this.canRequest = false

                const data = await this[action](payload)

                this.canRequest = true

                event.reply(action, data)
            })
        })
    }
}

module.exports = engine
