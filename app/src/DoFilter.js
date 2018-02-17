import React from "react";
import {applyFilter, displayAll} from "./actions";
import "./DoFilter.css";
import {connect} from "react-redux";
import Appbar from "muicss/lib/react/appbar";
import Input from "muicss/lib/react/input";

let DoFilter = ({dispatch, allResults}) => {

  let onChange = (ev) => {
    if (!ev.target.value.trim()) {
      dispatch(displayAll());
    }
    dispatch(applyFilter(ev.target.value, allResults));
  };

  return (
    <Appbar>
      <Input placeholder="type to filter" className="filter-input" type="text" onChange={onChange.bind(this)}/>
    </Appbar>
  );
};

DoFilter = connect()(DoFilter);

export default DoFilter