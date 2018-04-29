"use strict";

module.exports = class FeatureConfig {

  constructor (envVariables) {
    this.featureConfig = {
      editEnabled: envVariables.EDIT_ENABLED || true
    };

    console.log(`Using following feature config: ${JSON.stringify(this.featureConfig)}`);
  }

  getFeatureConfig () {
    return this.featureConfig;
  }
};