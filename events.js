const fs = require('fs');

exports.getJSONData = async function(path){
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(path, {
      encoding: 'utf8',
      autoClose: true,
      start: 0,
    });
    let fullJSON = '';

    fileStream.on('data', (chunk) => {
      fullJSON = fullJSON.concat(chunk);
    });
    fileStream.on('end', () => {
      fileStream.close();
      resolve(fullJSON);
    });
    fileStream.on('error', (err) => {
      reject(err);
      fileStream.close();
    });
  });
}

exports.parseAsJSONIfNeeded = function(data) {
    // The heuristic here is that we will parse the data as a JSON if it's a
    // non-empty string that starts with '{'
    if (typeof data === 'string' && data.length > 0 && data[0] === '{') {
      try {
        return JSON.parse(data);
      } catch (err) {
        console.log('Error parsing JSON', err);
      }
    } else if (typeof data === 'string' && data.length > 0 && data[0] !== '{' && data.indexOf('{') < 10) {
      try {
        return JSON.parse(data.slice(data.indexOf('{')));
      } catch (err) {
        console.log('Error parsing JSON', err);
      }
    }
    return data;
  }
  