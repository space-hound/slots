const loaders = require('./loaders')
const { extractDataByLevels } = require('./utils')

const SESSION = {
    data: {
        name: null,
        data: null
    },
    game: {
        name: null,
        data: null
    },
    gamble: {
        name: null,
        data: null
    }
}

let GAME_OPT = null; let GAMBLE_OPT = null

const METHODS = {

    getSession (property = null) {
        if (property !== null) {
            const path = property.split('.')

            return extractDataByLevels(SESSION, path)
        }

        return SESSION
    },

    getGameOpt (property = null) {
        if (property !== null) {
            const path = property.split('.')

            return extractDataByLevels(GAME_OPT, path)
        }

        return GAME_OPT
    },

    getGambleOpt (property = null) {
        if (property !== null) {
            const path = property.split('.')

            return extractDataByLevels(GAMBLE_OPT, path)
        }

        return GAMBLE_OPT
    },

    async loadSessionData (sessionName) {
        SESSION.data.name = sessionName

        SESSION.data.data = await loaders.loadSessionData(sessionName)
    },

    async loadSessionGame (gameName) {
        SESSION.game.name = gameName

        SESSION.game.data = await loaders.loadSessionGame(SESSION.data.name, gameName)

        GAME_OPT = await loaders.loadGameOptions(gameName)

        return GAME_OPT
    },

    async loadSessionGamble (gambleName) {
        SESSION.gamble.name = gambleName

        SESSION.gamble.data = await loaders.loadSessionGamble(SESSION.data.name, gambleName)

        GAMBLE_OPT = await loaders.loadGambleOptions(gambleName)

        return GAMBLE_OPT
    },

    async updateSessionData () {
        await loaders.updateSessionData(SESSION.data.name, SESSION.data.data)
    },

    async updateSessionGame () {
        await loaders.updateSessionGame(SESSION.data.name, SESSION.game.name, SESSION.game.data)
    },

    async updateSessionGamble () {
        await loaders.updateSessionGamble(SESSION.data.name, SESSION.gamble.name, SESSION.gamble.data)
    },

    async updateSession () {
        if (SESSION.data.data !== null) {
            await this.updateSessionData()
        }

        if (SESSION.game.date !== null) {
            await this.updateSessionGame()
        }

        if (SESSION.gamble.data !== null) {
            await this.updateSessionGamble()
        }
    },

    async releaseSessionGame (save = false) {
        if (save) {
            await this.updateSessionGame()
        }

        SESSION.game.name = null

        SESSION.game.data = null

        GAME_OPT = null
    },

    async releaseSessionGamble (save = false) {
        if (save) {
            await this.updateSessionGamble()
        }

        SESSION.gamble.name = null

        SESSION.gamble.data = null

        GAMBLE_OPT = null
    }
}

module.exports = METHODS
