import {SHOW_ADD_LINK, TOGGLE_PAGE_MODE, SHOW_CONFIG, SHOW_LINKS} from "../actions";

export const SHOW_COMPACT = 'SHOW_COMPACT';
export const SHOW_FULL = 'SHOW_FULL';

const emptyPageState = {
  pageState: SHOW_LINKS,
  pageMode: SHOW_COMPACT
};

const togglePageMode = (pageMode) => (pageMode === 'SHOW_FULL') ? SHOW_COMPACT : SHOW_FULL;

function page (state = emptyPageState, action) {
  switch (action.type) {
    case SHOW_CONFIG:
      return Object.assign({}, state, {pageState: SHOW_CONFIG});
    case SHOW_LINKS:
      return Object.assign({}, state, {pageState: SHOW_LINKS});
    case SHOW_ADD_LINK:
      return Object.assign({}, state, {pageState: SHOW_ADD_LINK});

    case TOGGLE_PAGE_MODE:
      return Object.assign({}, state, {pageMode: togglePageMode(state.pageMode)});
    default:
      return state
  }
}

export default page;