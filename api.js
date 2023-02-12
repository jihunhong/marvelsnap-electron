const axios = require("axios");
const { shell } = require("electron");
/**
 *
 * @param {string} profileId
 */

/**
 * create request
 * @param {string} profileId
 * @param {string[]} cards
 */
exports.upsert = function (profileId, cards, { open = false }) {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://snapsco.net/api/user/collection`, {
        profileId,
        cards,
      })
      .then((response) => {
        open ? shell.openExternal(`https://snapsco.net/p/${profileId}`) : null;
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
