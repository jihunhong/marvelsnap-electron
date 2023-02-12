const { app, Notification } = require("electron");
const os = require("os");
const path = require("path");
const fs = require("fs");

exports.isMac = function () {
  return os.platform() === "darwin";
};

exports.isWindow = function () {
  return os.platform() === "win32";
};

exports.getLogPath = function () {
  const filePath = path.join(
    app.getPath("home"),
    "AppData",
    "LocalLow",
    "Second Dinner",
    "SNAP",
    "Standalone",
    "States",
    "nvprod",
    "CollectionState.json"
  );
  const exist = fs.existsSync(filePath);
  if (!exist) {
    new Notification({
      title: "컬렉션 데이터가 존재하지 않습니다.",
      body: "데이터 경로에서 파일을 찾을 수 없습니다.",
    }).show();
  }
  return filePath;
};

exports.debounce = function (callback, limit = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
};
