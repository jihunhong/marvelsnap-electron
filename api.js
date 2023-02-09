const axios = require("axios");
const { shell } = require("electron");
/**
 *
 * @param {string} profileId
 */

axios.default.baseUrl = process.env.END_POINT;

exports.getUser = function (profileId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/collections/user_collection/records`, {
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
exports.update = function (id, profileId, cards) {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `/api/collections/user_collection/records/${id}`,
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
      .post(`/api/collections/user_collection/records`, {
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
