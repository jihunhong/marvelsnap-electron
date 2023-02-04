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
  if (isMac()) {
    return `~/Library/Containers/SNAP/Data/Documents/Standalone/States/nvprod/CollectionState.json`;
  }
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
