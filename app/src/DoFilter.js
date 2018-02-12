import React from "react";
import {doFilter, doReset} from "./actions";
import {connect} from "react-redux";

let DoFilter = ({dispatch}) => {
  let input;

  let onSubmit = e => {
    e.preventDefault()
    if (!input.value.trim()) {
      dispatch(doReset());
    }
    dispatch(doFilter(input.value));
  };

  return (
    <div>
      <form onSubmit={onSubmit} >
        <input ref={node => { input = node}}/>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

DoFilter = connect()(DoFilter);

export default DoFilter