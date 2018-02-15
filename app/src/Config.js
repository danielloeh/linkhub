import React from "react";
import {connect} from "react-redux";
import "./Config.css";
import ShowLinksButton from "./ShowLinksButton";
import SaveConfigButton from "./SaveConfigButton";

let Config = ({dispatch, allResults}) => {
  return (
    <div className="config">
      <ShowLinksButton />
      <SaveConfigButton allResults={allResults} />
    </div>
  );
};

Config = connect()(Config);

export default Config