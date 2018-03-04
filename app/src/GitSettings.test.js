import React from "react";
import {mount} from "enzyme";
import GitSettings from "./GitSettings";
import configureMockStore from "redux-mock-store";

describe("GitSettings test", () => {

  const mockStore = configureMockStore([]);

  const store = mockStore({});

  it('displays all settings (no connection)', () => {

    const gitConnection = {
      connected: false,
      remoteUrl: "some-url",
      upToDate: false
    };

    const addLinkWrapper = mount(<GitSettings store={store} gitConnection={gitConnection}/>);

    expect(addLinkWrapper.find("#remote-url-link").text()).toBe("some-url");
    let status = addLinkWrapper.find(".git-status");
    expect(status.length).toBe(3);
    expect(addLinkWrapper.find(".status-red").length).toBe(2);
    expect(status.at(1).text()).toBe("Git Remote Connection Status:false");
    expect(status.at(2).text()).toBe("Local Repository in sync:false");
  });

  it('displays all settings (with connection)', () => {

    const gitConnection = {
      connected: true,
      remoteUrl: "some-url",
      upToDate: true
    };

    const addLinkWrapper = mount(<GitSettings store={store} gitConnection={gitConnection}/>);

    expect(addLinkWrapper.find("#remote-url-link").text()).toBe("some-url");
    let status = addLinkWrapper.find(".git-status");
    expect(status.length).toBe(3);
    expect(addLinkWrapper.find(".status-green").length).toBe(2);
    expect(status.at(1).text()).toBe("Git Remote Connection Status:true");
    expect(status.at(2).text()).toBe("Local Repository in sync:true");
  });
});