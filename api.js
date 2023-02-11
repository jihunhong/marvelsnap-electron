const axios = require("axios");
const { shell } = require("electron");
/**
 *
 * @param {string} profileId
 */

exports.getUser = function (profileId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.snapsco.net/api/collections/user_collection/records`, {
        params: {
          filter: `(profileId="${profileId}")`,
        },
        paramsSerializer: {
          encode: function (params) {
            let result = "";
            Object.keys(params).forEach((key) => {
              result += `${key}=` + `${decodeURIComponent(params[key])}&`;
            });
            return result.slice(0, result.length - 1);
          },
        },
      })
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
exports.update = function (id, profileId, cards, { open = false }) {
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
        open ? shell.openExternal(`https://snapsco.net/p/${profileId}`) : null;
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
exports.create = function (profileId, cards, { open = false }) {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://api.snapsco.net/api/collections/user_collection/records`, {
        profileId,
        cards: JSON.stringify(cards),
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
