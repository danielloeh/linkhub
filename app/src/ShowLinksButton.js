import React from "react";
import {showLinks} from "./actions";
import {connect} from "react-redux";

let ShowLinksButton = ({dispatch}) => {
  let onSubmit = e => {
    e.preventDefault()
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