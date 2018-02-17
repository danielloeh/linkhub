import React from "react";
import "./DoFilter.css";
import {connect} from "react-redux";
import "./Alert";
import {addLink, fetchConfig, showErrorAlert, showLinks} from "./actions";
import {Button, Form, Input, Option, Select} from "muicss/react";
import GenericButton from "./GenericButton";
import "./AddLink.css";

let AddLink = ({dispatch, categories}) => {
  let name, url, category;

  let onSubmit = () => {
    if (url && name) {
      dispatch(addLink(category, url, name));
    } else {
      dispatch(showErrorAlert("Add link failed"));
    }
  };

  let SelectItems = ({categories}) => {
    return (categories.map((category, index) => (
      <Option name={category} label={category} defaultChecked={index === 0} key={index}/>
    )))
  };


  let onChangeName = (ev) => {
    if (ev.target.value.trim()) {
      name = ev.target.value.trim();
    }
  };

  let onChangeURL = (ev) => {
    if (ev.target.value.trim()) {
      url = ev.target.value.trim();
    }
  };

  let onChangeDropDown = (ev) => {
    console.log(ev.target.value)
    if (ev.target.value.trim()) {
      category = ev.target.value;
    }
  };

  return (
    <div>
      <GenericButton actions={[fetchConfig, showLinks]} label="Show Links"/>
      <div className="add-link">
        <Form>
          <Select defaultValue={categories[0]} onChange={onChangeDropDown.bind(this)}>
            <SelectItems categories={categories}/>
          </Select>
          <Input placeholder="Name" className="add-link-input" type="text" onChange={onChangeName.bind(this)}/>
          <Input placeholder="URL" className="add-link-input" type="text" onChange={onChangeURL.bind(this)}/>
          <Button color="primary" onClick={onSubmit}>Add Link</Button>
        </Form>
      </div>
    </div>
  );
};


AddLink = connect()(AddLink);

export default AddLink;