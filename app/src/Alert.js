import React from "react";
import "./DoFilter.css";
import {connect} from "react-redux";
import Panel from "muicss/lib/react/panel";
import Button from "muicss/lib/react/button";
import "./Alert.css";
import {hideAlert} from "./actions";

export const ALERT_ERROR_TYPE = 'error';
export const ALERT_INFO_TYPE = 'info';

let Alert = ({dispatch, show = false, message = '', alertType = ALERT_INFO_TYPE}) => {

  let onHideClick = () => {
    dispatch(hideAlert());
  };

  let showAlert = (show, message, alertType) => {

    if (show) {
      const alertClass = "alert-" + alertType;
      let label;

      if (alertType === ALERT_INFO_TYPE) {
        label = 'Info'
      } else if (alertType === ALERT_ERROR_TYPE) {
        label = 'Error';
      } else {
        label = '';
      }

      return <div className="alert-panel"><Panel className={alertClass}>
        <div className="alert-message"><span className="mui--text-body1">{label}: {message}</span></div>
        <Button variant="flat" color="danger" className="hide-button" onClick={onHideClick}>Ok</Button>
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

Alert = connect()(Alert);

export default Alert