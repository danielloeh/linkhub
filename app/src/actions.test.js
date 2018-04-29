import * as actions from "./actions";

describe('actions', () => {

  it('creates an action to apply a filter on all results', () => {

    const filterTerm = 'some-term';
    const allResults = ['some-result', 'some-other-result'];

    const expectedAction = {
      type: actions.FILTERED,
      filterTerm: filterTerm,
      allResults: allResults
    };

    expect(actions.applyFilter(filterTerm, allResults)).toEqual(expectedAction)
  });

  it('creates an action to display all', () => {


    const expectedAction = {
      type: actions.UNFILTERED,
    };

    expect(actions.displayAll()).toEqual(expectedAction)
  });

  it('create an action to open a link', () => {

    const linkNumber = 1;

    const expectedAction = {
      type: actions.OPEN_LINK,
      number: linkNumber
    };

    expect(actions.openLink(linkNumber)).toEqual(expectedAction)
  });

  it('creates an action to open the config page', () => {

    const expectedAction = {
      type: actions.SHOW_CONFIG
    };

    expect(actions.showConfig()).toEqual(expectedAction)
  });
  it('creates an action to open the config page', () => {

    const expectedAction = {
      type: actions.SHOW_CONFIG
    };

    expect(actions.showConfig()).toEqual(expectedAction)
  });

  it('creates an action to open the links page', () => {

    const someLinks = 'some-links';

    const expectedAction = {
      type: actions.SHOW_LINKS,
      linksJson: someLinks
    };

    expect(actions.showLinks(someLinks)).toEqual(expectedAction)
  });

  it('creates an action to open the add link page', () => {

    const expectedAction = {
      type: actions.ADD_LINK
    };

    expect(actions.addLink()).toEqual(expectedAction)
  });

  it('creates an action to git settings page', () => {

    const expectedAction = {
      type: actions.SHOW_GIT_SETTINGS
    };

    expect(actions.showGitSettings()).toEqual(expectedAction)
  });

  it('creates an action for fetching feature config', () => {

    const expectedAction = {
      type: actions.FETCH_FEATURE_CONFIG
    };

    expect(actions.fetchFeatureConfig()).toEqual(expectedAction)
  });

  it('creates an action for feature config fetched', () => {

    const expectedAction = {
      type: actions.FEATURE_CONFIG_FETCHED
    };

    expect(actions.featureConfigFetched()).toEqual(expectedAction)
  });

});
