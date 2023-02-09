const { app } = require("electron");
const os = require("os");
const path = require("path");

exports.isMac = function () {
  return os.platform() === "darwin";
};

exports.isWindow = function () {
  return os.platform() === "win32";
};

exports.getLogPath = function () {
  return path.join(
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
};
