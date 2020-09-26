const { session } = require('../../storage')

const sessionReady = async ({ sessionName }) => {
    await session.loadSessionData(sessionName)

    const sessionData = session.getSession('data.data')

    return { sessionData }
}

module.exports = sessionReady
