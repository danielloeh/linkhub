import filterReducer from "./filterReducer";
import * as actions from "../actions";

describe('Filter Reducers', () => {

  it('returns an empty filter list as the initial state', () => {
    expect(filterReducer(undefined, {})).toEqual({
      filteredResults: [],
      filterTerm: '',
    })
  });

  it('handles filter links', () => {

    const someResults = [{
      categoryName: "some-category",
      links: [{"url": "some-url", "name": "some-name"}, {"url": "some-url", "name": "some-other-name"}]
    }];

    expect(
      filterReducer([], {
        type: actions.FILTERED,
        filterTerm: "some-other-name",
        allResults: someResults
      })
    ).toEqual({
      filterTerm: "some-other-name",
      filteredResults: [{categoryName: "some-category", links: [{name: "some-other-name", url: "some-url"}]}]
    });
  });

  it('handles unfiltered links', () => {
    expect(
      filterReducer([], {
        type: actions.UNFILTERED
      })
    ).toEqual({
      filteredResults: [],
      filterTerm: '',
    });
  });

});