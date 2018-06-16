import React from "react";
import FilterBar from "./FilterBar";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import Input from "muicss/lib/react/input";
import {Provider} from "react-redux";
import GenericButton from "./GenericButton";
import Button from "muicss/lib/react/button";
import {gitConnectionMock} from "./TestHelpers";


describe("Filterbar test", () => {

  const sagaMiddleware = createSagaMiddleware();

  const mockStore = configureMockStore([sagaMiddleware]);

  const gitConnection = gitConnectionMock;

  it('dispatches open link action with right number', () => {
    const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);

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

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);


    expect(linkItemWrapper.find(GenericButton).length).toBe(5);

    linkItemWrapper.find(Button).filter("#edit-config").prop("onClick")({});
    expect(store.getActions()).toEqual([{type: 'SHOW_CONFIG'}]);
  });

  it('dispatches toggle page mode on button click and shows right label', () => {
    const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);


    expect(linkItemWrapper.find(GenericButton).length).toBe(5);

    expect(linkItemWrapper.find(Button).filter("#toggle-page-mode").text()).toEqual("FULL MODE");
    linkItemWrapper.find(Button).filter("#toggle-page-mode").prop("onClick")({});
    expect(store.getActions()).toEqual([{type: 'TOGGLE_PAGE_MODE'}]);
  });

  it('shows compact mode label', () => {
    const someResults = [];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}} pageMode='SHOW_FULL'/>
    </Provider>);

    expect(linkItemWrapper.find(Button).filter("#toggle-page-mode").text()).toEqual("COMPACT MODE");
  });

  it('dispatches show links action on home button click', () => {
    const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);


    expect(linkItemWrapper.find(GenericButton).length).toBe(5);

    linkItemWrapper.find(Button).filter("#home").prop("onClick")({});
    expect(store.getActions()).toEqual([{"type": "FETCH_CONFIG"}, {"linksJson": undefined, "type": "SHOW_LINKS"}]);
  });

  it('dispatches add link action on button click', () => {
    const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);

    expect(linkItemWrapper.find(GenericButton).length).toBe(5);
    linkItemWrapper.find(Button).filter("#add-link").prop("onClick")({});
    expect(store.getActions()).toEqual([{type: 'SHOW_ADD_LINK'}]);
  });

  it('doesnt dispatch open link with invalid keys', () => {
    const someResults = [{categoryName: "acb", links: [{name: 'a', url: 'b'}]}];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);


    let someOtherKeyCode = 14;
    let eventMock = {keyCode: someOtherKeyCode, preventDefault: jest.fn()};

    linkItemWrapper.find(Input).prop('onKeyDown')(eventMock);
    expect(eventMock.preventDefault.mock.calls.length).toBe(0);
    expect(store.getActions().length).toBe(0);
  });

  it('dispatches filter action when text input changed', () => {
    const someResults = [];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);

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

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);

    linkItemWrapper.find(Input).prop('onChange')({target: {value: "some-text"}});

    linkItemWrapper.find(Input).prop('onChange')({target: {value: ""}});

    expect(store.getActions()).toEqual([
      {"allResults": someResults, "filterTerm": "some-text", "type": "FILTERED"},
      {"type": "UNFILTERED"}]);
  });

  it('clear input on escape', () => {
    const someResults = [];

    const store = mockStore({});

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnection} featureConfig={{editEnabled: true}}/>
    </Provider>);

    let enterKeyCode = 27;
    let eventMock = {keyCode: enterKeyCode, preventDefault: jest.fn(), target: {value: "some-text"}};

    linkItemWrapper.find(Input).prop('onChange')({target: {value: "some-text"}});

    let filterInput = linkItemWrapper.find(Input);
    filterInput.prop('onKeyDown')(eventMock);


    expect(eventMock.preventDefault.mock.calls.length).toBe(1);
    expect(store.getActions()).toEqual([
      {"allResults": someResults, "filterTerm": "some-text", "type": "FILTERED"},
      {"type": "UNFILTERED"}]);
  });


  it('displays green button if connection ok and up to date', () => {
    const someResults = [];

    const store = mockStore({});

    const gitConnectionOk = {
      connected: true,
      remoteUrl: "some-url",
      upToDate: true
    };

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnectionOk} featureConfig={{editEnabled: true}}/>
    </Provider>);

    let gitStatusButton = linkItemWrapper.find("#git-status").filter(Button);

    expect(gitStatusButton.prop('className')).toContain("git-ok");
  });

  it('disabled buttons if edit is disabled', () => {
    const someResults = [];

    const store = mockStore({});

    const gitConnectionOk = {
      connected: true,
      remoteUrl: "some-url",
      upToDate: true
    };

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnectionOk} featureConfig={{editEnabled: false}}/>
    </Provider>);

    let addLinkButton = linkItemWrapper.find("#add-link").filter(Button);
    let editConfigButton = linkItemWrapper.find("#edit-config").filter(Button);

    expect(addLinkButton.prop('disabled')).toEqual(true);
    expect(editConfigButton.prop('disabled')).toEqual(true);
  });

  it('displays warning button if connection ok but not up to date', () => {
    const someResults = [];

    const store = mockStore({});

    const gitConnectionNotUpToDate = {
      connected: true,
      remoteUrl: "some-url",
      upToDate: false
    };

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnectionNotUpToDate} featureConfig={{editEnabled: true}}/>
    </Provider>);

    let gitStatusButton = linkItemWrapper.find("#git-status").filter(Button);

    expect(gitStatusButton.prop('className')).toContain("git-not-up-to-date");
  });

  it('displays error button if not connected to remote git', () => {
    const someResults = [];

    const store = mockStore({});

    const gitConnectionError = {
      connected: false,
      remoteUrl: "",
      upToDate: false
    };

    const linkItemWrapper = mount(<Provider store={store}>
      <FilterBar allResults={someResults} gitConnection={gitConnectionError} featureConfig={{editEnabled: true}}/>
    </Provider>);

    let gitStatusButton = linkItemWrapper.find("#git-status").filter(Button);

    expect(gitStatusButton.prop('className')).toContain("git-disconnected");
  });
});