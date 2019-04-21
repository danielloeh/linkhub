import authReducer from './authReducer';
import * as actions from '../actions';
import { CALLBACK_PROCESSED, IS_LOGGED_IN } from '../actions';
import {
  AUTH_STATE_IS_LOGGED_IN,
  AUTH_STATE_RESPONSE_PROCESSED,
  AUTH_STATE_RESPONSE_RECEIVED,
  AUTH_STATE_UNAUTHENTICATED,
} from '../AuthClient';

describe('Auth Reducer', () => {

  it('returns the auth initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {
        authCredentials: {},
        authenticationState: AUTH_STATE_UNAUTHENTICATED,
        responseFragment: '',
        userDetails: { fetched: false },
      },
    );
  });

  it('handles processing the callback', () => {
    expect(
      authReducer([], {
        type: actions.PROCESS_CALLBACK,
      }),
    ).toEqual(
      { authenticationState: AUTH_STATE_RESPONSE_RECEIVED },
    );
  });

  it('handles processing the callback', () => {
    expect(
      authReducer({ authenticationState: AUTH_STATE_RESPONSE_RECEIVED }, {
        type: actions.CALLBACK_PROCESSED,
      }),
    ).toEqual(
      {
        authenticationState: AUTH_STATE_RESPONSE_PROCESSED,
      },
    );
  });

  it('handles processing the logout', () => {
    expect(
      authReducer({ authenticationState: AUTH_STATE_IS_LOGGED_IN }, {
        type: actions.LOGOUT,
      }),
    ).toEqual(
      {
        authenticationState: AUTH_STATE_UNAUTHENTICATED,
        responseFragment: '',
      },
    );
  });

  it('handles is logged in', () => {
    expect(
      authReducer({ authenticationState: CALLBACK_PROCESSED }, {
        type: actions.IS_LOGGED_IN,
      }),
    ).toEqual(
      {
        authenticationState: AUTH_STATE_IS_LOGGED_IN,
      },
    );
  });

  it('handles is fetching user details', () => {
    expect(
      authReducer({ authenticationState: IS_LOGGED_IN }, {
        type: actions.UPDATE_USER_DETAILS,
        userDetails: { userName: 'some-user-name' },
      }),
    ).toEqual(
      {
        authenticationState: AUTH_STATE_IS_LOGGED_IN,
        userDetails: { fetched: true, userName: 'some-user-name' },
      },
    );
  });

  it('gets the authentication credentials', () => {
    expect(
      authReducer({ authenticationState: IS_LOGGED_IN }, {
        type: actions.SAVE_AUTH_CREDENTIALS,
        authCredentials: 'some-auth-credentials',
      }),
    ).toEqual(
      {
        authenticationState: AUTH_STATE_IS_LOGGED_IN,
        authCredentials: 'some-auth-credentials',
      },
    );
  });

});