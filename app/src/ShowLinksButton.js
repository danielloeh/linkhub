import React from "react";
import {fetchConfig, showLinks} from "./actions";
import {connect} from "react-redux";

let ShowLinksButton = ({dispatch}) => {
  let onSubmit = e => {
    e.preventDefault();
    dispatch(fetchConfig());
    dispatch(showLinks());
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button type="submit">Show Links</button>
      </form>
    </div>
  );
};

ShowLinksButton = connect()(ShowLinksButton);

export default ShowLinksButton