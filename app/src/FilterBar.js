import React from "react";
import {applyFilter, displayAll, openLink} from "./actions";
import "./FilterBar.css";
import {connect} from "react-redux";
import Appbar from "muicss/lib/react/appbar";
import Input from "muicss/lib/react/input";

let FilterBar = ({dispatch, allResults}) => {

    let onChange = (ev) => {
      if (ev.target.value.trim()) {
        dispatch(applyFilter(ev.target.value, allResults));
      } else {
        dispatch(displayAll());
      }
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

FilterBar = connect()(FilterBar);

export default FilterBar