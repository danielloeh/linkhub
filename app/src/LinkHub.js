import React from "react";
import FilterBar from "./FilterBar";
import LinkList from "./LinkList";
import StateStructure from "./LinkPropTypes";
import "./LinkHub.css";
import {SHOW_ADD_LINK, SHOW_CONFIG, SHOW_LINKS} from "./actions";
import Config from "./Config";
import Alert from "./Alert";
import AddLink from "./AddLink";

function Pages ({allResults, filteredResults, pageState, categories, gitConnection, saving}) {
  switch (pageState) {
    case SHOW_CONFIG:
      return <Config allResults={allResults} gitConnection={gitConnection} saving={saving}/>;
    case SHOW_ADD_LINK:
      return <AddLink categories={categories} gitConnection={gitConnection} saving={saving}/>;
    case SHOW_LINKS:
    default:
      return <LinkList allResults={allResults} filteredResults={filteredResults}/>;
  }
}

const LinkHub = ({allResults, filteredResults, pageState, alerting, categories, gitConnection, saving}) => (
  <div className="filter-hub">
    <FilterBar allResults={allResults} gitConnection={gitConnection}/>
    <Alert message={alerting.message} show={alerting.show} alertType={alerting.alertType}/>
    <Pages pageState={pageState} filteredResults={filteredResults} allResults={allResults} categories={categories}
           gitConnection={gitConnection} saving={saving}/>
  </div>
);

LinkHub.propTypes = StateStructure;

export default LinkHub;