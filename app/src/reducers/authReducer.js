import {
  AUTH_STATE_IS_LOGGED_IN,
  AUTH_STATE_LOGIN_ISSUED,
  AUTH_STATE_RESPONSE_PROCESSED,
  AUTH_STATE_RESPONSE_RECEIVED,
  AUTH_STATE_UNAUTHENTICATED
} from "../AuthClient";
import {
  CALLBACK_PROCESSED,
  IS_LOGGED_IN,
  LOGIN_ISSUED,
  LOGOUT,
  PROCESS_CALLBACK,
  SAVE_AUTH_CREDENTIALS,
  UPDATE_USER_DETAILS,
} from '../actions';

const emptyAuthenticationState = {
  authenticationState: AUTH_STATE_UNAUTHENTICATED,
  responseFragment: '',
  userDetails: {fetched: false},
  authCredentials: {}
};

function auth ( state = emptyAuthenticationState, action){
  switch (action.type) {
    case LOGIN_ISSUED:
      return Object.assign({}, state, {authenticationState: AUTH_STATE_LOGIN_ISSUED
      });
    case PROCESS_CALLBACK:
      return Object.assign({}, state, {authenticationState: AUTH_STATE_RESPONSE_RECEIVED,
        responseFragment: action.hash
      });
    case CALLBACK_PROCESSED:
      return Object.assign({}, state, {authenticationState: AUTH_STATE_RESPONSE_PROCESSED
      });
    case LOGOUT:
      return Object.assign({}, state, {authenticationState: AUTH_STATE_UNAUTHENTICATED,
        responseFragment: ''
      });
    case IS_LOGGED_IN:
      return Object.assign({}, state, {authenticationState: AUTH_STATE_IS_LOGGED_IN
      });
    case UPDATE_USER_DETAILS:
      action.userDetails.fetched = true;
      return Object.assign({}, state, {userDetails: action.userDetails});
    case SAVE_AUTH_CREDENTIALS:
      return Object.assign({}, state, {authCredentials: action.authCredentials});
    default:
      return state;
  }
}

export default auth;