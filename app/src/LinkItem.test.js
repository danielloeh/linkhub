import React from "react";
import LinkItem from "./LinkItem";
import {shallow} from "enzyme";

it('displays the url', () => {
  const div = document.createElement('div');

  const someLink = {
    url: "myUrl",
    name: "myName"
  };

  const linkItem = shallow(<LinkItem highlighted={false} link={someLink}/>, div);

  expect(linkItem.find('.link-url').text()).toEqual('(myUrl)');
});

it('displays the description', () => {
  const div = document.createElement('div');

  const someLink = {
    url: "myUrl",
    name: "myName",
    description: "some-description"
  };

  const linkItem = shallow(<LinkItem highlighted={false} link={someLink}/>, div);

  expect(linkItem.find('.link-description').text()).toEqual('some-description');
});

it('has quick access if property is set', () => {
  const div = document.createElement('div');

  const someLink = {
    url: "myUrl",
    name: "myName"
  };

  const linkItemWrapper = shallow(<LinkItem quickAccess={{key: "3"}} link={someLink}/>, div);

  let quickAccess = linkItemWrapper.find('.quick-access');
  expect(quickAccess.length).toBe(1);
  expect(quickAccess.text()).toBe("[key » shift+3]");
});

it('does not have quick access if property is not set', () => {
  const div = document.createElement('div');

  const someLink = {
    url: "myUrl",
    name: "myName"
  };

  const linkItemWrapper = shallow(<LinkItem link={someLink}/>, div);

  expect(linkItemWrapper.find('.quick-access').length).toBe(0);
});
