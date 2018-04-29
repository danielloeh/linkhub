"use strict";

module.exports = class FeatureConfig {

  constructor ({editEnabled = false}) {
    this.editEnabled = editEnabled;
  }

  getFeatureConfig () {
    return {
      editEnabled: this.editEnabled
    };
  }
};