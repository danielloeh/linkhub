import FeatureConfig from "./FeatureConfig";

describe("FeatureConfig Test", () => {

  it('returns right mapping for string variables', () => {

    const vars = {
      EDIT_ENABLED : 'true'
    };

    const featureConfig = new FeatureConfig(vars);

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(true);
  });

  it('defaults to true', () => {

    const vars = {
    };

    const featureConfig = new FeatureConfig(vars);

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(true);
  });

});