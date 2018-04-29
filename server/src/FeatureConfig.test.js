import FeatureConfig from "./FeatureConfig";

describe("FeatureConfig Test", () => {

  it('returns right mapping', () => {

    const featureConfig = new FeatureConfig({editEnabled: true});

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(true);
  });

  it('defaults to false', () => {

    const featureConfig = new FeatureConfig({});

    const resultingConfig = featureConfig.getFeatureConfig();

    expect(resultingConfig.editEnabled).toEqual(false);
  });

});