const pify = require('pify');

module.exports.get = args =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get(args, resolve);
  });

module.exports.set = args =>
  new Promise((resolve, reject) => {
    chrome.storage.local.set(args, resolve);
  });
