const { ipcRenderer, contextBridge } = require('electron');

const API = {
    close: () => {ipcRenderer.send('closeApp')},
    resize: () => {ipcRenderer.send('resizeApp')},
    min: () => {ipcRenderer.send('minApp')}
}

contextBridge.exposeInMainWorld('app', API);