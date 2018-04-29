"use strict";

module.exports = class FeatureConfig {

  constructor (envVariables) {
    this.editEnabled = envVariables.EDIT_ENABLED || true;
  }

  getFeatureConfig () {
    return {
      editEnabled: this.editEnabled
    };
  }
};