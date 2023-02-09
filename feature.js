const { Notification, app } = require("electron");
const path = require("path");
const { parseAsJSONIfNeeded } = require("./events");
const { getUser, update, create } = require("./api");
const fs = require("fs");
const { getLogPath } = require("./lib");
const { info } = require("./slack");

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

  getUser(profileId)
    .then((id) => {
      update(id, profileId, cards);
    })
    .catch((err) => {
      create(profileId, cards)
        .then(() => info({ title: "collection created.", text: `${profileId} created` }));
    });
};
