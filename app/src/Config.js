import React from "react";
import {connect} from "react-redux";
import "./Config.css";
import ConfigEditor from "./ConfigEditor";

let Config = ({dispatch, allResults, saving}) => {
  return (
    <div className="config">
      <ConfigEditor allResults={allResults} saving={saving}/>
    </div>
  );
};

Config = connect()(Config);

export default Config;