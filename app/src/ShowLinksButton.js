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
    <div className='link-switch-button'>
      <Button color="primary" onClick={onSubmit}>Show Links</Button>
    </div>
  );
};

ShowLinksButton = connect()(ShowLinksButton);

export default ShowLinksButton