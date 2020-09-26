const { session } = require('../../storage')
const gambleCollect = require('./gamble_collect')

const gameExit = async () => {
    await gambleCollect()

    await session.updateSession()

    const sessionData = session.getSession('data.data')

    await session.releaseSessionGamble()

    await session.releaseSessionGame()

    return { exit: true, credits: sessionData.credits }
}

module.exports = gameExit
