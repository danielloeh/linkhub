import React from "react";
import {connect} from "react-redux";
import {saveConfig, showAlert, showErrorAlert} from "./actions";
import Button from "muicss/lib/react/button";
import TextArea from "muicss/lib/react/textarea";
import "./ConfigEditor.css";

let ConfigEditor = ({dispatch, allResults}) => {
  let input;

  const prettyPrint = (json) => {
    return JSON.stringify(json, undefined, 4);
  };

  function validateJson (jsonToValidate) {
    try {
      JSON.parse(jsonToValidate);
    } catch (e) {
      return e.message;
    }
    return '';
  }

  let onSubmit = () => {
    if (input && input.value.trim().length > 0) {
      const result = validateJson(input.value);
      if (result === '') {
        dispatch(saveConfig(input.value));
      } else {
        dispatch(showErrorAlert(result));
      }
    } else {
      dispatch(showErrorAlert("Nothing to save"));
    }
  };

  let onChange = (ev) => {
    input = ev.target;
  };

  return (
    <div className="config-editor">
      <Button color="primary" onClick={onSubmit}>Save Config</Button>
      <TextArea rows={prettyPrint(allResults).split(/\r\n|\r|\n/).length} defaultValue={prettyPrint(allResults)}
                placeholder="Place your config" width='80%' onChange={onChange.bind(this)}/>

    </div>
  );
};

ConfigEditor = connect()(ConfigEditor);

export default ConfigEditor