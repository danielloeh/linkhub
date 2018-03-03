import React from "react";
import {render} from "enzyme";
import Input from "muicss/lib/react/input";

describe("GitSettings test", () => {

  const gitConnection = {
    connected: false,
    url: "some-url",
    upToDate: false
  };

  it('displays all settings', () => {

    const addLinkWrapper = render(<GitSettings gitConnection={gitConnection}/>);

    expect(addLinkWrapper.find(Input).length).toBe(2);

  });
});