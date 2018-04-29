import combinedReducers from "./combinedReducers";

describe('Combined Reducers', () => {

  it('should return the overall initial state', () => {
    expect(combinedReducers(undefined, {})).toEqual({
      alerting: {"alertType": "info", "message": "", "show": false},
      filter: {"filterTerm": "", "filteredResults": []},
      git: {"connected": false, "remoteUrl": "", "saving": false, "upToDate": false},
      loading: {"allResults": [], "categories": []},
      page: {"pageState": "SHOW_LINKS"},
      saving: {"saving": false},
      featureConfig: {"editEnabled": false}
    })
  });

});