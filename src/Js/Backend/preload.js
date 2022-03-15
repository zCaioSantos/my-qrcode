const { ipcRenderer, contextBridge, dialog } = require("electron");

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
    saveQrcode: (qrcode) => {
        ipcRenderer.send("salvarQrcode", qrcode);
    }
};

contextBridge.exposeInMainWorld("app", API);