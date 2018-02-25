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
      if (ev.keyCode === 13) {
        ev.preventDefault();
        dispatch(openLink(1));
      }
      else if (ev.shiftKey && (ev.keyCode >= 49 && ev.keyCode <= 52)) {
        ev.preventDefault();
        dispatch(openLink(ev.keyCode - 48));
      } else {

      }
    };

    return (
      <Appbar>
        <Input autoFocus placeholder="type to filter" className="filter-input" type="text"
               onChange={onChange.bind(this)}
               onKeyDown={onKeyUpFilter.bind(this)}/>
        <div className="filter-hint">
          Hit RETURN or SHIFT+number to open first links
        </div>
      </Appbar>
    );
  }
;

DoFilter = connect()(DoFilter);

export default DoFilter