import pageReducer from "./pageReducer";
import * as actions from "../actions";

describe('Page Reducer', () => {

  it('returns show links as the initial state', () => {
    expect(pageReducer(undefined, {})).toEqual(
      {
        pageState: actions.SHOW_LINKS,
        pageMode: actions.SHOW_COMPACT
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

  it('handles show compact mode', () => {
    expect(
      pageReducer([], {
        type: actions.SHOW_COMPACT
      })
    ).toEqual(
      {
        pageMode: actions.SHOW_COMPACT
      }
    );
  });

  it('handles show full mode', () => {
    expect(
      pageReducer([], {
        type: actions.SHOW_FULL
      })
    ).toEqual(
      {
        pageMode: actions.SHOW_FULL
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