import React from "react";
import {connect} from "react-redux";
import Button from "muicss/lib/react/button";
import PropTypes from "prop-types";
import "./GenericButton.css";

let GenericButton = ({dispatch, label, color = "primary", variant = "fav", size = "", actions, id}) => {

  let onClick = () => {
    actions.forEach(action =>
      dispatch(action()));
  };

  return (
    <div className='generic-button'>
      <Button id={id} size={size} color={color} className="mui--bg-primary-dark" variant={variant} onClick={onClick}>{label}</Button>
    </div>
  );
};

GenericButton.propTypes = {
  label: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.func.isRequired
  ).isRequired
};

GenericButton = connect()(GenericButton);

export default GenericButton