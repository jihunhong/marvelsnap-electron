const { default: axios } = require("axios");

const infoColor = "#36a64f";
const createAttachment = ({ color = infoColor, title, text }) => {
  return {
    attachments: [
      {
        color,
        pretext: "info",
        author_name: "번역 자동화 bot",
        title,
        text,
        footer: "kittor spreadsheet API",
        footer_icon: "https://t1.daumcdn.net/cfile/tistory/99FB74455F2D08B62D",
      },
    ],
  };
};

exports.info = async ({ title, text }) => {
  if (process.env.SLACK_WEBHOOK_URL) {
    await axios.post(
      process.env.SLACK_WEBHOOK_URL,
      createAttachment({ color: infoColor, title, text })
    );
  } else {
    console.error("Empty .env file - 'SLACK_WEBHOOK_URL'");
  }
};
