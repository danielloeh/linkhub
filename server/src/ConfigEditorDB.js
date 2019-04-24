'use strict';
const Joi = require('joi-browser');

const TABLE_NAME = 'links';

const configSchema = Joi.array().items(Joi.object().keys({
  categoryName: Joi.string().min(1).max(50).required(),
  links: Joi.array().items(Joi.object().keys({
    url: Joi.string().uri().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  })),
}));

const stringRepresentationIsNotTheSame = (updatedContent, jsonString) => {
  return JSON.stringify(updatedContent) !== JSON.stringify(JSON.parse(jsonString));
};

module.exports = class ConfigEditorDB {

  constructor (database) {
    this.database = database;
  }

  getLinks (user) {
    const jsonString = this.database.read({ user: user, table: TABLE_NAME });

    const result = Joi.validate(JSON.parse(jsonString), configSchema);
    if (result.error !== null) {
      console.error('Invalid config format: ' + result.error.details[0].message);
      return {};
    } else {
      return JSON.parse(jsonString);
    }
  }

  saveConfig (user, data, sendPositiveResultFn, sendNegResult) {

    const result = Joi.validate(data, configSchema);

    if (result.error === null) {
      this.database.upsert({ user: user, data: JSON.stringify(data), table: TABLE_NAME });
    } else {
      console.error('Invalid config format: ' + result.error.details[0].message);
      sendNegResult();
    }
  }

  addLink (user, linkPayload, sendPositiveResultFn, sendNegResult) {

    const jsonString = this.database.read({ table: TABLE_NAME, user: user });

    const result = Joi.validate(JSON.parse(jsonString), configSchema);

    if (result.error === null) {
      const updatedContent = this.getLinks().map((category) => {
        if (category.categoryName === linkPayload.category) {
          category.links.push({ url: linkPayload.url, name: linkPayload.name, description: linkPayload.description });
        }
        return category;
      });

      if (stringRepresentationIsNotTheSame(updatedContent, jsonString)) {
        this.database.upsert({ table: TABLE_NAME, user: user, data: JSON.stringify(updatedContent) });
      } else {
        console.error('No valid link added');
        sendNegResult();
      }
    } else {
      console.error('Invalid config format: ' + result.error.details[0].message);
      sendNegResult();
    }
  }
};