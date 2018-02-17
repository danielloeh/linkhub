import React from "react";
import {showConfig} from "./actions";
import {connect} from "react-redux";
import Button from "muicss/lib/react/button";
import "./ConfigButton.css";

let ShowConfigButton = ({dispatch}) => {

  let onSubmit = e => {
    dispatch(showConfig());
  };

  return (
    <Button className='switch-button' color="primary" onClick={onSubmit}> Edit Config</Button>
  );
};

ShowConfigButton = connect()(ShowConfigButton);

export default ShowConfigButton