import React from "react";
import {
  applyFilter,
  displayAll,
  fetchConfig,
  openLink,
  showAddLink,
  showConfig,
  showGitSettings,
  showLinks,
  togglePageMode
} from "./actions";
import "./FilterBar.css";
import {connect} from "react-redux";
import Appbar from "muicss/lib/react/appbar";
import Input from "muicss/lib/react/input";
import GenericButton from "./GenericButton";
import {gitConnectionPropType, resultsPropType} from "./LinkPropTypes";
import {featureConfigPropType} from "./FeatureConfigPropTypes";
import PropTypes from "prop-types";
import ToggleButton from "react-toggle-button";

let FilterBar = ({dispatch, allResults, gitConnection, featureConfig, pageMode}) => {

  function onToggleDisplayMode () {
    dispatch(togglePageMode());
  }

  let onChange = (ev) => {
    if (ev.target.value.trim()) {
      dispatch(applyFilter(ev.target.value, allResults));
    } else {
      dispatch(displayAll());
    }
  };

  let onKeyUpFilter = (ev) => {
    if (ev.keyCode === 13) { //enter
      ev.preventDefault();
      dispatch(openLink(1));
    }

    if (ev.keyCode === 27) { //escape
      ev.preventDefault();
      ev.target.value = "";
      dispatch(displayAll());
    }

    else if (ev.shiftKey && (ev.keyCode >= 49 && ev.keyCode <= 52)) { // 1 - 4
      ev.preventDefault();
      dispatch(openLink(ev.keyCode - 48));
    } else {

    }
  };

  let gitButtonColor;
  if (gitConnection.connected && gitConnection.upToDate) {
    gitButtonColor = "git-ok";
  } else if (gitConnection.connected && !gitConnection.upToDate) {
    gitButtonColor = "git-not-up-to-date";
  } else {
    gitButtonColor = "git-disconnected";
  }

  return (
    <Appbar className="app-bar mui--bg-primary">
      <GenericButton id="home" size="small" actions={[fetchConfig, showLinks]} label="Home"/>
      <Input autoFocus placeholder="Search categories, names and URLs" className="filter-input" type="text"
             onChange={onChange.bind(this)}
             onKeyDown={onKeyUpFilter.bind(this)}/>
      <div className="filter-hint mui--text-caption" style={{display: "flex", flexDirection: "row", flexGrow: 1}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <span>Enter - Follow first link</span>
          <span>Shift + [1-5] - Follow 1-5th link</span>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <span>Esc - Delete Filter</span>
          <span>&nbsp;</span>
        </div>
      </div>

      <GenericButton id="git-status" size="small" actions={[showGitSettings]} additionalClasses={gitButtonColor}
                     label="GIT"/>
      <div className="mui-panel toggle-page-mode-box">
        <span>FULL&nbsp;&nbsp;</span>

        <ToggleButton className="toggle-page-mode"
                      value={pageMode === 'SHOW_FULL'}
                      onToggle={onToggleDisplayMode}
                      thumbStyle={{borderRadius: 2}}
                      trackStyle={{borderRadius: 2}}
        />
      </div>

      <GenericButton id="add-link" size="small" actions={[showAddLink]} label="Add Link"
                     enabled={featureConfig.editEnabled}/>
      <GenericButton id="edit-config" size="small" actions={[showConfig]} label="Edit Config"
                     enabled={featureConfig.editEnabled}/>
    </Appbar>
  );
};

FilterBar.propTypes = {
  allResults: resultsPropType,
  gitConnection: gitConnectionPropType,
  featureConfig: featureConfigPropType,
  pageMode: PropTypes.string
};

FilterBar = connect()(FilterBar);

export default FilterBar