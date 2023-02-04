const {
  app,
  Tray,
  Menu,
  nativeImage,
  Notification,
} = require("electron");
const path = require("path");
const fs = require("fs");
const { parseAsJSONIfNeeded } = require("./events");
const {getUser, update, create} = require("./api");
const iconPath = path.join(__dirname, "./icon.png");

if (process.platform === 'win32') app.setAppUserModelId('snapsco');
app
  .whenReady()
  .then(() => {
    settingTray();
  })
  .then(() => {
    if (process.platform === "win32") {
      if (process.argv[1] == "--squirrel-firstrun") 
        showNotification({ title : 'Welcome', body: "컬렉션 데이터를 연동 할 수 있습니다" });
    }
  });

function settingTray() {
  const tray = new Tray(nativeImage.createFromPath(iconPath));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "컬렉션 연동",
      type: "normal",
      click() {
        dataSync();
      },
    },
    {
      label: "시작프로그램 등록",
      type: "normal",
      click() {
        app.setLoginItemSettings({
          openAtLogin: true,
        });
      },
    },
    {
      label: "종료",
      type: "normal",
      role: "quit",
    },
  ]);
  tray.setContextMenu(contextMenu);
}

function showNotification({
  title,
  body,
}) {
  new Notification({ title, body, icon: iconPath }).show();
}

function dataSync() {
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
  const cards = Array.from(new Set(json.ServerState.Cards.map((c) => c.CardDefId)));

  getUser(profileId)
    .then(id => update(id, profileId, cards))
    .catch(() => create(profileId, cards))
}
