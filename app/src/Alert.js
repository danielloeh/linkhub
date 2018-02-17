import React from "react";
import "./DoFilter.css";
import {connect} from "react-redux";
import Panel from 'muicss/lib/react/panel';
import "./Alert.css";

let Alert = ({dispatch, show = false, message = '', alertType = 'info'}) => {

  let showAlert = (show, message, alertType) => {
    if (show) {

      const alertClass = "alert-" + alertType;
      let label;

      if(alertType === 'info'){
        label='Info'
      }else if(alertType ==='error'){
        label = 'Error';
      }else {
        label = '';
      }

      return <Panel className={alertClass}>
        {label}: {message}
      </Panel>
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