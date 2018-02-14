import {FILTERED, SHOW_CONFIG, SHOW_LINKS, UNFILTERED} from "./actions";
import {combineReducers} from "redux";

const emptyState = {
  allResults: [],
  filteredResults: [],
  filterTerm: '',
  pageState: SHOW_LINKS
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

  switch (action.type) {
    case SHOW_CONFIG:
      return Object.assign({}, state, {pageState: SHOW_CONFIG});
    case SHOW_LINKS:
      return Object.assign({}, state, {pageState: SHOW_LINKS});
    default:
      return state
  }
}

const linkList = combineReducers({
  filter,
  page
});

export default linkList;