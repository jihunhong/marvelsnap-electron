const { default: axios } = require("axios");
const { shell } = require("electron");

/**
 *
 * @param {string} profileId
 */
exports.getUser = function (profileId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.snapsco.net/api/collections/user_collection/record?filter=(profileId="${profileId}")&perPage=1`
      )
      .then((response) => {
        resolve(response.data.items[0].id);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * update request
 * @param {string} id
 * @param {string} profileId
 * @param {string[]} cards
 */
exports.update = function (id, profileId, cards) {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `https://api.snapsco.net/api/collections/user_collection/records/${id}`,
        {
          profileId,
          cards: JSON.stringify(cards),
        }
      )
      .then((response) => {
        shell.openExternal(`https://snapsco.net/p/${profileId}`);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * create request
 * @param {string} profileId
 * @param {string[]} cards
 */
exports.create = function (profileId, cards) {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://api.snapsco.net/api/collections/user_collection/records`, {
        profileId,
        cards: JSON.stringify(cards),
      })
      .then((response) => {
        shell.openExternal(`https://snapsco.net/p/${profileId}`);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
