import React from "react";
import LinkItem from "./LinkItem";
import PropTypes from "prop-types";
import "./FilteredList.css";
import {showAddLink, showConfig} from "./actions";
import GenericButton from "./GenericButton";


let List = ({filteredResults}) => {
  return (filteredResults.map((categoryObj, index) => (
    <div className="filtered-list mui--text-body1" key={index}>
      <h4>{categoryObj.categoryName}</h4>
      <ul>
        {categoryObj.links.map((link, index) => (<LinkItem key={index} link={link}/> ))}
      </ul>
    </div>
  )))
};

let FilteredList = ({filteredResults}) => {
  return (
    <div>
      <GenericButton actions={[showConfig]} label="Edit Config"/>
      <GenericButton actions={[showAddLink]} label="Add Link"/>
      <List filteredResults={filteredResults}/>
    </div>
  );
};

FilteredList.propTypes = {
  allResults: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        }).isRequired)
    }).isRequired
  ).isRequired,
  filteredResults: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        }).isRequired)
    }).isRequired
  ).isRequired
};

export default FilteredList;