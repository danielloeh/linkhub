import React from "react";
import "./FilterBar.css";
import {connect} from "react-redux";
import "./Alert";
import {addLink, showErrorAlert} from "./actions";
import {Button, Form, Input, Option, Select} from "muicss/react";
import "./AddLink.css";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import {categoriesPropTypes} from "./LinkPropTypes";

let AddLink = ({dispatch, categories, saving = false}) => {
  let name, url, description, category = categories[0];

  const linkSchema = Joi.object().keys({
    url: Joi.string().uri().min(1).max(300).required(),
    name: Joi.string().min(1).max(150).required(),
    description: Joi.string().max(300)
  });

  let onAddLinkClick = (ev) => {
    ev.preventDefault();
    const result = Joi.validate({url: url, name: name, description: description}, linkSchema);

    if (result.error === null) {
      dispatch(addLink(category, url, name, description));
    } else {
      dispatch(showErrorAlert("Validation failed: " + result.error.details[0].message));
    }
  };

  let SelectItems = ({categories}) => {
    return (categories.map((category, index) => (
      <Option name={category} label={category} defaultChecked={index === 0} key={index}/>
    )));
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

  let onChangeDescription = (ev) => {
    if (ev.target.value.trim()) {
      description = ev.target.value.trim();
    }
  };

  let onChangeDropDown = (ev) => {
    if (ev.target.value.trim()) {
      category = ev.target.value;
    }
  };

  return (
    <div>
      <div className="add-link">
        <Form>
          <Select defaultValue={categories[0]} onChange={onChangeDropDown.bind(this)}>
            <SelectItems categories={categories}/>
          </Select>
          <Input id="name-input" placeholder="Name" className="add-link-input" type="text"
            onChange={onChangeName.bind(this)}/>
          <Input id="url-input" placeholder="URL" className="add-link-input" type="text"
            onChange={onChangeURL.bind(this)}/>
          <Input id="description-input" placeholder="Description" className="add-link-input" type="text"
            onChange={onChangeDescription.bind(this)}/>
          <div className="save-config">
            <Button id="add-link-submit" disabled={saving} color="primary" onClick={onAddLinkClick.bind(this)}>Add
              Link</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

AddLink.propTypes = {
  categories: categoriesPropTypes,
  saving: PropTypes.bool.isRequired
};

AddLink = connect()(AddLink);

export default AddLink;