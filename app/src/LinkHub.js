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
import {authPropTypes} from "./AuthPropTypes";
import {AUTH_STATE_IS_LOGGED_IN} from "./AuthClient";

function Pages({allResults, filteredResults, page, categories, gitConnection, saving}) {
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


function authenticated(auth) {
    return auth.authenticationState === AUTH_STATE_IS_LOGGED_IN;
}


const LinkHub = ({allResults, filteredResults, page, alerting, categories, gitConnection, saving, featureConfig, auth}) => (
    <div className="filter-hub">
        {authenticated(auth) && <div>
            <FilterBar allResults={allResults} gitConnection={gitConnection} featureConfig={featureConfig}
                       pageMode={page.pageMode} userDetails={auth.userDetails}/>
            <Alert message={alerting.message} show={alerting.show} alertType={alerting.alertType}/>
            <Pages page={page} filteredResults={filteredResults} allResults={allResults} categories={categories}
                   gitConnection={gitConnection} saving={saving}/>
        </div>}
    </div>);

LinkHub.propTypes = {
    allResults: resultsPropType,
    alertType: alertTypePropTypes,
    filteredResults: resultsPropType,
    categories: categoriesPropTypes,
    page: pageProptype,
    gitConnection: gitConnectionPropType,
    saving: PropTypes.bool.isRequired,
    featureConfig: featureConfigPropType,
    auth: authPropTypes
};

export default LinkHub;