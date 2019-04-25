import React from "react";
import {mount} from "enzyme";
import LinkHub from "./LinkHub";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import FilterBar from "./FilterBar";
import Alert from "./Alert";
import {SHOW_CONFIG} from "./actions";
import Config from "./Config";
import {alertingMock, featureConfigMock, authMock} from "./TestHelpers";
import {SHOW_FULL} from "./reducers/pageReducer";

describe("LinkHub test", () => {

  const mockStore = configureMockStore([]);

  const store = mockStore({});

  it('displays all settings (no connection)', () => {


    const addLinkWrapper = mount(
      <Provider store={store}>
        <LinkHub allResults={[]}
                 alerting={alertingMock}
                 filteredResults={[]} categories={[]}
                 page={{pageState: SHOW_CONFIG, pageMode: SHOW_FULL}}
                 saving={false}
                 featureConfig={featureConfigMock}
                 auth={authMock}
        />
      </Provider>);

    expect(addLinkWrapper.find(FilterBar).length).toBe(1);
    expect(addLinkWrapper.find(Alert).length).toBe(1);
    expect(addLinkWrapper.find(Config).length).toBe(1);
  });
});