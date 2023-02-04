const { nativeImage, Menu, app, Tray } = require("electron");
const { dataSync } = require("./feature");
const path = require("path");
const { isMac } = require("./lib");
const sharp = require("sharp");

const iconPath = path.join(__dirname, "./icon.png");

exports.settingTray = function () {
  const tray = new Tray(nativeImage.createFromPath(iconPath));
  if (isMac()) {
    const smallSvg = Buffer.from(`
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.5" stroke="white"/>
            <path d="M10.2601 4.71314C10.2287 4.64909 10.1804 4.59524 10.1206 4.5576C10.0609 4.51995 9.99199 4.50001 9.92174 4.5H6.14076C5.99746 4.5 5.86664 4.58248 5.80236 4.71314L4.28997 7.79647C4.26369 7.85001 4.25 7.90907 4.25 7.96894C4.25 8.02882 4.26369 8.08787 4.28997 8.14142L5.80236 11.2247C5.86664 11.355 5.99746 11.4375 6.14076 11.4375H9.92174C10.065 11.4375 10.1959 11.355 10.2601 11.2244L11.7725 8.14103C11.7988 8.08749 11.8125 8.02843 11.8125 7.96856C11.8125 7.90868 11.7988 7.84963 11.7725 7.79608L10.2601 4.71314ZM10.8224 7.58333H7.88682L6.75252 5.27083H9.68808L10.8224 7.58333ZM5.05108 7.96875L6.14076 5.74721L7.23044 7.96875L6.14076 10.1903L5.05108 7.96875ZM9.68808 10.6667H6.75252L7.88682 8.35417H10.8224L9.68808 10.6667Z" fill="white"/>
        </svg>
    `);

    sharp(smallSvg)
      .png()
      .toBuffer()
      .then((icon) => tray.setImage(nativeImage.createFromBuffer(icon)));
  }
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
      label: `Current version : ${app.getVersion()}`,
      type: "normal",
    },
    {
      label: "종료",
      type: "normal",
      role: "quit",
    },
  ]);
  tray.setContextMenu(contextMenu);
};
