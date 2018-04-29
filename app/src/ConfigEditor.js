import React from "react";
import {connect} from "react-redux";
import {saveConfig, showErrorAlert} from "./actions";
import Button from "muicss/lib/react/button";
import Checkbox from "muicss/lib/react/checkbox";
import TextArea from "muicss/lib/react/textarea";
import "./ConfigEditor";
import Joi from "joi-browser";
import PropTypes from "prop-types";
import {gitConnectionPropType, resultsPropType} from "./LinkPropTypes";

const configSchema = Joi.array().items(Joi.object().keys({
  categoryName: Joi.string().min(1).max(50).required(),
  links: Joi.array().items(Joi.object().keys({
    url: Joi.string().uri().required(),
    name: Joi.string().required()
  }))
}));

let ConfigEditor = ({dispatch, allResults, gitConnection, saving = false}) => {
  let input;

  const prettyPrint = (json) => {
    return JSON.stringify(json, undefined, 4);
  };

  function validateJson (jsonToValidate) {
    try {
      JSON.parse(jsonToValidate);
      const result = Joi.validate(jsonToValidate, configSchema);
      if (result.error !== null) {
        return "Validation failed: " + result.error.details[0].message;
      }
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

  const goodToPush = gitConnection.connected && gitConnection.upToDate;

  return (
    <div className="config-editor">
      <div className="save-config">
        <Checkbox className="git-checkbox" name="inputA1" label="Save to Git" defaultChecked={goodToPush} disabled={!goodToPush} />
        <Button disabled={saving} id="save-config-button" color="primary" onClick={onSubmit}>Save Config</Button>
      </div>
      <TextArea rows={prettyPrint(allResults).split(/\r\n|\r|\n/).length} defaultValue={prettyPrint(allResults)}
                placeholder="Place your config" width='80%' onChange={onChange.bind(this)}/>

    </div>
  );
};

ConfigEditor.propTypes = {
  allResults: resultsPropType,
  gitConnection: gitConnectionPropType,
  saving: PropTypes.bool
};

ConfigEditor = connect()(ConfigEditor);

export default ConfigEditor