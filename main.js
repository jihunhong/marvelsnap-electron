const { app, shell, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require('path');
const fs = require('fs');
const { parseAsJSONIfNeeded } = require("./events");

app.whenReady().then(() => {
  const win = new BrowserWindow({ show: false });
  console.log(win.isVisible());
  win.hide();
  settingTray();
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
      label: "닫기",
      type: "normal",
      role: "quit",
    },
  ]);
  tray.setContextMenu(contextMenu);

}

function dataSync(){
  const filePath = path.join(app.getPath('home'), 'AppData', 'LocalLow', 'Second Dinner', 'SNAP', 'Standalone', 'States', 'nvprod', 'CollectionState.json');
  const file = fs.readFileSync(filePath, { encoding: 'utf8'} );
  const json = parseAsJSONIfNeeded(file);
  const profileId = json.ServerState.Account.Id;
  shell.openExternal(`https://snapsco.net/p/${profileId}`)
}