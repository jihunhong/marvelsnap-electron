const { Notification, shell } = require("electron");
const path = require("path");
const { parseAsJSONIfNeeded } = require("./events");
const { upsert } = require("./api");
const fs = require("fs");
const { getLogPath, debounce } = require("./lib");

const iconPath = path.join(__dirname, "./icon.png");

exports.showNotification = function ({ title, body }) {
  new Notification({ title, body, icon: iconPath }).show();
};

exports.dataSync = function () {
  const filePath = getLogPath();
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const json = parseAsJSONIfNeeded(file);
  const profileId = json.ServerState.Account.Id;
  const cards = Array.from(
    new Set(json.ServerState.Cards.map((c) => c.CardDefId))
  );

  upsert(profileId, cards);
};

exports.autoSync = function () {
  const filePath = getLogPath();
  fs.watch(
    filePath,
    debounce((event, filename) => {
      const filePath = getLogPath();
      const file = fs.readFileSync(filePath, { encoding: "utf8" });
      const json = parseAsJSONIfNeeded(file);
      const profileId = json.ServerState.Account.Id;
      const cards = Array.from(
        new Set(json.ServerState.Cards.map((c) => c.CardDefId))
      );

      upsert(profileId, cards);
    }),
    1000 * 10
  );
};

exports.openProfilePage = function () {
  const filePath = getLogPath();
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const json = parseAsJSONIfNeeded(file);
  const profileId = json.ServerState.Account.Id;
  shell.openExternal(`https://snapsco.net/p/${profileId}`);
};
