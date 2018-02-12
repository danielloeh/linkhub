import React from "react";
import DoFilter from "./DoFilter";
import FilteredList from "./FilteredList";
import StateStructure from "./LinkPropTypes";

const LinkHub = ({allResults, filteredResults}) => (
  <div className="FilterHub">
    <DoFilter />
    <FilteredList allResults={allResults} filteredResults={filteredResults}/>
  </div>
);

LinkHub.propTypes = StateStructure;

export default LinkHub;