import {
  CONFIG_FETCHED,
  CONFIG_SAVED,
  FEATURE_CONFIG_FETCHED,
  FETCH_CONFIG,
  HIDE_ALERT,
  SAVING_CONFIG,
  SHOW_ALERT
} from "../actions";
import {combineReducers} from "redux";
import {ALERT_INFO_TYPE} from "../Alert";
import filter from "./filterReducer";
import page from "./pageReducer";
import auth from "./authReducer";

const emptyLoadingState = {
  allResults: [],
  categories: [],
};

const emptyAlertingState = {
  message: '',
  alertType: ALERT_INFO_TYPE,
  show: false
};

const emptySavingState = {
  saving: false
};

const emptyFeatureConfigState = {
  editEnabled: false,
  authURI: '',
  authClientID: '',
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
      return state;
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

function featureConfig (state = emptyFeatureConfigState, action) {
  switch (action.type) {
    case FEATURE_CONFIG_FETCHED:
      return Object.assign({}, state, {
        editEnabled: action.configJson.editEnabled,
        authClientID: action.configJson.authClientID,
        authURI: action.configJson.authURI,
      });
    default:
      return state;
  }
}

const combinedReducers = combineReducers({
  filter,
  page,
  loading,
  alerting,
  saving,
  featureConfig,
  auth
});

export default combinedReducers;