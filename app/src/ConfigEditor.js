import React from "react";
import {connect} from "react-redux";
import {saveConfig} from "./actions";
import Button from "muicss/lib/react/button";
import TextArea from "muicss/lib/react/textarea";
import "./ConfigEditor.css";

let ConfigEditor = ({dispatch, allResults}) => {
  let input;

  const prettyPrint = (json) => {
    return JSON.stringify(json, undefined, 4);
  };

  let onSubmit = () => {
    dispatch(saveConfig(input.value));
  };

  return (
    <div className="config-editor">
        <TextArea rows={prettyPrint(allResults).split(/\r\n|\r|\n/).length} defaultValue={prettyPrint(allResults)}
                  placeholder="Place your config" width='80%' ref={node => {
          input = node
        }}/>
      <Button color="primary" onClick={onSubmit}>Save Config</Button>
    </div>
  );
};

ConfigEditor = connect()(ConfigEditor);

export default ConfigEditor