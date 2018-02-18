import React from "react";
import "./DoFilter.css";
import {connect} from "react-redux";
import "./Alert";
import {addLink, fetchConfig, showErrorAlert, showLinks} from "./actions";
import {Button, Form, Input, Option, Select} from "muicss/react";
import GenericButton from "./GenericButton";
import "./AddLink.css";
import PropTypes from "prop-types";
import Joi from "joi";

let AddLink = ({dispatch, categories}) => {
  let name, url, category = categories[0];

  const linkSchema = Joi.object().keys({
    url: Joi.string().uri().min(1).max(150).required(),
    name: Joi.string().token().min(1).max(150).required()
  });

  let onAddLinkClick = (ev) => {
    ev.preventDefault();
    const result = Joi.validate({url: url, name: name}, linkSchema);

    if (result.error === null) {
      dispatch(addLink(category, url, name));
    } else {
      dispatch(showErrorAlert("Validation failed: " + result.error.details[0].message));
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
          <Button color="primary" onClick={onAddLinkClick.bind(this)}>Add Link</Button>
        </Form>
      </div>
    </div>
  );
};

AddLink.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired
};

AddLink = connect()(AddLink);

export default AddLink;