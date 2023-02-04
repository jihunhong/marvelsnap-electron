const { app } = require("electron");
const os = require("os");

app.whenReady().then(() => {
  const userInfo = os.userInfo();
  const uid = userInfo.uid;
  console.log(userInfo);
  console.log(uid);
});
