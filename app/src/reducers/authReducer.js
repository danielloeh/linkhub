import {
  AUTH_STATE_IS_LOGGED_IN,
  AUTH_STATE_LOGIN_ISSUED,
  AUTH_STATE_RESPONSE_PROCESSED,
  AUTH_STATE_RESPONSE_RECEIVED,
  AUTH_STATE_UNAUTHENTICATED
} from "../AuthClient";
import {CALLBACK_PROCESSED, IS_LOGGED_IN, LOGIN, LOGOUT, PROCESS_CALLBACK, UPDATE_USER_DETAILS} from "../actions";

const emptyAuthenticationState = {
  authenticationState: AUTH_STATE_UNAUTHENTICATED,
  responseFragment: '',
  userDetails: {}
};

function auth ( state = emptyAuthenticationState, action){
  switch (action.type) {
    case LOGIN:
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
      console.log(action.userDetails)
      return Object.assign({}, state, {userDetails: action.userDetails});
    default:
      return state;
  }
}

export default auth;