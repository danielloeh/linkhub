import React from "react";
import {doFilter, doReset} from "./actions";
import {connect} from "react-redux";

let DoReset = ({dispatch}) => {
  let onSubmit = e => {
    e.preventDefault()
    dispatch(doReset());
  };

  return (
    <div>
      <form onSubmit={onSubmit} >
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

DoReset = connect()(DoReset);

export default DoReset