import React from "react";
import DoFilter from "./DoFilter";
import FilteredList from "./FilteredList";
import StateStructure from "./LinkPropTypes";
import "./FilterHub.css";
import {SHOW_CONFIG} from "./actions";
import Config from "./Config";
import Alert from './Alert';

function Pages (props) {
  const showConfig = props.pageState === SHOW_CONFIG; // todo: reference state, not action
  if (showConfig) {
    return <Config allResults={props.allResults}/>;
  }
  return <FilteredList allResults={props.allResults} filteredResults={props.filteredResults}/>;
}

const LinkHub = ({allResults, filteredResults, pageState, alerting}) => (
  <div className="filter-hub">
    <DoFilter allResults={allResults}/>
    <Alert message={alerting.message} show={alerting.show} alertType={alerting.alertType}/>
    <Pages pageState={pageState} filteredResults={filteredResults} allResults={allResults}/>
  </div>
);

LinkHub.propTypes = StateStructure;

export default LinkHub;