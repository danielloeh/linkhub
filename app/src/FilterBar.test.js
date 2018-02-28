import React from "react";
import FilterBar from "./FilterBar";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import Input from "muicss/lib/react/input";
import {Provider} from "react-redux";
import GenericButton from "./GenericButton";
import Button from "muicss/lib/react/button";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureMockStore([sagaMiddleware]);

it('dispatches open link action with right number', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<Provider store={store}><FilterBar allResults={someResults}/></Provider>);

  let enterKeyCode = 13;
  let eventMock = {keyCode: enterKeyCode, preventDefault: jest.fn()};

  let filterInput = linkItemWrapper.find(Input);
  filterInput.prop('onKeyDown')(eventMock);
  expect(eventMock.preventDefault.mock.calls.length).toBe(1);
  expect(store.getActions()).toEqual([{type: 'OPEN_LINK', number: 1}]);
});

it('dispatches show config action on button click', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<Provider store={store}><FilterBar allResults={someResults}/></Provider>);

  expect(linkItemWrapper.find(GenericButton).length).toBe(3);

  linkItemWrapper.find(Button).filter("#edit-config").prop("onClick")({});
  expect(store.getActions()).toEqual([{type: 'SHOW_CONFIG'}]);
});

it('dispatches show links action on home button click', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<Provider store={store}><FilterBar allResults={someResults}/></Provider>);

  expect(linkItemWrapper.find(GenericButton).length).toBe(3);

  linkItemWrapper.find(Button).filter("#home").prop("onClick")({});
  expect(store.getActions()).toEqual([{"type": "FETCH_CONFIG"}, {"linksJson": undefined, "type": "SHOW_LINKS"}]);
});

it('dispatches add link action on button click', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<Provider store={store}><FilterBar allResults={someResults}/></Provider>);

  expect(linkItemWrapper.find(GenericButton).length).toBe(3);

  linkItemWrapper.find(Button).filter("#add-link").prop("onClick")({});
  expect(store.getActions()).toEqual([{type: 'SHOW_ADD_LINK'}]);
});

it('doesnt dispatch open link with invalid keys', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<Provider store={store}><FilterBar allResults={someResults}/></Provider>);

  let someOtherKeyCode = 14;
  let eventMock = {keyCode: someOtherKeyCode, preventDefault: jest.fn()};

  linkItemWrapper.find(Input).prop('onKeyDown')(eventMock);
  expect(eventMock.preventDefault.mock.calls.length).toBe(0);
  expect(store.getActions().length).toBe(0);
});

it('dispatches filter action when text input changed', () => {
  const someResults = [];

  const store = mockStore({});

  const linkItemWrapper = mount(<Provider store={store}><FilterBar allResults={someResults}/></Provider>);

  linkItemWrapper.find(Input).prop('onChange')({target: {value: "some-text"}});
  expect(store.getActions()).toEqual([{
    "allResults": someResults,
    "filterTerm": "some-text",
    "type": "FILTERED"
  }])
});

it('dispatches display all actions when text input cleared', () => {
  const someResults = [];

  const store = mockStore({});

  const linkItemWrapper = mount(<Provider store={store}><FilterBar allResults={someResults}/></Provider>);

  linkItemWrapper.find(Input).prop('onChange')({target: {value: "some-text"}});

  linkItemWrapper.find(Input).prop('onChange')({target: {value: ""}});

  expect(store.getActions()).toEqual([
    {"allResults": someResults, "filterTerm": "some-text", "type": "FILTERED"},
    {"type": "UNFILTERED"}]);
});


