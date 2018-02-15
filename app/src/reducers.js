import {
  CONFIG_FETCHED,
  FETCH_CONFIG, FETCH_FAILED, FILTERED, SHOW_CONFIG, SHOW_LINKS,
  UNFILTERED
} from "./actions";
import {combineReducers} from "redux";

const emptyState = {
  allResults: [],
  filteredResults: [],
  filterTerm: '',
  pageState: SHOW_LINKS,
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

 function filter (state = emptyState, action) {

  switch (action.type) {
    case FILTERED:
      const newLinkList = state.allResults
        .filter(containsFilterTerm(action.filterTerm))
        .map(toCategoryWithoutUnmatchedLinks(action.filterTerm));

      return Object.assign({}, state, {filteredResults: newLinkList, filterTerm: action.filterTerm});
    case UNFILTERED:
      return Object.assign({}, state, {filteredResults: state.allResults, filterTerm: ''});
    default:
      return state
  }
}

function page (state = emptyState, action) {
console.log('page ' + JSON.stringify(state))
  switch (action.type) {
    case SHOW_CONFIG:
      console.log("show config");
      return Object.assign({}, state, {pageState: SHOW_CONFIG});
    case SHOW_LINKS:
      console.log("show links");
      return Object.assign({}, state, {pageState: SHOW_LINKS});
    default:
      return state
  }
}

function loading (state = emptyState, action) {
  switch (action.type) {
    case FETCH_CONFIG:
      console.log("r: fetch config");
      return state;
    case CONFIG_FETCHED:
      console.log("r: config fetched");
      return Object.assign({}, state, {allResults: action.configJson, filteredResults: action.configJson});
    case FETCH_FAILED:
      console.log("fetch failed" + action.error);
      return state;
    default:
      return state
  }
}

const linkListReducers = combineReducers({
  filter,
  page,
  loading
});

export default linkListReducers;