import {FILTERED, RESET} from "./actions";
import {combineReducers} from "redux";

const staticSearchResults = [
  {
    url: "http://some-url",
    name: "My First Link"
  },
  {
    url: "http://some-other-url",
    name: "My Second Link"
  }
];

const initialState = {
  filteredResults: staticSearchResults,
  filterTerm: ''
};

let containsFilterTerm = function (action) {
  return (item) => item.name.includes(action.filterTerm) || item.url.includes(action.filterTerm);
};
function filter (state = initialState, action) {
  console.log("#Reducer state:" + JSON.stringify(state));
  console.log("#Reducer action:" + JSON.stringify(action));

  switch (action.type) {
    case FILTERED:
      const newLinkList =  staticSearchResults.filter(containsFilterTerm(action));
      return Object.assign({}, state, {filteredResults: newLinkList, filterTerm: action.filterTerm});
    case RESET:
      return Object.assign({}, initialState);
    default:
      return state
  }
}

const linkList = combineReducers({
  filter
});

export default linkList;