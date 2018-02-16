"use strict"
const fs = require('fs');

let content;

module.exports = class ConfigReader {

  constructor () {
    content = fs.readFileSync("links.json");
  }

  getLinks () {
    return content;
  }

  saveConfig (config, sendPositiveResultFn, sendNegResult) {
    fs.writeFile("links.json", JSON.stringify(config), function (err) {
      if (err) {
        sendNegResult();
      }
      sendPositiveResultFn();
    });
  }
};