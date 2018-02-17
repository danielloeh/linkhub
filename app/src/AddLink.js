import React from "react";
import "./DoFilter.css";
import {connect} from "react-redux";
import "./Alert";
import {fetchConfig, saveLink, showErrorAlert, showLinks} from "./actions";
import {Button, Dropdown, DropdownItem} from "muicss/react";
import GenericButton from "./GenericButton";

let AddLink = ({dispatch, categories}) => {
  let input;

  let onSubmit = () => {
    if (input) {
      dispatch(saveLink('category', 'url', 'name'));
    } else {
      dispatch(showErrorAlert("Add link failed"));
    }
  };

  let DropDownItems = ({categories}) => {
    return (categories.map((category, index) => (
      <DropdownItem>category</DropdownItem>
    )))
  };

  return (
    <div className="add-link">
      <GenericButton actions={[fetchConfig, showLinks]} label="Show Links"/>
      <Button color="primary" onClick={onSubmit}>Save Config</Button>
      <Dropdown color="primary" label="Dropdown">
        <DropDownItems categories={categories}/>
      </Dropdown>
    </div>
  );
};


AddLink = connect()(AddLink);

export default AddLink;