
const BASE = './src/storage/temp/' //  /src/storage

const appendBase = (path) => `${BASE}${path}`

const appendSuff = (file) => `${file}.db`

const STORAGE = {

    SOURCE: BASE,

    GAMES: appendBase(appendSuff('gamefiles')),

    GAMBLES: appendBase(appendSuff('gamblefiles')),

    SESSIONS: appendBase(appendSuff('sessions'))
}

module.exports = STORAGE
