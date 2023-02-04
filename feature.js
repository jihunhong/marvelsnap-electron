const { Notification, app } = require("electron");
const path = require("path");
const { parseAsJSONIfNeeded } = require("./events");
const { getUser, update, create } = require("./api");
const fs = require("fs");

const iconPath = path.join(__dirname, "./icon.png");

exports.showNotification = function ({ title, body }) {
  new Notification({ title, body, icon: iconPath }).show();
};

exports.dataSync = function () {
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
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const json = parseAsJSONIfNeeded(file);
  const profileId = json.ServerState.Account.Id;
  const cards = Array.from(
    new Set(json.ServerState.Cards.map((c) => c.CardDefId))
  );

  getUser(profileId)
    .then((id) => update(id, profileId, cards))
    .catch(() => create(profileId, cards));
};
