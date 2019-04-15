import {ALERT_ERROR_TYPE} from "./Alert";
import {AUTH_STATE_IS_LOGGED_IN} from "./AuthClient";

export const gitConnectionMock = {
  connected: false,
  remoteUrl: "some-url",
  upToDate: false
};

export const alertingMock = {
  message: '',
  show: false,
  alertType: ALERT_ERROR_TYPE
};

export const featureConfigMock = {
  editEnabled: true,
  authURI: 'some-auth-uri',
  authClientID: 'some-client-id'
};

export const authMock = {
  authenticationState: AUTH_STATE_IS_LOGGED_IN,
  userDetails: {
    fetched: true,
    name: 'some-user-name'
  }
};