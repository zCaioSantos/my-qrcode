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
    saveQrcode: (args) => {
        ipcRenderer.send("salvarQrcode", args);
    },
    createQrcode: async (args) => {
        const result = ipcRenderer.send("createQrcode", args);
        return result;
    }
};

contextBridge.exposeInMainWorld("app", API);