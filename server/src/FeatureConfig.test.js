import FeatureConfig from "./FeatureConfig";

describe("FeatureConfig Test", () => {

  it('returns right mapping', () => {

    const vars = {
      EDIT_ENABLED : true
    };

    const featureConfig = new FeatureConfig(vars);

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(true);
  });

  it('defaults to false', () => {

    const vars = {
    };

    const featureConfig = new FeatureConfig(vars);

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(false);
  });

});