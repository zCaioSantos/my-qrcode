const { ipcRenderer, contextBridge } = require("electron");

const API = {
    close: () => {
        ipcRenderer.send("closeApp");
    },
    resize: () => {
        ipcRenderer.send("resizeApp");
    },
    min: () => {
        ipcRenderer.send("minApp");
    },
    saveQrcode: (url) => {
        ipcRenderer.send("salvarQrcode", url);
    },
};

contextBridge.exposeInMainWorld("app", API);