import React from "react";
import {showConfig} from "./actions";
import {connect} from "react-redux";

let ShowConfigButton = ({dispatch}) => {
  let onSubmit = e => {
    e.preventDefault()
    dispatch(showConfig());
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button type="submit">Export Config</button>
      </form>
    </div>
  );
};

ShowConfigButton = connect()(ShowConfigButton);

export default ShowConfigButton