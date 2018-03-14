import pageReducer from "./pageReducers";
import * as actions from "../actions";

describe('Page Reducers', () => {

  it('returns show links as the initial state', () => {
    expect(pageReducer(undefined, {})).toEqual(
      {pageState: actions.SHOW_LINKS}
    )
  });

  it('handles show config', () => {
    expect(
      pageReducer([], {
        type: actions.SHOW_CONFIG
      })
    ).toEqual(
      {pageState: actions.SHOW_CONFIG}
    );
  });

  it('handles show links', () => {
    expect(
      pageReducer([], {
        type: actions.SHOW_LINKS
      })
    ).toEqual(
      {pageState: actions.SHOW_LINKS}
    );

  });
  it('handles show add link', () => {
    expect(
      pageReducer([], {
        type: actions.SHOW_ADD_LINK
      })
    ).toEqual(
      {pageState: actions.SHOW_ADD_LINK}
    );
  });

  it('handles show git settings', () => {
    expect(
      pageReducer([], {
        type: actions.SHOW_GIT_SETTINGS
      })
    ).toEqual(
      {pageState: actions.SHOW_GIT_SETTINGS}
    );
  });

});