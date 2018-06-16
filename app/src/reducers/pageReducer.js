import {SHOW_ADD_LINK, SHOW_COMPACT, SHOW_CONFIG, SHOW_FULL, SHOW_GIT_SETTINGS, SHOW_LINKS} from "../actions";

const emptyPageState = {
  pageState: SHOW_LINKS,
  pageMode: SHOW_COMPACT
};

function page (state = emptyPageState, action) {
  switch (action.type) {
    case SHOW_CONFIG:
      return Object.assign({}, state, {pageState: SHOW_CONFIG});
    case SHOW_LINKS:
      return Object.assign({}, state, {pageState: SHOW_LINKS});
    case SHOW_ADD_LINK:
      return Object.assign({}, state, {pageState: SHOW_ADD_LINK});
    case SHOW_GIT_SETTINGS:
      return Object.assign({}, state, {pageState: SHOW_GIT_SETTINGS});

    case SHOW_COMPACT:
      return Object.assign({}, state, {pageMode: SHOW_COMPACT});
    case SHOW_FULL:
      return Object.assign({}, state, {pageMode: SHOW_FULL});
    default:
      return state
  }
}

export default page;