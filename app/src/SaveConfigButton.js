import React from "react";
import {connect} from "react-redux";
// import {saveConfig} from "./actions";

let SaveConfigButton = ({dispatch, allResults}) => {
  // let input;

  let onSubmit = e => {
    e.preventDefault();
    // dispatch(saveConfig(input.value));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea defaultValue={JSON.stringify(allResults)} placeholder="some text" width='100%' /*ref={{node => {
          input = node
        }}}*/ />


        <button type="submit">Save Config</button>
      </form>
    </div>
  );
};

SaveConfigButton = connect()(SaveConfigButton);

export default SaveConfigButton