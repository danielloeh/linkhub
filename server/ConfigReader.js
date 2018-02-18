"use strict"
const fs = require('fs');

let content;
const configFile = "links.json";

module.exports = class ConfigReader {

  constructor () {
    content = JSON.parse(fs.readFileSync(configFile));
  }

  getLinks () {
    return content;
  }

  saveConfig (config, sendPositiveResultFn, sendNegResult) {
    fs.writeFile(configFile, JSON.stringify(config), function (err) {
      if (err) {
        sendNegResult();
      }
      sendPositiveResultFn(config);
    });
  }

  addLink (linkPayload, sendPositiveResultFn, sendNegResult) {

    content = JSON.parse(fs.readFileSync(configFile));

    const updatedContent = content.map((category) => {
      if (category.categoryName === linkPayload.category) {
        category.links.push({url: linkPayload.url, name: linkPayload.name});
      }
      return category;
    });

    fs.writeFile(configFile, JSON.stringify(updatedContent), function (err) {
      if (err) {
        sendNegResult();
      }
      sendPositiveResultFn(updatedContent);
    });
  }
};