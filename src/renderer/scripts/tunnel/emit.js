import { ipcRenderer } from 'electron'

const emit = (type, payload) => {
    ipcRenderer.send(type, payload)
}

export default emit
