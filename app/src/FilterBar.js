import React from "react";
import {applyFilter, displayAll, fetchConfig, openLink, showAddLink, showConfig, showLinks} from "./actions";
import "./FilterBar.css";
import {connect} from "react-redux";
import Appbar from "muicss/lib/react/appbar";
import Input from "muicss/lib/react/input";
import GenericButton from "./GenericButton";

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
      <Appbar className="app-bar mui--bg-primary">
        <GenericButton id="home" size="small" actions={[fetchConfig, showLinks]} label="Home"/>
        <Input autoFocus placeholder="Search categories, names and URLs" className="filter-input" type="text"
               onChange={onChange.bind(this)}
               onKeyDown={onKeyUpFilter.bind(this)}/>
        <GenericButton id="add-link" size="small" actions={[showAddLink]} label="Add Link"/>
        <GenericButton id="edit-config" size="small" actions={[showConfig]} label="Edit Config"/>
      </Appbar>
    );
  }
;

FilterBar = connect()(FilterBar);

export default FilterBar