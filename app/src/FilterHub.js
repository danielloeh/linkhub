import React from "react";
import DoFilter from "./DoFilter";
import FilteredList from "./FilteredList";
import StateStructure from "./LinkPropTypes";
import './FilterHub.css';
import ExportButton from "./ExportButton";

const LinkHub = ({allResults, filteredResults}) => (
  <div className="FilterHub">
    <DoFilter />
    <ExportButton />
    <FilteredList allResults={allResults} filteredResults={filteredResults}/>
  </div>
);

LinkHub.propTypes = StateStructure;

export default LinkHub;