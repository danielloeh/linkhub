"use strict";

module.exports = class FeatureConfig {

  constructor (envVariables) {
    const toggleAsBool = (envVariables.EDIT_ENABLED || 'true') === 'true';
    const auth_client_id = envVariables.AUTH_CLIENT_ID || 'some-client-id';
    const auth_URI = envVariables.AUTH_SERVER_URI || 'localhost:1234';

    this.featureConfig = {
      editEnabled: toggleAsBool,
      authClientID: auth_client_id,
      authURI: auth_URI
    };

    console.log(`Using following feature config: ${JSON.stringify(this.featureConfig)}`);
  }

  getFeatureConfig () {
    return this.featureConfig;
  }
};