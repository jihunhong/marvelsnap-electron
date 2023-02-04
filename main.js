const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  Notification,
} = require("electron");
const path = require("path");
const fs = require("fs");
const { parseAsJSONIfNeeded } = require("./events");
const { default: axios } = require("axios");

app
  .whenReady()
  .then(() => {
    settingTray();
  })
  .then(() => {
    if (process.platform === "win32") {
      // if (process.argv[1] == "--squirrel-firstrun")
      showNotification();
    }
  });

function settingTray() {
  const iconPath = path.join(__dirname, "./electron.png");
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
  title = "Welcome",
  body = "Snapsco에 컬렉션 데이터를 연동 할 수 있습니다",
}) {
  new Notification({ title, body }).show();
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
  const cards = Array.from(new Set(json.Cards.map((c) => c.CardDefId)));
  axios
    .post(`${process.env.END_POINT}/api/collections/user_collection/records`, {
      profileId,
      cards: JSON.stringify(cards),
    })
    .then((res) => {
      shell.openExternal(`https://snapsco.net/p/${profileId}`);
    })
    .catch((err) => {});
}
