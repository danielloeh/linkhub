import React from "react";
import {applyFilter, displayAll} from "./actions";
import "./DoFilter.css";
import {connect} from "react-redux";

let DoFilter = ({dispatch}) => {
  let input;

  let onChange = e => {
    e.preventDefault();
    if (!input.value.trim()) {
      dispatch(displayAll());
    }
    dispatch(applyFilter(input.value));
  };

  return (
    <div className="FilterHeader">
      <div className="input-effect">
          <input className="FilterInput effect-2" type="text" placeholder="" ref={node => {
            input = node
          }} onChange={onChange} />
        <span class="focus-border"></span>
      </div>
    </div>
  );
};

DoFilter = connect()(DoFilter);

export default DoFilter