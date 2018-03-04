import React from "react";
import "./FilterBar.css";
import {connect} from "react-redux";
import Panel from "muicss/lib/react/panel";
import PropTypes from "prop-types";
import Button from "muicss/lib/react/button";
import "./Alert.css";
import {hideAlert} from "./actions";

export const ALERT_ERROR_TYPE = 'error';
export const ALERT_INFO_TYPE = 'info';
export const ALERT_WARN_TYPE = 'warn';

let Alert = ({dispatch, show = false, message = '', alertType = ALERT_INFO_TYPE}) => {

  let onHideClick = () => {
    dispatch(hideAlert());
  };

  let showAlert = (show, message, alertType) => {

    if (show) {
      const alertClass = "alert-" + alertType;
      let label, buttonColor;

      if (alertType === ALERT_INFO_TYPE) {
        label = 'Info';
        buttonColor = 'primary'; // mui css specific
      } else if (alertType === ALERT_ERROR_TYPE) {
        label = 'Error';
        buttonColor = 'danger';
      } else if (alertType === ALERT_WARN_TYPE) {
        label = 'Warn';
        buttonColor = 'info';
      } else {
        label = 'Info';
        buttonColor = 'info';  // mui css specific
      }

      return <div className="alert-panel"><Panel className={alertClass}>
        <div className="alert-message"><span className="mui--text-button">{label}: {message}</span></div>
        <Button variant="flat" color={buttonColor} className="hide-button" onClick={onHideClick}>Ok</Button>
      </Panel>
      </div>
    } else {
      return null

    }
  };

  return (
    showAlert(show, message, alertType)
  );
};

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  alertType: PropTypes.oneOf([ALERT_INFO_TYPE, ALERT_WARN_TYPE, ALERT_ERROR_TYPE])

};

Alert = connect()(Alert);

export default Alert