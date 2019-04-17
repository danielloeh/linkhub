import React from 'react';
import {connect} from "react-redux";
import {processCallback} from "./actions";

let Callback = ({dispatch, location}) => {

  dispatch(processCallback(location.hash));

  return (
    <div/>
  );
};

Callback = connect()(Callback);

export default Callback;