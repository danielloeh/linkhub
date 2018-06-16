import React from "react";
import LinkItem from "./LinkItem";
import "./LinkList.css";
import {resultsPropType} from "./LinkPropTypes";
import PropTypes from "prop-types";

const createQuickAccess = (categoryIndex, itemIndex) => (categoryIndex === 0 && itemIndex < 5) ? {key: itemIndex + 1} : null;

let List = ({filteredResults, compactMode}) => {
  return (filteredResults.map((categoryObj, categoryIndex) => (
    <div className="link-list-category mui--text-body1" key={categoryIndex}>
      <h4>{categoryObj.categoryName}</h4>
      <ul>
        {categoryObj.links.map((link, index) =>
          (<LinkItem key={index} link={link} quickAccess={createQuickAccess(categoryIndex, index)}
                     compactMode={compactMode}/> ))}
      </ul>
    </div>
  )))
};

let LinkList = ({filteredResults, compactMode}) => {
  return (
    <div>
      <List filteredResults={filteredResults} compactMode={compactMode}/>
    </div>
  );
};

LinkList.propTypes = {
  filteredResults: resultsPropType,
  compactMode: PropTypes.bool.isRequired
};

export default LinkList;