import React from "react";
import DoFilter from "./DoFilter";
import FilteredList from "./FilteredList";
import StateStructure from "./LinkPropTypes";
import "./FilterHub.css";
import {SHOW_ADD_LINK, SHOW_CONFIG, SHOW_LINKS} from "./actions";
import Config from "./Config";
import Alert from "./Alert";
import AddLink from "./AddLink";

function Pages (props) {
  switch (props.pageState) {
    case SHOW_CONFIG:
      return <Config allResults={props.allResults}/>;
    case SHOW_ADD_LINK:
      return <AddLink categories={props.categories}/>;
    case SHOW_LINKS:
    default:
      return <FilteredList allResults={props.allResults} filteredResults={props.filteredResults}/>;
  }
}

const LinkHub = ({allResults, filteredResults, pageState, alerting, categories}) => (
  <div className="filter-hub">
    <DoFilter allResults={allResults}/>
    <Alert message={alerting.message} show={alerting.show} alertType={alerting.alertType}/>
    <Pages pageState={pageState} filteredResults={filteredResults} allResults={allResults}/>
  </div>
);

LinkHub.propTypes = StateStructure;

export default LinkHub;