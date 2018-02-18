"use strict"
const fs = require('fs');
const Joi = require('joi');

let content;
const configFile = "links.json";

const configSchema = Joi.array().items(Joi.object().keys({
  categoryName: Joi.string().token().min(1).max(50).required(),
  links: Joi.array().items(Joi.object().keys({
    url: Joi.string().uri().required(),
    name: Joi.string().required()
  }))
}));

module.exports = class ConfigReader {

  constructor () {
    const jsonString = fs.readFileSync(configFile);

    const result = Joi.validate(JSON.parse(jsonString), configSchema);
    if (result.error !== null) {
      console.error("Invalid config format: " + result.error.details[0].message);
      content = {};
    } else {
      content = JSON.parse(jsonString);
    }
  }

  getLinks () {
    return content;
  }

  saveConfig (config, sendPositiveResultFn, sendNegResult) {

    const result = Joi.validate(config, configSchema);

    if (result.error === null) {
      fs.writeFile(configFile, JSON.stringify(config), function (err) {
        if (!err) {
          sendPositiveResultFn(config);
        } else {
          console.error("Cant write file:  " + err);
          sendNegResult();
        }
      });
    } else {
      console.error("Invalid config format: " + result.error.details[0].message);
      sendNegResult();
    }
  }

  addLink (linkPayload, sendPositiveResultFn, sendNegResult) {

    const jsonString = fs.readFileSync(configFile);

    const result = Joi.validate(JSON.parse(jsonString), configSchema);

    if (result.error === null) {
      const updatedContent = content.map((category) => {
        if (category.categoryName === linkPayload.category) {
          category.links.push({url: linkPayload.url, name: linkPayload.name});
        }
        return category;
      });

      fs.writeFile(configFile, JSON.stringify(updatedContent), function (err) {
        if (!err) {
          sendPositiveResultFn(updatedContent);
        } else {
          console.error("Cant write file:  " + err);
          sendNegResult();
        }
      });
    } else {
      console.error("Invalid config format: " + result.error.details[0].message);
      sendNegResult();
    }
  }
};