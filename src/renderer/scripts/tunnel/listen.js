import { ipcRenderer } from 'electron'
import { has, forOwn } from 'lodash'

let tracker = {}

export const listen = (type, callback) => {
    // if it tries to overwrite remove and delete first
    if (has(tracker, type)) {
        remove(type)
    }

    // add the callback
    tracker[type] = callback
    // attach listener
    ipcRenderer.on(type, callback)
}

export const remove = (type = null) => {
    // if type is null
    if (type === null) {
        // remove everything
        forOwn(tracker, (value, key) => {
            // remove all listeners in tracker
            ipcRenderer.removeListener(key, value)
        })

        // empty out the tracker
        tracker = {}

        // return
        return
    }

    // no listener fot type, nothing to do
    if (!has(tracker, type)) {
        return
    }

    // remove listener
    ipcRenderer.removeListener(type, tracker[type])
    // delete from tracker
    delete tracker[type]
}

export const removeBut = (types) => {
    Object.keys(tracker).forEach(key => {
        if (!types.includes(key)) {
            remove(key)
        }
    })
}

export default { listen, remove, removeBut }
