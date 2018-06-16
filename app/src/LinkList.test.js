import React from "react";
import LinkList from "./LinkList";
import LinkItem from "./LinkItem";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureMockStore([]);

it('renders the link items', () => {
  const store = mockStore({});
  const someResults = [{
    categoryName: "some-category",
    links: [{
      url: "some-url",
      name: "some-name",
      description: "some-description"
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
      <LinkList filteredResults={someResults} pageMode={'SHOW_FULL'}/>
    </Provider>);

  expect(linkItem.find(".link-list-category").length).toBe(2);
  expect(linkItem.find("h4").length).toBe(2);
  expect(linkItem.find("h4").at(0).text()).toEqual("some-category");
  expect(linkItem.find("h4").at(1).text()).toEqual("some-other-category");
  expect(linkItem.find(LinkItem).length).toBe(3);
});
