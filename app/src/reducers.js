import {
  CONFIG_FETCHED, CONFIG_SAVED,
  FETCH_CONFIG,
  FILTERED,
  GIT_CONNECTION_CHECKED,
  HIDE_ALERT, SAVING_CONFIG,
  SHOW_ADD_LINK,
  SHOW_ALERT,
  SHOW_CONFIG, SHOW_GIT_SETTINGS,
  SHOW_LINKS,
  UNFILTERED
} from "./actions";
import {combineReducers} from "redux";
import {ALERT_INFO_TYPE} from "./Alert";

const emptyFilterState = {
  filteredResults: [],
  filterTerm: '',
};

const emptyPageState = {
  pageState: SHOW_LINKS,
};

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

const cntsCaseInsns = (str, term) => str.toLowerCase().indexOf(term.toLowerCase()) !== -1;

const linkItemContainsFilterTerm = (item, filterTerm) => cntsCaseInsns(item.url, filterTerm) || cntsCaseInsns(item.name, filterTerm);

let containsFilterTerm = function (filterTerm) {

  let categoryContainsFilterTerm = (category, filterTerm) => cntsCaseInsns(category.categoryName, filterTerm);

  let oneOfTheLinksContainsFilterTerm = (category, filterTerm) =>
    category.links.find((item) => linkItemContainsFilterTerm(item, filterTerm));

  return (category) => categoryContainsFilterTerm(category, filterTerm)
  || oneOfTheLinksContainsFilterTerm(category, filterTerm);
};

let toCategoryWithoutUnmatchedLinks = function (filterTerm) {
  return (category) =>
    Object.assign({}, category, {
      links: category.links.filter((item) => cntsCaseInsns(category.categoryName, filterTerm) ||
      linkItemContainsFilterTerm(item, filterTerm))
    })
};

let extractCategories = (allResults) => {
  let categories = [];
  allResults.forEach(category => categories.push(category.categoryName));
  return categories;
};

function filter (state = emptyFilterState, action) {
  switch (action.type) {
    case FILTERED:
      const newLinkList = action.allResults
        .filter(containsFilterTerm(action.filterTerm))
        .map(toCategoryWithoutUnmatchedLinks(action.filterTerm));
      return Object.assign({}, state, {filteredResults: newLinkList, filterTerm: action.filterTerm});
    case UNFILTERED:
      return Object.assign({}, state, {filteredResults: '', filterTerm: ''});
    default:
      return state
  }
}

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
      return Object.assign({}, state, {connected: action.connected, upToDate:action.upToDate, remoteUrl: action.remoteUrl});
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

const linkListReducers = combineReducers({
  filter,
  page,
  loading,
  alerting,
  git,
  saving
});

export default linkListReducers;