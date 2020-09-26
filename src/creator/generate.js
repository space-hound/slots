const path = require('path')
const datastore = require('nedb-promises')
const jsonfile = require('jsonfile')
const fsp = require('fs').promises
const { forOwn, keys, filter, includes } = require('lodash')

const resolve = (src) => {
    return path.resolve(__dirname, src)
}

const PATHS = {
    OUTPUT: resolve('./../storage/temp/'),
    GAMEFILES: resolve('./gamefiles/'),
    USERFILES: resolve('./userfiles/userfile.json'),
    GAMBLEFILES: resolve('./gamblefiles/gamble.json')
}

// delete all files in the output dir
const clearoutputdir = async () => {
    // read output dir content
    const files = await fsp.readdir(PATHS.OUTPUT)

    // for each file delete it
    for (let i = 0; i < files.length; i++) {
        await fsp.unlink(PATHS.OUTPUT + '/' + files[i])
    }
}

// process the game object options
const processGameObject = (object) => {
    // from object.pools that contains objects for each column
    // having as keys the symnols and as values their weights
    //
    // will make an array havin as elements arrays
    // with each symbol appearing weight times
    const generatePools = (gameData) => {
        // for each pool : { '0': 5, '1': 5, '2': 3, ... }
        const pools = gameData.pools.map(oldPool => {
            // make a new pool as an empty array
            const newPool = []

            forOwn(oldPool, (value, key) => {
                // push every key, value times
                // key => symbol
                // value => weight
                for (let i = 0; i < value; i++) {
                    newPool.push(key)
                }
            })

            return newPool
        })

        return pools
    }

    // from old restrictions which is an array of objects
    // each object is the restriction for every column
    // we need to add to move the restriction under "symbols"
    // and add a new array with all symbols except thos who
    // appera in the old restriction object
    const generateRestrictions = (gameData, pools) => {
        const restrictions = gameData.restrictions.map((oldRestriction, index) => {
            let newRestriction = {
                // put the old restriction under symbol
                symbols: oldRestriction,
                // copy the pool for the "index" column
                pool: [...pools[index]]
            }

            // get an array with the symbols in the old restriction object
            const restrictionSymbols = keys(oldRestriction)

            // filter them out of the pool object
            newRestriction.pool = filter(newRestriction.pool, (newVal) => {
                // if the pool elemnt "newVal" is found in restricted symbols "restrictionSymbols" array
                // then we don't need it so return false ( not includes )
                return !includes(restrictionSymbols, newVal)
            })

            return newRestriction
        })

        return restrictions
    }

    // generate the pools
    const pools = generatePools(object)
    // generate the restrictions
    const restrictions = generateRestrictions(object, pools)

    // replace pools
    object.pools = pools
    // replace restrictions
    object.restrictions = restrictions

    // return the object
    return object
}

// create a gamefile with a game content or all the games
const createGameFiles = async (...names) => {
    // game options to be inserted in the file
    // each element will be a diffrent game
    const gamefiles = []

    // if there is no lenth means that we need to generate
    // all the gems present in the dir
    if (names.length === 0) {
        names = await fsp.readdir(PATHS.GAMEFILES)
    } else {
        // otherwise only the games specified
        names = names.map(name => {
            return name + '.json'
        })
    }

    names = names.map(name => {
        return '/' + name
    })

    // read each json file and process the object
    for (let i = 0; i < names.length; i++) {
        const gamefile = await jsonfile.readFile(PATHS.GAMEFILES + names[i])

        gamefiles.push(processGameObject(gamefile))
    }

    // create a gamefile
    const db = await datastore.create(PATHS.OUTPUT + '/gamefiles.db')

    try {
        // insert all games/game
        await db.insert(gamefiles)
    } catch (error) {
        throw error
    }
}

// create a game file with all gamble types
const createGambleFiles = async () => {
    const gamblefile = await jsonfile.readFile(PATHS.GAMBLEFILES)

    const db = await datastore.create(PATHS.OUTPUT + '/gamblefiles.db')

    try {
        await db.insert(gamblefile)
    } catch (error) {
        throw error
    }
}

// create a game file with all predefined users
const createUserFiles = async () => {
    const userfiles = await jsonfile.readFile(PATHS.USERFILES)

    const db = await datastore.create(PATHS.OUTPUT + '/sessions.db')

    try {
        await db.insert(userfiles)
    } catch (error) {
        throw error
    }
}

// create all files at once
const createAllFiles = async () => {
    await createGameFiles()
    await createGambleFiles()
    await createUserFiles()
}

const start = async (args) => {
    // first delete old files in the output dir
    await clearoutputdir()

    switch (args[0]) {
    case 'all':
        await createAllFiles()
        break
    case 'game': // optionaly specifi the name of a file
        await createGameFiles(...args.slice(1))
        break
    case 'gamble':
        await createGambleFiles()
        break
    case 'user':
        await createUserFiles()
        break
    default:
        await createAllFiles()
        break
    }
}

start(process.argv.slice(2))
