import { app, BrowserWindow } from "electron";
import expressApp from "./app";
import sequelize from "./models/sequelize";
import path from "path";
import url from "url";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8888;
let server;

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let startUrl = "";
  if (process.env.ENV === "development") {
    startUrl = "http://localhost:4200";
  } else {
    startUrl = url.format({
      pathname: path.join(__dirname, "../renderer/build/index.html"),
      protocol: "file:",
      slashes: true,
    });
  }

  server = http.createServer(expressApp);
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  mainWindow.loadURL(startUrl);
};

app.whenReady().then(() => {
  sequelize.authenticate().then(() => {
    sequelize.sync().then(() => {
      console.log("Database connection has been established successfully.");
    });
  });

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
