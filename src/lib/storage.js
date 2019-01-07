const browser = require('webextension-polyfill');

module.exports.get = browser.storage.local.get;

module.exports.set = browser.storage.local.set;
