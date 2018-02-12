import React, {Component} from "react";
import PropTypes from "prop-types";
import DoFilter from "./DoFilter";
import FilteredList from "./FilteredList";
import DoReset from "./DoReset";

const LinkHub = ({filteredResults, onFilterClick}) => (
  <div className="FilterHub">
    <DoFilter />
    <DoReset />
    <FilteredList filteredResults={filteredResults}/>
  </div>
);

LinkHub.propTypes = {
  filteredResults: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onFilterClick: PropTypes.func.isRequired
};

export default LinkHub;