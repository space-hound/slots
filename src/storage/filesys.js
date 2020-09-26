const fsp = require('fs').promises

const storage = {

    /**
     * Check if a file/dir exists
     *
     * @param {*} path
     * @param {boolean} [unsafe=false] - setting this to true will throw an error in case of error
     * @returns
     */
    async exists (path, unsafe = false) {
        try {
            await fsp.access(path)

            return true
        } catch (error) {
            if (unsafe) {
                throw error
            }

            return false
        }
    },

    /**
     * Creates a file or a dir.
     *
     * @param {*} path
     * @param {*} [name=null] - if null will create a dir
     * @param {boolean} [unsafe=false] - setting this to true will throw an error in case of error
     * @returns
     */
    async create (path, name = null, unsafe = false) {
        try {
            if (name === null) {
                await fsp.mkdir(path)
            } else {
                await fsp.writeFile(path + name, '')
            }

            return true
        } catch (error) {
            if (unsafe) {
                throw error
            }

            return false
        }
    },

    /**
     * Will copy a file to it's destination.
     *
     * @param {*} src
     * @param {*} dest
     * @param {boolean} [unsafe=false] - setting this to true will throw an error in case of error
     * @returns
     */
    async copy (src, dest, unsafe = false) {
        try {
            await fsp.copyFile(src, dest)

            return true
        } catch (error) {
            if (unsafe) {
                throw error
            }

            return false
        }
    },

    /**
     * Read a file and returns it's content or null in case of error,
     *
     * @param {*} path
     * @param {boolean} [unsafe=false] - setting this to true will throw an error in case of error
     * @returns
     */
    async read (path, unsafe = false) {
        try {
            const data = await fsp.readFile(path)

            return data
        } catch (error) {
            if (unsafe) {
                throw error
            }

            return null
        }
    },

    /**
     * Will write to a file and return true if success or false if error.
     *
     * @param {*} path
     * @param {*} data
     * @param {boolean} [unsafe=false] - setting this to true will throw an error in case of error
     * @returns
     */
    async write (path, data, unsafe = false) {
        try {
            await fsp.writeFile(path, data)

            return true
        } catch (error) {
            if (unsafe) {
                throw error
            }

            return false
        }
    }

}

module.exports = storage
