import FeatureConfig from "./FeatureConfig";

describe("FeatureConfig Test", () => {

  it('returns right mapping for string variables', () => {

    const vars = {
      EDIT_ENABLED : 'true',
      AUTH_CLIENT_ID: 'some-id',
      AUTH_SERVER_URI: 'some-uri',
    };

    const featureConfig = new FeatureConfig(vars);

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(true);
    expect(resultingConfig.authClientID).toEqual('some-id');
    expect(resultingConfig.authURI).toEqual('some-uri');
  });

  it('defaults to true', () => {

    const vars = {
    };

    const featureConfig = new FeatureConfig(vars);

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(true);
  });

});