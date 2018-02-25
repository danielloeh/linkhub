import React from "react";
import LinkItem from "./LinkItem";
import PropTypes from "prop-types";
import "./FilteredList.css";
import {showAddLink, showConfig} from "./actions";
import GenericButton from "./GenericButton";

const createQuickAccess = (categoryIndex, itemIndex) => (categoryIndex === 0 && itemIndex < 5) ? {key: itemIndex+1} : null;

let List = ({filteredResults}) => {
  return (filteredResults.map((categoryObj, categoryIndex) => (
    <div className="filtered-list mui--text-body1" key={categoryIndex}>
      <h4>{categoryObj.categoryName}</h4>
      <ul>
        {categoryObj.links.map((link, index) =>
          (<LinkItem key={index} link={link} quickAccess={createQuickAccess(categoryIndex, index)}/> ))}
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