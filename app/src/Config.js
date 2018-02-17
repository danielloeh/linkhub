import React from "react";
import {connect} from "react-redux";
import "./Config.css";
import ConfigEditor from "./ConfigEditor";
import GenericButton from "./GenericButton";
import {fetchConfig, showLinks} from "./actions";

let Config = ({dispatch, allResults}) => {
  return (
    <div className="config">
      <GenericButton actions={[fetchConfig, showLinks]} label="Show Links"/>
      <ConfigEditor allResults={allResults}/>
    </div>
  );
};

Config = connect()(Config);

export default Config