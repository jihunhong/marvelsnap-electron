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

exports.info = ({ title, text }) => {
  return new Promise((res, rej) => {
    axios.post(
      'https://hooks.slack.com/services/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',
      createAttachment({ color: infoColor, title, text })
    ).then(response => res(response))
    .catch(err => rej(err));
  })
};
