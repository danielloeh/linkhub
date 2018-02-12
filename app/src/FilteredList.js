import React from "react";
import LinkItem from "./LinkItem";
import PropTypes from 'prop-types';

let FilteredList = ({filteredResults}) => {
  console.log("fl " + JSON.stringify(filteredResults));
  return (
    <ul>
      {filteredResults.map((link) => (<LinkItem link={link}/> ))}
    </ul>
  );
};

FilteredList.propTypes = {
  filteredResults: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
};

export default FilteredList;