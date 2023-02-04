const { app } = require("electron");
const { showNotification } = require("./feature");
const { autoUpdater, AppUpdater } = require("electron-updater");
const { settingTray } = require("./setting");
const { isWindow } = require("./lib");

if (isWindow()) app.setAppUserModelId("Snapsco Tracker");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

app
  .whenReady()
  .then(() => {
    settingTray();
    autoUpdater.checkForUpdates();
  })
  .then(() => {
    if (isWindow()) {
      if (process.argv[1] == "--squirrel-firstrun")
        showNotification({
          title: "Welcome",
          body: "컬렉션 데이터를 연동 할 수 있습니다",
        });
    }
  });

autoUpdater.on("update-available", (info) => {
  let pth = autoUpdater.downloadUpdate();
  console.log(pth);
});

autoUpdater.on("update-not-available", (info) => {
  console.log("no update avaliable");
});

autoUpdater.on("update-downloaded", (info) => {
  console.log("update downloaded");
});

autoUpdater.on("error", (info) => {
  console.log(info);
});
