import {SHOW_ADD_LINK, SHOW_CONFIG, SHOW_GIT_SETTINGS, SHOW_LINKS} from "../actions";

const emptyPageState = {
  pageState: SHOW_LINKS,
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
    default:
      return state
  }
}

export default page;