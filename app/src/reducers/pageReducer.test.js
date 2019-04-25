import pageReducer from "./pageReducer";
import * as actions from "../actions";

describe('Page Reducer', () => {

  it('returns show links as the initial state', () => {
    expect(pageReducer(undefined, {})).toEqual(
      {
        pageState: actions.SHOW_LINKS,
        pageMode: 'SHOW_COMPACT'
      }
    );
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

  it('handles toggle page mode from full', () => {
    expect(
      pageReducer({pageMode: 'SHOW_FULL'}, {
        type: actions.TOGGLE_PAGE_MODE
      })
    ).toEqual(
      {
        pageMode: 'SHOW_COMPACT'
      }
    );
  });

  it('handles toggle page mode from compact', () => {
    expect(
      pageReducer({pageMode: 'SHOW_COMPACT'}, {
        type: actions.TOGGLE_PAGE_MODE
      })
    ).toEqual(
      {
        pageMode: 'SHOW_FULL'
      }
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
});