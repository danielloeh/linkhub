import React from "react";
import AddLink from "./AddLink";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import Input from "muicss/lib/react/input";
import Option from "muicss/lib/react/option";
import Button from "muicss/lib/react/button";
import {Provider} from "react-redux";

describe("AddLink test", () => {

  const sagaMiddleware = createSagaMiddleware();

  const mockStore = configureMockStore([sagaMiddleware]);

  const gitConnection = {
    connected: false,
    remoteUrl: "some-url",
    upToDate: false
  };

  it('displays items', () => {
    const store = mockStore({});

    const categories = ["some-category", "some-other-category"];

    const addLinkWrapper = mount(<Provider store={store}>
    <AddLink categories={categories} gitConnection={gitConnection} saving={false}/>
    </Provider>);

    expect(addLinkWrapper.find(Input).length).toBe(2);

    expect(addLinkWrapper.find(Option).length).toBe(2);
    expect(addLinkWrapper.find(Option).at(0).text()).toBe("some-category");
    expect(addLinkWrapper.find(Option).at(1).text()).toBe("some-other-category");
  });

  it('dispatches validation failed action if no data provided', () => {
    const store = mockStore({});

    const categories = ["some-category", "some-other-category"];

    const addLinkWrapper = mount(<Provider store={store}>
      <AddLink categories={categories} gitConnection={gitConnection} saving={false} />
    </Provider>);

    const eventMock = {
      preventDefault: jest.fn()
    };

    addLinkWrapper.find(Button).filter("#add-link-submit").prop("onClick")(eventMock);

    expect(eventMock.preventDefault.mock.calls.length).toBe(1);
    expect(store.getActions()).toEqual([{
      type: "SHOW_ALERT",
      alertType: "error",
      message: "Validation failed: \"url\" is required"
    }]);
  });

  it('dispatches add link action if data is provided', () => {
    const store = mockStore({});

    const categories = ["some-category", "some-other-category"];

    const addLinkWrapper = mount(<Provider store={store}>
      <AddLink categories={categories} gitConnection={gitConnection} saving={false} />
    </Provider>);

    const eventMock = {
      preventDefault: jest.fn()
    };

    addLinkWrapper.find(Input).filter("#url-input").prop('onChange')(({target: {value: 'http://some-url.de'}}));
    addLinkWrapper.find(Input).filter("#name-input").prop('onChange')(({target: {value: 'some name'}}));
    addLinkWrapper.find(Button).filter("#add-link-submit").prop("onClick")(eventMock);

    expect(eventMock.preventDefault.mock.calls.length).toBe(1);

    expect(store.getActions()).toEqual([
      {"category": "some-category", "name": "some name", "type": "ADD_LINK", "url": "http://some-url.de"}
    ]);
  });

  it('validates the url on format', () => {
    const store = mockStore({});

    const categories = ["some-category", "some-other-category"];

    const addLinkWrapper = mount(<Provider store={store}>
      <AddLink categories={categories} gitConnection={gitConnection} saving={false} />
    </Provider>);

    const eventMock = {
      preventDefault: jest.fn()
    };

    const invalidUri = '//some-invalid-uri';

    addLinkWrapper.find(Input).filter("#url-input").prop('onChange')(({target: {value: invalidUri}}));
    addLinkWrapper.find(Input).filter("#name-input").prop('onChange')(({target: {value: 'some name'}}));
    addLinkWrapper.find(Button).filter("#add-link-submit").prop("onClick")(eventMock);

    expect(eventMock.preventDefault.mock.calls.length).toBe(1);

    expect(store.getActions()).toEqual([
      {"alertType": "error", "message": "Validation failed: \"url\" must be a valid uri", "type": "SHOW_ALERT"}
    ]);
  });

  it('disabled the button when saving', () => {
    const store = mockStore({});

    const categories = ["some-category", "some-other-category"];

    const addLinkWrapper = mount(<Provider store={store}>
      <AddLink categories={categories} gitConnection={gitConnection} saving={true} />
    </Provider>);

    const eventMock = {
      preventDefault: jest.fn()
    };

    const buttonIsDisabled = addLinkWrapper.find(Button).filter("#add-link-submit").prop("disabled");

    expect(buttonIsDisabled).toBe(true);

  });
});