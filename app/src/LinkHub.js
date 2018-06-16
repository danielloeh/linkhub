import React from "react";
import FilterBar from "./FilterBar";
import LinkList from "./LinkList";
import {
  alertTypePropTypes,
  categoriesPropTypes,
  gitConnectionPropType,
  pageProptype,
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

function Pages ({allResults, filteredResults, page, categories, gitConnection, saving}) {
  switch (page.pageState) {
    case SHOW_CONFIG:
      return <Config allResults={allResults} gitConnection={gitConnection} saving={saving}/>;
    case SHOW_ADD_LINK:
      return <AddLink categories={categories} gitConnection={gitConnection} saving={saving}/>;
    case SHOW_GIT_SETTINGS:
      return <GitSettings gitConnection={gitConnection}/>;
    case SHOW_LINKS:
    default:
      return <LinkList allResults={allResults} filteredResults={filteredResults} pageMode={page.pageMode}/>;
  }
}

const LinkHub = ({allResults, filteredResults, page, alerting, categories, gitConnection, saving, featureConfig}) => (
  <div className="filter-hub">
    <FilterBar allResults={allResults} gitConnection={gitConnection} featureConfig={featureConfig} pageMode={page.pageMode}/>
    <Alert message={alerting.message} show={alerting.show} alertType={alerting.alertType}/>
    <Pages page={page} filteredResults={filteredResults} allResults={allResults} categories={categories}
           gitConnection={gitConnection} saving={saving}/>
  </div>);

LinkHub.propTypes = {
  allResults: resultsPropType,
  alertType: alertTypePropTypes,
  filteredResults: resultsPropType,
  categories: categoriesPropTypes,
  page: pageProptype,
  gitConnection: gitConnectionPropType,
  saving: PropTypes.bool.isRequired,
  featureConfig: featureConfigPropType
};

export default LinkHub;