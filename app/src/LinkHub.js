import React from "react";
import FilterBar from "./FilterBar";
import LinkList from "./LinkList";
import {
  alertTypePropTypes,
  categoriesPropTypes,
  gitConnectionPropType,
  resultsPropType
} from "./LinkPropTypes";
import {featureConfigPropType} from "./FeatureConfigPropTypes";
import "./LinkHub.css";
import {SHOW_ADD_LINK, SHOW_CONFIG, SHOW_GIT_SETTINGS, SHOW_LINKS} from "./actions";
import Config from "./Config";
import PropTypes from "prop-types";
import Alert from "./Alert";
import AddLink from "./AddLink";
import GitSettings from "./GitSettings";

function Pages ({allResults, filteredResults, pageState, categories, gitConnection, saving}) {
  switch (pageState) {
    case SHOW_CONFIG:
      return <Config allResults={allResults} gitConnection={gitConnection} saving={saving}/>;
    case SHOW_ADD_LINK:
      return <AddLink categories={categories} gitConnection={gitConnection} saving={saving}/>;
    case SHOW_GIT_SETTINGS:
      return <GitSettings gitConnection={gitConnection}/>;
    case SHOW_LINKS:
    default:
      return <LinkList allResults={allResults} filteredResults={filteredResults}/>;
  }
}

const LinkHub = ({allResults, filteredResults, pageState, alerting, categories, gitConnection, saving, featureConfig}) => (
  <div className="filter-hub">
    <FilterBar allResults={allResults} gitConnection={gitConnection} featureConfig={featureConfig}/>
    <Alert message={alerting.message} show={alerting.show} alertType={alerting.alertType}/>
    <Pages pageState={pageState} filteredResults={filteredResults} allResults={allResults} categories={categories}
           gitConnection={gitConnection} saving={saving}/>
  </div>);

LinkHub.propTypes = {
  allResults: resultsPropType,
  alertType: alertTypePropTypes,
  filteredResults: resultsPropType,
  categories: categoriesPropTypes,
  pageState: PropTypes.string.isRequired,
  gitConnection: gitConnectionPropType,
  saving: PropTypes.bool.isRequired,
  featureConfig: featureConfigPropType
};

export default LinkHub;