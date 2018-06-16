"use strict"
const fs = require('fs');
const Joi = require('joi-browser');

const configSchema = Joi.array().items(Joi.object().keys({
  categoryName: Joi.string().min(1).max(50).required(),
  links: Joi.array().items(Joi.object().keys({
    url: Joi.string().uri().required(),
    name: Joi.string().required()
  }))
}));

const stringRepresentationIsNotTheSame = (updatedContent, jsonString) => {
  return JSON.stringify(updatedContent) !== JSON.stringify(JSON.parse(jsonString));
};

module.exports = class ConfigEditor {

  constructor (configFile) {
    this.configFile = configFile;
  }

  getLinks () {
    const jsonString = fs.readFileSync(this.configFile);

    const result = Joi.validate(JSON.parse(jsonString), configSchema);
    if (result.error !== null) {
      console.error("Invalid config format: " + result.error.details[0].message);
      return {};
    } else {
      return JSON.parse(jsonString);
    }
  }

  saveConfig (config, sendPositiveResultFn, sendNegResult, gitReader) {

    const result = Joi.validate(config, configSchema);

    if (result.error === null) {
      fs.writeFile(this.configFile, JSON.stringify(config), function (err) {
        if (!err) {

          gitReader.commitConfig(sendPositiveResultFn, sendNegResult, config);
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

  addLink (linkPayload, sendPositiveResultFn, sendNegResult, gitReader) {

    const jsonString = fs.readFileSync(this.configFile);

    const result = Joi.validate(JSON.parse(jsonString), configSchema);

    if (result.error === null) {
      const updatedContent = this.getLinks().map((category) => {
        if (category.categoryName === linkPayload.category) {
          category.links.push({url: linkPayload.url, name: linkPayload.name, description: linkPayload.description});
        }
        return category;
      });

      if (stringRepresentationIsNotTheSame(updatedContent, jsonString)) {
        fs.writeFile(this.configFile, JSON.stringify(updatedContent), function (err) {
          if (!err) {
            gitReader.commitConfig(sendPositiveResultFn, sendNegResult, updatedContent);
          } else {
            console.error("Cant write file:  " + err);
            sendNegResult();
          }
        });
      } else {
        console.warn("No valid link added");
        sendNegResult();
      }
    } else {
      console.error("Invalid config format: " + result.error.details[0].message);
      sendNegResult();
    }
  }
};