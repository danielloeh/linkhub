import React from "react";
import LinkItem from "./LinkItem";
import "./LinkList.css";
import {resultsPropType} from "./LinkPropTypes";

const createQuickAccess = (categoryIndex, itemIndex) => (categoryIndex === 0 && itemIndex < 5) ? {key: itemIndex + 1} : null;

let List = ({filteredResults}) => {
  return (filteredResults.map((categoryObj, categoryIndex) => (
    <div className="link-list-category mui--text-body1" key={categoryIndex}>
      <h4>{categoryObj.categoryName}</h4>
      <ul>
        {categoryObj.links.map((link, index) =>
          (<LinkItem key={index} link={link} quickAccess={createQuickAccess(categoryIndex, index)}/> ))}
      </ul>
    </div>
  )))
};

let LinkList = ({filteredResults}) => {
  return (
    <div>
      <List filteredResults={filteredResults}/>
    </div>
  );
};

LinkList.propTypes = {
  filteredResults: resultsPropType
};

export default LinkList;