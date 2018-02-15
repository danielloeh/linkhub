import React from "react";
import DoFilter from "./DoFilter";
import FilteredList from "./FilteredList";
import StateStructure from "./LinkPropTypes";
import "./FilterHub.css";
import {SHOW_CONFIG} from "./actions";
import Config from "./Config";

function Pages (props) {
  const showConfig = props.pageState === SHOW_CONFIG;
  if (showConfig) {
    return <Config allResults={props.allResults}/>;
  }
  return <FilteredList allResults={props.allResults} filteredResults={props.filteredResults}/>;
}

const LinkHub = ({allResults, filteredResults, pageState}) => (
  <div className="FilterHub">
    <DoFilter />
    <Pages pageState={pageState} filteredResults={filteredResults} allResults={allResults}/>
  </div>
);

LinkHub.propTypes = StateStructure;

export default LinkHub;