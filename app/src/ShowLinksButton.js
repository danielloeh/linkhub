import React from "react";
import {fetchConfig, showLinks} from "./actions";
import {connect} from "react-redux";
import Button from "muicss/lib/react/button";
import './ShowLinksButton.css';

let ShowLinksButton = ({dispatch}) => {

  let onSubmit = () => {
    dispatch(fetchConfig());
    dispatch(showLinks());
  };

  return (
    <Button className='link-switch-button' color="primary" onClick={onSubmit}>Show Links</Button>
  );
};

ShowLinksButton = connect()(ShowLinksButton);

export default ShowLinksButton