const nedb = require('nedb-promises')
const sources = require('./sources')
const { extractDataByLevels } = require('./utils')

const fsp = require('./filesys')

const loaders = {

    /**
     * Load a game options by name from the storage files.
     *
     * @param {string} gameName
     * @returns Object
     */
    async loadGameOptions (gameName) {
        const datastore = await nedb.create(sources.GAMES)

        const options = await datastore.find({ 'name': gameName })

        return options[0]
    },

    /**
     * Load a gamble options by name from the storage files.
     *
     * @param {string} gambleName
     * @returns Object
     */
    async loadGambleOptions (gambleName) {
        const datastore = await nedb.create(sources.GAMBLES)

        const options = await datastore.find({ 'name': gambleName })

        return options[0]
    },

    /**
     * Creates/loads the storage file for sessions and return the api object.
     *
     * @returns Object
     */
    async __sessionDatastore () {
        return nedb.create(sources.SESSIONS)
    },

    /**
     * Finds and return a session by name or only certain properties of it.
     *
     * @param {string} sessionName
     * @param {string} [property=null] - ex: 'data.bets.0'
     * @returns
     */
    async __findSession (sessionName, property = null) {
        let datastore = await this.__sessionDatastore()

        let sessionData

        if (property === null) {
            sessionData = await datastore.find({ 'data.name': sessionName })

            return sessionData[0]
        }

        const path = [0, ...property.split('.')]

        const projection = {
            [property]: 1,
            _id: 0
        }

        sessionData = await datastore.find({ 'data.name': sessionName }, projection)

        return extractDataByLevels(sessionData, path)
    },

    /**
     * Loads the full session with that name.
     *
     * @param {string} sessionName
     * @returns
     */
    async loadSession (sessionName) {
        return this.__findSession(sessionName)
    },

    /**
     * Loads only the data for that session.
     *
     * @param {string} sessionName
     * @returns
     */
    async loadSessionData (sessionName) {
        return this.__findSession(sessionName, 'data')
    },

    /**
     * Loads the specified game state of that session.
     *
     * @param {string} sessionName
     * @param {string} gameName
     * @returns
     */
    async loadSessionGame (sessionName, gameName) {
        return this.__findSession(sessionName, `games.${gameName}`)
    },

    /**
     * Loads the specified gamble state of that session.
     *
     * @param {string} sessionName
     * @param {string} gambleName
     * @returns
     */
    async loadSessionGamble (sessionName, gambleName) {
        return this.__findSession(sessionName, `gamble.${gambleName}`)
    },

    /**
     * Updates/replace a session with that name.
     *
     * @param {string} sessionName
     * @param {*} data
     * @param {string} [property=null] - if it is null, will replace the session
     * @param {Object} [options={}]
     * @returns
     */
    async __updateSession (sessionName, data, property = null, options = {}) {
        const datastore = await this.__sessionDatastore()

        if (property === null) {
            return datastore.update({ 'data.name': sessionName }, data, options)
        }

        const update = {
            [property]: data
        }

        return datastore.update({ 'data.name': sessionName }, { $set: update }, options)
    },

    /**
     * Replace a session.
     *
     * @param {string} sessionName
     * @param {*} data
     * @param {*} [options={}]
     * @returns
     */
    async replaceSession (sessionName, data, options = {}) {
        return this.__updateSession(sessionName, data, null, options)
    },

    /**
     *  Updates the session data or only sub property of it.
     *
     * @param {string} sessionName
     * @param {*} data
     * @param {*} [property=null] - ex 'user.age' will update data.user.age
     * @param {*} [options={}]
     * @returns
     */
    async updateSessionData (sessionName, data, property = null, options = {}) {
        if (property === null) {
            return this.__updateSession(sessionName, data, 'data', options)
        }

        return this.__updateSession(sessionName, data, `data.${property}`, options)
    },

    /**
     * Updates the session game state of that game or a sub property of it.
     *
     * @param {string} sessionName
     * @param {string} gameName
     * @param {string} data
     * @param {*} [property=null] - ex: 'lines.0' will update lines[0] for that game in that session
     * @param {*} [options={}]
     * @returns
     */
    async updateSessionGame (sessionName, gameName, data, property = null, options = {}) {
        if (property === null) {
            return this.__updateSession(sessionName, data, `games.${gameName}`, options)
        }

        return this.__updateSession(sessionName, data, `games.${gameName}.${property}`, options)
    },

    /**
     * Updates the session gamble of that gamble of that session or a sub property of it
     *
     * @param {string} sessionName
     * @param {string} gambleName
     * @param {string} data
     * @param {*} [property=null]
     * @param {*} [options={}]
     * @returns
     */
    async updateSessionGamble (sessionName, gambleName, data, property = null, options = {}) {
        if (property === null) {
            return this.__updateSession(sessionName, data, `gamble.${gambleName}`, options)
        }

        return this.__updateSession(sessionName, data, `gamble.${gambleName}.${property}`, options)
    }

}

module.exports = loaders
