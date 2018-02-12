import React from "react";
import PropTypes from 'prop-types';

const LinkItem = ({link}) => {
  console.log("li : "+ JSON.stringify(link));
  return (
  <div className="linkitem">
    <li>
      {link.name} / {link.url}
    </li>
  </div>
);}

LinkItem.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default LinkItem;


