import React from "react";
import {applyFilter, displayAll} from "./actions";
import {connect} from "react-redux";

let DoFilter = ({dispatch}) => {
  let input;

  let onChange = e => {
    e.preventDefault()
    if (!input.value.trim()) {
      dispatch(displayAll());
    }
    dispatch(applyFilter(input.value));
  };

  return (
    <div>
        <input ref={node => { input = node}} onChange={onChange}/>
    </div>
  );
};

DoFilter = connect()(DoFilter);

export default DoFilter