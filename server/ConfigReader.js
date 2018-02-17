"use strict"
const fs = require('fs');

let content;
const configFile = "links.json";

module.exports = class ConfigReader {

  constructor () {
    content = fs.readFileSync(configFile);
  }

  getLinks () {
    return content;
  }

  saveConfig (config, sendPositiveResultFn, sendNegResult) {
    fs.writeFile(configFile, JSON.stringify(config), function (err) {
      if (err) {
        sendNegResult();
      }
      sendPositiveResultFn();
    });
  }
};