import React from "react";
import FilterBar from "./FilterBar";
import FilteredList from "./FilteredList";
import StateStructure from "./LinkPropTypes";
import "./FilterHub.css";
import {SHOW_ADD_LINK, SHOW_CONFIG, SHOW_LINKS} from "./actions";
import Config from "./Config";
import Alert from "./Alert";
import AddLink from "./AddLink";

function Pages ({allResults, filteredResults, pageState, categories}) {
  switch (pageState) {
    case SHOW_CONFIG:
      return <Config allResults={allResults}/>;
    case SHOW_ADD_LINK:
      return <AddLink categories={categories}/>;
    case SHOW_LINKS:
    default:
      return <FilteredList allResults={allResults} filteredResults={filteredResults}/>;
  }
}

const LinkHub = ({allResults, filteredResults, pageState, alerting, categories}) => (
  <div className="filter-hub">
    <FilterBar allResults={allResults}/>
    <Alert message={alerting.message} show={alerting.show} alertType={alerting.alertType}/>
    <Pages pageState={pageState} filteredResults={filteredResults} allResults={allResults} categories={categories}/>
  </div>
);

LinkHub.propTypes = StateStructure;

export default LinkHub;