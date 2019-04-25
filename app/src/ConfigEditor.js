import React from "react";
import {connect} from "react-redux";
import {saveConfig, showErrorAlert} from "./actions";
import Button from "muicss/lib/react/button";
import TextArea from "muicss/lib/react/textarea";
import "./ConfigEditor";
import Joi from "joi-browser";
import PropTypes from "prop-types";
import {resultsPropType} from "./LinkPropTypes";

const configSchema = Joi.array().items(Joi.object().keys({
  categoryName: Joi.string().min(1).max(50).required(),
  links: Joi.array().items(Joi.object().keys({
    url: Joi.string().uri().min(1).max(300).required(),
    name: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(300)
  }))
}));

let ConfigEditor = ({dispatch, allResults, saving = false}) => {
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

  return (
    <div className="config-editor">
      <div className="save-config">
        <Button disabled={saving} id="save-config-button" color="primary" onClick={onSubmit}>Save Config</Button>
      </div>
      <TextArea rows={prettyPrint(allResults).split(/\r\n|\r|\n/).length} defaultValue={prettyPrint(allResults)}
                placeholder="Place your config" width='80%' onChange={onChange.bind(this)}/>

    </div>
  );
};

ConfigEditor.propTypes = {
  allResults: resultsPropType,
  saving: PropTypes.bool
};

ConfigEditor = connect()(ConfigEditor);

export default ConfigEditor