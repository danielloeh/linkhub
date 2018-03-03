import React from "react";
import GenericButton from "./GenericButton";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import Button from "muicss/lib/react/button";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureMockStore([sagaMiddleware]);

it('should display label', () => {
  const store = mockStore({});
  const expectedLabel = "my-button";

  const GenericButtonWrapper = mount(<GenericButton store={store} actions={[]} label={expectedLabel}/>);
  expect(GenericButtonWrapper.find(Button).text()).toEqual(expectedLabel);
});

it('should call single action onclick', () => {
  const store = mockStore({});

  const action = () => {
    return {
      type: "SOME_ACTION"
    }
  };

  const GenericButtonWrapper = mount(<GenericButton store={store} actions={[action]} label="my-button"/>);

  GenericButtonWrapper.find(Button).prop("onClick")();

  expect(store.getActions()).toEqual([{
    type: "SOME_ACTION"
  }]);
});

it('should call multiple action onclick', () => {
  const store = mockStore({});

  const action = () => {
    return {
      type: "SOME_ACTION"
    }
  };

  const someOtherAction = () => {
    return {
      type: "SOME_OTHER_ACTION"
    }
  };

  const GenericButtonWrapper = mount(<GenericButton store={store} actions={[action, someOtherAction]}
                                                    label="my-button"/>);

  GenericButtonWrapper.find(Button).prop("onClick")();

  expect(store.getActions()).toEqual([{
    type: "SOME_ACTION"
  }, {
    type: "SOME_OTHER_ACTION"
  }]);
});