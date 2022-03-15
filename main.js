const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const QRCode = require("qrcode");
const ipc = ipcMain;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 820,
        minWidth: 820,
        height: 600,
        minHeight: 600,
        frame: false,
        icon: path.join(__dirname, "/public/Image/Logo.png"),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            devTools: false,
            preload: path.join(__dirname + "/src/Js/Backend/preload.js"),
        },
    });

    win.loadFile(path.join(__dirname, "/src/app/index.html"));
    win.setMenu(null);

    ipc.on("closeApp", () => {
        win.close();
    });

    ipc.on("resizeApp", () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    });

    ipc.on("minApp", () => {
        win.minimize();
    });
};

app.whenReady().then(() => createWindow());

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

ipc.on("salvarQrcode", async (evt, message) => {
    const result = await dialog.showSaveDialog({
        filters: [{ name: "QRCode", extensions: ["png"] }],
    });

    if (result.canceled) {
        return;
    }

    const local = result.filePath;
    QRCode.toFile(local, message, {
        errorCorrectionLevel: 'H',
        width: 350
    }, function (err) {
        if (err) throw err;
        dialog.showMessageBox({
            title: 'Sucesso',
            buttons: ['Ok'],
            type: "info",
            message: 'Qrcode salvado com sucesso!',
        });
    });
});
