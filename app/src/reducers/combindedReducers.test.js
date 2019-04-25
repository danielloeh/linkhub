import combinedReducers from "./combinedReducers";

describe('Combined Reducers', () => {

  it('should return the overall initial state', () => {
    expect(combinedReducers(undefined, {})).toEqual({
      alerting: {"alertType": "info", "message": "", "show": false},
      filter: {"filterTerm": "", "filteredResults": []},
      loading: {"allResults": [], "categories": []},
      page: {"pageState": "SHOW_LINKS", "pageMode": "SHOW_COMPACT"},
      saving: {"saving": false},
      featureConfig: {"editEnabled": false, "authClientID": "", "authURI": ""},
      auth:  {"authCredentials": {}, "authenticationState": "UNAUTHENTICATED", "responseFragment": "", "userDetails": {"fetched": false}}
    })
  });

});