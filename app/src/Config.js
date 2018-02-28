import React from "react";
import {connect} from "react-redux";
import "./Config.css";
import ConfigEditor from "./ConfigEditor";

let Config = ({dispatch, allResults}) => {
  return (
    <div className="config">
      <ConfigEditor allResults={allResults}/>
    </div>
  );
};

Config = connect()(Config);

export default Config