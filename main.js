const { app } = require("electron");
const { showNotification, dataSync } = require("./feature");
const { autoUpdater, AppUpdater } = require("electron-updater");
const { settingTray } = require("./setting");
const { isWindow } = require("./lib");

if (isWindow()) app.setAppUserModelId("Snapsco Tracker");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

app.whenReady().then(() => {
  settingTray();
  dataSync();
  autoUpdater.checkForUpdates();
  if (isWindow()) {
    if (process.argv[1] == "--squirrel-firstrun")
      showNotification({
        title: "Welcome",
        body: "컬렉션 데이터를 연동 할 수 있습니다",
      });
  }
});

autoUpdater.on("update-available", (info) => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", (info) => {});

autoUpdater.on("update-downloaded", (info) => {
  showNotification({
    title: `업데이트가 다운로드 되었습니다 - v${app.getVersion()}`,
    body: "프로그램을 재시작하여 업데이트된 내역을 적용해주세요",
  });
});

autoUpdater.on("error", (info) => {
  console.log(info);
});

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});
