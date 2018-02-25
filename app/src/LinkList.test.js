import React from "react";
import LinkList from "./LinkList";
import LinkItem from "./LinkItem";
import GenericButton from "./GenericButton";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureMockStore([]);

it('renders the link items and the buttons', () => {
  const store = mockStore({});
  const someResults = [{
    categoryName: "some-category",
    links: [{
      url: "some-url",
      name: "some-name"
    }]
  }, {
    categoryName: "some-other-category",
    links: [{
      url: "some-other-url",
      name: "some-other-name"
    }, {
      url: "some-other-url2",
      name: "some-other-name2"
    }]
  }];

  const linkItem = mount(
    <Provider store={store}>
      <LinkList filteredResults={someResults}/>
    </Provider>);

  expect(linkItem.find(GenericButton).length).toBe(2);
  expect(linkItem.find(".link-list-category").length).toBe(2);
  expect(linkItem.find("h4").length).toBe(2);
  expect(linkItem.find("h4").at(0).text()).toEqual("some-category");
  expect(linkItem.find("h4").at(1).text()).toEqual("some-other-category");
  expect(linkItem.find(LinkItem).length).toBe(3);
});
