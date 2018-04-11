import {
  CONFIG_FETCHED,
  CONFIG_SAVED,
  FETCH_CONFIG,
  GIT_CONNECTION_CHECKED,
  HIDE_ALERT,
  SAVING_CONFIG,
  SHOW_ALERT,
} from "../actions";
import {combineReducers} from "redux";
import {ALERT_INFO_TYPE} from "../Alert";
import filter from "./filterReducer";
import page from "./pageReducer";

const emptyLoadingState = {
  allResults: [],
  categories: [],
};

const emptyAlertingState = {
  message: '',
  alertType: ALERT_INFO_TYPE,
  show: false
};

const emptyGitState = {
  connected: false,
  remoteUrl: '',
  upToDate: false,
  saving: false
};

const emptySavingState = {
  saving: false
};

let extractCategories = (allResults) => {
  let categories = [];
  allResults.forEach(category => categories.push(category.categoryName));
  return categories;
};

function loading (state = emptyLoadingState, action) {
  switch (action.type) {
    case FETCH_CONFIG:
      return state;
    case CONFIG_FETCHED:
      return Object.assign({}, state, {
        allResults: action.configJson,
        categories: extractCategories(action.configJson)
      });
    default:
      return state
  }
}

function alerting (state = emptyAlertingState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return Object.assign({}, state, {message: action.message, alertType: action.alertType, show: true});
    case HIDE_ALERT:
      return Object.assign({}, state, {show: false});
    default:
      return state;
  }
}

function git (state = emptyGitState, action) {
  switch (action.type) {
    case GIT_CONNECTION_CHECKED:
      return Object.assign({}, state, {
        connected: action.connected,
        upToDate: action.upToDate,
        remoteUrl: action.remoteUrl
      });
    default:
      return state;
  }
}

function saving (state = emptySavingState, action) {
  switch (action.type) {
    case SAVING_CONFIG:
      return Object.assign({}, state, {saving: true});
    case CONFIG_SAVED:
      return Object.assign({}, state, {saving: false});
    default:
      return state;
  }
}

const combinedReducers = combineReducers({
  filter,
  page,
  loading,
  alerting,
  git,
  saving
});

export default combinedReducers;