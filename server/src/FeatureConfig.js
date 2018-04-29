"use strict";

module.exports = class FeatureConfig {

  constructor (envVariables) {
    const toggleAsBool = (envVariables.EDIT_ENABLED || 'true') === 'true';
    this.featureConfig = {
      editEnabled: toggleAsBool
    };

    console.log(`Using following feature config: ${JSON.stringify(this.featureConfig)}`);
  }

  getFeatureConfig () {
    return this.featureConfig;
  }
};