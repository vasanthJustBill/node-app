const { app, BrowserWindow } = require("electron");
const expressApp = require("./dist/app");
const { sequelize } = require("./dist/models/sequelize");
const path = require("path");
const url = require("url");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "renderer/build/index.html"),
    protocol: "file:",
    slashes: true,
  });

  mainWindow.loadURL(startUrl);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  server.close();
});
