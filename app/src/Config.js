import React from "react";
import {connect} from "react-redux";
import "./Config.css";
import ShowLinksButton from "./ShowLinksButton";

let Config = ({dispatch, allResults}) => {
  return (
    <div className="config">
      <ShowLinksButton />
      <textarea placeholder="some text" width='100%' >{JSON.stringify(allResults)}</textarea>
    </div>
  );
};

Config = connect()(Config);

export default Config