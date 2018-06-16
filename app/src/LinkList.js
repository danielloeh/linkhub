import React from "react";
import LinkItem from "./LinkItem";
import "./LinkList.css";
import {resultsPropType} from "./LinkPropTypes";
import PropTypes from "prop-types";

const createQuickAccess = (categoryIndex, itemIndex) => (categoryIndex === 0 && itemIndex < 5) ? {key: itemIndex + 1} : null;

let List = ({filteredResults, pageMode}) => {
  return (filteredResults.map((categoryObj, categoryIndex) => (
    <div className="link-list-category mui--text-body1" key={categoryIndex}>
      <h4>{categoryObj.categoryName}</h4>
      <ul>
        {categoryObj.links.map((link, index) =>
          (<LinkItem key={index} link={link} quickAccess={createQuickAccess(categoryIndex, index)}
                     pageMode={pageMode}/> ))}
      </ul>
    </div>
  )))
};

let LinkList = ({filteredResults, pageMode}) => {
  return (
    <div>
      <List filteredResults={filteredResults} pageMode={pageMode}/>
    </div>
  );
};

LinkList.propTypes = {
  filteredResults: resultsPropType,
  pageMode: PropTypes.string.isRequired
};

export default LinkList;