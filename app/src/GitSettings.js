import React from "react";
import "./FilterBar.css";
import {connect} from "react-redux";
import "./Alert";
import "./GitSettings.css";
import PropTypes from "prop-types";
import {Button, Panel} from "muicss/react";

let GitSettings = ({dispatch, gitConnection}) => {

  let connectedColor = gitConnection.connected ? "status-green" : "status-red";
  let connectedNotes = gitConnection.connected ?
    "The backend can access the remote repository." :
    "The backend can't access the remote repository. Have you provided the credentials?";
  let uptoDateNotes = gitConnection.upToDate ?
    "The local data is in sync with the remote version. New versions can be synced." :
    "The local data is not in sync with the remote version. Please deploy the latest version to make persistent saves.";

  let upToDateColor = gitConnection.upToDate ? "status-green" : "status-red";

  return (
    <div className="git-settings">
      <Panel>
        <div>Remote Git URL: <Button size="small" disabled="true">{gitConnection.remoteUrl}</Button></div>
        <div className="mui--text-menu git-notes">The data will get synced to this repository.</div>
      </Panel>
      <Panel>
        <div>Git Remote Connection Status: <Button className={connectedColor} size="small" variant="fab"
                                                   disabled="true">&nbsp;</Button></div>
        <div className="mui--text-menu git-notes">{connectedNotes}</div>
      </Panel>
      <Panel>
        <div>Local Repository in sync: <Button className={upToDateColor} size="small" variant="fab"
                                               disabled="true">&nbsp;</Button></div>
        <div className="mui--text-menu git-notes">{uptoDateNotes}</div>
      </Panel>
    </div>
  );
};

GitSettings.propTypes = {
  gitConnection: PropTypes.shape({
    connected: PropTypes.bool.isRequired,
    upToDate: PropTypes.bool.isRequired,
    remoteUrl: PropTypes.string.isRequired,
  }).isRequired
};

GitSettings = connect()(GitSettings);

export default GitSettings;