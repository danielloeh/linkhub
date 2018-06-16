import React from "react";
import PropTypes from "prop-types";
import "./LinkItem.css";
import {linkPropType} from "./LinkPropTypes";

const displayQuickAccess = (quickAccess) => {
  if (quickAccess) {
    return (<div className="mui--text-caption quick-access">[key &#187; shift+{quickAccess.key}]</div>)
  } else {
    return null;
  }
};

const LinkItem = ({link, quickAccess}) => {
  return (
    <li className="link-item">
      <a href={link.url} target="'_blank'">
        {link.name}&nbsp;
        <div className="mui--text-caption link-url">({link.url})</div>
        {displayQuickAccess(quickAccess)}
      </a>
      <div className="link-description mui--text-caption">{link.description}</div>
    </li>
  );
};

LinkItem.propTypes = {
  link: linkPropType,
  quickAccess: PropTypes.shape({
    key: PropTypes.alphanumeric
  })
};

export default LinkItem;


