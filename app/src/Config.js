import React from "react";
import {connect} from "react-redux";
import "./Config.css";
import ConfigEditor from "./ConfigEditor";

let Config = ({dispatch, allResults, gitConnection}) => {
  return (
    <div className="config">
      <ConfigEditor allResults={allResults} gitConnection={gitConnection} />
    </div>
  );
};

Config = connect()(Config);

export default Config