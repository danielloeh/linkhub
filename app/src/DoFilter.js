import React from "react";
import {applyFilter, displayAll, openLink} from "./actions";
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

  let onKeyUpFilter = (ev) => {
    ev.preventDefault();

    if (ev.keyCode === 13) {
      dispatch(openLink());
    }
  };

  return (
    <Appbar>
      <Input autoFocus placeholder="type to filter" className="filter-input" type="text"
             onChange={onChange.bind(this)}
             onKeyUp={onKeyUpFilter.bind(this)}/>
      <div className="filter-hint">
        Hit RETURN to open first link in new tab
      </div>
    </Appbar>
  );
};

DoFilter = connect()(DoFilter);

export default DoFilter