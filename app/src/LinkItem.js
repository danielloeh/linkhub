import React from "react";
import PropTypes from 'prop-types';
import './LinkItem.css';

const LinkItem = ({link}) => {
  return (
    <div className="LinkItem">
      <li>
        <a href={link.url}>{link.name} ({link.url})</a>
      </li>
    </div>
  );
}

LinkItem.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default LinkItem;


