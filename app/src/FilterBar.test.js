import React from "react";
import FilterBar from "./FilterBar";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import Input from "muicss/lib/react/input";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureMockStore([sagaMiddleware]);

it('renders filter hint', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<FilterBar store={store} allResults={someResults}/>);

  expect(linkItemWrapper.find(".filter-hint").text()).toEqual("Hit RETURN or SHIFT+number to open first links");
});

it('dispatches open link action with right number', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<FilterBar store={store} allResults={someResults}/>);

  let enterKeyCode = 13;
  let eventMock = {keyCode: enterKeyCode, preventDefault: jest.fn()};

  let filterInput = linkItemWrapper.find(Input);
  filterInput.prop('onKeyDown')(eventMock);
  expect(eventMock.preventDefault.mock.calls.length).toBe(1);
  expect(store.getActions()).toEqual([{type: 'OPEN_LINK', number: 1}]);
});

it('doesnt dispatch open link with invalid keys', () => {
  const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

  const store = mockStore({});

  const linkItemWrapper = mount(<FilterBar store={store} allResults={someResults}/>);

  let someOtherKeyCode = 14;
  let eventMock = {keyCode: someOtherKeyCode, preventDefault: jest.fn()};

  expect(linkItemWrapper.find(".filter-hint").text()).toEqual("Hit RETURN or SHIFT+number to open first links");

  linkItemWrapper.find(Input).prop('onKeyDown')(eventMock);
  expect(eventMock.preventDefault.mock.calls.length).toBe(0);
  expect(store.getActions().length).toBe(0);
});

it('dispatches filter action when text input changed', () => {
  const someResults = [];

  const store = mockStore({});

  const linkItemWrapper = mount(<FilterBar store={store} allResults={someResults}/>);

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

  const linkItemWrapper = mount(<FilterBar store={store} allResults={someResults}/>);

  linkItemWrapper.find(Input).prop('onChange')({target: {value: "some-text"}});

  linkItemWrapper.find(Input).prop('onChange')({target: {value: ""}});

  expect(store.getActions()).toEqual([
    {"allResults": someResults, "filterTerm": "some-text", "type": "FILTERED"},
    {"type": "UNFILTERED"}]);
});


